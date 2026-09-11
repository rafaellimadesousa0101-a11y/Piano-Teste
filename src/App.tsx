import { MobileTouchToolbar } from "./components/MobileTouchToolbar";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { SheetMusic, NoteItem, NoteDuration, ClefType, ClefSelection, AccidentalType } from "./types";
import { PRESET_SHEET_MUSICS } from "./data/presets";
import { PianoKeyboard } from "./components/PianoKeyboard";
import { SheetMusicView } from "./components/SheetMusicView";
import { SheetEditorControls } from "./components/SheetEditorControls";
import { HeaderControls } from "./components/HeaderControls";
import { AiGeneratorModal } from "./components/AiGeneratorModal";
import { PianoReductionModal } from "./components/PianoReductionModal";
import {
  generateNoteId,
  stepToPitch,
  transposePitch,
  addPitchToNote,
  removePitchFromNote,
  buildHarmonicInterval,
  getAllNotePitches,
} from "./utils/musicNotation";
import { pianoSynth } from "./sound/audio";
import { SheetPlaybackEngine } from "./utils/player";

export default function App() {
  // Current Sheet Music State (defaults to Harry Potter or Für Elise)
  const [sheet, setSheet] = useState<SheetMusic>(PRESET_SHEET_MUSICS[0]);

  // Playback State
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isLooping, setIsLooping] = useState<boolean>(false);
  const [activeNoteId, setActiveNoteId] = useState<string | null>(null);
  const [activeNoteIds, setActiveNoteIds] = useState<Set<string>>(new Set());
  const [activeMeasureNumber, setActiveMeasureNumber] = useState<number | null>(null);
  const [activePitches, setActivePitches] = useState<string[]>([]);

  // Manual Editing Controls State (defaults to "both" for full grand staff)
  const [currentDuration, setCurrentDuration] = useState<NoteDuration>("quarter");
  const [isDottedSelected, setIsDottedSelected] = useState<boolean>(false);
  const [isRestSelected, setIsRestSelected] = useState<boolean>(false);
  const [currentClef, setCurrentClef] = useState<ClefSelection>("both");
  const [handsMode, setHandsMode] = useState<ClefSelection>("both");
  const [currentAccidental, setCurrentAccidental] = useState<AccidentalType>("none");
  const [isPianoInsertMode, setIsPianoInsertMode] = useState<boolean>(false);

  // Piano Input State
  const heldPianoKeys = useRef<Set<string>>(new Set());
  const lastInsertedNoteRef = useRef<{ id: string, measureIndex: number, clef: ClefType } | null>(null);

  // Selected Note Inspector State
  const [selectedNote, setSelectedNote] = useState<NoteItem | null>(null);
  const [selectedMeasureIndex, setSelectedMeasureIndex] = useState<number | null>(null);

  // Modals & Notifications
  const [isAiModalOpen, setIsAiModalOpen] = useState<boolean>(false);
  const [isReductionModalOpen, setIsReductionModalOpen] = useState<boolean>(false);
  const [generatedNotification, setGeneratedNotification] = useState<string | null>(null);

  // Playback engine ref (Hardware audio-clock lookahead scheduler)
  const playbackEngineRef = useRef<SheetPlaybackEngine | null>(null);
  const playbackElapsedPauseRef = useRef<number>(0);

  // Stop Playback
  const handleStopPlayback = useCallback(() => {
    if (playbackEngineRef.current) {
      playbackEngineRef.current.stop();
    }
    setIsPlaying(false);
    setActiveNoteId(null);
    setActiveNoteIds(new Set());
    setActiveMeasureNumber(null);
    setActivePitches([]);
    playbackElapsedPauseRef.current = 0;
  }, []);

  // Start / Resume Playback (Lookahead Audio Engine on hardware audio thread)
  const handleStartPlayback = useCallback(() => {
    if (!playbackEngineRef.current) {
      playbackEngineRef.current = new SheetPlaybackEngine(
        sheet,
        handsMode,
        isLooping,
        (visualState) => {
          setActiveNoteIds(visualState.activeNoteIds);
          setActivePitches(visualState.activePitches);
          setActiveMeasureNumber(visualState.activeMeasureNumber);
          const firstId = visualState.activeNoteIds.values().next().value || null;
          setActiveNoteId(firstId);
        },
        () => {
          setIsPlaying(false);
          setActiveNoteId(null);
          setActiveNoteIds(new Set());
          setActiveMeasureNumber(null);
          setActivePitches([]);
          playbackElapsedPauseRef.current = 0;
        }
      );
    } else {
      playbackEngineRef.current.updateConfig(sheet, handsMode, isLooping);
    }

    setIsPlaying(true);
    playbackEngineRef.current.start(playbackElapsedPauseRef.current);
  }, [sheet, handsMode, isLooping]);

  // Pause Playback
  const handlePausePlayback = useCallback(() => {
    if (playbackEngineRef.current) {
      playbackElapsedPauseRef.current = playbackEngineRef.current.pause();
    }
    setIsPlaying(false);
    setActivePitches([]);
    setActiveNoteIds(new Set());
    setActiveNoteId(null);
  }, []);

  // Update looping dynamically without stopping or recompiling timeline
  useEffect(() => {
    playbackEngineRef.current?.setLooping(isLooping);
  }, [isLooping]);

  // Update engine if sheet or handsMode changes
  useEffect(() => {
    if (playbackEngineRef.current) {
      playbackEngineRef.current.updateConfig(sheet, handsMode, isLooping);
    }
  }, [sheet, handsMode]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      playbackEngineRef.current?.destroy();
    };
  }, []);

  // Keyboard Shortcuts for Manual Sheet Music Creation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if user is typing in an input or textarea
      if (
        document.activeElement?.tagName === "INPUT" ||
        document.activeElement?.tagName === "TEXTAREA" ||
        e.ctrlKey ||
        e.metaKey
      ) {
        return;
      }

      switch (e.key.toLowerCase()) {
        case "1":
          setCurrentDuration("whole");
          setIsRestSelected(false);
          break;
        case "2":
          setCurrentDuration("half");
          setIsRestSelected(false);
          break;
        case "4":
          setCurrentDuration("quarter");
          setIsRestSelected(false);
          break;
        case "8":
          setCurrentDuration("eighth");
          setIsRestSelected(false);
          break;
        case "6": // 16th note
          setCurrentDuration("sixteenth");
          setIsRestSelected(false);
          break;
        case "3": // 32nd note
          setCurrentDuration("thirtysecond");
          setIsRestSelected(false);
          break;
        case "r":
          setIsRestSelected((prev) => !prev);
          break;
        case ".":
          setIsDottedSelected((prev) => !prev);
          break;
        case "backspace":
        case "delete":
          if (selectedNote && selectedMeasureIndex !== null) {
            handleDeleteSelectedNote();
          }
          break;
        case "arrowup":
          if (selectedNote && selectedMeasureIndex !== null) {
            e.preventDefault(); // Prevent scrolling
            handleTransposeSelectedNote(1);
          }
          break;
        case "arrowdown":
          if (selectedNote && selectedMeasureIndex !== null) {
            e.preventDefault(); // Prevent scrolling
            handleTransposeSelectedNote(-1);
          }
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedNote, selectedMeasureIndex]);

  // Touch Gestures State (for swipe gestures)
  const [touchStartPos, setTouchStartPos] = useState<{ x: number; y: number } | null>(null);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    if (!selectedNote) return;
    setTouchStartPos({ x: e.touches[0].clientX, y: e.touches[0].clientY });
  }, []);

  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    if (!touchStartPos || !selectedNote) return;
    const touchEndX = e.changedTouches[0].clientX;
    const touchEndY = e.changedTouches[0].clientY;

    const dx = touchEndX - touchStartPos.x;
    const dy = touchEndY - touchStartPos.y;

    const threshold = 40; // minimum distance for swipe

    // If swipe is primarily vertical
    if (Math.abs(dy) > Math.abs(dx)) {
      if (Math.abs(dy) > threshold) {
        if (dy < 0) {
          handleTransposeSelectedNote(1); // Swipe Up -> Transpose Up
        } else {
          handleTransposeSelectedNote(-1); // Swipe Down -> Transpose Down
        }
      }
    }
    setTouchStartPos(null);
  }, []);

  // If sheet tempo or notes change while playing, restart playback smoothly
  const handleChangeBpm = useCallback((newBpm: number) => {
    setSheet((prev) => ({ ...prev, tempo: newBpm }));
    if (isPlaying) {
      handleStopPlayback();
    }
  }, [isPlaying, handleStopPlayback]);

  // Select Preset Sheet Music
  const handleSelectPreset = useCallback((preset: SheetMusic) => {
    handleStopPlayback();
    setSheet(preset);
    setSelectedNote(null);
    setSelectedMeasureIndex(null);
  }, [sheet, selectedMeasureIndex]);

  // Add Note to Measure (handles both hands auto-distribution or explicit clef)
  const insertNoteIntoMeasure = useCallback(
    (pitch: string, isRest: boolean, targetMeasureIndex?: number, explicitClef?: ClefType) => {
      const targetMIdx =
        targetMeasureIndex !== undefined
          ? targetMeasureIndex
          : selectedMeasureIndex !== null
          ? selectedMeasureIndex
          : sheet.measures.length - 1;

      // Determine the resolved clef:
      let resolvedClef: ClefType;
      if (explicitClef) {
        resolvedClef = explicitClef;
      } else if (currentClef === "both") {
        if (isRest) {
          resolvedClef = selectedNote?.clef || "treble";
        } else {
          // Parse pitch octave, e.g. "C4", "A#3", "Bb2", "F#5"
          const octMatch = pitch.match(/\d+/);
          const oct = octMatch ? parseInt(octMatch[0], 10) : 4;
          // Notes C4 and above go to Treble (Mão Direita), below C4 go to Bass (Mão Esquerda)
          resolvedClef = oct >= 4 ? "treble" : "bass";
        }
      } else {
        resolvedClef = currentClef;
      }

      const newNote: NoteItem = {
        id: generateNoteId(),
        pitch: isRest ? "" : pitch,
        duration: currentDuration,
        dotted: isDottedSelected || undefined,
        isRest,
        clef: resolvedClef,
      };

      lastInsertedNoteRef.current = { id: newNote.id, measureIndex: targetMIdx, clef: resolvedClef };

      setSheet((prev) => {
        const nextMeasures = [...prev.measures];
        if (targetMIdx < 0 || targetMIdx >= nextMeasures.length) return prev;

        const measure = { ...nextMeasures[targetMIdx] };
        if (resolvedClef === "treble") {
          measure.trebleNotes = [...measure.trebleNotes, newNote];
        } else {
          measure.bassNotes = [...(measure.bassNotes || []), newNote];
        }
        nextMeasures[targetMIdx] = measure;
        return { ...prev, measures: nextMeasures };
      });

      setSelectedNote(newNote);
      setSelectedMeasureIndex(targetMIdx);
    },
    [currentDuration, isDottedSelected, currentClef, selectedMeasureIndex, selectedNote, sheet.measures.length]
  );

  // Piano Key Press Handler
  const handlePianoKeyPress = useCallback(
    (pitch: string) => {
      if (!isPianoInsertMode) return;

      if (heldPianoKeys.current.size > 0 && lastInsertedNoteRef.current && !isRestSelected) {
        // Build chord
        const { id, measureIndex, clef } = lastInsertedNoteRef.current;
        let updatedNote: NoteItem | null = null;

        setSheet((prev) => {
          const nextMeasures = [...prev.measures];
          const measure = { ...nextMeasures[measureIndex] };
          
          const mapper = (n: NoteItem) => {
            if (n.id === id) {
              updatedNote = addPitchToNote(n, pitch);
              return updatedNote;
            }
            return n;
          };

          if (clef === "treble") {
            measure.trebleNotes = measure.trebleNotes.map(mapper);
          } else {
            measure.bassNotes = (measure.bassNotes || []).map(mapper);
          }
          nextMeasures[measureIndex] = measure;
          return { ...prev, measures: nextMeasures };
        });

        if (updatedNote) {
          setSelectedNote(updatedNote);
        }
      } else {
        insertNoteIntoMeasure(pitch, isRestSelected);
      }

      heldPianoKeys.current.add(pitch);
    },
    [isPianoInsertMode, isRestSelected, insertNoteIntoMeasure]
  );

  const handlePianoKeyRelease = useCallback((pitch: string) => {
    heldPianoKeys.current.delete(pitch);
  }, []);

  // Click directly on the Sheet Staff
  const handleStaffClick = useCallback(
    (clef: ClefType, measureIndex: number, clientY: number, staffCenterY: number) => {
      // Step calculation
      const stepDistance = 5;
      const stepDiff = Math.round((staffCenterY - clientY) / stepDistance);
      const centerStep = clef === "treble" ? 6 : -6;
      const clickedStep = centerStep + stepDiff;

      const pitch = stepToPitch(clickedStep, currentAccidental);

      // Play note audition
      pianoSynth.playNote(pitch, 0.4, 0.8);

      // Insert note with explicit clicked staff clef (Treble or Bass)
      insertNoteIntoMeasure(pitch, isRestSelected, measureIndex, clef);
    },
    [currentAccidental, isRestSelected, insertNoteIntoMeasure]
  );

  // Measure Operations
  const handleAddMeasure = useCallback(() => {
    setSheet((prev) => {
      const nextNum = prev.measures.length + 1;
      return {
        ...prev,
        measures: [
          ...prev.measures,
          {
            number: nextNum,
            trebleNotes: [],
            bassNotes: [],
          },
        ],
      };
    });
  }, []);

  const handleRemoveMeasure = useCallback(() => {
    if (sheet.measures.length <= 1) return;
    setSheet((prev) => ({
      ...prev,
      measures: prev.measures.slice(0, -1),
    }));
    setSelectedNote(null);
    setSelectedMeasureIndex(null);
  }, []);

  const handleClearSheet = useCallback(() => {
    handleStopPlayback();
    setSheet((prev) => ({
      ...prev,
      measures: [
        {
          number: 1,
          trebleNotes: [],
          bassNotes: [],
        },
      ],
    }));
    setSelectedNote(null);
    setSelectedMeasureIndex(null);
  }, []);

  // Selected Note Actions
  const handleDeleteSelectedNote = useCallback(() => {
    if (!selectedNote || selectedMeasureIndex === null) return;
    setSheet((prev) => {
      const nextMeasures = [...prev.measures];
      const measure = { ...nextMeasures[selectedMeasureIndex] };
      if (selectedNote.clef === "treble") {
        measure.trebleNotes = measure.trebleNotes.filter((n) => n.id !== selectedNote.id);
      } else {
        measure.bassNotes = (measure.bassNotes || []).filter((n) => n.id !== selectedNote.id);
      }
      nextMeasures[selectedMeasureIndex] = measure;
      return { ...prev, measures: nextMeasures };
    });
    setSelectedNote(null);
  }, []);

  const handleTransposeSelectedNote = useCallback((semitones: number) => {
    if (!selectedNote || selectedNote.isRest || selectedMeasureIndex === null) return;
    const newPitch = transposePitch(selectedNote.pitch, semitones);
    pianoSynth.playNote(newPitch, 0.35, 0.85);

    setSheet((prev) => {
      const nextMeasures = [...prev.measures];
      const measure = { ...nextMeasures[selectedMeasureIndex] };
      const mapper = (n: NoteItem) =>
        n.id === selectedNote.id ? { ...n, pitch: newPitch } : n;

      if (selectedNote.clef === "treble") {
        measure.trebleNotes = measure.trebleNotes.map(mapper);
      } else {
        measure.bassNotes = (measure.bassNotes || []).map(mapper);
      }
      nextMeasures[selectedMeasureIndex] = measure;
      return { ...prev, measures: nextMeasures };
    });

    setSelectedNote((prev) => (prev ? { ...prev, pitch: newPitch } : null));
  }, []);

  const handleToggleSelectedNoteDotted = useCallback(() => {
    if (!selectedNote || selectedMeasureIndex === null) return;
    const newDotted = !selectedNote.dotted;

    setSheet((prev) => {
      const nextMeasures = [...prev.measures];
      const measure = { ...nextMeasures[selectedMeasureIndex] };
      const mapper = (n: NoteItem) =>
        n.id === selectedNote.id ? { ...n, dotted: newDotted } : n;

      if (selectedNote.clef === "treble") {
        measure.trebleNotes = measure.trebleNotes.map(mapper);
      } else {
        measure.bassNotes = (measure.bassNotes || []).map(mapper);
      }
      nextMeasures[selectedMeasureIndex] = measure;
      return { ...prev, measures: nextMeasures };
    });

    setSelectedNote((prev) => (prev ? { ...prev, dotted: newDotted } : null));
  }, []);

  const handlePlayAudition = useCallback((pitch: string) => {
    pianoSynth.playNote(pitch, 0.5, 0.85);
  }, []);

  // Harmonic Chord Construction: Add Intervals to Selected Note
  const handleAddIntervalToSelectedNote = useCallback((
    intervalType: "3M" | "3m" | "5J" | "8J" | "triadMaj" | "triadMin" | "dom7"
  ) => {
    if (!selectedNote || selectedMeasureIndex === null || selectedNote.isRest) return;
    const newPitches = buildHarmonicInterval(selectedNote.pitch, intervalType);
    const updated = addPitchToNote(selectedNote, ...newPitches);

    setSheet((prev) => {
      const nextMeasures = [...prev.measures];
      const measure = { ...nextMeasures[selectedMeasureIndex] };
      const mapper = (n: NoteItem) => (n.id === selectedNote.id ? updated : n);

      if (selectedNote.clef === "treble") {
        measure.trebleNotes = measure.trebleNotes.map(mapper);
      } else {
        measure.bassNotes = (measure.bassNotes || []).map(mapper);
      }
      nextMeasures[selectedMeasureIndex] = measure;
      return { ...prev, measures: nextMeasures };
    });

    setSelectedNote(updated);

    // Audition preview of full chord
    const allPitches = getAllNotePitches(updated);
    allPitches.forEach((p, idx) => {
      setTimeout(() => pianoSynth.playNote(p, 0.5, 0.8), idx * 24);
    });
  }, []);

  // Remove pitch from stacked chord
  const handleRemovePitchFromSelectedNote = useCallback((pitchToRemove: string) => {
    if (!selectedNote || selectedMeasureIndex === null || selectedNote.isRest) return;
    const updated = removePitchFromNote(selectedNote, pitchToRemove);

    setSheet((prev) => {
      const nextMeasures = [...prev.measures];
      const measure = { ...nextMeasures[selectedMeasureIndex] };
      const mapper = (n: NoteItem) => (n.id === selectedNote.id ? updated : n);

      if (selectedNote.clef === "treble") {
        measure.trebleNotes = measure.trebleNotes.map(mapper);
      } else {
        measure.bassNotes = (measure.bassNotes || []).map(mapper);
      }
      nextMeasures[selectedMeasureIndex] = measure;
      return { ...prev, measures: nextMeasures };
    });

    setSelectedNote(updated);
  }, []);

  // Toggle Arpeggio (wavy line rolled chord)
  const handleToggleSelectedArpeggio = useCallback(() => {
    if (!selectedNote || selectedMeasureIndex === null || selectedNote.isRest) return;
    const updated: NoteItem = {
      ...selectedNote,
      isArpeggiated: !selectedNote.isArpeggiated,
    };

    setSheet((prev) => {
      const nextMeasures = [...prev.measures];
      const measure = { ...nextMeasures[selectedMeasureIndex] };
      const mapper = (n: NoteItem) => (n.id === selectedNote.id ? updated : n);

      if (selectedNote.clef === "treble") {
        measure.trebleNotes = measure.trebleNotes.map(mapper);
      } else {
        measure.bassNotes = (measure.bassNotes || []).map(mapper);
      }
      nextMeasures[selectedMeasureIndex] = measure;
      return { ...prev, measures: nextMeasures };
    });

    setSelectedNote(updated);

    // Play rolled preview
    const pitches = getAllNotePitches(updated);
    pitches.forEach((p, idx) => {
      setTimeout(() => pianoSynth.playNote(p, 0.45, 0.8), idx * 32);
    });
  }, []);

  // Stem Direction for Split Voices
  const handleSetSelectedStemDirection = useCallback((direction: "up" | "down" | "auto") => {
    if (!selectedNote || selectedMeasureIndex === null) return;
    const voiceVal = direction === "up" ? 1 : direction === "down" ? 2 : undefined;
    const updated: NoteItem = {
      ...selectedNote,
      stemDirection: direction,
      voice: voiceVal,
    };

    setSheet((prev) => {
      const nextMeasures = [...prev.measures];
      const measure = { ...nextMeasures[selectedMeasureIndex] };
      const mapper = (n: NoteItem) => (n.id === selectedNote.id ? updated : n);

      if (selectedNote.clef === "treble") {
        measure.trebleNotes = measure.trebleNotes.map(mapper);
      } else {
        measure.bassNotes = (measure.bassNotes || []).map(mapper);
      }
      nextMeasures[selectedMeasureIndex] = measure;
      return { ...prev, measures: nextMeasures };
    });

    setSelectedNote(updated);
  }, []);

  // Split Voice Selection
  const handleSetSelectedVoice = useCallback((voice: 1 | 2 | undefined) => {
    if (!selectedNote || selectedMeasureIndex === null) return;
    const updated: NoteItem = {
      ...selectedNote,
      voice,
      stemDirection: voice === 1 ? "up" : voice === 2 ? "down" : "auto",
    };

    setSheet((prev) => {
      const nextMeasures = [...prev.measures];
      const measure = { ...nextMeasures[selectedMeasureIndex] };
      const mapper = (n: NoteItem) => (n.id === selectedNote.id ? updated : n);

      if (selectedNote.clef === "treble") {
        measure.trebleNotes = measure.trebleNotes.map(mapper);
      } else {
        measure.bassNotes = (measure.bassNotes || []).map(mapper);
      }
      nextMeasures[selectedMeasureIndex] = measure;
      return { ...prev, measures: nextMeasures };
    });

    setSelectedNote(updated);
  }, []);

  // Synchronize clef and hands selection
  const handleSelectClef = useCallback((clef: ClefSelection) => {
    setCurrentClef(clef);
    setHandsMode(clef);
  }, []);

  const handleSelectHandsMode = useCallback((mode: ClefSelection) => {
    setHandsMode(mode);
    setCurrentClef(mode);
  }, []);

  return (
    <div className="min-h-screen bg-stone-100 flex flex-col justify-between text-stone-900">
      {/* Top Header & Playback controls */}
      <HeaderControls
        isPlaying={isPlaying}
        isLooping={isLooping}
        bpm={sheet.tempo}
        handsMode={handsMode}
        onPlay={handleStartPlayback}
        onPause={handlePausePlayback}
        onStop={handleStopPlayback}
        onToggleLoop={useCallback(() => setIsLooping((l) => !l), [])}
        onChangeBpm={handleChangeBpm}
        onSelectPreset={handleSelectPreset}
        onSelectHandsMode={handleSelectHandsMode}
        onOpenAiModal={useCallback(() => setIsAiModalOpen(true), [])}
        onOpenReductionModal={useCallback(() => setIsReductionModalOpen(true), [])}
        currentTitle={sheet.title}
      />

      {/* Main Content Area */}
      <main className="max-w-7xl w-full mx-auto p-2 sm:p-4 pb-28 md:pb-4 flex flex-col gap-3 sm:gap-4 grow">
        {/* AI Generation Success Banner */}
        {generatedNotification && (
          <div
            id="ai-success-banner"
            className="w-full bg-linear-to-r from-amber-500/10 via-amber-500/5 to-transparent border border-amber-300/80 rounded-xl p-3 flex items-center justify-between gap-3 text-xs text-amber-950 shadow-xs animate-in fade-in slide-in-from-top-2 duration-300"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-xs">
                <span className="text-sm">✨</span>
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-stone-900">
                  Partitura atualizada!
                </span>
                <span className="text-[11px] text-stone-600">
                  {generatedNotification}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleStartPlayback}
                className="px-3 py-1.5 font-bold bg-amber-500 hover:bg-amber-600 text-white rounded-lg shadow-xs transition-colors cursor-pointer text-xs flex items-center gap-1.5"
              >
                <span>▶ Tocar Agora</span>
              </button>
              <button
                type="button"
                onClick={() => setGeneratedNotification(null)}
                className="p-1 text-stone-400 hover:text-stone-700 rounded-md transition-colors cursor-pointer"
                aria-label="Fechar aviso"
              >
                ✕
              </button>
            </div>
          </div>
        )}

        {/* Sheet Music Notation Viewer */}
        <section 
          aria-label="Partitura Musical" 
          className="w-full touch-pan-x"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <SheetMusicView
            sheet={sheet}
            activeNoteId={activeNoteId}
            activeNoteIds={activeNoteIds}
            activeMeasureNumber={activeMeasureNumber}
            selectedNoteId={selectedNote?.id || null}
            onSelectNote={(note, mIdx) => {
              setSelectedNote(note);
              setSelectedMeasureIndex(mIdx);
              if (!note.isRest && note.pitch) {
                const pitches = getAllNotePitches(note);
                if (note.isArpeggiated) {
                  pitches.forEach((p, idx) => {
                    setTimeout(() => pianoSynth.playNote(p, 0.45, 0.8), idx * 28);
                  });
                } else {
                  pitches.forEach((p) => pianoSynth.playNote(p, 0.45, 0.8));
                }
              }
            }}
            onStaffClick={handleStaffClick}
          />
        </section>

        {/* Manual Sheet Music Editor Toolbar */}
        <section aria-label="Ferramentas de Edição da Partitura" className="w-full">
          <SheetEditorControls
            currentDuration={currentDuration}
            onSelectDuration={setCurrentDuration}
            isDottedSelected={isDottedSelected}
            onToggleDotted={setIsDottedSelected}
            isRestSelected={isRestSelected}
            onToggleRest={setIsRestSelected}
            currentClef={currentClef}
            onSelectClef={handleSelectClef}
            currentAccidental={currentAccidental}
            onSelectAccidental={setCurrentAccidental}
            isPianoInsertMode={isPianoInsertMode}
            onTogglePianoInsertMode={useCallback(() => setIsPianoInsertMode((m) => !m), [])}
            selectedNote={selectedNote}
            selectedMeasureIndex={selectedMeasureIndex}
            onDeleteSelectedNote={handleDeleteSelectedNote}
            onTransposeSelectedNote={handleTransposeSelectedNote}
            onToggleSelectedNoteDotted={handleToggleSelectedNoteDotted}
            onPlayAudition={handlePlayAudition}
            onAddMeasure={handleAddMeasure}
            onRemoveMeasure={handleRemoveMeasure}
            onClearSheet={handleClearSheet}
            onOpenAiModal={useCallback(() => setIsAiModalOpen(true), [])}
            onOpenReductionModal={useCallback(() => setIsReductionModalOpen(true), [])}
            onAddIntervalToSelectedNote={handleAddIntervalToSelectedNote}
            onRemovePitchFromSelectedNote={handleRemovePitchFromSelectedNote}
            onToggleSelectedArpeggio={handleToggleSelectedArpeggio}
            onSetSelectedStemDirection={handleSetSelectedStemDirection}
            onSetSelectedVoice={handleSetSelectedVoice}
          />
        </section>

        {/* Interactive Virtual Piano */}
        <section aria-label="Piano Virtual" className="w-full mt-auto">
          <PianoKeyboard
            activePitches={activePitches}
            onKeyPress={handlePianoKeyPress}
            onKeyRelease={handlePianoKeyRelease}
            labelMode="pt"
            showKeyboardShortcuts={true}
            handsMode={handsMode}
          />
        </section>
      </main>

      {/* AI Sheet Music Generator Modal */}
      <MobileTouchToolbar
        currentDuration={currentDuration}
        onSelectDuration={setCurrentDuration}
        isRestSelected={isRestSelected}
        onToggleRest={useCallback(() => setIsRestSelected((prev) => !prev), [])}
        isDottedSelected={isDottedSelected}
        onToggleDotted={useCallback(() => setIsDottedSelected((prev) => !prev), [])}
        hasSelectedNote={!!selectedNote}
        onDeleteSelectedNote={handleDeleteSelectedNote}
        onTransposeSelectedNote={handleTransposeSelectedNote}
      />

      <AiGeneratorModal
        isOpen={isAiModalOpen}
        onClose={() => setIsAiModalOpen(false)}
        onApplySheet={(newSheet) => {
          handleStopPlayback();
          const sanitizedMeasures = (newSheet.measures || []).map((m, mIdx) => ({
            ...m,
            number: m.number || mIdx + 1,
            trebleNotes: (m.trebleNotes || []).map((n) => ({
              ...n,
              id: n.id || generateNoteId(),
              dotted: n.dotted ? true : undefined,
              clef: "treble" as const,
            })),
            bassNotes: (m.bassNotes || []).map((n) => ({
              ...n,
              id: n.id || generateNoteId(),
              dotted: n.dotted ? true : undefined,
              clef: "bass" as const,
            })),
          }));

          const updatedSheet: SheetMusic = {
            ...newSheet,
            id: "ai-generated-" + Date.now(),
            measures: sanitizedMeasures,
          };

          setSheet(updatedSheet);
          setSelectedNote(null);
          setSelectedMeasureIndex(null);
          setGeneratedNotification(
            `"${updatedSheet.title}" • ${updatedSheet.measures.length} compassos • ${updatedSheet.tempo} BPM • Tom: ${updatedSheet.keySignature || "Dó"}`
          );
        }}
      />

      {/* Piano Reduction & Solo Arrangements Modal */}
      <PianoReductionModal
        isOpen={isReductionModalOpen}
        onClose={() => setIsReductionModalOpen(false)}
        currentSheet={sheet}
        onApplyReduction={(reducedSheet) => {
          handleStopPlayback();
          setSheet(reducedSheet);
          setSelectedNote(null);
          setSelectedMeasureIndex(null);
          setCurrentClef("both");
          setHandsMode("both");
          setGeneratedNotification(
            `Redução para Piano aplicada com sucesso: "${reducedSheet.title}" • ${reducedSheet.measures.length} compassos • 2 mãos coordenadas`
          );
        }}
        onSelectPreset={(preset) => {
          handleSelectPreset(preset);
          setCurrentClef("both");
          setHandsMode("both");
          setGeneratedNotification(`Partitura carregada: "${preset.title}"`);
        }}
      />
    </div>
  );
}

import React, { useEffect, useState, useRef, useCallback, useMemo } from "react";
import { pianoSynth } from "../sound/audio";
import { formatPitchPt, pitchToMidi, midiToPitch } from "../utils/musicNotation";
import { Volume2, Music2, Keyboard, Sparkles, Layers, Sliders, Maximize2 } from "lucide-react";

interface PianoKeyboardProps {
  activePitches?: string[];
  onKeyPress?: (pitch: string) => void;
  onKeyRelease?: (pitch: string) => void;
  labelMode?: "note" | "pt" | "enharmonic" | "none";
  showKeyboardShortcuts?: boolean;
  handsMode?: "both" | "treble" | "bass";
}

interface KeyConfig {
  pitch: string;
  note: string;
  octave: number;
  isBlack: boolean;
  keyboardKey?: string;
  whiteIndex?: number;
  enharmonicLabel?: string;
}

// Enharmonic variations lookup for black keys
const ENHARMONIC_LABELS: Record<string, { pt: string; scientific: string }> = {
  "C#": { pt: "Dó♯ / Ré♭", scientific: "C# / Db" },
  "D#": { pt: "Ré♯ / Mi♭", scientific: "D# / Eb" },
  "F#": { pt: "Fá♯ / Sol♭", scientific: "F# / Gb" },
  "G#": { pt: "Sol♯ / Lá♭", scientific: "G# / Ab" },
  "A#": { pt: "Lá♯ / Si♭", scientific: "A# / Bb" },
};

// Computer keyboard mapping for 2 octaves around C4
const KEYBOARD_MAP: Record<string, string> = {
  z: "C3",
  s: "C#3",
  x: "D3",
  d: "D#3",
  c: "E3",
  v: "F3",
  g: "F#3",
  b: "G3",
  h: "G#3",
  n: "A3",
  j: "A#3",
  m: "B3",
  q: "C4",
  "2": "C#4",
  w: "D4",
  "3": "D#4",
  e: "E4",
  r: "F4",
  "5": "F#4",
  t: "G4",
  "6": "G#4",
  y: "A4",
  "7": "A#4",
  u: "B4",
  i: "C5",
  "9": "C#5",
  o: "D5",
  "0": "D#5",
  p: "E5",
};

/**
 * High-performance Memoized White Key:
 * Skips re-render when other keys are pressed, eliminating UI frame drops during fast playing.
 */
const PianoWhiteKey = React.memo(function PianoWhiteKey({
  pitch,
  keyboardKey,
  ptLabel,
  active,
  labelMode,
  showKeyboardShortcuts,
  is88Mode,
  onNoteOn,
  onNoteOff,
  isPointerDownRef,
}: {
  pitch: string;
  keyboardKey?: string;
  ptLabel: string;
  active: boolean;
  labelMode: "note" | "pt" | "enharmonic" | "none";
  showKeyboardShortcuts: boolean;
  is88Mode: boolean;
  onNoteOn: (pitch: string) => void;
  onNoteOff: (pitch: string) => void;
  isPointerDownRef: React.MutableRefObject<boolean>;
}) {
  return (
    <div
      id={`key-${pitch.replace("#", "s")}`}
      className={`flex-1 h-full mx-[0.5px] rounded-b-md flex flex-col justify-end items-center pb-2 transition-all duration-75 relative cursor-pointer ${
        is88Mode ? "min-w-[24px] sm:min-w-[28px]" : ""
      } ${
        active
          ? "bg-amber-100 shadow-[inset_0_5px_12px_rgba(245,158,11,0.5)] translate-y-0.5"
          : "bg-gradient-to-b from-stone-100 via-white to-stone-200 hover:bg-stone-50 shadow-[0_4px_6px_rgba(0,0,0,0.3),inset_0_-3px_4px_rgba(0,0,0,0.15)] active:translate-y-0.5 active:bg-amber-50"
      }`}
      onPointerDown={(e) => {
        e.preventDefault();
        onNoteOn(pitch);
      }}
      onPointerUp={(e) => {
        e.preventDefault();
        onNoteOff(pitch);
      }}
      onPointerEnter={(e) => {
        if (isPointerDownRef.current) {
          e.preventDefault();
          onNoteOn(pitch);
        }
      }}
      onPointerLeave={(e) => {
        if (isPointerDownRef.current) {
          e.preventDefault();
          onNoteOff(pitch);
        }
      }}
    >
      {active && (
        <div className="absolute top-0 left-0 right-0 h-2 bg-amber-400 rounded-t-sm" />
      )}
      <div className="flex flex-col items-center pointer-events-none text-stone-700">
        {keyboardKey && showKeyboardShortcuts && !is88Mode && (
          <span className="text-[10px] font-mono font-bold text-stone-400 mb-0.5 whitespace-nowrap leading-none">
            {keyboardKey}
          </span>
        )}
        {labelMode === "pt" || labelMode === "enharmonic" ? (
          <span className="text-[9px] sm:text-[11px] font-bold text-stone-800 whitespace-nowrap leading-tight">
            {ptLabel}
          </span>
        ) : labelMode === "note" ? (
          <span className="text-[9px] sm:text-[11px] font-bold text-stone-800 whitespace-nowrap leading-tight">
            {pitch}
          </span>
        ) : null}
      </div>
    </div>
  );
});

/**
 * High-performance Memoized Black Key:
 * Individually isolated to ensure 60fps responsive glissandos and multi-touch chords.
 */
const PianoBlackKey = React.memo(function PianoBlackKey({
  pitch,
  leftPercent,
  widthPercent,
  keyboardKey,
  ptLabel,
  enharmonicLabel,
  active,
  labelMode,
  showKeyboardShortcuts,
  is88Mode,
  onNoteOn,
  onNoteOff,
  isPointerDownRef,
}: {
  pitch: string;
  leftPercent: number;
  widthPercent: number;
  keyboardKey?: string;
  ptLabel: string;
  enharmonicLabel?: string;
  active: boolean;
  labelMode: "note" | "pt" | "enharmonic" | "none";
  showKeyboardShortcuts: boolean;
  is88Mode: boolean;
  onNoteOn: (pitch: string) => void;
  onNoteOff: (pitch: string) => void;
  isPointerDownRef: React.MutableRefObject<boolean>;
}) {
  return (
    <div
      id={`key-${pitch.replace("#", "s")}`}
      style={{
        position: "absolute",
        left: `${leftPercent}%`,
        width: `${widthPercent}%`,
      }}
      className={`h-full rounded-b pointer-events-auto cursor-pointer flex flex-col justify-end items-center pb-1.5 transition-all duration-75 ${
        active
          ? "bg-amber-400 shadow-[0_2px_8px_rgba(245,158,11,0.8),inset_0_3px_6px_rgba(0,0,0,0.5)] translate-y-0.5"
          : "bg-gradient-to-b from-stone-900 via-stone-800 to-stone-950 shadow-[0_4px_8px_rgba(0,0,0,0.6),inset_0_1px_1px_rgba(255,255,255,0.2)] hover:bg-stone-800 active:translate-y-0.5"
      }`}
      onPointerDown={(e) => {
        e.preventDefault();
        e.stopPropagation();
        onNoteOn(pitch);
      }}
      onPointerUp={(e) => {
        e.preventDefault();
        e.stopPropagation();
        onNoteOff(pitch);
      }}
      onPointerEnter={(e) => {
        if (isPointerDownRef.current) {
          e.preventDefault();
          onNoteOn(pitch);
        }
      }}
      onPointerLeave={(e) => {
        if (isPointerDownRef.current) {
          e.preventDefault();
          onNoteOff(pitch);
        }
      }}
    >
      {active && (
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-amber-200" />
      )}
      <div className="flex flex-col items-center pointer-events-none px-0.5">
        {keyboardKey && showKeyboardShortcuts && !is88Mode && (
          <span
            className={`text-[8px] sm:text-[9px] font-mono font-bold whitespace-nowrap leading-none mb-0.5 ${
              active ? "text-stone-950" : "text-stone-400"
            }`}
          >
            {keyboardKey}
          </span>
        )}
        {labelMode !== "none" && (
          <span
            className={`text-[7px] sm:text-[8px] font-semibold whitespace-nowrap leading-none text-center ${
              active ? "text-stone-950" : "text-stone-300"
            }`}
          >
            {labelMode === "enharmonic" && enharmonicLabel
              ? enharmonicLabel
              : labelMode === "pt"
              ? ptLabel
              : pitch}
          </span>
        )}
      </div>
    </div>
  );
});

export const PianoKeyboard: React.FC<PianoKeyboardProps> = React.memo(({
  activePitches = [],
  onKeyPress,
  onKeyRelease,
  labelMode: initialLabelMode = "pt",
  showKeyboardShortcuts = true,
  handsMode = "both",
}) => {
  const [baseOctave, setBaseOctave] = useState<number>(3);
  const [is88KeyMode, setIs88KeyMode] = useState<boolean>(false);
  const [labelMode, setLabelMode] = useState<"note" | "pt" | "enharmonic" | "none">(initialLabelMode);
  const [pressedPitches, setPressedPitches] = useState<Set<string>>(new Set());
  const [autoBass, setAutoBass] = useState<boolean>(true);
  const [isSustain, setIsSustain] = useState<boolean>(false);
  const [volume, setVolumeState] = useState<number>(85);
  const [reverbAmount, setReverbAmount] = useState<number>(28);
  const isPointerDownRef = useRef(false);
  const keysContainerRef = useRef<HTMLDivElement>(null);

  // Fast O(1) Set for external playback active pitches
  const activePitchesSet = useMemo(() => new Set(activePitches), [activePitches]);

  // Keys generator: handles standard 3-octave view OR full 88-key concert grand piano!
  const { keys, whiteKeys, blackKeys, totalWhiteKeys } = useMemo(() => {
    const keysList: KeyConfig[] = [];
    const noteNames = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
    let whiteCounter = 0;

    if (is88KeyMode) {
      // FULL 88-KEY CONCERT GRAND PIANO: A0 to C8 (21 to 108 MIDI)
      // 1. Octave 0: A0, A#0, B0
      keysList.push({
        pitch: "A0",
        note: "A",
        octave: 0,
        isBlack: false,
        whiteIndex: whiteCounter++,
      });
      keysList.push({
        pitch: "A#0",
        note: "A#",
        octave: 0,
        isBlack: true,
        enharmonicLabel: "Lá♯/Si♭",
      });
      keysList.push({
        pitch: "B0",
        note: "B",
        octave: 0,
        isBlack: false,
        whiteIndex: whiteCounter++,
      });

      // 2. Octaves 1 through 7: C1 to B7
      for (let oct = 1; oct <= 7; oct++) {
        for (let i = 0; i < noteNames.length; i++) {
          const note = noteNames[i];
          const pitch = `${note}${oct}`;
          const isBlack = note.includes("#");

          if (!isBlack) {
            keysList.push({
              pitch,
              note,
              octave: oct,
              isBlack: false,
              whiteIndex: whiteCounter++,
            });
          } else {
            const enh = ENHARMONIC_LABELS[note];
            keysList.push({
              pitch,
              note,
              octave: oct,
              isBlack: true,
              enharmonicLabel: enh ? enh.pt : undefined,
            });
          }
        }
      }

      // 3. Octave 8: C8 (88th key)
      keysList.push({
        pitch: "C8",
        note: "C",
        octave: 8,
        isBlack: false,
        whiteIndex: whiteCounter++,
      });
    } else {
      // 3-OCTAVE DYNAMIC VIEW: baseOctave to baseOctave + 3
      for (let oct = baseOctave; oct < baseOctave + 3; oct++) {
        for (let i = 0; i < noteNames.length; i++) {
          const note = noteNames[i];
          const pitch = `${note}${oct}`;
          const isBlack = note.includes("#");

          let shortcut: string | undefined;
          for (const [key, p] of Object.entries(KEYBOARD_MAP)) {
            if (p === pitch) {
              shortcut = key.toUpperCase();
              break;
            }
          }

          const enh = ENHARMONIC_LABELS[note];

          if (!isBlack) {
            keysList.push({
              pitch,
              note,
              octave: oct,
              isBlack: false,
              keyboardKey: shortcut,
              whiteIndex: whiteCounter++,
            });
          } else {
            keysList.push({
              pitch,
              note,
              octave: oct,
              isBlack: true,
              keyboardKey: shortcut,
              enharmonicLabel: enh ? enh.pt : undefined,
            });
          }
        }
      }

      const finalPitch = `C${baseOctave + 3}`;
      keysList.push({
        pitch: finalPitch,
        note: "C",
        octave: baseOctave + 3,
        isBlack: false,
        whiteIndex: whiteCounter++,
      });
    }

    return {
      keys: keysList,
      whiteKeys: keysList.filter((k) => !k.isBlack),
      blackKeys: keysList.filter((k) => k.isBlack),
      totalWhiteKeys: whiteCounter,
    };
  }, [baseOctave, is88KeyMode]);

  /**
   * ZERO-INPUT-LAG NOTE TRIGGER:
   * 1. Audio begins IMMEDIATELY on the Web Audio hardware thread.
   * 2. React state batching and callbacks follow non-blockingly.
   */
  const handleNoteOn = useCallback(
    (pitch: string) => {
      // 1. Audio first!
      pianoSynth.playNote(pitch, undefined, 0.85);

      // Auto-bass companion in two-hands mode
      let bassPitch: string | null = null;
      if (autoBass && handsMode === "both") {
        const midi = pitchToMidi(pitch);
        if (midi >= 60) {
          const bassMidi = midi >= 72 ? midi - 24 : midi - 12;
          bassPitch = midiToPitch(bassMidi);
          pianoSynth.playNote(bassPitch, undefined, 0.78);
        }
      }

      // 2. Visual state
      setPressedPitches((prev) => {
        const next = new Set(prev);
        next.add(pitch);
        if (bassPitch) next.add(bassPitch);
        return next;
      });

      // 3. Optional insertion / audit callback
      onKeyPress?.(pitch);
    },
    [onKeyPress, autoBass, handsMode]
  );

  const handleNoteOff = useCallback(
    (pitch: string) => {
      pianoSynth.releaseNote(pitch);

      let bassPitch: string | null = null;
      if (autoBass && handsMode === "both") {
        const midi = pitchToMidi(pitch);
        if (midi >= 60) {
          const bassMidi = midi >= 72 ? midi - 24 : midi - 12;
          bassPitch = midiToPitch(bassMidi);
          pianoSynth.releaseNote(bassPitch);
        }
      }

      setPressedPitches((prev) => {
        const next = new Set(prev);
        next.delete(pitch);
        if (bassPitch) next.delete(bassPitch);
        return next;
      });

      onKeyRelease?.(pitch);
    },
    [onKeyRelease, autoBass, handsMode]
  );

  // Sustain toggle
  const toggleSustain = useCallback(() => {
    setIsSustain((prev) => {
      const next = !prev;
      pianoSynth.setSustain(next);
      return next;
    });
  }, []);

  // Computer keyboard handlers
  useEffect(() => {
    const activeKeysDown = new Set<string>();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.repeat || e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }

      if (e.code === "Space") {
        e.preventDefault();
        toggleSustain();
        return;
      }

      const key = e.key.toLowerCase();
      const pitch = KEYBOARD_MAP[key];
      if (pitch && !activeKeysDown.has(key)) {
        activeKeysDown.add(key);
        handleNoteOn(pitch);
      }
    };

    const onKeyUp = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }

      const key = e.key.toLowerCase();
      const pitch = KEYBOARD_MAP[key];
      if (pitch) {
        activeKeysDown.delete(key);
        handleNoteOff(pitch);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
    };
  }, [handleNoteOn, handleNoteOff, toggleSustain]);

  // Volume slider
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value, 10);
    setVolumeState(val);
    pianoSynth.setVolume(val / 100);
  };

  // Reverb slider
  const handleReverbChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value, 10);
    setReverbAmount(val);
    pianoSynth.setReverbLevel(val / 100);
  };

  // Quick jump to octave register on 88-key piano
  const jumpToOctave = (targetOct: number) => {
    if (!is88KeyMode) {
      setBaseOctave(Math.max(1, Math.min(5, targetOct)));
      return;
    }
    // In 88-key mode: scroll container to octave position
    if (keysContainerRef.current) {
      const totalWidth = keysContainerRef.current.scrollWidth;
      // White keys: 52 total. Octave 4 starts around white key index 23
      let whiteIdx = 0;
      if (targetOct === 0) whiteIdx = 0;
      else if (targetOct === 1) whiteIdx = 2;
      else if (targetOct === 2) whiteIdx = 9;
      else if (targetOct === 3) whiteIdx = 16;
      else if (targetOct === 4) whiteIdx = 23;
      else if (targetOct === 5) whiteIdx = 30;
      else if (targetOct === 6) whiteIdx = 37;
      else if (targetOct === 7) whiteIdx = 44;
      const scrollPos = (whiteIdx / 52) * totalWidth;
      keysContainerRef.current.scrollTo({ left: scrollPos, behavior: "smooth" });
    }
  };

  return (
    <div
      id="piano-keyboard-container"
      className="w-full bg-stone-900 rounded-2xl shadow-xl overflow-hidden border border-stone-800 flex flex-col"
    >
      {/* Top Controls Strip */}
      <div className="flex flex-wrap items-center justify-between px-3 sm:px-4 py-2 bg-stone-950/90 border-b border-stone-800 text-stone-200 gap-2">
        {/* Left Side: Octave controls + 88-Key mode toggle + Label mode */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          {/* Mode Toggle: 3 Oitavas vs 88 Teclas */}
          <button
            id="btn-toggle-88-keys"
            type="button"
            onClick={() => setIs88KeyMode((prev) => !prev)}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-bold transition-all shrink-0 cursor-pointer ${
              is88KeyMode
                ? "bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-xs"
                : "bg-stone-800 hover:bg-stone-700 text-stone-300"
            }`}
            title="Alternar entre Teclado Dinâmico (3 Oitavas) e Piano de Concerto Completo (88 Teclas)"
          >
            <Maximize2 className="w-3.5 h-3.5 shrink-0" />
            <span>{is88KeyMode ? "🎹 88 Teclas" : "3 Oitavas"}</span>
          </button>

          {/* Octave buttons */}
          {!is88KeyMode ? (
            <div className="flex items-center gap-1 bg-stone-800/80 px-2 py-0.5 rounded-lg border border-stone-700/80 text-xs shrink-0">
              <span className="text-stone-400 font-medium mr-1">Oitava:</span>
              <button
                type="button"
                onClick={() => setBaseOctave((o) => Math.max(1, o - 1))}
                disabled={baseOctave <= 1}
                className="px-1.5 py-0.5 bg-stone-700 hover:bg-stone-600 rounded disabled:opacity-30 cursor-pointer font-mono font-bold"
                title="Descer uma oitava"
              >
                -
              </button>
              <span className="font-bold text-amber-400 px-1 font-mono">
                C{baseOctave}-C{baseOctave + 3}
              </span>
              <button
                type="button"
                onClick={() => setBaseOctave((o) => Math.min(5, o + 1))}
                disabled={baseOctave >= 5}
                className="px-1.5 py-0.5 bg-stone-700 hover:bg-stone-600 rounded disabled:opacity-30 cursor-pointer font-mono font-bold"
                title="Subir uma oitava"
              >
                +
              </button>
            </div>
          ) : (
            /* Quick Jumps for 88 Keys */
            <div className="hidden md:flex items-center gap-1 text-[10px] font-medium text-stone-400 shrink-0">
              <span className="mr-0.5">Saltar:</span>
              <button
                type="button"
                onClick={() => jumpToOctave(0)}
                className="px-1.5 py-0.5 rounded bg-stone-800 hover:bg-stone-700 text-stone-300 cursor-pointer"
              >
                A0
              </button>
              <button
                type="button"
                onClick={() => jumpToOctave(2)}
                className="px-1.5 py-0.5 rounded bg-stone-800 hover:bg-stone-700 text-stone-300 cursor-pointer"
              >
                C2
              </button>
              <button
                type="button"
                onClick={() => jumpToOctave(4)}
                className="px-1.5 py-0.5 rounded bg-amber-600/90 text-white font-bold cursor-pointer"
              >
                C4
              </button>
              <button
                type="button"
                onClick={() => jumpToOctave(5)}
                className="px-1.5 py-0.5 rounded bg-stone-800 hover:bg-stone-700 text-stone-300 cursor-pointer"
              >
                C5
              </button>
              <button
                type="button"
                onClick={() => jumpToOctave(7)}
                className="px-1.5 py-0.5 rounded bg-stone-800 hover:bg-stone-700 text-stone-300 cursor-pointer"
              >
                C7
              </button>
            </div>
          )}

          {/* Label Mode Switcher (Solfège, Scientific, Enharmonic variations) */}
          <div className="flex items-center gap-0.5 bg-stone-800/80 p-0.5 rounded-lg border border-stone-700/80 text-[11px] shrink-0">
            <button
              type="button"
              onClick={() => setLabelMode("pt")}
              className={`px-1.5 py-0.5 rounded transition-all cursor-pointer ${
                labelMode === "pt" ? "bg-amber-600 text-white font-bold" : "text-stone-400 hover:text-white"
              }`}
              title="Mostrar Solfejo (Dó, Ré, Mi)"
            >
              Solfejo
            </button>
            <button
              type="button"
              onClick={() => setLabelMode("enharmonic")}
              className={`px-1.5 py-0.5 rounded transition-all cursor-pointer ${
                labelMode === "enharmonic" ? "bg-amber-600 text-white font-bold" : "text-stone-400 hover:text-white"
              }`}
              title="Mostrar Variações Enarmônicas (♯ / ♭)"
            >
              ♯/♭
            </button>
            <button
              type="button"
              onClick={() => setLabelMode("note")}
              className={`px-1.5 py-0.5 rounded transition-all cursor-pointer ${
                labelMode === "note" ? "bg-amber-600 text-white font-bold" : "text-stone-400 hover:text-white"
              }`}
              title="Mostrar Notação Internacional (C, D, E)"
            >
              C-D-E
            </button>
          </div>
        </div>

        {/* Right side controls: Auto-Accompaniment + Sustain Pedal + Reverb + Volume */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 shrink-0">
          {/* 2 Hands Auto-Accompaniment Toggle */}
          {handsMode === "both" && (
            <button
              id="btn-toggle-auto-bass"
              type="button"
              onClick={() => setAutoBass((b) => !b)}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold tracking-wide transition-all shrink-0 cursor-pointer ${
                autoBass
                  ? "bg-amber-600 text-white shadow-xs"
                  : "bg-stone-800 hover:bg-stone-700 text-stone-300"
              }`}
              title="Acompanhamento harmônico automático da mão esquerda ao tocar melodias"
            >
              <Layers className="w-3.5 h-3.5 shrink-0" />
              <span>
                Baixo Auto: <strong>{autoBass ? "ON" : "OFF"}</strong>
              </span>
            </button>
          )}

          {/* Sustain pedal toggle */}
          <button
            id="btn-sustain-pedal"
            type="button"
            onClick={toggleSustain}
            className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-md text-xs font-semibold tracking-wide transition-all shrink-0 cursor-pointer ${
              isSustain
                ? "bg-amber-500 text-stone-950 shadow-md shadow-amber-500/20"
                : "bg-stone-800 hover:bg-stone-700 text-stone-300"
            }`}
            title="Pressione Barra de Espaço para alternar o pedal de sustentação"
          >
            <span
              className={`w-2 h-2 rounded-full shrink-0 ${
                isSustain ? "bg-stone-950 animate-pulse" : "bg-stone-500"
              }`}
            />
            <span>Sustain {isSustain ? "ON" : "OFF"}</span>
          </button>

          {/* Concert Hall Reverb slider */}
          <div
            className="flex items-center gap-1.5 shrink-0"
            title={`Ressonância / Reverb de Sala de Concerto: ${reverbAmount}%`}
          >
            <span className="text-xs text-stone-400 hidden sm:inline font-medium">
              Reverb:
            </span>
            <input
              id="piano-reverb-slider"
              type="range"
              min="0"
              max="60"
              value={reverbAmount}
              onChange={handleReverbChange}
              className="w-14 sm:w-16 h-1.5 bg-stone-700 rounded-lg appearance-none cursor-pointer accent-amber-500"
            />
            <span className="text-[11px] font-mono text-amber-300/90 w-6">
              {reverbAmount}%
            </span>
          </div>

          {/* Volume slider */}
          <div className="flex items-center gap-1.5 shrink-0">
            <Volume2 className="w-4 h-4 text-stone-400 shrink-0" />
            <input
              id="piano-volume-slider"
              type="range"
              min="0"
              max="100"
              value={volume}
              onChange={handleVolumeChange}
              className="w-14 sm:w-16 md:w-20 h-1.5 bg-stone-700 rounded-lg appearance-none cursor-pointer accent-amber-500"
              title={`Volume: ${volume}%`}
            />
          </div>

          {showKeyboardShortcuts && !is88KeyMode && (
            <div className="hidden xl:flex items-center gap-1 text-[11px] text-stone-400">
              <Keyboard className="w-3.5 h-3.5 text-stone-400" />
              <span>Teclado: Q-W-E / Z-X-C</span>
            </div>
          )}
        </div>
      </div>

      {/* Red Felt Strip above keys */}
      <div className="w-full h-1.5 bg-red-800 shadow-inner" />

      {/* Piano Keys Board */}
      <div
        id="piano-keys-bed"
        ref={keysContainerRef}
        className="relative w-full h-42 sm:h-52 md:h-56 bg-stone-950 px-1 pt-0.5 pb-2 overflow-x-auto select-none scroll-smooth"
        style={{ touchAction: "manipulation" }}
        onPointerDown={() => {
          isPointerDownRef.current = true;
        }}
        onPointerUp={() => {
          isPointerDownRef.current = false;
        }}
        onPointerLeave={() => {
          isPointerDownRef.current = false;
        }}
      >
        <div
          className={`relative h-full flex ${
            is88KeyMode ? "min-w-[1380px] sm:min-w-[1680px]" : "min-w-[620px] sm:min-w-full w-full"
          }`}
        >
          {/* White Keys */}
          <div className="flex w-full h-full relative">
            {whiteKeys.map((key) => {
              const active = pressedPitches.has(key.pitch) || activePitchesSet.has(key.pitch);
              const ptLabel = formatPitchPt(key.pitch);

              return (
                <PianoWhiteKey
                  key={key.pitch}
                  pitch={key.pitch}
                  keyboardKey={key.keyboardKey}
                  ptLabel={ptLabel}
                  active={active}
                  labelMode={labelMode}
                  showKeyboardShortcuts={showKeyboardShortcuts}
                  is88Mode={is88KeyMode}
                  onNoteOn={handleNoteOn}
                  onNoteOff={handleNoteOff}
                  isPointerDownRef={isPointerDownRef}
                />
              );
            })}
          </div>

          {/* Black Keys Layer */}
          <div className="absolute inset-x-0 top-0 h-26 sm:h-34 md:h-36 pointer-events-none flex">
            {blackKeys.map((key) => {
              const active = pressedPitches.has(key.pitch) || activePitchesSet.has(key.pitch);

              let whiteIndexBefore = 0;
              if (is88KeyMode) {
                // In 88-key mode:
                // A#0 is between A0 (whiteIndex 0) and B0 (whiteIndex 1) -> whiteIndexBefore = 1
                if (key.pitch === "A#0") {
                  whiteIndexBefore = 1;
                } else {
                  // For octaves 1 to 7:
                  // Octave 1 starts after A0 and B0 (2 white keys)
                  const baseWhiteForOct = 2 + (key.octave - 1) * 7;
                  let noteWhiteOffset = 0;
                  if (key.note === "C#") noteWhiteOffset = 1;
                  else if (key.note === "D#") noteWhiteOffset = 2;
                  else if (key.note === "F#") noteWhiteOffset = 4;
                  else if (key.note === "G#") noteWhiteOffset = 5;
                  else if (key.note === "A#") noteWhiteOffset = 6;
                  whiteIndexBefore = baseWhiteForOct + noteWhiteOffset;
                }
              } else {
                const octOffset = (key.octave - baseOctave) * 7;
                let noteWhiteOffset = 0;
                if (key.note === "C#") noteWhiteOffset = 1;
                else if (key.note === "D#") noteWhiteOffset = 2;
                else if (key.note === "F#") noteWhiteOffset = 4;
                else if (key.note === "G#") noteWhiteOffset = 5;
                else if (key.note === "A#") noteWhiteOffset = 6;
                whiteIndexBefore = octOffset + noteWhiteOffset;
              }

              const leftPercent = ((whiteIndexBefore - 0.3) / totalWhiteKeys) * 100;
              const widthPercent = (0.6 / totalWhiteKeys) * 100;
              const ptLabel = formatPitchPt(key.pitch);

              return (
                <PianoBlackKey
                  key={key.pitch}
                  pitch={key.pitch}
                  leftPercent={leftPercent}
                  widthPercent={widthPercent}
                  keyboardKey={key.keyboardKey}
                  ptLabel={ptLabel}
                  enharmonicLabel={key.enharmonicLabel}
                  active={active}
                  labelMode={labelMode}
                  showKeyboardShortcuts={showKeyboardShortcuts}
                  is88Mode={is88KeyMode}
                  onNoteOn={handleNoteOn}
                  onNoteOff={handleNoteOff}
                  isPointerDownRef={isPointerDownRef}
                />
              );
            })}
          </div>
        </div>
      </div>

      {/* Mobile touch hint bar */}
      <div className="sm:hidden px-3 py-1 bg-stone-950 text-stone-400 text-[10px] text-center border-t border-stone-800 flex items-center justify-between">
        <span className="flex items-center gap-1">
          <Music2 className="w-3 h-3 text-amber-400" />
          <span>{is88KeyMode ? "Deslize para navegar pelas 88 teclas" : "Arraste horizontalmente para ver mais teclas"}</span>
        </span>
        <span className="text-amber-400/80">Toque simultâneo ativado</span>
      </div>
    </div>
  );
});

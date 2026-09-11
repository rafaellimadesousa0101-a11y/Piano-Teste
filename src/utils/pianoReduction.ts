import { SheetMusic, Measure, NoteItem, ClefType, NoteDuration } from "../types";
import {
  generateNoteId,
  pitchToMidi,
  midiToPitch,
  getAllNotePitches,
  sortPitches,
  getNoteBeats,
} from "./musicNotation";

export interface ReductionOptions {
  reductionStyle: "harmony_piano" | "satb_counterpoint" | "alberti_classical";
  maxHandStretchSemitones: number; // e.g. 14 (octave + 2nd) or 12 (octave)
  distributeVoicesToGrandStaff: boolean; // Soprano/Alto -> Treble, Tenor/Bass -> Bass
  enableSplitVoiceStems: boolean; // Voice 1 stems up, Voice 2 stems down
  consolidateChordClusters: boolean; // Stack notes playing simultaneously
  convertWideArpeggios: boolean; // Set isArpeggiated to true on wide chord voicings
  generateBassIfEmpty: boolean; // Generate left-hand piano accompaniment if bass is empty
  bassPattern: "roots_and_fifths" | "octaves" | "alberti";
}

export const DEFAULT_REDUCTION_OPTIONS: ReductionOptions = {
  reductionStyle: "harmony_piano",
  maxHandStretchSemitones: 12, // Max comfortable 1-hand reach (octave)
  distributeVoicesToGrandStaff: true,
  enableSplitVoiceStems: true,
  consolidateChordClusters: true,
  convertWideArpeggios: true,
  generateBassIfEmpty: true,
  bassPattern: "roots_and_fifths",
};

/**
 * Piano Reduction Engine:
 * Converts and adapts multi-instrument, choral (SATB) or orchestral scores
 * into a beautifully balanced, playable two-hand piano reduction on a Grand Staff.
 */
export function reduceScoreToPiano(
  sheet: SheetMusic,
  options: ReductionOptions = DEFAULT_REDUCTION_OPTIONS
): SheetMusic {
  const [numStr, denStr] = (sheet.timeSignature || "4/4").split("/");
  const num = parseInt(numStr, 10) || 4;
  const den = parseInt(denStr, 10) || 4;
  const measureNominalBeats = (num * 4) / den;

  const reducedMeasures: Measure[] = sheet.measures.map((measure, mIdx) => {
    let trebleNotes = [...(measure.trebleNotes || [])];
    let bassNotes = [...(measure.bassNotes || [])];

    // Step 1: Voice redistribution between Grand Staff clefs
    if (options.distributeVoicesToGrandStaff) {
      const allNotes = [...trebleNotes, ...bassNotes];
      const reTreble: NoteItem[] = [];
      const reBass: NoteItem[] = [];

      for (const raw of allNotes) {
        if (raw.isRest || !raw.pitch) {
          if (raw.clef === "bass") reBass.push(raw);
          else reTreble.push(raw);
          continue;
        }

        const midis = getAllNotePitches(raw).map(pitchToMidi);
        const avgMidi = midis.reduce((a, b) => a + b, 0) / midis.length;

        // Notes below C4 (MIDI 60) go to Left Hand (Bass Clef)
        if (avgMidi < 60) {
          reBass.push({ ...raw, clef: "bass" });
        } else {
          reTreble.push({ ...raw, clef: "treble" });
        }
      }

      trebleNotes = reTreble;
      bassNotes = reBass;
    }

    // Step 2: If Bass is empty or only rests, and generateBassIfEmpty is true:
    const hasMeaningfulBass = bassNotes.some((n) => !n.isRest && n.pitch);
    if (!hasMeaningfulBass && options.generateBassIfEmpty && trebleNotes.length > 0) {
      bassNotes = generatePianoAccompanimentForMeasure(
        trebleNotes,
        measureNominalBeats,
        num,
        options.bassPattern,
        options.reductionStyle
      );
    }

    // Step 3: Consolidate simultaneous notes into chord clusters if requested
    if (options.consolidateChordClusters) {
      trebleNotes = consolidateSimultaneousNotes(trebleNotes);
      bassNotes = consolidateSimultaneousNotes(bassNotes);
    }

    // Step 4: Adapt each hand for ergonomics (stretch limits, arpeggios, stems)
    const finalTrebleNotes = trebleNotes.map((note) =>
      adaptNoteForPianoHand(note, "treble", options)
    );
    const finalBassNotes = bassNotes.map((note) =>
      adaptNoteForPianoHand(note, "bass", options)
    );

    return {
      number: measure.number || mIdx + 1,
      trebleNotes: finalTrebleNotes,
      bassNotes: finalBassNotes,
    };
  });

  return {
    ...sheet,
    title: sheet.title.includes("Redução") ? sheet.title : `${sheet.title} (Redução para Piano Solo)`,
    description: "Redução pianística completa para Grand Staff (2 mãos coordenadas, polifonia e baixo harmônico).",
    category: "reduction",
    measures: reducedMeasures,
  };
}

/**
 * Generate authentic piano accompaniment in Clave de Fá when bass is empty
 */
function generatePianoAccompanimentForMeasure(
  trebleNotes: NoteItem[],
  totalBeats: number,
  timeNum: number,
  pattern: "roots_and_fifths" | "octaves" | "alberti",
  style: "harmony_piano" | "satb_counterpoint" | "alberti_classical"
): NoteItem[] {
  // Find key tonal center from first pitched treble note
  const firstMelodic = trebleNotes.find((n) => !n.isRest && n.pitch);
  const primaryMidi = firstMelodic ? pitchToMidi(firstMelodic.pitch) : 60;
  const noteName = firstMelodic ? firstMelodic.pitch.replace(/\d+/, "") : "C";

  // Map note to deep bass registers
  const bassOctave = 2;
  const rootPitch = `${noteName}${bassOctave}`;
  const rootMidi = pitchToMidi(rootPitch);
  const fifthPitch = midiToPitch(rootMidi + 7);
  const octavePitch = midiToPitch(rootMidi + 12);
  const thirdPitch = midiToPitch(rootMidi + 4);

  const generated: NoteItem[] = [];

  // Style: Alberti Classical
  if (style === "alberti_classical" || pattern === "alberti") {
    // 4 eighth notes or quarters (Root -> 5th -> 3rd -> 5th)
    const albPitches = [rootPitch, fifthPitch, thirdPitch, fifthPitch];
    const duration: NoteDuration = totalBeats <= 2 ? "eighth" : "eighth";
    const count = Math.min(albPitches.length, Math.round(totalBeats * 2));

    for (let i = 0; i < count; i++) {
      generated.push({
        id: generateNoteId(),
        pitch: albPitches[i % albPitches.length],
        duration: "eighth",
        isRest: false,
        clef: "bass",
        voice: 2,
        stemDirection: "down",
      });
    }
    return generated;
  }

  // 3/4 Time Signature: Classical Waltz accompaniment (Bass on 1, Chord on 2 & 3)
  if (timeNum === 3) {
    generated.push({
      id: generateNoteId(),
      pitch: rootPitch,
      chordPitches: [octavePitch],
      duration: "quarter",
      isRest: false,
      clef: "bass",
      voice: 2,
      stemDirection: "down",
    });
    generated.push({
      id: generateNoteId(),
      pitch: thirdPitch,
      chordPitches: [fifthPitch, octavePitch],
      duration: "quarter",
      isRest: false,
      clef: "bass",
      voice: 2,
      stemDirection: "up",
    });
    generated.push({
      id: generateNoteId(),
      pitch: thirdPitch,
      chordPitches: [fifthPitch, octavePitch],
      duration: "quarter",
      isRest: false,
      clef: "bass",
      voice: 2,
      stemDirection: "up",
    });
    return generated;
  }

  // 2/4 Time Signature: March or 2-beat unit
  if (timeNum === 2) {
    generated.push({
      id: generateNoteId(),
      pitch: rootPitch,
      chordPitches: pattern === "octaves" ? [octavePitch] : [fifthPitch, octavePitch],
      duration: "half",
      isRest: false,
      clef: "bass",
      voice: 2,
      stemDirection: "down",
      isArpeggiated: true,
    });
    return generated;
  }

  // 4/4 Time Signature (Default):
  if (pattern === "octaves") {
    generated.push({
      id: generateNoteId(),
      pitch: rootPitch,
      chordPitches: [octavePitch],
      duration: "whole",
      isRest: false,
      clef: "bass",
      voice: 2,
      stemDirection: "down",
    });
  } else {
    // 2 half-note chords (Root foundation on beat 1-2, Fifth/Harmony on beat 3-4)
    generated.push({
      id: generateNoteId(),
      pitch: rootPitch,
      chordPitches: [fifthPitch, octavePitch],
      duration: "half",
      isRest: false,
      clef: "bass",
      voice: 2,
      stemDirection: "down",
      isArpeggiated: true,
    });
    generated.push({
      id: generateNoteId(),
      pitch: fifthPitch,
      chordPitches: [octavePitch, midiToPitch(rootMidi + 16)],
      duration: "half",
      isRest: false,
      clef: "bass",
      voice: 2,
      stemDirection: "down",
    });
  }

  return generated;
}

/**
 * Consolidate notes that occur at the same beat in a measure into single stacked chord NoteItems
 */
function consolidateSimultaneousNotes(notes: NoteItem[]): NoteItem[] {
  if (notes.length <= 1) return notes;

  const result: NoteItem[] = [];
  let currentBeat = 0;
  const beatGroups: Map<number, NoteItem[]> = new Map();

  for (const n of notes) {
    const key = Math.round(currentBeat * 16) / 16;
    if (!beatGroups.has(key)) {
      beatGroups.set(key, []);
    }
    beatGroups.get(key)!.push(n);
    currentBeat += getNoteBeats(n);
  }

  // Iterate over each beat group
  beatGroups.forEach((groupNotes) => {
    const pitchedNotes = groupNotes.filter((n) => !n.isRest && n.pitch);
    if (pitchedNotes.length <= 1) {
      result.push(...groupNotes);
      return;
    }

    // Combine into single chord note
    const allPitches = Array.from(
      new Set(pitchedNotes.flatMap((n) => getAllNotePitches(n)))
    );
    const sorted = sortPitches(allPitches);
    const [primary, ...others] = sorted;
    const baseNote = pitchedNotes[0];

    result.push({
      ...baseNote,
      pitch: primary,
      chordPitches: others.length > 0 ? others : undefined,
    });
  });

  return result;
}

/**
 * Adapt an individual note or chord for playable two-hand piano mechanics
 */
function adaptNoteForPianoHand(
  note: NoteItem,
  hand: ClefType,
  options: ReductionOptions
): NoteItem {
  if (note.isRest || !note.pitch) {
    return { ...note, clef: hand };
  }

  const allPitches = getAllNotePitches(note);
  if (allPitches.length === 0) return { ...note, clef: hand };

  // Calculate midi range
  const midis = allPitches.map((p) => pitchToMidi(p));
  const minMidi = Math.min(...midis);
  const maxMidi = Math.max(...midis);
  const stretch = maxMidi - minMidi;

  // Adjust unplayable hand stretches (> max stretch semitones)
  let adjustedPitches = [...allPitches];
  if (stretch > options.maxHandStretchSemitones && allPitches.length > 1) {
    adjustedPitches = allPitches.map((p, idx) => {
      const m = pitchToMidi(p);
      if (idx > 0 && m - minMidi > options.maxHandStretchSemitones) {
        return midiToPitch(m - 12);
      }
      return p;
    });
  }

  adjustedPitches = sortPitches(Array.from(new Set(adjustedPitches)));
  const [primaryPitch, ...chordOthers] = adjustedPitches;

  // Determine split voice stem direction
  let voice: 1 | 2 | undefined = note.voice;
  let stemDirection: "up" | "down" | "auto" | undefined = note.stemDirection;

  if (options.enableSplitVoiceStems) {
    if (hand === "treble") {
      voice = voice || 1;
      stemDirection = stemDirection || "up";
    } else {
      voice = voice || 2;
      stemDirection = stemDirection || "down";
    }
  }

  // Arpeggiate wide rolled chords (> 9 semitones)
  const isArpeggiated =
    note.isArpeggiated ||
    (options.convertWideArpeggios && adjustedPitches.length >= 3 && stretch >= 10);

  return {
    ...note,
    id: note.id || generateNoteId(),
    pitch: primaryPitch,
    chordPitches: chordOthers.length > 0 ? chordOthers : undefined,
    clef: hand,
    voice,
    stemDirection,
    isArpeggiated,
  };
}


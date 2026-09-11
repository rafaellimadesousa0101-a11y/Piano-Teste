import { NoteDuration, ClefType, NoteItem, AccidentalType } from "../types";

export const DURATION_BEATS: Record<NoteDuration, number> = {
  whole: 4,
  half: 2,
  quarter: 1,
  eighth: 0.5,
  sixteenth: 0.25,
  thirtysecond: 0.125,
};

export function getNoteBeats(note: NoteItem): number {
  const base = DURATION_BEATS[note.duration] || 1;
  return note.dotted ? base * 1.5 : base;
}

export const DURATION_NAMES_PT: Record<NoteDuration, string> = {
  whole: "Semibreve (4T)",
  half: "Mínima (2T)",
  quarter: "Semínima (1T)",
  eighth: "Colcheia (½T)",
  sixteenth: "Semicolcheia (¼T)",
  thirtysecond: "Fusa (⅛T)",
};

export const NOTE_NAMES_PT: Record<string, string> = {
  C: "Dó",
  "C#": "Dó♯",
  Db: "Ré♭",
  D: "Ré",
  "D#": "Ré♯",
  Eb: "Mi♭",
  E: "Mi",
  "E#": "Mi♯",
  Fb: "Fá♭",
  F: "Fá",
  "F#": "Fá♯",
  Gb: "Sol♭",
  G: "Sol",
  "G#": "Sol♯",
  Ab: "Lá♭",
  A: "Lá",
  "A#": "Lá♯",
  Bb: "Si♭",
  B: "Si",
  "B#": "Si♯",
  Cb: "Dó♭",
  // Double sharps
  "C##": "Dó𝄪",
  Cx: "Dó𝄪",
  "D##": "Ré𝄪",
  Dx: "Ré𝄪",
  "E##": "Mi𝄪",
  Ex: "Mi𝄪",
  "F##": "Fá𝄪",
  Fx: "Fá𝄪",
  "G##": "Sol𝄪",
  Gx: "Sol𝄪",
  "A##": "Lá𝄪",
  Ax: "Lá𝄪",
  "B##": "Si𝄪",
  Bx: "Si𝄪",
  // Double flats
  Cbb: "Dó𝄫",
  Dbb: "Ré𝄫",
  Ebb: "Mi𝄫",
  Fbb: "Fá𝄫",
  Gbb: "Sol𝄫",
  Abb: "Lá𝄫",
  Bbb: "Si𝄫",
};

// Map pitch string (e.g. "C4", "F#3", "Bb2", "E#4", "Cb3", "Cx4", "Dbb3") to MIDI number
export function pitchToMidi(pitch: string): number {
  if (!pitch) return 0;
  const match = pitch.match(/^([A-G])(#|b|##|bb|x)?(-?\d+)$/);
  if (!match) return 60; // default to C4

  const letter = match[1];
  const acc = match[2] || "";
  const octave = parseInt(match[3], 10);

  const baseSemitones: Record<string, number> = {
    C: 0,
    D: 2,
    E: 4,
    F: 5,
    G: 7,
    A: 9,
    B: 11,
  };

  let semitone = baseSemitones[letter] ?? 0;
  if (acc === "#") semitone += 1;
  else if (acc === "b") semitone -= 1;
  else if (acc === "##" || acc === "x") semitone += 2;
  else if (acc === "bb") semitone -= 2;

  return (octave + 1) * 12 + semitone;
}

// Convert MIDI number to Frequency (Hz)
export function midiToFrequency(midi: number): number {
  return 440 * Math.pow(2, (midi - 69) / 12);
}

// Convert pitch string directly to Frequency (Hz)
export function pitchToFrequency(pitch: string): number {
  return midiToFrequency(pitchToMidi(pitch));
}

// Translate pitch to friendly Portuguese label, e.g. "C4" -> "Dó4", "F#4" -> "Fá♯4", "Db4" -> "Ré♭4", "Cx4" -> "Dó𝄪4"
export function formatPitchPt(pitch: string): string {
  if (!pitch) return "Pausa";
  const match = pitch.match(/^([A-G])(#|b|##|bb|x)?(-?\d+)$/);
  if (!match) return pitch;
  const letter = match[1];
  const acc = match[2] || "";
  const octave = match[3];

  const key = `${letter}${acc}`;
  const ptName = NOTE_NAMES_PT[key] || `${NOTE_NAMES_PT[letter] || letter}${acc}`;
  return `${ptName}${octave}`;
}

// Get the step distance of a note on the diatonic staff
// C4 = step 0 (relative to Middle C)
export function getDiatonicStep(pitch: string): number {
  if (!pitch) return 0;
  const match = pitch.match(/^([A-G])(#|b|##|bb|x)?(-?\d+)$/);
  if (!match) return 0;
  const letter = match[1];
  const octave = parseInt(match[3], 10);

  const letterSteps: Record<string, number> = {
    C: 0,
    D: 1,
    E: 2,
    F: 3,
    G: 4,
    A: 5,
    B: 6,
  };

  const baseStep = letterSteps[letter] ?? 0;
  // Step relative to C4 (octave 4)
  return (octave - 4) * 7 + baseStep;
}

/**
 * Calculates the Y coordinate on an SVG staff
 * Staff spacing: each line-to-line is 10px. Step is 5px (half-line).
 *
 * In Treble Clef:
 * Line 5 (top) = F5 -> step 10 from C4
 * Line 4 = D5 -> step 8 from C4
 * Line 3 = B4 -> step 6 from C4
 * Line 2 = G4 -> step 4 from C4
 * Line 1 (bottom) = E4 -> step 2 from C4
 * First ledger line below = C4 -> step 0
 *
 * Let staffCenterY be the middle line (Line 3, B4 for Treble):
 * Y = staffCenterY - (step - centerStep) * 5
 */
export function getStaffY(pitch: string, clef: ClefType, staffCenterY: number): number {
  const step = getDiatonicStep(pitch);
  const stepDistance = 5; // half line distance (line-to-line is 10)

  if (clef === "treble") {
    // Treble center line (line 3) is B4 (step 6 from C4)
    const trebleCenterStep = 6;
    return staffCenterY - (step - trebleCenterStep) * stepDistance;
  } else {
    // Bass center line (line 3) is D3.
    // D3 step relative to C4: (3 - 4)*7 + 1 = -6
    const bassCenterStep = -6;
    return staffCenterY - (step - bassCenterStep) * stepDistance;
  }
}

// Check ledger lines needed for a note on a staff
export function getLedgerLines(pitch: string, clef: ClefType): number[] {
  const step = getDiatonicStep(pitch);
  const ledgers: number[] = [];

  if (clef === "treble") {
    // Bottom line is E4 (step 2). C4 is step 0 (needs 1 ledger line below)
    // Notes lower than E4:
    if (step <= 0) {
      // step 0 (C4), step -2 (A3), step -4 (F3), etc.
      for (let s = 0; s >= step; s -= 2) {
        ledgers.push(s);
      }
    }
    // Top line is F5 (step 10). Notes higher than G5 (step 11): A5 (step 12), C6 (step 14)
    if (step >= 12) {
      for (let s = 12; s <= step; s += 2) {
        ledgers.push(s);
      }
    }
  } else {
    // Bass staff: Bottom line G2 (step -10).
    // Notes lower: E2 (step -12), C2 (step -14)
    if (step <= -12) {
      for (let s = -12; s >= step; s -= 2) {
        ledgers.push(s);
      }
    }
    // Top line is A3 (step -2). C4 (step 0) is 1 ledger line above
    if (step >= 0) {
      for (let s = 0; s <= step; s += 2) {
        ledgers.push(s);
      }
    }
  }

  return ledgers;
}

// Generate unique ID
export function generateNoteId(): string {
  return "note_" + Math.random().toString(36).substring(2, 9);
}

// Convert a diatonic staff step back into a pitch string (e.g. 0 -> C4, 1 -> D4, 6 -> B4)
export function stepToPitch(step: number, accidental: AccidentalType = "none"): string {
  const letters = ["C", "D", "E", "F", "G", "A", "B"];
  const baseOctave = 4;

  let octave = baseOctave + Math.floor(step / 7);
  let letterIndex = step % 7;
  if (letterIndex < 0) {
    letterIndex += 7;
  }

  const letter = letters[letterIndex];
  let accSymbol = "";
  if (accidental === "#") accSymbol = "#";
  else if (accidental === "b") accSymbol = "b";
  else if (accidental === "##") accSymbol = "##";
  else if (accidental === "bb") accSymbol = "bb";
  // "none" or "natural" has no suffix in pitch string
  return `${letter}${accSymbol}${octave}`;
}

// Transpose pitch by semitones (+1 or -1)
export function transposePitch(pitch: string, semitones: number): string {
  if (!pitch) return pitch;
  const midi = pitchToMidi(pitch) + semitones;
  const clampedMidi = Math.max(21, Math.min(108, midi)); // A0 to C8 (full standard 88-key piano range)
  return midiToPitch(clampedMidi);
}

// Convert MIDI number to pitch string
export function midiToPitch(midi: number): string {
  const notes = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
  const octave = Math.floor(midi / 12) - 1;
  const noteIndex = midi % 12;
  return `${notes[noteIndex]}${octave}`;
}

// Extract all pitches contained in a NoteItem (primary pitch + stacked chord notes)
export function getAllNotePitches(note: NoteItem): string[] {
  if (note.isRest || !note.pitch) return [];
  const list = [note.pitch, ...(note.chordPitches || [])].filter(Boolean);
  return sortPitches(Array.from(new Set(list)));
}

// Sort pitches from lowest to highest frequency (by MIDI number)
export function sortPitches(pitches: string[]): string[] {
  return [...pitches].sort((a, b) => pitchToMidi(a) - pitchToMidi(b));
}

// Add stacked harmonic pitch(es) to a NoteItem (avoids duplicates, maintains chord sorted)
export function addPitchToNote(note: NoteItem, ...newPitches: string[]): NoteItem {
  if (note.isRest || newPitches.length === 0) return note;
  const existing = getAllNotePitches(note);
  const combined = sortPitches(Array.from(new Set([...existing, ...newPitches.filter(Boolean)])));
  const [primary, ...rest] = combined;
  return {
    ...note,
    pitch: primary,
    chordPitches: rest.length > 0 ? rest : undefined,
  };
}

// Remove a pitch from a chord in a NoteItem
export function removePitchFromNote(note: NoteItem, pitchToRemove: string): NoteItem {
  if (note.isRest) return note;
  const existing = getAllNotePitches(note).filter((p) => p !== pitchToRemove);
  if (existing.length === 0) {
    return { ...note, isRest: true, pitch: "", chordPitches: undefined };
  }
  const [primary, ...rest] = existing;
  return {
    ...note,
    pitch: primary,
    chordPitches: rest.length > 0 ? rest : undefined,
  };
}

// Generate an SVG path for an authentic musical arpeggio wavy line
// Renders vertical sinusoidal waves adjacent to chord clusters
export function generateArpeggioWavyPath(x: number, topY: number, bottomY: number): string {
  const height = Math.abs(bottomY - topY);
  const waveLength = 10; // wavelength in pixels
  const waveCount = Math.max(2, Math.round(height / waveLength));
  const stepY = height / waveCount;
  const amplitude = 3.2;

  let d = `M ${x} ${topY}`;
  let currentY = topY;

  for (let i = 0; i < waveCount; i++) {
    const nextY = currentY + stepY;
    const midY = currentY + stepY / 2;
    // Cubic bezier to create smooth musical wave
    d += ` C ${x - amplitude} ${currentY + stepY * 0.25}, ${x + amplitude} ${currentY + stepY * 0.75}, ${x} ${nextY}`;
    currentY = nextY;
  }

  // Add small bottom flourish/hook
  d += ` Q ${x - amplitude * 0.8} ${bottomY + 3} ${x - 1} ${bottomY + 5}`;
  return d;
}

// Format chord in Portuguese, e.g. "Dó4+Mi4+Sol4"
export function formatChordPt(pitches: string[]): string {
  if (!pitches || pitches.length === 0) return "Pausa";
  if (pitches.length === 1) return formatPitchPt(pitches[0]);
  return pitches.map((p) => formatPitchPt(p)).join("+");
}

// Quick harmonic builder for common intervals and chords
export function buildHarmonicInterval(
  basePitch: string,
  type: "3M" | "3m" | "5J" | "8J" | "triadMaj" | "triadMin" | "dom7"
): string[] {
  const baseMidi = pitchToMidi(basePitch);
  switch (type) {
    case "3M": // Major third (+4 semitones)
      return [midiToPitch(baseMidi + 4)];
    case "3m": // Minor third (+3 semitones)
      return [midiToPitch(baseMidi + 3)];
    case "5J": // Perfect fifth (+7 semitones)
      return [midiToPitch(baseMidi + 7)];
    case "8J": // Octave (+12 semitones)
      return [midiToPitch(baseMidi + 12)];
    case "triadMaj": // Major Triad (root, +4, +7)
      return [midiToPitch(baseMidi + 4), midiToPitch(baseMidi + 7)];
    case "triadMin": // Minor Triad (root, +3, +7)
      return [midiToPitch(baseMidi + 3), midiToPitch(baseMidi + 7)];
    case "dom7": // Dominant 7th (root, +4, +7, +10)
      return [midiToPitch(baseMidi + 4), midiToPitch(baseMidi + 7), midiToPitch(baseMidi + 10)];
    default:
      return [];
  }
}



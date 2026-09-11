export type NoteDuration =
  | "whole"
  | "half"
  | "quarter"
  | "eighth"
  | "sixteenth"
  | "thirtysecond";

export type ClefType = "treble" | "bass";
export type ClefSelection = "treble" | "bass" | "both";
export type AccidentalType = "none" | "#" | "b" | "##" | "bb" | "natural";

export interface NoteItem {
  id: string;
  pitch: string; // Primary pitch e.g. "C4", "D#4", "Bb3", or "" if isRest
  chordPitches?: string[]; // Stacked harmonic pitches played simultaneously (e.g. ["E4", "G4"])
  duration: NoteDuration;
  dotted?: boolean;
  isRest: boolean;
  clef: ClefType;
  voice?: 1 | 2; // Multi-voice counterpoint (Voice 1 = Soprano/Tenor, Voice 2 = Alto/Bass)
  stemDirection?: "up" | "down" | "auto"; // Stem direction for split voice notation
  isArpeggiated?: boolean; // Rolled/arpeggiated chord indicated by vertical wavy line
}

export interface Measure {
  number: number;
  trebleNotes: NoteItem[];
  bassNotes: NoteItem[];
}

export type ScoreCategory = "solo" | "reduction" | "classic" | "popular";

export interface SheetMusic {
  id?: string;
  title: string;
  composer?: string;
  category?: ScoreCategory;
  description?: string;
  tempo: number; // BPM
  timeSignature: "4/4" | "3/4" | "2/4";
  keySignature: string; // e.g. "C", "G", "F", "Am"
  measures: Measure[];
}

export interface PlayingNoteEvent {
  pitch: string;
  clef: ClefType;
  durationMs: number;
  noteId: string;
  measureNumber: number;
}

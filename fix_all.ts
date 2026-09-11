import * as fs from 'fs';
import { PRESET_SHEET_MUSICS } from "./src/data/presets";
import { SheetMusic, Measure, NoteDuration, NoteItem } from "./src/types";

const DURATION_VALUES: Record<NoteDuration, number> = {
  whole: 4,
  half: 2,
  quarter: 1,
  eighth: 0.5,
  sixteenth: 0.25,
  thirtysecond: 0.125
};

function getDuration(note: NoteItem): number {
  let val = DURATION_VALUES[note.duration];
  if (note.dotted) val *= 1.5;
  return val;
}

function getTimeSigBeats(ts: string): number {
  if (ts === "4/4") return 4;
  if (ts === "3/4") return 3;
  if (ts === "2/4") return 2;
  return 4;
}

function fixNoteDurations(file: string) {
  let content = fs.readFileSync(file, 'utf8');

  // I will write a regex/replacement logic here, or just dump the corrected JSON back.
  // Wait, if I dump JSON back, I lose the TS structure and functions like generateNoteId().
  // Instead I'll use a replacer.
}

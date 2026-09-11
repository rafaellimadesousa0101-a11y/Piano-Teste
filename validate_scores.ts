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

for (const sheet of PRESET_SHEET_MUSICS) {
  const expectedBeats = getTimeSigBeats(sheet.timeSignature);
  let errorFound = false;

  for (const m of sheet.measures) {
    let trebleBeats = 0;
    for (const n of m.trebleNotes) {
      trebleBeats += getDuration(n);
    }
    let bassBeats = 0;
    for (const n of m.bassNotes) {
      bassBeats += getDuration(n);
    }
    
    if (Math.abs(trebleBeats - expectedBeats) > 0.01) {
      console.log(`[${sheet.title}] Measure ${m.number} treble has ${trebleBeats} beats, expected ${expectedBeats}`);
      errorFound = true;
    }
    if (Math.abs(bassBeats - expectedBeats) > 0.01) {
      console.log(`[${sheet.title}] Measure ${m.number} bass has ${bassBeats} beats, expected ${expectedBeats}`);
      errorFound = true;
    }
  }
}
console.log("Validation complete.");

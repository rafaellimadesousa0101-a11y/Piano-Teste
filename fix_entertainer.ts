import * as fs from 'fs';

const content = fs.readFileSync('src/data/presetsPiano.ts', 'utf8');

let newContent = content;

const replacements = [
  // Measure 1
  {
    search: `        number: 1,
        trebleNotes: [
          { id: generateNoteId(), pitch: "D4", duration: "sixteenth"`,
    replace: `        number: 1,
        trebleNotes: [
          { id: generateNoteId(), pitch: "", duration: "eighth", isRest: true, clef: "treble" },
          { id: generateNoteId(), pitch: "D4", duration: "sixteenth"`
  },
  // Measure 2
  {
    search: `          { id: generateNoteId(), pitch: "C5", duration: "quarter", isRest: false, clef: "treble" },
        ],
        bassNotes: [
          { id: generateNoteId(), pitch: "G2", duration: "quarter", isRest: false, clef: "bass" },`,
    replace: `          { id: generateNoteId(), pitch: "C5", duration: "quarter", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "", duration: "sixteenth", isRest: true, clef: "treble" },
        ],
        bassNotes: [
          { id: generateNoteId(), pitch: "G2", duration: "quarter", isRest: false, clef: "bass" },`
  },
  // Measure 3
  {
    search: `        number: 3,
        trebleNotes: [
          { id: generateNoteId(), pitch: "C4", chordPitches: ["E4", "G4"], duration: "sixteenth", isRest: false, clef: "treble" },`,
    replace: `        number: 3,
        trebleNotes: [
          { id: generateNoteId(), pitch: "", duration: "eighth", dotted: true, isRest: true, clef: "treble" },
          { id: generateNoteId(), pitch: "C4", chordPitches: ["E4", "G4"], duration: "sixteenth", isRest: false, clef: "treble" },`
  },
  // Measure 4
  {
    search: `        number: 4,
        trebleNotes: [
          { id: generateNoteId(), pitch: "D4", chordPitches: ["F4", "B4"], duration: "eighth", isRest: false, clef: "treble" },`,
    replace: `        number: 4,
        trebleNotes: [
          { id: generateNoteId(), pitch: "", duration: "eighth", isRest: true, clef: "treble" },
          { id: generateNoteId(), pitch: "D4", chordPitches: ["F4", "B4"], duration: "eighth", isRest: false, clef: "treble" },`
  },
  // Measure 5
  {
    search: `        number: 5,
        trebleNotes: [
          { id: generateNoteId(), pitch: "D4", duration: "sixteenth", isRest: false, clef: "treble" },`,
    replace: `        number: 5,
        trebleNotes: [
          { id: generateNoteId(), pitch: "", duration: "eighth", isRest: true, clef: "treble" },
          { id: generateNoteId(), pitch: "D4", duration: "sixteenth", isRest: false, clef: "treble" },`
  },
  // Measure 6
  {
    search: `        number: 6,
        trebleNotes: [
          { id: generateNoteId(), pitch: "C5", duration: "eighth", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "E4", duration: "sixteenth", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "C5", duration: "quarter", isRest: false, clef: "treble" },
        ],
        bassNotes: [
          { id: generateNoteId(), pitch: "E3", duration: "quarter", isRest: false, clef: "bass" },`,
    replace: `        number: 6,
        trebleNotes: [
          { id: generateNoteId(), pitch: "C5", duration: "eighth", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "E4", duration: "sixteenth", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "C5", duration: "quarter", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "", duration: "sixteenth", isRest: true, clef: "treble" },
        ],
        bassNotes: [
          { id: generateNoteId(), pitch: "E3", duration: "quarter", isRest: false, clef: "bass" },`
  },
  // Measure 7
  {
    search: `        number: 7,
        trebleNotes: [
          { id: generateNoteId(), pitch: "C5", duration: "sixteenth", isRest: false, clef: "treble" },`,
    replace: `        number: 7,
        trebleNotes: [
          { id: generateNoteId(), pitch: "", duration: "eighth", isRest: true, clef: "treble" },
          { id: generateNoteId(), pitch: "C5", duration: "sixteenth", isRest: false, clef: "treble" },`
  }
];

for (const r of replacements) {
  if (!newContent.includes(r.search)) {
    console.error("Could not find search string for replacement:", r.search.substring(0, 50));
  }
  newContent = newContent.replace(r.search, r.replace);
}

fs.writeFileSync('src/data/presetsPiano.ts', newContent);

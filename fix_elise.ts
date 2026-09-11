import * as fs from 'fs';

let content = fs.readFileSync('src/data/presets.ts', 'utf8');

// Measure 9
content = content.replace(
  `pitch: "A4", duration: "half", isRest: false, clef: "treble" },`,
  `pitch: "A4", duration: "eighth", isRest: false, clef: "treble" },`
);

// Measure 10
content = content.replace(
  `pitch: "E5", duration: "half", isRest: false, clef: "treble" },`,
  `pitch: "E5", duration: "eighth", isRest: false, clef: "treble" },`
);

// Measure 11
content = content.replace(
  `pitch: "D5", duration: "half", isRest: false, clef: "treble" },`,
  `pitch: "D5", duration: "quarter", dotted: true, isRest: false, clef: "treble" },`
);

// Measure 12
content = content.replace(
  `pitch: "C5", duration: "half", isRest: false, clef: "treble" },`,
  `pitch: "C5", duration: "quarter", dotted: true, isRest: false, clef: "treble" },`
);

// Measure 13
content = content.replace(
  `pitch: "B4", duration: "half", isRest: false, clef: "treble" },`,
  `pitch: "B4", duration: "quarter", dotted: true, isRest: false, clef: "treble" },`
);

fs.writeFileSync('src/data/presets.ts', content);

import { SheetMusic } from "../types";
import { generateNoteId } from "../utils/musicNotation";

export const FAMOUS_PRESET_SHEETS: SheetMusic[] = [
  // 1. Titanic (My Heart Will Go On) - James Horner
  {
    id: "titanic",
    title: "Titanic (My Heart Will Go On)",
    composer: "James Horner",
    tempo: 100,
    timeSignature: "4/4",
    keySignature: "G",
    measures: [
      {
        number: 1,
        trebleNotes: [
          { id: generateNoteId(), pitch: "E4", duration: "quarter", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "F#4", duration: "quarter", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "G4", duration: "half", isRest: false, clef: "treble" },
        ],
        bassNotes: [
          { id: generateNoteId(), pitch: "G2", duration: "half", isRest: false, clef: "bass" },
          { id: generateNoteId(), pitch: "D3", duration: "half", isRest: false, clef: "bass" },
        ],
      },
      {
        number: 2,
        trebleNotes: [
          { id: generateNoteId(), pitch: "A4", duration: "half", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "G4", duration: "quarter", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "F#4", duration: "quarter", isRest: false, clef: "treble" },
        ],
        bassNotes: [
          { id: generateNoteId(), pitch: "C3", duration: "half", isRest: false, clef: "bass" },
          { id: generateNoteId(), pitch: "G3", duration: "half", isRest: false, clef: "bass" },
        ],
      },
      {
        number: 3,
        trebleNotes: [
          { id: generateNoteId(), pitch: "G4", duration: "half", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "E4", duration: "quarter", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "F#4", duration: "quarter", isRest: false, clef: "treble" },
        ],
        bassNotes: [
          { id: generateNoteId(), pitch: "E2", duration: "half", isRest: false, clef: "bass" },
          { id: generateNoteId(), pitch: "B2", duration: "half", isRest: false, clef: "bass" },
        ],
      },
      {
        number: 4,
        trebleNotes: [
          { id: generateNoteId(), pitch: "D4", duration: "whole", isRest: false, clef: "treble" },
        ],
        bassNotes: [
          { id: generateNoteId(), pitch: "D3", duration: "whole", isRest: false, clef: "bass" },
        ],
      },
      {
        number: 5,
        trebleNotes: [
          { id: generateNoteId(), pitch: "E4", duration: "quarter", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "F#4", duration: "quarter", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "G4", duration: "half", isRest: false, clef: "treble" },
        ],
        bassNotes: [
          { id: generateNoteId(), pitch: "G2", duration: "half", isRest: false, clef: "bass" },
          { id: generateNoteId(), pitch: "D3", duration: "half", isRest: false, clef: "bass" },
        ],
      },
      {
        number: 6,
        trebleNotes: [
          { id: generateNoteId(), pitch: "A4", duration: "half", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "G4", duration: "quarter", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "F#4", duration: "quarter", isRest: false, clef: "treble" },
        ],
        bassNotes: [
          { id: generateNoteId(), pitch: "C3", duration: "half", isRest: false, clef: "bass" },
          { id: generateNoteId(), pitch: "G3", duration: "half", isRest: false, clef: "bass" },
        ],
      },
      {
        number: 7,
        trebleNotes: [
          { id: generateNoteId(), pitch: "G4", duration: "half", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "F#4", duration: "quarter", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "G4", duration: "quarter", isRest: false, clef: "treble" },
        ],
        bassNotes: [
          { id: generateNoteId(), pitch: "D3", duration: "half", isRest: false, clef: "bass" },
          { id: generateNoteId(), pitch: "G2", duration: "half", isRest: false, clef: "bass" },
        ],
      },
      {
        number: 8,
        trebleNotes: [
          { id: generateNoteId(), pitch: "A4", duration: "whole", isRest: false, clef: "treble" },
        ],
        bassNotes: [
          { id: generateNoteId(), pitch: "D3", duration: "whole", isRest: false, clef: "bass" },
        ],
      },
      {
        number: 9,
        trebleNotes: [
          { id: generateNoteId(), pitch: "G4", duration: "quarter", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "A4", duration: "quarter", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "D5", duration: "half", isRest: false, clef: "treble" },
        ],
        bassNotes: [
          { id: generateNoteId(), pitch: "G2", duration: "half", isRest: false, clef: "bass" },
          { id: generateNoteId(), pitch: "D3", duration: "half", isRest: false, clef: "bass" },
        ],
      },
      {
        number: 10,
        trebleNotes: [
          { id: generateNoteId(), pitch: "C5", duration: "half", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "B4", duration: "quarter", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "A4", duration: "quarter", isRest: false, clef: "treble" },
        ],
        bassNotes: [
          { id: generateNoteId(), pitch: "C3", duration: "half", isRest: false, clef: "bass" },
          { id: generateNoteId(), pitch: "G2", duration: "half", isRest: false, clef: "bass" },
        ],
      },
      {
        number: 11,
        trebleNotes: [
          { id: generateNoteId(), pitch: "B4", duration: "half", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "A4", duration: "quarter", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "G4", duration: "quarter", isRest: false, clef: "treble" },
        ],
        bassNotes: [
          { id: generateNoteId(), pitch: "E2", duration: "half", isRest: false, clef: "bass" },
          { id: generateNoteId(), pitch: "B2", duration: "half", isRest: false, clef: "bass" },
        ],
      },
      {
        number: 12,
        trebleNotes: [
          { id: generateNoteId(), pitch: "F#4", duration: "half", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "G4", duration: "half", isRest: false, clef: "treble" },
        ],
        bassNotes: [
          { id: generateNoteId(), pitch: "D3", duration: "whole", isRest: false, clef: "bass" },
        ],
      },
      {
        number: 13,
        trebleNotes: [
          { id: generateNoteId(), pitch: "G4", duration: "whole", isRest: false, clef: "treble" },
        ],
        bassNotes: [
          { id: generateNoteId(), pitch: "G2", duration: "whole", isRest: false, clef: "bass" },
        ],
      },
    ],
  },

  // 2. O Poderoso Chefão (The Godfather) - Nino Rota
  {
    id: "godfather",
    title: "O Poderoso Chefão (The Godfather)",
    composer: "Nino Rota",
    tempo: 88,
    timeSignature: "4/4",
    keySignature: "Am",
    measures: [
      {
        number: 1,
        trebleNotes: [
          { id: generateNoteId(), pitch: "E4", duration: "quarter", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "A4", duration: "quarter", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "C5", duration: "quarter", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "B4", duration: "quarter", isRest: false, clef: "treble" },
        ],
        bassNotes: [
          { id: generateNoteId(), pitch: "A2", duration: "half", isRest: false, clef: "bass" },
          { id: generateNoteId(), pitch: "E3", duration: "half", isRest: false, clef: "bass" },
        ],
      },
      {
        number: 2,
        trebleNotes: [
          { id: generateNoteId(), pitch: "A4", duration: "quarter", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "C5", duration: "quarter", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "A4", duration: "quarter", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "B4", duration: "quarter", isRest: false, clef: "treble" },
        ],
        bassNotes: [
          { id: generateNoteId(), pitch: "A2", duration: "half", isRest: false, clef: "bass" },
          { id: generateNoteId(), pitch: "C3", duration: "half", isRest: false, clef: "bass" },
        ],
      },
      {
        number: 3,
        trebleNotes: [
          { id: generateNoteId(), pitch: "A4", duration: "quarter", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "F4", duration: "quarter", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "G#4", duration: "half", isRest: false, clef: "treble" },
        ],
        bassNotes: [
          { id: generateNoteId(), pitch: "D3", duration: "half", isRest: false, clef: "bass" },
          { id: generateNoteId(), pitch: "E3", duration: "half", isRest: false, clef: "bass" },
        ],
      },
      {
        number: 4,
        trebleNotes: [
          { id: generateNoteId(), pitch: "E4", duration: "whole", isRest: false, clef: "treble" },
        ],
        bassNotes: [
          { id: generateNoteId(), pitch: "E3", duration: "whole", isRest: false, clef: "bass" },
        ],
      },
      {
        number: 5,
        trebleNotes: [
          { id: generateNoteId(), pitch: "E4", duration: "quarter", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "A4", duration: "quarter", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "C5", duration: "quarter", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "B4", duration: "quarter", isRest: false, clef: "treble" },
        ],
        bassNotes: [
          { id: generateNoteId(), pitch: "A2", duration: "half", isRest: false, clef: "bass" },
          { id: generateNoteId(), pitch: "E3", duration: "half", isRest: false, clef: "bass" },
        ],
      },
      {
        number: 6,
        trebleNotes: [
          { id: generateNoteId(), pitch: "A4", duration: "quarter", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "C5", duration: "quarter", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "A4", duration: "quarter", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "B4", duration: "quarter", isRest: false, clef: "treble" },
        ],
        bassNotes: [
          { id: generateNoteId(), pitch: "A2", duration: "half", isRest: false, clef: "bass" },
          { id: generateNoteId(), pitch: "C3", duration: "half", isRest: false, clef: "bass" },
        ],
      },
      {
        number: 7,
        trebleNotes: [
          { id: generateNoteId(), pitch: "A4", duration: "quarter", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "F4", duration: "quarter", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "E4", duration: "quarter", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "D#4", duration: "quarter", isRest: false, clef: "treble" },
        ],
        bassNotes: [
          { id: generateNoteId(), pitch: "D3", duration: "half", isRest: false, clef: "bass" },
          { id: generateNoteId(), pitch: "B2", duration: "half", isRest: false, clef: "bass" },
        ],
      },
      {
        number: 8,
        trebleNotes: [
          { id: generateNoteId(), pitch: "E4", duration: "whole", isRest: false, clef: "treble" },
        ],
        bassNotes: [
          { id: generateNoteId(), pitch: "E3", duration: "whole", isRest: false, clef: "bass" },
        ],
      },
      {
        number: 9,
        trebleNotes: [
          { id: generateNoteId(), pitch: "D5", duration: "quarter", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "C5", duration: "quarter", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "B4", duration: "quarter", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "A4", duration: "quarter", isRest: false, clef: "treble" },
        ],
        bassNotes: [
          { id: generateNoteId(), pitch: "D3", duration: "half", isRest: false, clef: "bass" },
          { id: generateNoteId(), pitch: "F3", duration: "half", isRest: false, clef: "bass" },
        ],
      },
      {
        number: 10,
        trebleNotes: [
          { id: generateNoteId(), pitch: "C5", duration: "half", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "A4", duration: "half", isRest: false, clef: "treble" },
        ],
        bassNotes: [
          { id: generateNoteId(), pitch: "A2", duration: "whole", isRest: false, clef: "bass" },
        ],
      },
    ],
  },

  // 3. Piratas do Caribe (He's a Pirate) - Hans Zimmer / Klaus Badelt
  {
    id: "pirates",
    title: "Piratas do Caribe (He's a Pirate)",
    composer: "Hans Zimmer & Klaus Badelt",
    tempo: 140,
    timeSignature: "3/4",
    keySignature: "Dm",
    measures: [
      {
        number: 1,
        trebleNotes: [
          { id: generateNoteId(), pitch: "D4", duration: "quarter", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "D4", duration: "quarter", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "D4", duration: "quarter", isRest: false, clef: "treble" },
        ],
        bassNotes: [
          { id: generateNoteId(), pitch: "D3", duration: "half", isRest: false, clef: "bass" },
          { id: generateNoteId(), pitch: "A2", duration: "quarter", isRest: false, clef: "bass" },
        ],
      },
      {
        number: 2,
        trebleNotes: [
          { id: generateNoteId(), pitch: "D4", duration: "eighth", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "E4", duration: "eighth", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "F4", duration: "quarter", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "F4", duration: "quarter", isRest: false, clef: "treble" },
        ],
        bassNotes: [
          { id: generateNoteId(), pitch: "D3", duration: "half", isRest: false, clef: "bass" },
          { id: generateNoteId(), pitch: "D3", duration: "quarter", isRest: false, clef: "bass" },
        ],
      },
      {
        number: 3,
        trebleNotes: [
          { id: generateNoteId(), pitch: "F4", duration: "eighth", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "G4", duration: "eighth", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "E4", duration: "quarter", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "E4", duration: "quarter", isRest: false, clef: "treble" },
        ],
        bassNotes: [
          { id: generateNoteId(), pitch: "C3", duration: "half", isRest: false, clef: "bass" },
          { id: generateNoteId(), pitch: "C3", duration: "quarter", isRest: false, clef: "bass" },
        ],
      },
      {
        number: 4,
        trebleNotes: [
          { id: generateNoteId(), pitch: "D4", duration: "quarter", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "C4", duration: "quarter", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "D4", duration: "quarter", isRest: false, clef: "treble" },
        ],
        bassNotes: [
          { id: generateNoteId(), pitch: "Bb2", duration: "half", isRest: false, clef: "bass" },
          { id: generateNoteId(), pitch: "A2", duration: "quarter", isRest: false, clef: "bass" },
        ],
      },
      {
        number: 5,
        trebleNotes: [
          { id: generateNoteId(), pitch: "D4", duration: "quarter", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "D4", duration: "quarter", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "D4", duration: "quarter", isRest: false, clef: "treble" },
        ],
        bassNotes: [
          { id: generateNoteId(), pitch: "D3", duration: "half", isRest: false, clef: "bass" },
          { id: generateNoteId(), pitch: "A2", duration: "quarter", isRest: false, clef: "bass" },
        ],
      },
      {
        number: 6,
        trebleNotes: [
          { id: generateNoteId(), pitch: "D4", duration: "eighth", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "E4", duration: "eighth", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "F4", duration: "quarter", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "F4", duration: "quarter", isRest: false, clef: "treble" },
        ],
        bassNotes: [
          { id: generateNoteId(), pitch: "D3", duration: "half", isRest: false, clef: "bass" },
          { id: generateNoteId(), pitch: "D3", duration: "quarter", isRest: false, clef: "bass" },
        ],
      },
      {
        number: 7,
        trebleNotes: [
          { id: generateNoteId(), pitch: "F4", duration: "eighth", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "G4", duration: "eighth", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "E4", duration: "quarter", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "E4", duration: "quarter", isRest: false, clef: "treble" },
        ],
        bassNotes: [
          { id: generateNoteId(), pitch: "C3", duration: "half", isRest: false, clef: "bass" },
          { id: generateNoteId(), pitch: "C3", duration: "quarter", isRest: false, clef: "bass" },
        ],
      },
      {
        number: 8,
        trebleNotes: [
          { id: generateNoteId(), pitch: "D4", duration: "quarter", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "C4", duration: "quarter", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "D4", duration: "quarter", isRest: false, clef: "treble" },
        ],
        bassNotes: [
          { id: generateNoteId(), pitch: "Bb2", duration: "half", isRest: false, clef: "bass" },
          { id: generateNoteId(), pitch: "A2", duration: "quarter", isRest: false, clef: "bass" },
        ],
      },
      {
        number: 9,
        trebleNotes: [
          { id: generateNoteId(), pitch: "D4", duration: "eighth", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "E4", duration: "eighth", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "F4", duration: "quarter", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "G4", duration: "quarter", isRest: false, clef: "treble" },
        ],
        bassNotes: [
          { id: generateNoteId(), pitch: "Bb2", duration: "half", isRest: false, clef: "bass" },
          { id: generateNoteId(), pitch: "C3", duration: "quarter", isRest: false, clef: "bass" },
        ],
      },
      {
        number: 10,
        trebleNotes: [
          { id: generateNoteId(), pitch: "A4", duration: "half", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "D5", duration: "quarter", isRest: false, clef: "treble" },
        ],
        bassNotes: [
          { id: generateNoteId(), pitch: "D3", duration: "half", isRest: false, clef: "bass" },
          { id: generateNoteId(), pitch: "D3", duration: "quarter", isRest: false, clef: "bass" },
        ],
      },
      {
        number: 11,
        trebleNotes: [
          { id: generateNoteId(), pitch: "C5", duration: "quarter", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "Bb4", duration: "quarter", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "A4", duration: "quarter", isRest: false, clef: "treble" },
        ],
        bassNotes: [
          { id: generateNoteId(), pitch: "G2", duration: "half", isRest: false, clef: "bass" },
          { id: generateNoteId(), pitch: "A2", duration: "quarter", isRest: false, clef: "bass" },
        ],
      },
      {
        number: 12,
        trebleNotes: [
          { id: generateNoteId(), pitch: "D4", duration: "half", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "", duration: "quarter", isRest: true, clef: "treble" },
        ],
        bassNotes: [
          { id: generateNoteId(), pitch: "D3", duration: "half", isRest: false, clef: "bass" },
          { id: generateNoteId(), pitch: "", duration: "quarter", isRest: true, clef: "bass" },
        ],
      },
    ],
  },

  // 4. Super Mario Bros. (Tema Principal) - Koji Kondo
  {
    id: "mario",
    title: "Super Mario Bros. (Tema Principal)",
    composer: "Koji Kondo",
    tempo: 180,
    timeSignature: "4/4",
    keySignature: "C",
    measures: [
      {
        number: 1,
        trebleNotes: [
          { id: generateNoteId(), pitch: "E5", duration: "eighth", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "E5", duration: "eighth", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "", duration: "eighth", isRest: true, clef: "treble" },
          { id: generateNoteId(), pitch: "E5", duration: "eighth", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "", duration: "eighth", isRest: true, clef: "treble" },
          { id: generateNoteId(), pitch: "C5", duration: "eighth", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "E5", duration: "quarter", isRest: false, clef: "treble" },
        ],
        bassNotes: [
          { id: generateNoteId(), pitch: "D3", duration: "quarter", isRest: false, clef: "bass" },
          { id: generateNoteId(), pitch: "", duration: "quarter", isRest: true, clef: "bass" },
          { id: generateNoteId(), pitch: "G2", duration: "quarter", isRest: false, clef: "bass" },
          { id: generateNoteId(), pitch: "", duration: "quarter", isRest: true, clef: "bass" },
        ],
      },
      {
        number: 2,
        trebleNotes: [
          { id: generateNoteId(), pitch: "G5", duration: "half", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "", duration: "quarter", isRest: true, clef: "treble" },
          { id: generateNoteId(), pitch: "G4", duration: "quarter", isRest: false, clef: "treble" },
        ],
        bassNotes: [
          { id: generateNoteId(), pitch: "C3", duration: "half", isRest: false, clef: "bass" },
          { id: generateNoteId(), pitch: "", duration: "quarter", isRest: true, clef: "bass" },
          { id: generateNoteId(), pitch: "G2", duration: "quarter", isRest: false, clef: "bass" },
        ],
      },
      {
        number: 3,
        trebleNotes: [
          { id: generateNoteId(), pitch: "C5", duration: "quarter", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "", duration: "eighth", isRest: true, clef: "treble" },
          { id: generateNoteId(), pitch: "G4", duration: "quarter", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "", duration: "eighth", isRest: true, clef: "treble" },
          { id: generateNoteId(), pitch: "E4", duration: "quarter", isRest: false, clef: "treble" },
        ],
        bassNotes: [
          { id: generateNoteId(), pitch: "C3", duration: "half", isRest: false, clef: "bass" },
          { id: generateNoteId(), pitch: "G2", duration: "half", isRest: false, clef: "bass" },
        ],
      },
      {
        number: 4,
        trebleNotes: [
          { id: generateNoteId(), pitch: "", duration: "eighth", isRest: true, clef: "treble" },
          { id: generateNoteId(), pitch: "A4", duration: "quarter", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "B4", duration: "quarter", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "A#4", duration: "eighth", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "A4", duration: "quarter", isRest: false, clef: "treble" },
        ],
        bassNotes: [
          { id: generateNoteId(), pitch: "F2", duration: "half", isRest: false, clef: "bass" },
          { id: generateNoteId(), pitch: "F#2", duration: "half", isRest: false, clef: "bass" },
        ],
      },
      {
        number: 5,
        trebleNotes: [
          { id: generateNoteId(), pitch: "G4", duration: "quarter", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "E5", duration: "quarter", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "G5", duration: "quarter", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "A5", duration: "quarter", isRest: false, clef: "treble" },
        ],
        bassNotes: [
          { id: generateNoteId(), pitch: "G2", duration: "half", isRest: false, clef: "bass" },
          { id: generateNoteId(), pitch: "C3", duration: "half", isRest: false, clef: "bass" },
        ],
      },
      {
        number: 6,
        trebleNotes: [
          { id: generateNoteId(), pitch: "F5", duration: "quarter", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "G5", duration: "quarter", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "E5", duration: "quarter", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "C5", duration: "quarter", isRest: false, clef: "treble" },
        ],
        bassNotes: [
          { id: generateNoteId(), pitch: "F3", duration: "half", isRest: false, clef: "bass" },
          { id: generateNoteId(), pitch: "E3", duration: "half", isRest: false, clef: "bass" },
        ],
      },
      {
        number: 7,
        trebleNotes: [
          { id: generateNoteId(), pitch: "D5", duration: "quarter", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "B4", duration: "half", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "", duration: "quarter", isRest: true, clef: "treble" },
        ],
        bassNotes: [
          { id: generateNoteId(), pitch: "D3", duration: "half", isRest: false, clef: "bass" },
          { id: generateNoteId(), pitch: "G2", duration: "half", isRest: false, clef: "bass" },
        ],
      },
      {
        number: 8,
        trebleNotes: [
          { id: generateNoteId(), pitch: "C5", duration: "whole", isRest: false, clef: "treble" },
        ],
        bassNotes: [
          { id: generateNoteId(), pitch: "C3", duration: "whole", isRest: false, clef: "bass" },
        ],
      },
    ],
  },

  // 5. Interestelar (Interstellar - First Step) - Hans Zimmer
  {
    id: "interstellar",
    title: "Interestelar (Interstellar - First Step)",
    composer: "Hans Zimmer",
    tempo: 108,
    timeSignature: "3/4",
    keySignature: "Am",
    measures: [
      {
        number: 1,
        trebleNotes: [
          { id: generateNoteId(), pitch: "A4", duration: "quarter", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "C5", duration: "quarter", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "E5", duration: "quarter", isRest: false, clef: "treble" },
        ],
        bassNotes: [
          { id: generateNoteId(), pitch: "A2", duration: "half", isRest: false, clef: "bass" },
          { id: generateNoteId(), pitch: "", duration: "quarter", isRest: true, clef: "bass" },
        ],
      },
      {
        number: 2,
        trebleNotes: [
          { id: generateNoteId(), pitch: "A4", duration: "quarter", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "C5", duration: "quarter", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "E5", duration: "quarter", isRest: false, clef: "treble" },
        ],
        bassNotes: [
          { id: generateNoteId(), pitch: "A2", duration: "half", isRest: false, clef: "bass" },
          { id: generateNoteId(), pitch: "", duration: "quarter", isRest: true, clef: "bass" },
        ],
      },
      {
        number: 3,
        trebleNotes: [
          { id: generateNoteId(), pitch: "B4", duration: "quarter", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "D5", duration: "quarter", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "E5", duration: "quarter", isRest: false, clef: "treble" },
        ],
        bassNotes: [
          { id: generateNoteId(), pitch: "G2", duration: "half", isRest: false, clef: "bass" },
          { id: generateNoteId(), pitch: "", duration: "quarter", isRest: true, clef: "bass" },
        ],
      },
      {
        number: 4,
        trebleNotes: [
          { id: generateNoteId(), pitch: "B4", duration: "quarter", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "D5", duration: "quarter", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "E5", duration: "quarter", isRest: false, clef: "treble" },
        ],
        bassNotes: [
          { id: generateNoteId(), pitch: "G2", duration: "half", isRest: false, clef: "bass" },
          { id: generateNoteId(), pitch: "", duration: "quarter", isRest: true, clef: "bass" },
        ],
      },
      {
        number: 5,
        trebleNotes: [
          { id: generateNoteId(), pitch: "C5", duration: "quarter", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "E5", duration: "quarter", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "G5", duration: "quarter", isRest: false, clef: "treble" },
        ],
        bassNotes: [
          { id: generateNoteId(), pitch: "C3", duration: "half", isRest: false, clef: "bass" },
          { id: generateNoteId(), pitch: "", duration: "quarter", isRest: true, clef: "bass" },
        ],
      },
      {
        number: 6,
        trebleNotes: [
          { id: generateNoteId(), pitch: "C5", duration: "quarter", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "E5", duration: "quarter", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "G5", duration: "quarter", isRest: false, clef: "treble" },
        ],
        bassNotes: [
          { id: generateNoteId(), pitch: "C3", duration: "half", isRest: false, clef: "bass" },
          { id: generateNoteId(), pitch: "", duration: "quarter", isRest: true, clef: "bass" },
        ],
      },
      {
        number: 7,
        trebleNotes: [
          { id: generateNoteId(), pitch: "B4", duration: "quarter", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "D5", duration: "quarter", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "F5", duration: "quarter", isRest: false, clef: "treble" },
        ],
        bassNotes: [
          { id: generateNoteId(), pitch: "F2", duration: "half", isRest: false, clef: "bass" },
          { id: generateNoteId(), pitch: "", duration: "quarter", isRest: true, clef: "bass" },
        ],
      },
      {
        number: 8,
        trebleNotes: [
          { id: generateNoteId(), pitch: "B4", duration: "quarter", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "D5", duration: "quarter", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "F5", duration: "quarter", isRest: false, clef: "treble" },
        ],
        bassNotes: [
          { id: generateNoteId(), pitch: "F2", duration: "half", isRest: false, clef: "bass" },
          { id: generateNoteId(), pitch: "", duration: "quarter", isRest: true, clef: "bass" },
        ],
      },
      {
        number: 9,
        trebleNotes: [
          { id: generateNoteId(), pitch: "E5", duration: "quarter", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "C5", duration: "quarter", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "A4", duration: "quarter", isRest: false, clef: "treble" },
        ],
        bassNotes: [
          { id: generateNoteId(), pitch: "A2", duration: "half", isRest: false, clef: "bass" },
          { id: generateNoteId(), pitch: "", duration: "quarter", isRest: true, clef: "bass" },
        ],
      },
      {
        number: 10,
        trebleNotes: [
          { id: generateNoteId(), pitch: "E5", duration: "half", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "", duration: "quarter", isRest: true, clef: "treble" },
        ],
        bassNotes: [
          { id: generateNoteId(), pitch: "A2", duration: "half", isRest: false, clef: "bass" },
          { id: generateNoteId(), pitch: "", duration: "quarter", isRest: true, clef: "bass" },
        ],
      },
    ],
  },

  // 6. Jurassic Park (Tema Principal) - John Williams
  {
    id: "jurassic-park",
    title: "Jurassic Park (Tema Principal)",
    composer: "John Williams",
    tempo: 76,
    timeSignature: "4/4",
    keySignature: "C",
    measures: [
      {
        number: 1,
        trebleNotes: [
          { id: generateNoteId(), pitch: "C4", duration: "half", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "B3", duration: "quarter", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "C4", duration: "quarter", isRest: false, clef: "treble" },
        ],
        bassNotes: [
          { id: generateNoteId(), pitch: "C3", duration: "half", isRest: false, clef: "bass" },
          { id: generateNoteId(), pitch: "G2", duration: "half", isRest: false, clef: "bass" },
        ],
      },
      {
        number: 2,
        trebleNotes: [
          { id: generateNoteId(), pitch: "D4", duration: "half", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "G3", duration: "half", isRest: false, clef: "treble" },
        ],
        bassNotes: [
          { id: generateNoteId(), pitch: "B2", duration: "half", isRest: false, clef: "bass" },
          { id: generateNoteId(), pitch: "G2", duration: "half", isRest: false, clef: "bass" },
        ],
      },
      {
        number: 3,
        trebleNotes: [
          { id: generateNoteId(), pitch: "C4", duration: "half", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "B3", duration: "quarter", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "C4", duration: "quarter", isRest: false, clef: "treble" },
        ],
        bassNotes: [
          { id: generateNoteId(), pitch: "A2", duration: "half", isRest: false, clef: "bass" },
          { id: generateNoteId(), pitch: "E3", duration: "half", isRest: false, clef: "bass" },
        ],
      },
      {
        number: 4,
        trebleNotes: [
          { id: generateNoteId(), pitch: "D4", duration: "half", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "G3", duration: "half", isRest: false, clef: "treble" },
        ],
        bassNotes: [
          { id: generateNoteId(), pitch: "F2", duration: "half", isRest: false, clef: "bass" },
          { id: generateNoteId(), pitch: "G2", duration: "half", isRest: false, clef: "bass" },
        ],
      },
      {
        number: 5,
        trebleNotes: [
          { id: generateNoteId(), pitch: "C4", duration: "quarter", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "D4", duration: "quarter", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "E4", duration: "quarter", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "F4", duration: "quarter", isRest: false, clef: "treble" },
        ],
        bassNotes: [
          { id: generateNoteId(), pitch: "C3", duration: "half", isRest: false, clef: "bass" },
          { id: generateNoteId(), pitch: "G2", duration: "half", isRest: false, clef: "bass" },
        ],
      },
      {
        number: 6,
        trebleNotes: [
          { id: generateNoteId(), pitch: "G4", duration: "half", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "E4", duration: "quarter", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "C4", duration: "quarter", isRest: false, clef: "treble" },
        ],
        bassNotes: [
          { id: generateNoteId(), pitch: "E2", duration: "half", isRest: false, clef: "bass" },
          { id: generateNoteId(), pitch: "C3", duration: "half", isRest: false, clef: "bass" },
        ],
      },
      {
        number: 7,
        trebleNotes: [
          { id: generateNoteId(), pitch: "F4", duration: "half", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "E4", duration: "quarter", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "D4", duration: "quarter", isRest: false, clef: "treble" },
        ],
        bassNotes: [
          { id: generateNoteId(), pitch: "F2", duration: "half", isRest: false, clef: "bass" },
          { id: generateNoteId(), pitch: "D3", duration: "half", isRest: false, clef: "bass" },
        ],
      },
      {
        number: 8,
        trebleNotes: [
          { id: generateNoteId(), pitch: "C4", duration: "whole", isRest: false, clef: "treble" },
        ],
        bassNotes: [
          { id: generateNoteId(), pitch: "C3", duration: "whole", isRest: false, clef: "bass" },
        ],
      },
    ],
  },

  // 7. Vingadores (The Avengers Theme) - Alan Silvestri
  {
    id: "avengers",
    title: "Vingadores (The Avengers Theme)",
    composer: "Alan Silvestri",
    tempo: 112,
    timeSignature: "4/4",
    keySignature: "Am",
    measures: [
      {
        number: 1,
        trebleNotes: [
          { id: generateNoteId(), pitch: "A4", duration: "half", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "E4", duration: "half", isRest: false, clef: "treble" },
        ],
        bassNotes: [
          { id: generateNoteId(), pitch: "A2", duration: "whole", isRest: false, clef: "bass" },
        ],
      },
      {
        number: 2,
        trebleNotes: [
          { id: generateNoteId(), pitch: "D4", duration: "quarter", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "C4", duration: "quarter", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "B3", duration: "half", isRest: false, clef: "treble" },
        ],
        bassNotes: [
          { id: generateNoteId(), pitch: "F2", duration: "half", isRest: false, clef: "bass" },
          { id: generateNoteId(), pitch: "G2", duration: "half", isRest: false, clef: "bass" },
        ],
      },
      {
        number: 3,
        trebleNotes: [
          { id: generateNoteId(), pitch: "C4", duration: "quarter", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "D4", duration: "quarter", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "E4", duration: "half", isRest: false, clef: "treble" },
        ],
        bassNotes: [
          { id: generateNoteId(), pitch: "A2", duration: "half", isRest: false, clef: "bass" },
          { id: generateNoteId(), pitch: "C3", duration: "half", isRest: false, clef: "bass" },
        ],
      },
      {
        number: 4,
        trebleNotes: [
          { id: generateNoteId(), pitch: "A3", duration: "whole", isRest: false, clef: "treble" },
        ],
        bassNotes: [
          { id: generateNoteId(), pitch: "A2", duration: "whole", isRest: false, clef: "bass" },
        ],
      },
      {
        number: 5,
        trebleNotes: [
          { id: generateNoteId(), pitch: "A4", duration: "half", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "E4", duration: "half", isRest: false, clef: "treble" },
        ],
        bassNotes: [
          { id: generateNoteId(), pitch: "A2", duration: "whole", isRest: false, clef: "bass" },
        ],
      },
      {
        number: 6,
        trebleNotes: [
          { id: generateNoteId(), pitch: "G4", duration: "quarter", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "F4", duration: "quarter", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "E4", duration: "half", isRest: false, clef: "treble" },
        ],
        bassNotes: [
          { id: generateNoteId(), pitch: "C3", duration: "half", isRest: false, clef: "bass" },
          { id: generateNoteId(), pitch: "E3", duration: "half", isRest: false, clef: "bass" },
        ],
      },
      {
        number: 7,
        trebleNotes: [
          { id: generateNoteId(), pitch: "F4", duration: "quarter", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "G4", duration: "quarter", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "A4", duration: "half", isRest: false, clef: "treble" },
        ],
        bassNotes: [
          { id: generateNoteId(), pitch: "D3", duration: "half", isRest: false, clef: "bass" },
          { id: generateNoteId(), pitch: "F3", duration: "half", isRest: false, clef: "bass" },
        ],
      },
      {
        number: 8,
        trebleNotes: [
          { id: generateNoteId(), pitch: "E4", duration: "whole", isRest: false, clef: "treble" },
        ],
        bassNotes: [
          { id: generateNoteId(), pitch: "E3", duration: "whole", isRest: false, clef: "bass" },
        ],
      },
    ],
  },

  // 8. O Fantasma da Ópera (The Phantom of the Opera) - Andrew Lloyd Webber
  {
    id: "phantom-opera",
    title: "O Fantasma da Ópera (Phantom of the Opera)",
    composer: "Andrew Lloyd Webber",
    tempo: 120,
    timeSignature: "4/4",
    keySignature: "Dm",
    measures: [
      {
        number: 1,
        trebleNotes: [
          { id: generateNoteId(), pitch: "D4", duration: "half", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "D4", duration: "half", isRest: false, clef: "treble" },
        ],
        bassNotes: [
          { id: generateNoteId(), pitch: "D3", duration: "half", isRest: false, clef: "bass" },
          { id: generateNoteId(), pitch: "A2", duration: "half", isRest: false, clef: "bass" },
        ],
      },
      {
        number: 2,
        trebleNotes: [
          { id: generateNoteId(), pitch: "C#4", duration: "quarter", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "C4", duration: "quarter", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "B3", duration: "quarter", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "A#3", duration: "quarter", isRest: false, clef: "treble" },
        ],
        bassNotes: [
          { id: generateNoteId(), pitch: "D3", duration: "half", isRest: false, clef: "bass" },
          { id: generateNoteId(), pitch: "G2", duration: "half", isRest: false, clef: "bass" },
        ],
      },
      {
        number: 3,
        trebleNotes: [
          { id: generateNoteId(), pitch: "A3", duration: "half", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "", duration: "half", isRest: true, clef: "treble" },
        ],
        bassNotes: [
          { id: generateNoteId(), pitch: "A2", duration: "half", isRest: false, clef: "bass" },
          { id: generateNoteId(), pitch: "", duration: "half", isRest: true, clef: "bass" },
        ],
      },
      {
        number: 4,
        trebleNotes: [
          { id: generateNoteId(), pitch: "A3", duration: "quarter", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "B3", duration: "quarter", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "C4", duration: "quarter", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "C#4", duration: "quarter", isRest: false, clef: "treble" },
        ],
        bassNotes: [
          { id: generateNoteId(), pitch: "A2", duration: "half", isRest: false, clef: "bass" },
          { id: generateNoteId(), pitch: "C3", duration: "half", isRest: false, clef: "bass" },
        ],
      },
      {
        number: 5,
        trebleNotes: [
          { id: generateNoteId(), pitch: "D4", duration: "half", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "D4", duration: "half", isRest: false, clef: "treble" },
        ],
        bassNotes: [
          { id: generateNoteId(), pitch: "D3", duration: "half", isRest: false, clef: "bass" },
          { id: generateNoteId(), pitch: "A2", duration: "half", isRest: false, clef: "bass" },
        ],
      },
      {
        number: 6,
        trebleNotes: [
          { id: generateNoteId(), pitch: "C#4", duration: "quarter", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "C4", duration: "quarter", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "B3", duration: "quarter", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "A#3", duration: "quarter", isRest: false, clef: "treble" },
        ],
        bassNotes: [
          { id: generateNoteId(), pitch: "D3", duration: "half", isRest: false, clef: "bass" },
          { id: generateNoteId(), pitch: "G2", duration: "half", isRest: false, clef: "bass" },
        ],
      },
      {
        number: 7,
        trebleNotes: [
          { id: generateNoteId(), pitch: "A3", duration: "whole", isRest: false, clef: "treble" },
        ],
        bassNotes: [
          { id: generateNoteId(), pitch: "A2", duration: "whole", isRest: false, clef: "bass" },
        ],
      },
      {
        number: 8,
        trebleNotes: [
          { id: generateNoteId(), pitch: "D4", duration: "whole", isRest: false, clef: "treble" },
        ],
        bassNotes: [
          { id: generateNoteId(), pitch: "D3", duration: "whole", isRest: false, clef: "bass" },
        ],
      },
    ],
  },

  // 9. Missão Impossível (Mission: Impossible) - Lalo Schifrin
  {
    id: "mission-impossible",
    title: "Missão Impossível (Mission: Impossible)",
    composer: "Lalo Schifrin",
    tempo: 168,
    timeSignature: "4/4",
    keySignature: "Gm",
    measures: [
      {
        number: 1,
        trebleNotes: [
          { id: generateNoteId(), pitch: "G4", duration: "quarter", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "", duration: "eighth", isRest: true, clef: "treble" },
          { id: generateNoteId(), pitch: "G4", duration: "eighth", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "Bb4", duration: "quarter", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "C5", duration: "quarter", isRest: false, clef: "treble" },
        ],
        bassNotes: [
          { id: generateNoteId(), pitch: "G2", duration: "half", isRest: false, clef: "bass" },
          { id: generateNoteId(), pitch: "G2", duration: "half", isRest: false, clef: "bass" },
        ],
      },
      {
        number: 2,
        trebleNotes: [
          { id: generateNoteId(), pitch: "G4", duration: "quarter", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "", duration: "eighth", isRest: true, clef: "treble" },
          { id: generateNoteId(), pitch: "G4", duration: "eighth", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "F4", duration: "quarter", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "F#4", duration: "quarter", isRest: false, clef: "treble" },
        ],
        bassNotes: [
          { id: generateNoteId(), pitch: "G2", duration: "half", isRest: false, clef: "bass" },
          { id: generateNoteId(), pitch: "G2", duration: "half", isRest: false, clef: "bass" },
        ],
      },
      {
        number: 3,
        trebleNotes: [
          { id: generateNoteId(), pitch: "G4", duration: "quarter", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "", duration: "eighth", isRest: true, clef: "treble" },
          { id: generateNoteId(), pitch: "G4", duration: "eighth", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "Bb4", duration: "quarter", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "C5", duration: "quarter", isRest: false, clef: "treble" },
        ],
        bassNotes: [
          { id: generateNoteId(), pitch: "G2", duration: "half", isRest: false, clef: "bass" },
          { id: generateNoteId(), pitch: "G2", duration: "half", isRest: false, clef: "bass" },
        ],
      },
      {
        number: 4,
        trebleNotes: [
          { id: generateNoteId(), pitch: "G4", duration: "quarter", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "", duration: "eighth", isRest: true, clef: "treble" },
          { id: generateNoteId(), pitch: "G4", duration: "eighth", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "F4", duration: "quarter", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "F#4", duration: "quarter", isRest: false, clef: "treble" },
        ],
        bassNotes: [
          { id: generateNoteId(), pitch: "G2", duration: "half", isRest: false, clef: "bass" },
          { id: generateNoteId(), pitch: "G2", duration: "half", isRest: false, clef: "bass" },
        ],
      },
      {
        number: 5,
        trebleNotes: [
          { id: generateNoteId(), pitch: "D5", duration: "half", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "C5", duration: "half", isRest: false, clef: "treble" },
        ],
        bassNotes: [
          { id: generateNoteId(), pitch: "Bb2", duration: "half", isRest: false, clef: "bass" },
          { id: generateNoteId(), pitch: "C3", duration: "half", isRest: false, clef: "bass" },
        ],
      },
      {
        number: 6,
        trebleNotes: [
          { id: generateNoteId(), pitch: "Bb4", duration: "half", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "A4", duration: "half", isRest: false, clef: "treble" },
        ],
        bassNotes: [
          { id: generateNoteId(), pitch: "G2", duration: "half", isRest: false, clef: "bass" },
          { id: generateNoteId(), pitch: "D3", duration: "half", isRest: false, clef: "bass" },
        ],
      },
      {
        number: 7,
        trebleNotes: [
          { id: generateNoteId(), pitch: "G4", duration: "whole", isRest: false, clef: "treble" },
        ],
        bassNotes: [
          { id: generateNoteId(), pitch: "G2", duration: "whole", isRest: false, clef: "bass" },
        ],
      },
      {
        number: 8,
        trebleNotes: [
          { id: generateNoteId(), pitch: "G4", duration: "whole", isRest: false, clef: "treble" },
        ],
        bassNotes: [
          { id: generateNoteId(), pitch: "G2", duration: "whole", isRest: false, clef: "bass" },
        ],
      },
    ],
  },

  // 10. A Bela e a Fera (Beauty and the Beast) - Alan Menken
  {
    id: "beauty-and-the-beast",
    title: "A Bela e a Fera (Beauty and the Beast)",
    composer: "Alan Menken",
    tempo: 84,
    timeSignature: "4/4",
    keySignature: "C",
    measures: [
      {
        number: 1,
        trebleNotes: [
          { id: generateNoteId(), pitch: "G4", duration: "quarter", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "E4", duration: "quarter", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "F4", duration: "quarter", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "G4", duration: "quarter", isRest: false, clef: "treble" },
        ],
        bassNotes: [
          { id: generateNoteId(), pitch: "C3", duration: "half", isRest: false, clef: "bass" },
          { id: generateNoteId(), pitch: "G2", duration: "half", isRest: false, clef: "bass" },
        ],
      },
      {
        number: 2,
        trebleNotes: [
          { id: generateNoteId(), pitch: "C5", duration: "half", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "B4", duration: "quarter", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "A4", duration: "quarter", isRest: false, clef: "treble" },
        ],
        bassNotes: [
          { id: generateNoteId(), pitch: "A2", duration: "half", isRest: false, clef: "bass" },
          { id: generateNoteId(), pitch: "E3", duration: "half", isRest: false, clef: "bass" },
        ],
      },
      {
        number: 3,
        trebleNotes: [
          { id: generateNoteId(), pitch: "G4", duration: "whole", isRest: false, clef: "treble" },
        ],
        bassNotes: [
          { id: generateNoteId(), pitch: "F2", duration: "half", isRest: false, clef: "bass" },
          { id: generateNoteId(), pitch: "G2", duration: "half", isRest: false, clef: "bass" },
        ],
      },
      {
        number: 4,
        trebleNotes: [
          { id: generateNoteId(), pitch: "F4", duration: "quarter", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "D4", duration: "quarter", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "E4", duration: "quarter", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "F4", duration: "quarter", isRest: false, clef: "treble" },
        ],
        bassNotes: [
          { id: generateNoteId(), pitch: "D3", duration: "half", isRest: false, clef: "bass" },
          { id: generateNoteId(), pitch: "A2", duration: "half", isRest: false, clef: "bass" },
        ],
      },
      {
        number: 5,
        trebleNotes: [
          { id: generateNoteId(), pitch: "B4", duration: "half", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "A4", duration: "quarter", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "G4", duration: "quarter", isRest: false, clef: "treble" },
        ],
        bassNotes: [
          { id: generateNoteId(), pitch: "G2", duration: "half", isRest: false, clef: "bass" },
          { id: generateNoteId(), pitch: "D3", duration: "half", isRest: false, clef: "bass" },
        ],
      },
      {
        number: 6,
        trebleNotes: [
          { id: generateNoteId(), pitch: "E4", duration: "whole", isRest: false, clef: "treble" },
        ],
        bassNotes: [
          { id: generateNoteId(), pitch: "C3", duration: "half", isRest: false, clef: "bass" },
          { id: generateNoteId(), pitch: "G2", duration: "half", isRest: false, clef: "bass" },
        ],
      },
      {
        number: 7,
        trebleNotes: [
          { id: generateNoteId(), pitch: "G4", duration: "quarter", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "E4", duration: "quarter", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "F4", duration: "quarter", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "G4", duration: "quarter", isRest: false, clef: "treble" },
        ],
        bassNotes: [
          { id: generateNoteId(), pitch: "C3", duration: "half", isRest: false, clef: "bass" },
          { id: generateNoteId(), pitch: "E3", duration: "half", isRest: false, clef: "bass" },
        ],
      },
      {
        number: 8,
        trebleNotes: [
          { id: generateNoteId(), pitch: "C5", duration: "half", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "D5", duration: "half", isRest: false, clef: "treble" },
        ],
        bassNotes: [
          { id: generateNoteId(), pitch: "F2", duration: "half", isRest: false, clef: "bass" },
          { id: generateNoteId(), pitch: "G2", duration: "half", isRest: false, clef: "bass" },
        ],
      },
      {
        number: 9,
        trebleNotes: [
          { id: generateNoteId(), pitch: "C5", duration: "whole", isRest: false, clef: "treble" },
        ],
        bassNotes: [
          { id: generateNoteId(), pitch: "C3", duration: "whole", isRest: false, clef: "bass" },
        ],
      },
    ],
  },
];

import { SheetMusic } from "../types";
import { generateNoteId } from "../utils/musicNotation";
import { FAMOUS_PRESET_SHEETS } from "./presetsFamous";
import { PIANO_SOLO_AND_REDUCTIONS } from "./presetsPiano";
import { POPULAR_AND_ANIME_SHEETS } from "./presetsAnimeAndPopular";

export const PRESET_SHEET_MUSICS: SheetMusic[] = [
  ...PIANO_SOLO_AND_REDUCTIONS,
  ...POPULAR_AND_ANIME_SHEETS,
  {
    id: "harry-potter",
    title: "Harry Potter (Hedwig's Theme)",
    composer: "John Williams",
    tempo: 126,
    timeSignature: "3/4",
    keySignature: "Em",
    measures: [
      {
        number: 1,
        trebleNotes: [
          { id: generateNoteId(), pitch: "B4", duration: "quarter", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "E5", duration: "half", isRest: false, clef: "treble" },
        ],
        bassNotes: [
          { id: generateNoteId(), pitch: "E2", duration: "half", isRest: false, clef: "bass" },
          { id: generateNoteId(), pitch: "B2", duration: "quarter", isRest: false, clef: "bass" },
        ],
      },
      {
        number: 2,
        trebleNotes: [
          { id: generateNoteId(), pitch: "G5", duration: "eighth", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "F#5", duration: "eighth", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "E5", duration: "half", isRest: false, clef: "treble" },
        ],
        bassNotes: [
          { id: generateNoteId(), pitch: "E3", duration: "half", isRest: false, clef: "bass" },
          { id: generateNoteId(), pitch: "B2", duration: "quarter", isRest: false, clef: "bass" },
        ],
      },
      {
        number: 3,
        trebleNotes: [
          { id: generateNoteId(), pitch: "B5", duration: "half", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "A5", duration: "quarter", isRest: false, clef: "treble" },
        ],
        bassNotes: [
          { id: generateNoteId(), pitch: "G2", duration: "half", isRest: false, clef: "bass" },
          { id: generateNoteId(), pitch: "D3", duration: "quarter", isRest: false, clef: "bass" },
        ],
      },
      {
        number: 4,
        trebleNotes: [
          { id: generateNoteId(), pitch: "F#5", duration: "half", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "F#5", duration: "quarter", isRest: false, clef: "treble" },
        ],
        bassNotes: [
          { id: generateNoteId(), pitch: "D3", duration: "half", isRest: false, clef: "bass" },
          { id: generateNoteId(), pitch: "A2", duration: "quarter", isRest: false, clef: "bass" },
        ],
      },
      {
        number: 5,
        trebleNotes: [
          { id: generateNoteId(), pitch: "E5", duration: "quarter", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "G5", duration: "eighth", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "F#5", duration: "eighth", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "D#5", duration: "quarter", isRest: false, clef: "treble" },
        ],
        bassNotes: [
          { id: generateNoteId(), pitch: "C3", duration: "half", isRest: false, clef: "bass" },
          { id: generateNoteId(), pitch: "G3", duration: "quarter", isRest: false, clef: "bass" },
        ],
      },
      {
        number: 6,
        trebleNotes: [
          { id: generateNoteId(), pitch: "F5", duration: "half", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "B4", duration: "quarter", isRest: false, clef: "treble" },
        ],
        bassNotes: [
          { id: generateNoteId(), pitch: "B2", duration: "half", isRest: false, clef: "bass" },
          { id: generateNoteId(), pitch: "F#3", duration: "quarter", isRest: false, clef: "bass" },
        ],
      },
      {
        number: 7,
        trebleNotes: [
          { id: generateNoteId(), pitch: "B4", duration: "half", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "B4", duration: "quarter", isRest: false, clef: "treble" },
        ],
        bassNotes: [
          { id: generateNoteId(), pitch: "E2", duration: "half", isRest: false, clef: "bass" },
          { id: generateNoteId(), pitch: "B2", duration: "quarter", isRest: false, clef: "bass" },
        ],
      },
      {
        number: 8,
        trebleNotes: [
          { id: generateNoteId(), pitch: "B4", duration: "quarter", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "E5", duration: "half", isRest: false, clef: "treble" },
        ],
        bassNotes: [
          { id: generateNoteId(), pitch: "E3", duration: "half", isRest: false, clef: "bass" },
          { id: generateNoteId(), pitch: "B2", duration: "quarter", isRest: false, clef: "bass" },
        ],
      },
      {
        number: 9,
        trebleNotes: [
          { id: generateNoteId(), pitch: "G5", duration: "eighth", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "F#5", duration: "eighth", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "E5", duration: "half", isRest: false, clef: "treble" },
        ],
        bassNotes: [
          { id: generateNoteId(), pitch: "E2", duration: "half", isRest: false, clef: "bass" },
          { id: generateNoteId(), pitch: "G2", duration: "quarter", isRest: false, clef: "bass" },
        ],
      },
      {
        number: 10,
        trebleNotes: [
          { id: generateNoteId(), pitch: "B5", duration: "quarter", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "D6", duration: "half", isRest: false, clef: "treble" },
        ],
        bassNotes: [
          { id: generateNoteId(), pitch: "G2", duration: "half", isRest: false, clef: "bass" },
          { id: generateNoteId(), pitch: "D3", duration: "quarter", isRest: false, clef: "bass" },
        ],
      },
      {
        number: 11,
        trebleNotes: [
          { id: generateNoteId(), pitch: "C#6", duration: "quarter", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "C6", duration: "half", isRest: false, clef: "treble" },
        ],
        bassNotes: [
          { id: generateNoteId(), pitch: "A2", duration: "half", isRest: false, clef: "bass" },
          { id: generateNoteId(), pitch: "E3", duration: "quarter", isRest: false, clef: "bass" },
        ],
      },
      {
        number: 12,
        trebleNotes: [
          { id: generateNoteId(), pitch: "G#5", duration: "quarter", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "C6", duration: "eighth", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "B5", duration: "eighth", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "A#5", duration: "quarter", isRest: false, clef: "treble" },
        ],
        bassNotes: [
          { id: generateNoteId(), pitch: "C3", duration: "half", isRest: false, clef: "bass" },
          { id: generateNoteId(), pitch: "G3", duration: "quarter", isRest: false, clef: "bass" },
        ],
      },
      {
        number: 13,
        trebleNotes: [
          { id: generateNoteId(), pitch: "B4", duration: "half", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "G4", duration: "quarter", isRest: false, clef: "treble" },
        ],
        bassNotes: [
          { id: generateNoteId(), pitch: "B2", duration: "half", isRest: false, clef: "bass" },
          { id: generateNoteId(), pitch: "D#3", duration: "quarter", isRest: false, clef: "bass" },
        ],
      },
      {
        number: 14,
        trebleNotes: [
          { id: generateNoteId(), pitch: "E4", duration: "half", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "E4", duration: "quarter", isRest: false, clef: "treble" },
        ],
        bassNotes: [
          { id: generateNoteId(), pitch: "E2", duration: "half", isRest: false, clef: "bass" },
          { id: generateNoteId(), pitch: "B2", duration: "quarter", isRest: false, clef: "bass" },
        ],
      },
      {
        number: 15,
        trebleNotes: [
          { id: generateNoteId(), pitch: "E4", duration: "half", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "", duration: "quarter", isRest: true, clef: "treble" },
        ],
        bassNotes: [
          { id: generateNoteId(), pitch: "E2", duration: "half", isRest: false, clef: "bass" },
          { id: generateNoteId(), pitch: "", duration: "quarter", isRest: true, clef: "bass" },
        ],
      },
    ],
  },
  {
    id: "star-wars",
    title: "Star Wars (Tema Principal)",
    composer: "John Williams",
    tempo: 108,
    timeSignature: "4/4",
    keySignature: "G",
    measures: [
      {
        number: 1,
        trebleNotes: [
          { id: generateNoteId(), pitch: "D4", duration: "eighth", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "D4", duration: "eighth", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "D4", duration: "quarter", isRest: false, clef: "treble" },
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
          { id: generateNoteId(), pitch: "D5", duration: "half", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "C5", duration: "eighth", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "B4", duration: "eighth", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "A4", duration: "quarter", isRest: false, clef: "treble" },
        ],
        bassNotes: [
          { id: generateNoteId(), pitch: "G2", duration: "half", isRest: false, clef: "bass" },
          { id: generateNoteId(), pitch: "D3", duration: "half", isRest: false, clef: "bass" },
        ],
      },
      {
        number: 3,
        trebleNotes: [
          { id: generateNoteId(), pitch: "G5", duration: "half", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "D5", duration: "half", isRest: false, clef: "treble" },
        ],
        bassNotes: [
          { id: generateNoteId(), pitch: "G2", duration: "half", isRest: false, clef: "bass" },
          { id: generateNoteId(), pitch: "B2", duration: "half", isRest: false, clef: "bass" },
        ],
      },
      {
        number: 4,
        trebleNotes: [
          { id: generateNoteId(), pitch: "C5", duration: "eighth", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "B4", duration: "eighth", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "A4", duration: "quarter", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "G5", duration: "half", isRest: false, clef: "treble" },
        ],
        bassNotes: [
          { id: generateNoteId(), pitch: "C3", duration: "half", isRest: false, clef: "bass" },
          { id: generateNoteId(), pitch: "D3", duration: "half", isRest: false, clef: "bass" },
        ],
      },
      {
        number: 5,
        trebleNotes: [
          { id: generateNoteId(), pitch: "D5", duration: "quarter", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "C5", duration: "eighth", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "B4", duration: "eighth", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "C5", duration: "quarter", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "A4", duration: "quarter", isRest: false, clef: "treble" },
        ],
        bassNotes: [
          { id: generateNoteId(), pitch: "C3", duration: "half", isRest: false, clef: "bass" },
          { id: generateNoteId(), pitch: "D3", duration: "half", isRest: false, clef: "bass" },
        ],
      },
      {
        number: 6,
        trebleNotes: [
          { id: generateNoteId(), pitch: "D4", duration: "eighth", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "D4", duration: "eighth", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "D4", duration: "quarter", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "G4", duration: "half", isRest: false, clef: "treble" },
        ],
        bassNotes: [
          { id: generateNoteId(), pitch: "G2", duration: "half", isRest: false, clef: "bass" },
          { id: generateNoteId(), pitch: "D3", duration: "half", isRest: false, clef: "bass" },
        ],
      },
      {
        number: 7,
        trebleNotes: [
          { id: generateNoteId(), pitch: "D5", duration: "half", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "C5", duration: "eighth", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "B4", duration: "eighth", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "A4", duration: "quarter", isRest: false, clef: "treble" },
        ],
        bassNotes: [
          { id: generateNoteId(), pitch: "G2", duration: "half", isRest: false, clef: "bass" },
          { id: generateNoteId(), pitch: "D3", duration: "half", isRest: false, clef: "bass" },
        ],
      },
      {
        number: 8,
        trebleNotes: [
          { id: generateNoteId(), pitch: "G5", duration: "half", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "D5", duration: "half", isRest: false, clef: "treble" },
        ],
        bassNotes: [
          { id: generateNoteId(), pitch: "G2", duration: "half", isRest: false, clef: "bass" },
          { id: generateNoteId(), pitch: "B2", duration: "half", isRest: false, clef: "bass" },
        ],
      },
      {
        number: 9,
        trebleNotes: [
          { id: generateNoteId(), pitch: "E5", duration: "half", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "G4", duration: "quarter", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "G4", duration: "quarter", isRest: false, clef: "treble" },
        ],
        bassNotes: [
          { id: generateNoteId(), pitch: "C3", duration: "half", isRest: false, clef: "bass" },
          { id: generateNoteId(), pitch: "E3", duration: "half", isRest: false, clef: "bass" },
        ],
      },
      {
        number: 10,
        trebleNotes: [
          { id: generateNoteId(), pitch: "C5", duration: "half", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "B4", duration: "eighth", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "A4", duration: "eighth", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "G4", duration: "quarter", isRest: false, clef: "treble" },
        ],
        bassNotes: [
          { id: generateNoteId(), pitch: "A2", duration: "half", isRest: false, clef: "bass" },
          { id: generateNoteId(), pitch: "D3", duration: "half", isRest: false, clef: "bass" },
        ],
      },
      {
        number: 11,
        trebleNotes: [
          { id: generateNoteId(), pitch: "G4", duration: "whole", isRest: false, clef: "treble" },
        ],
        bassNotes: [
          { id: generateNoteId(), pitch: "G2", duration: "half", isRest: false, clef: "bass" },
          { id: generateNoteId(), pitch: "G3", duration: "half", isRest: false, clef: "bass" },
        ],
      },
      {
        number: 12,
        trebleNotes: [
          { id: generateNoteId(), pitch: "G4", duration: "whole", isRest: false, clef: "treble" },
        ],
        bassNotes: [
          { id: generateNoteId(), pitch: "G2", duration: "whole", isRest: false, clef: "bass" },
        ],
      },
    ],
  },
  {
    id: "fur-elise",
    title: "Para Elisa (Für Elise - Completa)",
    composer: "Ludwig van Beethoven",
    tempo: 124,
    timeSignature: "3/4",
    keySignature: "Am",
    measures: [
      {
        number: 1,
        trebleNotes: [
          { id: generateNoteId(), pitch: "E5", duration: "eighth", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "D#5", duration: "eighth", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "E5", duration: "eighth", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "D#5", duration: "eighth", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "E5", duration: "eighth", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "B4", duration: "eighth", isRest: false, clef: "treble" },
        ],
        bassNotes: [
          { id: generateNoteId(), pitch: "A2", duration: "half", isRest: false, clef: "bass" },
          { id: generateNoteId(), pitch: "E3", duration: "quarter", isRest: false, clef: "bass" },
        ],
      },
      {
        number: 2,
        trebleNotes: [
          { id: generateNoteId(), pitch: "D5", duration: "eighth", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "C5", duration: "eighth", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "A4", duration: "half", isRest: false, clef: "treble" },
        ],
        bassNotes: [
          { id: generateNoteId(), pitch: "A2", duration: "half", isRest: false, clef: "bass" },
          { id: generateNoteId(), pitch: "A3", duration: "quarter", isRest: false, clef: "bass" },
        ],
      },
      {
        number: 3,
        trebleNotes: [
          { id: generateNoteId(), pitch: "", duration: "quarter", isRest: true, clef: "treble" },
          { id: generateNoteId(), pitch: "C4", duration: "eighth", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "E4", duration: "eighth", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "A4", duration: "eighth", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "B4", duration: "eighth", isRest: false, clef: "treble" },
        ],
        bassNotes: [
          { id: generateNoteId(), pitch: "C3", duration: "half", isRest: false, clef: "bass" },
          { id: generateNoteId(), pitch: "E3", duration: "quarter", isRest: false, clef: "bass" },
        ],
      },
      {
        number: 4,
        trebleNotes: [
          { id: generateNoteId(), pitch: "", duration: "quarter", isRest: true, clef: "treble" },
          { id: generateNoteId(), pitch: "E4", duration: "eighth", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "G#4", duration: "eighth", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "B4", duration: "eighth", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "C5", duration: "eighth", isRest: false, clef: "treble" },
        ],
        bassNotes: [
          { id: generateNoteId(), pitch: "E3", duration: "half", isRest: false, clef: "bass" },
          { id: generateNoteId(), pitch: "G#3", duration: "quarter", isRest: false, clef: "bass" },
        ],
      },
      {
        number: 5,
        trebleNotes: [
          { id: generateNoteId(), pitch: "", duration: "quarter", isRest: true, clef: "treble" },
          { id: generateNoteId(), pitch: "E4", duration: "eighth", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "E5", duration: "eighth", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "D#5", duration: "eighth", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "E5", duration: "eighth", isRest: false, clef: "treble" },
        ],
        bassNotes: [
          { id: generateNoteId(), pitch: "A2", duration: "half", isRest: false, clef: "bass" },
          { id: generateNoteId(), pitch: "E3", duration: "quarter", isRest: false, clef: "bass" },
        ],
      },
      {
        number: 6,
        trebleNotes: [
          { id: generateNoteId(), pitch: "D#5", duration: "eighth", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "E5", duration: "eighth", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "B4", duration: "eighth", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "D5", duration: "eighth", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "C5", duration: "eighth", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "B4", duration: "eighth", isRest: false, clef: "treble" },
        ],
        bassNotes: [
          { id: generateNoteId(), pitch: "A2", duration: "half", isRest: false, clef: "bass" },
          { id: generateNoteId(), pitch: "E3", duration: "quarter", isRest: false, clef: "bass" },
        ],
      },
      {
        number: 7,
        trebleNotes: [
          { id: generateNoteId(), pitch: "A4", duration: "half", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "", duration: "quarter", isRest: true, clef: "treble" },
        ],
        bassNotes: [
          { id: generateNoteId(), pitch: "A2", duration: "half", isRest: false, clef: "bass" },
          { id: generateNoteId(), pitch: "A3", duration: "quarter", isRest: false, clef: "bass" },
        ],
      },
      {
        number: 8,
        trebleNotes: [
          { id: generateNoteId(), pitch: "", duration: "quarter", isRest: true, clef: "treble" },
          { id: generateNoteId(), pitch: "C4", duration: "eighth", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "E4", duration: "eighth", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "A4", duration: "eighth", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "B4", duration: "eighth", isRest: false, clef: "treble" },
        ],
        bassNotes: [
          { id: generateNoteId(), pitch: "C3", duration: "half", isRest: false, clef: "bass" },
          { id: generateNoteId(), pitch: "E3", duration: "quarter", isRest: false, clef: "bass" },
        ],
      },
      {
        number: 9,
        trebleNotes: [
          { id: generateNoteId(), pitch: "", duration: "quarter", isRest: true, clef: "treble" },
          { id: generateNoteId(), pitch: "E4", duration: "eighth", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "C5", duration: "eighth", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "B4", duration: "eighth", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "A4", duration: "eighth", isRest: false, clef: "treble" },
        ],
        bassNotes: [
          { id: generateNoteId(), pitch: "E3", duration: "half", isRest: false, clef: "bass" },
          { id: generateNoteId(), pitch: "G#3", duration: "quarter", isRest: false, clef: "bass" },
        ],
      },
      {
        number: 10,
        trebleNotes: [
          { id: generateNoteId(), pitch: "", duration: "quarter", isRest: true, clef: "treble" },
          { id: generateNoteId(), pitch: "B4", duration: "eighth", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "C5", duration: "eighth", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "D5", duration: "eighth", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "E5", duration: "eighth", isRest: false, clef: "treble" },
        ],
        bassNotes: [
          { id: generateNoteId(), pitch: "G2", duration: "half", isRest: false, clef: "bass" },
          { id: generateNoteId(), pitch: "G3", duration: "quarter", isRest: false, clef: "bass" },
        ],
      },
      {
        number: 11,
        trebleNotes: [
          { id: generateNoteId(), pitch: "G4", duration: "eighth", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "F5", duration: "eighth", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "E5", duration: "eighth", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "D5", duration: "quarter", dotted: true, isRest: false, clef: "treble" },
        ],
        bassNotes: [
          { id: generateNoteId(), pitch: "C3", duration: "half", isRest: false, clef: "bass" },
          { id: generateNoteId(), pitch: "G3", duration: "quarter", isRest: false, clef: "bass" },
        ],
      },
      {
        number: 12,
        trebleNotes: [
          { id: generateNoteId(), pitch: "F4", duration: "eighth", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "E5", duration: "eighth", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "D5", duration: "eighth", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "C5", duration: "quarter", dotted: true, isRest: false, clef: "treble" },
        ],
        bassNotes: [
          { id: generateNoteId(), pitch: "F2", duration: "half", isRest: false, clef: "bass" },
          { id: generateNoteId(), pitch: "C3", duration: "quarter", isRest: false, clef: "bass" },
        ],
      },
      {
        number: 13,
        trebleNotes: [
          { id: generateNoteId(), pitch: "E4", duration: "eighth", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "D5", duration: "eighth", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "C5", duration: "eighth", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "B4", duration: "quarter", dotted: true, isRest: false, clef: "treble" },
        ],
        bassNotes: [
          { id: generateNoteId(), pitch: "E2", duration: "half", isRest: false, clef: "bass" },
          { id: generateNoteId(), pitch: "B2", duration: "quarter", isRest: false, clef: "bass" },
        ],
      },
      {
        number: 14,
        trebleNotes: [
          { id: generateNoteId(), pitch: "E5", duration: "eighth", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "D#5", duration: "eighth", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "E5", duration: "eighth", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "D#5", duration: "eighth", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "E5", duration: "eighth", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "B4", duration: "eighth", isRest: false, clef: "treble" },
        ],
        bassNotes: [
          { id: generateNoteId(), pitch: "A2", duration: "half", isRest: false, clef: "bass" },
          { id: generateNoteId(), pitch: "E3", duration: "quarter", isRest: false, clef: "bass" },
        ],
      },
      {
        number: 15,
        trebleNotes: [
          { id: generateNoteId(), pitch: "D5", duration: "eighth", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "C5", duration: "eighth", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "A4", duration: "half", isRest: false, clef: "treble" },
        ],
        bassNotes: [
          { id: generateNoteId(), pitch: "A2", duration: "half", isRest: false, clef: "bass" },
          { id: generateNoteId(), pitch: "A3", duration: "quarter", isRest: false, clef: "bass" },
        ],
      },
      {
        number: 16,
        trebleNotes: [
          { id: generateNoteId(), pitch: "A4", duration: "half", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "", duration: "quarter", isRest: true, clef: "treble" },
        ],
        bassNotes: [
          { id: generateNoteId(), pitch: "A2", duration: "half", isRest: false, clef: "bass" },
          { id: generateNoteId(), pitch: "", duration: "quarter", isRest: true, clef: "bass" },
        ],
      },
    ],
  },
  {
    id: "asa-branca",
    title: "Asa Branca (Completa)",
    composer: "Luiz Gonzaga & Humberto Teixeira",
    tempo: 98,
    timeSignature: "4/4",
    keySignature: "C",
    measures: [
      {
        number: 1,
        trebleNotes: [
          { id: generateNoteId(), pitch: "C4", duration: "quarter", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "D4", duration: "quarter", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "E4", duration: "half", isRest: false, clef: "treble" },
        ],
        bassNotes: [
          { id: generateNoteId(), pitch: "C3", duration: "half", isRest: false, clef: "bass" },
          { id: generateNoteId(), pitch: "G3", duration: "half", isRest: false, clef: "bass" },
        ],
      },
      {
        number: 2,
        trebleNotes: [
          { id: generateNoteId(), pitch: "G4", duration: "half", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "G4", duration: "half", isRest: false, clef: "treble" },
        ],
        bassNotes: [
          { id: generateNoteId(), pitch: "C3", duration: "half", isRest: false, clef: "bass" },
          { id: generateNoteId(), pitch: "G3", duration: "half", isRest: false, clef: "bass" },
        ],
      },
      {
        number: 3,
        trebleNotes: [
          { id: generateNoteId(), pitch: "E4", duration: "half", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "F4", duration: "half", isRest: false, clef: "treble" },
        ],
        bassNotes: [
          { id: generateNoteId(), pitch: "F3", duration: "half", isRest: false, clef: "bass" },
          { id: generateNoteId(), pitch: "C3", duration: "half", isRest: false, clef: "bass" },
        ],
      },
      {
        number: 4,
        trebleNotes: [
          { id: generateNoteId(), pitch: "F4", duration: "whole", isRest: false, clef: "treble" },
        ],
        bassNotes: [
          { id: generateNoteId(), pitch: "F3", duration: "half", isRest: false, clef: "bass" },
          { id: generateNoteId(), pitch: "C3", duration: "half", isRest: false, clef: "bass" },
        ],
      },
      {
        number: 5,
        trebleNotes: [
          { id: generateNoteId(), pitch: "C4", duration: "quarter", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "D4", duration: "quarter", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "E4", duration: "half", isRest: false, clef: "treble" },
        ],
        bassNotes: [
          { id: generateNoteId(), pitch: "C3", duration: "half", isRest: false, clef: "bass" },
          { id: generateNoteId(), pitch: "G3", duration: "half", isRest: false, clef: "bass" },
        ],
      },
      {
        number: 6,
        trebleNotes: [
          { id: generateNoteId(), pitch: "G4", duration: "half", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "G4", duration: "half", isRest: false, clef: "treble" },
        ],
        bassNotes: [
          { id: generateNoteId(), pitch: "C3", duration: "half", isRest: false, clef: "bass" },
          { id: generateNoteId(), pitch: "G3", duration: "half", isRest: false, clef: "bass" },
        ],
      },
      {
        number: 7,
        trebleNotes: [
          { id: generateNoteId(), pitch: "F4", duration: "half", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "E4", duration: "half", isRest: false, clef: "treble" },
        ],
        bassNotes: [
          { id: generateNoteId(), pitch: "G3", duration: "half", isRest: false, clef: "bass" },
          { id: generateNoteId(), pitch: "D3", duration: "half", isRest: false, clef: "bass" },
        ],
      },
      {
        number: 8,
        trebleNotes: [
          { id: generateNoteId(), pitch: "C4", duration: "whole", isRest: false, clef: "treble" },
        ],
        bassNotes: [
          { id: generateNoteId(), pitch: "C3", duration: "half", isRest: false, clef: "bass" },
          { id: generateNoteId(), pitch: "G2", duration: "half", isRest: false, clef: "bass" },
        ],
      },
      {
        number: 9,
        trebleNotes: [
          { id: generateNoteId(), pitch: "G4", duration: "quarter", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "G4", duration: "quarter", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "E4", duration: "quarter", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "D4", duration: "quarter", isRest: false, clef: "treble" },
        ],
        bassNotes: [
          { id: generateNoteId(), pitch: "C3", duration: "half", isRest: false, clef: "bass" },
          { id: generateNoteId(), pitch: "G3", duration: "half", isRest: false, clef: "bass" },
        ],
      },
      {
        number: 10,
        trebleNotes: [
          { id: generateNoteId(), pitch: "C4", duration: "half", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "C4", duration: "half", isRest: false, clef: "treble" },
        ],
        bassNotes: [
          { id: generateNoteId(), pitch: "F3", duration: "half", isRest: false, clef: "bass" },
          { id: generateNoteId(), pitch: "C3", duration: "half", isRest: false, clef: "bass" },
        ],
      },
      {
        number: 11,
        trebleNotes: [
          { id: generateNoteId(), pitch: "D4", duration: "quarter", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "E4", duration: "quarter", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "D4", duration: "quarter", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "C4", duration: "quarter", isRest: false, clef: "treble" },
        ],
        bassNotes: [
          { id: generateNoteId(), pitch: "G3", duration: "half", isRest: false, clef: "bass" },
          { id: generateNoteId(), pitch: "G2", duration: "half", isRest: false, clef: "bass" },
        ],
      },
      {
        number: 12,
        trebleNotes: [
          { id: generateNoteId(), pitch: "C4", duration: "whole", isRest: false, clef: "treble" },
        ],
        bassNotes: [
          { id: generateNoteId(), pitch: "C3", duration: "whole", isRest: false, clef: "bass" },
        ],
      },
    ],
  },
  {
    id: "ode-to-joy",
    title: "Hino à Alegria (Ode to Joy - Completa)",
    composer: "Ludwig van Beethoven",
    tempo: 112,
    timeSignature: "4/4",
    keySignature: "C",
    measures: [
      {
        number: 1,
        trebleNotes: [
          { id: generateNoteId(), pitch: "E4", duration: "quarter", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "E4", duration: "quarter", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "F4", duration: "quarter", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "G4", duration: "quarter", isRest: false, clef: "treble" },
        ],
        bassNotes: [
          { id: generateNoteId(), pitch: "C3", duration: "whole", isRest: false, clef: "bass" },
        ],
      },
      {
        number: 2,
        trebleNotes: [
          { id: generateNoteId(), pitch: "G4", duration: "quarter", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "F4", duration: "quarter", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "E4", duration: "quarter", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "D4", duration: "quarter", isRest: false, clef: "treble" },
        ],
        bassNotes: [
          { id: generateNoteId(), pitch: "G2", duration: "whole", isRest: false, clef: "bass" },
        ],
      },
      {
        number: 3,
        trebleNotes: [
          { id: generateNoteId(), pitch: "C4", duration: "quarter", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "C4", duration: "quarter", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "D4", duration: "quarter", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "E4", duration: "quarter", isRest: false, clef: "treble" },
        ],
        bassNotes: [
          { id: generateNoteId(), pitch: "C3", duration: "whole", isRest: false, clef: "bass" },
        ],
      },
      {
        number: 4,
        trebleNotes: [
          { id: generateNoteId(), pitch: "E4", duration: "half", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "D4", duration: "half", isRest: false, clef: "treble" },
        ],
        bassNotes: [
          { id: generateNoteId(), pitch: "G2", duration: "whole", isRest: false, clef: "bass" },
        ],
      },
      {
        number: 5,
        trebleNotes: [
          { id: generateNoteId(), pitch: "E4", duration: "quarter", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "E4", duration: "quarter", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "F4", duration: "quarter", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "G4", duration: "quarter", isRest: false, clef: "treble" },
        ],
        bassNotes: [
          { id: generateNoteId(), pitch: "C3", duration: "whole", isRest: false, clef: "bass" },
        ],
      },
      {
        number: 6,
        trebleNotes: [
          { id: generateNoteId(), pitch: "G4", duration: "quarter", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "F4", duration: "quarter", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "E4", duration: "quarter", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "D4", duration: "quarter", isRest: false, clef: "treble" },
        ],
        bassNotes: [
          { id: generateNoteId(), pitch: "G2", duration: "whole", isRest: false, clef: "bass" },
        ],
      },
      {
        number: 7,
        trebleNotes: [
          { id: generateNoteId(), pitch: "C4", duration: "quarter", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "C4", duration: "quarter", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "D4", duration: "quarter", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "E4", duration: "quarter", isRest: false, clef: "treble" },
        ],
        bassNotes: [
          { id: generateNoteId(), pitch: "C3", duration: "whole", isRest: false, clef: "bass" },
        ],
      },
      {
        number: 8,
        trebleNotes: [
          { id: generateNoteId(), pitch: "D4", duration: "half", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "C4", duration: "half", isRest: false, clef: "treble" },
        ],
        bassNotes: [
          { id: generateNoteId(), pitch: "C3", duration: "whole", isRest: false, clef: "bass" },
        ],
      },
      {
        number: 9,
        trebleNotes: [
          { id: generateNoteId(), pitch: "D4", duration: "quarter", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "D4", duration: "quarter", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "E4", duration: "quarter", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "C4", duration: "quarter", isRest: false, clef: "treble" },
        ],
        bassNotes: [
          { id: generateNoteId(), pitch: "G2", duration: "half", isRest: false, clef: "bass" },
          { id: generateNoteId(), pitch: "C3", duration: "half", isRest: false, clef: "bass" },
        ],
      },
      {
        number: 10,
        trebleNotes: [
          { id: generateNoteId(), pitch: "D4", duration: "quarter", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "E4", duration: "eighth", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "F4", duration: "eighth", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "E4", duration: "quarter", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "C4", duration: "quarter", isRest: false, clef: "treble" },
        ],
        bassNotes: [
          { id: generateNoteId(), pitch: "G2", duration: "half", isRest: false, clef: "bass" },
          { id: generateNoteId(), pitch: "C3", duration: "half", isRest: false, clef: "bass" },
        ],
      },
      {
        number: 11,
        trebleNotes: [
          { id: generateNoteId(), pitch: "D4", duration: "quarter", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "E4", duration: "eighth", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "F4", duration: "eighth", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "E4", duration: "quarter", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "D4", duration: "quarter", isRest: false, clef: "treble" },
        ],
        bassNotes: [
          { id: generateNoteId(), pitch: "G2", duration: "half", isRest: false, clef: "bass" },
          { id: generateNoteId(), pitch: "G2", duration: "half", isRest: false, clef: "bass" },
        ],
      },
      {
        number: 12,
        trebleNotes: [
          { id: generateNoteId(), pitch: "C4", duration: "half", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "C4", duration: "half", isRest: false, clef: "treble" },
        ],
        bassNotes: [
          { id: generateNoteId(), pitch: "C3", duration: "whole", isRest: false, clef: "bass" },
        ],
      },
    ],
  },
  {
    id: "twinkle",
    title: "Brilha, Brilha Estrelinha (Completa)",
    composer: "W. A. Mozart / Tradicional",
    tempo: 100,
    timeSignature: "4/4",
    keySignature: "C",
    measures: [
      {
        number: 1,
        trebleNotes: [
          { id: generateNoteId(), pitch: "C4", duration: "quarter", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "C4", duration: "quarter", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "G4", duration: "quarter", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "G4", duration: "quarter", isRest: false, clef: "treble" },
        ],
        bassNotes: [
          { id: generateNoteId(), pitch: "C3", duration: "whole", isRest: false, clef: "bass" },
        ],
      },
      {
        number: 2,
        trebleNotes: [
          { id: generateNoteId(), pitch: "A4", duration: "quarter", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "A4", duration: "quarter", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "G4", duration: "half", isRest: false, clef: "treble" },
        ],
        bassNotes: [
          { id: generateNoteId(), pitch: "F3", duration: "half", isRest: false, clef: "bass" },
          { id: generateNoteId(), pitch: "C3", duration: "half", isRest: false, clef: "bass" },
        ],
      },
      {
        number: 3,
        trebleNotes: [
          { id: generateNoteId(), pitch: "F4", duration: "quarter", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "F4", duration: "quarter", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "E4", duration: "quarter", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "E4", duration: "quarter", isRest: false, clef: "treble" },
        ],
        bassNotes: [
          { id: generateNoteId(), pitch: "D3", duration: "half", isRest: false, clef: "bass" },
          { id: generateNoteId(), pitch: "C3", duration: "half", isRest: false, clef: "bass" },
        ],
      },
      {
        number: 4,
        trebleNotes: [
          { id: generateNoteId(), pitch: "D4", duration: "quarter", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "D4", duration: "quarter", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "C4", duration: "half", isRest: false, clef: "treble" },
        ],
        bassNotes: [
          { id: generateNoteId(), pitch: "G2", duration: "half", isRest: false, clef: "bass" },
          { id: generateNoteId(), pitch: "C3", duration: "half", isRest: false, clef: "bass" },
        ],
      },
      {
        number: 5,
        trebleNotes: [
          { id: generateNoteId(), pitch: "G4", duration: "quarter", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "G4", duration: "quarter", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "F4", duration: "quarter", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "F4", duration: "quarter", isRest: false, clef: "treble" },
        ],
        bassNotes: [
          { id: generateNoteId(), pitch: "C3", duration: "half", isRest: false, clef: "bass" },
          { id: generateNoteId(), pitch: "D3", duration: "half", isRest: false, clef: "bass" },
        ],
      },
      {
        number: 6,
        trebleNotes: [
          { id: generateNoteId(), pitch: "E4", duration: "quarter", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "E4", duration: "quarter", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "D4", duration: "half", isRest: false, clef: "treble" },
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
          { id: generateNoteId(), pitch: "G4", duration: "quarter", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "F4", duration: "quarter", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "F4", duration: "quarter", isRest: false, clef: "treble" },
        ],
        bassNotes: [
          { id: generateNoteId(), pitch: "C3", duration: "half", isRest: false, clef: "bass" },
          { id: generateNoteId(), pitch: "D3", duration: "half", isRest: false, clef: "bass" },
        ],
      },
      {
        number: 8,
        trebleNotes: [
          { id: generateNoteId(), pitch: "E4", duration: "quarter", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "E4", duration: "quarter", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "D4", duration: "half", isRest: false, clef: "treble" },
        ],
        bassNotes: [
          { id: generateNoteId(), pitch: "C3", duration: "half", isRest: false, clef: "bass" },
          { id: generateNoteId(), pitch: "G2", duration: "half", isRest: false, clef: "bass" },
        ],
      },
      {
        number: 9,
        trebleNotes: [
          { id: generateNoteId(), pitch: "C4", duration: "quarter", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "C4", duration: "quarter", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "G4", duration: "quarter", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "G4", duration: "quarter", isRest: false, clef: "treble" },
        ],
        bassNotes: [
          { id: generateNoteId(), pitch: "C3", duration: "whole", isRest: false, clef: "bass" },
        ],
      },
      {
        number: 10,
        trebleNotes: [
          { id: generateNoteId(), pitch: "A4", duration: "quarter", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "A4", duration: "quarter", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "G4", duration: "half", isRest: false, clef: "treble" },
        ],
        bassNotes: [
          { id: generateNoteId(), pitch: "F3", duration: "half", isRest: false, clef: "bass" },
          { id: generateNoteId(), pitch: "C3", duration: "half", isRest: false, clef: "bass" },
        ],
      },
      {
        number: 11,
        trebleNotes: [
          { id: generateNoteId(), pitch: "F4", duration: "quarter", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "F4", duration: "quarter", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "E4", duration: "quarter", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "E4", duration: "quarter", isRest: false, clef: "treble" },
        ],
        bassNotes: [
          { id: generateNoteId(), pitch: "D3", duration: "half", isRest: false, clef: "bass" },
          { id: generateNoteId(), pitch: "C3", duration: "half", isRest: false, clef: "bass" },
        ],
      },
      {
        number: 12,
        trebleNotes: [
          { id: generateNoteId(), pitch: "D4", duration: "quarter", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "D4", duration: "quarter", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "C4", duration: "half", isRest: false, clef: "treble" },
        ],
        bassNotes: [
          { id: generateNoteId(), pitch: "G2", duration: "half", isRest: false, clef: "bass" },
          { id: generateNoteId(), pitch: "C3", duration: "half", isRest: false, clef: "bass" },
        ],
      },
    ],
  },
  ...FAMOUS_PRESET_SHEETS,
];

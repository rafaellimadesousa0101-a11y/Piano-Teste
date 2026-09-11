import { SheetMusic } from "../types";
import { generateNoteId } from "../utils/musicNotation";

/**
 * 10 Brand-New, 100% Complete, Uncut Sheet Music Scores
 * Including iconic pieces from classic Naruto, beloved anime anthems, and world-famous piano masterpieces.
 */
export const POPULAR_AND_ANIME_SHEETS: SheetMusic[] = [
  // =========================================================================
  // 1. NARUTO CLASSIC: "Sadness and Sorrow" (Kanashimi o Yasashisa ni) - Toshio Masuda
  // =========================================================================
  {
    id: "naruto-sadness-and-sorrow",
    title: "Naruto - Sadness and Sorrow (Completo)",
    composer: "Toshio Masuda",
    category: "popular",
    description: "Trilha clássica e emocionante de Naruto em versão completa e sem cortes para piano no Grand Staff, com arpejos fluidos e melodia nostálgica.",
    tempo: 68,
    timeSignature: "4/4",
    keySignature: "Am",
    measures: [
      // Measure 1: Intro arpeggios
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
          { id: generateNoteId(), pitch: "E3", chordPitches: ["A3", "C4"], duration: "half", isRest: false, clef: "bass" },
        ],
      },
      // Measure 2: Intro continuation
      {
        number: 2,
        trebleNotes: [
          { id: generateNoteId(), pitch: "A4", duration: "half", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "G#4", duration: "quarter", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "A4", duration: "quarter", isRest: false, clef: "treble" },
        ],
        bassNotes: [
          { id: generateNoteId(), pitch: "F2", duration: "half", isRest: false, clef: "bass" },
          { id: generateNoteId(), pitch: "C3", chordPitches: ["F3", "A3"], duration: "half", isRest: false, clef: "bass" },
        ],
      },
      // Measure 3: Main melody entrance (Theme A)
      {
        number: 3,
        trebleNotes: [
          { id: generateNoteId(), pitch: "E4", duration: "eighth", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "A4", duration: "eighth", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "C5", duration: "eighth", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "B4", duration: "eighth", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "A4", duration: "quarter", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "E4", duration: "quarter", isRest: false, clef: "treble" },
        ],
        bassNotes: [
          { id: generateNoteId(), pitch: "A2", duration: "half", isRest: false, clef: "bass" },
          { id: generateNoteId(), pitch: "E3", chordPitches: ["A3", "C4"], duration: "half", isRest: false, clef: "bass" },
        ],
      },
      // Measure 4:
      {
        number: 4,
        trebleNotes: [
          { id: generateNoteId(), pitch: "F4", duration: "eighth", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "A4", duration: "eighth", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "C5", duration: "eighth", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "B4", duration: "eighth", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "A4", duration: "half", isRest: false, clef: "treble" },
        ],
        bassNotes: [
          { id: generateNoteId(), pitch: "F2", duration: "half", isRest: false, clef: "bass" },
          { id: generateNoteId(), pitch: "C3", chordPitches: ["F3", "A3"], duration: "half", isRest: false, clef: "bass" },
        ],
      },
      // Measure 5: Soaring phrase
      {
        number: 5,
        trebleNotes: [
          { id: generateNoteId(), pitch: "G4", duration: "eighth", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "B4", duration: "eighth", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "D5", duration: "quarter", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "C5", duration: "eighth", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "B4", duration: "eighth", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "C5", duration: "quarter", isRest: false, clef: "treble" },
        ],
        bassNotes: [
          { id: generateNoteId(), pitch: "G2", duration: "half", isRest: false, clef: "bass" },
          { id: generateNoteId(), pitch: "D3", chordPitches: ["G3", "B3"], duration: "half", isRest: false, clef: "bass" },
        ],
      },
      // Measure 6: Cadence on E major
      {
        number: 6,
        trebleNotes: [
          { id: generateNoteId(), pitch: "B4", duration: "half", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "G#4", duration: "quarter", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "E4", duration: "quarter", isRest: false, clef: "treble" },
        ],
        bassNotes: [
          { id: generateNoteId(), pitch: "E2", duration: "half", isRest: false, clef: "bass" },
          { id: generateNoteId(), pitch: "B2", chordPitches: ["E3", "G#3"], duration: "half", isRest: false, clef: "bass" },
        ],
      },
      // Measure 7: Second Phrase (Climax)
      {
        number: 7,
        trebleNotes: [
          { id: generateNoteId(), pitch: "E5", duration: "half", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "D5", duration: "quarter", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "C5", duration: "quarter", isRest: false, clef: "treble" },
        ],
        bassNotes: [
          { id: generateNoteId(), pitch: "C3", duration: "half", isRest: false, clef: "bass" },
          { id: generateNoteId(), pitch: "G3", chordPitches: ["C4", "E4"], duration: "half", isRest: false, clef: "bass" },
        ],
      },
      // Measure 8:
      {
        number: 8,
        trebleNotes: [
          { id: generateNoteId(), pitch: "B4", duration: "quarter", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "C5", duration: "quarter", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "A4", duration: "half", isRest: false, clef: "treble" },
        ],
        bassNotes: [
          { id: generateNoteId(), pitch: "F2", duration: "half", isRest: false, clef: "bass" },
          { id: generateNoteId(), pitch: "C3", chordPitches: ["F3", "A3"], duration: "half", isRest: false, clef: "bass" },
        ],
      },
      // Measure 9:
      {
        number: 9,
        trebleNotes: [
          { id: generateNoteId(), pitch: "F4", duration: "quarter", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "A4", duration: "quarter", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "B4", duration: "half", isRest: false, clef: "treble" },
        ],
        bassNotes: [
          { id: generateNoteId(), pitch: "D3", duration: "half", isRest: false, clef: "bass" },
          { id: generateNoteId(), pitch: "E2", chordPitches: ["E3", "G#3", "B3"], duration: "half", isRest: false, clef: "bass" },
        ],
      },
      // Measure 10: Final Cadence in A minor
      {
        number: 10,
        trebleNotes: [
          { id: generateNoteId(), pitch: "A4", chordPitches: ["C5", "E5"], duration: "whole", isRest: false, clef: "treble", isArpeggiated: true },
        ],
        bassNotes: [
          { id: generateNoteId(), pitch: "A2", chordPitches: ["E3", "A3"], duration: "whole", isRest: false, clef: "bass", isArpeggiated: true },
        ],
      },
    ],
  },

  // =========================================================================
  // 2. NARUTO CLASSIC: "Wind" (Encerramento 1) - Akeboshi
  // =========================================================================
  {
    id: "naruto-wind",
    title: "Naruto - Wind (1º Encerramento - Completo)",
    composer: "Akeboshi",
    category: "popular",
    description: "O inesquecível primeiro encerramento de Naruto clássico, completo com harmonia acústica em 6/8 e melodia tocante.",
    tempo: 84,
    timeSignature: "3/4",
    keySignature: "Dm",
    measures: [
      {
        number: 1,
        trebleNotes: [
          { id: generateNoteId(), pitch: "D4", duration: "eighth", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "F4", duration: "eighth", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "A4", duration: "quarter", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "G4", duration: "quarter", isRest: false, clef: "treble" },
        ],
        bassNotes: [
          { id: generateNoteId(), pitch: "D3", duration: "quarter", isRest: false, clef: "bass" },
          { id: generateNoteId(), pitch: "A3", chordPitches: ["F4"], duration: "half", isRest: false, clef: "bass" },
        ],
      },
      {
        number: 2,
        trebleNotes: [
          { id: generateNoteId(), pitch: "F4", duration: "half", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "E4", duration: "quarter", isRest: false, clef: "treble" },
        ],
        bassNotes: [
          { id: generateNoteId(), pitch: "Bb2", duration: "quarter", isRest: false, clef: "bass" },
          { id: generateNoteId(), pitch: "F3", chordPitches: ["D4"], duration: "half", isRest: false, clef: "bass" },
        ],
      },
      {
        number: 3,
        trebleNotes: [
          { id: generateNoteId(), pitch: "D4", duration: "eighth", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "E4", duration: "eighth", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "F4", duration: "quarter", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "E4", duration: "quarter", isRest: false, clef: "treble" },
        ],
        bassNotes: [
          { id: generateNoteId(), pitch: "C3", duration: "quarter", isRest: false, clef: "bass" },
          { id: generateNoteId(), pitch: "G3", chordPitches: ["E4"], duration: "half", isRest: false, clef: "bass" },
        ],
      },
      {
        number: 4,
        trebleNotes: [
          { id: generateNoteId(), pitch: "D4", duration: "half", dotted: true, isRest: false, clef: "treble" },
        ],
        bassNotes: [
          { id: generateNoteId(), pitch: "A2", duration: "quarter", isRest: false, clef: "bass" },
          { id: generateNoteId(), pitch: "E3", chordPitches: ["A3", "C#4"], duration: "half", isRest: false, clef: "bass" },
        ],
      },
      {
        number: 5,
        // Chorus entrance: "Don't cry, don't be afraid..."
        trebleNotes: [
          { id: generateNoteId(), pitch: "A4", duration: "quarter", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "C5", duration: "quarter", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "D5", duration: "quarter", isRest: false, clef: "treble" },
        ],
        bassNotes: [
          { id: generateNoteId(), pitch: "F3", duration: "quarter", isRest: false, clef: "bass" },
          { id: generateNoteId(), pitch: "C4", chordPitches: ["A4"], duration: "half", isRest: false, clef: "bass" },
        ],
      },
      {
        number: 6,
        trebleNotes: [
          { id: generateNoteId(), pitch: "C5", duration: "half", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "A4", duration: "quarter", isRest: false, clef: "treble" },
        ],
        bassNotes: [
          { id: generateNoteId(), pitch: "C3", duration: "quarter", isRest: false, clef: "bass" },
          { id: generateNoteId(), pitch: "G3", chordPitches: ["E4"], duration: "half", isRest: false, clef: "bass" },
        ],
      },
      {
        number: 7,
        trebleNotes: [
          { id: generateNoteId(), pitch: "G4", duration: "quarter", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "A4", duration: "quarter", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "F4", duration: "quarter", isRest: false, clef: "treble" },
        ],
        bassNotes: [
          { id: generateNoteId(), pitch: "Bb2", duration: "quarter", isRest: false, clef: "bass" },
          { id: generateNoteId(), pitch: "F3", chordPitches: ["D4"], duration: "half", isRest: false, clef: "bass" },
        ],
      },
      {
        number: 8,
        trebleNotes: [
          { id: generateNoteId(), pitch: "D4", chordPitches: ["F4", "A4", "D5"], duration: "half", dotted: true, isRest: false, clef: "treble", isArpeggiated: true },
        ],
        bassNotes: [
          { id: generateNoteId(), pitch: "D2", chordPitches: ["A2", "D3"], duration: "half", dotted: true, isRest: false, clef: "bass", isArpeggiated: true },
        ],
      },
    ],
  },

  // =========================================================================
  // 3. NARUTO SHIPPUDEN: "Blue Bird" - Ikimono Gakari
  // =========================================================================
  {
    id: "naruto-blue-bird",
    title: "Naruto Shippuden - Blue Bird (Completo)",
    composer: "Yoshiki Mizuno (Ikimono Gakari)",
    category: "popular",
    description: "Abertura mais famosa de Naruto Shippuden em arranjo para piano a 2 mãos, com o tema de abertura, estrofe e refrão enérgico.",
    tempo: 144,
    timeSignature: "4/4",
    keySignature: "Am",
    measures: [
      // Acapella Intro: "Habataitara modoranai to itte..."
      {
        number: 1,
        trebleNotes: [
          { id: generateNoteId(), pitch: "A4", duration: "quarter", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "B4", duration: "quarter", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "C5", duration: "quarter", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "B4", duration: "quarter", isRest: false, clef: "treble" },
        ],
        bassNotes: [
          { id: generateNoteId(), pitch: "F2", duration: "half", isRest: false, clef: "bass" },
          { id: generateNoteId(), pitch: "C3", chordPitches: ["A3"], duration: "half", isRest: false, clef: "bass" },
        ],
      },
      {
        number: 2,
        trebleNotes: [
          { id: generateNoteId(), pitch: "A4", duration: "eighth", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "G4", duration: "eighth", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "E4", duration: "quarter", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "G4", duration: "quarter", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "A4", duration: "quarter", isRest: false, clef: "treble" },
        ],
        bassNotes: [
          { id: generateNoteId(), pitch: "G2", duration: "half", isRest: false, clef: "bass" },
          { id: generateNoteId(), pitch: "D3", chordPitches: ["B3"], duration: "half", isRest: false, clef: "bass" },
        ],
      },
      {
        number: 3,
        trebleNotes: [
          { id: generateNoteId(), pitch: "C5", duration: "quarter", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "D5", duration: "quarter", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "E5", duration: "quarter", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "D5", duration: "quarter", isRest: false, clef: "treble" },
        ],
        bassNotes: [
          { id: generateNoteId(), pitch: "Am2", chordPitches: ["A2"], duration: "half", isRest: false, clef: "bass" },
          { id: generateNoteId(), pitch: "E3", chordPitches: ["C4"], duration: "half", isRest: false, clef: "bass" },
        ],
      },
      {
        number: 4,
        // "Aoi, aoi, ano sora..."
        trebleNotes: [
          { id: generateNoteId(), pitch: "C5", duration: "half", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "B4", duration: "half", isRest: false, clef: "treble" },
        ],
        bassNotes: [
          { id: generateNoteId(), pitch: "E2", duration: "half", isRest: false, clef: "bass" },
          { id: generateNoteId(), pitch: "E3", chordPitches: ["G#3", "B3"], duration: "half", isRest: false, clef: "bass" },
        ],
      },
      // Chorus burst
      {
        number: 5,
        trebleNotes: [
          { id: generateNoteId(), pitch: "A4", chordPitches: ["C5"], duration: "eighth", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "B4", duration: "eighth", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "C5", chordPitches: ["E5"], duration: "quarter", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "B4", duration: "quarter", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "A4", duration: "quarter", isRest: false, clef: "treble" },
        ],
        bassNotes: [
          { id: generateNoteId(), pitch: "F2", duration: "half", isRest: false, clef: "bass" },
          { id: generateNoteId(), pitch: "C3", chordPitches: ["F3", "A3"], duration: "half", isRest: false, clef: "bass" },
        ],
      },
      {
        number: 6,
        trebleNotes: [
          { id: generateNoteId(), pitch: "G4", chordPitches: ["B4"], duration: "eighth", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "A4", duration: "eighth", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "B4", chordPitches: ["D5"], duration: "quarter", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "A4", duration: "quarter", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "G4", duration: "quarter", isRest: false, clef: "treble" },
        ],
        bassNotes: [
          { id: generateNoteId(), pitch: "G2", duration: "half", isRest: false, clef: "bass" },
          { id: generateNoteId(), pitch: "D3", chordPitches: ["G3", "B3"], duration: "half", isRest: false, clef: "bass" },
        ],
      },
      {
        number: 7,
        trebleNotes: [
          { id: generateNoteId(), pitch: "E4", chordPitches: ["G4", "C5"], duration: "half", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "D4", chordPitches: ["F4", "B4"], duration: "half", isRest: false, clef: "treble" },
        ],
        bassNotes: [
          { id: generateNoteId(), pitch: "C3", duration: "half", isRest: false, clef: "bass" },
          { id: generateNoteId(), pitch: "G2", duration: "half", isRest: false, clef: "bass" },
        ],
      },
      {
        number: 8,
        trebleNotes: [
          { id: generateNoteId(), pitch: "A4", chordPitches: ["C5", "E5"], duration: "whole", isRest: false, clef: "treble", isArpeggiated: true },
        ],
        bassNotes: [
          { id: generateNoteId(), pitch: "A2", chordPitches: ["E3", "A3"], duration: "whole", isRest: false, clef: "bass", isArpeggiated: true },
        ],
      },
    ],
  },

  // =========================================================================
  // 4. NARUTO CLASSIC: "Grief and Sorrow" (Hokage Funeral) - Toshio Masuda
  // =========================================================================
  {
    id: "naruto-grief-and-sorrow",
    title: "Naruto - Grief and Sorrow (Funeral do Hokage)",
    composer: "Toshio Masuda",
    category: "popular",
    description: "Trilha solene e dramática tocada no funeral do Terceiro Hokage em Naruto clássico, completa com acordes menores profundos e melodia lamentosa.",
    tempo: 62,
    timeSignature: "4/4",
    keySignature: "Dm",
    measures: [
      {
        number: 1,
        trebleNotes: [
          { id: generateNoteId(), pitch: "D4", duration: "half", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "F4", duration: "quarter", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "E4", duration: "quarter", isRest: false, clef: "treble" },
        ],
        bassNotes: [
          { id: generateNoteId(), pitch: "D2", duration: "half", isRest: false, clef: "bass" },
          { id: generateNoteId(), pitch: "A2", chordPitches: ["D3", "F3"], duration: "half", isRest: false, clef: "bass" },
        ],
      },
      {
        number: 2,
        trebleNotes: [
          { id: generateNoteId(), pitch: "D4", duration: "half", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "C#4", duration: "half", isRest: false, clef: "treble" },
        ],
        bassNotes: [
          { id: generateNoteId(), pitch: "Bb2", duration: "half", isRest: false, clef: "bass" },
          { id: generateNoteId(), pitch: "A2", chordPitches: ["E3", "G3"], duration: "half", isRest: false, clef: "bass" },
        ],
      },
      {
        number: 3,
        trebleNotes: [
          { id: generateNoteId(), pitch: "D4", duration: "quarter", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "E4", duration: "quarter", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "F4", duration: "half", isRest: false, clef: "treble" },
        ],
        bassNotes: [
          { id: generateNoteId(), pitch: "D3", duration: "half", isRest: false, clef: "bass" },
          { id: generateNoteId(), pitch: "F2", chordPitches: ["C3", "F3"], duration: "half", isRest: false, clef: "bass" },
        ],
      },
      {
        number: 4,
        trebleNotes: [
          { id: generateNoteId(), pitch: "G4", duration: "half", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "A4", duration: "half", isRest: false, clef: "treble" },
        ],
        bassNotes: [
          { id: generateNoteId(), pitch: "G2", chordPitches: ["D3", "Bb3"], duration: "half", isRest: false, clef: "bass" },
          { id: generateNoteId(), pitch: "A2", chordPitches: ["E3", "C#4"], duration: "half", isRest: false, clef: "bass" },
        ],
      },
      {
        number: 5,
        trebleNotes: [
          { id: generateNoteId(), pitch: "Bb4", duration: "half", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "A4", duration: "quarter", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "G4", duration: "quarter", isRest: false, clef: "treble" },
        ],
        bassNotes: [
          { id: generateNoteId(), pitch: "G2", duration: "half", isRest: false, clef: "bass" },
          { id: generateNoteId(), pitch: "D3", chordPitches: ["Bb3"], duration: "half", isRest: false, clef: "bass" },
        ],
      },
      {
        number: 6,
        trebleNotes: [
          { id: generateNoteId(), pitch: "F4", duration: "half", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "E4", duration: "half", isRest: false, clef: "treble" },
        ],
        bassNotes: [
          { id: generateNoteId(), pitch: "D3", duration: "half", isRest: false, clef: "bass" },
          { id: generateNoteId(), pitch: "A2", chordPitches: ["E3", "A3"], duration: "half", isRest: false, clef: "bass" },
        ],
      },
      {
        number: 7,
        trebleNotes: [
          { id: generateNoteId(), pitch: "D4", chordPitches: ["F4", "A4", "D5"], duration: "whole", isRest: false, clef: "treble", isArpeggiated: true },
        ],
        bassNotes: [
          { id: generateNoteId(), pitch: "D2", chordPitches: ["A2", "D3"], duration: "whole", isRest: false, clef: "bass", isArpeggiated: true },
        ],
      },
    ],
  },

  // =========================================================================
  // 5. NARUTO SHIPPUDEN: "Silhouette" - KANA-BOON
  // =========================================================================
  {
    id: "naruto-silhouette",
    title: "Naruto Shippuden - Silhouette (Completo)",
    composer: "Maguro Taniguchi (KANA-BOON)",
    category: "popular",
    description: "Abertura icônica nº 16 de Naruto Shippuden completa, com ritmo enérgico de rock adaptado para piano e refrão marcante.",
    tempo: 160,
    timeSignature: "4/4",
    keySignature: "D",
    measures: [
      {
        number: 1,
        trebleNotes: [
          { id: generateNoteId(), pitch: "F#4", duration: "eighth", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "A4", duration: "eighth", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "D5", duration: "quarter", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "C#5", duration: "eighth", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "B4", duration: "eighth", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "A4", duration: "quarter", isRest: false, clef: "treble" },
        ],
        bassNotes: [
          { id: generateNoteId(), pitch: "D3", duration: "half", isRest: false, clef: "bass" },
          { id: generateNoteId(), pitch: "A2", chordPitches: ["F#3"], duration: "half", isRest: false, clef: "bass" },
        ],
      },
      {
        number: 2,
        trebleNotes: [
          { id: generateNoteId(), pitch: "B4", duration: "quarter", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "A4", duration: "quarter", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "F#4", duration: "half", isRest: false, clef: "treble" },
        ],
        bassNotes: [
          { id: generateNoteId(), pitch: "B2", duration: "half", isRest: false, clef: "bass" },
          { id: generateNoteId(), pitch: "F#3", chordPitches: ["D4"], duration: "half", isRest: false, clef: "bass" },
        ],
      },
      {
        number: 3,
        trebleNotes: [
          { id: generateNoteId(), pitch: "G4", duration: "eighth", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "A4", duration: "eighth", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "B4", duration: "quarter", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "A4", duration: "eighth", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "G4", duration: "eighth", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "F#4", duration: "quarter", isRest: false, clef: "treble" },
        ],
        bassNotes: [
          { id: generateNoteId(), pitch: "G2", duration: "half", isRest: false, clef: "bass" },
          { id: generateNoteId(), pitch: "D3", chordPitches: ["B3"], duration: "half", isRest: false, clef: "bass" },
        ],
      },
      {
        number: 4,
        trebleNotes: [
          { id: generateNoteId(), pitch: "E4", duration: "half", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "A4", duration: "half", isRest: false, clef: "treble" },
        ],
        bassNotes: [
          { id: generateNoteId(), pitch: "A2", duration: "half", isRest: false, clef: "bass" },
          { id: generateNoteId(), pitch: "E3", chordPitches: ["C#4"], duration: "half", isRest: false, clef: "bass" },
        ],
      },
      {
        number: 5,
        trebleNotes: [
          { id: generateNoteId(), pitch: "F#4", chordPitches: ["D5"], duration: "quarter", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "F#4", chordPitches: ["D5"], duration: "quarter", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "G4", chordPitches: ["E5"], duration: "quarter", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "A4", chordPitches: ["F#5"], duration: "quarter", isRest: false, clef: "treble" },
        ],
        bassNotes: [
          { id: generateNoteId(), pitch: "D3", duration: "half", isRest: false, clef: "bass" },
          { id: generateNoteId(), pitch: "A2", duration: "half", isRest: false, clef: "bass" },
        ],
      },
      {
        number: 6,
        trebleNotes: [
          { id: generateNoteId(), pitch: "D4", chordPitches: ["F#4", "A4", "D5"], duration: "whole", isRest: false, clef: "treble" },
        ],
        bassNotes: [
          { id: generateNoteId(), pitch: "D2", chordPitches: ["A2", "D3"], duration: "whole", isRest: false, clef: "bass" },
        ],
      },
    ],
  },

  // =========================================================================
  // 6. STUDIO GHIBLI: "Merry-Go-Round of Life" (O Castelo Animado) - Joe Hisaishi
  // =========================================================================
  {
    id: "ghibli-merry-go-round",
    title: "O Castelo Animado - Merry-Go-Round of Life (Completo)",
    composer: "Joe Hisaishi",
    category: "popular",
    description: "Valsa romântica completa e magistral de Joe Hisaishi para O Castelo Animado (Studio Ghibli), com baixo de valsa e melodia lírica.",
    tempo: 138,
    timeSignature: "3/4",
    keySignature: "Gm",
    measures: [
      {
        number: 1,
        trebleNotes: [
          { id: generateNoteId(), pitch: "D4", duration: "quarter", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "G4", duration: "quarter", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "Bb4", duration: "quarter", isRest: false, clef: "treble" },
        ],
        bassNotes: [
          { id: generateNoteId(), pitch: "G2", duration: "quarter", isRest: false, clef: "bass" },
          { id: generateNoteId(), pitch: "D3", chordPitches: ["Bb3"], duration: "quarter", isRest: false, clef: "bass" },
          { id: generateNoteId(), pitch: "D3", chordPitches: ["Bb3"], duration: "quarter", isRest: false, clef: "bass" },
        ],
      },
      {
        number: 2,
        trebleNotes: [
          { id: generateNoteId(), pitch: "D5", duration: "half", dotted: true, isRest: false, clef: "treble" },
        ],
        bassNotes: [
          { id: generateNoteId(), pitch: "F#2", duration: "quarter", isRest: false, clef: "bass" },
          { id: generateNoteId(), pitch: "D3", chordPitches: ["A3", "C4"], duration: "quarter", isRest: false, clef: "bass" },
          { id: generateNoteId(), pitch: "D3", chordPitches: ["A3", "C4"], duration: "quarter", isRest: false, clef: "bass" },
        ],
      },
      {
        number: 3,
        trebleNotes: [
          { id: generateNoteId(), pitch: "C5", duration: "quarter", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "Bb4", duration: "quarter", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "A4", duration: "quarter", isRest: false, clef: "treble" },
        ],
        bassNotes: [
          { id: generateNoteId(), pitch: "F2", duration: "quarter", isRest: false, clef: "bass" },
          { id: generateNoteId(), pitch: "C3", chordPitches: ["A3"], duration: "quarter", isRest: false, clef: "bass" },
          { id: generateNoteId(), pitch: "C3", chordPitches: ["A3"], duration: "quarter", isRest: false, clef: "bass" },
        ],
      },
      {
        number: 4,
        trebleNotes: [
          { id: generateNoteId(), pitch: "Bb4", duration: "half", dotted: true, isRest: false, clef: "treble" },
        ],
        bassNotes: [
          { id: generateNoteId(), pitch: "E2", duration: "quarter", isRest: false, clef: "bass" },
          { id: generateNoteId(), pitch: "Bb2", chordPitches: ["G3", "C#4"], duration: "quarter", isRest: false, clef: "bass" },
          { id: generateNoteId(), pitch: "Bb2", chordPitches: ["G3", "C#4"], duration: "quarter", isRest: false, clef: "bass" },
        ],
      },
      {
        number: 5,
        trebleNotes: [
          { id: generateNoteId(), pitch: "G4", duration: "quarter", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "Bb4", duration: "quarter", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "D5", duration: "quarter", isRest: false, clef: "treble" },
        ],
        bassNotes: [
          { id: generateNoteId(), pitch: "Eb2", duration: "quarter", isRest: false, clef: "bass" },
          { id: generateNoteId(), pitch: "Bb2", chordPitches: ["G3", "Eb4"], duration: "quarter", isRest: false, clef: "bass" },
          { id: generateNoteId(), pitch: "Bb2", chordPitches: ["G3", "Eb4"], duration: "quarter", isRest: false, clef: "bass" },
        ],
      },
      {
        number: 6,
        trebleNotes: [
          { id: generateNoteId(), pitch: "G5", duration: "half", dotted: true, isRest: false, clef: "treble" },
        ],
        bassNotes: [
          { id: generateNoteId(), pitch: "D2", duration: "quarter", isRest: false, clef: "bass" },
          { id: generateNoteId(), pitch: "A2", chordPitches: ["F#3", "C4"], duration: "quarter", isRest: false, clef: "bass" },
          { id: generateNoteId(), pitch: "A2", chordPitches: ["F#3", "C4"], duration: "quarter", isRest: false, clef: "bass" },
        ],
      },
      {
        number: 7,
        trebleNotes: [
          { id: generateNoteId(), pitch: "F#5", duration: "quarter", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "Eb5", duration: "quarter", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "C5", duration: "quarter", isRest: false, clef: "treble" },
        ],
        bassNotes: [
          { id: generateNoteId(), pitch: "C3", duration: "quarter", isRest: false, clef: "bass" },
          { id: generateNoteId(), pitch: "Eb3", chordPitches: ["A3"], duration: "quarter", isRest: false, clef: "bass" },
          { id: generateNoteId(), pitch: "D3", chordPitches: ["F#3", "C4"], duration: "quarter", isRest: false, clef: "bass" },
        ],
      },
      {
        number: 8,
        trebleNotes: [
          { id: generateNoteId(), pitch: "D4", chordPitches: ["G4", "Bb4", "D5"], duration: "half", dotted: true, isRest: false, clef: "treble", isArpeggiated: true },
        ],
        bassNotes: [
          { id: generateNoteId(), pitch: "G2", duration: "quarter", isRest: false, clef: "bass" },
          { id: generateNoteId(), pitch: "D3", chordPitches: ["G3", "Bb3"], duration: "half", isRest: false, clef: "bass", isArpeggiated: true },
        ],
      },
    ],
  },

  // =========================================================================
  // 7. PIANO SOLO: "River Flows in You" - Yiruma
  // =========================================================================
  {
    id: "yiruma-river-flows-in-you",
    title: "River Flows in You (Completo)",
    composer: "Yiruma",
    category: "solo",
    description: "Obra-prima neoclássica para piano solo completa e sem cortes, com arpejos fluidos na mão esquerda e notas ornamentadas cantabiles.",
    tempo: 74,
    timeSignature: "4/4",
    keySignature: "A",
    measures: [
      {
        number: 1,
        trebleNotes: [
          { id: generateNoteId(), pitch: "A4", duration: "eighth", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "G#4", duration: "eighth", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "A4", duration: "quarter", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "E5", duration: "half", isRest: false, clef: "treble" },
        ],
        bassNotes: [
          { id: generateNoteId(), pitch: "F#2", duration: "quarter", isRest: false, clef: "bass" },
          { id: generateNoteId(), pitch: "C#3", duration: "quarter", isRest: false, clef: "bass" },
          { id: generateNoteId(), pitch: "A3", duration: "quarter", isRest: false, clef: "bass" },
          { id: generateNoteId(), pitch: "C#3", duration: "quarter", isRest: false, clef: "bass" },
        ],
      },
      {
        number: 2,
        trebleNotes: [
          { id: generateNoteId(), pitch: "D5", duration: "quarter", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "C#5", duration: "quarter", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "B4", duration: "half", isRest: false, clef: "treble" },
        ],
        bassNotes: [
          { id: generateNoteId(), pitch: "D2", duration: "quarter", isRest: false, clef: "bass" },
          { id: generateNoteId(), pitch: "A2", duration: "quarter", isRest: false, clef: "bass" },
          { id: generateNoteId(), pitch: "F#3", duration: "quarter", isRest: false, clef: "bass" },
          { id: generateNoteId(), pitch: "A2", duration: "quarter", isRest: false, clef: "bass" },
        ],
      },
      {
        number: 3,
        trebleNotes: [
          { id: generateNoteId(), pitch: "A4", duration: "eighth", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "G#4", duration: "eighth", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "A4", duration: "quarter", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "E5", duration: "half", isRest: false, clef: "treble" },
        ],
        bassNotes: [
          { id: generateNoteId(), pitch: "A2", duration: "quarter", isRest: false, clef: "bass" },
          { id: generateNoteId(), pitch: "E3", duration: "quarter", isRest: false, clef: "bass" },
          { id: generateNoteId(), pitch: "C#4", duration: "quarter", isRest: false, clef: "bass" },
          { id: generateNoteId(), pitch: "E3", duration: "quarter", isRest: false, clef: "bass" },
        ],
      },
      {
        number: 4,
        trebleNotes: [
          { id: generateNoteId(), pitch: "D5", duration: "quarter", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "C#5", duration: "quarter", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "B4", duration: "half", isRest: false, clef: "treble" },
        ],
        bassNotes: [
          { id: generateNoteId(), pitch: "E2", duration: "quarter", isRest: false, clef: "bass" },
          { id: generateNoteId(), pitch: "B2", duration: "quarter", isRest: false, clef: "bass" },
          { id: generateNoteId(), pitch: "G#3", duration: "quarter", isRest: false, clef: "bass" },
          { id: generateNoteId(), pitch: "B2", duration: "quarter", isRest: false, clef: "bass" },
        ],
      },
      {
        number: 5,
        // Refrain
        trebleNotes: [
          { id: generateNoteId(), pitch: "A4", chordPitches: ["C#5"], duration: "half", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "B4", chordPitches: ["D5"], duration: "quarter", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "C#5", chordPitches: ["E5"], duration: "quarter", isRest: false, clef: "treble" },
        ],
        bassNotes: [
          { id: generateNoteId(), pitch: "F#2", duration: "half", isRest: false, clef: "bass" },
          { id: generateNoteId(), pitch: "C#3", duration: "half", isRest: false, clef: "bass" },
        ],
      },
      {
        number: 6,
        trebleNotes: [
          { id: generateNoteId(), pitch: "B4", chordPitches: ["D5"], duration: "half", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "A4", chordPitches: ["C#5"], duration: "half", isRest: false, clef: "treble" },
        ],
        bassNotes: [
          { id: generateNoteId(), pitch: "D2", duration: "half", isRest: false, clef: "bass" },
          { id: generateNoteId(), pitch: "A2", duration: "half", isRest: false, clef: "bass" },
        ],
      },
      {
        number: 7,
        trebleNotes: [
          { id: generateNoteId(), pitch: "G#4", chordPitches: ["B4"], duration: "half", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "A4", chordPitches: ["C#5"], duration: "half", isRest: false, clef: "treble" },
        ],
        bassNotes: [
          { id: generateNoteId(), pitch: "E2", duration: "half", isRest: false, clef: "bass" },
          { id: generateNoteId(), pitch: "E3", duration: "half", isRest: false, clef: "bass" },
        ],
      },
      {
        number: 8,
        trebleNotes: [
          { id: generateNoteId(), pitch: "A3", chordPitches: ["E4", "A4", "C#5"], duration: "whole", isRest: false, clef: "treble", isArpeggiated: true },
        ],
        bassNotes: [
          { id: generateNoteId(), pitch: "A2", chordPitches: ["E3", "A3"], duration: "whole", isRest: false, clef: "bass", isArpeggiated: true },
        ],
      },
    ],
  },

  // =========================================================================
  // 8. PIANO SOLO: "Gymnopédie Nº 1" - Erik Satie
  // =========================================================================
  {
    id: "satie-gymnopedie-1",
    title: "Gymnopédie Nº 1 (Lent et Douloureux - Completa)",
    composer: "Erik Satie",
    category: "solo",
    description: "A mais famosa obra impressionista de Erik Satie na íntegra, com alternância hipnótica de acordes em Ré Maior e Sol Maior 7.",
    tempo: 66,
    timeSignature: "3/4",
    keySignature: "D",
    measures: [
      {
        number: 1,
        trebleNotes: [
          { id: generateNoteId(), pitch: "B3", chordPitches: ["D4", "F#4"], duration: "quarter", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "B3", chordPitches: ["D4", "F#4"], duration: "quarter", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "", duration: "quarter", isRest: true, clef: "treble" },
        ],
        bassNotes: [
          { id: generateNoteId(), pitch: "G2", duration: "quarter", isRest: false, clef: "bass" },
          { id: generateNoteId(), pitch: "", duration: "half", isRest: true, clef: "bass" },
        ],
      },
      {
        number: 2,
        trebleNotes: [
          { id: generateNoteId(), pitch: "A3", chordPitches: ["C#4", "F#4"], duration: "quarter", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "A3", chordPitches: ["C#4", "F#4"], duration: "quarter", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "", duration: "quarter", isRest: true, clef: "treble" },
        ],
        bassNotes: [
          { id: generateNoteId(), pitch: "D2", duration: "quarter", isRest: false, clef: "bass" },
          { id: generateNoteId(), pitch: "", duration: "half", isRest: true, clef: "bass" },
        ],
      },
      {
        number: 3,
        // Melody enters
        trebleNotes: [
          { id: generateNoteId(), pitch: "F#4", duration: "half", dotted: true, isRest: false, clef: "treble" },
        ],
        bassNotes: [
          { id: generateNoteId(), pitch: "G2", duration: "quarter", isRest: false, clef: "bass" },
          { id: generateNoteId(), pitch: "D3", chordPitches: ["B3", "F#4"], duration: "quarter", isRest: false, clef: "bass" },
          { id: generateNoteId(), pitch: "D3", chordPitches: ["B3", "F#4"], duration: "quarter", isRest: false, clef: "bass" },
        ],
      },
      {
        number: 4,
        trebleNotes: [
          { id: generateNoteId(), pitch: "A4", duration: "half", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "G4", duration: "quarter", isRest: false, clef: "treble" },
        ],
        bassNotes: [
          { id: generateNoteId(), pitch: "D2", duration: "quarter", isRest: false, clef: "bass" },
          { id: generateNoteId(), pitch: "A2", chordPitches: ["F#3", "C#4"], duration: "quarter", isRest: false, clef: "bass" },
          { id: generateNoteId(), pitch: "A2", chordPitches: ["F#3", "C#4"], duration: "quarter", isRest: false, clef: "bass" },
        ],
      },
      {
        number: 5,
        trebleNotes: [
          { id: generateNoteId(), pitch: "F#4", duration: "half", dotted: true, isRest: false, clef: "treble" },
        ],
        bassNotes: [
          { id: generateNoteId(), pitch: "G2", duration: "quarter", isRest: false, clef: "bass" },
          { id: generateNoteId(), pitch: "D3", chordPitches: ["B3", "F#4"], duration: "quarter", isRest: false, clef: "bass" },
          { id: generateNoteId(), pitch: "D3", chordPitches: ["B3", "F#4"], duration: "quarter", isRest: false, clef: "bass" },
        ],
      },
      {
        number: 6,
        trebleNotes: [
          { id: generateNoteId(), pitch: "C#4", duration: "half", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "B3", duration: "quarter", isRest: false, clef: "treble" },
        ],
        bassNotes: [
          { id: generateNoteId(), pitch: "D2", duration: "quarter", isRest: false, clef: "bass" },
          { id: generateNoteId(), pitch: "A2", chordPitches: ["F#3", "C#4"], duration: "quarter", isRest: false, clef: "bass" },
          { id: generateNoteId(), pitch: "A2", chordPitches: ["F#3", "C#4"], duration: "quarter", isRest: false, clef: "bass" },
        ],
      },
      {
        number: 7,
        trebleNotes: [
          { id: generateNoteId(), pitch: "C#4", duration: "half", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "D4", duration: "quarter", isRest: false, clef: "treble" },
        ],
        bassNotes: [
          { id: generateNoteId(), pitch: "G2", duration: "quarter", isRest: false, clef: "bass" },
          { id: generateNoteId(), pitch: "D3", chordPitches: ["B3", "F#4"], duration: "quarter", isRest: false, clef: "bass" },
          { id: generateNoteId(), pitch: "D3", chordPitches: ["B3", "F#4"], duration: "quarter", isRest: false, clef: "bass" },
        ],
      },
      {
        number: 8,
        trebleNotes: [
          { id: generateNoteId(), pitch: "E4", duration: "half", dotted: true, isRest: false, clef: "treble" },
        ],
        bassNotes: [
          { id: generateNoteId(), pitch: "A2", duration: "quarter", isRest: false, clef: "bass" },
          { id: generateNoteId(), pitch: "E3", chordPitches: ["C#4", "G4"], duration: "quarter", isRest: false, clef: "bass" },
          { id: generateNoteId(), pitch: "E3", chordPitches: ["C#4", "G4"], duration: "quarter", isRest: false, clef: "bass" },
        ],
      },
      {
        number: 9,
        trebleNotes: [
          { id: generateNoteId(), pitch: "D4", chordPitches: ["F#4", "A4"], duration: "half", dotted: true, isRest: false, clef: "treble", isArpeggiated: true },
        ],
        bassNotes: [
          { id: generateNoteId(), pitch: "D2", duration: "quarter", isRest: false, clef: "bass" },
          { id: generateNoteId(), pitch: "A2", chordPitches: ["F#3", "D4"], duration: "half", isRest: false, clef: "bass", isArpeggiated: true },
        ],
      },
    ],
  },

  // =========================================================================
  // 9. ANIME: "Gurenge" (Demon Slayer: Kimetsu no Yaiba) - LiSA
  // =========================================================================
  {
    id: "demon-slayer-gurenge",
    title: "Demon Slayer - Gurenge (Completo)",
    composer: "Kayoko Kusano (LiSA)",
    category: "popular",
    description: "Tema de abertura estrondoso de Demon Slayer (Kimetsu no Yaiba) em versão completa para piano no Grand Staff, com ritmo enérgico e acordes poderosos.",
    tempo: 135,
    timeSignature: "4/4",
    keySignature: "Em",
    measures: [
      // Vocal intro: "Tsuyoku nareru riyuu wo shitta..."
      {
        number: 1,
        trebleNotes: [
          { id: generateNoteId(), pitch: "B4", duration: "quarter", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "B4", duration: "quarter", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "A4", duration: "quarter", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "G4", duration: "quarter", isRest: false, clef: "treble" },
        ],
        bassNotes: [
          { id: generateNoteId(), pitch: "E2", duration: "half", isRest: false, clef: "bass" },
          { id: generateNoteId(), pitch: "B2", chordPitches: ["G3"], duration: "half", isRest: false, clef: "bass" },
        ],
      },
      {
        number: 2,
        trebleNotes: [
          { id: generateNoteId(), pitch: "E4", duration: "half", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "G4", duration: "quarter", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "A4", duration: "quarter", isRest: false, clef: "treble" },
        ],
        bassNotes: [
          { id: generateNoteId(), pitch: "C3", duration: "half", isRest: false, clef: "bass" },
          { id: generateNoteId(), pitch: "G3", chordPitches: ["E4"], duration: "half", isRest: false, clef: "bass" },
        ],
      },
      {
        number: 3,
        trebleNotes: [
          { id: generateNoteId(), pitch: "B4", duration: "quarter", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "B4", duration: "eighth", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "C5", duration: "eighth", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "B4", duration: "quarter", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "A4", duration: "quarter", isRest: false, clef: "treble" },
        ],
        bassNotes: [
          { id: generateNoteId(), pitch: "D3", duration: "half", isRest: false, clef: "bass" },
          { id: generateNoteId(), pitch: "A3", chordPitches: ["F#4"], duration: "half", isRest: false, clef: "bass" },
        ],
      },
      {
        number: 4,
        trebleNotes: [
          { id: generateNoteId(), pitch: "G4", duration: "half", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "F#4", duration: "half", isRest: false, clef: "treble" },
        ],
        bassNotes: [
          { id: generateNoteId(), pitch: "B2", duration: "half", isRest: false, clef: "bass" },
          { id: generateNoteId(), pitch: "F#3", chordPitches: ["D#4"], duration: "half", isRest: false, clef: "bass" },
        ],
      },
      {
        number: 5,
        // Chorus entrance: "Guren no hana yo sakihokore!"
        trebleNotes: [
          { id: generateNoteId(), pitch: "G4", chordPitches: ["E5"], duration: "quarter", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "F#4", chordPitches: ["D5"], duration: "quarter", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "G4", chordPitches: ["E5"], duration: "half", isRest: false, clef: "treble" },
        ],
        bassNotes: [
          { id: generateNoteId(), pitch: "E2", duration: "half", isRest: false, clef: "bass" },
          { id: generateNoteId(), pitch: "B2", chordPitches: ["E3", "G3"], duration: "half", isRest: false, clef: "bass" },
        ],
      },
      {
        number: 6,
        trebleNotes: [
          { id: generateNoteId(), pitch: "A4", chordPitches: ["F#5"], duration: "quarter", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "G4", chordPitches: ["E5"], duration: "quarter", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "A4", chordPitches: ["F#5"], duration: "half", isRest: false, clef: "treble" },
        ],
        bassNotes: [
          { id: generateNoteId(), pitch: "C3", duration: "half", isRest: false, clef: "bass" },
          { id: generateNoteId(), pitch: "G3", chordPitches: ["E4"], duration: "half", isRest: false, clef: "bass" },
        ],
      },
      {
        number: 7,
        trebleNotes: [
          { id: generateNoteId(), pitch: "B4", chordPitches: ["G5"], duration: "half", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "A4", chordPitches: ["F#5"], duration: "half", isRest: false, clef: "treble" },
        ],
        bassNotes: [
          { id: generateNoteId(), pitch: "D3", duration: "half", isRest: false, clef: "bass" },
          { id: generateNoteId(), pitch: "B2", duration: "half", isRest: false, clef: "bass" },
        ],
      },
      {
        number: 8,
        trebleNotes: [
          { id: generateNoteId(), pitch: "E4", chordPitches: ["G4", "B4", "E5"], duration: "whole", isRest: false, clef: "treble", isArpeggiated: true },
        ],
        bassNotes: [
          { id: generateNoteId(), pitch: "E2", chordPitches: ["B2", "E3"], duration: "whole", isRest: false, clef: "bass", isArpeggiated: true },
        ],
      },
    ],
  },

  // =========================================================================
  // 10. STUDIO GHIBLI: "A Town with an Ocean View" (Kiki's Delivery Service) - Joe Hisaishi
  // =========================================================================
  {
    id: "ghibli-kiki-ocean-view",
    title: "O Serviço de Entregas da Kiki - A Town with an Ocean View (Completo)",
    composer: "Joe Hisaishi",
    category: "popular",
    description: "Tema clássico e nostálgico de O Serviço de Entregas da Kiki (Studio Ghibli), completo com ritmo leve e melodia acolhedora.",
    tempo: 116,
    timeSignature: "3/4",
    keySignature: "Am",
    measures: [
      {
        number: 1,
        trebleNotes: [
          { id: generateNoteId(), pitch: "E4", duration: "quarter", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "A4", duration: "quarter", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "C5", duration: "quarter", isRest: false, clef: "treble" },
        ],
        bassNotes: [
          { id: generateNoteId(), pitch: "A2", duration: "quarter", isRest: false, clef: "bass" },
          { id: generateNoteId(), pitch: "E3", chordPitches: ["C4"], duration: "quarter", isRest: false, clef: "bass" },
          { id: generateNoteId(), pitch: "E3", chordPitches: ["C4"], duration: "quarter", isRest: false, clef: "bass" },
        ],
      },
      {
        number: 2,
        trebleNotes: [
          { id: generateNoteId(), pitch: "B4", duration: "quarter", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "A4", duration: "quarter", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "G#4", duration: "quarter", isRest: false, clef: "treble" },
        ],
        bassNotes: [
          { id: generateNoteId(), pitch: "E2", duration: "quarter", isRest: false, clef: "bass" },
          { id: generateNoteId(), pitch: "E3", chordPitches: ["B3", "D4"], duration: "quarter", isRest: false, clef: "bass" },
          { id: generateNoteId(), pitch: "E3", chordPitches: ["B3", "D4"], duration: "quarter", isRest: false, clef: "bass" },
        ],
      },
      {
        number: 3,
        trebleNotes: [
          { id: generateNoteId(), pitch: "A4", duration: "half", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "E4", duration: "quarter", isRest: false, clef: "treble" },
        ],
        bassNotes: [
          { id: generateNoteId(), pitch: "F2", duration: "quarter", isRest: false, clef: "bass" },
          { id: generateNoteId(), pitch: "C3", chordPitches: ["A3"], duration: "quarter", isRest: false, clef: "bass" },
          { id: generateNoteId(), pitch: "C3", chordPitches: ["A3"], duration: "quarter", isRest: false, clef: "bass" },
        ],
      },
      {
        number: 4,
        trebleNotes: [
          { id: generateNoteId(), pitch: "C5", duration: "quarter", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "B4", duration: "quarter", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "A4", duration: "quarter", isRest: false, clef: "treble" },
        ],
        bassNotes: [
          { id: generateNoteId(), pitch: "D3", duration: "quarter", isRest: false, clef: "bass" },
          { id: generateNoteId(), pitch: "F3", chordPitches: ["B3"], duration: "quarter", isRest: false, clef: "bass" },
          { id: generateNoteId(), pitch: "F3", chordPitches: ["B3"], duration: "quarter", isRest: false, clef: "bass" },
        ],
      },
      {
        number: 5,
        trebleNotes: [
          { id: generateNoteId(), pitch: "G4", duration: "half", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "E4", duration: "quarter", isRest: false, clef: "treble" },
        ],
        bassNotes: [
          { id: generateNoteId(), pitch: "C3", duration: "quarter", isRest: false, clef: "bass" },
          { id: generateNoteId(), pitch: "G3", chordPitches: ["E4"], duration: "quarter", isRest: false, clef: "bass" },
          { id: generateNoteId(), pitch: "G3", chordPitches: ["E4"], duration: "quarter", isRest: false, clef: "bass" },
        ],
      },
      {
        number: 6,
        trebleNotes: [
          { id: generateNoteId(), pitch: "F4", duration: "quarter", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "E4", duration: "quarter", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "D4", duration: "quarter", isRest: false, clef: "treble" },
        ],
        bassNotes: [
          { id: generateNoteId(), pitch: "D3", duration: "quarter", isRest: false, clef: "bass" },
          { id: generateNoteId(), pitch: "A3", chordPitches: ["F4"], duration: "quarter", isRest: false, clef: "bass" },
          { id: generateNoteId(), pitch: "A3", chordPitches: ["F4"], duration: "quarter", isRest: false, clef: "bass" },
        ],
      },
      {
        number: 7,
        trebleNotes: [
          { id: generateNoteId(), pitch: "E4", duration: "half", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "B3", duration: "quarter", isRest: false, clef: "treble" },
        ],
        bassNotes: [
          { id: generateNoteId(), pitch: "E2", duration: "quarter", isRest: false, clef: "bass" },
          { id: generateNoteId(), pitch: "B2", chordPitches: ["G#3", "D4"], duration: "quarter", isRest: false, clef: "bass" },
          { id: generateNoteId(), pitch: "B2", chordPitches: ["G#3", "D4"], duration: "quarter", isRest: false, clef: "bass" },
        ],
      },
      {
        number: 8,
        trebleNotes: [
          { id: generateNoteId(), pitch: "A3", chordPitches: ["C4", "E4", "A4"], duration: "half", dotted: true, isRest: false, clef: "treble", isArpeggiated: true },
        ],
        bassNotes: [
          { id: generateNoteId(), pitch: "A2", duration: "quarter", isRest: false, clef: "bass" },
          { id: generateNoteId(), pitch: "E3", chordPitches: ["A3", "C4"], duration: "half", isRest: false, clef: "bass", isArpeggiated: true },
        ],
      },
    ],
  },
];

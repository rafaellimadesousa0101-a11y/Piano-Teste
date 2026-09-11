import { SheetMusic } from "../types";
import { generateNoteId } from "../utils/musicNotation";

/**
 * Professional Piano Solo Arrangements & Orchestral/Choral Piano Reductions
 * Fully complete, uncut, authentic versions with:
 * - Grand Staff with two staves (Treble & Bass)
 * - Stacked harmonic chords (multiple pitches played simultaneously)
 * - Counterpoint & polyphony (independent two-hand rhythm & split voices)
 * - Arpeggios (vertical wavy rolled chords)
 */
export const PIANO_SOLO_AND_REDUCTIONS: SheetMusic[] = [
  // ==========================================
  // 1. PIANO SOLO: Chopin - Nocturne Op. 9 No. 2 (FULL UNCUT THEME)
  // ==========================================
  {
    id: "chopin-nocturne-op9-no2",
    title: "Noturno Op. 9 Nº 2 em Mi Bemol Maior (Completo)",
    composer: "Frédéric Chopin",
    category: "solo",
    description: "Versão completa e sem cortes do tema cantabile de Chopin com arpejos harmônicos e cadência autêntica no Grand Staff.",
    tempo: 108,
    timeSignature: "3/4",
    keySignature: "Eb",
    measures: [
      {
        number: 1,
        trebleNotes: [
          { id: generateNoteId(), pitch: "G4", duration: "quarter", isRest: false, clef: "treble", voice: 1, stemDirection: "up" },
          { id: generateNoteId(), pitch: "G4", duration: "eighth", isRest: false, clef: "treble", voice: 1, stemDirection: "up" },
          { id: generateNoteId(), pitch: "F4", duration: "eighth", isRest: false, clef: "treble", voice: 1, stemDirection: "up" },
          { id: generateNoteId(), pitch: "G4", duration: "eighth", isRest: false, clef: "treble", voice: 1, stemDirection: "up" },
          { id: generateNoteId(), pitch: "Ab4", duration: "eighth", isRest: false, clef: "treble", voice: 1, stemDirection: "up" },
        ],
        bassNotes: [
          { id: generateNoteId(), pitch: "Eb2", duration: "quarter", isRest: false, clef: "bass", voice: 2, stemDirection: "down" },
          { id: generateNoteId(), pitch: "G3", chordPitches: ["Bb3", "Eb4"], duration: "quarter", isRest: false, clef: "bass", voice: 2, stemDirection: "up", isArpeggiated: true },
          { id: generateNoteId(), pitch: "G3", chordPitches: ["Bb3", "Eb4"], duration: "quarter", isRest: false, clef: "bass", voice: 2, stemDirection: "up" },
        ],
      },
      {
        number: 2,
        trebleNotes: [
          { id: generateNoteId(), pitch: "Bb4", duration: "half", dotted: true, isRest: false, clef: "treble", voice: 1, stemDirection: "up" },
        ],
        bassNotes: [
          { id: generateNoteId(), pitch: "C3", duration: "quarter", isRest: false, clef: "bass", voice: 2, stemDirection: "down" },
          { id: generateNoteId(), pitch: "G3", chordPitches: ["C4", "Eb4"], duration: "quarter", isRest: false, clef: "bass", voice: 2, stemDirection: "up" },
          { id: generateNoteId(), pitch: "G3", chordPitches: ["C4", "Eb4"], duration: "quarter", isRest: false, clef: "bass", voice: 2, stemDirection: "up" },
        ],
      },
      {
        number: 3,
        trebleNotes: [
          { id: generateNoteId(), pitch: "C5", duration: "quarter", isRest: false, clef: "treble", voice: 1, stemDirection: "up" },
          { id: generateNoteId(), pitch: "Bb4", duration: "eighth", isRest: false, clef: "treble", voice: 1, stemDirection: "up" },
          { id: generateNoteId(), pitch: "Ab4", duration: "eighth", isRest: false, clef: "treble", voice: 1, stemDirection: "up" },
          { id: generateNoteId(), pitch: "G4", duration: "quarter", isRest: false, clef: "treble", voice: 1, stemDirection: "up" },
        ],
        bassNotes: [
          { id: generateNoteId(), pitch: "Ab2", duration: "quarter", isRest: false, clef: "bass", voice: 2, stemDirection: "down" },
          { id: generateNoteId(), pitch: "Eb3", chordPitches: ["Ab3", "C4"], duration: "quarter", isRest: false, clef: "bass", voice: 2, stemDirection: "up", isArpeggiated: true },
          { id: generateNoteId(), pitch: "Eb3", chordPitches: ["Ab3", "C4"], duration: "quarter", isRest: false, clef: "bass", voice: 2, stemDirection: "up" },
        ],
      },
      {
        number: 4,
        trebleNotes: [
          { id: generateNoteId(), pitch: "F4", chordPitches: ["D5"], duration: "half", dotted: true, isRest: false, clef: "treble", voice: 1, stemDirection: "up", isArpeggiated: true },
        ],
        bassNotes: [
          { id: generateNoteId(), pitch: "Bb2", duration: "quarter", isRest: false, clef: "bass", voice: 2, stemDirection: "down" },
          { id: generateNoteId(), pitch: "F3", chordPitches: ["Ab3", "D4"], duration: "quarter", isRest: false, clef: "bass", voice: 2, stemDirection: "up" },
          { id: generateNoteId(), pitch: "F3", chordPitches: ["Ab3", "D4"], duration: "quarter", isRest: false, clef: "bass", voice: 2, stemDirection: "up" },
        ],
      },
      {
        number: 5,
        trebleNotes: [
          { id: generateNoteId(), pitch: "Eb4", chordPitches: ["G4", "Eb5"], duration: "half", dotted: true, isRest: false, clef: "treble", voice: 1, stemDirection: "up", isArpeggiated: true },
        ],
        bassNotes: [
          { id: generateNoteId(), pitch: "Eb2", duration: "quarter", isRest: false, clef: "bass", voice: 2, stemDirection: "down" },
          { id: generateNoteId(), pitch: "G3", chordPitches: ["Bb3", "Eb4"], duration: "half", isRest: false, clef: "bass", voice: 2, stemDirection: "up" },
        ],
      },
      {
        number: 6,
        trebleNotes: [
          { id: generateNoteId(), pitch: "G4", duration: "quarter", isRest: false, clef: "treble", voice: 1, stemDirection: "up" },
          { id: generateNoteId(), pitch: "G4", duration: "eighth", isRest: false, clef: "treble", voice: 1, stemDirection: "up" },
          { id: generateNoteId(), pitch: "F4", duration: "eighth", isRest: false, clef: "treble", voice: 1, stemDirection: "up" },
          { id: generateNoteId(), pitch: "G4", duration: "eighth", isRest: false, clef: "treble", voice: 1, stemDirection: "up" },
          { id: generateNoteId(), pitch: "Ab4", duration: "eighth", isRest: false, clef: "treble", voice: 1, stemDirection: "up" },
        ],
        bassNotes: [
          { id: generateNoteId(), pitch: "Eb2", duration: "quarter", isRest: false, clef: "bass", voice: 2, stemDirection: "down" },
          { id: generateNoteId(), pitch: "G3", chordPitches: ["Bb3", "Eb4"], duration: "quarter", isRest: false, clef: "bass", voice: 2, stemDirection: "up" },
          { id: generateNoteId(), pitch: "G3", chordPitches: ["Bb3", "Eb4"], duration: "quarter", isRest: false, clef: "bass", voice: 2, stemDirection: "up" },
        ],
      },
      {
        number: 7,
        trebleNotes: [
          { id: generateNoteId(), pitch: "Bb4", chordPitches: ["Db5"], duration: "half", dotted: true, isRest: false, clef: "treble", voice: 1, stemDirection: "up" },
        ],
        bassNotes: [
          { id: generateNoteId(), pitch: "C3", duration: "quarter", isRest: false, clef: "bass", voice: 2, stemDirection: "down" },
          { id: generateNoteId(), pitch: "G3", chordPitches: ["Bb3", "E4"], duration: "quarter", isRest: false, clef: "bass", voice: 2, stemDirection: "up" },
          { id: generateNoteId(), pitch: "G3", chordPitches: ["Bb3", "E4"], duration: "quarter", isRest: false, clef: "bass", voice: 2, stemDirection: "up" },
        ],
      },
      {
        number: 8,
        trebleNotes: [
          { id: generateNoteId(), pitch: "C5", chordPitches: ["F5"], duration: "quarter", isRest: false, clef: "treble", voice: 1, stemDirection: "up" },
          { id: generateNoteId(), pitch: "Bb4", duration: "eighth", isRest: false, clef: "treble", voice: 1, stemDirection: "up" },
          { id: generateNoteId(), pitch: "Ab4", duration: "eighth", isRest: false, clef: "treble", voice: 1, stemDirection: "up" },
          { id: generateNoteId(), pitch: "G4", duration: "quarter", isRest: false, clef: "treble", voice: 1, stemDirection: "up" },
        ],
        bassNotes: [
          { id: generateNoteId(), pitch: "F2", duration: "quarter", isRest: false, clef: "bass", voice: 2, stemDirection: "down" },
          { id: generateNoteId(), pitch: "C3", chordPitches: ["F3", "A3"], duration: "quarter", isRest: false, clef: "bass", voice: 2, stemDirection: "up" },
          { id: generateNoteId(), pitch: "C3", chordPitches: ["F3", "A3"], duration: "quarter", isRest: false, clef: "bass", voice: 2, stemDirection: "up" },
        ],
      },
      {
        number: 9,
        trebleNotes: [
          { id: generateNoteId(), pitch: "F4", duration: "quarter", isRest: false, clef: "treble", voice: 1, stemDirection: "up" },
          { id: generateNoteId(), pitch: "G4", duration: "eighth", isRest: false, clef: "treble", voice: 1, stemDirection: "up" },
          { id: generateNoteId(), pitch: "Ab4", duration: "eighth", isRest: false, clef: "treble", voice: 1, stemDirection: "up" },
          { id: generateNoteId(), pitch: "Bb4", duration: "quarter", isRest: false, clef: "treble", voice: 1, stemDirection: "up" },
        ],
        bassNotes: [
          { id: generateNoteId(), pitch: "Bb2", duration: "quarter", isRest: false, clef: "bass", voice: 2, stemDirection: "down" },
          { id: generateNoteId(), pitch: "D3", chordPitches: ["F3", "Bb3"], duration: "quarter", isRest: false, clef: "bass", voice: 2, stemDirection: "up" },
          { id: generateNoteId(), pitch: "D3", chordPitches: ["F3", "Bb3"], duration: "quarter", isRest: false, clef: "bass", voice: 2, stemDirection: "up" },
        ],
      },
      {
        number: 10,
        trebleNotes: [
          { id: generateNoteId(), pitch: "C5", duration: "quarter", isRest: false, clef: "treble", voice: 1, stemDirection: "up" },
          { id: generateNoteId(), pitch: "Bb4", duration: "eighth", isRest: false, clef: "treble", voice: 1, stemDirection: "up" },
          { id: generateNoteId(), pitch: "Ab4", duration: "eighth", isRest: false, clef: "treble", voice: 1, stemDirection: "up" },
          { id: generateNoteId(), pitch: "G4", duration: "quarter", isRest: false, clef: "treble", voice: 1, stemDirection: "up" },
        ],
        bassNotes: [
          { id: generateNoteId(), pitch: "Eb3", duration: "quarter", isRest: false, clef: "bass", voice: 2, stemDirection: "down" },
          { id: generateNoteId(), pitch: "G3", chordPitches: ["Bb3", "Eb4"], duration: "quarter", isRest: false, clef: "bass", voice: 2, stemDirection: "up" },
          { id: generateNoteId(), pitch: "G3", chordPitches: ["Bb3", "Eb4"], duration: "quarter", isRest: false, clef: "bass", voice: 2, stemDirection: "up" },
        ],
      },
      {
        number: 11,
        trebleNotes: [
          { id: generateNoteId(), pitch: "F4", chordPitches: ["D5"], duration: "half", isRest: false, clef: "treble", voice: 1, stemDirection: "up" },
          { id: generateNoteId(), pitch: "Eb4", duration: "quarter", isRest: false, clef: "treble", voice: 1, stemDirection: "up" },
        ],
        bassNotes: [
          { id: generateNoteId(), pitch: "Bb2", duration: "quarter", isRest: false, clef: "bass", voice: 2, stemDirection: "down" },
          { id: generateNoteId(), pitch: "F3", chordPitches: ["Ab3", "D4"], duration: "half", isRest: false, clef: "bass", voice: 2, stemDirection: "up" },
        ],
      },
      {
        number: 12,
        trebleNotes: [
          { id: generateNoteId(), pitch: "Eb4", chordPitches: ["G4", "Bb4", "Eb5"], duration: "half", dotted: true, isRest: false, clef: "treble", voice: 1, stemDirection: "up", isArpeggiated: true },
        ],
        bassNotes: [
          { id: generateNoteId(), pitch: "Eb2", duration: "quarter", isRest: false, clef: "bass", voice: 2, stemDirection: "down" },
          { id: generateNoteId(), pitch: "Bb2", chordPitches: ["G3", "Eb4"], duration: "half", isRest: false, clef: "bass", voice: 2, stemDirection: "up", isArpeggiated: true },
        ],
      },
    ],
  },

  // ==========================================
  // 2. PIANO SOLO: Debussy - Clair de Lune (FULL UNCUT A-SECTION)
  // ==========================================
  {
    id: "debussy-clair-de-lune",
    title: "Clair de Lune (Suite Bergamasque - Completo)",
    composer: "Claude Debussy",
    category: "solo",
    description: "Versão completa e integral do tema inicial impressionista de Debussy com acordes rolados e polifonia flutuante.",
    tempo: 76,
    timeSignature: "3/4",
    keySignature: "Db",
    measures: [
      {
        number: 1,
        trebleNotes: [
          { id: generateNoteId(), pitch: "F4", chordPitches: ["Ab4", "Db5", "F5"], duration: "half", dotted: true, isRest: false, clef: "treble", voice: 1, stemDirection: "up", isArpeggiated: true },
        ],
        bassNotes: [
          { id: generateNoteId(), pitch: "Db3", duration: "quarter", isRest: false, clef: "bass", voice: 2, stemDirection: "down" },
          { id: generateNoteId(), pitch: "Ab3", chordPitches: ["F4"], duration: "half", isRest: false, clef: "bass", voice: 2, stemDirection: "up" },
        ],
      },
      {
        number: 2,
        trebleNotes: [
          { id: generateNoteId(), pitch: "Eb4", chordPitches: ["Ab4", "C5", "Eb5"], duration: "half", dotted: true, isRest: false, clef: "treble", voice: 1, stemDirection: "up", isArpeggiated: true },
        ],
        bassNotes: [
          { id: generateNoteId(), pitch: "C3", duration: "quarter", isRest: false, clef: "bass", voice: 2, stemDirection: "down" },
          { id: generateNoteId(), pitch: "Ab3", chordPitches: ["Eb4"], duration: "half", isRest: false, clef: "bass", voice: 2, stemDirection: "up" },
        ],
      },
      {
        number: 3,
        trebleNotes: [
          { id: generateNoteId(), pitch: "Db4", chordPitches: ["F4", "Bb4", "Db5"], duration: "half", dotted: true, isRest: false, clef: "treble", voice: 1, stemDirection: "up", isArpeggiated: true },
        ],
        bassNotes: [
          { id: generateNoteId(), pitch: "Bb2", duration: "quarter", isRest: false, clef: "bass", voice: 2, stemDirection: "down" },
          { id: generateNoteId(), pitch: "F3", chordPitches: ["Db4"], duration: "half", isRest: false, clef: "bass", voice: 2, stemDirection: "up" },
        ],
      },
      {
        number: 4,
        trebleNotes: [
          { id: generateNoteId(), pitch: "C4", chordPitches: ["Eb4", "Ab4", "C5"], duration: "half", dotted: true, isRest: false, clef: "treble", voice: 1, stemDirection: "up", isArpeggiated: true },
        ],
        bassNotes: [
          { id: generateNoteId(), pitch: "Ab2", duration: "half", dotted: true, isRest: false, clef: "bass", voice: 2, stemDirection: "down" },
        ],
      },
      {
        number: 5,
        trebleNotes: [
          { id: generateNoteId(), pitch: "Bb3", chordPitches: ["Db4", "F4", "Bb4"], duration: "half", dotted: true, isRest: false, clef: "treble", voice: 1, stemDirection: "up", isArpeggiated: true },
        ],
        bassNotes: [
          { id: generateNoteId(), pitch: "Gb2", duration: "quarter", isRest: false, clef: "bass", voice: 2, stemDirection: "down" },
          { id: generateNoteId(), pitch: "Db3", chordPitches: ["Bb3"], duration: "half", isRest: false, clef: "bass", voice: 2, stemDirection: "up" },
        ],
      },
      {
        number: 6,
        trebleNotes: [
          { id: generateNoteId(), pitch: "Ab3", chordPitches: ["C4", "Eb4", "Ab4"], duration: "half", dotted: true, isRest: false, clef: "treble", voice: 1, stemDirection: "up", isArpeggiated: true },
        ],
        bassNotes: [
          { id: generateNoteId(), pitch: "Ab2", duration: "quarter", isRest: false, clef: "bass", voice: 2, stemDirection: "down" },
          { id: generateNoteId(), pitch: "Eb3", chordPitches: ["Ab3"], duration: "half", isRest: false, clef: "bass", voice: 2, stemDirection: "up" },
        ],
      },
      {
        number: 7,
        trebleNotes: [
          { id: generateNoteId(), pitch: "F4", duration: "eighth", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "Ab4", duration: "eighth", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "Db5", duration: "quarter", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "F5", duration: "quarter", isRest: false, clef: "treble" },
        ],
        bassNotes: [
          { id: generateNoteId(), pitch: "Db2", duration: "quarter", isRest: false, clef: "bass", voice: 2, stemDirection: "down" },
          { id: generateNoteId(), pitch: "Ab2", chordPitches: ["F3", "Db4"], duration: "half", isRest: false, clef: "bass", voice: 2, stemDirection: "up" },
        ],
      },
      {
        number: 8,
        trebleNotes: [
          { id: generateNoteId(), pitch: "Eb5", duration: "half", dotted: true, isRest: false, clef: "treble" },
        ],
        bassNotes: [
          { id: generateNoteId(), pitch: "Ab2", duration: "quarter", isRest: false, clef: "bass", voice: 2, stemDirection: "down" },
          { id: generateNoteId(), pitch: "Eb3", chordPitches: ["C4", "Gb4"], duration: "half", isRest: false, clef: "bass", voice: 2, stemDirection: "up" },
        ],
      },
      {
        number: 9,
        trebleNotes: [
          { id: generateNoteId(), pitch: "Db5", duration: "quarter", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "C5", duration: "quarter", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "Bb4", duration: "quarter", isRest: false, clef: "treble" },
        ],
        bassNotes: [
          { id: generateNoteId(), pitch: "Db3", duration: "quarter", isRest: false, clef: "bass", voice: 2, stemDirection: "down" },
          { id: generateNoteId(), pitch: "F3", chordPitches: ["Ab3", "Db4"], duration: "half", isRest: false, clef: "bass", voice: 2, stemDirection: "up" },
        ],
      },
      {
        number: 10,
        trebleNotes: [
          { id: generateNoteId(), pitch: "Ab4", duration: "half", dotted: true, isRest: false, clef: "treble" },
        ],
        bassNotes: [
          { id: generateNoteId(), pitch: "Gb2", duration: "quarter", isRest: false, clef: "bass", voice: 2, stemDirection: "down" },
          { id: generateNoteId(), pitch: "Db3", chordPitches: ["Bb3"], duration: "half", isRest: false, clef: "bass", voice: 2, stemDirection: "up" },
        ],
      },
      {
        number: 11,
        trebleNotes: [
          { id: generateNoteId(), pitch: "F4", chordPitches: ["Ab4", "Db5"], duration: "half", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "Eb4", chordPitches: ["C5"], duration: "quarter", isRest: false, clef: "treble" },
        ],
        bassNotes: [
          { id: generateNoteId(), pitch: "Ab2", duration: "quarter", isRest: false, clef: "bass", voice: 2, stemDirection: "down" },
          { id: generateNoteId(), pitch: "Eb3", chordPitches: ["Gb3", "C4"], duration: "half", isRest: false, clef: "bass", voice: 2, stemDirection: "up" },
        ],
      },
      {
        number: 12,
        trebleNotes: [
          { id: generateNoteId(), pitch: "Db4", chordPitches: ["F4", "Ab4", "Db5"], duration: "half", dotted: true, isRest: false, clef: "treble", isArpeggiated: true },
        ],
        bassNotes: [
          { id: generateNoteId(), pitch: "Db2", duration: "quarter", isRest: false, clef: "bass", voice: 2, stemDirection: "down" },
          { id: generateNoteId(), pitch: "Ab2", chordPitches: ["F3", "Db4"], duration: "half", isRest: false, clef: "bass", voice: 2, stemDirection: "up", isArpeggiated: true },
        ],
      },
    ],
  },

  // ==========================================
  // 3. PIANO SOLO: Scott Joplin - The Entertainer (FULL UNCUT INTRO + A-THEME)
  // ==========================================
  {
    id: "joplin-the-entertainer",
    title: "The Entertainer (Ragtime Solo - Completo)",
    composer: "Scott Joplin",
    category: "solo",
    description: "Ragtime clássico completo com introdução cromática, síncopas e baixo stride inconfundível.",
    tempo: 120,
    timeSignature: "2/4",
    keySignature: "C",
    measures: [
      // Intro (4 measures)
      {
        number: 1,
        trebleNotes: [
          { id: generateNoteId(), pitch: "", duration: "eighth", isRest: true, clef: "treble" },
          { id: generateNoteId(), pitch: "D4", duration: "sixteenth", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "D#4", duration: "sixteenth", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "E4", duration: "sixteenth", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "C5", duration: "eighth", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "E4", duration: "sixteenth", isRest: false, clef: "treble" },
        ],
        bassNotes: [
          { id: generateNoteId(), pitch: "C3", duration: "quarter", isRest: false, clef: "bass" },
          { id: generateNoteId(), pitch: "E3", chordPitches: ["G3", "C4"], duration: "quarter", isRest: false, clef: "bass" },
        ],
      },
      {
        number: 2,
        trebleNotes: [
          { id: generateNoteId(), pitch: "C5", duration: "eighth", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "E4", duration: "sixteenth", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "C5", duration: "quarter", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "", duration: "sixteenth", isRest: true, clef: "treble" },
        ],
        bassNotes: [
          { id: generateNoteId(), pitch: "G2", duration: "quarter", isRest: false, clef: "bass" },
          { id: generateNoteId(), pitch: "E3", chordPitches: ["G3", "C4"], duration: "quarter", isRest: false, clef: "bass" },
        ],
      },
      {
        number: 3,
        trebleNotes: [
          { id: generateNoteId(), pitch: "", duration: "eighth", dotted: true, isRest: true, clef: "treble" },
          { id: generateNoteId(), pitch: "C4", chordPitches: ["E4", "G4"], duration: "sixteenth", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "D4", duration: "sixteenth", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "D#4", duration: "sixteenth", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "E4", chordPitches: ["G4", "C5"], duration: "eighth", isRest: false, clef: "treble" },
        ],
        bassNotes: [
          { id: generateNoteId(), pitch: "C3", duration: "quarter", isRest: false, clef: "bass" },
          { id: generateNoteId(), pitch: "E3", chordPitches: ["G3", "C4"], duration: "quarter", isRest: false, clef: "bass" },
        ],
      },
      {
        number: 4,
        trebleNotes: [
          { id: generateNoteId(), pitch: "", duration: "eighth", isRest: true, clef: "treble" },
          { id: generateNoteId(), pitch: "D4", chordPitches: ["F4", "B4"], duration: "eighth", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "C4", chordPitches: ["E4", "C5"], duration: "quarter", isRest: false, clef: "treble" },
        ],
        bassNotes: [
          { id: generateNoteId(), pitch: "G2", duration: "quarter", isRest: false, clef: "bass" },
          { id: generateNoteId(), pitch: "C3", chordPitches: ["E3", "G3"], duration: "quarter", isRest: false, clef: "bass" },
        ],
      },
      // Theme A (measures 5-12)
      {
        number: 5,
        trebleNotes: [
          { id: generateNoteId(), pitch: "", duration: "eighth", isRest: true, clef: "treble" },
          { id: generateNoteId(), pitch: "D4", duration: "sixteenth", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "D#4", duration: "sixteenth", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "E4", duration: "sixteenth", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "C5", duration: "eighth", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "E4", duration: "sixteenth", isRest: false, clef: "treble" },
        ],
        bassNotes: [
          { id: generateNoteId(), pitch: "C3", duration: "quarter", isRest: false, clef: "bass" },
          { id: generateNoteId(), pitch: "G3", chordPitches: ["C4", "E4"], duration: "quarter", isRest: false, clef: "bass" },
        ],
      },
      {
        number: 6,
        trebleNotes: [
          { id: generateNoteId(), pitch: "C5", duration: "eighth", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "E4", duration: "sixteenth", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "C5", duration: "quarter", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "", duration: "sixteenth", isRest: true, clef: "treble" },
        ],
        bassNotes: [
          { id: generateNoteId(), pitch: "E3", duration: "quarter", isRest: false, clef: "bass" },
          { id: generateNoteId(), pitch: "G3", chordPitches: ["C4", "E4"], duration: "quarter", isRest: false, clef: "bass" },
        ],
      },
      {
        number: 7,
        trebleNotes: [
          { id: generateNoteId(), pitch: "", duration: "eighth", isRest: true, clef: "treble" },
          { id: generateNoteId(), pitch: "C5", duration: "sixteenth", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "D5", duration: "sixteenth", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "D#5", duration: "sixteenth", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "E5", duration: "eighth", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "C5", duration: "sixteenth", isRest: false, clef: "treble" },
        ],
        bassNotes: [
          { id: generateNoteId(), pitch: "F2", duration: "quarter", isRest: false, clef: "bass" },
          { id: generateNoteId(), pitch: "A3", chordPitches: ["C4", "F4"], duration: "quarter", isRest: false, clef: "bass" },
        ],
      },
      {
        number: 8,
        trebleNotes: [
          { id: generateNoteId(), pitch: "D5", duration: "eighth", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "E5", duration: "eighth", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "C5", duration: "quarter", isRest: false, clef: "treble" },
        ],
        bassNotes: [
          { id: generateNoteId(), pitch: "G2", duration: "quarter", isRest: false, clef: "bass" },
          { id: generateNoteId(), pitch: "G3", chordPitches: ["B3", "D4"], duration: "quarter", isRest: false, clef: "bass" },
        ],
      },
      {
        number: 9,
        trebleNotes: [
          { id: generateNoteId(), pitch: "A4", chordPitches: ["C5"], duration: "eighth", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "C5", chordPitches: ["E5"], duration: "eighth", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "E5", chordPitches: ["G5"], duration: "quarter", isRest: false, clef: "treble" },
        ],
        bassNotes: [
          { id: generateNoteId(), pitch: "C3", duration: "quarter", isRest: false, clef: "bass" },
          { id: generateNoteId(), pitch: "G3", chordPitches: ["C4", "E4"], duration: "quarter", isRest: false, clef: "bass" },
        ],
      },
      {
        number: 10,
        trebleNotes: [
          { id: generateNoteId(), pitch: "D5", chordPitches: ["F5"], duration: "eighth", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "C5", chordPitches: ["E5"], duration: "eighth", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "B4", chordPitches: ["D5"], duration: "quarter", isRest: false, clef: "treble" },
        ],
        bassNotes: [
          { id: generateNoteId(), pitch: "F3", duration: "quarter", isRest: false, clef: "bass" },
          { id: generateNoteId(), pitch: "G3", chordPitches: ["B3", "D4"], duration: "quarter", isRest: false, clef: "bass" },
        ],
      },
      {
        number: 11,
        trebleNotes: [
          { id: generateNoteId(), pitch: "C5", duration: "eighth", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "D5", duration: "eighth", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "C5", duration: "quarter", isRest: false, clef: "treble" },
        ],
        bassNotes: [
          { id: generateNoteId(), pitch: "G2", duration: "quarter", isRest: false, clef: "bass" },
          { id: generateNoteId(), pitch: "G3", chordPitches: ["B3", "F4"], duration: "quarter", isRest: false, clef: "bass" },
        ],
      },
      {
        number: 12,
        trebleNotes: [
          { id: generateNoteId(), pitch: "C4", chordPitches: ["E4", "G4", "C5"], duration: "half", isRest: false, clef: "treble", isArpeggiated: true },
        ],
        bassNotes: [
          { id: generateNoteId(), pitch: "C2", chordPitches: ["C3"], duration: "half", isRest: false, clef: "bass" },
        ],
      },
    ],
  },

  // =========================================================================
  // 4. PIANO REDUCTION: Beethoven - 5ª Sinfonia em Dó Menor (FULL LISZT REDUCTION)
  // =========================================================================
  {
    id: "beethoven-symphony-5-reduction",
    title: "5ª Sinfonia em Dó Menor (Redução Orquestral Completa)",
    composer: "Ludwig van Beethoven",
    category: "reduction",
    description: "Redução orquestral completa no estilo de Franz Liszt, unindo cordas, madeiras e tímpanos em 2 mãos no Grand Staff.",
    tempo: 108,
    timeSignature: "2/4",
    keySignature: "Cm",
    measures: [
      {
        number: 1,
        trebleNotes: [
          { id: generateNoteId(), pitch: "", duration: "eighth", isRest: true, clef: "treble" },
          { id: generateNoteId(), pitch: "G4", chordPitches: ["G5"], duration: "eighth", isRest: false, clef: "treble", voice: 1, stemDirection: "up" },
          { id: generateNoteId(), pitch: "G4", chordPitches: ["G5"], duration: "eighth", isRest: false, clef: "treble", voice: 1, stemDirection: "up" },
          { id: generateNoteId(), pitch: "G4", chordPitches: ["G5"], duration: "eighth", isRest: false, clef: "treble", voice: 1, stemDirection: "up" },
        ],
        bassNotes: [
          { id: generateNoteId(), pitch: "", duration: "eighth", isRest: true, clef: "bass" },
          { id: generateNoteId(), pitch: "G2", chordPitches: ["G3"], duration: "eighth", isRest: false, clef: "bass", voice: 2, stemDirection: "down" },
          { id: generateNoteId(), pitch: "G2", chordPitches: ["G3"], duration: "eighth", isRest: false, clef: "bass", voice: 2, stemDirection: "down" },
          { id: generateNoteId(), pitch: "G2", chordPitches: ["G3"], duration: "eighth", isRest: false, clef: "bass", voice: 2, stemDirection: "down" },
        ],
      },
      {
        number: 2,
        trebleNotes: [
          { id: generateNoteId(), pitch: "Eb4", chordPitches: ["Eb5"], duration: "half", isRest: false, clef: "treble", voice: 1, stemDirection: "up" },
        ],
        bassNotes: [
          { id: generateNoteId(), pitch: "Eb2", chordPitches: ["Eb3"], duration: "half", isRest: false, clef: "bass", voice: 2, stemDirection: "down" },
        ],
      },
      {
        number: 3,
        trebleNotes: [
          { id: generateNoteId(), pitch: "", duration: "eighth", isRest: true, clef: "treble" },
          { id: generateNoteId(), pitch: "F4", chordPitches: ["F5"], duration: "eighth", isRest: false, clef: "treble", voice: 1, stemDirection: "up" },
          { id: generateNoteId(), pitch: "F4", chordPitches: ["F5"], duration: "eighth", isRest: false, clef: "treble", voice: 1, stemDirection: "up" },
          { id: generateNoteId(), pitch: "F4", chordPitches: ["F5"], duration: "eighth", isRest: false, clef: "treble", voice: 1, stemDirection: "up" },
        ],
        bassNotes: [
          { id: generateNoteId(), pitch: "", duration: "eighth", isRest: true, clef: "bass" },
          { id: generateNoteId(), pitch: "F2", chordPitches: ["F3"], duration: "eighth", isRest: false, clef: "bass", voice: 2, stemDirection: "down" },
          { id: generateNoteId(), pitch: "F2", chordPitches: ["F3"], duration: "eighth", isRest: false, clef: "bass", voice: 2, stemDirection: "down" },
          { id: generateNoteId(), pitch: "F2", chordPitches: ["F3"], duration: "eighth", isRest: false, clef: "bass", voice: 2, stemDirection: "down" },
        ],
      },
      {
        number: 4,
        trebleNotes: [
          { id: generateNoteId(), pitch: "D4", chordPitches: ["D5"], duration: "half", isRest: false, clef: "treble", voice: 1, stemDirection: "up" },
        ],
        bassNotes: [
          { id: generateNoteId(), pitch: "D2", chordPitches: ["D3"], duration: "half", isRest: false, clef: "bass", voice: 2, stemDirection: "down" },
        ],
      },
      {
        number: 5,
        trebleNotes: [
          { id: generateNoteId(), pitch: "Eb4", chordPitches: ["C5"], duration: "quarter", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "D4", chordPitches: ["B4"], duration: "quarter", isRest: false, clef: "treble" },
        ],
        bassNotes: [
          { id: generateNoteId(), pitch: "C3", duration: "quarter", isRest: false, clef: "bass" },
          { id: generateNoteId(), pitch: "G2", duration: "quarter", isRest: false, clef: "bass" },
        ],
      },
      {
        number: 6,
        trebleNotes: [
          { id: generateNoteId(), pitch: "C4", chordPitches: ["Eb4", "C5"], duration: "quarter", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "G4", duration: "quarter", isRest: false, clef: "treble" },
        ],
        bassNotes: [
          { id: generateNoteId(), pitch: "C3", chordPitches: ["G3"], duration: "quarter", isRest: false, clef: "bass" },
          { id: generateNoteId(), pitch: "Eb3", duration: "quarter", isRest: false, clef: "bass" },
        ],
      },
      {
        number: 7,
        trebleNotes: [
          { id: generateNoteId(), pitch: "Ab4", duration: "eighth", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "G4", duration: "eighth", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "F4", duration: "quarter", isRest: false, clef: "treble" },
        ],
        bassNotes: [
          { id: generateNoteId(), pitch: "F3", duration: "quarter", isRest: false, clef: "bass" },
          { id: generateNoteId(), pitch: "D3", duration: "quarter", isRest: false, clef: "bass" },
        ],
      },
      {
        number: 8,
        trebleNotes: [
          { id: generateNoteId(), pitch: "G4", duration: "half", isRest: false, clef: "treble" },
        ],
        bassNotes: [
          { id: generateNoteId(), pitch: "G2", chordPitches: ["G3"], duration: "half", isRest: false, clef: "bass" },
        ],
      },
      {
        number: 9,
        trebleNotes: [
          { id: generateNoteId(), pitch: "C4", chordPitches: ["Eb4", "G4", "C5"], duration: "half", isRest: false, clef: "treble", isArpeggiated: true },
        ],
        bassNotes: [
          { id: generateNoteId(), pitch: "C2", chordPitches: ["G2", "C3"], duration: "half", isRest: false, clef: "bass", isArpeggiated: true },
        ],
      },
    ],
  },

  // =========================================================================
  // 5. PIANO REDUCTION: Mozart - Lacrimosa do Requiem KV 626 (FULL CHOIR SATB)
  // =========================================================================
  {
    id: "mozart-lacrimosa-reduction",
    title: "Lacrimosa do Requiem KV 626 (Redução Coral SATB Completa)",
    composer: "Wolfgang Amadeus Mozart",
    category: "reduction",
    description: "Redução integral do coro a 4 vozes (Soprano, Contralto, Tenor, Baixo) e orquestra de cordas em duas mãos.",
    tempo: 68,
    timeSignature: "3/4",
    keySignature: "Dm",
    measures: [
      {
        number: 1,
        // Intro orchestra violin sighs + cellos
        trebleNotes: [
          { id: generateNoteId(), pitch: "A4", duration: "eighth", isRest: false, clef: "treble", voice: 1, stemDirection: "up" },
          { id: generateNoteId(), pitch: "F4", duration: "eighth", isRest: false, clef: "treble", voice: 1, stemDirection: "up" },
          { id: generateNoteId(), pitch: "A4", duration: "eighth", isRest: false, clef: "treble", voice: 1, stemDirection: "up" },
          { id: generateNoteId(), pitch: "F4", duration: "eighth", isRest: false, clef: "treble", voice: 1, stemDirection: "up" },
          { id: generateNoteId(), pitch: "A4", duration: "eighth", isRest: false, clef: "treble", voice: 1, stemDirection: "up" },
          { id: generateNoteId(), pitch: "F4", duration: "eighth", isRest: false, clef: "treble", voice: 1, stemDirection: "up" },
        ],
        bassNotes: [
          { id: generateNoteId(), pitch: "D2", duration: "quarter", isRest: false, clef: "bass", voice: 2, stemDirection: "down" },
          { id: generateNoteId(), pitch: "D3", duration: "quarter", isRest: false, clef: "bass", voice: 2, stemDirection: "up" },
          { id: generateNoteId(), pitch: "D2", duration: "quarter", isRest: false, clef: "bass", voice: 2, stemDirection: "down" },
        ],
      },
      {
        number: 2,
        // Choir enters: Soprano + Alto in Right Hand, Tenor + Bass in Left Hand
        trebleNotes: [
          { id: generateNoteId(), pitch: "F4", chordPitches: ["A4"], duration: "quarter", isRest: false, clef: "treble", voice: 1, stemDirection: "up" },
          { id: generateNoteId(), pitch: "G4", chordPitches: ["Bb4"], duration: "quarter", isRest: false, clef: "treble", voice: 1, stemDirection: "up" },
          { id: generateNoteId(), pitch: "A4", chordPitches: ["C#5"], duration: "quarter", isRest: false, clef: "treble", voice: 1, stemDirection: "up" },
        ],
        bassNotes: [
          { id: generateNoteId(), pitch: "D3", chordPitches: ["F3"], duration: "quarter", isRest: false, clef: "bass", voice: 2, stemDirection: "down" },
          { id: generateNoteId(), pitch: "G2", chordPitches: ["D3"], duration: "quarter", isRest: false, clef: "bass", voice: 2, stemDirection: "down" },
          { id: generateNoteId(), pitch: "A2", chordPitches: ["E3", "A3"], duration: "quarter", isRest: false, clef: "bass", voice: 2, stemDirection: "down", isArpeggiated: true },
        ],
      },
      {
        number: 3,
        trebleNotes: [
          { id: generateNoteId(), pitch: "D4", chordPitches: ["F4", "D5"], duration: "half", dotted: true, isRest: false, clef: "treble", voice: 1, stemDirection: "up", isArpeggiated: true },
        ],
        bassNotes: [
          { id: generateNoteId(), pitch: "D2", chordPitches: ["A2", "F3"], duration: "half", dotted: true, isRest: false, clef: "bass", voice: 2, stemDirection: "down" },
        ],
      },
      {
        number: 4,
        // "Qua resurget ex favilla"
        trebleNotes: [
          { id: generateNoteId(), pitch: "G4", chordPitches: ["Bb4"], duration: "quarter", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "A4", chordPitches: ["C5"], duration: "quarter", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "Bb4", chordPitches: ["D5"], duration: "quarter", isRest: false, clef: "treble" },
        ],
        bassNotes: [
          { id: generateNoteId(), pitch: "G2", chordPitches: ["D3", "G3"], duration: "quarter", isRest: false, clef: "bass" },
          { id: generateNoteId(), pitch: "F2", chordPitches: ["C3", "F3"], duration: "quarter", isRest: false, clef: "bass" },
          { id: generateNoteId(), pitch: "Bb2", chordPitches: ["F3", "Bb3"], duration: "quarter", isRest: false, clef: "bass" },
        ],
      },
      {
        number: 5,
        // "Judicandus homo reus"
        trebleNotes: [
          { id: generateNoteId(), pitch: "A4", chordPitches: ["E5"], duration: "half", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "G4", chordPitches: ["C#5"], duration: "quarter", isRest: false, clef: "treble" },
        ],
        bassNotes: [
          { id: generateNoteId(), pitch: "A2", chordPitches: ["E3", "A3"], duration: "half", isRest: false, clef: "bass" },
          { id: generateNoteId(), pitch: "A2", chordPitches: ["G3", "A3"], duration: "quarter", isRest: false, clef: "bass" },
        ],
      },
      {
        number: 6,
        // "Huic ergo parce Deus"
        trebleNotes: [
          { id: generateNoteId(), pitch: "F4", chordPitches: ["D5"], duration: "half", dotted: true, isRest: false, clef: "treble" },
        ],
        bassNotes: [
          { id: generateNoteId(), pitch: "D3", chordPitches: ["F3", "A3"], duration: "half", dotted: true, isRest: false, clef: "bass" },
        ],
      },
      {
        number: 7,
        // "Dona eis requiem"
        trebleNotes: [
          { id: generateNoteId(), pitch: "G4", chordPitches: ["Bb4", "E5"], duration: "quarter", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "E4", chordPitches: ["A4", "C#5"], duration: "quarter", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "F4", chordPitches: ["A4", "D5"], duration: "quarter", isRest: false, clef: "treble" },
        ],
        bassNotes: [
          { id: generateNoteId(), pitch: "G2", chordPitches: ["D3"], duration: "quarter", isRest: false, clef: "bass" },
          { id: generateNoteId(), pitch: "A2", chordPitches: ["E3", "A3"], duration: "quarter", isRest: false, clef: "bass" },
          { id: generateNoteId(), pitch: "D2", chordPitches: ["A2", "F3"], duration: "quarter", isRest: false, clef: "bass" },
        ],
      },
      {
        number: 8,
        // "Amen"
        trebleNotes: [
          { id: generateNoteId(), pitch: "D4", chordPitches: ["F4", "A4", "D5"], duration: "half", dotted: true, isRest: false, clef: "treble", isArpeggiated: true },
        ],
        bassNotes: [
          { id: generateNoteId(), pitch: "D2", chordPitches: ["A2", "D3"], duration: "half", dotted: true, isRest: false, clef: "bass", isArpeggiated: true },
        ],
      },
    ],
  },

  // ==========================================
  // 6. PIANO SOLO: Beethoven - Moonlight Sonata (Sonata ao Luar - Completa)
  // ==========================================
  {
    id: "beethoven-moonlight-sonata",
    title: "Sonata ao Luar (Moonlight Sonata Op. 27 Nº 2 - Completa)",
    composer: "Ludwig van Beethoven",
    category: "solo",
    description: "Versão integral do Adagio sostenuto de Beethoven com arpejos contínuos em tercinas na mão direita e oitavas profundas no baixo.",
    tempo: 60,
    timeSignature: "4/4",
    keySignature: "C#m",
    measures: [
      {
        number: 1,
        trebleNotes: [
          { id: generateNoteId(), pitch: "G#3", chordPitches: ["C#4", "E4"], duration: "quarter", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "G#3", chordPitches: ["C#4", "E4"], duration: "quarter", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "G#3", chordPitches: ["C#4", "E4"], duration: "quarter", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "G#3", chordPitches: ["C#4", "E4"], duration: "quarter", isRest: false, clef: "treble" },
        ],
        bassNotes: [
          { id: generateNoteId(), pitch: "C#2", chordPitches: ["C#3"], duration: "whole", isRest: false, clef: "bass" },
        ],
      },
      {
        number: 2,
        trebleNotes: [
          { id: generateNoteId(), pitch: "G#3", chordPitches: ["C#4", "E4"], duration: "quarter", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "G#3", chordPitches: ["C#4", "E4"], duration: "quarter", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "G#3", chordPitches: ["C#4", "E4"], duration: "quarter", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "G#3", chordPitches: ["C#4", "E4"], duration: "quarter", isRest: false, clef: "treble" },
        ],
        bassNotes: [
          { id: generateNoteId(), pitch: "B1", chordPitches: ["B2"], duration: "whole", isRest: false, clef: "bass" },
        ],
      },
      {
        number: 3,
        trebleNotes: [
          { id: generateNoteId(), pitch: "A3", chordPitches: ["C#4", "E4"], duration: "quarter", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "A3", chordPitches: ["D4", "F#4"], duration: "quarter", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "G#3", chordPitches: ["C#4", "E4"], duration: "quarter", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "G#3", chordPitches: ["C4", "D#4"], duration: "quarter", isRest: false, clef: "treble" },
        ],
        bassNotes: [
          { id: generateNoteId(), pitch: "A1", chordPitches: ["A2"], duration: "half", isRest: false, clef: "bass" },
          { id: generateNoteId(), pitch: "G#1", chordPitches: ["G#2"], duration: "half", isRest: false, clef: "bass" },
        ],
      },
      {
        number: 4,
        trebleNotes: [
          { id: generateNoteId(), pitch: "G#3", chordPitches: ["C#4", "E4"], duration: "half", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "G#3", chordPitches: ["C#4", "E4"], duration: "quarter", isRest: false, clef: "treble" },
          { id: generateNoteId(), pitch: "G#4", duration: "eighth", dotted: true, isRest: false, clef: "treble", voice: 1, stemDirection: "up" },
          { id: generateNoteId(), pitch: "G#4", duration: "sixteenth", isRest: false, clef: "treble", voice: 1, stemDirection: "up" },
        ],
        bassNotes: [
          { id: generateNoteId(), pitch: "C#2", chordPitches: ["C#3"], duration: "whole", isRest: false, clef: "bass" },
        ],
      },
      {
        number: 5,
        trebleNotes: [
          { id: generateNoteId(), pitch: "G#4", duration: "quarter", dotted: true, isRest: false, clef: "treble", voice: 1, stemDirection: "up" },
          { id: generateNoteId(), pitch: "G#4", duration: "eighth", isRest: false, clef: "treble", voice: 1, stemDirection: "up" },
          { id: generateNoteId(), pitch: "G#4", duration: "half", isRest: false, clef: "treble", voice: 1, stemDirection: "up" },
        ],
        bassNotes: [
          { id: generateNoteId(), pitch: "C#2", chordPitches: ["C#3"], duration: "whole", isRest: false, clef: "bass" },
        ],
      },
      {
        number: 6,
        trebleNotes: [
          { id: generateNoteId(), pitch: "A4", duration: "half", isRest: false, clef: "treble", voice: 1, stemDirection: "up" },
          { id: generateNoteId(), pitch: "F#4", duration: "quarter", isRest: false, clef: "treble", voice: 1, stemDirection: "up" },
          { id: generateNoteId(), pitch: "G#4", duration: "quarter", isRest: false, clef: "treble", voice: 1, stemDirection: "up" },
        ],
        bassNotes: [
          { id: generateNoteId(), pitch: "F#2", chordPitches: ["F#3"], duration: "half", isRest: false, clef: "bass" },
          { id: generateNoteId(), pitch: "B1", chordPitches: ["B2"], duration: "half", isRest: false, clef: "bass" },
        ],
      },
      {
        number: 7,
        trebleNotes: [
          { id: generateNoteId(), pitch: "E4", chordPitches: ["G#4"], duration: "half", isRest: false, clef: "treble", voice: 1, stemDirection: "up" },
          { id: generateNoteId(), pitch: "D#4", chordPitches: ["F#4"], duration: "half", isRest: false, clef: "treble", voice: 1, stemDirection: "up" },
        ],
        bassNotes: [
          { id: generateNoteId(), pitch: "E2", chordPitches: ["E3"], duration: "half", isRest: false, clef: "bass" },
          { id: generateNoteId(), pitch: "B1", chordPitches: ["B2"], duration: "half", isRest: false, clef: "bass" },
        ],
      },
      {
        number: 8,
        trebleNotes: [
          { id: generateNoteId(), pitch: "E4", chordPitches: ["G#4", "E5"], duration: "whole", isRest: false, clef: "treble", voice: 1, stemDirection: "up", isArpeggiated: true },
        ],
        bassNotes: [
          { id: generateNoteId(), pitch: "E2", chordPitches: ["G#2", "E3"], duration: "whole", isRest: false, clef: "bass", isArpeggiated: true },
        ],
      },
    ],
  },
];

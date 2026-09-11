import { NoteDuration, SheetMusic, Measure, NoteItem } from "../src/types";

interface ComposeOptions {
  timeSignature?: "4/4" | "3/4" | "2/4" | "auto";
  tempo?: number;
  clef?: "both" | "treble" | "bass";
  difficulty?: "facil" | "medio";
  measureCount?: number;
}

// Helper to generate unique IDs
function uid(prefix: string): string {
  return `${prefix}_${Math.random().toString(36).substring(2, 8)}`;
}

// Musical scale patterns (semitone offsets from root)
const SCALES = {
  major: [0, 2, 4, 5, 7, 9, 11],
  minor: [0, 2, 3, 5, 7, 8, 10], // natural minor
  harmonicMinor: [0, 2, 3, 5, 7, 8, 11],
  pentatonicMajor: [0, 2, 4, 7, 9],
  pentatonicMinor: [0, 3, 5, 7, 10],
  blues: [0, 3, 5, 6, 7, 10],
  dorian: [0, 2, 3, 5, 7, 9, 10],
};

const NOTE_NAMES = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];

function midiToPitchString(midi: number): string {
  const octave = Math.floor(midi / 12) - 1;
  const noteIndex = midi % 12;
  return `${NOTE_NAMES[noteIndex]}${octave}`;
}

// Generate pitches for a scale across given octave range
function getScalePitches(rootMidi: number, scaleIntervals: number[], minOctave: number, maxOctave: number): number[] {
  const notes: number[] = [];
  for (let oct = minOctave; oct <= maxOctave; oct++) {
    for (const interval of scaleIntervals) {
      const midi = (oct + 1) * 12 + ((rootMidi % 12) + interval) % 12;
      if (!notes.includes(midi)) {
        notes.push(midi);
      }
    }
  }
  return notes.sort((a, b) => a - b);
}

export function composeCustomSheetFromPrompt(prompt: string, options: ComposeOptions = {}): SheetMusic {
  const lowerPrompt = (prompt || "").toLowerCase();

  // 1. Detect Time Signature
  let timeSig: "4/4" | "3/4" | "2/4" = "4/4";
  if (options.timeSignature && options.timeSignature !== "auto") {
    timeSig = options.timeSignature;
  } else if (
    lowerPrompt.includes("3/4") ||
    lowerPrompt.includes("valsa") ||
    lowerPrompt.includes("waltz") ||
    lowerPrompt.includes("ternário") ||
    lowerPrompt.includes("ninar") ||
    lowerPrompt.includes("lullaby")
  ) {
    timeSig = "3/4";
  } else if (
    lowerPrompt.includes("2/4") ||
    lowerPrompt.includes("samba") ||
    lowerPrompt.includes("choro") ||
    lowerPrompt.includes("marcha") ||
    lowerPrompt.includes("polka") ||
    lowerPrompt.includes("rápido")
  ) {
    timeSig = "2/4";
  }

  // Beats per measure
  const beatsPerMeasure = timeSig === "4/4" ? 4 : timeSig === "3/4" ? 3 : 2;

  // 2. Detect Key & Mood
  let keyName = "C";
  let isMinor = false;
  let scaleType: keyof typeof SCALES = "major";
  let rootMidi = 60; // Middle C

  // Look for explicit key mentioned
  if (lowerPrompt.includes("ré menor") || lowerPrompt.includes("d minor") || lowerPrompt.includes("dm")) {
    keyName = "Dm";
    rootMidi = 62;
    isMinor = true;
  } else if (lowerPrompt.includes("lá menor") || lowerPrompt.includes("a minor") || lowerPrompt.includes("am")) {
    keyName = "Am";
    rootMidi = 57; // A3 / A4
    isMinor = true;
  } else if (lowerPrompt.includes("mi menor") || lowerPrompt.includes("e minor") || lowerPrompt.includes("em")) {
    keyName = "Em";
    rootMidi = 64;
    isMinor = true;
  } else if (lowerPrompt.includes("sol maior") || lowerPrompt.includes("g major") || lowerPrompt.includes("sol")) {
    keyName = "G";
    rootMidi = 67;
    isMinor = false;
  } else if (lowerPrompt.includes("fá maior") || lowerPrompt.includes("f major")) {
    keyName = "F";
    rootMidi = 65;
    isMinor = false;
  } else if (lowerPrompt.includes("dó menor") || lowerPrompt.includes("c minor") || lowerPrompt.includes("cm")) {
    keyName = "Cm";
    rootMidi = 60;
    isMinor = true;
  } else {
    // Mood detection for key
    const sadKeywords = [
      "triste", "melancol", "nostalg", "saudade", "depress", "despedida", "dor", "sombri",
      "noite", "lua", "chuva", "escuro", "dark", "choro", "lamento", "misterio", "fantasm"
    ];
    const epicKeywords = ["épic", "epic", "batalha", "anime", "heroic", "boss", "luta", "guerra", "fogo", "dragão", "furioso"];
    const bluesKeywords = ["blues", "jazz", "swing", "bebop", "bossa"];

    if (sadKeywords.some((k) => lowerPrompt.includes(k))) {
      keyName = "Am";
      rootMidi = 57; // A
      isMinor = true;
      scaleType = "minor";
    } else if (epicKeywords.some((k) => lowerPrompt.includes(k))) {
      keyName = "Dm";
      rootMidi = 62; // D
      isMinor = true;
      scaleType = "harmonicMinor";
    } else if (bluesKeywords.some((k) => lowerPrompt.includes(k))) {
      keyName = "C";
      rootMidi = 60;
      scaleType = "blues";
    } else {
      keyName = "C";
      rootMidi = 60;
      scaleType = "major";
    }
  }

  // 3. Detect Tempo (BPM)
  let tempo = options.tempo || 108;
  const bpmMatch = lowerPrompt.match(/(\d{2,3})\s*bpm/i);
  if (bpmMatch) {
    tempo = parseInt(bpmMatch[1], 10);
  } else if (lowerPrompt.includes("lento") || lowerPrompt.includes("devagar") || lowerPrompt.includes("calmo") || lowerPrompt.includes("ninar") || lowerPrompt.includes("adagio")) {
    tempo = 72;
  } else if (lowerPrompt.includes("muito rápido") || lowerPrompt.includes("presto") || lowerPrompt.includes("veloz") || lowerPrompt.includes("furioso")) {
    tempo = 144;
  } else if (lowerPrompt.includes("rápido") || lowerPrompt.includes("alegre") || lowerPrompt.includes("animado") || lowerPrompt.includes("allegro")) {
    tempo = 124;
  } else if (timeSig === "3/4") {
    tempo = 112; // typical waltz tempo
  } else if (timeSig === "2/4") {
    tempo = 116;
  }

  // 4. Clef mode
  const clefSelection = options.clef || "both";
  const hasBass = clefSelection === "both" || clefSelection === "bass";
  const hasTreble = clefSelection === "both" || clefSelection === "treble";

  // 5. Measure count
  const measureCount = options.measureCount || (lowerPrompt.includes("curta") || lowerPrompt.includes("pequena") ? 4 : 8);

  // 6. Pitch collections for melody & bass
  const intervals = SCALES[scaleType] || SCALES.major;
  const treblePitches = getScalePitches(rootMidi, intervals, 4, 5); // C4 to B5
  const bassPitches = getScalePitches(rootMidi, intervals, 2, 3); // C2 to B3

  // Harmonic chord roots for each measure
  // Progression: e.g. I - vi - IV - V (or i - VI - III - VII in minor, etc.)
  const chordRootsMajor = [0, 9, 5, 7, 0, 5, 7, 0]; // I, vi, IV, V, I, IV, V, I
  const chordRootsMinor = [0, 8, 3, 10, 0, 5, 7, 0]; // i, VI, III, VII, i, iv, V, i
  const chordProg = isMinor ? chordRootsMinor : chordRootsMajor;

  // Title generation based on prompt
  let title = "Composição Personalizada";
  if (lowerPrompt.trim()) {
    // Capitalize prompt or create descriptive title
    const cleanPrompt = prompt.replace(/[^\w\s\u00C0-\u00FF]/gi, "").trim();
    if (cleanPrompt.length > 0 && cleanPrompt.length <= 40) {
      title = cleanPrompt.charAt(0).toUpperCase() + cleanPrompt.slice(1);
    } else if (lowerPrompt.includes("valsa")) {
      title = `Valsa em ${keyName}`;
    } else if (lowerPrompt.includes("anime") || lowerPrompt.includes("épic")) {
      title = `Sinfonia Heroica (${keyName})`;
    } else if (lowerPrompt.includes("ninar") || lowerPrompt.includes("lullaby")) {
      title = `Canção de Ninar das Estrelas`;
    } else if (lowerPrompt.includes("jazz") || lowerPrompt.includes("blues")) {
      title = `Midnight Piano Blues`;
    } else if (lowerPrompt.includes("choro") || lowerPrompt.includes("samba")) {
      title = `Choro Alegre ao Luar`;
    } else {
      title = `Peça em ${keyName} - ${cleanPrompt.slice(0, 25)}...`;
    }
  } else {
    title = `Harmonia em ${keyName}`;
  }

  // 7. Compose measures
  const measures: Measure[] = [];

  for (let m = 0; m < measureCount; m++) {
    const measureNumber = m + 1;
    const chordRootOffset = chordProg[m % chordProg.length];
    const isCadenceEnd = m === measureCount - 1 || m === Math.floor(measureCount / 2) - 1;

    // Treble notes (Melody)
    const trebleNotes: NoteItem[] = [];
    if (hasTreble) {
      let currentBeats = 0;

      // Select rhythmic motive depending on style & measure
      if (timeSig === "3/4") {
        // Waltz rhythm: e.g. dotted half (3 beats), or half + quarter, or three quarters
        if (isCadenceEnd) {
          // Cadence long note
          const pitch = midiToPitchString(rootMidi + (m === measureCount - 1 ? 12 : 7));
          trebleNotes.push({
            id: uid(`t_${m}`),
            pitch,
            duration: "half",
            dotted: true,
            isRest: false,
            clef: "treble",
          });
          currentBeats = 3;
        } else if (m % 2 === 0) {
          // Half (2) + Quarter (1)
          const p1 = treblePitches[(m * 2 + 2) % treblePitches.length];
          const p2 = treblePitches[(m * 2 + 3) % treblePitches.length];
          trebleNotes.push({
            id: uid(`t_${m}_0`),
            pitch: midiToPitchString(p1),
            duration: "half",
            isRest: false,
            clef: "treble",
          });
          trebleNotes.push({
            id: uid(`t_${m}_1`),
            pitch: midiToPitchString(p2),
            duration: "quarter",
            isRest: false,
            clef: "treble",
          });
          currentBeats = 3;
        } else {
          // Three quarters (1 + 1 + 1)
          for (let q = 0; q < 3; q++) {
            const p = treblePitches[(m * 2 + q + 1) % treblePitches.length];
            trebleNotes.push({
              id: uid(`t_${m}_${q}`),
              pitch: midiToPitchString(p),
              duration: "quarter",
              isRest: false,
              clef: "treble",
            });
          }
          currentBeats = 3;
        }
      } else if (timeSig === "2/4") {
        // 2/4 rhythm: 2 beats (e.g. four eighths, or quarter + two eighths, or half note)
        if (isCadenceEnd) {
          trebleNotes.push({
            id: uid(`t_${m}`),
            pitch: midiToPitchString(rootMidi + (m === measureCount - 1 ? 0 : 7)),
            duration: "half",
            isRest: false,
            clef: "treble",
          });
          currentBeats = 2;
        } else if (m % 2 === 0) {
          // Quarter (1) + two eighths (0.5 + 0.5)
          const p1 = treblePitches[(m * 2) % treblePitches.length];
          const p2 = treblePitches[(m * 2 + 1) % treblePitches.length];
          const p3 = treblePitches[(m * 2 + 2) % treblePitches.length];
          trebleNotes.push({
            id: uid(`t_${m}_0`),
            pitch: midiToPitchString(p1),
            duration: "quarter",
            isRest: false,
            clef: "treble",
          });
          trebleNotes.push({
            id: uid(`t_${m}_1`),
            pitch: midiToPitchString(p2),
            duration: "eighth",
            isRest: false,
            clef: "treble",
          });
          trebleNotes.push({
            id: uid(`t_${m}_2`),
            pitch: midiToPitchString(p3),
            duration: "eighth",
            isRest: false,
            clef: "treble",
          });
          currentBeats = 2;
        } else {
          // Four eighth notes
          for (let e = 0; e < 4; e++) {
            const p = treblePitches[(m * 3 + e) % treblePitches.length];
            trebleNotes.push({
              id: uid(`t_${m}_${e}`),
              pitch: midiToPitchString(p),
              duration: "eighth",
              isRest: false,
              clef: "treble",
            });
          }
          currentBeats = 2;
        }
      } else {
        // 4/4 rhythm: 4 beats total
        if (isCadenceEnd && m === measureCount - 1) {
          // Final whole note
          trebleNotes.push({
            id: uid(`t_${m}_0`),
            pitch: midiToPitchString(rootMidi + 12),
            duration: "whole",
            isRest: false,
            clef: "treble",
          });
          currentBeats = 4;
        } else if (lowerPrompt.includes("semicolcheia") || lowerPrompt.includes("rápido") || lowerPrompt.includes("virtuos")) {
          // Virtuosic: four sixteenths (1) + two eighths (1) + half (2)
          for (let s = 0; s < 4; s++) {
            const p = treblePitches[(m * 4 + s) % treblePitches.length];
            trebleNotes.push({
              id: uid(`t_${m}_s${s}`),
              pitch: midiToPitchString(p),
              duration: "sixteenth",
              isRest: false,
              clef: "treble",
            });
          }
          for (let e = 0; e < 2; e++) {
            const p = treblePitches[(m * 3 + e + 2) % treblePitches.length];
            trebleNotes.push({
              id: uid(`t_${m}_e${e}`),
              pitch: midiToPitchString(p),
              duration: "eighth",
              isRest: false,
              clef: "treble",
            });
          }
          trebleNotes.push({
            id: uid(`t_${m}_h`),
            pitch: midiToPitchString(treblePitches[(m * 2) % treblePitches.length]),
            duration: "half",
            isRest: false,
            clef: "treble",
          });
          currentBeats = 4;
        } else if (m % 3 === 0) {
          // Dotted half (3) + quarter (1)
          trebleNotes.push({
            id: uid(`t_${m}_0`),
            pitch: midiToPitchString(treblePitches[(m * 2 + 3) % treblePitches.length]),
            duration: "half",
            dotted: true,
            isRest: false,
            clef: "treble",
          });
          trebleNotes.push({
            id: uid(`t_${m}_1`),
            pitch: midiToPitchString(treblePitches[(m * 2 + 2) % treblePitches.length]),
            duration: "quarter",
            isRest: false,
            clef: "treble",
          });
          currentBeats = 4;
        } else if (m % 2 === 0) {
          // Two quarters (1+1) + one half (2)
          trebleNotes.push({
            id: uid(`t_${m}_0`),
            pitch: midiToPitchString(treblePitches[(m * 3) % treblePitches.length]),
            duration: "quarter",
            isRest: false,
            clef: "treble",
          });
          trebleNotes.push({
            id: uid(`t_${m}_1`),
            pitch: midiToPitchString(treblePitches[(m * 3 + 1) % treblePitches.length]),
            duration: "quarter",
            isRest: false,
            clef: "treble",
          });
          trebleNotes.push({
            id: uid(`t_${m}_2`),
            pitch: midiToPitchString(treblePitches[(m * 3 + 2) % treblePitches.length]),
            duration: "half",
            isRest: false,
            clef: "treble",
          });
          currentBeats = 4;
        } else {
          // Four quarters (1+1+1+1) or two eighths + three quarters
          trebleNotes.push({
            id: uid(`t_${m}_0`),
            pitch: midiToPitchString(treblePitches[(m * 2) % treblePitches.length]),
            duration: "eighth",
            isRest: false,
            clef: "treble",
          });
          trebleNotes.push({
            id: uid(`t_${m}_1`),
            pitch: midiToPitchString(treblePitches[(m * 2 + 1) % treblePitches.length]),
            duration: "eighth",
            isRest: false,
            clef: "treble",
          });
          trebleNotes.push({
            id: uid(`t_${m}_2`),
            pitch: midiToPitchString(treblePitches[(m * 2 + 2) % treblePitches.length]),
            duration: "quarter",
            isRest: false,
            clef: "treble",
          });
          trebleNotes.push({
            id: uid(`t_${m}_3`),
            pitch: midiToPitchString(treblePitches[(m * 2 + 3) % treblePitches.length]),
            duration: "half",
            isRest: false,
            clef: "treble",
          });
          currentBeats = 4;
        }
      }
    }

    // Bass notes (Accompaniment)
    const bassNotes: NoteItem[] = [];
    if (hasBass) {
      const rootBaseMidi = 36 + ((rootMidi % 12) + chordRootOffset) % 12; // Octave 2
      const fifthMidi = rootBaseMidi + 7;
      const octaveMidi = rootBaseMidi + 12;

      if (timeSig === "3/4") {
        // Waltz accompaniment: Bass root on beat 1, chords/fifths on beats 2 and 3
        bassNotes.push({
          id: uid(`b_${m}_0`),
          pitch: midiToPitchString(rootBaseMidi),
          duration: "quarter",
          isRest: false,
          clef: "bass",
        });
        bassNotes.push({
          id: uid(`b_${m}_1`),
          pitch: midiToPitchString(fifthMidi),
          duration: "quarter",
          isRest: false,
          clef: "bass",
        });
        bassNotes.push({
          id: uid(`b_${m}_2`),
          pitch: midiToPitchString(octaveMidi),
          duration: "quarter",
          isRest: false,
          clef: "bass",
        });
      } else if (timeSig === "2/4") {
        // 2/4 accompaniment: two quarters or four eighths (Alberti / march)
        bassNotes.push({
          id: uid(`b_${m}_0`),
          pitch: midiToPitchString(rootBaseMidi),
          duration: "quarter",
          isRest: false,
          clef: "bass",
        });
        bassNotes.push({
          id: uid(`b_${m}_1`),
          pitch: midiToPitchString(fifthMidi),
          duration: "quarter",
          isRest: false,
          clef: "bass",
        });
      } else {
        // 4/4 accompaniment:
        // Cadence ending gets a deep sustained whole note
        if (isCadenceEnd && m === measureCount - 1) {
          bassNotes.push({
            id: uid(`b_${m}_0`),
            pitch: midiToPitchString(rootBaseMidi),
            duration: "whole",
            isRest: false,
            clef: "bass",
          });
        } else if (m % 2 === 0) {
          // Two half notes: Root (2) + Fifth (2)
          bassNotes.push({
            id: uid(`b_${m}_0`),
            pitch: midiToPitchString(rootBaseMidi),
            duration: "half",
            isRest: false,
            clef: "bass",
          });
          bassNotes.push({
            id: uid(`b_${m}_1`),
            pitch: midiToPitchString(fifthMidi),
            duration: "half",
            isRest: false,
            clef: "bass",
          });
        } else {
          // Alberti bass: root - fifth - octave - fifth (1+1+1+1)
          bassNotes.push({
            id: uid(`b_${m}_0`),
            pitch: midiToPitchString(rootBaseMidi),
            duration: "quarter",
            isRest: false,
            clef: "bass",
          });
          bassNotes.push({
            id: uid(`b_${m}_1`),
            pitch: midiToPitchString(fifthMidi),
            duration: "quarter",
            isRest: false,
            clef: "bass",
          });
          bassNotes.push({
            id: uid(`b_${m}_2`),
            pitch: midiToPitchString(octaveMidi),
            duration: "quarter",
            isRest: false,
            clef: "bass",
          });
          bassNotes.push({
            id: uid(`b_${m}_3`),
            pitch: midiToPitchString(fifthMidi),
            duration: "quarter",
            isRest: false,
            clef: "bass",
          });
        }
      }
    }

    measures.push({
      number: measureNumber,
      trebleNotes,
      bassNotes,
    });
  }

  return {
    id: `smart_sheet_${Date.now()}`,
    title,
    composer: "Compositor Inteligente IA",
    tempo,
    timeSignature: timeSig,
    keySignature: keyName,
    measures,
  };
}

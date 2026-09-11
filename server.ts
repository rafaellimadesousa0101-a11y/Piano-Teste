import express from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI, Type } from "@google/genai";
import { createServer as createViteServer } from "vite";
import { composeCustomSheetFromPrompt } from "./server/smartComposer";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return null;
  }
  if (!aiClient) {
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

// API: Generate Sheet Music with AI (Guaranteed Zero Impediment)
app.post("/api/generate-sheet", async (req, res) => {
  const {
    prompt = "",
    timeSignature = "auto",
    keySignature = "auto",
    tempo = 100,
    clef = "both",
    difficulty = "facil",
    measureCount = 8,
  } = req.body || {};

  const cleanPrompt = (prompt || "").trim() || "Uma composição livre, agradável e melódica para piano solo";

  // Try with Gemini API first if configured
  try {
    const ai = getGeminiClient();
    if (ai) {
      const isBothHands = clef === "both" || !clef;

      const systemPrompt = `Você é um compositor musical supremo e professor de piano virtuosístico.
Sua missão é compor uma partitura personalizada de piano completa, bela, harmoniosa e com correta teoria musical a partir de QUALQUER comando, ideia, gênero ou sentimento digitado pelo usuário.
Você nunca se recusa a compor: seja uma ideia abstrata, tema de anime, jogo, trilha de filme, choro, bossa, lofi, valsa, pop, jazz, clássico, barroco, rock, ou notas específicas.

Regras estruturais:
- Compassos (measures) matematicamente exatos. Em 4/4 cada compasso soma 4 tempos; em 3/4 soma 3 tempos; em 2/4 soma 2 tempos.
- Tempos das notas:
  * "whole": 4 tempos
  * "half": 2 tempos
  * "quarter": 1 tempo
  * "eighth": 0.5 tempo
  * "sixteenth": 0.25 tempo
  * "thirtysecond": 0.125 tempo
  * "dotted": true adiciona 50% ao tempo da nota (ex: quarter dotted = 1.5 tempo, half dotted = 3 tempos).
- Notas (pitch): formato padrão com oitava e acidentes (ex: "C4" dó central, "D4", "E4", "F#4", "Bb3", "G#3", "Eb4", "A2", "C3", etc.). Em pausas use "" ou omitir.
- Pausas: isRest: true.
- Clave de Sol (trebleNotes): mão direita com a melodia principal ou arpejos (C4 a C6).
- Clave de Fá (bassNotes): mão esquerda com baixos de sustentação, acordes ou contraponto (C2 a G3).
- Se a clave for "both", gere OBRIGATORIAMENTE notas na mão direita E notas na mão esquerda em todos os compassos para soar como piano de verdade!
- Gere entre ${measureCount || 8} compassos coerentes com início, desenvolvimento e resolução harmônica.`;

      const userInstruction = `Comando do usuário: "${cleanPrompt}".
Fórmula de Compasso solicitada: ${timeSignature === "auto" ? "Escolha a mais adequada ao estilo (4/4, 3/4 ou 2/4)" : timeSignature}.
Tonalidade (Key Signature): ${keySignature === "auto" ? "Escolha a mais adequada (ou livre)" : keySignature}.
Andamento aproximado: ${tempo} BPM.
Clave / Mãos: ${clef === "both" ? "Ambas as mãos (Clave de Sol e Fá simultâneas)" : clef === "treble" ? "Apenas Clave de Sol" : "Apenas Clave de Fá"}.
Dificuldade: ${difficulty}.
Número de compassos: ${measureCount || 8}.

Componha a partitura personalizada que corresponda fielmente a este comando e retorne estritamente em JSON.`;

      const response = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: userInstruction,
        config: {
          systemInstruction: systemPrompt,
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING, description: "Título poético ou característico da composição" },
              composer: { type: Type.STRING, description: "Assinatura do compositor (ex: 'IA Maestro', 'Inspirado em Chopin')" },
              tempo: { type: Type.INTEGER, description: "Andamento em BPM (60 a 160)" },
              timeSignature: { type: Type.STRING, description: "'4/4', '3/4' ou '2/4'" },
              keySignature: { type: Type.STRING, description: "Tonalidade (ex: 'C', 'Am', 'G', 'Dm', 'F', 'Em')" },
              measures: {
                type: Type.ARRAY,
                description: "Lista sequencial de compassos",
                items: {
                  type: Type.OBJECT,
                  properties: {
                    number: { type: Type.INTEGER, description: "Número do compasso (1, 2, 3...)" },
                    trebleNotes: {
                      type: Type.ARRAY,
                      description: "Notas na mão direita (clave de sol)",
                      items: {
                        type: Type.OBJECT,
                        properties: {
                          pitch: { type: Type.STRING, description: "Nota ex: 'C4', 'E4', 'G4', 'F#4' ou '' se pausa" },
                          duration: { type: Type.STRING, description: "'whole', 'half', 'quarter', 'eighth', 'sixteenth', 'thirtysecond'" },
                          dotted: { type: Type.BOOLEAN, description: "Verdadeiro se for nota pontuada" },
                          isRest: { type: Type.BOOLEAN, description: "Verdadeiro se for pausa" },
                        },
                        required: ["pitch", "duration", "isRest"],
                      },
                    },
                    bassNotes: {
                      type: Type.ARRAY,
                      description: "Notas na mão esquerda (clave de fá)",
                      items: {
                        type: Type.OBJECT,
                        properties: {
                          pitch: { type: Type.STRING, description: "Nota ex: 'C3', 'G2', 'C2', 'F2' ou '' se pausa" },
                          duration: { type: Type.STRING, description: "'whole', 'half', 'quarter', 'eighth', 'sixteenth', 'thirtysecond'" },
                          dotted: { type: Type.BOOLEAN, description: "Verdadeiro se for nota pontuada" },
                          isRest: { type: Type.BOOLEAN, description: "Verdadeiro se for pausa" },
                        },
                        required: ["pitch", "duration", "isRest"],
                      },
                    },
                  },
                  required: isBothHands ? ["number", "trebleNotes", "bassNotes"] : ["number", "trebleNotes"],
                },
              },
            },
            required: ["title", "tempo", "timeSignature", "keySignature", "measures"],
          },
        },
      });

      const rawJson = response.text || "{}";
      const sheetData = JSON.parse(rawJson);

      if (sheetData && Array.isArray(sheetData.measures) && sheetData.measures.length > 0) {
        // Sanitize and normalize notes
        sheetData.measures.forEach((m: any, mIdx: number) => {
          if (!m.number) m.number = mIdx + 1;
          if (Array.isArray(m.trebleNotes)) {
            m.trebleNotes.forEach((n: any, nIdx: number) => {
              if (!n.id) n.id = `ai_treble_${mIdx}_${nIdx}_${Math.random().toString(36).substring(2, 7)}`;
              n.clef = "treble";
            });
          } else {
            m.trebleNotes = [];
          }

          if (Array.isArray(m.bassNotes)) {
            m.bassNotes.forEach((n: any, nIdx: number) => {
              if (!n.id) n.id = `ai_bass_${mIdx}_${nIdx}_${Math.random().toString(36).substring(2, 7)}`;
              n.clef = "bass";
            });
          } else {
            m.bassNotes = [];
          }

          if (isBothHands && m.bassNotes.length === 0) {
            const bassDuration = sheetData.timeSignature === "3/4" ? "half" : sheetData.timeSignature === "2/4" ? "half" : "whole";
            m.bassNotes = [
              {
                id: `ai_bass_auto_${mIdx}_0_${Math.random().toString(36).substring(2, 7)}`,
                pitch: mIdx % 2 === 0 ? "C3" : "G2",
                duration: bassDuration,
                isRest: false,
                clef: "bass",
              },
            ];
          }
        });

        return res.json({
          success: true,
          sheet: sheetData,
          source: "gemini-3.6-flash",
        });
      }
    }
  } catch (geminiError: any) {
    console.warn("Aviso: Gemini API indisponível ou retornou formato alternativo, gerando com motor procedural inteligente:", geminiError?.message);
  }

  // Guaranteed fallback: Procedural Smart Composer engine creates a bespoke sheet tailored to the prompt!
  try {
    const customSheet = composeCustomSheetFromPrompt(cleanPrompt, {
      timeSignature: timeSignature as any,
      tempo,
      clef: clef as any,
      difficulty: difficulty as any,
      measureCount: Number(measureCount) || 8,
    });

    return res.json({
      success: true,
      sheet: customSheet,
      source: "smart-composer",
    });
  } catch (fallbackError: any) {
    console.error("Erro inesperado no compositor:", fallbackError);
    // Even in an edge case, return a safe minimal sheet so user is never blocked
    return res.json({
      success: true,
      sheet: {
        id: `emergency_${Date.now()}`,
        title: "Inspiração Musical",
        composer: "Compositor IA",
        tempo: 100,
        timeSignature: "4/4",
        keySignature: "C",
        measures: [
          {
            number: 1,
            trebleNotes: [
              { id: "e1", pitch: "C4", duration: "quarter", isRest: false, clef: "treble" },
              { id: "e2", pitch: "E4", duration: "quarter", isRest: false, clef: "treble" },
              { id: "e3", pitch: "G4", duration: "quarter", isRest: false, clef: "treble" },
              { id: "e4", pitch: "C5", duration: "quarter", isRest: false, clef: "treble" },
            ],
            bassNotes: [
              { id: "eb1", pitch: "C3", duration: "whole", isRest: false, clef: "bass" },
            ],
          },
        ],
      },
      source: "fallback",
    });
  }
});

// Start server with Vite middleware in dev or static files in production
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        hmr: false,
        watch: null,
      },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
  });
}

startServer();

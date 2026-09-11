import React, { useState, useEffect } from "react";
import { SheetMusic } from "../types";
import { Sparkles, X, Wand2, Loader2, Dices, Music2, Gauge, BookOpen } from "lucide-react";

interface AiGeneratorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplySheet: (sheet: SheetMusic) => void;
}

const SURPRISE_PROMPTS = [
  "Uma valsa romântica nostálgica em Lá menor com arpejos suaves na mão esquerda",
  "Tema épico de batalha anime com ritmo enérgico e baixo pulsante",
  "Bossa Nova elegante e suave em Dó maior para piano de bar",
  "Choro brasileiro vibrante em Sol maior com síncopas e contraponto ágil",
  "Melodia medieval misteriosa de castelo com notas sustentadas",
  "Canção de ninar relaxante com movimento suave de ondas",
  "Estudo clássico virtuoso com semicolcheias rápidas estilo Mozart",
  "Balada pop emocionante com acordes cheios e melodia cativante",
  "Trilha sonora cinematográfica de chuva e contemplação em Ré menor",
  "Videogame retrô 8-bit com melodia saltitante e alegre",
  "Blues noturno com notas azuis e walking bass lento",
  "Prelúdio barroco contrapontístico com duas vozes independentes",
];

const STYLE_CHIPS = [
  { label: "🌟 Clássico", prompt: "Estilo clássico equilibrado e harmonioso" },
  { label: "⚔️ Épico / Anime", prompt: "Tema épico dramático e heroico com baixos potentes" },
  { label: "🎷 Jazz & Bossa", prompt: "Bossa nova sofisticada com acordes de sétima" },
  { label: "🌧️ Melancolia & Chuva", prompt: "Melodia triste e poética em tom menor" },
  { label: "🎮 8-Bit Retrô", prompt: "Música de videogame rápida e divertida" },
  { label: "🌿 Lo-Fi & Estudo", prompt: "Piano lo-fi calmo, relaxante e aconchegante" },
  { label: "💃 Valsa Romântica", prompt: "Valsa ternária suave e lírica" },
  { label: "🇧🇷 Choro Brasileiro", prompt: "Choro tradicional com ritmo vivo e sincopado" },
  { label: "⚡ Virtuoso", prompt: "Passagem rápida com semicolcheias e arpejos" },
  { label: "🌙 Canção de Ninar", prompt: "Canção de ninar doce e serena para piano solo" },
];

const LOADING_MESSAGES = [
  "Interpretando ideias musicais e tonalidade...",
  "Compondo melodia expressiva e contraponto...",
  "Harmonizando acompanhamento para as duas mãos...",
  "Formatando compassos e articulações da partitura...",
];

export const AiGeneratorModal: React.FC<AiGeneratorModalProps> = React.memo(({
  isOpen,
  onClose,
  onApplySheet,
}) => {
  const [prompt, setPrompt] = useState("");
  const [timeSignature, setTimeSignature] = useState<"auto" | "4/4" | "3/4" | "2/4">("auto");
  const [keySignature, setKeySignature] = useState<string>("auto");
  const [tempo, setTempo] = useState<number>(108);
  const [clef, setClef] = useState<"both" | "treble" | "bass">("both");
  const [systemCount, setSystemCount] = useState<number>(3); // 3 systems = 9 measures
  const [difficulty, setDifficulty] = useState<"facil" | "medio">("facil");
  const [isLoading, setIsLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [feedback, setFeedback] = useState<string | null>(null);

  // Cycle loading messages
  useEffect(() => {
    if (!isLoading) return;
    const interval = setInterval(() => {
      setLoadingStep((s) => (s + 1) % LOADING_MESSAGES.length);
    }, 1800);
    return () => clearInterval(interval);
  }, [isLoading]);

  if (!isOpen) return null;

  const handleSurpriseMe = () => {
    const randomPrompt = SURPRISE_PROMPTS[Math.floor(Math.random() * SURPRISE_PROMPTS.length)];
    setPrompt(randomPrompt);
    setFeedback(null);
  };

  const handleChipClick = (chipPrompt: string) => {
    if (!prompt.trim()) {
      setPrompt(chipPrompt);
    } else {
      setPrompt((prev) => `${prev.trim()}, ${chipPrompt.toLowerCase()}`);
    }
    setFeedback(null);
  };

  const handleGenerate = async () => {
    // Zero impediment: if empty, pick a creative prompt automatically!
    const effectivePrompt = prompt.trim() || SURPRISE_PROMPTS[Math.floor(Math.random() * SURPRISE_PROMPTS.length)];
    if (!prompt.trim()) {
      setPrompt(effectivePrompt);
    }

    setIsLoading(true);
    setFeedback(null);

    try {
      const response = await fetch("/api/generate-sheet", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: effectivePrompt,
          timeSignature,
          keySignature,
          tempo,
          clef,
          difficulty,
          measureCount: systemCount * 3,
        }),
      });

      const data = await response.json();

      if (data && data.sheet) {
        onApplySheet(data.sheet);
        onClose();
      } else {
        // If anything fails to parse, fallback to smart composer directly on client
        throw new Error("Não foi possível gerar");
      }
    } catch (err: any) {
      // In extreme case, request fallback directly
      console.warn("Retrying with fallback parameters...", err);
      try {
        const retryRes = await fetch("/api/generate-sheet", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ prompt: effectivePrompt }),
        });
        const retryData = await retryRes.json();
        if (retryData?.sheet) {
          onApplySheet(retryData.sheet);
          onClose();
          return;
        }
      } catch (innerErr) {
        setFeedback("Não foi possível processar. Tente novamente em instantes.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/60 backdrop-blur-xs p-4 animate-in fade-in duration-200">
      <div
        id="ai-generator-modal"
        className="bg-white rounded-2xl shadow-2xl border border-stone-200 max-w-xl w-full p-6 relative flex flex-col gap-4 max-h-[92vh] overflow-y-auto"
      >
        {/* Close button */}
        <button
          id="btn-close-ai-modal"
          type="button"
          onClick={onClose}
          disabled={isLoading}
          className="absolute top-4 right-4 text-stone-400 hover:text-stone-700 transition-colors p-1.5 rounded-lg hover:bg-stone-100 disabled:opacity-50"
          aria-label="Fechar"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center ring-1 ring-amber-500/20 shadow-xs">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-stone-900 flex items-center gap-2">
              Compositor Inteligente com IA
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-200">
                Livre & Ilimitado
              </span>
            </h3>
            <p className="text-xs text-stone-500">
              Digite qualquer comando, estilo, sentimento ou ideia. A IA gerará uma partitura personalizada instantaneamente.
            </p>
          </div>
        </div>

        {/* Prompt Input Area */}
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between">
            <label htmlFor="ai-prompt-input" className="text-xs font-semibold text-stone-700 flex items-center gap-1.5">
              <Music2 className="w-3.5 h-3.5 text-amber-600" />
              O que você gostaria de compor?
            </label>
            <button
              type="button"
              onClick={handleSurpriseMe}
              disabled={isLoading}
              className="inline-flex items-center gap-1 text-[11px] font-medium text-amber-700 hover:text-amber-800 bg-amber-50 hover:bg-amber-100 px-2 py-0.5 rounded-md border border-amber-200/70 transition-colors cursor-pointer"
            >
              <Dices className="w-3.5 h-3.5" />
              Surpreenda-me
            </button>
          </div>

          <textarea
            id="ai-prompt-input"
            rows={3}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            disabled={isLoading}
            placeholder="Ex: Uma melodia nostálgica e doce de piano em Lá menor, com arpejos suaves e ritmo fluido..."
            className="w-full text-sm p-3 rounded-xl border border-stone-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 outline-hidden transition-all placeholder:text-stone-400 bg-stone-50/50 focus:bg-white resize-y min-h-[76px]"
          />
        </div>

        {/* Quick Style Chips */}
        <div className="flex flex-col gap-1.5">
          <span className="text-[11px] font-medium text-stone-500">
            Inspirações Rápidas (clique para adicionar):
          </span>
          <div className="flex flex-wrap gap-1.5">
            {STYLE_CHIPS.map((chip) => (
              <button
                key={chip.label}
                type="button"
                onClick={() => handleChipClick(chip.prompt)}
                disabled={isLoading}
                className="text-[11px] px-2.5 py-1 rounded-full bg-stone-100 hover:bg-amber-100/80 hover:text-amber-900 text-stone-700 transition-colors border border-stone-200/80 cursor-pointer disabled:opacity-50"
              >
                {chip.label}
              </button>
            ))}
          </div>
        </div>

        {/* Fine-Tuning Controls Accordion / Panel */}
        <div className="bg-stone-50 p-3 rounded-xl border border-stone-200 space-y-2.5">
          <div className="flex items-center justify-between text-xs font-semibold text-stone-700 border-b border-stone-200/70 pb-1.5">
            <span className="flex items-center gap-1.5">
              <Gauge className="w-3.5 h-3.5 text-stone-500" />
              Configurações Opcionais
            </span>
            <span className="text-[10px] text-stone-400 font-normal">
              Ajuste ou deixe a IA decidir
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
            {/* Compasso */}
            <div className="flex flex-col gap-1">
              <label className="text-[10px] font-semibold text-stone-600">
                Fórmula de Compasso
              </label>
              <select
                value={timeSignature}
                onChange={(e) => setTimeSignature(e.target.value as any)}
                disabled={isLoading}
                className="text-xs p-1.5 bg-white rounded-lg border border-stone-300 focus:border-amber-500 outline-hidden"
              >
                <option value="auto">Auto (Detectar)</option>
                <option value="4/4">4/4</option>
                <option value="3/4">3/4</option>
                <option value="2/4">2/4</option>
              </select>
            </div>

            {/* Tonalidade */}
            <div className="flex flex-col gap-1">
              <label className="text-[10px] font-semibold text-stone-600">
                Tonalidade
              </label>
              <select
                value={keySignature}
                onChange={(e) => setKeySignature(e.target.value)}
                disabled={isLoading}
                className="text-xs p-1.5 bg-white rounded-lg border border-stone-300 focus:border-amber-500 outline-hidden"
              >
                <option value="auto">Auto</option>
                <option value="C">C / Am</option>
                <option value="G">G / Em</option>
                <option value="D">D / Bm</option>
                <option value="A">A / F#m</option>
                <option value="F">F / Dm</option>
                <option value="Bb">Bb / Gm</option>
                <option value="Eb">Eb / Cm</option>
              </select>
            </div>

            {/* Claves / Mãos */}
            <div className="flex flex-col gap-1">
              <label className="text-[10px] font-semibold text-stone-600">
                Mãos / Claves
              </label>
              <select
                value={clef}
                onChange={(e) => setClef(e.target.value as any)}
                disabled={isLoading}
                className="text-xs p-1.5 bg-white rounded-lg border border-stone-300 focus:border-amber-500 outline-hidden"
              >
                <option value="both">Sol + Fá (2 Mãos)</option>
                <option value="treble">Apenas Sol (Mão Dir.)</option>
                <option value="bass">Apenas Fá (Mão Esq.)</option>
              </select>
            </div>

            {/* Extensão / Sistemas */}
            <div className="flex flex-col gap-1">
              <label className="text-[10px] font-semibold text-stone-600">
                Sistemas (Linhas)
              </label>
              <select
                value={systemCount}
                onChange={(e) => setSystemCount(Number(e.target.value))}
                disabled={isLoading}
                className="text-xs p-1.5 bg-white rounded-lg border border-stone-300 focus:border-amber-500 outline-hidden"
              >
                <option value={1}>1 Sistema (Curto)</option>
                <option value={2}>2 Sistemas</option>
                <option value={3}>3 Sistemas (Padrão)</option>
                <option value={4}>4 Sistemas</option>
                <option value={5}>5 Sistemas</option>
                <option value={6}>6 Sistemas (Longo)</option>
              </select>
            </div>

            {/* Andamento */}
            <div className="flex flex-col gap-1">
              <label className="text-[10px] font-semibold text-stone-600">
                Andamento (BPM)
              </label>
              <select
                value={tempo}
                onChange={(e) => setTempo(Number(e.target.value))}
                disabled={isLoading}
                className="text-xs p-1.5 bg-white rounded-lg border border-stone-300 focus:border-amber-500 outline-hidden"
              >
                <option value={72}>Lento (72 BPM)</option>
                <option value={92}>Andante (92 BPM)</option>
                <option value={108}>Moderato (108 BPM)</option>
                <option value={126}>Allegro (126 BPM)</option>
                <option value={144}>Presto (144 BPM)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Feedback / Alert */}
        {feedback && (
          <div className="p-3 bg-amber-50 text-amber-800 text-xs rounded-xl border border-amber-200">
            {feedback}
          </div>
        )}

        {/* Loading status display */}
        {isLoading && (
          <div className="p-3 bg-amber-50/80 rounded-xl border border-amber-200/80 flex items-center gap-3 animate-pulse">
            <Loader2 className="w-5 h-5 text-amber-600 animate-spin shrink-0" />
            <div className="flex flex-col">
              <span className="text-xs font-bold text-amber-900">
                Compondo sua partitura com IA...
              </span>
              <span className="text-[11px] text-amber-700">
                {LOADING_MESSAGES[loadingStep]}
              </span>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-2 pt-2 border-t border-stone-100">
          <button
            type="button"
            onClick={onClose}
            disabled={isLoading}
            className="px-4 py-2 text-xs font-semibold text-stone-600 hover:bg-stone-100 rounded-xl transition-colors disabled:opacity-50 cursor-pointer"
          >
            Cancelar
          </button>

          <button
            id="btn-submit-generate"
            type="button"
            onClick={handleGenerate}
            disabled={isLoading}
            className="flex items-center gap-2 px-6 py-2.5 text-xs font-bold text-white bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 disabled:opacity-50 rounded-xl shadow-md shadow-amber-500/20 transition-all cursor-pointer hover:shadow-lg"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Gerando partitura...</span>
              </>
            ) : (
              <>
                <Wand2 className="w-4 h-4" />
                <span>Gerar Partitura Personalizada</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
});

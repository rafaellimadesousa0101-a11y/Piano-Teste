import React, { useState, useMemo } from "react";
import { SheetMusic } from "../types";
import { PRESET_SHEET_MUSICS } from "../data/presets";
import {
  Music,
  Search,
  X,
  Sparkles,
  Check,
  Disc,
  Clock,
  Layers,
  ChevronRight,
  BookOpen,
} from "lucide-react";

interface ScoreSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectScore: (score: SheetMusic) => void;
  currentScoreId?: string;
}

type CategoryFilter = "all" | "anime" | "piano" | "cinema" | "classical";

export const ScoreSelectorModal: React.FC<ScoreSelectorModalProps> = React.memo(({
  isOpen,
  onClose,
  onSelectScore,
  currentScoreId,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>("all");

  // Helper to categorize items
  const categorizedScores = useMemo(() => {
    return PRESET_SHEET_MUSICS.map((score) => {
      const id = score.id || "";
      const titleLower = score.title.toLowerCase();
      const composerLower = score.composer.toLowerCase();

      let group: "anime" | "piano" | "cinema" | "classical" = "classical";

      if (
        id.includes("naruto") ||
        id.includes("ghibli") ||
        id.includes("demon-slayer") ||
        titleLower.includes("naruto") ||
        titleLower.includes("kiki") ||
        titleLower.includes("animado")
      ) {
        group = "anime";
      } else if (
        score.category === "solo" ||
        score.category === "reduction" ||
        id.includes("chopin") ||
        id.includes("debussy") ||
        id.includes("yiruma") ||
        id.includes("satie") ||
        id.includes("joplin") ||
        id.includes("moonlight") ||
        id.includes("reduction")
      ) {
        group = "piano";
      } else if (
        [
          "harry-potter",
          "star-wars",
          "titanic",
          "godfather",
          "pirates",
          "interstellar",
          "jurassic-park",
          "avengers",
          "phantom-opera",
          "mission-impossible",
          "beauty-and-the-beast",
        ].includes(id) ||
        composerLower.includes("zimmer") ||
        composerLower.includes("williams")
      ) {
        group = "cinema";
      }

      return {
        ...score,
        group,
      };
    });
  }, []);

  // Filtered list
  const filteredScores = useMemo(() => {
    return categorizedScores.filter((score) => {
      const matchesCategory =
        activeCategory === "all" || score.group === activeCategory;

      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        score.title.toLowerCase().includes(q) ||
        score.composer.toLowerCase().includes(q) ||
        (score.description && score.description.toLowerCase().includes(q));

      return matchesCategory && matchesSearch;
    });
  }, [categorizedScores, activeCategory, searchQuery]);

  if (!isOpen) return null;

  return (
    <div
      id="score-selector-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-stone-900/60 backdrop-blur-xs animate-in fade-in duration-200"
    >
      <div
        id="score-selector-modal-card"
        className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-2xl shadow-2xl border border-stone-200 flex flex-col overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-stone-100 bg-stone-50/70">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500 text-stone-950 flex items-center justify-center shadow-xs">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-stone-900 font-serif">
                Biblioteca de Partituras Completas
              </h2>
              <p className="text-xs text-stone-500 font-medium">
                {PRESET_SHEET_MUSICS.length} obras completas sem cortes • Grand Staff com clave de Sol e Fá
              </p>
            </div>
          </div>
          <button
            id="close-score-modal"
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-stone-400 hover:text-stone-700 hover:bg-stone-200/60 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search & Categories */}
        <div className="p-4 border-b border-stone-100 flex flex-col gap-3 bg-white">
          <div className="relative">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              id="search-score-input"
              type="text"
              placeholder="Buscar por título, compositor ou tema (ex: Naruto, Chopin, Ghibli, Beethoven)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-sm bg-stone-50 border border-stone-200 rounded-xl focus:outline-hidden focus:border-amber-500 focus:bg-white transition-colors"
            />
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs font-semibold">
            <button
              type="button"
              onClick={() => setActiveCategory("all")}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors cursor-pointer ${
                activeCategory === "all"
                  ? "bg-stone-900 text-white shadow-2xs"
                  : "bg-stone-100 text-stone-600 hover:bg-stone-200/80"
              }`}
            >
              Todas ({categorizedScores.length})
            </button>
            <button
              type="button"
              onClick={() => setActiveCategory("anime")}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors cursor-pointer flex items-center gap-1.5 ${
                activeCategory === "anime"
                  ? "bg-amber-600 text-white shadow-2xs"
                  : "bg-amber-50 text-amber-900 hover:bg-amber-100/80 border border-amber-200"
              }`}
            >
              <span>🍥</span> Naruto & Anime (
              {categorizedScores.filter((s) => s.group === "anime").length})
            </button>
            <button
              type="button"
              onClick={() => setActiveCategory("piano")}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors cursor-pointer flex items-center gap-1.5 ${
                activeCategory === "piano"
                  ? "bg-emerald-700 text-white shadow-2xs"
                  : "bg-emerald-50 text-emerald-900 hover:bg-emerald-100/80 border border-emerald-200"
              }`}
            >
              <span>🎹</span> Piano Solo & Reduções (
              {categorizedScores.filter((s) => s.group === "piano").length})
            </button>
            <button
              type="button"
              onClick={() => setActiveCategory("cinema")}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors cursor-pointer flex items-center gap-1.5 ${
                activeCategory === "cinema"
                  ? "bg-blue-700 text-white shadow-2xs"
                  : "bg-blue-50 text-blue-900 hover:bg-blue-100/80 border border-blue-200"
              }`}
            >
              <span>🎬</span> Cinema & Filmes (
              {categorizedScores.filter((s) => s.group === "cinema").length})
            </button>
            <button
              type="button"
              onClick={() => setActiveCategory("classical")}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors cursor-pointer flex items-center gap-1.5 ${
                activeCategory === "classical"
                  ? "bg-purple-700 text-white shadow-2xs"
                  : "bg-purple-50 text-purple-900 hover:bg-purple-100/80 border border-purple-200"
              }`}
            >
              <span>✨</span> Clássicos & Populares (
              {categorizedScores.filter((s) => s.group === "classical").length})
            </button>
          </div>
        </div>

        {/* List of Scores */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-2.5 bg-stone-50/50">
          {filteredScores.length === 0 ? (
            <div className="py-12 text-center text-stone-500">
              <Music className="w-10 h-10 mx-auto text-stone-300 mb-2" />
              <p className="font-semibold text-sm">Nenhuma partitura encontrada</p>
              <p className="text-xs text-stone-400">Tente ajustar o termo de pesquisa</p>
            </div>
          ) : (
            filteredScores.map((score) => {
              const isCurrent = score.id === currentScoreId;
              const totalNotes = score.measures.reduce(
                (sum, m) => sum + m.trebleNotes.length + m.bassNotes.length,
                0
              );

              return (
                <div
                  key={score.id}
                  onClick={() => {
                    onSelectScore(score);
                    onClose();
                  }}
                  className={`p-3.5 sm:p-4 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-4 ${
                    isCurrent
                      ? "bg-amber-50/80 border-amber-400 ring-2 ring-amber-400/20"
                      : "bg-white hover:bg-stone-50/90 border-stone-200 hover:border-stone-300 shadow-2xs"
                  }`}
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <h3 className="text-sm sm:text-base font-bold text-stone-900 font-serif leading-snug">
                        {score.title}
                      </h3>
                      {isCurrent && (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500 text-stone-950">
                          <Check className="w-3 h-3" /> Atual
                        </span>
                      )}
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-stone-100 text-stone-600 border border-stone-200">
                        {score.measures.length} Compassos • Completa
                      </span>
                    </div>

                    <p className="text-xs text-stone-600 font-medium mb-1.5">
                      <span className="text-stone-900 font-semibold">{score.composer}</span>
                      {score.description && ` — ${score.description}`}
                    </p>

                    <div className="flex items-center gap-3 text-[11px] text-stone-500 font-medium flex-wrap">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-stone-400" />
                        {score.tempo} BPM
                      </span>
                      <span>•</span>
                      <span>Fórmula: {score.timeSignature}</span>
                      <span>•</span>
                      <span>Tom: {score.keySignature}</span>
                      <span>•</span>
                      <span>{totalNotes} notas</span>
                    </div>
                  </div>

                  <div className="shrink-0 flex items-center gap-2">
                    <button
                      type="button"
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer flex items-center gap-1 ${
                        isCurrent
                          ? "bg-amber-500 text-stone-950 hover:bg-amber-600"
                          : "bg-stone-100 hover:bg-stone-200 text-stone-800"
                      }`}
                    >
                      <span>{isCurrent ? "Carregada" : "Abrir"}</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="px-5 py-3 border-t border-stone-100 bg-stone-50/70 flex items-center justify-between text-xs text-stone-500">
          <span>Todas as versões possuem notação completa para ambas as mãos (clave de Sol e Fá).</span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 bg-stone-200 hover:bg-stone-300 text-stone-800 rounded-lg font-semibold transition-colors cursor-pointer"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
});

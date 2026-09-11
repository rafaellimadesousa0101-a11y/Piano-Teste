import React from "react";
import { SheetMusic, ClefSelection } from "../types";
import { PRESET_SHEET_MUSICS } from "../data/presets";
import {
  Play,
  Pause,
  Square,
  Repeat,
  Sparkles,
  Music,
  Plus,
  Minus,
  Layers,
  Minimize2,
} from "lucide-react";

interface HeaderControlsProps {
  isPlaying: boolean;
  isLooping: boolean;
  bpm: number;
  handsMode: ClefSelection;
  onPlay: () => void;
  onPause: () => void;
  onStop: () => void;
  onToggleLoop: () => void;
  onChangeBpm: (bpm: number) => void;
  onSelectPreset: (preset: SheetMusic) => void;
  onSelectHandsMode: (mode: ClefSelection) => void;
  onOpenAiModal: () => void;
  onOpenReductionModal?: () => void;
  currentTitle: string;
}

export const HeaderControls: React.FC<HeaderControlsProps> = React.memo(({
  isPlaying,
  isLooping,
  bpm,
  handsMode,
  onPlay,
  onPause,
  onStop,
  onToggleLoop,
  onChangeBpm,
  onSelectPreset,
  onSelectHandsMode,
  onOpenAiModal,
  onOpenReductionModal,
  currentTitle,
}) => {
  return (
    <header
      id="app-header-controls"
      className="w-full bg-white border-b border-stone-200 px-3 sm:px-5 py-2 sm:py-2.5 shadow-xs sticky top-0 z-30"
    >
      <div className="max-w-7xl mx-auto flex flex-col gap-2">
        {/* Row 1: Brand & Top Action Modals (Presets, Redução, IA) */}
        <div className="flex flex-wrap items-center justify-between gap-2">
          {/* Logo & App Title */}
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-br from-stone-900 to-stone-700 flex items-center justify-center text-amber-400 shadow-xs shrink-0">
              <Music className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h1 className="text-sm sm:text-base md:text-lg font-bold text-stone-900 leading-tight font-serif truncate">
                  Piano Grand Staff
                </h1>
                <span className="hidden sm:inline-block text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-stone-100 text-stone-600 border border-stone-200">
                  Sol & Fá
                </span>
              </div>
              <p className="text-[10px] sm:text-xs text-stone-500 font-medium truncate hidden md:block">
                Partitura Grand Staff com acordes empilhados, polifonia e reduções para piano
              </p>
            </div>
          </div>

          {/* Quick Preset Selector, Reduction & AI Buttons */}
          <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap sm:flex-nowrap shrink-0">
            {/* Presets dropdown */}
            <select
              id="preset-select"
              onChange={(e) => {
                const found = PRESET_SHEET_MUSICS.find((p) => p.id === e.target.value);
                if (found && typeof onSelectPreset === "function") {
                  onSelectPreset(found);
                }
              }}
              value={
                PRESET_SHEET_MUSICS.some((p) => p.title === currentTitle)
                  ? PRESET_SHEET_MUSICS.find((p) => p.title === currentTitle)?.id
                  : ""
              }
              className="text-xs font-semibold py-1.5 px-2 sm:px-2.5 bg-stone-100 hover:bg-stone-200/80 border border-stone-300 rounded-lg text-stone-800 focus:outline-hidden focus:border-amber-500 cursor-pointer w-36 sm:w-52 md:w-60 truncate shrink-0"
              title="Escolha uma partitura completa para carregar"
            >
              <option value="" disabled>
                Carregar Partituras ({PRESET_SHEET_MUSICS.length})...
              </option>
              <optgroup label="🎹 Piano Solo & Reduções a 2 Mãos">
                {PRESET_SHEET_MUSICS.filter(
                  (p) => p.category === "solo" || p.category === "reduction"
                ).map((preset) => (
                  <option key={preset.id} value={preset.id}>
                    {preset.category === "reduction" ? "🎼 [Redução] " : "🎹 [Solo] "}
                    {preset.title}
                  </option>
                ))}
              </optgroup>
              <optgroup label="🎬 Cinema & Temas de Filmes">
                {PRESET_SHEET_MUSICS.filter((p) =>
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
                  ].includes(p.id || "")
                ).map((preset) => (
                  <option key={preset.id} value={preset.id}>
                    {preset.title}
                  </option>
                ))}
              </optgroup>
              <optgroup label="🎮 Games & Obras Clássicas">
                {PRESET_SHEET_MUSICS.filter(
                  (p) =>
                    p.category !== "solo" &&
                    p.category !== "reduction" &&
                    ![
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
                    ].includes(p.id || "")
                ).map((preset) => (
                  <option key={preset.id} value={preset.id}>
                    {preset.title}
                  </option>
                ))}
              </optgroup>
            </select>

            {/* Piano Reduction Button */}
            {onOpenReductionModal && (
              <button
                id="btn-header-reduction"
                type="button"
                onClick={onOpenReductionModal}
                className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-bold bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 shadow-2xs transition-colors shrink-0 cursor-pointer"
                title="Reduzir orquestra, coral ou melodia para piano a 2 mãos"
              >
                <Minimize2 className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                <span>Redução</span>
              </button>
            )}

            {/* AI Generator Button */}
            <button
              id="btn-header-ai"
              type="button"
              onClick={onOpenAiModal}
              className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-bold bg-amber-600 hover:bg-amber-700 text-white shadow-2xs transition-colors shrink-0 cursor-pointer"
              title="Gerar partitura com Inteligência Artificial"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-200 shrink-0" />
              <span className="hidden xs:inline sm:inline">IA</span>
            </button>
          </div>
        </div>

        {/* Row 2: Playback Bar, Hands Mode Selector & BPM Slider */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-stone-100">
          {/* Playback Controls (Play/Pause, Stop, Loop) */}
          <div className="flex items-center gap-1.5 shrink-0">
            <button
              id="btn-play-pause"
              type="button"
              onClick={isPlaying ? onPause : onPlay}
              className={`flex items-center gap-1.5 px-3 sm:px-4 py-1.5 rounded-lg text-xs font-bold transition-all shadow-xs shrink-0 cursor-pointer ${
                isPlaying
                  ? "bg-amber-600 hover:bg-amber-700 text-white"
                  : "bg-emerald-600 hover:bg-emerald-700 text-white"
              }`}
              title={isPlaying ? "Pausar reprodução" : "Tocar partitura"}
            >
              {isPlaying ? (
                <>
                  <Pause className="w-3.5 h-3.5 fill-white shrink-0" />
                  <span>Pausar</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 fill-white shrink-0" />
                  <span>Tocar</span>
                </>
              )}
            </button>

            <button
              id="btn-stop"
              type="button"
              onClick={onStop}
              className="p-1.5 rounded-lg text-stone-600 hover:bg-stone-100 hover:text-stone-900 border border-transparent hover:border-stone-200 transition-colors shrink-0 cursor-pointer"
              title="Parar e voltar ao início"
            >
              <Square className="w-3.5 h-3.5 fill-stone-600" />
            </button>

            <button
              id="btn-loop"
              type="button"
              onClick={onToggleLoop}
              className={`p-1.5 rounded-lg border transition-colors shrink-0 cursor-pointer ${
                isLooping
                  ? "bg-amber-100 text-amber-900 border-amber-300 font-bold"
                  : "text-stone-600 border-transparent hover:bg-stone-100 hover:border-stone-200"
              }`}
              title={`Repetir continuamente (${isLooping ? "Ativado" : "Desativado"})`}
            >
              <Repeat className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Hands Selector for Playback (2 Mãos / Mão Dir. / Mão Esq.) */}
          <div className="flex items-center bg-stone-100 p-0.5 rounded-lg border border-stone-200 text-xs font-semibold shrink-0">
            <button
              id="btn-header-hands-both"
              type="button"
              onClick={() => onSelectHandsMode("both")}
              className={`px-2 sm:px-2.5 py-1 rounded-md transition-all flex items-center gap-1 cursor-pointer ${
                handsMode === "both"
                  ? "bg-amber-600 text-white font-bold shadow-xs"
                  : "text-stone-700 hover:text-stone-950"
              }`}
              title="Tocar com Ambas as Mãos simultaneamente (Sol + Fá)"
            >
              <Layers className="w-3 h-3 shrink-0" />
              <span>2 Mãos</span>
            </button>
            <button
              id="btn-header-hands-treble"
              type="button"
              onClick={() => onSelectHandsMode("treble")}
              className={`px-2 py-1 rounded-md transition-all cursor-pointer ${
                handsMode === "treble"
                  ? "bg-stone-900 text-white font-bold shadow-xs"
                  : "text-stone-700 hover:text-stone-950"
              }`}
              title="Tocar apenas Mão Direita (Clave de Sol)"
            >
              Mão Dir.
            </button>
            <button
              id="btn-header-hands-bass"
              type="button"
              onClick={() => onSelectHandsMode("bass")}
              className={`px-2 py-1 rounded-md transition-all cursor-pointer ${
                handsMode === "bass"
                  ? "bg-stone-900 text-white font-bold shadow-xs"
                  : "text-stone-700 hover:text-stone-950"
              }`}
              title="Tocar apenas Mão Esquerda (Clave de Fá)"
            >
              Mão Esq.
            </button>
          </div>

          {/* BPM Controls */}
          <div className="flex items-center gap-1.5 bg-stone-50 px-2.5 py-1 rounded-lg border border-stone-200 shrink-0">
            <span className="text-xs font-semibold text-stone-500 whitespace-nowrap">BPM:</span>
            <button
              type="button"
              onClick={() => onChangeBpm(Math.max(40, bpm - 5))}
              className="p-1 hover:bg-white rounded text-stone-700 border border-transparent hover:border-stone-200 cursor-pointer"
              title="Diminuir 5 BPM"
            >
              <Minus className="w-3 h-3" />
            </button>
            <input
              id="bpm-slider"
              type="range"
              min="50"
              max="180"
              value={bpm}
              onChange={(e) => onChangeBpm(parseInt(e.target.value, 10))}
              className="w-16 sm:w-24 h-1.5 bg-stone-300 rounded-lg appearance-none cursor-pointer accent-amber-600"
            />
            <button
              type="button"
              onClick={() => onChangeBpm(Math.min(220, bpm + 5))}
              className="p-1 hover:bg-white rounded text-stone-700 border border-transparent hover:border-stone-200 cursor-pointer"
              title="Aumentar 5 BPM"
            >
              <Plus className="w-3 h-3" />
            </button>
            <span className="font-mono text-xs font-bold text-stone-800 w-7 text-right">
              {bpm}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
});

import React, { useState } from "react";
import { SheetMusic } from "../types";
import {
  reduceScoreToPiano,
  ReductionOptions,
  DEFAULT_REDUCTION_OPTIONS,
} from "../utils/pianoReduction";
import { PIANO_SOLO_AND_REDUCTIONS } from "../data/presetsPiano";
import {
  Sliders,
  Sparkles,
  Layers,
  ArrowRight,
  Minimize2,
  X,
  BookOpen,
  CheckCircle2,
  Music4,
} from "lucide-react";

interface PianoReductionModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentSheet: SheetMusic;
  onApplyReduction: (reducedSheet: SheetMusic) => void;
  onSelectPreset?: (sheet: SheetMusic) => void;
}

export const PianoReductionModal: React.FC<PianoReductionModalProps> = React.memo(({
  isOpen,
  onClose,
  currentSheet,
  onApplyReduction,
  onSelectPreset,
}) => {
  const [options, setOptions] = useState<ReductionOptions>(DEFAULT_REDUCTION_OPTIONS);
  const [activeTab, setActiveTab] = useState<"convert" | "presets">("convert");

  if (!isOpen) return null;

  const handleRunReduction = () => {
    const reduced = reduceScoreToPiano(currentSheet, options);
    onApplyReduction(reduced);
    onClose();
  };

  const reductionPresets = PIANO_SOLO_AND_REDUCTIONS.filter(
    (p) => p.category === "reduction" || p.category === "solo"
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 border-b border-stone-200 bg-stone-50/90 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-700 shrink-0">
              <Minimize2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-serif font-bold text-stone-900 leading-tight">
                Redução para Piano & Arranjos
              </h3>
              <p className="text-[11px] sm:text-xs text-stone-500">
                Adapte orquestra, coro e melodias para 2 mãos no Grand Staff
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-stone-600 hover:bg-stone-200/60 rounded-lg transition-colors cursor-pointer"
            title="Fechar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-stone-200 px-4 sm:px-6 bg-white gap-3 sm:gap-6 text-xs font-semibold shrink-0">
          <button
            type="button"
            onClick={() => setActiveTab("convert")}
            className={`py-3 border-b-2 flex items-center gap-1.5 cursor-pointer transition-colors ${
              activeTab === "convert"
                ? "border-amber-600 text-amber-700"
                : "border-transparent text-stone-500 hover:text-stone-800"
            }`}
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>Reduzir Partitura Atual</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("presets")}
            className={`py-3 border-b-2 flex items-center gap-1.5 cursor-pointer transition-colors ${
              activeTab === "presets"
                ? "border-amber-600 text-amber-700"
                : "border-transparent text-stone-500 hover:text-stone-800"
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Biblioteca de Reduções & Solo</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          {activeTab === "convert" ? (
            <div className="space-y-4">
              {/* Concept description box */}
              <div className="p-3.5 bg-amber-50/80 rounded-xl border border-amber-200 text-xs text-stone-700 space-y-1.5">
                <div className="flex items-center gap-2 font-bold text-amber-900">
                  <Layers className="w-4 h-4 text-amber-700 shrink-0" />
                  <span>Redução Ativa: "{currentSheet.title}" ({currentSheet.measures.length} compassos)</span>
                </div>
                <p className="text-stone-600 text-[11px] leading-relaxed">
                  A redução distribui orquestra, vozes corais ou melodias nas duas mãos do piano, consolidando acordes harmônicos na Clave de Sol e gerando contra-cantos e baixos fundamentais na Clave de Fá.
                </p>
              </div>

              {/* Style Selector */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-stone-800 block">
                  Estilo de Redução Pianística:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setOptions((o) => ({ ...o, reductionStyle: "harmony_piano", bassPattern: "roots_and_fifths" }))}
                    className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                      options.reductionStyle === "harmony_piano"
                        ? "border-amber-500 bg-amber-50/80 ring-1 ring-amber-500 text-stone-900"
                        : "border-stone-200 hover:bg-stone-50 text-stone-700"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold">Harmonização Completa</span>
                      {options.reductionStyle === "harmony_piano" && (
                        <CheckCircle2 className="w-3.5 h-3.5 text-amber-600" />
                      )}
                    </div>
                    <span className="text-[10px] text-stone-500 mt-1 block">
                      Acordes na mão direita, baixos e quintas fundamentais na mão esquerda.
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setOptions((o) => ({ ...o, reductionStyle: "alberti_classical", bassPattern: "alberti" }))}
                    className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                      options.reductionStyle === "alberti_classical"
                        ? "border-amber-500 bg-amber-50/80 ring-1 ring-amber-500 text-stone-900"
                        : "border-stone-200 hover:bg-stone-50 text-stone-700"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold">Clássico / Alberti</span>
                      {options.reductionStyle === "alberti_classical" && (
                        <CheckCircle2 className="w-3.5 h-3.5 text-amber-600" />
                      )}
                    </div>
                    <span className="text-[10px] text-stone-500 mt-1 block">
                      Acompanhamento arpejado e fluido no estilo Mozart/Chopin.
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setOptions((o) => ({ ...o, reductionStyle: "satb_counterpoint", bassPattern: "octaves" }))}
                    className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                      options.reductionStyle === "satb_counterpoint"
                        ? "border-amber-500 bg-amber-50/80 ring-1 ring-amber-500 text-stone-900"
                        : "border-stone-200 hover:bg-stone-50 text-stone-700"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold">Polifonia SATB</span>
                      {options.reductionStyle === "satb_counterpoint" && (
                        <CheckCircle2 className="w-3.5 h-3.5 text-amber-600" />
                      )}
                    </div>
                    <span className="text-[10px] text-stone-500 mt-1 block">
                      Distribuição coral estrita com hastes divididas e oitavas de baixo.
                    </span>
                  </button>
                </div>
              </div>

              {/* Toggles */}
              <div className="space-y-2 pt-1">
                <label className="flex items-center justify-between p-3 rounded-xl border border-stone-200 hover:bg-stone-50 transition-colors cursor-pointer">
                  <div className="space-y-0.5 pr-2">
                    <span className="text-xs font-semibold text-stone-900 block">
                      Gerar Acompanhamento Pianístico se a Clave de Fá estiver vazia
                    </span>
                    <span className="text-[11px] text-stone-500 block">
                      Cria automaticamente baixos harmônicos e acordes correspondentes na mão esquerda
                    </span>
                  </div>
                  <input
                    type="checkbox"
                    checked={options.generateBassIfEmpty}
                    onChange={(e) =>
                      setOptions((prev) => ({
                        ...prev,
                        generateBassIfEmpty: e.target.checked,
                      }))
                    }
                    className="w-4 h-4 text-amber-600 rounded focus:ring-amber-500 border-stone-300 cursor-pointer shrink-0"
                  />
                </label>

                <label className="flex items-center justify-between p-3 rounded-xl border border-stone-200 hover:bg-stone-50 transition-colors cursor-pointer">
                  <div className="space-y-0.5 pr-2">
                    <span className="text-xs font-semibold text-stone-900 block">
                      Distribuir Vozes entre Clave de Sol e Fá
                    </span>
                    <span className="text-[11px] text-stone-500 block">
                      Notas abaixo do Dó central (C4) são alocadas para a mão esquerda
                    </span>
                  </div>
                  <input
                    type="checkbox"
                    checked={options.distributeVoicesToGrandStaff}
                    onChange={(e) =>
                      setOptions((prev) => ({
                        ...prev,
                        distributeVoicesToGrandStaff: e.target.checked,
                      }))
                    }
                    className="w-4 h-4 text-amber-600 rounded focus:ring-amber-500 border-stone-300 cursor-pointer shrink-0"
                  />
                </label>

                <label className="flex items-center justify-between p-3 rounded-xl border border-stone-200 hover:bg-stone-50 transition-colors cursor-pointer">
                  <div className="space-y-0.5 pr-2">
                    <span className="text-xs font-semibold text-stone-900 block">
                      Empilhar Acordes Simultâneos
                    </span>
                    <span className="text-[11px] text-stone-500 block">
                      Consolida notas que soam juntas na mesma haste harmônica
                    </span>
                  </div>
                  <input
                    type="checkbox"
                    checked={options.consolidateChordClusters}
                    onChange={(e) =>
                      setOptions((prev) => ({
                        ...prev,
                        consolidateChordClusters: e.target.checked,
                      }))
                    }
                    className="w-4 h-4 text-amber-600 rounded focus:ring-amber-500 border-stone-300 cursor-pointer shrink-0"
                  />
                </label>

                <label className="flex items-center justify-between p-3 rounded-xl border border-stone-200 hover:bg-stone-50 transition-colors cursor-pointer">
                  <div className="space-y-0.5 pr-2">
                    <span className="text-xs font-semibold text-stone-900 block">
                      Indicação de Arpejo (≀) em Aberturas Amplas
                    </span>
                    <span className="text-[11px] text-stone-500 block">
                      Adiciona linha ondulada para acordes enrolados/rolados
                    </span>
                  </div>
                  <input
                    type="checkbox"
                    checked={options.convertWideArpeggios}
                    onChange={(e) =>
                      setOptions((prev) => ({
                        ...prev,
                        convertWideArpeggios: e.target.checked,
                      }))
                    }
                    className="w-4 h-4 text-amber-600 rounded focus:ring-amber-500 border-stone-300 cursor-pointer shrink-0"
                  />
                </label>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <p className="text-xs text-stone-600">
                Selecione uma grande obra com redução para piano a 2 mãos ou arranjo solo:
              </p>
              <div className="grid grid-cols-1 gap-2.5">
                {reductionPresets.map((preset) => (
                  <div
                    key={preset.id}
                    className="p-3.5 rounded-xl border border-stone-200 hover:border-amber-400 hover:bg-amber-50/40 transition-all flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 group"
                  >
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h4 className="text-xs font-bold text-stone-900 truncate">
                          {preset.title}
                        </h4>
                        <span className="text-[10px] px-1.5 py-0.5 rounded font-semibold bg-stone-100 text-stone-700 border border-stone-200 shrink-0">
                          {preset.category === "reduction" ? "Redução Orquestral" : "Piano Solo"}
                        </span>
                      </div>
                      <p className="text-[11px] text-stone-500 font-medium mt-0.5">
                        {preset.composer} • {preset.timeSignature} • {preset.tempo} BPM • {preset.measures.length} compassos
                      </p>
                      {preset.description && (
                        <p className="text-[11px] text-stone-600 mt-1 line-clamp-2">
                          {preset.description}
                        </p>
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        if (typeof onSelectPreset === "function") {
                          onSelectPreset(preset);
                        } else if (typeof onApplyReduction === "function") {
                          onApplyReduction(preset);
                        }
                        onClose();
                      }}
                      className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-stone-900 hover:bg-amber-600 text-white transition-colors shrink-0 flex items-center justify-center gap-1.5 cursor-pointer self-end sm:self-center"
                    >
                      <Music4 className="w-3.5 h-3.5" />
                      <span>Carregar</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3 border-t border-stone-200 bg-stone-50 shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="px-3 py-1.5 rounded-lg text-xs font-medium text-stone-600 hover:text-stone-800 hover:bg-stone-200/50 cursor-pointer"
          >
            Fechar
          </button>
          {activeTab === "convert" && (
            <button
              type="button"
              onClick={handleRunReduction}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-amber-600 hover:bg-amber-700 text-white shadow-xs transition-all cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              <span>Aplicar Redução para Piano</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
});

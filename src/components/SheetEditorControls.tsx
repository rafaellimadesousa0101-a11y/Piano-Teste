import React from "react";
import { NoteDuration, ClefSelection, NoteItem, AccidentalType } from "../types";
import { formatPitchPt, getAllNotePitches, formatChordPt } from "../utils/musicNotation";
import {
  Trash2,
  Volume2,
  Sparkles,
  ArrowUp,
  ArrowDown,
  PlusCircle,
  MinusCircle,
  Layers,
  CircleDot,
  Minimize2,
  X,
} from "lucide-react";

interface SheetEditorControlsProps {
  currentDuration: NoteDuration;
  onSelectDuration: (duration: NoteDuration) => void;
  isDottedSelected: boolean;
  onToggleDotted: (dotted: boolean) => void;
  isRestSelected: boolean;
  onToggleRest: (isRest: boolean) => void;
  currentClef: ClefSelection;
  onSelectClef: (clef: ClefSelection) => void;
  currentAccidental: AccidentalType;
  onSelectAccidental: (acc: AccidentalType) => void;
  isPianoInsertMode: boolean;
  onTogglePianoInsertMode: () => void;
  selectedNote: NoteItem | null;
  selectedMeasureIndex: number | null;
  onDeleteSelectedNote: () => void;
  onTransposeSelectedNote: (semitones: number) => void;
  onToggleSelectedNoteDotted?: () => void;
  onPlayAudition: (pitch: string) => void;
  onAddMeasure: () => void;
  onRemoveMeasure: () => void;
  onClearSheet: () => void;
  onOpenAiModal: () => void;
  onOpenReductionModal?: () => void;
  onAddIntervalToSelectedNote?: (intervalType: "3M" | "3m" | "5J" | "8J" | "triadMaj" | "triadMin" | "dom7") => void;
  onRemovePitchFromSelectedNote?: (pitch: string) => void;
  onToggleSelectedArpeggio?: () => void;
  onSetSelectedStemDirection?: (direction: "up" | "down" | "auto") => void;
  onSetSelectedVoice?: (voice: 1 | 2 | undefined) => void;
}

export const SheetEditorControls: React.FC<SheetEditorControlsProps> = React.memo(({
  currentDuration,
  onSelectDuration,
  isDottedSelected,
  onToggleDotted,
  isRestSelected,
  onToggleRest,
  currentClef,
  onSelectClef,
  currentAccidental,
  onSelectAccidental,
  isPianoInsertMode,
  onTogglePianoInsertMode,
  selectedNote,
  selectedMeasureIndex,
  onDeleteSelectedNote,
  onTransposeSelectedNote,
  onToggleSelectedNoteDotted,
  onPlayAudition,
  onAddMeasure,
  onRemoveMeasure,
  onClearSheet,
  onOpenAiModal,
  onOpenReductionModal,
  onAddIntervalToSelectedNote,
  onRemovePitchFromSelectedNote,
  onToggleSelectedArpeggio,
  onSetSelectedStemDirection,
  onSetSelectedVoice,
}) => {
  const durations: { id: NoteDuration; label: string; shortLabel: string; icon: string; beats: string }[] = [
    { id: "whole", label: "Semibreve", shortLabel: "4t", icon: "𝅝", beats: "4t" },
    { id: "half", label: "Mínima", shortLabel: "2t", icon: "𝅗𝅥", beats: "2t" },
    { id: "quarter", label: "Semínima", shortLabel: "1t", icon: "♩", beats: "1t" },
    { id: "eighth", label: "Colcheia", shortLabel: "½t", icon: "♪", beats: "½t" },
    { id: "sixteenth", label: "Semicolcheia", shortLabel: "¼t", icon: "𝅘𝅥𝅯", beats: "¼t" },
    { id: "thirtysecond", label: "Fusa", shortLabel: "⅛t", icon: "𝅘𝅥𝅰", beats: "⅛t" },
  ];

  const selectedPitches = selectedNote ? getAllNotePitches(selectedNote) : [];
  const isChord = selectedPitches.length > 1;

  return (
    <div
      id="sheet-editor-controls"
      className="w-full bg-white rounded-xl border border-stone-200 shadow-xs p-3 sm:p-4 flex flex-col gap-3"
    >
      {/* Primary Notation Toolbar: Durations, Clef/Staff & Accidentals */}
      <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
        {/* Durations, Dotted & Rest Group */}
        <div className="flex items-center gap-1 bg-stone-100/90 p-1 rounded-lg border border-stone-200 shrink-0 flex-wrap">
          <span className="text-xs font-bold text-stone-500 px-1.5 whitespace-nowrap">
            Duração:
          </span>
          {durations.map((d) => {
            const active = currentDuration === d.id && !isRestSelected;
            return (
              <button
                key={d.id}
                id={`btn-duration-${d.id}`}
                type="button"
                onClick={() => {
                  onSelectDuration(d.id);
                  onToggleRest(false);
                }}
                className={`flex items-center gap-1 px-2 py-1.5 rounded-md text-xs font-semibold transition-all shrink-0 cursor-pointer ${
                  active
                    ? "bg-amber-500 text-white font-bold shadow-xs"
                    : "text-stone-700 hover:bg-white hover:text-stone-900"
                }`}
                title={`${d.label} (${d.beats})`}
              >
                <span className="text-sm leading-none">{d.icon}</span>
                <span className="hidden lg:inline">{d.label}</span>
                <span className="lg:hidden text-[11px]">{d.shortLabel}</span>
              </button>
            );
          })}

          {/* Dotted note toggle button */}
          <button
            id="btn-toggle-dotted"
            type="button"
            onClick={() => onToggleDotted(!isDottedSelected)}
            className={`flex items-center gap-1 px-2.5 py-1.5 rounded-md text-xs font-semibold transition-all shrink-0 cursor-pointer ${
              isDottedSelected
                ? "bg-amber-600 text-white font-bold shadow-xs"
                : "text-stone-700 hover:bg-white hover:text-stone-900"
            }`}
            title="Ponto de Aumento (+50% da duração da nota)"
          >
            <CircleDot className="w-3.5 h-3.5 shrink-0" />
            <span>Ponto</span>
          </button>

          {/* Rest Toggle Button */}
          <button
            id="btn-toggle-rest"
            type="button"
            onClick={() => onToggleRest(!isRestSelected)}
            className={`flex items-center gap-1 px-2.5 py-1.5 rounded-md text-xs font-semibold transition-all shrink-0 cursor-pointer ${
              isRestSelected
                ? "bg-stone-900 text-white font-bold shadow-xs"
                : "text-stone-700 hover:bg-white hover:text-stone-900"
            }`}
            title="Inserir pausa de tempo"
          >
            <span className="text-sm leading-none">𝄽</span>
            <span>Pausa</span>
          </button>
        </div>

        {/* Clef / Staff Selector (Sol / Fá / Sol + Fá) */}
        <div className="flex items-center gap-1 bg-stone-100/90 p-1 rounded-lg border border-stone-200 shrink-0">
          <span className="text-xs font-bold text-stone-500 px-1.5 whitespace-nowrap">
            Pauta:
          </span>
          <button
            id="btn-clef-treble"
            type="button"
            onClick={() => onSelectClef("treble")}
            className={`px-2 sm:px-2.5 py-1.5 rounded-md text-xs font-semibold transition-all whitespace-nowrap cursor-pointer ${
              currentClef === "treble"
                ? "bg-amber-600 text-white shadow-xs"
                : "text-stone-700 hover:bg-white"
            }`}
            title="Clave de Sol (Mão Direita)"
          >
            Sol <span className="hidden sm:inline">(Mão Dir.)</span>
          </button>
          <button
            id="btn-clef-bass"
            type="button"
            onClick={() => onSelectClef("bass")}
            className={`px-2 sm:px-2.5 py-1.5 rounded-md text-xs font-semibold transition-all whitespace-nowrap cursor-pointer ${
              currentClef === "bass"
                ? "bg-amber-600 text-white shadow-xs"
                : "text-stone-700 hover:bg-white"
            }`}
            title="Clave de Fá (Mão Esquerda)"
          >
            Fá <span className="hidden sm:inline">(Mão Esq.)</span>
          </button>
          <button
            id="btn-clef-both"
            type="button"
            onClick={() => onSelectClef("both")}
            className={`flex items-center gap-1 px-2 sm:px-2.5 py-1.5 rounded-md text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
              currentClef === "both"
                ? "bg-stone-900 text-white shadow-xs"
                : "text-stone-800 hover:bg-white"
            }`}
            title="Exibir e tocar ambas as mãos coordenadas no Grand Staff"
          >
            <Layers className="w-3.5 h-3.5 shrink-0" />
            <span>Sol + Fá <span className="hidden md:inline">(2 Mãos)</span></span>
          </button>
        </div>

        {/* Accidentals */}
        <div className="flex items-center gap-1 bg-stone-100/90 p-1 rounded-lg border border-stone-200 shrink-0">
          <span className="text-xs font-bold text-stone-500 px-1.5 whitespace-nowrap">
            Acidentes:
          </span>
          <button
            id="btn-accidental-none"
            type="button"
            onClick={() => onSelectAccidental("natural")}
            className={`px-2 py-1.5 rounded-md text-xs font-semibold transition-all cursor-pointer ${
              currentAccidental === "none" || currentAccidental === "natural"
                ? "bg-stone-900 text-white font-bold"
                : "text-stone-700 hover:bg-white"
            }`}
            title="Bequadro / Natural"
          >
            ♮ Nat
          </button>
          <button
            id="btn-accidental-sharp"
            type="button"
            onClick={() => onSelectAccidental("#")}
            className={`px-2 py-1.5 rounded-md text-xs font-semibold transition-all cursor-pointer ${
              currentAccidental === "#"
                ? "bg-amber-600 text-white font-bold shadow-xs"
                : "text-stone-700 hover:bg-white"
            }`}
            title="Sustenido (♯)"
          >
            ♯
          </button>
          <button
            id="btn-accidental-flat"
            type="button"
            onClick={() => onSelectAccidental("b")}
            className={`px-2 py-1.5 rounded-md text-xs font-semibold transition-all cursor-pointer ${
              currentAccidental === "b"
                ? "bg-amber-600 text-white font-bold shadow-xs"
                : "text-stone-700 hover:bg-white"
            }`}
            title="Bemol (♭)"
          >
            ♭
          </button>
          <button
            id="btn-accidental-doublesharp"
            type="button"
            onClick={() => onSelectAccidental("##")}
            className={`px-2 py-1.5 rounded-md text-xs font-semibold transition-all cursor-pointer ${
              currentAccidental === "##"
                ? "bg-amber-600 text-white font-bold shadow-xs"
                : "text-stone-700 hover:bg-white"
            }`}
            title="Dobrado Sustenido (𝄪)"
          >
            𝄪
          </button>
          <button
            id="btn-accidental-doubleflat"
            type="button"
            onClick={() => onSelectAccidental("bb")}
            className={`px-2 py-1.5 rounded-md text-xs font-semibold transition-all cursor-pointer ${
              currentAccidental === "bb"
                ? "bg-amber-600 text-white font-bold shadow-xs"
                : "text-stone-700 hover:bg-white"
            }`}
            title="Dobrado Bemol (𝄫)"
          >
            𝄫
          </button>
        </div>
      </div>

      {/* Secondary Row: Insert Mode & Sheet Operations */}
      <div className="flex flex-wrap items-center justify-between gap-2.5 pt-2 border-t border-stone-100">
        {/* Piano Insert Mode toggle */}
        <div className="flex items-center gap-2">
          <button
            id="btn-toggle-piano-insert"
            type="button"
            onClick={onTogglePianoInsertMode}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all border cursor-pointer ${
              isPianoInsertMode
                ? "bg-amber-500 text-white border-amber-600 shadow-xs"
                : "bg-stone-50 hover:bg-stone-100 text-stone-700 border-stone-300"
            }`}
          >
            <span
              className={`w-2 h-2 rounded-full shrink-0 ${
                isPianoInsertMode ? "bg-white animate-ping" : "bg-stone-400"
              }`}
            />
            <span>
              Inserção no Piano: <strong>{isPianoInsertMode ? "LIGADA" : "Desligada"}</strong>
            </span>
          </button>
          <span className="text-[11px] text-stone-500 hidden xl:inline">
            {isPianoInsertMode
              ? "Toque no teclado do piano para gravar notas diretamente na partitura!"
              : "Clique na pauta ou ligue o botão para compor teclando"}
          </span>
        </div>

        {/* Measure Operations & Quick Modals */}
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
          {/* Piano Reduction Button */}
          {onOpenReductionModal && (
            <button
              id="btn-open-piano-reduction"
              type="button"
              onClick={onOpenReductionModal}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-amber-50 hover:bg-amber-100 text-amber-950 border border-amber-300 transition-colors shadow-2xs cursor-pointer"
              title="Reduzir orquestra/coro para piano a 2 mãos ou carregar arranjos solo"
            >
              <Minimize2 className="w-3.5 h-3.5 text-amber-700 shrink-0" />
              <span>Redução para Piano</span>
            </button>
          )}

          <button
            id="btn-add-measure"
            type="button"
            onClick={onAddMeasure}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-stone-100 hover:bg-stone-200 text-stone-800 transition-colors border border-stone-200 cursor-pointer"
            title="Adicionar um novo compasso ao final"
          >
            <PlusCircle className="w-3.5 h-3.5 text-stone-600 shrink-0" />
            <span>+ Compasso</span>
          </button>

          <button
            id="btn-remove-measure"
            type="button"
            onClick={onRemoveMeasure}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-stone-100 hover:bg-stone-200 text-stone-800 transition-colors border border-stone-200 cursor-pointer"
            title="Remover o último compasso"
          >
            <MinusCircle className="w-3.5 h-3.5 text-stone-600 shrink-0" />
            <span>- Compasso</span>
          </button>

          <button
            id="btn-clear-sheet"
            type="button"
            onClick={onClearSheet}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold text-stone-600 hover:text-red-700 hover:bg-red-50 border border-transparent hover:border-red-200 transition-colors cursor-pointer"
            title="Limpar todas as notas da partitura"
          >
            <Trash2 className="w-3.5 h-3.5 shrink-0" />
            <span>Limpar</span>
          </button>

          {/* AI Generator Button */}
          <button
            id="btn-open-ai-generator"
            type="button"
            onClick={onOpenAiModal}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white shadow-xs transition-all cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-200 shrink-0" />
            <span>Gerar com IA</span>
          </button>
        </div>
      </div>

      {/* Selected Note / Chord Inspector */}
      {selectedNote && selectedMeasureIndex !== null && (
        <div
          id="selected-note-inspector"
          className="flex flex-col gap-2.5 p-3 sm:p-3.5 bg-amber-50/90 rounded-xl border border-amber-200 text-xs shadow-2xs animate-in fade-in duration-150"
        >
          {/* Row 1: Selected Info + Primary Actions */}
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-bold text-amber-950">
                {isChord ? "Acorde Selecionado:" : "Nota Selecionada:"}
              </span>
              <span className="font-bold text-stone-900 bg-white px-2.5 py-0.5 rounded-md border border-amber-300 shadow-2xs">
                {selectedNote.isRest ? "Pausa" : formatChordPt(selectedPitches)}
                {selectedNote.dotted ? " • Pontuada" : ""}
              </span>
              <span className="text-stone-600 font-medium">
                Compasso {selectedMeasureIndex + 1} •{" "}
                {selectedNote.clef === "treble" ? "Clave de Sol (Mão Dir.)" : "Clave de Fá (Mão Esq.)"}
              </span>
            </div>

            {/* Note Actions */}
            <div className="flex flex-wrap items-center gap-1.5">
              {onToggleSelectedNoteDotted && (
                <button
                  type="button"
                  onClick={onToggleSelectedNoteDotted}
                  className={`flex items-center gap-1 px-2 py-1 rounded-md border text-xs font-semibold transition-colors cursor-pointer ${
                    selectedNote.dotted
                      ? "bg-amber-600 text-white border-amber-700"
                      : "bg-white hover:bg-amber-100 text-stone-800 border-amber-300"
                  }`}
                  title="Alternar ponto de aumento"
                >
                  <CircleDot className="w-3.5 h-3.5" />
                  <span>{selectedNote.dotted ? "Pontuada" : "+ Ponto"}</span>
                </button>
              )}

              {!selectedNote.isRest && (
                <>
                  <button
                    type="button"
                    onClick={() => onPlayAudition(selectedNote.pitch)}
                    className="flex items-center gap-1 px-2.5 py-1 bg-white hover:bg-amber-100 rounded-md text-amber-950 border border-amber-300 font-semibold transition-colors cursor-pointer"
                    title="Ouvir nota ou acorde"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                    <span>Ouvir</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => onTransposeSelectedNote(1)}
                    className="flex items-center gap-0.5 px-2 py-1 bg-white hover:bg-amber-100 rounded-md text-stone-800 border border-amber-300 font-semibold transition-colors cursor-pointer"
                    title="Subir 1 semitom"
                  >
                    <ArrowUp className="w-3 h-3" />
                    <span>+1</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => onTransposeSelectedNote(-1)}
                    className="flex items-center gap-0.5 px-2 py-1 bg-white hover:bg-amber-100 rounded-md text-stone-800 border border-amber-300 font-semibold transition-colors cursor-pointer"
                    title="Descer 1 semitom"
                  >
                    <ArrowDown className="w-3 h-3" />
                    <span>-1</span>
                  </button>
                </>
              )}
              <button
                type="button"
                onClick={onDeleteSelectedNote}
                className="flex items-center gap-1 px-2.5 py-1 bg-red-100 hover:bg-red-200 text-red-700 rounded-md font-semibold transition-colors cursor-pointer"
                title="Excluir nota"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Excluir</span>
              </button>
            </div>
          </div>

          {/* Row 2: Chord Building & Harmonic Intervals */}
          {!selectedNote.isRest && (
            <div className="flex flex-wrap items-center justify-between gap-2.5 pt-2 border-t border-amber-200/70">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-bold text-amber-950">Empilhar Acorde:</span>
                {/* Pitches list in chord */}
                <div className="flex flex-wrap items-center gap-1">
                  {selectedPitches.map((p) => (
                    <span
                      key={`chord-p-${p}`}
                      className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-white text-stone-900 border border-amber-300 text-xs font-bold shadow-2xs"
                    >
                      <span>{formatPitchPt(p)}</span>
                      {selectedPitches.length > 1 && onRemovePitchFromSelectedNote && (
                        <button
                          type="button"
                          onClick={() => onRemovePitchFromSelectedNote(p)}
                          className="text-stone-400 hover:text-red-600 cursor-pointer ml-0.5"
                          title={`Remover ${p} do acorde`}
                        >
                          <X className="w-3 h-3" />
                        </button>
                      )}
                    </span>
                  ))}
                </div>

                {/* Quick Add Interval Buttons */}
                {onAddIntervalToSelectedNote && (
                  <div className="flex flex-wrap items-center gap-1">
                    <button
                      type="button"
                      onClick={() => onAddIntervalToSelectedNote("3M")}
                      className="px-2 py-1 rounded-md bg-white hover:bg-amber-100 text-amber-950 border border-amber-300 text-xs font-bold cursor-pointer"
                      title="Adicionar Terça Maior (+4 semitons)"
                    >
                      + 3ªM
                    </button>
                    <button
                      type="button"
                      onClick={() => onAddIntervalToSelectedNote("3m")}
                      className="px-2 py-1 rounded-md bg-white hover:bg-amber-100 text-amber-950 border border-amber-300 text-xs font-bold cursor-pointer"
                      title="Adicionar Terça Menor (+3 semitons)"
                    >
                      + 3ªm
                    </button>
                    <button
                      type="button"
                      onClick={() => onAddIntervalToSelectedNote("5J")}
                      className="px-2 py-1 rounded-md bg-white hover:bg-amber-100 text-amber-950 border border-amber-300 text-xs font-bold cursor-pointer"
                      title="Adicionar Quinta Justa (+7 semitons)"
                    >
                      + 5ªJ
                    </button>
                    <button
                      type="button"
                      onClick={() => onAddIntervalToSelectedNote("8J")}
                      className="px-2 py-1 rounded-md bg-white hover:bg-amber-100 text-amber-950 border border-amber-300 text-xs font-bold cursor-pointer"
                      title="Adicionar Oitava (+12 semitons)"
                    >
                      + 8ª
                    </button>
                    <button
                      type="button"
                      onClick={() => onAddIntervalToSelectedNote("triadMaj")}
                      className="px-2.5 py-1 rounded-md bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs shadow-2xs cursor-pointer"
                      title="Formar Tríade Maior (Tônica + 3ªM + 5ªJ)"
                    >
                      Tríade Maior
                    </button>
                    <button
                      type="button"
                      onClick={() => onAddIntervalToSelectedNote("triadMin")}
                      className="px-2.5 py-1 rounded-md bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs shadow-2xs cursor-pointer"
                      title="Formar Tríade Menor (Tônica + 3ªm + 5ªJ)"
                    >
                      Tríade Menor
                    </button>
                  </div>
                )}
              </div>

              {/* Counterpoint, Split Voices & Arpeggios */}
              <div className="flex flex-wrap items-center gap-2">
                {/* Arpeggio toggle */}
                {onToggleSelectedArpeggio && (
                  <button
                    type="button"
                    onClick={onToggleSelectedArpeggio}
                    className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-bold transition-colors cursor-pointer border ${
                      selectedNote.isArpeggiated
                        ? "bg-amber-600 text-white border-amber-700 shadow-2xs"
                        : "bg-white hover:bg-amber-100 text-amber-950 border-amber-300"
                    }`}
                    title="Renderizar linha ondulada vertical para acorde arpejado/rolado"
                  >
                    <span className="text-base leading-none">≀</span>
                    <span>Arpejo Rolado</span>
                  </button>
                )}

                {/* Stem direction for split voice notation */}
                {onSetSelectedStemDirection && (
                  <div className="flex items-center bg-white rounded-md border border-amber-300 p-0.5 text-xs">
                    <span className="px-1.5 text-stone-500 font-semibold">Haste:</span>
                    <button
                      type="button"
                      onClick={() => onSetSelectedStemDirection("up")}
                      className={`px-2 py-0.5 rounded font-bold cursor-pointer ${
                        selectedNote.stemDirection === "up" || selectedNote.voice === 1
                          ? "bg-amber-600 text-white"
                          : "text-stone-700 hover:bg-stone-100"
                      }`}
                      title="Haste para Cima (Voz 1 - Soprano/Tenor)"
                    >
                      🠙 Cima (V1)
                    </button>
                    <button
                      type="button"
                      onClick={() => onSetSelectedStemDirection("down")}
                      className={`px-2 py-0.5 rounded font-bold cursor-pointer ${
                        selectedNote.stemDirection === "down" || selectedNote.voice === 2
                          ? "bg-amber-600 text-white"
                          : "text-stone-700 hover:bg-stone-100"
                      }`}
                      title="Haste para Baixo (Voz 2 - Contralto/Baixo)"
                    >
                      🠛 Baixo (V2)
                    </button>
                    <button
                      type="button"
                      onClick={() => onSetSelectedStemDirection("auto")}
                      className={`px-2 py-0.5 rounded font-medium cursor-pointer ${
                        !selectedNote.stemDirection || selectedNote.stemDirection === "auto"
                          ? "bg-stone-200 text-stone-800"
                          : "text-stone-600 hover:bg-stone-100"
                      }`}
                      title="Haste Automática"
                    >
                      Auto
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
});

import React from "react";
import { NoteDuration } from "../types";
import { Trash2, ChevronUp, ChevronDown, Circle, Minus } from "lucide-react";

interface Props {
  currentDuration: NoteDuration;
  onSelectDuration: (duration: NoteDuration) => void;
  isRestSelected: boolean;
  onToggleRest: () => void;
  isDottedSelected: boolean;
  onToggleDotted: () => void;
  hasSelectedNote: boolean;
  onDeleteSelectedNote: () => void;
  onTransposeSelectedNote: (semitones: number) => void;
}

export const MobileTouchToolbar: React.FC<Props> = React.memo(({
  currentDuration,
  onSelectDuration,
  isRestSelected,
  onToggleRest,
  isDottedSelected,
  onToggleDotted,
  hasSelectedNote,
  onDeleteSelectedNote,
  onTransposeSelectedNote,
}) => {
  const durations: { id: NoteDuration; label: string }[] = [
    { id: "whole", label: "𝅝" },
    { id: "half", label: "𝅗𝅥" },
    { id: "quarter", label: "♩" },
    { id: "eighth", label: "♪" },
    { id: "sixteenth", label: "𝅘𝅥𝅯" },
    { id: "thirtysecond", label: "𝅘𝅥𝅰" },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-stone-200 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] p-2 pb-safe flex flex-col gap-2 z-50">
      {/* Action Row - only visible when a note is selected */}
      {hasSelectedNote && (
        <div className="flex items-center justify-between gap-2 px-1">
          <div className="flex gap-2 flex-1">
            <button
              className="flex-1 bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold py-2 rounded-lg flex items-center justify-center gap-1 active:bg-stone-300 transition-colors"
              onClick={() => onTransposeSelectedNote(1)}
              title="Transpor Acima"
            >
              <ChevronUp size={20} />
              <span className="text-sm">+1/2</span>
            </button>
            <button
              className="flex-1 bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold py-2 rounded-lg flex items-center justify-center gap-1 active:bg-stone-300 transition-colors"
              onClick={() => onTransposeSelectedNote(-1)}
              title="Transpor Abaixo"
            >
              <ChevronDown size={20} />
              <span className="text-sm">-1/2</span>
            </button>
          </div>
          <button
            className="bg-red-50 hover:bg-red-100 text-red-600 p-2 px-4 rounded-lg flex items-center justify-center active:bg-red-200 transition-colors"
            onClick={onDeleteSelectedNote}
            title="Excluir"
          >
            <Trash2 size={20} />
          </button>
        </div>
      )}

      {/* Primary Tools Row */}
      <div className="flex items-center justify-between gap-1 overflow-x-auto hide-scrollbar">
        {/* Durations */}
        <div className="flex bg-stone-100 rounded-lg p-1 shrink-0">
          {durations.map((d) => (
            <button
              key={d.id}
              onClick={() => {
                onSelectDuration(d.id);
                if (isRestSelected) onToggleRest(); // Auto-disable rest if re-selecting duration
              }}
              className={`w-10 h-10 flex items-center justify-center rounded-md text-xl transition-colors ${
                currentDuration === d.id && !isRestSelected
                  ? "bg-amber-500 text-white shadow-xs"
                  : "text-stone-700 hover:bg-white active:bg-stone-200"
              }`}
            >
              {d.label}
            </button>
          ))}
        </div>

        {/* Modifiers */}
        <div className="flex gap-1 shrink-0">
          <button
            onClick={onToggleRest}
            className={`w-10 h-10 flex items-center justify-center rounded-lg text-lg font-bold transition-colors ${
              isRestSelected
                ? "bg-stone-800 text-white shadow-xs"
                : "bg-stone-100 text-stone-700 active:bg-stone-200"
            }`}
          >
            𝄽
          </button>
          <button
            onClick={onToggleDotted}
            className={`w-10 h-10 flex items-center justify-center rounded-lg font-bold transition-colors ${
              isDottedSelected
                ? "bg-blue-600 text-white shadow-xs"
                : "bg-stone-100 text-stone-700 active:bg-stone-200"
            }`}
          >
            <Circle size={8} fill="currentColor" />
          </button>
        </div>
      </div>
    </div>
  );
});

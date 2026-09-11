import * as fs from 'fs';

let content = fs.readFileSync('src/components/MobileTouchToolbar.tsx', 'utf8');

const search = `    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-stone-200 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] p-2 pb-safe flex flex-col gap-2 z-50">
      
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
      <div className="flex items-center justify-between gap-1 overflow-x-auto hide-scrollbar">`;

const replace = `    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-stone-200 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] p-2 pb-safe flex flex-col z-50">
      {/* Primary Tools Row */}
      <div className="flex items-center gap-2 overflow-x-auto hide-scrollbar snap-x">
        {/* Action Row - only visible when a note is selected */}
        {hasSelectedNote && (
          <div className="flex items-center gap-1 border-r border-stone-200 pr-2 shrink-0 snap-start">
            <button
              className="w-12 h-10 bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold rounded-lg flex flex-col items-center justify-center active:bg-stone-300 transition-colors"
              onClick={() => onTransposeSelectedNote(1)}
              title="Transpor Acima"
            >
              <ChevronUp size={16} className="mb-[-2px]" />
              <span className="text-[10px] leading-none">+½</span>
            </button>
            <button
              className="w-12 h-10 bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold rounded-lg flex flex-col items-center justify-center active:bg-stone-300 transition-colors"
              onClick={() => onTransposeSelectedNote(-1)}
              title="Transpor Abaixo"
            >
              <ChevronDown size={16} className="mb-[-2px]" />
              <span className="text-[10px] leading-none">-½</span>
            </button>
            <button
              className="w-12 h-10 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg flex items-center justify-center active:bg-red-200 transition-colors ml-1"
              onClick={onDeleteSelectedNote}
              title="Excluir"
            >
              <Trash2 size={18} />
            </button>
          </div>
        )}`;

if (!content.includes('Action Row - only visible when a note is selected')) {
  console.log("NOT FOUND");
} else {
  content = content.replace(search, replace);
  fs.writeFileSync('src/components/MobileTouchToolbar.tsx', content);
  console.log("REPLACED");
}

import React, { useState, useRef, useEffect, useMemo } from "react";
import { SheetMusic, NoteItem, ClefType } from "../types";
import {
  getStaffY,
  getLedgerLines,
  formatPitchPt,
  getNoteBeats,
  getAllNotePitches,
  sortPitches,
  generateArpeggioWavyPath,
  formatChordPt,
  getDiatonicStep,
} from "../utils/musicNotation";
import {
  ZoomIn,
  ZoomOut,
  Maximize2,
  LayoutGrid,
  Rows,
  Layers,
  Sparkles,
  Music,
} from "lucide-react";

interface SheetMusicViewProps {
  sheet: SheetMusic;
  activeNoteId?: string | null;
  activeNoteIds?: Set<string> | string[];
  activeMeasureNumber: number | null;
  selectedNoteId: string | null;
  onSelectNote: (note: NoteItem, measureIndex: number) => void;
  onStaffClick?: (clef: ClefType, measureIndex: number, clientY: number, staffCenterY: number) => void;
  readOnly?: boolean;
}

export const SheetMusicView: React.FC<SheetMusicViewProps> = React.memo(({
  sheet,
  activeNoteId = null,
  activeNoteIds,
  activeMeasureNumber,
  selectedNoteId,
  onSelectNote,
  onStaffClick,
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [zoomLevel, setZoomLevel] = useState<number>(1.0);
  const [viewMode, setViewMode] = useState<"ribbon" | "systems">("ribbon");

  // Grand Staff Geometry constants
  const trebleStaffCenterY = 65; // Line 3 (B4), staff lines at Y: 45, 55, 65, 75, 85
  const bassStaffCenterY = 195;  // Line 3 (D3), staff lines at Y: 175, 185, 195, 205, 215
  const staffHeight = 290;       // Total SVG height per grand staff system
  const headerWidth = 96;        // Space for grand staff accolade brace, clefs, time signature

  // Measures layout calculation for continuous Ribbon mode
  const ribbonLayouts = useMemo(() => {
    const [numStr, denStr] = (sheet.timeSignature || "4/4").split("/");
    const num = parseInt(numStr, 10) || 4;
    const den = parseInt(denStr, 10) || 4;
    const nominalBeats = (num * 4) / den;

    let currentX = headerWidth;
    return sheet.measures.map((measure, mIdx) => {
      const trebleCount = measure.trebleNotes?.length || 0;
      const bassCount = measure.bassNotes?.length || 0;
      const maxNotes = Math.max(trebleCount, bassCount, 1);

      let hasShortNotes = false;
      for (const n of [...(measure.trebleNotes || []), ...(measure.bassNotes || [])]) {
        if (n.duration === "eighth" || n.duration === "sixteenth" || n.duration === "thirtysecond") {
          hasShortNotes = true;
          break;
        }
      }

      const minNoteSpacing = hasShortNotes ? 52 : 42;
      const widthByNotes = maxNotes * minNoteSpacing + 65;
      const widthByBeats = nominalBeats * 55 + 40;
      const width = Math.max(210, widthByNotes, widthByBeats);

      const startX = currentX;
      const endX = startX + width;
      currentX = endX;

      const trebleBeats = measure.trebleNotes?.reduce((acc, n) => acc + getNoteBeats(n), 0) || 0;
      const bassBeats = measure.bassNotes?.reduce((acc, n) => acc + getNoteBeats(n), 0) || 0;
      const measureBeats = Math.max(trebleBeats, bassBeats, nominalBeats);

      return {
        measure,
        mIdx,
        startX,
        endX,
        width,
        measureBeats,
      };
    });
  }, [sheet, headerWidth]);

  const totalRibbonSvgWidth = (ribbonLayouts[ribbonLayouts.length - 1]?.endX || headerWidth + 240) + 48;

  // Measures grouped into multi-system stacked rows (3 measures per grand staff system)
  const systems = useMemo(() => {
    const measuresPerSystem = 3;
    const result: {
      systemIndex: number;
      measures: {
        measure: (typeof sheet.measures)[0];
        mIdx: number;
        startX: number;
        endX: number;
        width: number;
        measureBeats: number;
      }[];
      systemWidth: number;
    }[] = [];

    const [numStr, denStr] = (sheet.timeSignature || "4/4").split("/");
    const num = parseInt(numStr, 10) || 4;
    const den = parseInt(denStr, 10) || 4;
    const nominalBeats = (num * 4) / den;

    for (let sIdx = 0; sIdx < Math.ceil(sheet.measures.length / measuresPerSystem); sIdx++) {
      const startMeasureIdx = sIdx * measuresPerSystem;
      const slice = sheet.measures.slice(startMeasureIdx, startMeasureIdx + measuresPerSystem);

      let currentX = headerWidth;
      const systemMeasures = slice.map((measure, relIdx) => {
        const globalIdx = startMeasureIdx + relIdx;
        const trebleCount = measure.trebleNotes?.length || 0;
        const bassCount = measure.bassNotes?.length || 0;
        const maxNotes = Math.max(trebleCount, bassCount, 1);
        const width = Math.max(260, maxNotes * 48 + 70);

        const startX = currentX;
        const endX = startX + width;
        currentX = endX;

        const trebleBeats = measure.trebleNotes?.reduce((acc, n) => acc + getNoteBeats(n), 0) || 0;
        const bassBeats = measure.bassNotes?.reduce((acc, n) => acc + getNoteBeats(n), 0) || 0;
        const measureBeats = Math.max(trebleBeats, bassBeats, nominalBeats);

        return {
          measure,
          mIdx: globalIdx,
          startX,
          endX,
          width,
          measureBeats,
        };
      });

      result.push({
        systemIndex: sIdx,
        measures: systemMeasures,
        systemWidth: Math.max(currentX + 30, 880),
      });
    }

    return result;
  }, [sheet, headerWidth]);

  // Auto-scroll to follow active playing measure
  useEffect(() => {
    if (activeMeasureNumber !== null && scrollContainerRef.current) {
      if (viewMode === "ribbon") {
        const layout = ribbonLayouts.find((m) => m.measure.number === activeMeasureNumber);
        if (layout) {
          const container = scrollContainerRef.current;
          const containerWidth = container.clientWidth;
          const targetScrollLeft = Math.max(0, (layout.startX * zoomLevel) - containerWidth / 2 + (layout.width * zoomLevel) / 2);
          container.scrollTo({
            left: targetScrollLeft,
            behavior: "smooth",
          });
        }
      }
    }
  }, [activeMeasureNumber, ribbonLayouts, zoomLevel, viewMode]);

  return (
    <div
      id="sheet-music-panel"
      className="w-full bg-[#fffdfa] rounded-xl border border-stone-200 shadow-xs flex flex-col overflow-hidden"
    >
      {/* Top Controls Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-3 sm:px-5 py-2.5 bg-stone-50/80 border-b border-stone-200">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <h2 className="text-base sm:text-lg font-serif font-bold text-stone-900 tracking-tight truncate">
              {sheet.title}
            </h2>
            {sheet.category && (
              <span className="text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider bg-amber-100 text-amber-900 border border-amber-300">
                {sheet.category === "solo"
                  ? "Piano Solo"
                  : sheet.category === "reduction"
                  ? "Redução a 2 Mãos"
                  : "Partitura"}
              </span>
            )}
          </div>
          <div className="flex items-center gap-3 text-xs text-stone-500">
            {sheet.composer && <span className="italic truncate">{sheet.composer}</span>}
            <span>•</span>
            <span>{sheet.timeSignature}</span>
            <span>•</span>
            <span>{sheet.keySignature}</span>
            <span>•</span>
            <span>{sheet.tempo} BPM</span>
            <span>•</span>
            <span>{sheet.measures.length} compassos</span>
          </div>
        </div>

        {/* Zoom & Layout Mode Toolbar */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          {/* Layout Mode Toggle */}
          <div className="flex items-center bg-white rounded-lg border border-stone-200 p-0.5">
            <button
              type="button"
              onClick={() => setViewMode("ribbon")}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-semibold transition-colors cursor-pointer ${
                viewMode === "ribbon"
                  ? "bg-amber-500 text-white shadow-xs"
                  : "text-stone-600 hover:text-stone-900"
              }`}
              title="Faixa Contínua (Rolagem Horizontal)"
            >
              <Rows className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Faixa Contínua</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode("systems")}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-semibold transition-colors cursor-pointer ${
                viewMode === "systems"
                  ? "bg-amber-500 text-white shadow-xs"
                  : "text-stone-600 hover:text-stone-900"
              }`}
              title="Sistemas Empilhados (Rolagem Vertical & Horizontal)"
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Sistemas Empilhados</span>
            </button>
          </div>

          {/* Zoom Buttons */}
          <div className="flex items-center bg-white rounded-lg border border-stone-200 p-0.5">
            <button
              type="button"
              onClick={() => setZoomLevel((z) => Math.max(0.75, +(z - 0.15).toFixed(2)))}
              disabled={zoomLevel <= 0.75}
              className="p-1.5 text-stone-600 hover:text-stone-900 hover:bg-stone-100 rounded disabled:opacity-40 cursor-pointer"
              title="Diminuir Zoom"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => setZoomLevel(1.0)}
              className="px-1.5 py-1 text-[11px] font-bold text-stone-700 hover:text-stone-900 cursor-pointer"
              title="Restaurar Zoom (100%)"
            >
              {Math.round(zoomLevel * 100)}%
            </button>
            <button
              type="button"
              onClick={() => setZoomLevel((z) => Math.min(1.6, +(z + 0.15).toFixed(2)))}
              disabled={zoomLevel >= 1.6}
              className="p-1.5 text-stone-600 hover:text-stone-900 hover:bg-stone-100 rounded disabled:opacity-40 cursor-pointer"
              title="Aumentar Zoom"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Grand Staff Scrollable Canvas Container (Vertical + Horizontal Scrollbars) */}
      <div
        id="sheet-music-scroll-container"
        ref={scrollContainerRef}
        className="w-full overflow-x-auto overflow-y-auto max-h-[560px] sm:max-h-[620px] p-3 sm:p-5 select-none scroll-smooth bg-[#fffdfa]"
        style={{
          scrollbarColor: "#d6d3d1 #f5f5f4",
          scrollbarWidth: "thin",
        }}
      >
        <div
          style={{
            transform: `scale(${zoomLevel})`,
            transformOrigin: "top left",
            width: viewMode === "ribbon" ? totalRibbonSvgWidth : "100%",
          }}
          className="transition-transform duration-100"
        >
          {viewMode === "ribbon" ? (
            // ==========================================
            // MODE 1: Continuous Horizontal Ribbon
            // ==========================================
            <svg
              width={Math.max(totalRibbonSvgWidth, 850)}
              height={staffHeight}
              className="overflow-visible"
            >
              {renderGrandStaffSystem({
                systemStartX: 0,
                systemWidth: Math.max(totalRibbonSvgWidth, 850),
                headerWidth,
                trebleStaffCenterY,
                bassStaffCenterY,
                sheet,
                measuresLayout: ribbonLayouts,
                activeNoteId,
                activeNoteIds,
                selectedNoteId,
                onSelectNote,
                onStaffClick,
              })}
            </svg>
          ) : (
            // ==========================================
            // MODE 2: Stacked Systems (Multi-System Grand Staff)
            // ==========================================
            <div className="flex flex-col gap-6">
              {systems.map((system) => (
                <div
                  key={`system-${system.systemIndex}`}
                  className="bg-white/60 p-2 rounded-xl border border-stone-100 shadow-2xs"
                >
                  <svg
                    width={system.systemWidth}
                    height={staffHeight}
                    className="overflow-visible"
                  >
                    {renderGrandStaffSystem({
                      systemStartX: 0,
                      systemWidth: system.systemWidth,
                      headerWidth,
                      trebleStaffCenterY,
                      bassStaffCenterY,
                      sheet,
                      measuresLayout: system.measures,
                      activeNoteId,
                      activeNoteIds,
                      selectedNoteId,
                      onSelectNote,
                      onStaffClick,
                    })}
                  </svg>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
});

// Render a single Grand Staff system (Treble + Bass staves joined by Accolade and initial heavy barline)
function renderGrandStaffSystem({
  systemStartX,
  systemWidth,
  headerWidth,
  trebleStaffCenterY,
  bassStaffCenterY,
  sheet,
  measuresLayout,
  activeNoteId,
  activeNoteIds,
  selectedNoteId,
  onSelectNote,
  onStaffClick,
}: {
  systemStartX: number;
  systemWidth: number;
  headerWidth: number;
  trebleStaffCenterY: number;
  bassStaffCenterY: number;
  sheet: SheetMusic;
  measuresLayout: {
    measure: (typeof sheet.measures)[0];
    mIdx: number;
    startX: number;
    endX: number;
    width: number;
    measureBeats: number;
  }[];
  activeNoteId: string | null;
  activeNoteIds: Set<string> | string[] | undefined;
  selectedNoteId: string | null;
  onSelectNote: (note: NoteItem, measureIndex: number) => void;
  onStaffClick?: (clef: ClefType, measureIndex: number, clientY: number, staffCenterY: number) => void;
}) {
  const braceX = headerWidth - 16;
  const topY = 45; // Treble top line
  const bottomY = 215; // Bass bottom line
  const middleY = 130; // Center tip between the staves

  return (
    <g>
      {/* 1. Grand Staff Traditional Accolade (Curly Brace Bracket joining Treble & Bass) */}
      <path
        d={`M ${braceX} ${topY}
            C ${braceX - 16} ${topY + 30}, ${braceX - 22} ${middleY - 20}, ${braceX - 32} ${middleY}
            C ${braceX - 22} ${middleY + 20}, ${braceX - 16} ${bottomY - 30}, ${braceX} ${bottomY}
            C ${braceX - 12} ${bottomY - 30}, ${braceX - 18} ${middleY + 18}, ${braceX - 26} ${middleY}
            C ${braceX - 18} ${middleY - 18}, ${braceX - 12} ${topY + 30}, ${braceX} ${topY}`}
        fill="#1c1917"
      />

      {/* 2. Heavy initial vertical barline connecting Treble line 5 to Bass line 1 */}
      <line
        x1={braceX}
        y1={topY}
        x2={braceX}
        y2={bottomY}
        stroke="#1c1917"
        strokeWidth="3.2"
        strokeLinecap="round"
      />

      {/* 3. Continuous Staff Lines (Treble 5 lines + Bass 5 lines) */}
      {/* Treble lines (Y: 45, 55, 65, 75, 85) */}
      {[-20, -10, 0, 10, 20].map((dy, idx) => (
        <line
          key={`treble-line-${idx}`}
          x1={braceX}
          y1={trebleStaffCenterY + dy}
          x2={systemWidth - 20}
          y2={trebleStaffCenterY + dy}
          stroke="#292524"
          strokeWidth="1.2"
          opacity="0.88"
        />
      ))}

      {/* Bass lines (Y: 175, 185, 195, 205, 215) */}
      {[-20, -10, 0, 10, 20].map((dy, idx) => (
        <line
          key={`bass-line-${idx}`}
          x1={braceX}
          y1={bassStaffCenterY + dy}
          x2={systemWidth - 20}
          y2={bassStaffCenterY + dy}
          stroke="#292524"
          strokeWidth="1.2"
          opacity="0.88"
        />
      ))}

      {/* 4. Clefs in Header */}
      {/* Treble Clef (Clave de Sol) */}
      <g transform={`translate(${headerWidth - 66}, ${trebleStaffCenterY - 14})`}>
        <path
          d="M 16 34 C 18 36 21 33 21 30 C 21 24 14 21 14 14 C 14 7 19 2 20 -10 C 20 -14 18 -18 16 -18 C 14 -18 13 -14 14 -8 L 14 42 C 14 48 10 50 8 48 C 6 46 6 43 8 41 C 10 39 13 41 12 44"
          fill="none"
          stroke="#1c1917"
          strokeWidth="2.4"
          strokeLinecap="round"
        />
        <path
          d="M 14 26 C 24 24 26 12 18 8 C 11 4 8 16 14 24 C 18 30 22 28 20 33"
          fill="none"
          stroke="#1c1917"
          strokeWidth="2.2"
        />
        <circle cx="15" cy="18" r="3.2" fill="#1c1917" />
      </g>

      {/* Bass Clef (Clave de Fá) */}
      <g transform={`translate(${headerWidth - 66}, ${bassStaffCenterY - 18})`}>
        <path
          d="M 13 14 C 13 7 23 7 23 15 C 23 24 12 30 11 38"
          fill="none"
          stroke="#1c1917"
          strokeWidth="2.4"
          strokeLinecap="round"
        />
        <circle cx="14" cy="14" r="3.5" fill="#1c1917" />
        <circle cx="28" cy="10" r="1.8" fill="#1c1917" />
        <circle cx="28" cy="18" r="1.8" fill="#1c1917" />
      </g>

      {/* Time Signature */}
      <g transform={`translate(${headerWidth - 24}, 0)`}>
        {/* Treble Time Signature */}
        <text
          x="0"
          y={trebleStaffCenterY - 4}
          fontSize="20"
          fontWeight="bold"
          fontFamily="Playfair Display, Georgia, serif"
          fill="#1c1917"
          textAnchor="middle"
        >
          {sheet.timeSignature.split("/")[0]}
        </text>
        <text
          x="0"
          y={trebleStaffCenterY + 16}
          fontSize="20"
          fontWeight="bold"
          fontFamily="Playfair Display, Georgia, serif"
          fill="#1c1917"
          textAnchor="middle"
        >
          {sheet.timeSignature.split("/")[1]}
        </text>

        {/* Bass Time Signature */}
        <text
          x="0"
          y={bassStaffCenterY - 4}
          fontSize="20"
          fontWeight="bold"
          fontFamily="Playfair Display, Georgia, serif"
          fill="#1c1917"
          textAnchor="middle"
        >
          {sheet.timeSignature.split("/")[0]}
        </text>
        <text
          x="0"
          y={bassStaffCenterY + 16}
          fontSize="20"
          fontWeight="bold"
          fontFamily="Playfair Display, Georgia, serif"
          fill="#1c1917"
          textAnchor="middle"
        >
          {sheet.timeSignature.split("/")[1]}
        </text>
      </g>

      {/* 5. Measures & Barlines */}
      {measuresLayout.map((layout) => {
        const { measure, mIdx, startX, endX, width, measureBeats } = layout;

        return (
          <g key={`measure-group-${measure.number}-${mIdx}`}>
            {/* Measure Number Badge */}
            <text
              x={startX + 6}
              y={26}
              fontSize="11"
              fontFamily="sans-serif"
              fontWeight="bold"
              fill="#78716c"
            >
              {measure.number}
            </text>

            {/* Clickable Zone for Treble Staff */}
            <rect
              x={startX}
              y={18}
              width={width}
              height={104}
              fill="transparent"
              className="cursor-crosshair hover:fill-amber-500/5 transition-colors"
              onClick={(e) => {
                if (onStaffClick) {
                  const svgRect = e.currentTarget.ownerSVGElement?.getBoundingClientRect();
                  if (svgRect) {
                    const clientY = e.clientY - svgRect.top;
                    onStaffClick("treble", mIdx, clientY, trebleStaffCenterY);
                  }
                }
              }}
            />

            {/* Clickable Zone for Bass Staff */}
            <rect
              x={startX}
              y={148}
              width={width}
              height={104}
              fill="transparent"
              className="cursor-crosshair hover:fill-amber-500/5 transition-colors"
              onClick={(e) => {
                if (onStaffClick) {
                  const svgRect = e.currentTarget.ownerSVGElement?.getBoundingClientRect();
                  if (svgRect) {
                    const clientY = e.clientY - svgRect.top;
                    onStaffClick("bass", mIdx, clientY, bassStaffCenterY);
                  }
                }
              }}
            />

            {/* Continuous Barline through Treble and Bass Staves */}
            <line
              x1={endX}
              y1={45}
              x2={endX}
              y2={85}
              stroke="#44403c"
              strokeWidth="1.3"
            />
            {/* Subtle connecting barline through center accolade */}
            <line
              x1={endX}
              y1={85}
              x2={endX}
              y2={175}
              stroke="#a8a29e"
              strokeWidth="0.8"
              strokeDasharray="2,3"
            />
            <line
              x1={endX}
              y1={175}
              x2={endX}
              y2={215}
              stroke="#44403c"
              strokeWidth="1.3"
            />

            {/* Final Double Barline on last measure */}
            {mIdx === sheet.measures.length - 1 && (
              <g key={`double-barline-${mIdx}`}>
                <line x1={endX + 5} y1={45} x2={endX + 5} y2={85} stroke="#1c1917" strokeWidth="3.6" />
                <line x1={endX + 5} y1={175} x2={endX + 5} y2={215} stroke="#1c1917" strokeWidth="3.6" />
              </g>
            )}

            {/* Render Treble Notes & Chords */}
            {renderNoteList(
              measure.trebleNotes,
              startX,
              width,
              measureBeats,
              trebleStaffCenterY,
              "treble",
              mIdx,
              activeNoteId,
              activeNoteIds,
              selectedNoteId,
              onSelectNote
            )}

            {/* Render Bass Notes & Chords */}
            {renderNoteList(
              measure.bassNotes || [],
              startX,
              width,
              measureBeats,
              bassStaffCenterY,
              "bass",
              mIdx,
              activeNoteId,
              activeNoteIds,
              selectedNoteId,
              onSelectNote
            )}
          </g>
        );
      })}
    </g>
  );
}

// Render list of notes and chords within a staff
function renderNoteList(
  notes: NoteItem[],
  measureStartX: number,
  measureWidth: number,
  measureBeats: number,
  staffCenterY: number,
  clef: ClefType,
  measureIndex: number,
  activeNoteId: string | null,
  activeNoteIds: Set<string> | string[] | undefined,
  selectedNoteId: string | null,
  onSelectNote: (note: NoteItem, measureIndex: number) => void
) {
  if (!notes || notes.length === 0) return null;

  const paddingLeft = 28;
  const paddingRight = 24;
  const usableWidth = measureWidth - paddingLeft - paddingRight;
  const labelY = clef === "treble" ? 122 : 260;

  let accumulatedBeats = 0;

  return notes.map((note, noteIdx) => {
    const beats = getNoteBeats(note);
    const noteX = measureStartX + paddingLeft + (accumulatedBeats / measureBeats) * usableWidth;
    accumulatedBeats += beats;

    const isActive =
      (activeNoteIds
        ? activeNoteIds instanceof Set
          ? activeNoteIds.has(note.id)
          : activeNoteIds.includes(note.id)
        : false) || activeNoteId === note.id;
    const isSelected = selectedNoteId === note.id;
    const noteKey = note.id ? `${clef}-${note.id}` : `${clef}-m${measureIndex}-n${noteIdx}`;

    // ----------------------------------------------------
    // REST RENDERING
    // ----------------------------------------------------
    if (note.isRest) {
      return (
        <g
          key={noteKey}
          id={`note-${note.id || noteKey}`}
          className="cursor-pointer group"
          onClick={(e) => {
            e.stopPropagation();
            onSelectNote(note, measureIndex);
          }}
        >
          {/* Active/Selected Aura */}
          {(isActive || isSelected) && (
            <rect
              x={noteX - 11}
              y={staffCenterY - 15}
              width="22"
              height="30"
              rx="4"
              fill={isActive ? "#fbbf24" : "#93c5fd"}
              opacity="0.5"
            />
          )}

          {/* Rest Symbol */}
          {note.duration === "whole" ? (
            <rect x={noteX - 7} y={staffCenterY - 10} width="14" height="5.5" fill={isSelected ? "#2563eb" : "#1c1917"} />
          ) : note.duration === "half" ? (
            <rect x={noteX - 7} y={staffCenterY - 5.5} width="14" height="5.5" fill={isSelected ? "#2563eb" : "#1c1917"} />
          ) : note.duration === "quarter" ? (
            <path
              d={`M ${noteX - 2} ${staffCenterY - 12} L ${noteX + 3} ${staffCenterY - 4} L ${noteX - 3} ${staffCenterY + 2} Q ${noteX + 5} ${staffCenterY + 7} ${noteX - 1} ${staffCenterY + 12}`}
              fill="none"
              stroke={isSelected ? "#2563eb" : "#1c1917"}
              strokeWidth="2.4"
              strokeLinecap="round"
            />
          ) : note.duration === "eighth" ? (
            <g transform={`translate(${noteX - 3}, ${staffCenterY - 8})`}>
              <circle cx="2" cy="4" r="2.4" fill={isSelected ? "#2563eb" : "#1c1917"} />
              <path d="M 2 4 Q 7 5 5 10 L 2 18" fill="none" stroke={isSelected ? "#2563eb" : "#1c1917"} strokeWidth="2.2" />
            </g>
          ) : note.duration === "sixteenth" ? (
            <g transform={`translate(${noteX - 3}, ${staffCenterY - 12})`}>
              <circle cx="2" cy="4" r="2.2" fill={isSelected ? "#2563eb" : "#1c1917"} />
              <path d="M 2 4 Q 7 5 5 9 L 2 15" fill="none" stroke={isSelected ? "#2563eb" : "#1c1917"} strokeWidth="2.0" />
              <circle cx="2" cy="11" r="2.2" fill={isSelected ? "#2563eb" : "#1c1917"} />
              <path d="M 2 11 Q 7 12 5 16 L 2 22" fill="none" stroke={isSelected ? "#2563eb" : "#1c1917"} strokeWidth="2.0" />
            </g>
          ) : (
            <g transform={`translate(${noteX - 3}, ${staffCenterY - 14})`}>
              <circle cx="2" cy="3" r="2.0" fill={isSelected ? "#2563eb" : "#1c1917"} />
              <path d="M 2 3 Q 7 4 5 7 L 2 12" fill="none" stroke={isSelected ? "#2563eb" : "#1c1917"} strokeWidth="1.9" />
              <circle cx="2" cy="9" r="2.0" fill={isSelected ? "#2563eb" : "#1c1917"} />
              <path d="M 2 9 Q 7 10 5 13 L 2 18" fill="none" stroke={isSelected ? "#2563eb" : "#1c1917"} strokeWidth="1.9" />
              <circle cx="2" cy="15" r="2.0" fill={isSelected ? "#2563eb" : "#1c1917"} />
              <path d="M 2 15 Q 7 16 5 19 L 2 24" fill="none" stroke={isSelected ? "#2563eb" : "#1c1917"} strokeWidth="1.9" />
            </g>
          )}

          {note.dotted && (
            <circle cx={noteX + 8} cy={staffCenterY} r="2.2" fill={isSelected ? "#2563eb" : "#1c1917"} />
          )}

          <text
            x={noteX}
            y={labelY}
            fontSize="9"
            fontFamily="sans-serif"
            fontWeight="500"
            fill={isActive ? "#d97706" : isSelected ? "#2563eb" : "#a8a29e"}
            stroke="#fffdfa"
            strokeWidth="3"
            paintOrder="stroke fill"
            textAnchor="middle"
          >
            Pausa{note.dotted ? "." : ""}
          </text>
        </g>
      );
    }

    // ----------------------------------------------------
    // PITCHED NOTE OR STACKED HARMONIC CHORD RENDERING
    // ----------------------------------------------------
    const allPitches = getAllNotePitches(note);
    if (allPitches.length === 0) return null;

    const sortedPitches = sortPitches(allPitches);
    const pitchData = sortedPitches.map((pitch, idx) => {
      const y = getStaffY(pitch, clef, staffCenterY);
      const step = getDiatonicStep(pitch);
      const ledgers = getLedgerLines(pitch, clef);
      const acc = pitch.includes("##") || pitch.includes("x")
        ? "𝄪"
        : pitch.includes("bb")
        ? "𝄫"
        : pitch.includes("#")
        ? "♯"
        : pitch.includes("b")
        ? "♭"
        : null;

      return { pitch, y, step, ledgers, acc, idx };
    });

    const minY = Math.min(...pitchData.map((d) => d.y));
    const maxY = Math.max(...pitchData.map((d) => d.y));
    const avgY = (minY + maxY) / 2;

    const isOpenNote = note.duration === "whole" || note.duration === "half";
    const hasStem = note.duration !== "whole";

    // Split voice & stem direction logic:
    // If voice === 1 -> stem UP; If voice === 2 -> stem DOWN
    // If stemDirection explicitly specified -> obey
    // Otherwise fallback to diatonic center comparison
    let stemUp = true;
    if (note.stemDirection === "up") {
      stemUp = true;
    } else if (note.stemDirection === "down") {
      stemUp = false;
    } else if (note.voice === 1) {
      stemUp = true;
    } else if (note.voice === 2) {
      stemUp = false;
    } else {
      stemUp = avgY > staffCenterY;
    }

    const stemHeight =
      note.duration === "thirtysecond" ? 38 : note.duration === "sixteenth" ? 34 : 30;
    const stemX = stemUp ? noteX + 5.5 : noteX - 5.5;
    const stemYStart = stemUp ? maxY : minY;
    const stemYEnd = stemUp ? minY - stemHeight : maxY + stemHeight;

    // Has any accidental in this chord cluster?
    const hasAccidentals = pitchData.some((p) => p.acc !== null);
    const arpeggioX = hasAccidentals ? noteX - 25 : noteX - 18;

    return (
      <g
        key={noteKey}
        id={`note-${note.id || noteKey}`}
        className="cursor-pointer group"
        onClick={(e) => {
          e.stopPropagation();
          onSelectNote(note, measureIndex);
        }}
      >
        {/* Active Note Aura */}
        {isActive && (
          <circle
            cx={noteX}
            cy={avgY}
            r={Math.max(18, (maxY - minY) / 2 + 14)}
            fill="#f59e0b"
            opacity="0.38"
            className="animate-pulse"
          />
        )}

        {/* Selected Note Box */}
        {isSelected && (
          <rect
            x={noteX - (hasAccidentals ? 26 : 14)}
            y={Math.min(minY, stemYEnd) - 6}
            width={hasAccidentals ? 42 : 28}
            height={Math.abs(maxY - stemYEnd) + 16}
            rx="5"
            fill="#3b82f6"
            opacity="0.22"
          />
        )}

        {/* Arpeggio / Rolled Chord Vertical Wavy Line */}
        {note.isArpeggiated && allPitches.length > 1 && (
          <path
            d={generateArpeggioWavyPath(arpeggioX, minY - 6, maxY + 6)}
            stroke={isActive ? "#d97706" : isSelected ? "#2563eb" : "#1c1917"}
            strokeWidth="1.9"
            fill="none"
            strokeLinecap="round"
          />
        )}

        {/* Stacked Noteheads, Ledger lines & Accidentals */}
        {pitchData.map((item, pIdx) => {
          // Engraving rule: if adjacent notes in the chord are a diatonic 2nd apart (step diff 1),
          // offset one notehead to the other side of the stem to avoid colliding
          const prevItem = pIdx > 0 ? pitchData[pIdx - 1] : null;
          const isSecondCollision = prevItem ? Math.abs(item.step - prevItem.step) === 1 : false;
          const noteheadOffsetX = isSecondCollision ? (stemUp ? 11 : -11) : 0;
          const actualNoteheadX = noteX + noteheadOffsetX;

          return (
            <g key={`pitch-${noteKey}-${item.pitch}-${pIdx}`}>
              {/* Ledger Lines for this notehead */}
              {item.ledgers.map((step, stepIdx) => {
                const stepDist = 5;
                const ledgerCenterStep = clef === "treble" ? 6 : -6;
                const ledgerY = staffCenterY - (step - ledgerCenterStep) * stepDist;
                return (
                  <line
                    key={`ledger-${noteKey}-${step}-${pIdx}-${stepIdx}`}
                    x1={actualNoteheadX - 11}
                    y1={ledgerY}
                    x2={actualNoteheadX + 11}
                    y2={ledgerY}
                    stroke="#292524"
                    strokeWidth="1.3"
                  />
                );
              })}

              {/* Accidental with clean background halo */}
              {item.acc && (
                <text
                  x={noteX - (pIdx % 2 === 1 && pitchData.length > 2 ? 22 : 14)}
                  y={item.y + 4.5}
                  fontSize="14"
                  fontWeight="bold"
                  fill={isActive ? "#d97706" : isSelected ? "#2563eb" : "#1c1917"}
                  stroke="#fffdfa"
                  strokeWidth="2.8"
                  paintOrder="stroke fill"
                  textAnchor="middle"
                >
                  {item.acc}
                </text>
              )}

              {/* Notehead (Rotated oval for authentic classical engraving) */}
              <ellipse
                cx={actualNoteheadX}
                cy={item.y}
                rx="6.2"
                ry="4.4"
                transform={`rotate(-22 ${actualNoteheadX} ${item.y})`}
                fill={
                  isOpenNote
                    ? "#fffdfa"
                    : isActive
                    ? "#d97706"
                    : isSelected
                    ? "#2563eb"
                    : "#1c1917"
                }
                stroke={
                  isActive
                    ? "#b45309"
                    : isSelected
                    ? "#1d4ed8"
                    : "#1c1917"
                }
                strokeWidth={isOpenNote ? "2.2" : "0.5"}
              />
            </g>
          );
        })}

        {/* Dotted Chord Dot (beside top notehead) */}
        {note.dotted && (
          <circle
            cx={noteX + 10}
            cy={minY}
            r="2.2"
            fill={isActive ? "#d97706" : isSelected ? "#2563eb" : "#1c1917"}
          />
        )}

        {/* Unified Stem spanning entire chord */}
        {hasStem && (
          <line
            x1={stemX}
            y1={stemYStart}
            x2={stemX}
            y2={stemYEnd}
            stroke={isActive ? "#d97706" : isSelected ? "#2563eb" : "#1c1917"}
            strokeWidth="1.65"
            strokeLinecap="round"
          />
        )}

        {/* Eighth Note Flag */}
        {note.duration === "eighth" && hasStem && (
          <path
            d={
              stemUp
                ? `M ${stemX} ${stemYEnd} Q ${stemX + 8} ${stemYEnd + 6} ${stemX + 6} ${stemYEnd + 14}`
                : `M ${stemX} ${stemYEnd} Q ${stemX + 8} ${stemYEnd - 6} ${stemX + 6} ${stemYEnd - 14}`
            }
            fill="none"
            stroke={isActive ? "#d97706" : isSelected ? "#2563eb" : "#1c1917"}
            strokeWidth="1.9"
            strokeLinecap="round"
          />
        )}

        {/* Sixteenth Note Flags */}
        {note.duration === "sixteenth" && hasStem && (
          <g>
            <path
              d={
                stemUp
                  ? `M ${stemX} ${stemYEnd} Q ${stemX + 8} ${stemYEnd + 6} ${stemX + 6} ${stemYEnd + 13}`
                  : `M ${stemX} ${stemYEnd} Q ${stemX + 8} ${stemYEnd - 6} ${stemX + 6} ${stemYEnd - 13}`
              }
              fill="none"
              stroke={isActive ? "#d97706" : isSelected ? "#2563eb" : "#1c1917"}
              strokeWidth="1.9"
              strokeLinecap="round"
            />
            <path
              d={
                stemUp
                  ? `M ${stemX} ${stemYEnd + 5} Q ${stemX + 8} ${stemYEnd + 11} ${stemX + 6} ${stemYEnd + 18}`
                  : `M ${stemX} ${stemYEnd - 5} Q ${stemX + 8} ${stemYEnd - 11} ${stemX + 6} ${stemYEnd - 18}`
              }
              fill="none"
              stroke={isActive ? "#d97706" : isSelected ? "#2563eb" : "#1c1917"}
              strokeWidth="1.9"
              strokeLinecap="round"
            />
          </g>
        )}

        {/* Thirtysecond Note Flags */}
        {note.duration === "thirtysecond" && hasStem && (
          <g>
            <path
              d={
                stemUp
                  ? `M ${stemX} ${stemYEnd} Q ${stemX + 8} ${stemYEnd + 5} ${stemX + 6} ${stemYEnd + 12}`
                  : `M ${stemX} ${stemYEnd} Q ${stemX + 8} ${stemYEnd - 5} ${stemX + 6} ${stemYEnd - 12}`
              }
              fill="none"
              stroke={isActive ? "#d97706" : isSelected ? "#2563eb" : "#1c1917"}
              strokeWidth="1.8"
              strokeLinecap="round"
            />
            <path
              d={
                stemUp
                  ? `M ${stemX} ${stemYEnd + 5} Q ${stemX + 8} ${stemYEnd + 10} ${stemX + 6} ${stemYEnd + 17}`
                  : `M ${stemX} ${stemYEnd - 5} Q ${stemX + 8} ${stemYEnd - 10} ${stemX + 6} ${stemYEnd - 17}`
              }
              fill="none"
              stroke={isActive ? "#d97706" : isSelected ? "#2563eb" : "#1c1917"}
              strokeWidth="1.8"
              strokeLinecap="round"
            />
            <path
              d={
                stemUp
                  ? `M ${stemX} ${stemYEnd + 10} Q ${stemX + 8} ${stemYEnd + 15} ${stemX + 6} ${stemYEnd + 22}`
                  : `M ${stemX} ${stemYEnd - 10} Q ${stemX + 8} ${stemYEnd - 15} ${stemX + 6} ${stemYEnd - 22}`
              }
              fill="none"
              stroke={isActive ? "#d97706" : isSelected ? "#2563eb" : "#1c1917"}
              strokeWidth="1.8"
              strokeLinecap="round"
            />
          </g>
        )}

        {/* Voice indicator badge if multi-voice counterpoint */}
        {note.voice && (
          <text
            x={stemX + (stemUp ? 8 : -8)}
            y={stemYEnd + (stemUp ? -4 : 10)}
            fontSize="8"
            fontFamily="sans-serif"
            fontWeight="bold"
            fill={note.voice === 1 ? "#2563eb" : "#059669"}
            textAnchor="middle"
          >
            V{note.voice}
          </text>
        )}

        {/* Note / Chord Name Label with protective halo */}
        <text
          x={noteX}
          y={labelY}
          fontSize={allPitches.length > 2 ? "8.5" : "9.5"}
          fontFamily="sans-serif"
          fontWeight={isActive || isSelected ? "bold" : "600"}
          fill={isActive ? "#d97706" : isSelected ? "#2563eb" : "#57534e"}
          stroke="#fffdfa"
          strokeWidth="3.2"
          paintOrder="stroke fill"
          textAnchor="middle"
        >
          {formatChordPt(sortedPitches)}{note.dotted ? "." : ""}
        </text>
      </g>
    );
  });
}

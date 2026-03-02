// ─── CARD EDITOR OVERLAY ────────────────────────────────────────────────────
// Renders the per-card customization HUD when in edit mode.

import type { GridCardData, IconId, LottieId, IconPosition } from "../../types";
import { ICON_OPTIONS, LOTTIE_OPTIONS, ICON_POSITION_OPTIONS, BG_COLOR_OPTIONS } from "../../types";

type Props = {
    card: GridCardData;
    onUpdate: (id: string, updates: Partial<GridCardData>) => void;
    onRemove: (id: string) => void;
};

export default function CardEditor({ card, onUpdate, onRemove }: Props) {
    return (
        <div className="card-editor-ui">
            {/* Row 1: Size controls + delete */}
            <div className="editor-row-top">
                <div className="editor-controls">
                    <span>W:</span>
                    <button onClick={() => onUpdate(card.id, { colSpan: Math.max(1, card.colSpan - 1) })}>−</button>
                    <span className="size-val">{card.colSpan}</span>
                    <button onClick={() => onUpdate(card.id, { colSpan: Math.min(4, card.colSpan + 1) })}>+</button>
                    <span className="sep">H:</span>
                    <button onClick={() => onUpdate(card.id, { rowSpan: Math.max(1, card.rowSpan - 1) })}>−</button>
                    <span className="size-val">{card.rowSpan}</span>
                    <button onClick={() => onUpdate(card.id, { rowSpan: Math.min(3, card.rowSpan + 1) })}>+</button>
                </div>
                <button className="delete-btn" onClick={() => onRemove(card.id)} title="Delete card">✕</button>
            </div>

            {/* Row 2: Fine controls */}
            <div className="editor-row-bottom">
                {/* Border Radius */}
                <label className="editor-mini" title="Border Radius">
                    ◐
                    <input
                        type="range"
                        min={0}
                        max={50}
                        value={card.borderRadius}
                        onChange={(e) => onUpdate(card.id, { borderRadius: Number(e.target.value) })}
                    />
                    <span>{card.borderRadius}</span>
                </label>

                {/* Icon */}
                <label className="editor-mini" title="Icon">
                    <select value={card.iconId} onChange={(e) => onUpdate(card.id, { iconId: e.target.value as IconId })}>
                        {ICON_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                    </select>
                </label>

                {/* Icon Position */}
                <label className="editor-mini" title="Icon Position">
                    <select value={card.iconPosition} onChange={(e) => onUpdate(card.id, { iconPosition: e.target.value as IconPosition })}>
                        {ICON_POSITION_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                    </select>
                </label>

                {/* Lottie */}
                <label className="editor-mini" title="Lottie Animation">
                    <select value={card.lottieId} onChange={(e) => onUpdate(card.id, { lottieId: e.target.value as LottieId })}>
                        {LOTTIE_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                    </select>
                </label>

                {/* Background Color */}
                <label className="editor-mini" title="Background Color">
                    <select value={card.bgColor} onChange={(e) => onUpdate(card.id, { bgColor: e.target.value })}>
                        {BG_COLOR_OPTIONS.map((o) => <option key={o.key} value={o.key}>{o.label}</option>)}
                    </select>
                </label>
            </div>
        </div>
    );
}

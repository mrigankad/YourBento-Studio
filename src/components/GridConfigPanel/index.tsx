// ─── GRID CONFIG PANEL ──────────────────────────────────────────────────────
// Slide-out panel for adjusting grid-level properties: columns, gap, row height, max width.

import type { GridConfig } from "../../types";

type Props = {
    config: GridConfig;
    onChange: (updates: Partial<GridConfig>) => void;
    isOpen: boolean;
    onClose: () => void;
};

export default function GridConfigPanel({ config, onChange, isOpen, onClose }: Props) {
    if (!isOpen) return null;

    return (
        <div className="config-panel-overlay" onClick={onClose}>
            <div className="config-panel" onClick={(e) => e.stopPropagation()}>
                <div className="config-header">
                    <h3>⚙️ Grid Settings</h3>
                    <button className="modal-close" onClick={onClose}>✕</button>
                </div>

                <div className="config-body">
                    {/* Columns */}
                    <div className="config-row">
                        <label>Columns</label>
                        <div className="config-slider-row">
                            <input
                                type="range"
                                min={2}
                                max={6}
                                step={1}
                                value={config.columns}
                                onChange={(e) => onChange({ columns: Number(e.target.value) })}
                            />
                            <span className="config-val">{config.columns}</span>
                        </div>
                    </div>

                    {/* Gap */}
                    <div className="config-row">
                        <label>Gap Size</label>
                        <div className="config-slider-row">
                            <input
                                type="range"
                                min={8}
                                max={48}
                                step={4}
                                value={config.gap}
                                onChange={(e) => onChange({ gap: Number(e.target.value) })}
                            />
                            <span className="config-val">{config.gap}px</span>
                        </div>
                    </div>

                    {/* Row Height */}
                    <div className="config-row">
                        <label>Row Height</label>
                        <div className="config-slider-row">
                            <input
                                type="range"
                                min={160}
                                max={400}
                                step={20}
                                value={config.rowHeight}
                                onChange={(e) => onChange({ rowHeight: Number(e.target.value) })}
                            />
                            <span className="config-val">{config.rowHeight}px</span>
                        </div>
                    </div>

                    {/* Max Width */}
                    <div className="config-row">
                        <label>Max Width</label>
                        <div className="config-slider-row">
                            <input
                                type="range"
                                min={800}
                                max={1600}
                                step={100}
                                value={config.maxWidth}
                                onChange={(e) => onChange({ maxWidth: Number(e.target.value) })}
                            />
                            <span className="config-val">{config.maxWidth}px</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

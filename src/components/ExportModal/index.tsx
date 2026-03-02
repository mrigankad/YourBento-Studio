// ─── EXPORT MODAL ───────────────────────────────────────────────────────────
// Full-screen modal with tabbed code preview: React, HTML, Vue, JSON, CSS

import type { GridCardData, GridConfig } from "../../types";
import { exportReact, exportHTML, exportVue, exportJSON, exportCSS } from "../../export/exportEngine";
import { useState, useCallback, useEffect } from "react";

type Props = {
    gridData: GridCardData[];
    themeColor: string;
    themeStyle: string;
    gridConfig: GridConfig;
    onClose: () => void;
    onToast: (msg: string) => void;
};

type Format = "react" | "html" | "vue" | "json" | "css";

export default function ExportModal({ gridData, themeColor, themeStyle, gridConfig, onClose, onToast }: Props) {
    const [format, setFormat] = useState<Format>("react");
    const [output, setOutput] = useState("");

    const generate = useCallback((fmt: Format) => {
        const config = { themeColor, themeStyle, gridConfig };
        switch (fmt) {
            case "react": return exportReact(gridData, config);
            case "html": return exportHTML(gridData, config);
            case "vue": return exportVue(gridData, config);
            case "json": return exportJSON(gridData, config);
            case "css": return exportCSS(config);
        }
    }, [gridData, themeColor, themeStyle, gridConfig]);

    useEffect(() => {
        setOutput(generate(format));
    }, [format, generate]);

    const handleCopy = () => {
        navigator.clipboard.writeText(output);
        onToast("Copied to clipboard!");
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h2>📤 Export Code</h2>
                    <button className="modal-close" onClick={onClose}>✕</button>
                </div>
                <div className="modal-tabs">
                    {(["react", "html", "vue", "css", "json"] as Format[]).map((fmt) => (
                        <button key={fmt} className={`tab-btn ${format === fmt ? "active" : ""}`} onClick={() => setFormat(fmt)}>
                            {fmt.toUpperCase()}
                        </button>
                    ))}
                </div>
                <pre className="modal-code">{output}</pre>
                <div className="modal-actions">
                    <span className="modal-info">{gridData.length} cards • {themeColor} • {themeStyle}</span>
                    <button className="start-btn" onClick={handleCopy}>📋 Copy to Clipboard</button>
                </div>
            </div>
        </div>
    );
}

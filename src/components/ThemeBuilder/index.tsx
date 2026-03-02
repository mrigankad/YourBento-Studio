// ─── THEME BUILDER ──────────────────────────────────────────────────────────
// Custom theme creator with visual color picker, presets, and live preview.
// Features Neubrutalism styling with glassmorphism panels.

import { useState, useEffect, useCallback } from "react";
import type { CustomTheme } from "../../types";
import { THEME_PRESETS, DEFAULT_CUSTOM_THEME } from "../../types";

type Props = {
    currentTheme: CustomTheme;
    onThemeChange: (theme: CustomTheme) => void;
    isOpen: boolean;
    onClose: () => void;
};

// Color input component with neubrutalism styling
function ColorInput({
    label,
    value,
    onChange,
}: {
    label: string;
    value: string;
    onChange: (color: string) => void;
}) {
    return (
        <div className="theme-color-item">
            <label className="theme-color-label">{label}</label>
            <div className="theme-color-wrapper">
                <input
                    type="color"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    className="theme-color-input"
                />
                <input
                    type="text"
                    value={value.toUpperCase()}
                    onChange={(e) => onChange(e.target.value)}
                    className="theme-color-text"
                />
            </div>
        </div>
    );
}

// Mini preview card for theme
function MiniPreview({ theme }: { theme: CustomTheme }) {
    return (
        <div
            className="theme-mini-preview"
            style={{ backgroundColor: theme.colors.bg }}
        >
            <div
                className="mini-card mini-card-1"
                style={{ backgroundColor: theme.colors.card1 }}
            />
            <div
                className="mini-card mini-card-2"
                style={{ backgroundColor: theme.colors.card2 }}
            />
            <div
                className="mini-card mini-card-3"
                style={{ backgroundColor: theme.colors.card3 }}
            />
            <div
                className="mini-card mini-card-4"
                style={{ backgroundColor: theme.colors.card4 }}
            />
        </div>
    );
}

export default function ThemeBuilder({ currentTheme, onThemeChange, isOpen, onClose }: Props) {
    const [localTheme, setLocalTheme] = useState<CustomTheme>(currentTheme);
    const [activeTab, setActiveTab] = useState<"presets" | "custom">("presets");
    const [isDirty, setIsDirty] = useState(false);

    useEffect(() => {
        setLocalTheme(currentTheme);
    }, [currentTheme, isOpen]);

    const handleColorChange = useCallback((key: keyof CustomTheme["colors"], color: string) => {
        setLocalTheme((prev) => ({
            ...prev,
            colors: { ...prev.colors, [key]: color },
        }));
        setIsDirty(true);
    }, []);

    const handleApplyPreset = useCallback((preset: CustomTheme) => {
        setLocalTheme({ ...preset, id: "custom", name: "My Custom Theme" });
        setIsDirty(true);
        setActiveTab("custom");
    }, []);

    const handleSave = useCallback(() => {
        onThemeChange(localTheme);
        setIsDirty(false);
        onClose();
    }, [localTheme, onThemeChange, onClose]);

    const handleReset = useCallback(() => {
        setLocalTheme(DEFAULT_CUSTOM_THEME);
        setIsDirty(true);
    }, []);

    if (!isOpen) return null;

    return (
        <div className="theme-builder-overlay" onClick={onClose}>
            <div className="theme-builder-panel" onClick={(e) => e.stopPropagation()}>
                {/* Header */}
                <div className="theme-builder-header">
                    <div className="theme-builder-title">
                        <span className="theme-icon">🎨</span>
                        <div>
                            <h2>Theme Builder</h2>
                            <p>Create your perfect color palette</p>
                        </div>
                    </div>
                    <button className="theme-close-btn" onClick={onClose}>
                        ✕
                    </button>
                </div>

                {/* Tabs */}
                <div className="theme-tabs">
                    <button
                        className={`theme-tab ${activeTab === "presets" ? "active" : ""}`}
                        onClick={() => setActiveTab("presets")}
                    >
                        🎯 Presets
                    </button>
                    <button
                        className={`theme-tab ${activeTab === "custom" ? "active" : ""}`}
                        onClick={() => setActiveTab("custom")}
                    >
                        ⚙️ Customize
                    </button>
                </div>

                {/* Content */}
                <div className="theme-builder-body">
                    {activeTab === "presets" ? (
                        <div className="theme-presets">
                            <p className="theme-section-desc">
                                Choose a preset to start with, then customize it to your liking
                            </p>
                            <div className="theme-presets-grid">
                                {THEME_PRESETS.map((preset) => (
                                    <button
                                        key={preset.id}
                                        className="theme-preset-card"
                                        onClick={() => handleApplyPreset(preset)}
                                    >
                                        <MiniPreview theme={preset} />
                                        <span className="theme-preset-name">{preset.name}</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div className="theme-custom">
                            {/* Live Preview */}
                            <div className="theme-preview-section">
                                <label className="theme-section-label">Live Preview</label>
                                <div
                                    className="theme-preview-large"
                                    style={{ backgroundColor: localTheme.colors.bg }}
                                >
                                    <div
                                        className="preview-card preview-hero"
                                        style={{
                                            backgroundColor: localTheme.colors.card1,
                                            borderColor: localTheme.colors.border,
                                        }}
                                    >
                                        <span style={{ color: localTheme.colors.textMain }}>
                                            Hero
                                        </span>
                                    </div>
                                    <div className="preview-row">
                                        <div
                                            className="preview-card preview-small"
                                            style={{
                                                backgroundColor: localTheme.colors.card2,
                                                borderColor: localTheme.colors.border,
                                            }}
                                        >
                                            <span style={{ color: localTheme.colors.textMain }}>
                                                Card
                                            </span>
                                        </div>
                                        <div
                                            className="preview-card preview-small"
                                            style={{
                                                backgroundColor: localTheme.colors.card3,
                                                borderColor: localTheme.colors.border,
                                            }}
                                        >
                                            <span style={{ color: localTheme.colors.textMain }}>
                                                Card
                                            </span>
                                        </div>
                                    </div>
                                    <div
                                        className="preview-card preview-wide"
                                        style={{
                                            backgroundColor: localTheme.colors.card4,
                                            borderColor: localTheme.colors.border,
                                        }}
                                    >
                                        <span style={{ color: localTheme.colors.textMain }}>
                                            Wide Card
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Color Controls */}
                            <div className="theme-colors-section">
                                <label className="theme-section-label">Colors</label>
                                <div className="theme-colors-grid">
                                    <ColorInput
                                        label="Background"
                                        value={localTheme.colors.bg}
                                        onChange={(c) => handleColorChange("bg", c)}
                                    />
                                    <ColorInput
                                        label="Primary Card"
                                        value={localTheme.colors.card1}
                                        onChange={(c) => handleColorChange("card1", c)}
                                    />
                                    <ColorInput
                                        label="Secondary Card"
                                        value={localTheme.colors.card2}
                                        onChange={(c) => handleColorChange("card2", c)}
                                    />
                                    <ColorInput
                                        label="Accent Card"
                                        value={localTheme.colors.card3}
                                        onChange={(c) => handleColorChange("card3", c)}
                                    />
                                    <ColorInput
                                        label="Highlight Card"
                                        value={localTheme.colors.card4}
                                        onChange={(c) => handleColorChange("card4", c)}
                                    />
                                    <ColorInput
                                        label="Light Card"
                                        value={localTheme.colors.cardWhite}
                                        onChange={(c) => handleColorChange("cardWhite", c)}
                                    />
                                    <ColorInput
                                        label="Text Primary"
                                        value={localTheme.colors.textMain}
                                        onChange={(c) => handleColorChange("textMain", c)}
                                    />
                                    <ColorInput
                                        label="Text Secondary"
                                        value={localTheme.colors.textSub}
                                        onChange={(c) => handleColorChange("textSub", c)}
                                    />
                                    <ColorInput
                                        label="Border"
                                        value={localTheme.colors.border}
                                        onChange={(c) => handleColorChange("border", c)}
                                    />
                                </div>
                            </div>

                            {/* Quick Actions */}
                            <div className="theme-quick-actions">
                                <button className="theme-action-btn reset" onClick={handleReset}>
                                    🔄 Reset
                                </button>
                                <button className="theme-action-btn random" onClick={() => {
                                    const randomColor = () => "#" + Math.floor(Math.random() * 16777215).toString(16).padStart(6, "0");
                                    setLocalTheme(prev => ({
                                        ...prev,
                                        colors: {
                                            bg: randomColor(),
                                            card1: randomColor(),
                                            card2: randomColor(),
                                            card3: randomColor(),
                                            card4: randomColor(),
                                            cardWhite: randomColor(),
                                            textMain: randomColor(),
                                            textSub: randomColor(),
                                            border: randomColor(),
                                        }
                                    }));
                                    setIsDirty(true);
                                }}>
                                    🎲 Randomize
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="theme-builder-footer">
                    {isDirty && activeTab === "custom" && (
                        <span className="theme-unsaved">● Unsaved changes</span>
                    )}
                    <div className="theme-footer-actions">
                        <button className="theme-btn secondary" onClick={onClose}>
                            Cancel
                        </button>
                        <button
                            className="theme-btn primary"
                            onClick={handleSave}
                            disabled={!isDirty && activeTab === "custom"}
                        >
                            Apply Theme
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

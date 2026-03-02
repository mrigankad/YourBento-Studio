// ─── SIDEBAR ────────────────────────────────────────────────────────────────
// Vertical sidebar with Phosphor icon buttons, dropdowns, and font selector.

import { useState } from "react";
import type { PreviewMode } from "../../types";
import { ALL_TEMPLATES } from "../../templates";
import {
    PencilSimple,
    Check,
    ArrowCounterClockwise,
    ArrowClockwise,
    Export,
    ShareNetwork,
    ArrowsCounterClockwise,
    GearSix,
    Palette,
    Desktop,
    DeviceTablet,
    DeviceMobile,
    Layout,
    TextAa,
} from "@phosphor-icons/react";

type Props = {
    themeColor: string;
    themeStyle: string;
    previewMode: PreviewMode;
    editMode: boolean;
    canUndo: boolean;
    canRedo: boolean;
    fontFamily: string;
    onColorChange: (v: string) => void;
    onStyleChange: (v: string) => void;
    onPreviewChange: (v: PreviewMode) => void;
    onEditToggle: () => void;
    onUndo: () => void;
    onRedo: () => void;
    onExport: () => void;
    onReset: () => void;
    onLoadTemplate: (key: string) => void;
    onOpenGridConfig: () => void;
    onOpenThemeBuilder: () => void;
    onShare: () => void;
    onFontChange: (v: string) => void;
    useCustomTheme: boolean;
};

const FONTS = [
    { value: "'Space Grotesk', sans-serif", label: "Space Grotesk" },
    { value: "'Inter', sans-serif", label: "Inter" },
    { value: "'Poppins', sans-serif", label: "Poppins" },
    { value: "'DM Sans', sans-serif", label: "DM Sans" },
    { value: "'Outfit', sans-serif", label: "Outfit" },
    { value: "'Sora', sans-serif", label: "Sora" },
    { value: "'IBM Plex Sans', sans-serif", label: "IBM Plex Sans" },
    { value: "'JetBrains Mono', monospace", label: "JetBrains Mono" },
    { value: "'Playfair Display', serif", label: "Playfair Display" },
    { value: "'Caveat', cursive", label: "Caveat" },
];

export default function Sidebar(props: Props) {
    const [expanded, setExpanded] = useState(true);

    return (
        <nav className={`sidebar ${expanded ? "expanded" : "collapsed"}`}>
            {/* Logo */}
            <div className="sidebar-logo" onClick={() => setExpanded(!expanded)}>
                <Layout size={24} weight="bold" />
                {expanded && <span>YB Studio</span>}
            </div>

            <div className="sidebar-divider" />

            {/* ─── THEME ─── */}
            {expanded && <div className="sidebar-label">Theme</div>}

            <div className="sidebar-section">
                {/* Colors */}
                {expanded && (
                    <select
                        className="sidebar-select"
                        value={props.useCustomTheme ? "custom" : props.themeColor}
                        onChange={(e) => {
                            if (e.target.value === "custom") props.onOpenThemeBuilder();
                            else props.onColorChange(e.target.value);
                        }}
                    >
                        <option value="candy">🍬 Candy</option>
                        <option value="monotone">🖤 Monotone</option>
                        <option value="dark">🌙 Dark</option>
                        <option value="pastel">🎀 Pastel</option>
                        <option value="custom">🎨 Custom...</option>
                    </select>
                )}

                {/* Style */}
                {expanded && (
                    <select
                        className="sidebar-select"
                        value={props.themeStyle}
                        onChange={(e) => props.onStyleChange(e.target.value)}
                    >
                        <option value="brutal">Neo-Brutalism</option>
                        <option value="glass">Glassmorphism</option>
                        <option value="flat">Minimal Flat</option>
                        <option value="retro">Retro Pixel</option>
                        <option value="neumorph">Neumorphism</option>
                        <option value="clay">Claymorphism</option>
                    </select>
                )}

                {/* Font */}
                {expanded && (
                    <div className="sidebar-font-row">
                        <TextAa size={16} weight="bold" />
                        <select
                            className="sidebar-select"
                            value={props.fontFamily}
                            onChange={(e) => props.onFontChange(e.target.value)}
                        >
                            {FONTS.map((f) => (
                                <option key={f.value} value={f.value}>{f.label}</option>
                            ))}
                        </select>
                    </div>
                )}
            </div>

            <div className="sidebar-divider" />

            {/* ─── TEMPLATE ─── */}
            {expanded && <div className="sidebar-label">Template</div>}
            {expanded && (
                <select
                    className="sidebar-select"
                    value=""
                    onChange={(e) => {
                        if (e.target.value) {
                            props.onLoadTemplate(e.target.value);
                            e.target.value = "";
                        }
                    }}
                >
                    <option value="">Load template...</option>
                    {Object.entries(ALL_TEMPLATES).map(([key, tpl]) => (
                        <option key={key} value={key}>{tpl.name}</option>
                    ))}
                </select>
            )}

            <div className="sidebar-divider" />

            {/* ─── PREVIEW ─── */}
            {expanded && <div className="sidebar-label">Preview</div>}
            <div className="sidebar-row">
                <button
                    className={`sidebar-icon-btn ${props.previewMode === "desktop" ? "active" : ""}`}
                    onClick={() => props.onPreviewChange("desktop")}
                    title="Desktop"
                >
                    <Desktop size={20} weight="bold" />
                </button>
                <button
                    className={`sidebar-icon-btn ${props.previewMode === "tablet" ? "active" : ""}`}
                    onClick={() => props.onPreviewChange("tablet")}
                    title="Tablet"
                >
                    <DeviceTablet size={20} weight="bold" />
                </button>
                <button
                    className={`sidebar-icon-btn ${props.previewMode === "mobile" ? "active" : ""}`}
                    onClick={() => props.onPreviewChange("mobile")}
                    title="Mobile"
                >
                    <DeviceMobile size={20} weight="bold" />
                </button>
            </div>

            <div className="sidebar-divider" />

            {/* ─── ACTIONS ─── */}
            {expanded && <div className="sidebar-label">Actions</div>}

            {/* Edit */}
            <button
                className={`sidebar-btn ${props.editMode ? "active" : ""}`}
                onClick={props.onEditToggle}
                title={props.editMode ? "Done Editing" : "Edit Mode"}
            >
                {props.editMode ? <Check size={18} weight="bold" /> : <PencilSimple size={18} weight="bold" />}
                {expanded && <span>{props.editMode ? "Done" : "Edit"}</span>}
            </button>

            {/* Undo / Redo row */}
            <div className="sidebar-row">
                <button className="sidebar-icon-btn" disabled={!props.canUndo} onClick={props.onUndo} title="Undo">
                    <ArrowCounterClockwise size={18} weight="bold" />
                </button>
                <button className="sidebar-icon-btn" disabled={!props.canRedo} onClick={props.onRedo} title="Redo">
                    <ArrowClockwise size={18} weight="bold" />
                </button>
            </div>

            {/* Grid Config */}
            <button className="sidebar-btn" onClick={props.onOpenGridConfig} title="Grid Settings">
                <GearSix size={18} weight="bold" />
                {expanded && <span>Grid</span>}
            </button>

            {/* Theme Builder */}
            <button className="sidebar-btn" onClick={props.onOpenThemeBuilder} title="Theme Builder">
                <Palette size={18} weight="bold" />
                {expanded && <span>Theme</span>}
            </button>

            <div className="sidebar-spacer" />

            {/* ─── BOTTOM ACTIONS ─── */}
            <button className="sidebar-btn export-btn" onClick={props.onExport} title="Export Code">
                <Export size={18} weight="bold" />
                {expanded && <span>Export</span>}
            </button>

            <button className="sidebar-btn" onClick={props.onShare} title="Share via URL">
                <ShareNetwork size={18} weight="bold" />
                {expanded && <span>Share</span>}
            </button>

            <button className="sidebar-btn" onClick={props.onReset} title="Reset">
                <ArrowsCounterClockwise size={18} weight="bold" />
                {expanded && <span>Reset</span>}
            </button>
        </nav>
    );
}

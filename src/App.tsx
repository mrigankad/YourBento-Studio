// ─── APP.TSX — YOURBENTO STUDIO ORCHESTRATOR ─────────────────────────────────
// Layout: sidebar (left) + main content (right). Skeleton on initial load.

import { useState, useEffect, useCallback } from "react";

import type { GridCardData, GridConfig, PreviewMode, CustomTheme } from "./types";
import { DEFAULT_GRID, DEFAULT_GRID_CONFIG, encodeShareURL, decodeShareURL, DEFAULT_CUSTOM_THEME } from "./types";
import { ALL_TEMPLATES } from "./templates";

import { useHistory } from "./hooks/useHistory";
import { useLocalStorage } from "./hooks/useLocalStorage";

import Sidebar from "./components/ControlPanel";
import BentoCard from "./components/BentoCard";
import ExportModal from "./components/ExportModal";
import GridConfigPanel from "./components/GridConfigPanel";
import ThemeBuilder from "./components/ThemeBuilder";
import SkeletonLoader from "./components/SkeletonLoader";

import "./App.css";

// ─── PREVIEW WIDTH MAP ──────────────────────────────────────────────────────
const PREVIEW_WIDTHS: Record<PreviewMode, string> = {
  desktop: "100%",
  tablet: "768px",
  mobile: "375px",
};

// ─── APP ────────────────────────────────────────────────────────────────────
function App() {
  // Shared URL data
  const sharedData = decodeShareURL();

  // Persistent preferences
  const [savedColor, setSavedColor] = useLocalStorage("yb-color", sharedData?.color ?? "candy");
  const [savedStyle, setSavedStyle] = useLocalStorage("yb-style", sharedData?.style ?? "brutal");
  const [savedGrid] = useLocalStorage<GridCardData[] | null>("yb-grid", null);
  const [savedConfig, setSavedConfig] = useLocalStorage<GridConfig>("yb-config", sharedData?.config ?? DEFAULT_GRID_CONFIG);
  const [savedFont, setSavedFont] = useLocalStorage("yb-font", "'Space Grotesk', sans-serif");

  // Custom theme
  const [customTheme, setCustomTheme] = useLocalStorage<CustomTheme>("yb-custom-theme", DEFAULT_CUSTOM_THEME);
  const [useCustomTheme, setUseCustomTheme] = useLocalStorage("yb-use-custom", false);

  // History-backed grid state
  const {
    state: gridData,
    set: setGridData,
    undo, redo,
    canUndo, canRedo,
    reset: resetGrid,
  } = useHistory<GridCardData[]>(sharedData?.cards ?? savedGrid ?? DEFAULT_GRID);

  // UI state
  const [editMode, setEditMode] = useState(false);
  const [previewMode, setPreviewMode] = useState<PreviewMode>("desktop");
  const [exportOpen, setExportOpen] = useState(false);
  const [gridConfigOpen, setGridConfigOpen] = useState(false);
  const [themeBuilderOpen, setThemeBuilderOpen] = useState(false);
  const [toastMsg, setToastMsg] = useState("");
  const [dragSource, setDragSource] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  // Grid config
  const gridConfig = savedConfig;
  const setGridConfig = (updates: Partial<GridConfig>) => {
    setSavedConfig({ ...gridConfig, ...updates });
  };

  // Autosave grid
  useEffect(() => {
    try { window.localStorage.setItem("yb-grid", JSON.stringify(gridData)); }
    catch { /* storage full */ }
  }, [gridData]);

  // Clear shared URL params
  useEffect(() => {
    if (sharedData) window.history.replaceState({}, "", window.location.pathname);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Skeleton loader dismiss
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  // Keyboard shortcuts
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "z" && !e.shiftKey) { e.preventDefault(); undo(); }
      if ((e.ctrlKey || e.metaKey) && (e.key === "Z" || (e.key === "z" && e.shiftKey))) { e.preventDefault(); redo(); }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [undo, redo]);

  // Apply theme
  useEffect(() => {
    if (useCustomTheme) {
      document.documentElement.setAttribute("data-color", "custom");
      const c = customTheme.colors;
      const root = document.documentElement.style;
      root.setProperty("--bg-color", c.bg);
      root.setProperty("--card-bg-1", c.card1);
      root.setProperty("--card-bg-2", c.card2);
      root.setProperty("--card-bg-3", c.card3);
      root.setProperty("--card-bg-4", c.card4);
      root.setProperty("--card-bg-white", c.cardWhite);
      root.setProperty("--text-main", c.textMain);
      root.setProperty("--text-sub", c.textSub);
      root.setProperty("--border-color", c.border);
      root.setProperty("--card-text-invert", c.textMain);
    } else {
      document.documentElement.setAttribute("data-color", savedColor);
      const vars = ["--bg-color", "--card-bg-1", "--card-bg-2", "--card-bg-3", "--card-bg-4", "--card-bg-white", "--text-main", "--text-sub", "--border-color", "--card-text-invert"];
      vars.forEach(v => document.documentElement.style.removeProperty(v));
    }
    document.documentElement.setAttribute("data-style", savedStyle);
  }, [savedColor, savedStyle, useCustomTheme, customTheme]);

  // Apply font
  useEffect(() => {
    document.documentElement.style.setProperty("--font-family", savedFont);
  }, [savedFont]);

  // Toast
  const showToast = useCallback((msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(""), 2500);
  }, []);

  // ─── HANDLERS ─────────────────────────────────────────────────────────────

  const handleAddCard = (type: string) => {
    const newCard: GridCardData = {
      id: `cm_${Date.now()}`,
      type: type as GridCardData["type"],
      title: "New Block",
      subtitle: "Click to edit",
      colSpan: 1, rowSpan: 1,
      borderRadius: 16,
      iconId: type === "stats" ? "chart" : type === "action" ? "zap" : "none",
      iconPosition: "top-left",
      lottieId: "none",
      bgColor: "card-bg-white",
    };
    if (type === "stats") newCard.statValue = "0";
    if (type === "hero") { newCard.buttonText = "Click Me"; newCard.colSpan = 2; newCard.rowSpan = 2; newCard.lottieId = "schedule"; newCard.bgColor = "card-bg-1"; }
    setGridData([...gridData, newCard]);
    showToast("Widget added!");
  };

  const handleUpdateCard = (id: string, updates: Partial<GridCardData>) => {
    setGridData(gridData.map((c) => (c.id === id ? { ...c, ...updates } : c)));
  };

  const handleRemoveCard = (id: string) => {
    setGridData(gridData.filter((c) => c.id !== id));
    showToast("Widget removed");
  };

  const handleLoadTemplate = (key: string) => {
    const tpl = ALL_TEMPLATES[key];
    if (tpl) {
      setLoading(true);
      setTimeout(() => { resetGrid(tpl.data); setLoading(false); showToast(`Loaded: ${tpl.name}`); }, 500);
    }
  };

  const handleResetLayout = () => {
    setLoading(true);
    setTimeout(() => { resetGrid(DEFAULT_GRID); setSavedConfig(DEFAULT_GRID_CONFIG); setLoading(false); showToast("Reset to default"); }, 500);
  };

  const handleShare = () => {
    const url = encodeShareURL({ cards: gridData, color: savedColor, style: savedStyle, config: gridConfig });
    navigator.clipboard.writeText(url);
    showToast("Share link copied!");
  };

  // Drag & Drop
  const handleDragStart = (idx: number) => setDragSource(idx);
  const handleDragOver = (e: React.DragEvent) => e.preventDefault();
  const handleDrop = (targetIdx: number) => {
    if (dragSource === null || dragSource === targetIdx) return;
    const reordered = [...gridData];
    const [moved] = reordered.splice(dragSource, 1);
    reordered.splice(targetIdx, 0, moved);
    setGridData(reordered);
    setDragSource(null);
  };

  // ─── RENDER ───────────────────────────────────────────────────────────────

  return (
    <div className={`app-layout ${editMode ? "is-editing" : ""}`}>
      {/* Toast */}
      {toastMsg && <div className="toast">{toastMsg}</div>}

      {/* Sidebar */}
      <Sidebar
        themeColor={savedColor}
        themeStyle={savedStyle}
        previewMode={previewMode}
        editMode={editMode}
        canUndo={canUndo}
        canRedo={canRedo}
        fontFamily={savedFont}
        onColorChange={(v) => { setSavedColor(v); setUseCustomTheme(false); }}
        onStyleChange={setSavedStyle}
        onPreviewChange={setPreviewMode}
        onEditToggle={() => setEditMode(!editMode)}
        onUndo={undo}
        onRedo={redo}
        onExport={() => setExportOpen(true)}
        onReset={handleResetLayout}
        onLoadTemplate={handleLoadTemplate}
        onOpenGridConfig={() => setGridConfigOpen(true)}
        onOpenThemeBuilder={() => setThemeBuilderOpen(true)}
        onShare={handleShare}
        onFontChange={setSavedFont}
        useCustomTheme={useCustomTheme}
      />

      {/* Main Content */}
      <main className="main-content">
        {/* Header */}
        <div className="header animated">
          <h1>YourBento Studio</h1>
          <p>Design → Customize → Export production code</p>
        </div>

        {/* Grid */}
        <div
          className="preview-wrapper"
          style={{
            maxWidth: previewMode !== "desktop" ? PREVIEW_WIDTHS[previewMode] : `${gridConfig.maxWidth}px`,
            transition: "max-width 0.4s ease",
          }}
        >
          {loading ? (
            <SkeletonLoader columns={gridConfig.columns} count={6} />
          ) : (
            <div
              className="bento-grid"
              style={{
                gridTemplateColumns: `repeat(${previewMode === "mobile" ? 1 : previewMode === "tablet" ? 2 : gridConfig.columns}, 1fr)`,
                gridAutoRows: `${gridConfig.rowHeight}px`,
                gap: `${gridConfig.gap}px`,
              }}
            >
              {gridData.map((card, index) => (
                <BentoCard
                  key={card.id}
                  card={card}
                  index={index}
                  editMode={editMode}
                  isDragging={dragSource === index}
                  onUpdate={handleUpdateCard}
                  onRemove={handleRemoveCard}
                  onDragStart={handleDragStart}
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                />
              ))}

              {editMode && (
                <div className="bento-card editor-add-card">
                  <span className="add-icon">➕</span>
                  <select
                    onChange={(e) => { if (e.target.value) { handleAddCard(e.target.value); e.target.value = ""; } }}
                    className="add-select"
                  >
                    <option value="">Add Widget...</option>
                    <option value="hero">Hero Block</option>
                    <option value="stats">Stats Counter</option>
                    <option value="target">Animated Target</option>
                    <option value="checklist">Tall Checklist</option>
                    <option value="action">Quick Action</option>
                    <option value="contracts">Contracts</option>
                  </select>
                </div>
              )}
            </div>
          )}
        </div>
      </main>

      {/* Panels & Modals */}
      <GridConfigPanel config={gridConfig} onChange={setGridConfig} isOpen={gridConfigOpen} onClose={() => setGridConfigOpen(false)} />
      <ThemeBuilder
        currentTheme={customTheme}
        onThemeChange={(theme) => { setCustomTheme(theme); setUseCustomTheme(true); showToast("Custom theme applied!"); }}
        isOpen={themeBuilderOpen}
        onClose={() => setThemeBuilderOpen(false)}
      />
      {exportOpen && (
        <ExportModal gridData={gridData} themeColor={savedColor} themeStyle={savedStyle} gridConfig={gridConfig} onClose={() => setExportOpen(false)} onToast={showToast} />
      )}
    </div>
  );
}

export default App;

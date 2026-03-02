// ─── CORE TYPES ─────────────────────────────────────────────────────────────
// Central type definitions for YourBento Studio

export type CardType = "hero" | "target" | "checklist" | "stats" | "contracts" | "action";

export type IconId = "target" | "chart" | "zap" | "arrow" | "star" | "heart" | "globe" | "shield" | "rocket" | "none";

export type LottieId = "schedule" | "target" | "checklist" | "contract" | "none";

export type IconPosition = "top-left" | "top-right" | "center" | "bottom-left" | "bottom-right";

export type GridCardData = {
    id: string;
    type: CardType;
    title: string;
    subtitle: string;
    colSpan: number;
    rowSpan: number;
    statValue?: string;
    buttonText?: string;
    // Per-card customization
    borderRadius: number;      // 0–50 px
    iconId: IconId;
    iconPosition: IconPosition;
    lottieId: LottieId;
    bgColor: string;           // CSS variable key like "card-bg-1"
};

export type GridConfig = {
    columns: number;           // 2–6
    gap: number;               // 8–48 px
    rowHeight: number;         // 160–400 px
    maxWidth: number;          // 800–1600 px
};

export type PreviewMode = "desktop" | "tablet" | "mobile";

// ─── CUSTOM THEME ───────────────────────────────────────────────────────────

export type CustomTheme = {
    id: string;
    name: string;
    colors: {
        bg: string;
        card1: string;
        card2: string;
        card3: string;
        card4: string;
        cardWhite: string;
        textMain: string;
        textSub: string;
        border: string;
    };
};

export const DEFAULT_CUSTOM_THEME: CustomTheme = {
    id: "custom",
    name: "My Custom Theme",
    colors: {
        bg: "#f7e1d7",
        card1: "#ff90e8",
        card2: "#ffc900",
        card3: "#90dbf4",
        card4: "#c1fba4",
        cardWhite: "#ffffff",
        textMain: "#000000",
        textSub: "#1a1a1a",
        border: "#000000",
    },
};

export const THEME_PRESETS: CustomTheme[] = [
    {
        id: "candy",
        name: "Candy Pop",
        colors: {
            bg: "#f7e1d7",
            card1: "#ff90e8",
            card2: "#ffc900",
            card3: "#90dbf4",
            card4: "#c1fba4",
            cardWhite: "#ffffff",
            textMain: "#000000",
            textSub: "#1a1a1a",
            border: "#000000",
        },
    },
    {
        id: "ocean",
        name: "Deep Ocean",
        colors: {
            bg: "#0a1628",
            card1: "#0066ff",
            card2: "#00d4ff",
            card3: "#7b2cbf",
            card4: "#ff006e",
            cardWhite: "#162544",
            textMain: "#ffffff",
            textSub: "#a8b2d1",
            border: "#64ffda",
        },
    },
    {
        id: "forest",
        name: "Mystic Forest",
        colors: {
            bg: "#1a2f1a",
            card1: "#2d5a27",
            card2: "#87a878",
            card3: "#b4c5ac",
            card4: "#f4a261",
            cardWhite: "#2a3a2a",
            textMain: "#f1faee",
            textSub: "#a8dadc",
            border: "#57cc99",
        },
    },
    {
        id: "sunset",
        name: "Sunset Vibes",
        colors: {
            bg: "#2d1b2e",
            card1: "#ff6b6b",
            card2: "#f9c74f",
            card3: "#f94144",
            card4: "#90be6d",
            cardWhite: "#3d243e",
            textMain: "#fff0f5",
            textSub: "#ffb4a2",
            border: "#ff006e",
        },
    },
    {
        id: "cyber",
        name: "Cyber Punk",
        colors: {
            bg: "#0d0221",
            card1: "#ff00ff",
            card2: "#00ffff",
            card3: "#ff3864",
            card4: "#261447",
            cardWhite: "#1a0b2e",
            textMain: "#00ff00",
            textSub: "#ff00ff",
            border: "#00ffff",
        },
    },
    {
        id: "cream",
        name: "Soft Cream",
        colors: {
            bg: "#faf9f6",
            card1: "#e8d5c4",
            card2: "#d4a373",
            card3: "#ccd5ae",
            card4: "#faedcd",
            cardWhite: "#ffffff",
            textMain: "#3d405b",
            textSub: "#6b705c",
            border: "#3d405b",
        },
    },
];

// ─── DEFAULTS ───────────────────────────────────────────────────────────────

export const DEFAULT_GRID_CONFIG: GridConfig = {
    columns: 4,
    gap: 32,
    rowHeight: 240,
    maxWidth: 1400,
};

export const BG_COLOR_OPTIONS = [
    { key: "card-bg-1", label: "Primary" },
    { key: "card-bg-2", label: "Secondary" },
    { key: "card-bg-3", label: "Accent" },
    { key: "card-bg-4", label: "Highlight" },
    { key: "card-bg-white", label: "White" },
];

export const ICON_OPTIONS: { value: IconId; label: string }[] = [
    { value: "none", label: "None" },
    { value: "target", label: "🎯 Target" },
    { value: "chart", label: "📊 Chart" },
    { value: "zap", label: "⚡ Zap" },
    { value: "star", label: "⭐ Star" },
    { value: "heart", label: "❤️ Heart" },
    { value: "globe", label: "🌐 Globe" },
    { value: "shield", label: "🛡️ Shield" },
    { value: "rocket", label: "🚀 Rocket" },
    { value: "arrow", label: "➡️ Arrow" },
];

export const LOTTIE_OPTIONS: { value: LottieId; label: string }[] = [
    { value: "none", label: "None" },
    { value: "schedule", label: "📅 Schedule" },
    { value: "target", label: "🎯 Target" },
    { value: "checklist", label: "✅ Checklist" },
    { value: "contract", label: "📄 Contract" },
];

export const ICON_POSITION_OPTIONS: { value: IconPosition; label: string }[] = [
    { value: "top-left", label: "↖ Top Left" },
    { value: "top-right", label: "↗ Top Right" },
    { value: "center", label: "◉ Center" },
    { value: "bottom-left", label: "↙ Bottom Left" },
    { value: "bottom-right", label: "↘ Bottom Right" },
];

// ─── DEFAULT GRID ───────────────────────────────────────────────────────────

export const DEFAULT_GRID: GridCardData[] = [
    { id: "cm_1", type: "hero", title: "Master Your Schedule", subtitle: "Plan your work perfectly. Stay ahead of your tasks.", colSpan: 2, rowSpan: 2, buttonText: "Let's Go!", borderRadius: 16, iconId: "arrow", iconPosition: "top-left", lottieId: "schedule", bgColor: "card-bg-1" },
    { id: "cm_2", type: "target", title: "Business Target", subtitle: "Hitting Q3 goals fast", colSpan: 1, rowSpan: 1, borderRadius: 16, iconId: "target", iconPosition: "top-left", lottieId: "target", bgColor: "card-bg-2" },
    { id: "cm_3", type: "checklist", title: "Daily Tasks", subtitle: "12/15 done!", colSpan: 1, rowSpan: 2, borderRadius: 16, iconId: "none", iconPosition: "top-left", lottieId: "checklist", bgColor: "card-bg-1" },
    { id: "cm_4", type: "stats", title: "Revenue", subtitle: "This month exactly", colSpan: 1, rowSpan: 1, statValue: "$24.8k", borderRadius: 16, iconId: "chart", iconPosition: "top-left", lottieId: "none", bgColor: "card-bg-4" },
    { id: "cm_5", type: "contracts", title: "Contracts", subtitle: "2 pending approvals", colSpan: 2, rowSpan: 1, borderRadius: 16, iconId: "none", iconPosition: "top-left", lottieId: "contract", bgColor: "card-bg-4" },
    { id: "cm_6", type: "action", title: "Quick Action", subtitle: "Boost performance", colSpan: 1, rowSpan: 1, borderRadius: 16, iconId: "zap", iconPosition: "center", lottieId: "none", bgColor: "card-bg-3" },
];

// ─── URL SHARING UTILITIES ──────────────────────────────────────────────────

export type SharePayload = {
    cards: GridCardData[];
    color: string;
    style: string;
    config: GridConfig;
};

export function encodeShareURL(payload: SharePayload): string {
    const json = JSON.stringify(payload);
    const encoded = btoa(encodeURIComponent(json));
    return `${window.location.origin}${window.location.pathname}?share=${encoded}`;
}

export function decodeShareURL(): SharePayload | null {
    const params = new URLSearchParams(window.location.search);
    const data = params.get("share");
    if (!data) return null;
    try {
        return JSON.parse(decodeURIComponent(atob(data))) as SharePayload;
    } catch {
        return null;
    }
}

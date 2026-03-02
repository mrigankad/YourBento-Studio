// ─── PHOSPHOR ICON LIBRARY ──────────────────────────────────────────────────
// Wraps @phosphor-icons/react for the card icon system.

import type { IconId } from "../../types";
import {
    Crosshair,
    ChartBar,
    Lightning,
    ArrowRight,
    Star,
    Heart,
    Globe,
    Shield,
    Rocket,
} from "@phosphor-icons/react";

type IconProps = { size?: number; className?: string };

const ICON_REGISTRY: Record<string, React.FC<IconProps>> = {
    target: ({ size = 28, className }) => <Crosshair size={size} weight="bold" className={className} />,
    chart: ({ size = 28, className }) => <ChartBar size={size} weight="bold" className={className} />,
    zap: ({ size = 28, className }) => <Lightning size={size} weight="fill" className={className} />,
    arrow: ({ size = 28, className }) => <ArrowRight size={size} weight="bold" className={className} />,
    star: ({ size = 28, className }) => <Star size={size} weight="fill" className={className} />,
    heart: ({ size = 28, className }) => <Heart size={size} weight="fill" className={className} />,
    globe: ({ size = 28, className }) => <Globe size={size} weight="bold" className={className} />,
    shield: ({ size = 28, className }) => <Shield size={size} weight="bold" className={className} />,
    rocket: ({ size = 28, className }) => <Rocket size={size} weight="bold" className={className} />,
};

export function getIcon(id: IconId, props?: IconProps): React.ReactNode | null {
    if (id === "none") return null;
    const Cmp = ICON_REGISTRY[id];
    return Cmp ? <Cmp {...props} /> : null;
}

export default ICON_REGISTRY;

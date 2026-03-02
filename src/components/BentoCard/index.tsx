// ─── BENTO CARD ─────────────────────────────────────────────────────────────
// Polymorphic card component that renders content based on card.type.
// All visuals (icon, lottie, colors) are resolved from the card data.

import Lottie from "lottie-react";
import type { GridCardData, IconPosition } from "../../types";
import { getIcon } from "../icons";
import { getLottie } from "../lottie";
import CardEditor from "../CardEditor";

type Props = {
    card: GridCardData;
    index: number;
    editMode: boolean;
    isDragging: boolean;
    onUpdate: (id: string, updates: Partial<GridCardData>) => void;
    onRemove: (id: string) => void;
    onDragStart: (idx: number) => void;
    onDragOver: (e: React.DragEvent) => void;
    onDrop: (idx: number) => void;
};

// Map icon position to CSS
function positionStyle(pos: IconPosition): React.CSSProperties {
    switch (pos) {
        case "top-left": return { position: "absolute", top: 16, left: 16 };
        case "top-right": return { position: "absolute", top: 16, right: 16 };
        case "center": return { position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)" };
        case "bottom-left": return { position: "absolute", bottom: 16, left: 16 };
        case "bottom-right": return { position: "absolute", bottom: 16, right: 16 };
    }
}

export default function BentoCard({ card, index, editMode, isDragging, onUpdate, onRemove, onDragStart, onDragOver, onDrop }: Props) {
    const lottieData = getLottie(card.lottieId);
    const icon = getIcon(card.iconId, { size: 28, className: "stroke-invert" });
    const isHero = card.type === "hero";
    const isChecklist = card.type === "checklist";
    const isContracts = card.type === "contracts";
    const isStats = card.type === "stats";

    // ─── Inner content ────────────────────────────────────────────────────────

    const renderContent = () => {
        if (isHero) {
            return (
                <>
                    <div className="card-content">
                        <h2 onBlur={(e) => onUpdate(card.id, { title: e.currentTarget.innerText })} contentEditable={editMode} suppressContentEditableWarning>{card.title}</h2>
                        <p onBlur={(e) => onUpdate(card.id, { subtitle: e.currentTarget.innerText })} contentEditable={editMode} suppressContentEditableWarning>{card.subtitle}</p>
                        {card.buttonText && (
                            <button className="start-btn">
                                {card.buttonText}
                                {getIcon("arrow", { size: 24, className: "stroke-invert" })}
                            </button>
                        )}
                    </div>
                    {lottieData && (
                        <div className="card-animation">
                            <Lottie animationData={lottieData} loop style={{ width: "100%", height: "100%" }} />
                        </div>
                    )}
                </>
            );
        }

        if (isChecklist) {
            return (
                <>
                    {lottieData && (
                        <div className="lottie-tall"><Lottie animationData={lottieData} loop /></div>
                    )}
                    <div className="tall-content">
                        <h3 className="text-invert" onBlur={(e) => onUpdate(card.id, { title: e.currentTarget.innerText })} contentEditable={editMode} suppressContentEditableWarning>{card.title}</h3>
                        <p onBlur={(e) => onUpdate(card.id, { subtitle: e.currentTarget.innerText })} contentEditable={editMode} suppressContentEditableWarning>{card.subtitle}</p>
                        <div className="bottom-text text-invert">View all →</div>
                    </div>
                </>
            );
        }

        if (isContracts) {
            return (
                <div style={{ display: "flex", width: "100%", alignItems: "center", justifyContent: "space-between" }}>
                    <div>
                        <h3 className="text-invert" style={{ fontSize: "1.8rem", fontWeight: 800, marginBottom: "0.4rem", borderBottom: "4px solid var(--border-color)", display: "inline-block", lineHeight: 1.2 }}
                            onBlur={(e) => onUpdate(card.id, { title: e.currentTarget.innerText })} contentEditable={editMode} suppressContentEditableWarning>{card.title}</h3>
                        <p className="text-invert" style={{ fontWeight: 700, marginTop: "0.5rem", fontSize: "1.1rem" }}
                            onBlur={(e) => onUpdate(card.id, { subtitle: e.currentTarget.innerText })} contentEditable={editMode} suppressContentEditableWarning>{card.subtitle}</p>
                    </div>
                    {lottieData && (
                        <div style={{ width: 160, height: 160, marginRight: -20, filter: "drop-shadow(6px 6px 0px rgba(0,0,0,0.3))" }}>
                            <Lottie animationData={lottieData} loop />
                        </div>
                    )}
                </div>
            );
        }

        // Default: stats, target, action
        const isCenter = card.type === "action";
        return (
            <div style={{ display: "flex", flexDirection: "column", height: "100%", alignItems: isCenter ? "center" : "flex-start", textAlign: isCenter ? "center" : "left" }}>
                {icon && card.iconPosition === "top-left" && (
                    <div className="card-icon">{icon}</div>
                )}
                <h3 className="text-invert" onBlur={(e) => onUpdate(card.id, { title: e.currentTarget.innerText })} contentEditable={editMode} suppressContentEditableWarning>{card.title}</h3>
                <p onBlur={(e) => onUpdate(card.id, { subtitle: e.currentTarget.innerText })} contentEditable={editMode} suppressContentEditableWarning>{card.subtitle}</p>
                {isStats && (
                    <div className="stat-number" onBlur={(e) => onUpdate(card.id, { statValue: e.currentTarget.innerText })} contentEditable={editMode} suppressContentEditableWarning>{card.statValue}</div>
                )}
                {card.type === "target" && lottieData && (
                    <div className="lottie-small"><Lottie animationData={lottieData} loop /></div>
                )}
            </div>
        );
    };

    // ─── Card wrapper ─────────────────────────────────────────────────────────

    return (
        <div
            className={`bento-card ${!editMode ? "animate-fade-up delay-" + Math.min((index % 6) + 1, 6) : ""}`}
            draggable={editMode}
            onDragStart={() => onDragStart(index)}
            onDragOver={onDragOver}
            onDrop={() => onDrop(index)}
            style={{
                gridColumn: `span ${card.colSpan}`,
                gridRow: `span ${card.rowSpan}`,
                backgroundColor: `var(--${card.bgColor})`,
                borderRadius: `${card.borderRadius}px`,
                justifyContent: isHero ? "center" : "flex-start",
                alignItems: isHero ? "flex-start" : "stretch",
                padding: isContracts ? "1.5rem 2rem" : "2rem",
                opacity: isDragging ? 0.4 : 1,
            }}
        >
            {/* Edit mode overlay */}
            {editMode && <CardEditor card={card} onUpdate={onUpdate} onRemove={onRemove} />}

            {/* Floating icon at chosen position (except default top-left which is inline) */}
            {icon && card.iconPosition !== "top-left" && !isHero && !isChecklist && !isContracts && (
                <div className="card-icon floating-icon" style={positionStyle(card.iconPosition)}>{icon}</div>
            )}

            {renderContent()}
        </div>
    );
}

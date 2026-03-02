// ─── SKELETON LOADER ────────────────────────────────────────────────────────
// Pulsing placeholder grid shown while the app initializes.

type Props = {
    columns?: number;
    count?: number;
};

export default function SkeletonLoader({ columns = 4, count = 6 }: Props) {
    const items = Array.from({ length: count }, (_, i) => {
        // Vary spans for visual interest
        const colSpan = i === 0 ? 2 : i === 3 ? 2 : 1;
        const rowSpan = i === 0 ? 2 : i === 2 ? 2 : 1;
        return { colSpan, rowSpan, key: i };
    });

    return (
        <div
            className="skeleton-grid"
            style={{
                gridTemplateColumns: `repeat(${columns}, 1fr)`,
            }}
        >
            {items.map((item) => (
                <div
                    key={item.key}
                    className="skeleton-card"
                    style={{
                        gridColumn: `span ${item.colSpan}`,
                        gridRow: `span ${item.rowSpan}`,
                        animationDelay: `${item.key * 0.1}s`,
                    }}
                >
                    <div className="skeleton-line skeleton-title" />
                    <div className="skeleton-line skeleton-subtitle" />
                    {item.rowSpan > 1 && <div className="skeleton-line skeleton-body" />}
                    {item.colSpan > 1 && <div className="skeleton-button" />}
                </div>
            ))}
        </div>
    );
}

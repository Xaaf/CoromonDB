type Props = {
    label: string,
    value: number,
    maxStats: Record<string, number>
}

export default function StatBar({ label, value, maxStats }: Props) {
    const MAX_STAT = maxStats[label] || 100;
    const width = `${(value / MAX_STAT) * 100}%`;

    const bad_stat_cutoff = 0;
    const mid_stat_cutoff = MAX_STAT / 100 * 25;
    const ok_stat_cutoff = MAX_STAT / 100 * 50;
    const good_stat_cutoff = MAX_STAT / 100 * 75;

    let color = "bg-gray-900";
    if (value >= bad_stat_cutoff) color = "bg-red-500";
    if (value >= mid_stat_cutoff) color = "bg-orange-400";
    if (value >= ok_stat_cutoff) color = "bg-yellow-400";
    if (value >= good_stat_cutoff) color = "bg-green-500";

    return (
        <div>
            <div className="flex justify-between text-sm">
                <span className="text-[var(--color-text)] dark:text-[var(--color-text-dark)]">{label}</span>
                <span className="text-[var(--color-text)] dark:text-[var(--color-text-dark)]">{value}</span>
            </div>

            <div className="w-full bg-[var(--color-bg)] dark:bg-[var(--color-bg-dark)] rounded h-3">
                <div
                    className={`${color} h-3 rounded`}
                    style={{ width }}
                />
            </div>
        </div>
    )
}
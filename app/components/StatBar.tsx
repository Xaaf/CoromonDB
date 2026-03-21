type Props = {
    label: string,
    value: number
}

export default function StatBar({ label, value }: Props) {
    const MAX_STAT = 150;   // TODO: Query the database for the highest stat instead
    // Also, determine whether we want this MAX_STAT to be
    // universal over all stats, or if it depends *on* the stat
    const width = `${(value / MAX_STAT) * 100}%`;

    // TODO: Determine some *actual* points for this, maybe x% of the `MAX_STAT`?
    const bad_stat_cutoff = 0;
    const mid_stat_cutoff = 50;
    const ok_stat_cutoff = 80;
    const good_stat_cutoff = 110;

    let color = "bg-red-500";
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
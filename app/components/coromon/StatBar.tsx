import { getMaxStats } from "@/lib/utils/utils";

type Props = {
    label: string,
    value: number,
    maxStats: Record<string, number>
}

export default function StatBar({ label, value, maxStats }: Props) {
    const MAX_STAT = maxStats[label] || 100;
    const width = `${Math.max(0, Math.min(100, value / MAX_STAT * 100))}%`;

    const bad_stat_cutoff = 0;
    const mid_stat_cutoff = MAX_STAT / 100 * 25;
    const ok_stat_cutoff = MAX_STAT / 100 * 50;
    const good_stat_cutoff = MAX_STAT / 100 * 75;

    let color = "bg-gray-900";
    if (value >= bad_stat_cutoff) color = "bg-red-400";
    if (value >= mid_stat_cutoff) color = "bg-orange-400";
    if (value >= ok_stat_cutoff) color = "bg-yellow-300";
    if (value >= good_stat_cutoff) color = "bg-green-400";

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
    );
}

export async function AllStatBars({ coromon }: { coromon: any }) {
    const maxStats = await getMaxStats();
    
    return (
        <div className="space-y-3">
            <StatBar label="HP" value={coromon.stat_hp} maxStats={maxStats} />
            <StatBar label="Speed" value={coromon.stat_speed} maxStats={maxStats} />
            <StatBar label="Attack" value={coromon.stat_attack} maxStats={maxStats} />
            <StatBar label="Defense" value={coromon.stat_defense} maxStats={maxStats} />
            <StatBar label="Sp. Attack" value={coromon.stat_sp_attack} maxStats={maxStats} />
            <StatBar label="Sp. Defense" value={coromon.stat_sp_defense} maxStats={maxStats} />
            <StatBar label="SP" value={coromon.stat_sp} maxStats={maxStats} />
        </div>
    );
}
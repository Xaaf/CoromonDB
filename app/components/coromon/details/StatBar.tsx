import { getMaxStats } from "@/lib/utils/utils";

type StatBarProps = {
    label: string,
    value: number,
    maxStats: Record<string, number>
}

/**
 * `StatBar` component
 * 
 * Displays a single stat bar for a Coromon, showing the stat label, its value and
 * a visual bar representation of how the stat compares to the highest possible value.
 * 
 * @param {Object} props - The component props
 * @param {string} props.label - The label for the stat (e.g. "HP", "Attack")
 * @param {number} props.value - The actual value of the stat for the Coromon
 * @param {Object} props.maxStats - An object containing the maximum possible values for each stat
 * 
 * @returns {Promsise<JSX.Element>} The rendered StatBar component
 */
export default function StatBar({ label, value, maxStats }: StatBarProps) {
    const MAX_STAT = maxStats[label] || 100;
    const width = `${Math.max(0, Math.min(100, value / MAX_STAT * 100))}%`;

    const mid_stat_cutoff = MAX_STAT / 100 * 25;
    const ok_stat_cutoff = MAX_STAT / 100 * 50;
    const good_stat_cutoff = MAX_STAT / 100 * 75;

    let color = "bg-bg-stat-bad";
    if (value >= mid_stat_cutoff) color = "bg-bg-stat-mid";
    if (value >= ok_stat_cutoff) color = "bg-bg-stat-ok";
    if (value >= good_stat_cutoff) color = "bg-bg-stat-good";

    return (
        <div>
            <div className="flex justify-between text-sm">
                <span className="">{label}</span>
                <span className="">{value}</span>
            </div>

            <div className="relative w-full h-2">
                <div
                    className="absolute insert-0 bg-bg-stat h-2 rounded w-full"
                />

                <div
                    className={`${color} absolute insert-y h-2 rounded`}
                    style={{ width }}
                />
            </div>
        </div>
    );
}

/**
 * `AllStatBars` component
 * 
 * Displays all the stat bars for a given Coromon.
 * 
 * @param {Object} props - The component props
 * @param {Object} props.coromon - The Coromon data object
 *  
 * @returns {Promise<JSX.Element>} The rendered all stat bars component 
 */
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
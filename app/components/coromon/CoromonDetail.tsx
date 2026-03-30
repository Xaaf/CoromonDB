import { typeColors } from "@/lib/types/typeColors";
import StatBar from "./StatBar";
import { getMaxStats } from "@/lib/utils";

export default async function CoromonDetail({ coromon }: { coromon: any }) {
    const totalBST = coromon.stat_hp
        + coromon.stat_speed
        + coromon.stat_attack
        + coromon.stat_defense
        + coromon.stat_sp_attack
        + coromon.stat_sp_defense
        + coromon.stat_sp;

    const maxStats = await getMaxStats();

    return (
        <div className="space-y-6">
            {/* --- HEADER CARD --- */}
            <div className="bg-[var(--color-surface)] dark:bg-[var(--color-surface-dark)] rounded-md shadow p-6 grid md:grid-cols-2 gap-8">
                {/* LEFT COLUMN */}
                <div>
                    <h1 className="text-3xl font-bold mb-2">
                        {coromon.corodex_number > 0 ? `#${coromon.corodex_number}` : "#???"} {coromon.name}
                    </h1>

                    <div className="flex gap-2 mb-4">
                        {coromon.corodex_number < 0 && (
                            <span className="px-3 py-1 rounded-full text-sm font-semibold">
                                Titan
                            </span>
                        )}

                        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${typeColors[coromon.primary_type]}`}>
                            {coromon.primary_type}
                        </span>
                        {coromon.secondary_type && (
                            <span className={`px-3 py-1 rounded-full text-sm font-semibold ${typeColors[coromon.secondary_type]}`}>
                                {coromon.secondary_type}
                            </span>
                        )}
                    </div>

                    <div className="mt-4 h-48 bg-[var(--color-bg)] dark:bg-[var(--color-bg-dark)] rounded-md flex items-center justify-center text-gray-400">
                        Image Here...
                    </div>

                    <p className="mt-4 text-[var(--color-text)] dark:text-[var(--color-text-dark)]">
                        Coromon's biology goes here...
                    </p>
                </div>

                {/* RIGHT COLUMN - Stats */}
                <div>
                    <h2 className="text-xl font-semibold mb-2">Stats</h2>
                    <p className="text-sm text-[var(--color-text)] dark:text-[var(--color-text-dark)] mb-4">
                        Total BST: <span className="font-semibold">{totalBST}</span>
                    </p>

                    <div className="space-y-3">
                        <StatBar label="HP" value={coromon.stat_hp} maxStats={maxStats} />
                        <StatBar label="Speed" value={coromon.stat_speed} maxStats={maxStats} />
                        <StatBar label="Attack" value={coromon.stat_attack} maxStats={maxStats} />
                        <StatBar label="Defense" value={coromon.stat_defense} maxStats={maxStats} />
                        <StatBar label="Sp. Attack" value={coromon.stat_sp_attack} maxStats={maxStats} />
                        <StatBar label="Sp. Defense" value={coromon.stat_sp_defense} maxStats={maxStats} />
                        <StatBar label="SP" value={coromon.stat_sp} maxStats={maxStats} />
                    </div>
                </div>
            </div>

            {/* --- EVOLUTION SECTION --- */}
            <div className="bg-[var(--color-surface)] dark:bg-[var(--color-surface-dark)] rounded-md shadow p-6">
                <h2 className="text-2xl font-bold mb-4">Evolution</h2>
                <p>Evolution info goes here...</p>
            </div>

            {/* --- SKILLSET SECTION --- */}
            <div className="bg-[var(--color-surface)] dark:bg-[var(--color-surface-dark)] rounded-md shadow p-6">
                <h2 className="text-2xl font-bold mb-4">Skillset</h2>
                <div className="grid md:grid-cols-2 gap-6">
                    {/* Level Up */}
                    <div>
                        <h3 className="font-semibold mb-2">Level Up</h3>
                        <p>Level Up table goes here...</p>
                    </div>

                    {/* Skill Flash */}
                    <div>
                        <h3 className="font-semibold mb-2">Skill Flash</h3>
                        <p>Skill Flash table goes here...</p>
                    </div>
                </div>
            </div>

            {/* --- TRAITS SECTION --- */}
            <div className="bg-[var(--color-surface)] dark:bg-[var(--color-surface-dark)] rounded-md shadow p-6">
                <h2 className="text-2xl font-bold mb-4">Traits</h2>
                <p>Traits table goes here...</p>
            </div>
        </div>
    );
}
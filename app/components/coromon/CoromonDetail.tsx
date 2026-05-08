import { typeColors } from "@/lib/types/typeColors";
import { AllStatBars } from "./StatBar";
import Link from "next/link";
import CoromonFrontSprites from "./CoromonImage";
import { getTraitsForCoromon } from "@/lib/utils/traitUtils";
import { getCoromonById, getCoromonEvolutions } from "@/lib/utils/coromonUtils";

// TODO: Switch from JSON to `Coromon` object

/**
 * `CoromonDetail` component
 * 
 * Displays detailed information for a single Coromon, including its stats, evolutions,
 * available skills and available traits.
 * 
 * @param {Object} props - The component props
 * @param {Object} props.coromon - The Coromon data object
 * 
 * @returns {Promise<JSX.Element>} The rendered Coromon detail component
 * @see {@link AllStatBars} for the component that renders the Coromon's stats in a visual way.
 * @see {@link CoromonFrontSprites} for the component that renders the Coromon's sprites.
 * @see {@link getTraitsForCoromon} for the function that fetches the traits for this Coromon.
 */
export default async function CoromonDetail({ coromon }: { coromon: any }) {
    const totalBST = coromon.stat_hp
        + coromon.stat_speed
        + coromon.stat_attack
        + coromon.stat_defense
        + coromon.stat_sp_attack
        + coromon.stat_sp_defense
        + coromon.stat_sp;

    const traits = await getTraitsForCoromon(coromon.slug);

    const evolutions = await getCoromonEvolutions(coromon.id);

    return (
        <div className="space-y-6">
            {/* --- HEADER CARD --- */}
            <div className="bg-[var(--color-surface)] dark:bg-[var(--color-surface-dark)] rounded-md shadow p-6 grid md:grid-cols-2 gap-8">
                {/* LEFT COLUMN */}
                <div>
                    <h1 className="text-3xl font-bold mb-2">
                        {coromon.corodex_number > 0 ? `#${coromon.corodex_number}` : "#???"} {coromon.name}
                    </h1>

                    {/* --- TAGS --- */}
                    <div className="flex gap-2 mb-4">
                        {coromon.corodex_number < 0 && (
                            <span className="px-3 py-1 rounded-full text-sm font-semibold">
                                {coromon.corodex_number < -100 ? "Cut Content" : "Titan"}
                            </span>
                        )}

                        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${typeColors[coromon.primary_type]}`}>
                            {coromon.primary_type != "Fusebox" ? coromon.primary_type : "Normal"}
                        </span>
                        {coromon.secondary_type && (
                            <span className={`px-3 py-1 rounded-full text-sm font-semibold ${typeColors[coromon.secondary_type]}`}>
                                {coromon.secondary_type}
                            </span>
                        )}
                    </div>

                    <div className="mt-4 h-48 bg-[var(--color-bg)] dark:bg-[var(--color-bg-dark)] rounded-md flex items-center flex justify-center text-gray-400">
                        <CoromonFrontSprites coromon={coromon} />
                    </div>

                    <p className="mt-4 text-[var(--color-text)] dark:text-[var(--color-text-dark)]">
                        {coromon.bio && (
                            <span>{coromon.bio}</span>
                        )}
                    </p>
                </div>

                {/* RIGHT COLUMN - Stats */}
                <div>
                    <h2 className="text-xl font-semibold mb-2">Stats</h2>
                    <p className="text-sm text-[var(--color-text)] dark:text-[var(--color-text-dark)] mb-4">
                        Total BST: <span className="font-semibold">{totalBST}</span>
                    </p>

                    <AllStatBars coromon={coromon} />
                </div>
            </div>

            {/* --- EVOLUTION SECTION --- */}
            <div className="bg-[var(--color-surface)] dark:bg-[var(--color-surface-dark)] rounded-md shadow p-6">
                <h2 className="text-2xl font-bold mb-4">Evolution</h2>
                {evolutions.map((evolution) => (
                    <p>{evolution.name}</p>
                ))}

                {/* {coromon.evolution && (
                    <div className="flex items-center gap-4">
                        Evolves to {nextEvolution.name ? nextEvolution.name : "Unknown"} at level: {coromon.evolution_level ? coromon.evolution_level : "Unknown"}
                    </div>
                )} */}
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

                {traits && traits.length > 0 ? (
                    <div className="grid md:grid-cols-2 gap-4">
                        {traits.map((trait: any, idx: number) => (
                            <Link key={trait.slug} href={`/traits/${trait.slug}`} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                                <div className="flex justify-between items-start">
                                    <h3 className="font-semibold mb-1">{trait.name} {trait.description_plus && <span className="text-sm text-gray-500 dark:text-gray-400">(++)</span>}</h3>
                                    <p className="font-semibold text-sm text-gray-400">
                                        Chance: {trait.odds ?? "-"}%
                                    </p>
                                </div>
                                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                                    {trait.type} {trait.cooldown ? `(Cooldown: ${trait.cooldown} minutes)` : ""}
                                </p>

                                <p className="text-sm mb-1">{trait.description}</p>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-500 dark:text-gray-400">No traits for this Coromon.</p>
                )}
            </div>
        </div>
    );
}
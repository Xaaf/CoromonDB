import { typeColors } from "@/lib/types/typeColors";
import { getCoromonFromTrait } from "@/lib/utils/traitUtils";
import Link from "next/dist/client/link";

/**
 * `TraitDetail` component
 * 
 * Displays detailed information for a single Trait, including its effects and the
 * Coromon that can have this trait. It also shows the odds the Coromon has of
 * obtaining the trait.
 * 
 * 
 * @param {Object} props - The component props
 * @param {Object} props.trait - The Trait data object
 * 
 * @returns {Promise<JSX.Element>} The rendered Trait detail component
 */
export default async function TraitDetail({ trait }: { trait: any }) {
    const coromonList = await getCoromonFromTrait(trait.slug);

    return (
        <div className="space-y-6">
            <div className="bg-[var(--color-surface)] dark:bg-[var(--color-surface-dark)] rounded-md shadow p-6 space-y-6">
                {/* --- NAME AND PROPERTIES --- */}
                <div className="flex justify-between items-start">
                    <h1 className="text-3xl font-bold">
                        {trait.name}

                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            {trait.is_cut_content && "Unused"}
                        </p>
                    </h1>

                    <div className="flex gap-2">
                        {trait.isActive ? (
                            <span className="px-2 py-1 rounded-full text-xs font-semibold bg-green-500 text-white">
                                Active
                            </span>
                        ) : (
                            <span className="px-2 py-1 rounded-full text-xs font-semibold bg-gray-500 text-white">
                                Passive
                            </span>
                        )}

                        {trait.is_active && (
                            <span className="px-2 py-1 rounded-full text-xs font-semibold bg-gray-500 text-white">
                                Cooldown: {trait.cooldown ? `${trait.cooldown} min` : "N/A"}
                            </span>
                        )}
                    </div>
                </div>

                {/* --- TRAIT EFFECTS --- */}
                <div className="space-y-3">
                    <h2 className="text-xl font-semibold">
                        Trait Effects
                    </h2>

                    <p className="text-[var(--color-text)] dark:text-[var(--color-text-dark)]">
                        {trait.description}
                    </p>

                    {trait.description_plus && (
                        <div>
                            <h3 className="text-md font-semibold">
                                + Effect
                            </h3>
                            <p className="text-[var(--color-text)] dark:text-[var(--color-text-dark)]">
                                {trait.description_plus}
                            </p>
                        </div>
                    )}

                    {trait.description_plus_plus && (
                        <div>
                            <h3 className="text-md font-semibold">
                                ++ Effect
                            </h3>
                            <p className="text-[var(--color-text)] dark:text-[var(--color-text-dark)]">
                                {trait.description_plus_plus}
                            </p>
                        </div>
                    )}
                </div>
            </div>

            {/* --- COROMON WITH THE TRAIT --- */}
            <div className="bg-[var(--color-surface)] dark:bg-[var(--color-surface-dark)] rounded-md shadow p-6">
                <h2 className="text-2xl font-bold mb-4">Coromon with this Trait</h2>

                {coromonList && coromonList.length > 0 ? (
                    <div className="grid md:grid-cols-2 gap-4">
                        {coromonList.map((coromon: any, idx: number) => (
                            <Link key={coromon.id} href={`/coromon/${coromon.slug}`}>
                                <div className="border border-gray-200 dark:border-gray-700 rounded-xl p-4 shadow-sm hover:shadow-md cursor-pointer bg-[var(--color-surface)] dark:bg-[var(--color-surface-dark)] transition">
                                    <div className="flex justify-between items-start">
                                        <h2 className="text-lg font-semibold mb-2">
                                            {coromon.corodex_number > 0 ? `#${coromon.corodex_number}` : "#???"} {coromon.name}
                                        </h2>

                                        <span className="text-sm text-gray-500 dark:text-gray-400">Chance: x%</span>
                                    </div>

                                    <p className="flex gap-2">
                                        <span className={`px-2 py-1 rounded-md text-sm font-semibold ${typeColors[coromon.primary_type] || typeColors.Default}`}>
                                            {coromon.primary_type != "Fusebox" ? coromon.primary_type : "Normal"}
                                        </span>
                                        {coromon.secondary_type && (
                                            <span className={`px-2 py-1 rounded-md text-sm font-semibold ${typeColors[coromon.secondary_type] || typeColors.Default}`}>
                                                {coromon.secondary_type}
                                            </span>
                                        )}
                                    </p>
                                </div>
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
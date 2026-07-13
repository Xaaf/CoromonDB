import CoromonFrontSprites from "@/app/components/coromon/details/CoromonImage";
import EvolutionChart from "@/app/components/coromon/details/EvolutionChart";
import { FlashedSkills, LevelUpSkills } from "@/app/components/coromon/details/SkillsList";
import { AllStatBars } from "@/app/components/coromon/details/StatBar";
import TraitGrid from "@/app/components/coromon/details/TraitGrid";
import TypeIcon from "@/app/components/ui/TypeIcon";

/**
 * `CoromonDetail` component
 * 
 * Displays detailed information for a single Coromon, including its stats, evolutions,
 * available skills and available traits.
 * 
 * TODO: Switch from JSON to `Coromon` object
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

    return (
        <div className="space-y-6">
            {/* --- HEADER CARD --- */}
            <div className="bg-bg-container rounded-md shadow-md/30 p-6 grid md:grid-cols-2 gap-8">
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

                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-sm font-semibold bg-white/5">
                            <TypeIcon type={coromon.primary_type} />
                            {coromon.primary_type !== "Fusebox" ? coromon.primary_type.charAt(0).toUpperCase() + coromon.primary_type.slice(1) : "Normal"}
                        </span>
                        {coromon.secondary_type && (
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-sm font-semibold bg-white/10">
                                <TypeIcon type={coromon.secondary_type} />
                                {coromon.secondary_type.charAt(0).toUpperCase() + coromon.secondary_type.slice(1)}
                            </span>
                        )}
                    </div>

                    <div className="mt-4 h-48 rounded-md flex items-center justify-center text-gray-400">
                        <CoromonFrontSprites coromon={coromon} />
                    </div>

                    <p className="mt-4">
                        {coromon.bio && (
                            <span>{coromon.bio}</span>
                        )}
                    </p>
                </div>

                {/* RIGHT COLUMN - Stats */}
                <div>
                    <h2 className="text-xl font-semibold mb-2">Stats</h2>
                    <p className="text-sm mb-4">
                        Total BST: <span className="font-semibold">{totalBST}</span>
                    </p>

                    <AllStatBars coromon={coromon} />
                </div>
            </div>

            {/* --- EVOLUTION SECTION --- */}
            <div className="rounded-md shadow p-6">
                <EvolutionChart coromon={coromon} />
            </div>

            {/* --- SKILLSET SECTION --- */}
            <div className="bg-bg-container rounded-md shadow-md/30 p-6">
                <h2 className="text-2xl font-bold mb-4">Skillset</h2>
                <div className="grid md:grid-cols-2 gap-6">
                    <LevelUpSkills coromon={coromon} />

                    <FlashedSkills coromon={coromon} />
                </div>
            </div>

            {/* --- TRAITS SECTION --- */}
            <div className="rounded-md shadow p-6">
                <TraitGrid coromon={coromon.slug} />
            </div>
        </div>
    );
}
import { getTraitsForCoromon } from "@/lib/utils/traitUtils";
import Link from "next/link";

export default async function TraitGrid({ coromon }: { coromon: string }) {
    const traits = await getTraitsForCoromon(coromon);
    
    return (
        <>
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
        </>
    );
}
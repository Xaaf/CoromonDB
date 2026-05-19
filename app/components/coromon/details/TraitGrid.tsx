import { getTraitsForCoromon } from "@/lib/utils/traitUtils";
import { DetailedTraitCard } from "../../traits/cards/TraitCard";

export default async function TraitGrid({ coromon }: { coromon: string }) {
    const traits = await getTraitsForCoromon(coromon);

    return (
        <>
            <h2 className="text-2xl font-bold mb-4">Traits</h2>

            {traits && traits.length > 0 ? (
                <div className="grid md:grid-cols-2 gap-4">
                    {traits.map((trait: any) => (
                        <DetailedTraitCard key={trait.id} trait={trait} />
                    ))}
                </div>
            ) : (
                <p className="text-gray-500 dark:text-gray-400">No traits for this Coromon.</p>
            )}
        </>
    );
}
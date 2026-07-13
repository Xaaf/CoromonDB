import Link from "next/link";

export function DetailedTraitCard({ trait }: { trait: any }) {
    return (
        <Link key={trait.id} href={`/traits/${trait.slug}`}>
            <div className="bg-bg-container rounded-xl p-4 shadow-md/30 hover:shadow-lg/40 cursor-pointer flex flex-col items-center gap-4">
                <div className="w-full h-ful flex justify-between items-start">
                    <div className="w-full">
                        <div className="flex justify-between items-start">
                            <h2 className="text-lg font-semibold mb-2">
                                {trait.name} {trait.description_plus && <span className="text-sm text-gray-500 dark:text-gray-400">(++)</span>}
                            </h2>
                            <span className="text-sm text-gray-500 dark:text-gray-400">Chance: {trait.odds}%</span>
                        </div>

                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            {trait.is_active ? "Active" : "Passive"} {trait.is_active && (
                                trait.cooldown ? `(Cooldown: ${trait.cooldown} minutes)` : ""
                            )}
                        </p>
                    </div>

                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        {trait.is_cut_content && "Unused"}
                    </p>
                </div>

                <p className="text-sm mb-1">{trait.description}</p>
            </div>
        </Link>
    );
}

export function TraitCard({ trait }: { trait: any }) {
    return (
        <Link key={trait.id} href={`/traits/${trait.slug}`}>
            <div className="bg-bg-container rounded-xl p-4 shadow-md/30 hover:shadow-lg/40 cursor-pointer flex items-center gap-4">
                <div className="w-full h-ful flex justify-between items-start">
                    <div>
                        <h2 className="text-lg font-semibold mb-2">
                            {trait.name} {trait.description_plus && <span className="text-sm text-gray-500 dark:text-gray-400">(++)</span>}
                        </h2>

                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            {trait.is_active ? "Active" : "Passive"}
                        </p>
                    </div>

                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        {trait.is_cut_content && "Unused"}
                    </p>
                </div>
            </div>
        </Link>
    );
}
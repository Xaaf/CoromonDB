import { getCoromonEvolutions } from "@/lib/utils/coromonUtils";
import Link from "next/link";
import React from "react";

export default async function EvolutionChart({ coromon }: { coromon: any }) {
    const evolutions = await getCoromonEvolutions(coromon.id);

    return (
        <>
            <h2 className="text-2xl font-bold mb-4">Evolution</h2>
            {(evolutions.length === 0 || evolutions.length === 1) && (
                <p className="text-gray-500 dark:text-gray-400">No evolution data available.</p>
            )}
            {evolutions.length > 1 && (
                <div className="flex items-center justify-center flex-wrap gap-2">
                    {evolutions.map((evolution, index) => (
                        <React.Fragment key={evolution.name}>
                            <Link href={`/coromon/${evolution.name.toLowerCase()}`} className="text-center px-4 py-2 bg-[var(--color-bg)] dark:bg-[var(--color-bg-dark)] rounded-md">
                                {evolution.name}
                            </Link>
                            {index < evolutions.length - 1 && (
                                <div className="flex flex-col items-center mx-2">
                                    <div className="text-lg">→</div>
                                    <div className="text-sm text-gray-500 dark:text-gray-400">
                                        Lv. {evolution.evolution_level}
                                    </div>
                                </div>
                            )}
                        </React.Fragment>
                    ))}
                </div>
            )}
        </>
    );
}
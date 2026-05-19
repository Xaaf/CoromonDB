"use client";

import { Trait } from "@/lib/types/trait";
import Link from "next/dist/client/link";
import { useState } from "react";
import Image from "next/image";
import TraitCard from "./cards/TraitCard";

/**
 * `TraitGrid` component
 * 
 * Displays a list of all Traits in a grid format, as well as a search bar allowing
 * for the user to easily find the Traits they are looking for. Each Trait is
 * displayed in a card with their name and description.
 * 
 * @param {Object} props - The component props
 * @param {Trait[]} props.initialTraits - The initial list of Traits to display
 *  
 * @returns {Promise<JSX.Element>} The rendered Trait grid component
 */
export default function TraitGrid({ initialTraits }: { initialTraits: Trait[] }) {
    const [search, setSearch] = useState("");

    const filteredTraits = search
        ? initialTraits.filter((trait) =>
            // Filtering on the slug to allow searching more easily, e.g. in Vorst's case
            trait.slug.toLowerCase().includes(search.toLowerCase())
        )
        .sort((a, b) => a.name.localeCompare(b.name))
        : initialTraits;

    return (
        <div className="min-h-screen p-6 space-y-6">
            <section className="text-5xl text-center -mt-2 pb-3">
                <h1><strong>LIST OF TRAITS</strong></h1>
            </section>

            <div className="flex justify-center">
                <div className="relative w-xl">
                    {/* TODO: Give this the right icon (icon_seen) */}
                    <Image
                        src="/images/info.png"
                        alt="Information icon"
                        width="16"
                        height="16"
                        className="absolute left-3.5 top-5.5 -translate-y-1/2 [image-rendering:pixelated]"
                    />

                    <input
                        type="text"
                        placeholder="Search Traits..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full mb-4 p-2 pl-10 rounded-md bg-bg-container focus:outline-none transition shadow-md/30"
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {filteredTraits.map((trait) => (
                    <TraitCard key={trait.id} trait={trait} />

                    // <Link key={trait.id} href={`/traits/${trait.slug}`}>
                    //     <div className="border border-gray-200 dark:border-gray-700 rounded-xl p-4 shadow-sm hover:shadow-md cursor-pointer bg-[var(--color-surface)] dark:bg-[var(--color-surface-dark)] transition">
                    //         <div className="flex justify-between items-start">
                    //             <h2 className="text-lg font-semibold mb-2">
                    //                 {trait.name} {trait.description_plus && <span className="text-sm text-gray-500 dark:text-gray-400">(++)</span>}
                    //             </h2>

                    //             <p className="text-sm text-gray-500 dark:text-gray-400">
                    //                 {trait.is_cut_content && "Unused"}
                    //             </p>
                    //         </div>

                    //         <p className="text-sm text-gray-500 dark:text-gray-400">
                    //             {trait.is_active ? "Active" : "Passive"}
                    //         </p>
                    //     </div>
                    // </Link>
                ))}
            </div>
        </div>
    );
}
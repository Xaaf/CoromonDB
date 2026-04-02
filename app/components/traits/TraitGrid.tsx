"use client";

import { Trait } from "@/lib/types/trait";
import Link from "next/dist/client/link";
import { useState } from "react";

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
        <div className="min-h-screen bg-[var(--color-bg)] dark:bg-[var(--color-bg-dark)] text-[var(--color-text)] dark:text-[var(--color-text-dark)] p-6 space-y-6">
            <div className="bg-[var(--color-surface)] dark:bg-[var(--color-surface-dark)] rounded-md shadow p-6 space-y-6">
                {/* --- QUOTE --- */}
                <div className="text-center">
                    <p className="text-lg italic text-gray-600 dark:text-gray-400">
                        "What makes a Coromon unique: Traits"
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        - The Traits Handbook
                    </p>
                </div>

                {/* --- DESCRIPTION --- */}
                <p>
                    This game's version of passive/active abilities are called <span className="font-semibold">Traits</span>.
                    These are abilities triggered by certain conditions, without consuming any SP. Most Traits are passive, though a few are active and can be triggered manually -- usually
                    through a button in the summary screen. On this page, you'll find all of the <span className="font-semibold">Traits</span> in the game, as well as unused ones!
                </p>
            </div>

            <h1 className="text-2xl font-bold mb-4">List of Traits</h1>
            <input
                type="text"
                placeholder="Search Traits..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="mb-4 p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-[var(--color-surface)] dark:bg-[var(--color-surface-dark)] text-[var(--color-text)] dark:text-[var(--color-text-dark)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] dark:focus:ring-[var(--color-accent-dark)] transition"
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {filteredTraits.map((trait) => (
                    <Link key={trait.id} href={`/traits/${trait.slug}`}>
                        <div className="border border-gray-200 dark:border-gray-700 rounded-xl p-4 shadow-sm hover:shadow-md cursor-pointer bg-[var(--color-surface)] dark:bg-[var(--color-surface-dark)] transition">
                            <div className="flex justify-between items-start">
                                <h2 className="text-lg font-semibold mb-2">
                                    {trait.name} {trait.description_plus && <span className="text-sm text-gray-500 dark:text-gray-400">(++)</span>}
                                </h2>

                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    {trait.is_cut_content && "Unused"}
                                </p>
                            </div>

                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                {trait.is_active ? "Active" : "Passive"}
                            </p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
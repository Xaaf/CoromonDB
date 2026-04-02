"use client";

import { Coromon } from "@/lib/types/coromon";
import { typeColors } from "@/lib/types/typeColors";
import Link from "next/link";
import { JSX, useState } from "react";
import Image from "next/image";
import { getIconUrl } from "@/lib/utils/utils";

/**
 * `CoromonGrid` component
 * 
 * Displays a list of all Coromon in a grid format, as well as a search bar allowing
 * for the user to easily find the Coromon they are looking for. Each Coromon is
 * displayed in a card with their icon, name, Corodex number and types.
 * 
 * @param {Object} props - The component props
 * @param {Coromon[]} props.initialCoromon - The initial list of Coromon to display
 *  
 * @returns {Promise<JSX.Element>} The rendered Coromon grid component
 */
export default function CoromonGrid({ initialCoromon }: { initialCoromon: Coromon[] }) {
    const [search, setSearch] = useState("");

    const filteredCoromon = search
        ? initialCoromon.filter((coromon) =>
            // Filtering on the slug to allow searching more easily, e.g. in Vorst's case
            coromon.slug.toLowerCase().includes(search.toLowerCase())
        )
        .sort((a, b) => a.name.localeCompare(b.name))
        : initialCoromon;
    
    return (
        <div className="min-h-screen bg-[var(--color-bg)] dark:bg-[var(--color-bg-dark)] text-[var(--color-text)] dark:text-[var(--color-text-dark)] p-6 space-y-6">
            <div className="bg-[var(--color-surface)] dark:bg-[var(--color-surface-dark)] rounded-md shadow p-6 space-y-6">
                {/* Quote */}
                <div className="text-center">
                    <p className="text-lg italic text-gray-600 dark:text-gray-400">
                        "A travel journal: my journey across Velua"
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        - The Coromon Handbook
                    </p>
                </div>

                {/* Content */}
                <p>
                    <span className="font-semibold">Coromon</span> are the wonderful creatures that inhabit this world. Each Coromon has its own unique set of Traits, Skills and most of them even have evolutions!
                    This page contains a full list of all Coromon that we know of at this moment. At the very bottom, there is also a few entries for Coromon that do not have a Database number yet, including the all-powerful Titans!
                </p>
            </div>

            <h1 className="text-2xl font-bold mb-4">List of Coromon</h1>

            <input
                type="text"
                placeholder="Search Coromon..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="mb-4 p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-[var(--color-surface)] dark:bg-[var(--color-surface-dark)] text-[var(--color-text)] dark:text-[var(--color-text-dark)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] dark:focus:ring-[var(--color-accent-dark)] transition"
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {filteredCoromon.map((c) => (
                    <Link key={c.id} href={`/coromon/${c.slug}`}>
                        <div className="border border-gray-200 dark:border-gray-700 rounded-xl p-4 shadow-sm hover:shadow-md cursor-pointer bg-[var(--color-surface)] dark:bg-[var(--color-surface-dark)] transition flex items-center gap-4">
                            <div className="w-10 h-10 flex items-center justify-center">
                                <Image
                                    src={getIconUrl(c)}
                                    width={40}
                                    height={40}
                                    alt=""
                                    className="object-contain w-auto h-auto"
                                    unoptimized
                                />
                            </div>

                            <div className="flex-1">
                                <h2 className="text-lg font-semibold mb-2">
                                    {c.corodex_number > 0 ? `#${c.corodex_number}` : "#???"} {c.name}
                                </h2>

                                <p className="flex gap-2">
                                    <span className={`px-2 py-1 rounded-md text-sm font-semibold ${typeColors[c.primary_type] || typeColors.Default}`}>
                                        {c.primary_type != "Fusebox" ? c.primary_type : "Normal"}
                                    </span>
                                    {c.secondary_type && (
                                        <span className={`px-2 py-1 rounded-md text-sm font-semibold ${typeColors[c.secondary_type] || typeColors.Default}`}>
                                            {c.secondary_type}
                                        </span>
                                    )}
                                </p>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div >
    );
}
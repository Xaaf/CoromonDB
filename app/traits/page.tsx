"use client";

import { Trait } from "@/lib/types/trait";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function TraitsPage() {
    const [search, setSearch] = useState("");
    const [traits, setTraits] = useState<Trait[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        let debounceTimer: NodeJS.Timeout
        let loadingTimer: NodeJS.Timeout

        debounceTimer = setTimeout(() => {
            let didFinish = false

            // Delay showing loading to avoid flicker
            loadingTimer = setTimeout(() => {
                if (!didFinish) setLoading(true)
            }, 200) // Small delay before showing loading indicator

            async function fetchTraits() {
                const res = await fetch(`/api/traits?search=${encodeURIComponent(search)}`)
                const data = await res.json()

                setTraits(data)
                didFinish = true
                setLoading(false) // Instantly hide loading when data is received
            }

            fetchTraits()
        }, 300) // 300ms debounce on search input

        return () => {
            clearTimeout(debounceTimer)
            clearTimeout(loadingTimer)
        }
    }, [search]);

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

            {loading && <p className="mb-4">Loading...</p>}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {traits.map((trait) => (
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
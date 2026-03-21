"use client";

import { Coromon } from "@/lib/types/coromon";
import { typeColors } from "@/lib/types/typeColors";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function CoromonPage() {
    const [search, setSearch] = useState("");
    const [coromon, setCoromon] = useState<Coromon[]>([]);
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

            async function fetchCoromon() {
                const res = await fetch(`/api/coromon?search=${encodeURIComponent(search)}`)
                const data = await res.json()
                setCoromon(data)
                didFinish = true
                setLoading(false) // Instantly hide loading when data is received
            }

            fetchCoromon()
        }, 300) // 300ms debounce on search input

        return () => {
            clearTimeout(debounceTimer)
            clearTimeout(loadingTimer)
        }
    }, [search]);

    return (
        <div className="min-h-screen bg-[var(--color-bg)] dark:bg-[var(--color-bg-dark)] text-[var(--color-text)] dark:text-[var(--color-text-dark)] p-6">
            <h1 className="text-2xl font-bold mb-4">List of Coromon</h1>

            <input
                type="text"
                placeholder="Search Coromon..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="mb-4 p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-[var(--color-surface)] dark:bg-[var(--color-surface-dark)] text-[var(--color-text)] dark:text-[var(--color-text-dark)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] dark:focus:ring-[var(--color-accent-dark)] transition"
            />

            {loading && <p className="mb-4">Loading...</p>}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {coromon.map((c) => (
                    <Link key={c.id} href={`/coromon/${c.slug}`}>
                        <div className="border border-gray-200 dark:border-gray-700 rounded-xl p-4 shadow-sm hover:shadow-md cursor-pointer bg-[var(--color-surface)] dark:bg-[var(--color-surface-dark)] transition">
                            <h2 className="text-lg font-semibold mb-2">
                                #{c.corodex_number} {c.name}
                            </h2>
                            
                            <p className="flex gap-2">
                                <span className={`px-2 py-1 rounded-md text-sm font-semibold ${typeColors[c.primary_type] || typeColors.Default}`}>
                                    {c.primary_type}
                                </span>
                                {c.secondary_type && (
                                    <span className={`px-2 py-1 rounded-md text-sm font-semibold ${typeColors[c.secondary_type] || typeColors.Default}`}>
                                        {c.secondary_type}
                                    </span>
                                )}
                            </p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
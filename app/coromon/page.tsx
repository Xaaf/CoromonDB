"use client";

import { Coromon } from "@/lib/types/coromon";
import { typeColors } from "@/lib/types/typeColors";
import { supabase } from "@/lib/supabase";
import Link from "next/link";
import { useEffect, useState } from "react";
import CoromonIcon from "../components/coromon/CoromonIcon";
import Image from "next/image";

export default function CoromonPage() {
    const [search, setSearch] = useState("");
    const [coromon, setCoromon] = useState<Coromon[]>([]);
    const [loading, setLoading] = useState(false);
    const [icons, setIcons] = useState<Record<string, string>>({});

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

                // Filter out removed content Coromon
                const filtered = data.filter((c: { corodex_number: number; }) => c.corodex_number >= -100);
                const sorted = filtered.sort((a: { corodex_number: number; }, b: { corodex_number: number; }) => {
                    if (a.corodex_number > 0 && b.corodex_number > 0) return a.corodex_number - b.corodex_number;
                    if (a.corodex_number > 0) return -1;
                    if (b.corodex_number > 0) return 1;

                    if (a.corodex_number > b.corodex_number) return -1;
                    if (a.corodex_number < b.corodex_number) return 1;

                    return 0;
                });

                setCoromon(sorted)
                didFinish = true
                setLoading(false) // Instantly hide loading when data is received
            }

            fetchCoromon();
        }, 300) // 300ms debounce on search input

        return () => {
            clearTimeout(debounceTimer)
            clearTimeout(loadingTimer)
        }
    }, [search]);

    useEffect(() => {
        async function fetchIcons() {
            const urls: Record<string, string> = {};

            for (const c of coromon) {
                let iconUrl = `${c.name.toLowerCase()}_normal.png`;

                // Edge Cases
                if (c.primary_type == "Crimsonite") {
                    iconUrl = `crimsonite_${c.name.toLowerCase()}_normal.png`;
                }

                if (c.slug == "vorst") {
                    iconUrl = `${c.slug.toLowerCase()}_normal.png`;
                }

                const iconData = await supabase.storage.from("coromon_icons").getPublicUrl(iconUrl);

                if (iconData.data.publicUrl) urls[(c.primary_type == "Crimsonite" ? `crimsonite_${c.name}` : c.name)] = iconData.data.publicUrl;
            }

            setIcons(urls);
        }

        if (coromon.length > 0) fetchIcons();
    }, [coromon]);

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

            {loading && <p className="mb-4">Loading...</p>}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {coromon.map((c) => (
                    <Link key={c.id} href={`/coromon/${c.slug}`}>
                        <div className="border border-gray-200 dark:border-gray-700 rounded-xl p-4 shadow-sm hover:shadow-md cursor-pointer bg-[var(--color-surface)] dark:bg-[var(--color-surface-dark)] transition flex items-center gap-4">
                            {icons[(c.primary_type == "Crimsonite" ? `crimsonite_${c.name}` : c.name)] && (
                                <Image
                                    src={icons[(c.primary_type == "Crimsonite" ? `crimsonite_${c.name}` : c.name)]}
                                    width={40}
                                    height={40}
                                    alt=""
                                    className="object-contain max-h-full mb-2"
                                    unoptimized
                                />
                            )}

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
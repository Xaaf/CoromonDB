"use client";

import { Coromon } from "@/lib/types/coromon";
import Image from "next/image";
import { useState } from "react";
import CoromonCard from "./cards/CoromonCard";

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
        <div className="min-h-screen p-6 space-y-6">
            <section className="text-5xl text-center -mt-2 pb-3">
                <h1><strong>LIST OF COROMON</strong></h1>
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
                        placeholder="Search Coromon..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full mb-4 p-2 pl-10 rounded-md bg-bg-container focus:outline-none transition shadow-md/30"
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {filteredCoromon.map((c) => (
                    <CoromonCard key={c.id} coromon={c} />
                ))}
            </div>
        </div >
    );
}
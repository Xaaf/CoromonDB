import { supabase } from "@/lib/supabase";
import { unstable_cache } from "next/cache";
import { Coromon } from "@/lib/types/coromon";

/**
 * Server-side utility function to fetch a Coromon from the database, with optional
 * search functionality. The results are cached for 24 hours to optimize performance.
 * 
 * @param search (Optional) String to search for in the Coromon's slugs.
 * 
 * @returns {Promise<Array>} A promise that resolves to an array of Coromon data.
 * @throws {Error} Throws an error if there is an issue fetching the Coromon data.
 */
export function getCoromon(search?: string) {
    return unstable_cache(
        async () => {
            // TODO: Move the searching to the Supabase side of things -- better performance?
            let query = supabase
                .from("coromon")
                .select("*")
                .order("corodex_number", { ascending: true });

            if (search) {
                query = query.ilike("slug", `%${search}%`);
            }

            const { data, error } = await query;
            if (error || !data) {
                throw new Error("Error fetching coromon");
            }

            return data;
        },
        ["coromon-list", search ?? "all"],
        { revalidate: 60 * 60 * 24 }
    )();
}

export function getCoromonById(id: number) {
    if (!id) {
        console.error(`Called getCoromonById with an invalid id ${id}`);
        return null;
    }

    return unstable_cache(
        async () => {
            const { data, error } = await supabase
                .from("coromon")
                .select("*")
                .eq("id", id)
                .single();

            if (error || !data) {
                throw new Error(`Error fetching coromon`);
            }

            return data;
        },
        ["coromon", id.toString()],
        { revalidate: 60 * 60 * 24 }
    )();
}

export function getCoromonEvolutions(id: number) {
    // 1. Check if coromon with this id evolves into anything (evolution col)
    // 2. Check if this coromon's id IS an evolution (filter db for evolution col = id (rpc?)
    // 3. Return result in a list
    return unstable_cache(
        async () => {
            const thisCoromon: any = await getCoromonById(id);
            if (!thisCoromon) {
                console.error(`Could not find coromon with id ${id} for some reason.`);
                return [];
            }

            const evolutions: any[] = [];
            const evolutionIds = new Set<number>();
            const uncheckedEvolutions: any[] = [];
            const uncheckedPrevolutions: any[] = [];

            evolutions.push(thisCoromon);
            evolutionIds.add(thisCoromon.id);

            // Check for direct post-evolutions
            if (thisCoromon.evolution) {
                const evolution: any = await getCoromonById(thisCoromon.evolution);
                if (evolution && !evolutionIds.has(evolution.id)) {
                    evolutions.push(evolution);
                    evolutionIds.add(evolution.id);
                    uncheckedEvolutions.push(evolution);
                }
            }

            // Check for direct pre-evolutions
            const { data: preEvolution, error } = await supabase
                .from("coromon")
                .select("*")
                .eq("evolution", id)
                .single();

            // https://docs.postgrest.org/en/v12/references/errors.html (no rows erorr)
            if (error && error.code !== 'PGRST116') {
                throw new Error(`Error fetching coromon for previous evolutions (${id})`);
            }

            if (preEvolution && !evolutionIds.has(preEvolution.id)) {
                evolutions.push(preEvolution);
                evolutionIds.add(preEvolution.id);
                uncheckedPrevolutions.push(preEvolution);
            }

            // Recursively fetch further post-evolutions
            let next: any;
            while ((next = uncheckedEvolutions.pop())) {
                if (next.evolution) {
                    const evolution: any = await getCoromonById(next.evolution);
                    if (evolution && !evolutionIds.has(evolution.id)) {
                        evolutions.push(evolution);
                        evolutionIds.add(evolution.id);
                        uncheckedEvolutions.push(evolution);
                    }
                }
            }

            // Recursively fetch further pre-evolutions
            while ((next = uncheckedPrevolutions.pop())) {
                const { data: preEvolution, error } = await supabase
                    .from("coromon")
                    .select("*")
                    .eq("evolution", next.id)
                    .single();

                // https://docs.postgrest.org/en/v12/references/errors.html (no rows erorr)
                if (error && error.code !== 'PGRST116') {
                    throw new Error(`Error fetching coromon for previous evolutions (${next.id})`);
                }

                if (preEvolution && !evolutionIds.has(preEvolution.id)) {
                    evolutions.push(preEvolution);
                    evolutionIds.add(preEvolution.id);
                    uncheckedPrevolutions.push(preEvolution);
                }
            }

            return evolutions.sort((a, b) => {
                if (!a.evolution_level && b.evolution_level) {
                    return 1;
                }
                
                if (a.evolution_level && !b.evolution_level) {
                    return -1;
                }

                if (a.evolution_level > b.evolution_level) {
                    return 1;
                }
                
                if (a.evolution_level < b.evolution_level) {
                    return -1;
                }

                return 0;
            });
        },
        ["coromon-evos", id.toString()],
        { revalidate: 60 * 60 * 24 }
    )();
}
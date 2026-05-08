import { supabase } from "@/lib/supabase";
import { unstable_cache } from "next/cache";

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
                throw new Error("Error fetching coromon");
            }

            return data;
        },
        ["coromon", id.toString()],
        { revalidate: 60 * 60 * 24 }
    )();

}
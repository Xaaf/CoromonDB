import { supabase } from "@/lib/supabase";
import { unstable_cache } from "next/cache";

/**
 * Server-side utility function to fetch a Trait from the database, with optional
 * search functionality.
 * 
 * @param search (Optional) String to search for in the Trait's slugs.
 * 
 * @returns {Promise<Array>} A promise that resolves to an array of Trait data.
 * @throws {Error} Throws an error if there is an issue fetching the Trait data.
 */
export function getTraits(search?: string) {
        return unstable_cache(
        async () => {
            let query = supabase
                .from("traits")
                .select("*")
                .order("name", { ascending: true });

            if (search) {
                query = query.ilike("slug", `%${search}%`);
            }

            const { data, error } = await query;

            if (error || !data) {
                throw new Error("Error fetching traits");
            }

            return data;
        },
        ["traits-list", search ?? "all"],
        { revalidate: 60 * 60 * 24 }
    )();
}

/**
 * Fetches all Traits that a Coromon can have, through the Coromon's slug.
 * 
 * @param slug The slug of the Coromon to fetch traits for. 
 * 
 * @returns {Promise<Array>} A promise that resolves to an array of Trait data for the specified Coromon.
 * @throws {Error} Throws an error if there is an issue fetching the traits or if the Coromon is not found.
 */
export const getTraitsForCoromon = (slug: string) =>
    unstable_cache(
        async () => {
            const { data: coromonData, error: coromonError } = await supabase
                .from("coromon")
                .select("id")
                .eq("slug", slug)
                .single();

            if (coromonError || !coromonData) {
                throw new Error("Coromon not found");
            }

            const coromonId = coromonData.id;
            const { data, error } = await supabase
                .from("coromon_traits")
                .select(`
                    odds,
                    traits (
                        id,
                        name,
                        slug,
                        type,
                        cooldown,
                        description,
                        description_plus,
                        description_plus_plus
                    )
                `)
                .eq("coromon_id", coromonId);

            if (error) {
                console.error("Error fetching traits:", error);
                throw new Error("Error fetching traits");
            }

            return data
                .filter((item: any) => item.traits)
                .map((item: any) => ({
                    ...item.traits,
                    odds: item.odds ?? 0,
                }));
        },
        ["coromon-traits", slug], // cache key per coromon
        { revalidate: 60 * 60 * 24 } // 1 day
    )();

/**
 * Fetches all Coromon have the Trait with the specified slug.
 * 
 * @param slug The slug of the Trait to fetch Coromon for. 
 * 
 * @returns {Promise<Array>} A promise that resolves to an array of Coromon data for the specified Trait.
 * @throws {Error} Throws an error if there is an issue fetching the Coromon or if the Trait is not found.
 */
export const getCoromonFromTrait = (traitSlug: string) =>
    unstable_cache(
        async () => {
            const { data: traitData, error: traitError } = await supabase
                .from("traits")
                .select("id")
                .eq("slug", traitSlug)
                .single();

            if (traitError || !traitData) {
                throw new Error("Trait not found");
            }

            const traitId = traitData.id;
            const { data, error } = await supabase
                .from("coromon_traits")
                .select(`
                    odds,
                    coromon (
                        id,
                        name,
                        slug,
                        corodex_number,
                        primary_type,
                        secondary_type,
                        stat_hp,
                        stat_speed,
                        stat_attack,
                        stat_defense,
                        stat_sp_attack,
                        stat_sp_defense,
                        stat_sp
                    )
                `)
                .eq("trait_id", traitId)

            if (error) {
                console.error("Error fetching coromon:", error);
                throw new Error("Error fetching coromon");
            }

            return data
                .filter((item: any) => item.coromon)
                .map((item: any) => ({
                    ...item.coromon,
                    odds: item.odds ?? 0,
                }))
                .sort((a, b) => a.corodex_number - b.corodex_number);
        },
        ["trait-coromon", traitSlug],
        { revalidate: 60 * 60 * 24 }
    )();
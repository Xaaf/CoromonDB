import { supabase } from "@/lib/supabase";
import { unstable_cache } from "next/cache";

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

export const getCoromonWithTrait = (traitSlug: string) =>
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
                .eq("trait_id", traitId);

            if (error) {
                console.error("Error fetching coromon:", error);
                throw new Error("Error fetching coromon");
            }

            return data.map((ct: any) => ct.coromon);
        },
        ["trait-coromon", traitSlug],
        { revalidate: 60 * 60 * 24 }
    )();

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
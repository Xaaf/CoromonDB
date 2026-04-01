import { supabase } from "@/lib/supabase";
import { unstable_cache } from "next/cache";

export function getCoromon(search?: string) {
    return unstable_cache(
        async () => {
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
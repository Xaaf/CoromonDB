import { supabase } from "@/lib/supabase";
import { Coromon } from "../types/coromon";

// Revalidate every day at most
export const revalidate = 60 * 60 * 24

/**
 * Fetch the url for a Coromon's icon from Supabase storage.
 * @param c Coromon to fetch the icon for.
 * 
 * @returns The public URL of the Coromon's icon.
 * @throws {Error} Throws an error if there is an issue fetching the icon URL.
 */
export function getIconUrl(c: Coromon) {
    let iconUrl = `${c.name.toLowerCase()}_normal.png`;

    // Edge Cases
    if (c.primary_type == "Crimsonite") {
        iconUrl = `crimsonite_${c.name.toLowerCase()}_normal.png`;
    }

    if (c.slug == "vorst") {
        iconUrl = `${c.slug.toLowerCase()}_normal.png`;
    }

    const { data } = supabase
        .storage
        .from("coromon_icons")
        .getPublicUrl(iconUrl);

    return data.publicUrl;
}

/**
 * Fetch the set of highest base stats for all Coromon in the database. Note that
 * this computation *does* exclude the Titans as they have absurdly higher stats
 * in notably the HP and SP categories. This would unfairly skew the results of
 * the statbars on the Coromon's pages, thus the Titans are excluded from this.
 * 
 * @returns {Promise<Object>} An object containing the highest base stats for all Coromon.
 * @throws {Error} Throws an error if there is an issue fetching the Coromon data.
 */
export async function getMaxStats() {
    const { data, error } = await supabase
        .from("coromon")
        .select(`
            stat_hp,
            stat_attack,
            stat_defense,
            stat_speed,
            stat_sp_attack,
            stat_sp_defense,
            stat_sp
        `)
        .gte("corodex_number", 1);
    if (error) throw error;

    // Find the max for each stat
    const maxStats = {
        HP: Math.max(...data.map((c: any) => c.stat_hp)),
        Attack: Math.max(...data.map((c: any) => c.stat_attack)),
        Defense: Math.max(...data.map((c: any) => c.stat_defense)),
        Speed: Math.max(...data.map((c: any) => c.stat_speed)),
        "Sp. Attack": Math.max(...data.map((c: any) => c.stat_sp_attack)),
        "Sp. Defense": Math.max(...data.map((c: any) => c.stat_sp_defense)),
        SP: Math.max(...data.map((c: any) => c.stat_sp)),
    };

    return maxStats;
}
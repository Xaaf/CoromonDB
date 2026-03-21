import { supabase } from "./supabase";

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
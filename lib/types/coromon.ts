/**
 * Represents a Coromon with its various attributes and statistics.
 */
export interface Coromon {
    id: number;
    corodex_number: number;
    name: string;
    slug: string;
    primary_type: string;
    secondary_type: string | null;
    rarity: string;
    stat_hp: number;
    stat_attack: number;
    stat_defense: number;
    stat_speed: number;
    stat_sp_attack: number;
    stat_sp_defense: number;
    stat_sp: number;
    bio: string;
    evolution: number | null;
    evolution_level: number | null;
}
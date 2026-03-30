export interface Trait {
    id: number;
    name: string;
    slug: string;
    isActive: boolean;
    cooldown: number | null;
    chance: number;
    description: string;
    description_plus: string;
    description_plus_plus: string;
}
export interface Trait {
    id: number;
    name: string;
    slug: string;
    is_active: boolean;
    cooldown: number | null;
    description: string;
    description_plus: string;
    description_plus_plus: string;
    is_cut_content: boolean;
}
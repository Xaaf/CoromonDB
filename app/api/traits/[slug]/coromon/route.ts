import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET(req: NextRequest) {
    // Extract slug from URL path
    const url = new URL(req.url);
    const pathParts = url.pathname.split("/"); // ["", "api", "traits", "accurate", "coromon"]
    const slug = pathParts[3]; // 3rd index = trait slug

    if (!slug) {
        return NextResponse.json({ error: "Missing trait slug" }, { status: 400 });
    }

    // Find the trait by slug first
    const { data: traitData, error: traitError } = await supabase
        .from("traits")
        .select("id")
        .eq("slug", slug)
        .single();

    if (traitError || !traitData) {
        return NextResponse.json({ error: "Trait not found" }, { status: 404 });
    }

    const traitId = traitData.id;

    // Fetch all Coromon that have this trait
    const { data, error } = await supabase
        .from("coromon_traits")
        .select(`
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
        console.error("Error fetching coromon: ", error);
        return NextResponse.json({ error: "Error fetching coromon" }, { status: 500 });
    }

    const coromonList = data.map((ct: any) => ct.coromon);
    return NextResponse.json(coromonList);
}
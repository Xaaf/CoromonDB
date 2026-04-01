import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET(req: NextRequest) {
    // extract slug from URL path
    const url = new URL(req.url);
    const pathParts = url.pathname.split("/"); // ["", "api", "coromon", "kyraptor", "traits"]
    const slug = pathParts[3]; // 3rd index = slug

    if (!slug) {
        return NextResponse.json({ error: "Missing slug" }, { status: 400 });
    }

    const { data: coromonData, error: coromonError } = await supabase
        .from("coromon")
        .select("id")
        .eq("slug", slug)
        .single();

    if (coromonError || !coromonData) {
        return NextResponse.json({ error: "Coromon not found" }, { status: 404 });
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
        console.error("Error fetching traits: ", error);
        return NextResponse.json({ error: "Error fetching traits" }, { status: 500 });
    }

    const traits = data
        .filter((item: any) => item.traits)
        .map((item: any) => ({
            ...item.traits,
            odds: item.odds ?? 0,
        }));

    console.log("Fetched traits: ", traits);

    return NextResponse.json(traits);
}
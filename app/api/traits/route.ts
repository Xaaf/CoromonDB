import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET(request: NextRequest) {
    const { search } = Object.fromEntries(request.nextUrl.searchParams.entries()) as { search: string };
    let query = supabase.from("traits").select("*").order("name", { ascending: true });

    // Single Trait fetch by slug
    // if (slug) {
    //     query = query.eq('slug', slug).single();
    // }

    // No slug so we're searching instead
    if (search) {
        query = query.ilike("slug", `%${search}%`);
    }

    const { data, error } = await query;
    if (error) {
        console.error("Error fetching data: ", error);
        return NextResponse.json({ error: "Error fetching data" }, { status: 500 });
    }

    // Map type → isActive
    const mapped = data.map((t: any) => ({
        ...t,
        is_active: t.type === "Active",
    }));

    return NextResponse.json(mapped);
}
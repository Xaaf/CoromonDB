import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET(request: NextRequest) {
    const { search} = Object.fromEntries(request.nextUrl.searchParams.entries()) as { search: string };
    let query = supabase.from("coromon").select("*").order("corodex_number", { ascending: true });

    // Single Coromon fetch by slug
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

    return NextResponse.json(data);
}
import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const { data, error } = await supabase
            .from("coromon")
            .select("*")
            .order("random()")
            .limit(1)
            .single();

        if (error || !data) {
            return NextResponse.json("Couldn't find a random Coromon.", { status: 404 });
        }

        return NextResponse.json(data);
    } catch (error) {
        console.error("Error fetching random coromon:", error);
        return NextResponse.json("Couldn't find a random Coromon.", { status: 500 });
    }
}
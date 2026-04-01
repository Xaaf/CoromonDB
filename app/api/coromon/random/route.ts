import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const { data, error } = await supabase
            .rpc("get_random_coromon");

        if (error) {
            return NextResponse.json("Couldn't find a random Coromon.", { status: 404 });
        }
        
        return NextResponse.json(data);
    } catch (error) {
        console.error("Error fetching random coromon:", error);
        return NextResponse.json("Couldn't find a random Coromon.", { status: 500 });
    }
}
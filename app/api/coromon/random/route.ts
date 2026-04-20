import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";

/**
 * GET /api/coromon/random
 * 
 * Query the database for random Coromon through the `get_random_coromon` RPC.
 * 
 * @returns {Promise<NextResponse>}
 * - Status 200: Returns a random Coromon object as a JSON response.
 * - Status 404: Couldn't find a random Coromon.
 * - Status 500: An internal server error occurred.
 */
export async function GET() {
    try {
        const { data, error } = await supabase
            .rpc("get_random");
        console.log("RPC result:", { data, error });

        if (error) {
            return NextResponse.json("Couldn't find a random Coromon.", { status: 404 });
        }
        
        return NextResponse.json(data);
    } catch (error) {
        console.error("Error fetching random coromon:", error);
        return NextResponse.json("Couldn't find a random Coromon.", { status: 500 });
    }
}
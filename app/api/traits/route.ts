import { NextRequest, NextResponse } from "next/server";
import { getTraits } from "@/lib/utils/traitUtils";

/**
 * GET /api/traits
 * 
 * Query the database for a list of all Traits, or filter by name if a search
 * parameter is provided.
 * 
 * Query Parameters:
 * - `search` (string, optional): filter Traits by name
 * 
 * @returns {Promise<NextResponse>}
 * - Status 200: Returns a list of Traits objects as a JSON response.
 * - Status 404: Couldn't find any Traits matching the search criteria.
 * - Status 500: An internal server error occurred.
 */
export async function GET(request: NextRequest) {
    const search = request.nextUrl.searchParams.get("search") ?? undefined;
    
    try {
        const traitData = await getTraits(search);
        return NextResponse.json(traitData);
    } catch (error) {
        console.error("Error fetching trait data: ", error);
        return NextResponse.json({ error: "Error fetching trait data" }, { status: 500 });
    }
}
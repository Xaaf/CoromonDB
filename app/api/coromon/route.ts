import { NextRequest, NextResponse } from "next/server";
import { getCoromon } from "@/lib/utils/coromonUtils";

/**
 * GET /api/coromon
 * 
 * Query the database for a list of all Coromon, or filter by name if a search
 * parameter is provided.
 * 
 * Query Parameters:
 * - `search` (string, optional): filter Coromon by name
 * 
 * @returns {Promise<NextResponse>}
 * - Status 200: Returns a list of Coromon objects as a JSON response.
 * - Status 404: Couldn't find any Coromon matching the search criteria.
 * - Status 500: An internal server error occurred.
 */
export async function GET(request: NextRequest) {
    const search = request.nextUrl.searchParams.get("search") ?? undefined;
    
    try {
        const coromonData = await getCoromon(search);
        return NextResponse.json(coromonData);
    } catch (error) {
        console.error("Error fetching coromon data: ", error);
        return NextResponse.json({ error: "Error fetching coromon data" }, { status: 500 });
    }
}

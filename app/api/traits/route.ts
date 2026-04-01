import { NextRequest, NextResponse } from "next/server";
import { getTraits } from "@/lib/utils/traitUtils";

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
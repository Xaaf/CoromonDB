import { NextRequest, NextResponse } from "next/server";
import { getCoromon } from "@/lib/utils/coromonUtils";

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

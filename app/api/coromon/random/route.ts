import { NextResponse } from "next/server";

export async function GET() {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/coromon`, {
            cache: "no-store", // prevents the Vercel caching issue
            next: { revalidate: 0 }, // ensures we get fresh data on every request
        });

        const data = await res.json();
        if (!data || data.length === 0) {
            return NextResponse.json(null, { status: 404 });
        }

        const random = data[Math.floor(Math.random() * data.length)];
        return NextResponse.json(random);
    } catch (error) {
        console.error("Error fetching random coromon:", error);
        return NextResponse.json(null, { status: 500 });
    }
}
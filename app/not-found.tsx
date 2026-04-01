import Link from "next/link";

async function getRandomCoromon() {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/coromon/random`, {
            cache: "no-store", // prevents the Vercel caching issue
        });
        if (!res.ok) return null;

        return await res.json();
    } catch (error) {
        console.error("Failed to fetch random Coromon:", error);
        return null;
    }
}

export default async function NotFound() {
    const coromon = await getRandomCoromon();

    return (
        <div className="min-h-screen flex items-center justify-center bg-[var(--color-bg)] dark:bg-[var(--color-bg-dark)] text-[var(--color-text)] dark:text-[var(--color-text-dark)]">
            <div className="text-center px-6">

                {/* Big 404 */}
                <h1 className="text-6xl font-bold mb-4">404</h1>

                {/* Message */}
                <h2 className="text-2xl font-semibold mb-2">
                    Page not found!
                </h2>

                <p className="mb-6 text-gray-600 dark:text-gray-400">
                    You encountered a wild{" "}
                    {coromon ? (
                        <Link
                            href={`/coromon/${coromon.slug}`}
                            className="underline hover:text-blue-300"
                        >
                            {coromon.name}
                        </Link>
                    ) : (
                        "Coromon"
                    )}{" "}
                    instead?!
                </p>

                {/* Actions */}
                <div className="space-x-4">
                    <Link
                        href="/"
                        className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition"
                    >
                        Home
                    </Link>

                    <Link
                        href="/coromon"
                        className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                    >
                        Browse Coromon
                    </Link>
                </div>
            </div>
        </div>
    );
}
import Link from "next/link";

/**
 * Utility function to fetch a random Coromon from the API. This is used in the 404
 * page to display a random Coromon when a user lands on a non-existent page for a
 * bit of fun and to encourage users to explore the database.
 * 
 * @returns {Promise<Object|null>} A random Coromon object or null if the fetch fails 
 * @see {@link GET /api/coromon/random} for the API endpoint that returns a random Coromon.
 */
async function getRandomCoromon() {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/coromon/random`, {
            cache: "no-store", // prevents the Vercel caching issue
            next: { revalidate: 0 }, // ensures we get fresh data on every request
        });
        if (!res.ok) return null;

        const data = await res.json();
        return Array.isArray(data) ? data[0] : data; // unwrap the first item
    } catch (error) {
        console.error("Failed to fetch random Coromon:", error);
        return null;
    }
}

/**
 * `NotFound` component
 * 
 * This component renders a custom 404 page when a user navigates to a non-existent route. It fetches
 * a random Coromon to display a fun message and encourage users to explore the database. It also provides
 * links to the home page and the Coromon browsing page for easy navigation.
 * 
 * @returns {JSX.Element} The rendered 404 page
 */
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
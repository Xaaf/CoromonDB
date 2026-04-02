import Link from "next/link";

/**
 * `Header` component
 * 
 * Renders the site header with navigation links.
 * 
 * @returns {Promise<JSX.Element>} The rendered Header component
 */
export default function Header() {

    return (
        <header className="bg-[var(--color-header)] dark:bg-[var(--color-header-dark)] shadow-md">
            <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
                {/* Logo */}
                <Link href="/">
                    <h1 className="text-[var(--color-text)] dark:text-[var(--color-text-dark)] font-bold text-xl">
                        CoromonDB
                    </h1>
                </Link>

                <nav className="flex space-x-4">
                    {/* Database Dropdown */}
                    <div className="relative group">
                        <Link href="/coromon" className="cursor-pointer text-[var(--color-text)] dark:text-[var(--color-text-dark)] hover:underline">
                            Database
                        </Link>

                        <div className="absolute right-0 mt-1 w-40 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150">
                            <Link
                                href="/coromon"
                                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                            >
                                Coromon
                            </Link>
                            <Link
                                href="/skills"
                                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                            >
                                Skills
                            </Link>
                            <Link
                                href="/traits"
                                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                            >
                                Traits
                            </Link>
                        </div>
                    </div>
                </nav>
            </div>
        </header>
    );
}
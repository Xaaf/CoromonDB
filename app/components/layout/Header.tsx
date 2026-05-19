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
        <header className="bg-(--color-bg-header) shadow-lg/10">
            <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
                {/* Logo */}
                <Link href="/">
                    <h1 className="font-bold text-xl">
                        CoromonDB
                    </h1>
                </Link>

                <nav className="flex space-x-6">
                    <Link href="/coromon" className="cursor-pointer hover:underline">
                        Coromon
                    </Link>

                    <Link href="/traits" className="cursor-pointer hover:underline">
                        Traits
                    </Link>

                    <Link href="/skills" className="cursor-pointer hover:underline">
                        Skills
                    </Link>

                    <Link href="/types" className="cursor-pointer hover:underline">
                        Types
                    </Link>

                    <Link href="/guides" className="cursor-pointer hover:underline">
                        Guides
                    </Link>

                    <Link href="/map" className="cursor-pointer hover:underline">
                        Map
                    </Link>
                </nav>
            </div>
        </header>
    );
}
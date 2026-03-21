import Link from "next/link";

export default function Header() {

    return (
        <header className="bg-[var(--color-header)] dark:bg-[var(--color-header-dark)] shadow-md">
            <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
                <Link href="/">
                    <h1 className="text-[var(--color-text)] dark:text-[var(--color-text-dark)] font-bold text-xl">
                        CoromonDB
                    </h1>
                </Link>

                <nav className="space-x-4">
                    <Link
                        href="/coromon"
                        className="text-[var(--color-text)] dark:text-[var(--color-text-dark)] hover:underline"
                    >
                        Database
                    </Link>
                    <Link
                        href="/about"
                        className="text-[var(--color-text)] dark:text-[var(--color-text-dark)] hover:underline"
                    >
                        About
                    </Link>
                </nav>
            </div>
        </header>
    );
}
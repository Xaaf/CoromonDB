export default function Header() {
    return (
        <header className="bg-[var(--color-header)] dark:bg-[var(--color-header-dark)] shadow-md">
            <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
                <h1 className="text-[var(--color-text)] dark:text-[var(--color-text-dark)] font-bold text-xl">
                    CoromonDB
                </h1>

                <nav className="space-x-4">
                    <a
                        href="/coromon"
                        className="text-[var(--color-text)] dark:text-[var(--color-text-dark)] hover:underline"
                    >
                        Coromon
                    </a>
                    <a
                        href="/about"
                        className="text-[var(--color-text)] dark:text-[var(--color-text-dark)] hover:underline"
                    >
                        About
                    </a>
                </nav>
            </div>
        </header>
    );
}
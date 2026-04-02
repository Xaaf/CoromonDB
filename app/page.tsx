import Container from "./components/layout/Container";
import NewsCard from "./components/news/NewsCard";

export default async function Home() {
    return (
        <div className="min-h-screen bg-[var(--color-bg)] dark:bg-[var(--color-bg-dark)] text-[var(--color-text)] dark:text-[var(--color-text-dark)]">
            <Container>
                {/* Quick About / Intro */}
                <section className="mb-8">
                    <p className="text-[var(--color-text)] dark:text-[var(--color-text-dark)]">
                        Welcome to the Coromon Database! Our aim is to provide information on anything related to
                        Coromon in the clearest way possible.

                        <br />
                        <br />

                        Explore all Coromon in our database, read the latest news, and quickly navigate
                        to guides, type charts, and more. The page uses a two-column layout: the main
                        column shows featured posts or updates, while the sidebar provides handy quicklinks.
                    </p>
                </section>

                {/* Two-column layout */}
                <div className="grid grid-cols-1 md:grid-cols-[3fr_1fr] gap-6">
                    {/* Main column */}
                    <main className="space-y-6">
                        <NewsCard
                            title="Coromon Remastered update is out on Steam!"
                            excerpt="An update with a major UI overhaul has arrived on Steam. The update also includes
                                        a number of bugfixes and some engine upgrades! In this post, we'll go over all
                                        the changes made in the update."
                            date="March 19th, 2026"
                            link="news/patch-coromon-remastered"
                            image="/images/coromon_remastered.png"
                        />

                        <NewsCard
                            title="Coromon Rogue Planet - September Progress"
                            excerpt="The developers recently shared information on their progress with the spin-off
                                        Coromon Rogue Planet. In this post, we'll discuss the newly shared information!"
                            date="September 16th, 2025"
                            link="news/rogue-planet-september-update"
                            image="/images/coromon_rogue_planet.png"
                        />                        
                    </main>

                    {/* Sidebar */}
                    <aside className="space-y-4">
                        <div className="bg-surface dark:bg-surface-dark rounded-xl shadow p-6">
                            <span className="text-xl font-semibold">Quicklinks</span>
                            <hr />
                            <ul className="mt-2 space-y-1">
                                <li><a href="/coromon" className="hover:underline">All Coromon</a></li>
                                <li><a href="/types" className="hover:underline">Type Chart</a></li>
                                <li><a href="/guides" className="hover:underline">Guides</a></li>
                            </ul>
                        </div>

                        <div className="bg-surface dark:bg-surface-dark rounded-xl shadow p-6">
                            Other sidebar content
                        </div>
                    </aside>
                </div>
            </Container>
        </div>
    );
}
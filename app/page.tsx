import Container from "@/app/components/layout/Container";
import NewsCard from "@/app/components/news/NewsCard";

export default async function Home() {
    return (
        <div className="">
            <Container>
                {/* Quick About / Intro */}
                <section className="text-5xl text-center -mt-10 mb-2">
                    <h1><strong>LATEST NEWS</strong></h1>
                </section>

                <main className="space-y-6 shadow-none">
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
            </Container>
        </div>
    );
}
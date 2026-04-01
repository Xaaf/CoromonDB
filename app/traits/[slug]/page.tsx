import Container from "@/app/components/layout/Container";
import TraitDetail from "@/app/components/traits/TraitDetail";

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;

    const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/traits?search=${encodeURIComponent(slug)}`,
        { next: { revalidate: 60 * 60 * 24 } }
    );
    const data = await res.json();

    const trait = data.find((t: any) => t.slug === slug);

    if (!trait) {
        return (
            <div className="min-h-screen flex items-center justify-center text-xl text-center text-[var(--color-text)] dark:text-[var(--color-text-dark)] bg-[var(--color-bg)] dark:bg-[var(--color-bg-dark)]">
                Trait not found. Please check the URL! If you believe this is a mistake, please contact the site admin.
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[var(--color-bg)] dark:bg-[var(--color-bg-dark)] text-[var(--color-text)] dark:text-[var(--color-text-dark)]">
            <Container>
                <TraitDetail trait={trait} />
            </Container>
        </div>
    );
}

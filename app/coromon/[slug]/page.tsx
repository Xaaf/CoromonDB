import Container from "@/app/components/layout/Container";
import CoromonDetail from "@/app/components/coromon/CoromonDetail";

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;

    const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/coromon?search=${encodeURIComponent(slug)}`
    );
    const data = await res.json();

    const coromon = data.find((c: any) => c.slug === slug);

    if (!coromon) {
        return (
            <div className="min-h-screen flex items-center justify-center text-xl text-center text-[var(--color-text)] dark:text-[var(--color-text-dark)] bg-[var(--color-bg)] dark:bg-[var(--color-bg-dark)]">
                Coromon not found. Please check the URL! If you believe this is a mistake, please contact the site admin.
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[var(--color-bg)] dark:bg-[var(--color-bg-dark)] text-[var(--color-text)] dark:text-[var(--color-text-dark)]">
            <Container>
                <CoromonDetail coromon={coromon} />
            </Container>
        </div>
    );
}

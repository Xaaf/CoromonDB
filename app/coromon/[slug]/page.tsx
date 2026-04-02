import Container from "@/app/components/layout/Container";
import CoromonDetail from "@/app/components/coromon/CoromonDetail";

/**
 * /coromon/[slug] page
 * 
 * Displays a detailed page for a single Coromon, through use of the `CoromonDetail`
 * component.
 * 
 * @param {Object} props - The page props
 * @param {Promise<{ slug: string }>} props.params - The URL parameters, containing the Coromon slug
 *  
 * @returns {Promise<JSX.Element>} The rendered Coromon detail page
 * @see {@link CoromonDetail} for the actual component that renders the Coromon details on this page.
 * @see {@link Container} for the layout component that is used to wrap the content on this page.
 * 
 * @remarks
 * This page uses Next.js's dynamic routing to display a page for each Coromon based on 
 * their slug. It fetches the Coromon data from the API and passes it to the `CoromonDetail`
 * component for rendering. If the Coromon is not found, it displays an error message.
 */
export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;

    const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/coromon?search=${encodeURIComponent(slug)}`,
        { next: { revalidate: 60 * 60 * 24 } }
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

import CoromonDetail from "@/app/components/coromon/CoromonDetail";
import { getCoromon } from "@/lib/utils/coromonUtils";
import { notFound } from "next/navigation";

/**
 * `/coromon/[slug]` page
 *
 * Displays a detailed page for a single Coromon, using a direct server-side query
 * via `getCoromon`. If the Coromon is not found, renders the 404 page.
 *
 * @param params - URL parameters containing the Coromon slug.
 * 
 * @return {Promise<JSX.Element>} The rendered Coromon detail Page.
 */
export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;

    const coromonList = await getCoromon(slug);
    const coromon = coromonList?.find((c: any) => c.slug === slug);

    if (!coromon) {
        notFound();
    }

    return (
        <div className="min-h-screen text-text">
            <CoromonDetail coromon={coromon} />
        </div>
    );
}

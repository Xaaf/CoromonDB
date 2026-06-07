import TraitDetail from "@/app/components/traits/TraitDetail";
import { getTraits } from "@/lib/utils/traitUtils";
import { notFound } from "next/navigation";

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;

    const traitList = await getTraits(slug);
    const trait = traitList?.find((t: any) => t.slug === slug);

    if (!trait) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-[var(--color-bg)] dark:bg-[var(--color-bg-dark)] text-[var(--color-text)] dark:text-[var(--color-text-dark)]">
            <TraitDetail trait={trait} />
        </div>
    );
}

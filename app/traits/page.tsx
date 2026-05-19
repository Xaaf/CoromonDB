import TraitGrid from "@/app/components/traits/TraitGrid";
import { getTraits } from "@/lib/utils/traitUtils";

export default async function TraitsPage() {
    const initialTraits = await getTraits();

    return <TraitGrid initialTraits={initialTraits} />;
}
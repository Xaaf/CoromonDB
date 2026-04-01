import { getTraits } from "@/lib/utils/traitUtils";
import TraitGrid from "../components/traits/TraitGrid";

export default async function TraitsPage() {
    const initialTraits = await getTraits();

    return <TraitGrid initialTraits={initialTraits} />;
}
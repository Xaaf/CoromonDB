import TraitGrid from "../components/traits/TraitGrid";

async function getInitialTraits() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/traits`);
    const data = await res.json();

    return data;
}

export default async function TraitsPage() {
    const initialTraits = await getInitialTraits();

    return <TraitGrid initialTraits={initialTraits} />;
}
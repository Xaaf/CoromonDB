import CoromonGrid from "@/app/components/coromon/CoromonGrid";

async function getInitialCoromon() {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/coromon`, 
        { next: { revalidate: 60 * 60 * 24 } }
    );
    const data = await res.json();

    const filtered = data.filter((c: any) => c.corodex_number >= -100);
    const sorted = filtered.sort(
        (a: { corodex_number: number; }, b: { corodex_number: number; }) => {
            if (a.corodex_number > 0 && b.corodex_number > 0) return a.corodex_number - b.corodex_number;
            if (a.corodex_number > 0) return -1;
            if (b.corodex_number > 0) return 1;

            if (a.corodex_number > b.corodex_number) return -1;
            if (a.corodex_number < b.corodex_number) return 1;

            return 0;
        });

    return sorted;
}

export default async function CoromonPage() {
    const initialCoromon = await getInitialCoromon();

    return <CoromonGrid initialCoromon={initialCoromon} />;
}
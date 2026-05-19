import CoromonGrid from "@/app/components/coromon/CoromonGrid";

/**
 * Fetches the initial list of Coromon from the API.
 * 
 * @returns {Promise<any[]>} The list of Coromon to display on the page 
 */
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

/**
 * `CoromonPage` component
 * 
 * Displays a list of all Coromon in a grid format, as well as a search bar allowing
 * for the user to easily find the Coromon they are looking for. Each Coromon is
 * displayed in a card with their icon, name, Corodex number and types.
 * 
 * @returns {Promise<JSX.Element>} The rendered Coromon page
 * @see {@link CoromonGrid} for the actual grid component that is rendered on this page.
 */
export default async function CoromonPage() {
    const initialCoromon = await getInitialCoromon();

    return (
        <div>
            <CoromonGrid initialCoromon={initialCoromon} />
        </div>
    );
}
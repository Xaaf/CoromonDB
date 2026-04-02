import { supabase } from "@/lib/supabase";
import Image from "next/image";

/**
 * `CoromonFrontSprites` component
 * 
 * Displays the front sprites for a given Coromon, including all three potential forms
 * in a tabbed element.
 * 
 * @param {object} props - The component props
 * @param {object} props.coromon - The Coromon data object
 * 
 * @returns {Promise<JSX.Element>} The rendered Coromon front sprites component
 */
export default async function CoromonFrontSprites({ coromon }: { coromon: any }) {
    const normalUrl = `${coromon.name.toLowerCase()}_normal_front.gif`;
    const potentUrl = `${coromon.name.toLowerCase()}_potent_front.gif`;
    const perfectUrl = `${coromon.name.toLowerCase()}_perfect_front.gif`;

    const normalData = await supabase.storage.from("coromon_front").getPublicUrl(normalUrl);
    const potentData = await supabase.storage.from("coromon_front").getPublicUrl(potentUrl);
    const perfectData = await supabase.storage.from("coromon_front").getPublicUrl(perfectUrl);

    return (
        <div className="w-full h-full flex items-center justify-center">
            {normalData.data.publicUrl && (
                <Image
                    src={normalData.data.publicUrl}
                    width={160}
                    height={160}
                    alt={`${coromon.name} Normal Sprite`}
                    className="object-contain max-h-full"
                    unoptimized
                />
            )}
        </div>
    );
}

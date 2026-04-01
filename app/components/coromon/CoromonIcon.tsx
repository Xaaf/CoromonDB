import { supabase } from "@/lib/supabase";
import Image from "next/image";

export default async function CoromonIcon({ name}: { name: string }) {
    const iconUrl = `${name.toLowerCase()}_normal.png`;
    const iconData = await supabase.storage.from("coromon_icons").getPublicUrl(iconUrl);

    if (!iconData.data.publicUrl) return null;

    return (
        <Image
            src={iconData.data.publicUrl}
            width={160}
            height={160}
            alt={`${name} Icon`}
            className="object-contain max-h-full"
            unoptimized
        />
    );

}
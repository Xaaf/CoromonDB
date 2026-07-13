import TypeIcon from "@/app/components/ui/TypeIcon";
import { getIconUrl } from "@/lib/utils/utils";
import Image from "next/image";
import Link from "next/link";

export default function CoromonCard({ coromon }: { coromon: any }) {
    return (
        <Link key={coromon.id} href={`/coromon/${coromon.slug}`}>
            <div className="bg-bg-container rounded-xl p-4 shadow-md/30 hover:shadow-lg/40 cursor-pointer flex items-center gap-4">
                <div className="w-10 h-10 flex flex-col items-center justify-center">
                    <Image
                        src={getIconUrl(coromon)}
                        width={40}
                        height={40}
                        alt=""
                        className="[image-rendering:pixelated]"
                    />

                    <p className="text-md text-sub-text">{coromon.corodex_number > 0 ? `#${coromon.corodex_number}` : "#???"}</p>
                </div>

                <div className="flex-1">
                    <h2 className="text-lg font-semibold mb-2">
                        {coromon.name}
                    </h2>

                    <p className="flex gap-2">
                        <TypeIcon type={coromon.primary_type} />
                        {coromon.secondary_type && (
                            <TypeIcon type={coromon.secondary_type} />
                        )}
                    </p>
                </div>
            </div>
        </Link>
    );
}
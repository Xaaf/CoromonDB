import Image from "next/image";

export default function TypeIcon({ type, size = 26 }: { type: string; size?: number }) {
    const iconName = type === "Fusebox" ? "normal" : (type?.toLowerCase() || "unknown");
    const h = Math.round(size * 14 / 13);
    const label = type ? type.charAt(0).toUpperCase() + type.slice(1) : "Unknown";
    return (
        <Image
            src={`/icons/${iconName}.png`}
            width={size}
            height={h}
            alt={label}
            title={label}
            className="[image-rendering:pixelated]"
        />
    );
}

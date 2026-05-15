import Image from "next/image";

export default function DataNotice() {
    return (
        <div className="max-w-3xl mx-auto p-4 mt-8 bg-(--color-bg-main-container) text-center shadow-lg/30 rounded-lg flex items-center justify-center gap-4">
            <Image
                src="/images/info.png" 
                alt="Information icon"
                width="16"
                height="16"
                className="[image-rendering:pixelated]"
            />
            <p><strong>Note</strong> The database is currently in development, so we might miss information!</p>
        </div>
    );
}
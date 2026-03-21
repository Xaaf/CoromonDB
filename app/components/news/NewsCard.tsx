type NewsCardProps = {
    title: string;
    excerpt: string;
    date: string;
    link: string;
    author?: string;
    image?: string;
};

export default function NewsCard({ title, excerpt, date, link, author, image }: NewsCardProps) {
    return (
        <a href={link} className="block bg-surface dark:bg-surface-dark rounded-xl shadow p-6 hover:shadow-lg transition">
            {image && (
                <div className="mb-4">
                <img src={image} alt={title} className="w-full h-48 object-cover rounded-lg" />
                </div>
            )}
            
            <h2 className="text-xl font-bold mb-2 text-[var(--color-text)] dark:text-[var(--color-text-dark)]">
                {title}
            </h2>

            <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mb-2">
                <span>{date}</span>
                {author && <span className="ml-2">- written by {author}</span>}
            </div>

            <p className="text-[var(--color-text)] dark:text-[var(--color-text-dark)]">{excerpt}</p>
        </a>
    );
}
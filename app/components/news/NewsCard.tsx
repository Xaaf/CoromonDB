import Image from "next/image";
import Link from "next/link";

type NewsCardProps = {
    title: string;
    excerpt: string;
    date: string;
    link: string;
    author?: string;
    image?: string;
};

const IMAGE_WIDTH: number = 800;
const IMAGE_HEIGHT: number = 400;

/**
 * `NewsCard` component
 * 
 * Displays a news article's preview in a card format. Includes the article's title, excerpt,
 * publication date, author (if available), and a thumbnail image (if available). The card is
 * a clickable link which refers to the full news article.
 * 
 * @param {Object} props - The component props
 * @param {string} props.title - The title of the news article
 * @param {string} props.excerpt - A short excerpt or summary of the news article
 * @param {string} props.date - The publication date of the news article
 * @param {string} props.link - The URL to the full news article
 * @param {string} props.author - The author of the news article (optional)
 * @param {string} props.image - The URL of the thumbnail image for the news article (optional) 
 *
 * @returns {JSX.Element} The rendered news card component
 */
export default function NewsCard({ title, excerpt, date, link, author, image }: NewsCardProps) {
    return (
        <Link href={link} className="block bg-bg-container rounded-xl shadow-md/15 p-6 hover:shadow-lg transition">
            {image && (
                <div className="mb-4">
                    <Image 
                        src={image}
                        alt={title}
                        width={IMAGE_WIDTH}
                        height={IMAGE_HEIGHT}
                        className="w-full h-48 object-cover rounded-t-lg"
                    />
                </div>
            )}
            
            <h2 className="text-center text-2xl font-bold mb-2">
                {title}
            </h2>

            <div className="text-center text-sm text-sub-text mb-2">
                <span>
                    posted on {date}{author && ", written by " + author}
                </span>
            </div>

            <p>{excerpt}</p>

            <p className="text-center text-sm mt-3 text-sub-text">
                Read more...
            </p>
        </Link>
    );
}
import { ReactNode } from "react";

type ContainerProps = {
    children: ReactNode;
    className?: string;
}

/**
 * `Container` component
 * 
 * A simple layout component that provides consistent padding and centers content
 * on larger screens.
 * 
 * @param {Object} props - The component props
 * @param {React.ReactNode} props.children - The child nodes to be rendered within the container
 * 
 * @returns {JSX.Element} The rendered Container component
 */
export default function Container({
    children,
    className = "",
}: ContainerProps) {
    return (
        <main className={`max-w-5xl mx-auto p-6 mt-8 bg-(--color-bg-main-container) ${className}`}>
            {children}
        </main>
    );
}
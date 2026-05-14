export default function Footer() {
    return (
        <footer className="text-center bg-bg-footer text-sm p-6 mt-8">
            <p className="font-mono">Made with &lt;3 by Xaaf | v.<strong>{process.env.NEXT_PUBLIC_GIT_HASH}@{process.env.NEXT_PUBLIC_GIT_BRANCH}</strong></p>
            <p className="font-mono">All content & design &#169; CoromonDB 2026. Coromon images and names &#169; 2021-2026 TRAGSoft</p>
        </footer>
    );
}
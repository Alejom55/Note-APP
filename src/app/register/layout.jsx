import RedirectAuth from "@/components/redirectAuth";
export default async function RegisterLayout({ children }) {
    await RedirectAuth();
    return (
        <div>
            {children}
        </div>
    );
}

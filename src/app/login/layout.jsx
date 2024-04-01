import RedirectAuth from "@/components/redirectAuth";
export default async function LogInLayout({ children }) {
    await RedirectAuth();
    return (
        <div>
            {children}
        </div>
    );
}

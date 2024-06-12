import { NavBar } from "@/components/NavBar/NavBar";

export default async function RootLayout({ children }) {
    return (
        <>
            <NavBar />
            {children}
        </>
    );
}
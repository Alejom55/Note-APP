import nextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
const handler = nextAuth({
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" },
            },
            authorize(credentials, req) {
                const user = { id: 1, fullname: "Test User", email: "test@gmail.com" };
                return user;
            },
        }),
    ],
});


export { handler as GET, handler as POST }
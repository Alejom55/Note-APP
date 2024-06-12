import nextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectDB } from "@/libs/mongodb";
import User from "@/models/user";
import bcrypt from "bcryptjs";
import NextAuth from "next-auth/next";

const handler = nextAuth({
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                await connectDB();
                const userFound = await User.findOne({ email: credentials.email }).select("+password");
                if (!userFound) {
                    throw new Error("Email o contraseña incorrectos");
                }
                const passwordMatch = await bcrypt.compare(credentials?.password, userFound.password)
                if (!passwordMatch) {
                    throw new Error("Email o contraseña incorrectos");
                }
                return userFound;
            },
        }),
    ],
    callbacks: {
        async jwt({ account, token, user, session }) {

            if (user) {
                token.user = user;
            }
            return token;
        },
        async session({ session, token, user }) {
            if (session.user) {
                session.user = token.user;
            }
            return session;
        }
    },
    pages: {
        signIn: "/login",
        signOut: "/",
    },
});

export const handlerAuth = NextAuth(handler);
export { handler as GET, handler as POST }
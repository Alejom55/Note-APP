// 'use client'
import { getServerSession } from 'next-auth';

// import { useEffect } from "react";
// import { getSession } from "next-auth/react";
import { redirect } from "next/navigation";

async function RedirectAuth() {
    // const router = useRouter();
    const session = await getServerSession();
    console.log(session)
    if (session) {
        redirect('/dashboard');;
    }
    // const checkSession = async () => {
    //     const session = await getSession();
    //     if (session) {
    //     }
    // };
    // useEffect(() => {
    //     checkSession();
    // }, []);

}

export default RedirectAuth;
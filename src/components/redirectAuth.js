// 'use client'
import { getServerSession } from 'next-auth';
import { redirect } from "next/navigation";

async function RedirectAuth() {

    const session = await getServerSession();
    console.log(session)
    if (session) {
        redirect('/dashboard');;
    }


}

export default RedirectAuth;
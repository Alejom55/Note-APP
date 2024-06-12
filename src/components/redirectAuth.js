// 'use client'
import { getServerSession } from 'next-auth';
import { redirect } from "next/navigation";

async function RedirectAuth() {

    const session = await getServerSession();
    // if (session) {
    //     redirect('/dashboard');;
    // }


}

export default RedirectAuth;
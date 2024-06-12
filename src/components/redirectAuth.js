// 'use client'
import { getServerSession } from 'next-auth';
import { redirect } from "next/navigation";
import { handlerAuth } from '@/app/api/auth/[...nextauth]/route';
async function RedirectAuth() {

    const session = await getServerSession(handlerAuth);
    if (session) {
        redirect('/dashboard');;
    }
}

export default RedirectAuth;
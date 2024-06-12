'use client'
import { getSession, signOut, useSession } from 'next-auth/react';
import './NavBar.css';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
export function NavBar() {
    const router = useRouter();
    const { data: session, status } = useSession();
    // if (!session) {
    //     return null;
    // }
    useEffect(() => {
        if (status === 'loading') return; // Esperar hasta que se cargue la sesión
        if (!session) {
            router.push('/');
            // Redirigir al inicio si no hay sesión
        }
    }, [session, status, router]);
    return (
        <>
            {session && (

                <nav className="navBar">
                    <div className='navBar-content'>
                        <button onClick={() => router.push('/dashboard')}>Dashboard</button>
                        <button onClick={() => router.push('/palindrome')}>Palindrome</button>
                        <button onClick={() => router.push('/word_counter')}>Word Counter</button>
                    </div>
                    <button onClick={signOut} className="signout-button">
                        Cerrar sesión
                    </button>

                </nav>
            )}
        </>
    )
}

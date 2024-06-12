'use client'
import { signOut, useSession } from 'next-auth/react';
import './NavBar.css';
import { useRouter } from 'next/navigation';

export function NavBar() {
    const router = useRouter();
    const { data: session, status } = useSession();
    if (!session) {
        return null;
    }
    return (
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
    )
}

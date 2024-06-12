'use client'
import './navBar.css';
import { useRouter } from 'next/navigation';
export function NavBar() {
    const router = useRouter();
    return (
        <nav className="navBar">
            <button onClick={() => router.push('/palindrome')}>Palindrome</button>
            <button onClick={() => router.push('/word_counter')}>Word Counter</button>
        </nav>
    )
}

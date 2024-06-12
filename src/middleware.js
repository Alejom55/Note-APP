export { default } from 'next-auth/middleware'

export const config = {
    matcher: ['/dashboard/:path*', '/palindrome/:path*', '/word_counter/:path*']
}

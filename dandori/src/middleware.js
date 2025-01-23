import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { decodeJwt } from 'jose';

export function middleware(request) {
    try {
        // Obtener cookie
        const cookie = cookies().get("Authorization");

        if (!cookie) {
            return NextResponse.redirect(new URL('/auth/signIn', request.url));
        }

        console.log("cookie: ", cookie)
        
        const token = decodeURIComponent(cookie.value?.replace('Bearer ', ''));

        if (!token) {
            throw new Error('Token is empty');
        }
        
        const decoded = decodeJwt(token);

        console.log("decodedToken: ", decoded)

        // Verifica si el token ha expirado
        const now = Math.floor(Date.now() / 1000);
        if (decoded.exp < now) {
            throw new Error('Token expired');
        }

        

        // Verifica la ruta actual
        const pathname = request.nextUrl.pathname;

        console.log("Middleware pathname: ", pathname)

        if (pathname.startsWith('/admin')) {
            // Si es una ruta de admin, verifica que el usuario sea administrador
            if (!decoded.isAdmin) {
                return NextResponse.redirect(new URL('/auth/signIn', request.url));
            }
        }

        return NextResponse.next()
    } catch (error) {
        console.error('Middleware error:', error.message);
        return NextResponse.redirect(new URL('/auth/signIn', request.url));
    }
}

export const config = {
    matcher: ['/cart', '/account', '/admin/:path*'],
};

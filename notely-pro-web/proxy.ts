import { getToken } from "next-auth/jwt";
import { NextResponse } from 'next/server';
import type { NextRequest } from "next/server";

export const proxy = async (req: NextRequest) => {
    const oauthToken = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    const accessToken = oauthToken?.accessToken || req.cookies.get("accessToken")?.value;
    const isAuthenticated = !!accessToken;
    const pathname = req.nextUrl.pathname;

    if (!isAuthenticated && pathname.startsWith('/dashboard')) {
        return NextResponse.redirect(new URL("/login", req.url));
    }

   
    if (isAuthenticated && (pathname === '/login' || pathname === '/register' || pathname === '/')) {
        return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    return NextResponse.next();
};

export const config = {
    matcher: ["/dashboard/:path*", "/login", "/register","/"]
};

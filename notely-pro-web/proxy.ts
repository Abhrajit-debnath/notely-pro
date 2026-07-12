import { getToken } from "next-auth/jwt";
import { NextResponse } from 'next/server'
import type { NextRequest } from "next/server";

export const proxy = async (req: NextRequest, res: NextResponse) => {
    const oauthToken = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    const accessToken = oauthToken?.accessToken || req.cookies.get("accessToken")?.value;
    const isAuthenticated = !accessToken || !oauthToken;
    const pathname = req.nextUrl.pathname;

    if (!isAuthenticated && pathname !== '/dashboard') {
        NextResponse.redirect(new URL("/login", req.url))

    } else if (isAuthenticated && pathname === '/login') {
        NextResponse.redirect(new URL("/dashboard", req.url))
    }

    NextResponse.next()
}

export const config = {
    matcher: ["/dashboard/:path*", "/login",]
}
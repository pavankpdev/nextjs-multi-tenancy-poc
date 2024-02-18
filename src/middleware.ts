import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import {customDomain} from "@/utils/domains";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
    const host = request.headers.get('host')
    const next = NextResponse.next

    if(host === customDomain) {
        return next()
    }

    const requestedPath = request.nextUrl.pathname + request.nextUrl.search;
    const redirectUrl = new URL(requestedPath, customDomain);

    return NextResponse.redirect(redirectUrl);
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
}
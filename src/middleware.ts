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
    // This approach avoids constructing a new URL from a base URL string
    const url = request.nextUrl.clone(); // Clone the current URL to modify
    url.host = customDomain; // Change the host to the custom domain
    // Optional: Redirect to HTTPS by setting the protocol
    url.protocol = 'https';

    return NextResponse.redirect(url);
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
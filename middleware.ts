import createMiddleware from 'next-intl/middleware';
import { pathnames, locales, localePrefix } from './config';
import { NextRequest } from 'next/server';

export default function middleware(req:NextRequest)
{
    const handle = createMiddleware({
    locales,
    defaultLocale: 'en',
    pathnames,
    localePrefix    
    });

    return handle(req);

}

export const config = {
    matcher: [
        // Enable a redirect to a matching locale at the root
        '/',

        // Set a cookie to remember the previous locale for
        // all requests that have a locale prefix
        '/(vi|en|ja)/:path*',

        // Enable redirects that add missing locales
        // (e.g. `/pathnames` -> `/en/pathnames`)
        '/((?!_next|api|img|_vercel|\.*\.svg).*)'
    ]
};

import { Pathnames } from 'next-intl/navigation';

export const locales = ['en', 'ja'] as const;

export const pathnames = {
    '/': '/',
    '/studio': '/en/studio',
    // '/api': {
    //     en: '/api',
    //     ja: '/api'
    // }
} satisfies Pathnames<typeof locales>;

export const localePrefix = undefined;

export type AppPathnames = keyof typeof pathnames;

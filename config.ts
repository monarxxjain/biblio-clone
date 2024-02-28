import { Pathnames } from 'next-intl/navigation';

export const locales = ['en', 'vi'] as const;

export const pathnames = {
    '/': '/',
    '/studio': '/en/studio',
    '/author': {
        en: '/author',
        vi: '/author'
    },
    '/about': {
        en: '/about',
        vi: '/about'
    },
    '/bogs': {
        en: '/bogs',
        vi: '/bogs'
    },
    '/quotes': {
        en: '/quotes',
        vi: '/quotes'
    },
    '/search': {
        en: '/search',
        vi: '/search'
    },
} satisfies Pathnames<typeof locales>;

export const localePrefix = undefined;

export type AppPathnames = keyof typeof pathnames;

import { notFound } from 'next/navigation';
import {getRequestConfig} from 'next-intl/server';

// Can be imported from a shared config
const locales = ['en', 'ja'];

export default getRequestConfig(async ({ locale }) => {
    // Validate that the incoming `locale` parameter is valid
    if (!locales.includes(locale as any)) notFound();
    return {
        messages: (await (locale === 'en'
            ?
            import('./messages/en.json')
            : import(`./messages/${locale}.json`))).default,
        onError(error) {
            console.error(error);
        },
    };
});
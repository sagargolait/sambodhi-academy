import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { NotificationProvider } from '@/context/notificationContext';
import ClientLayout from '@/components/ClientLayout';
import { CollectionSlug, getPayload } from 'payload'
import config from '@payload-config'
import { Toaster } from "@/components/ui/sonner"
import { Analytics } from "@vercel/analytics/react"
import '@/styles/globals.css'
import { generateMetadataFromPayload } from '@/utilities/generateMetatDataPayload';

type Locale = typeof routing.locales[number];

export async function generateMetadata() {
    return generateMetadataFromPayload(null);
}

interface LayoutProps {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
}

export default async function LocaleLayout({
    children,
    params,
}: LayoutProps) {
    const { locale } = await params;

    if (!routing.locales.includes(locale as Locale)) {
        notFound();
    }
    const payload = await getPayload({ config })
    const messages = await getMessages();
    const [addresses] = await Promise.all([payload.find({
        collection: 'addresses' as CollectionSlug,
        locale: locale as any,
        depth: 2,
        sort: 'order'
    })])

    return (
        <html lang={locale}>
            <body>
                <NextIntlClientProvider messages={messages}>
                    <NotificationProvider>
                        <Toaster position='top-right' />
                        <Analytics />
                        <ClientLayout data={{ ...addresses.docs }}>{children}</ClientLayout>
                    </NotificationProvider>
                </NextIntlClientProvider>
            </body>
        </html >
    );
}
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { NotificationProvider } from '@/context/notificationContext';
import ClientLayout from '@/components/ClientLayout';
import { CollectionSlug, getPayload } from 'payload'
import config from '@payload-config'
import { Toaster } from "@/components/ui/sonner"

import '@/styles/globals.css'

type Locale = typeof routing.locales[number];

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
        depth: 2,
    })])

    return (
        <html lang={locale}>
            <body>
                <NextIntlClientProvider messages={messages}>
                    <NotificationProvider>
                        <Toaster position='top-right' />
                        <ClientLayout data={{ ...addresses.docs }}>{children}</ClientLayout>
                    </NotificationProvider>
                </NextIntlClientProvider>
            </body>
        </html >
    );
}
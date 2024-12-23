import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { NotificationProvider } from '@/context/notificationContext';
import ClientLayout from '@/components/ClientLayout';
import { unstable_setRequestLocale } from 'next-intl/server';

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

    unstable_setRequestLocale(locale);

    if (!routing.locales.includes(locale as Locale)) {
        notFound();
    }

    const messages = await getMessages();

    return (
        <html lang={locale}>
            <body>
                <NextIntlClientProvider messages={messages}>
                    <NotificationProvider>
                        <ClientLayout>{children}</ClientLayout>
                    </NotificationProvider>
                </NextIntlClientProvider>
            </body>
        </html>
    );
}
// layout.tsx
import ClientLayout from "@/components/ClientLayout";
import { NotificationProvider } from "@/context/notificationContext";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sambodhi Academy",
  description: "Your site description goes here",
  keywords: ["Sambodhi Academy"],
  openGraph: {
    title: "Sambodhi Academy",
    description: "Your site description goes here",
    type: "website",
    locale: "en_US",
    url: "https://sambodhiacademy.com/",
    siteName: "Sambodhi Academy",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sambodhi Academy",
    description: "Your site description goes here",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <NotificationProvider>
          <ClientLayout>{children}</ClientLayout>
        </NotificationProvider>
      </body>
    </html>
  );
}

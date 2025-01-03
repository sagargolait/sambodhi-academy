"use client";

import { Footer } from "@/components";
import Navbar from "@/components/NavBar";
import "@/styles/globals.css";
import { MessageCircle, Send } from "lucide-react";
import { CollectionSlug, DataFromCollectionSlug } from "payload";
import { useState } from "react";
import { NotificationStrip } from "./notificaionsStrip";
import { link } from "fs";
// import { NotificationModal } from "./notificationModal";


export default function ClientLayout({
  children,
  data
}: {
  children: React.ReactNode;
  data: DataFromCollectionSlug<CollectionSlug>[] | undefined;
}) {
  const [showFloatingFooter, setShowFloatingFooter] = useState(true);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <NotificationStrip />
      <main className="flex-grow">{children}</main>
      <Footer addresses={data} setShowFloatingFooter={setShowFloatingFooter} />
      {showFloatingFooter && (
        <a
          href="https://wa.me/911234567890"
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-20 right-4 z-50 bg-green-500 text-white p-3 rounded-full shadow-lg hover:bg-green-600 transition-colors duration-300"
          aria-label="Chat with us on WhatsApp"
        >
          <MessageCircle className="h-6 w-6" />
        </a>
      )}
      {showFloatingFooter && (
        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-[#10375C] p-4 z-40">
          <a
            href="https://t.me/sambodhimpsc"
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full bg-[#F3C623] text-[#10375C] py-2 px-4 rounded-md text-center font-semibold hover:bg-[#EB8317] transition-colors duration-300"
          >
            <Send className="inline-block mr-2 h-5 w-5" />
            Join our Telegram
          </a>
        </div>
      )}
      {/* <NotificationModal /> */}
    </div>
  );
}

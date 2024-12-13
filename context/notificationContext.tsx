"use client";

import React, { createContext, useState, useContext, useEffect } from "react";
import { usePathname } from "next/navigation";

type NotificationContextType = {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
};

const NotificationContext = createContext<NotificationContextType | undefined>(
  undefined
);

export const NotificationProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  useEffect(() => {
    // Open the modal when the pathname changes
    openModal();
  }, [pathname]);

  return (
    <NotificationContext.Provider value={{ isOpen, openModal, closeModal }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error(
      "useNotification must be used within a NotificationProvider"
    );
  }
  return context;
};

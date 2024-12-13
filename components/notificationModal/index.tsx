"use client";

import React from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNotification } from "@/context/notificationContext";

export const NotificationModal = () => {
  const { isOpen, closeModal } = useNotification();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
        <div className="flex justify-between items-center p-6 bg-[#10375C] rounded-t-lg">
          <h2 className="text-xl font-bold text-white">Special Offer!</h2>
          <button
            onClick={closeModal}
            className="text-white hover:text-[#F3C623]"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        <div className="p-6">
          <p className="text-gray-700 mb-4">
            Get 20% off on all our premium courses! Limited time offer for
            aspiring government service candidates.
          </p>
          <img
            src="/placeholder.svg?height=200&width=400"
            alt="Special Offer Banner"
            className="w-full h-40 object-cover mb-4 rounded"
          />
          <div className="flex justify-end">
            <Button
              onClick={closeModal}
              className="bg-[#F3C623] text-[#10375C] hover:bg-[#EB8317]"
            >
              Claim Offer
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

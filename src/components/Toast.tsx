"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, AlertCircle, X } from "lucide-react";
import { ToastProps } from "@/types/toastProps.types";

export default function Toast({ show, message, type, onClose }: ToastProps) {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onClose();
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: -50, scale: 0.3 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
          className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50">
          <motion.div
            className={`flex items-center p-4 rounded-lg shadow-lg ${
              type === "success" ? "bg-green-500" : "bg-red-500"
            } text-white max-w-md w-full`}
            initial={{ x: "-50%", y: -50 }}
            animate={{ x: "-50%", y: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}>
            <div className="flex-shrink-0 mr-3">
              {type === "success" ? (
                <CheckCircle className="w-6 h-6" />
              ) : (
                <AlertCircle className="w-6 h-6" />
              )}
            </div>
            <div className="flex-grow mr-2">{message}</div>
            <button
              onClick={onClose}
              className="flex-shrink-0 focus:outline-none transition-transform hover:scale-110">
              <X className="w-5 h-5" />
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

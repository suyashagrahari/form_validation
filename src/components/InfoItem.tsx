"use client";

import React from "react";
import { motion } from "framer-motion";

const InfoItem: React.FC<{
  icon: React.ReactNode;
  label: string;
  value?: string;
}> = ({ icon, label, value }) => (
  <motion.div
    className="flex items-center space-x-4 p-3 bg-gray-100 dark:bg-gray-800 rounded-lg"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}>
    <div className="text-blue-500 dark:text-blue-400">{icon}</div>
    <div>
      <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
        {label}
      </p>
      <p className="text-lg font-semibold">{value || "N/A"}</p>
    </div>
  </motion.div>
);

export default InfoItem;

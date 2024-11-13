"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle,
  AlertCircle,
  ChevronRight,
  Mail,
  Briefcase,
  User,
} from "lucide-react";
import UserPopup from "./UserPopup";
import { UserCardProps } from "@/types/userCard.type";

const UserCard: React.FC<UserCardProps> = ({ user }) => {
  const [isPopupOpen, setPopupOpen] = useState(false);

  const togglePopup = () => setPopupOpen(!isPopupOpen);

  return (
    <>
      <motion.div
        className="bg-slate-800/50 backdrop-blur-sm rounded-lg shadow-lg p-6 max-w-md mx-auto my-4 cursor-pointer hover:shadow-xl transition-all duration-300 relative overflow-hidden border border-slate-600/50"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ scale: 1.03 }}
        transition={{ duration: 0.3, ease: "easeOut" }}>
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-indigo-600/10 to-purple-600/10 opacity-0 transition-opacity duration-300"
          whileHover={{ opacity: 1 }}
        />

        <motion.div className="relative z-10" onClick={togglePopup}>
          <motion.div
            className="text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}>
            <User className="w-16 h-16 mx-auto mb-4 text-indigo-400" />
            <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-200 to-purple-200 mb-2">
              {user.personalInfo.firstName} {user.personalInfo.lastName}
            </h2>
            {user.personalInfo.occupation && (
              <motion.div
                className="flex items-center justify-center text-sm text-slate-300 mb-1"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}>
                <Briefcase className="w-4 h-4 mr-1" />
                <span>{user.personalInfo.occupation}</span>
              </motion.div>
            )}
            {user.personalInfo.email && (
              <motion.div
                className="flex items-center justify-center text-sm text-slate-300"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}>
                <Mail className="w-4 h-4 mr-1" />
                <span>{user.personalInfo.email}</span>
              </motion.div>
            )}
          </motion.div>

          <motion.div
            className="mt-6 flex items-center justify-center space-x-2"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, type: "spring", stiffness: 200 }}>
            {user.preferences.notifications ? (
              <CheckCircle className="text-green-500 w-6 h-6" />
            ) : (
              <AlertCircle className="text-red-500 w-6 h-6" />
            )}
            <p className="text-slate-300">
              Notifications:{" "}
              {user.preferences.notifications ? "Enabled" : "Disabled"}
            </p>
          </motion.div>

          <motion.div
            className="text-center mt-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}>
            <span className="inline-block px-4 py-1 text-sm font-semibold rounded-full bg-indigo-600/20 text-indigo-300">
              Theme: {user.preferences.theme || "Default"}
            </span>
          </motion.div>

          <motion.div
            className="mt-6 flex items-center justify-center text-indigo-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            whileHover={{ scale: 1.05 }}>
            <span className="text-sm font-medium">View Details</span>
            <ChevronRight className="w-4 h-4 ml-1" />
          </motion.div>
        </motion.div>
      </motion.div>

      <AnimatePresence>
        {isPopupOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-50">
            <UserPopup user={user} onClose={togglePopup} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default UserCard;

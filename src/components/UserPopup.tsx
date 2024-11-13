"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, User, Briefcase, Mail, Settings, Shield } from "lucide-react";
import { UserPopupProps } from "@/types/userPopup.types";
import InfoItem from "@/components/InfoItem";
const UserPopup: React.FC<UserPopupProps> = ({ user, onClose }) => {
  const [activeTab, setActiveTab] = React.useState("personal");

  const tabVariants = {
    inactive: { opacity: 0.6, scale: 0.95 },
    active: { opacity: 1, scale: 1 },
  };

  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}>
      <motion.div
        className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-8 max-w-2xl w-full mx-4 relative overflow-hidden"
        initial={{ scale: 0.9, y: 50 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 50 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}>
        <motion.button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}>
          <X className="w-6 h-6" />
        </motion.button>

        <motion.h3
          className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6 text-center"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}>
          User Profile
        </motion.h3>

        <div className="flex mb-6 justify-center space-x-4">
          {["personal", "account", "preferences"].map((tab) => (
            <motion.button
              key={tab}
              onClick={() => setActiveTab(tab)}
              variants={tabVariants}
              initial="inactive"
              animate={activeTab === tab ? "active" : "inactive"}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-4 py-2 rounded-full ${
                activeTab === tab
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
              }`}>
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </motion.button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            variants={contentVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={{ duration: 0.3 }}
            className="space-y-4 text-gray-700 dark:text-gray-300">
            {activeTab === "personal" && (
              <>
                <InfoItem
                  icon={<User className="w-5 h-5" />}
                  label="Name"
                  value={`${user.personalInfo.firstName} ${user.personalInfo.lastName}`}
                />
                <InfoItem
                  icon={<Mail className="w-5 h-5" />}
                  label="Email"
                  value={user.personalInfo.email}
                />
                <InfoItem
                  icon={<Briefcase className="w-5 h-5" />}
                  label="Occupation"
                  value={user.personalInfo.occupation}
                />
                {user.personalInfo.companyDetails && (
                  <>
                    <InfoItem
                      icon={<Briefcase className="w-5 h-5" />}
                      label="Company"
                      value={user.personalInfo.companyDetails.companyName}
                    />
                    <InfoItem
                      icon={<Briefcase className="w-5 h-5" />}
                      label="Position"
                      value={user.personalInfo.companyDetails.position}
                    />
                  </>
                )}
              </>
            )}

            {activeTab === "account" && (
              <>
                <InfoItem
                  icon={<User className="w-5 h-5" />}
                  label="Username"
                  value={user.accountDetails.username}
                />
                <InfoItem
                  icon={<Shield className="w-5 h-5" />}
                  label="Account Type"
                  value={user.accountDetails.accountType}
                />
                <InfoItem
                  icon={<Settings className="w-5 h-5" />}
                  label="Notifications"
                  value={
                    user.accountDetails.preferences?.notifications
                      ? "Enabled"
                      : "Disabled"
                  }
                />
                <InfoItem
                  icon={<Shield className="w-5 h-5" />}
                  label="Two-Factor Auth"
                  value={
                    user.accountDetails.preferences?.twoFactorAuth
                      ? "Enabled"
                      : "Disabled"
                  }
                />
              </>
            )}

            {activeTab === "preferences" && (
              <>
                <InfoItem
                  icon={<Settings className="w-5 h-5" />}
                  label="Theme"
                  value={user.preferences.theme}
                />
                <InfoItem
                  icon={<Settings className="w-5 h-5" />}
                  label="Language"
                  value={user.preferences.language}
                />
                <InfoItem
                  icon={<Settings className="w-5 h-5" />}
                  label="Accessibility"
                  value={
                    user.preferences.accessibility ? "Enabled" : "Disabled"
                  }
                />
              </>
            )}
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};

export default UserPopup;

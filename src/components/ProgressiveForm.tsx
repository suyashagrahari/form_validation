import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, User, Key, Settings } from "lucide-react";
import PersonalInfo from "./PersonalInfo";
import AccountDetails from "./AccountDetails";
import Preferences from "./Preferences";

type FormData = {
  personalInfo: {
    firstName: string;
    lastName: string;
    email: string;
  };
  accountDetails: {
    username: string;
    password: string;
  };
  preferences: {
    theme: string;
    notifications: boolean;
  };
};

const initialFormData: FormData = {
  personalInfo: { firstName: "", lastName: "", email: "" },
  accountDetails: { username: "", password: "" },
  preferences: { theme: "dark", notifications: true },
};

const steps = [
  { title: "Personal Info", icon: User },
  { title: "Account", icon: Key },
  { title: "Preferences", icon: Settings },
];

// Enhanced animation variants for page transitions
const pageVariants = {
  initial: {
    opacity: 0,
    y: 20,
    scale: 0.95,
    rotateX: -10,
  },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    rotateX: 0,
    transition: {
      duration: 0.6,
      ease: [0.4, 0, 0.2, 1],
      staggerChildren: 0.1,
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    scale: 0.95,
    rotateX: 10,
    transition: {
      duration: 0.4,
      ease: [0.4, 0, 1, 1],
    },
  },
};

// Enhanced animation variants for step indicators
const stepVariants = {
  inactive: {
    scale: 1,
    backgroundColor: "rgba(15, 23, 42, 0.3)",
    color: "#94A3B8",
    transition: { duration: 0.4 },
  },
  active: {
    scale: 1.1,
    backgroundColor: "rgba(129, 140, 248, 0.8)",
    color: "#FFFFFF",
    boxShadow: "0 0 20px rgba(129, 140, 248, 0.5)",
    transition: {
      duration: 0.4,
      type: "spring",
      stiffness: 300,
      damping: 20,
    },
  },
  complete: {
    scale: 1,
    backgroundColor: "rgba(16, 185, 129, 0.8)",
    color: "#FFFFFF",
    boxShadow: "0 0 20px rgba(16, 185, 129, 0.3)",
    transition: { duration: 0.4 },
  },
};

export default function ProgressiveForm() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(initialFormData);

  const handleNext = () => {
    setStep((prevStep) => prevStep + 1);
  };

  const handlePrevious = () => {
    setStep((prevStep) => prevStep - 1);
  };

  const handleSubmit = () => {
    console.log("Form submitted:", formData);
  };

  const updateFormData = (stepData: Partial<FormData>) => {
    setFormData((prevData) => ({ ...prevData, ...stepData }));
  };

  return (
    <div className="flex items-center justify-center md:p-6 sm:py-0 py-2">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
        className="w-full max-w-2xl">
        <div className="backdrop-blur-xl bg-slate-900/30 rounded-3xl shadow-2xl p-8 border border-slate-700/50">
          <h2 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Create Your Account
          </h2>

          {/* Enhanced Step Indicator */}
          <div className="mb-12 relative">
            <div className="flex items-center justify-between w-full mb-4">
              {steps.map((s, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center relative z-10">
                  <motion.div
                    initial="inactive"
                    animate={
                      index + 1 === step
                        ? "active"
                        : index + 1 < step
                        ? "complete"
                        : "inactive"
                    }
                    variants={stepVariants}
                    className="w-14 h-14 rounded-full flex items-center justify-center shadow-lg cursor-pointer backdrop-blur-sm"
                    whileHover={{
                      scale: 1.05,
                      boxShadow: "0 0 25px rgba(129, 140, 248, 0.6)",
                    }}
                    whileTap={{ scale: 0.95 }}>
                    {index + 1 < step ? (
                      <CheckCircle className="sm:w-7 w-5 h-5 sm:h-7" />
                    ) : (
                      <s.icon className="sm:w-7 w-5 h-5 sm:h-7" />
                    )}
                  </motion.div>
                  <motion.span
                    initial={{ opacity: 0.5 }}
                    animate={{
                      opacity: index + 1 === step ? 1 : 0.7,
                      scale: index + 1 === step ? 1.05 : 1,
                    }}
                    className="mt-3 font-medium sm:text-sm text-xs text-slate-300">
                    {s.title}
                  </motion.span>
                </div>
              ))}
            </div>

            {/* Enhanced Progress Bar */}
            <div className="absolute top-7 left-[10%] w-[80%] h-1 bg-slate-800/50 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full"
                initial={{ width: "0%" }}
                animate={{
                  width: `${((step - 1) / (steps.length - 1)) * 100}%`,
                }}
                transition={{
                  duration: 0.5,
                  ease: [0.4, 0, 0.2, 1],
                }}
              />
            </div>
          </div>

          {/* Form Steps with Enhanced Animations */}
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="personal"
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="transform perspective-1000">
                <PersonalInfo
                  data={formData.personalInfo}
                  updateData={(data) => updateFormData({ personalInfo: data })}
                  onNext={handleNext}
                />
              </motion.div>
            )}
            {step === 2 && (
              <motion.div
                key="account"
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="transform perspective-1000">
                <AccountDetails
                  data={formData.accountDetails}
                  updateData={(data) =>
                    updateFormData({ accountDetails: data })
                  }
                  onNext={handleNext}
                  onPrevious={handlePrevious}
                />
              </motion.div>
            )}
            {step === 3 && (
              <motion.div
                key="preferences"
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="transform perspective-1000">
                <Preferences
                  data={formData.preferences}
                  updateData={(data) => updateFormData({ preferences: data })}
                  onPrevious={handlePrevious}
                  onSubmit={handleSubmit}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}

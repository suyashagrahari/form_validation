"use client";

import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { CheckCircle, AlertCircle, Plus, Minus } from "lucide-react";

type PersonalInfoProps = {
  data: {
    firstName: string;
    lastName: string;
    email: string;
    additionalEmails?: string[];
    occupation?: string;
    companyDetails?: {
      companyName?: string;
      position?: string;
    };
  };
  updateData: (data: PersonalInfoProps["data"]) => void;
  onNext: () => void;
};

export default function PersonalInfo({
  data,
  updateData,
  onNext,
}: PersonalInfoProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showCompanyDetails, setShowCompanyDetails] = useState(false);
  const [additionalEmails, setAdditionalEmails] = useState<string[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    defaultValues: data,
  });

  const occupation = watch("occupation");

  // Update the useEffect for loading session data
  useEffect(() => {
    const savedData = sessionStorage.getItem("personalInfoData");
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      Object.entries(parsedData).forEach(([key, value]) => {
        setValue(key as any, value);
      });
      if (parsedData.occupation === "Employed") {
        setShowCompanyDetails(true);
      }
      // Update this part to properly set additional emails
      if (
        parsedData.additionalEmails &&
        Array.isArray(parsedData.additionalEmails)
      ) {
        setAdditionalEmails(parsedData.additionalEmails);
      }
    }
  }, [setValue]);

  // Watch for occupation changes to show/hide company details
  useEffect(() => {
    if (occupation === "Employed") {
      setShowCompanyDetails(true);
    } else {
      setShowCompanyDetails(false);
    }
  }, [occupation]);

  // Update the addEmailField function
  const addEmailField = () => {
    const newEmails = [...additionalEmails, ""];
    setAdditionalEmails(newEmails);
    // Update session storage when adding email field
    const currentData = JSON.parse(
      sessionStorage.getItem("personalInfoData") || "{}"
    );
    sessionStorage.setItem(
      "personalInfoData",
      JSON.stringify({
        ...currentData,
        additionalEmails: newEmails,
      })
    );
  };

  // Update the removeEmailField function
  const removeEmailField = (index: number) => {
    const newEmails = additionalEmails.filter((_, i) => i !== index);
    setAdditionalEmails(newEmails);
    // Update session storage when removing email field
    const currentData = JSON.parse(
      sessionStorage.getItem("personalInfoData") || "{}"
    );
    sessionStorage.setItem(
      "personalInfoData",
      JSON.stringify({
        ...currentData,
        additionalEmails: newEmails,
      })
    );
  };
  const onSubmit = async (formData: PersonalInfoProps["data"]) => {
    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Add additional emails to form data
      const finalData = {
        ...formData,
        additionalEmails: additionalEmails,
      };

      updateData(finalData);
      sessionStorage.setItem("personalInfoData", JSON.stringify(finalData));
      onNext();
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Animation variants (keeping existing ones)
  const inputVariants = {
    focus: { scale: 1.02, transition: { duration: 0.2 } },
    blur: { scale: 1, transition: { duration: 0.2 } },
  };

  const errorVariants = {
    initial: { opacity: 0, y: -10, scale: 0.95 },
    animate: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: -10, scale: 0.95 },
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="space-y-6">
      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-2xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-indigo-200 to-purple-200">
        Personal Information
      </motion.h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Existing fields */}
        <div>
          <label
            htmlFor="firstName"
            className="block text-sm font-medium text-slate-300 mb-2">
            First Name
          </label>
          <motion.div
            variants={inputVariants}
            whileFocus="focus"
            whileTap={{ scale: 0.98 }}>
            <input
              type="text"
              id="firstName"
              {...register("firstName", { required: "First name is required" })}
              className={`w-full px-4 py-3 rounded-lg bg-slate-800/50 backdrop-blur-sm border ${
                errors.firstName ? "border-red-500/50" : "border-slate-600/50"
              } text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-transparent transition duration-200`}
              placeholder="Enter your first name"
            />
          </motion.div>
          {errors.firstName && (
            <motion.p
              variants={errorVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="text-red-400 text-sm mt-2 flex items-center">
              <AlertCircle className="w-4 h-4 mr-1" />
              {errors.firstName.message}
            </motion.p>
          )}
        </div>
        <div>
          <label
            htmlFor="lastName"
            className="block text-sm font-medium text-slate-300 mb-2">
            Last Name
          </label>
          <motion.div
            variants={inputVariants}
            whileFocus="focus"
            whileTap={{ scale: 0.98 }}>
            <input
              type="text"
              id="lastName"
              {...register("lastName", { required: "Last name is required" })}
              className={`w-full px-4 py-3 rounded-lg bg-slate-800/50 backdrop-blur-sm border ${
                errors.lastName ? "border-red-500/50" : "border-slate-600/50"
              } text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-transparent transition duration-200`}
              placeholder="Enter your last name"
            />
          </motion.div>
          {errors.lastName && (
            <motion.p
              variants={errorVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="text-red-400 text-sm mt-2 flex items-center">
              <AlertCircle className="w-4 h-4 mr-1" />
              {errors.lastName.message}
            </motion.p>
          )}
        </div>
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-slate-300 mb-2">
            Email
          </label>
          <motion.div
            variants={inputVariants}
            whileFocus="focus"
            whileTap={{ scale: 0.98 }}>
            <input
              type="email"
              id="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
              className={`w-full px-4 py-3 rounded-lg bg-slate-800/50 backdrop-blur-sm border ${
                errors.email ? "border-red-500/50" : "border-slate-600/50"
              } text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-transparent transition duration-200`}
              placeholder="Enter your email address"
            />
          </motion.div>
          {errors.email && (
            <motion.p
              variants={errorVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="text-red-400 text-sm mt-2 flex items-center">
              <AlertCircle className="w-4 h-4 mr-1" />
              {errors.email.message}
            </motion.p>
          )}
        </div>
        {/* // Update the input field for additional emails */}
        {additionalEmails.map((email, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative">
            <label
              htmlFor={`additionalEmail${index}`}
              className="block text-sm font-medium text-slate-300 mb-2">
              Additional Email {index + 1}
            </label>
            <div className="flex items-center gap-2">
              <motion.div
                variants={inputVariants}
                whileFocus="focus"
                whileTap={{ scale: 0.98 }}
                className="flex-1">
                <input
                  type="email"
                  id={`additionalEmail${index}`}
                  value={email}
                  onChange={(e) => {
                    const newEmails = [...additionalEmails];
                    newEmails[index] = e.target.value;
                    setAdditionalEmails(newEmails);
                    // Update session storage when email value changes
                    const currentData = JSON.parse(
                      sessionStorage.getItem("personalInfoData") || "{}"
                    );
                    sessionStorage.setItem(
                      "personalInfoData",
                      JSON.stringify({
                        ...currentData,
                        additionalEmails: newEmails,
                      })
                    );
                  }}
                  className="w-full px-4 py-3 rounded-lg bg-slate-800/50 backdrop-blur-sm border border-slate-600/50 text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-transparent transition duration-200"
                  placeholder="Enter additional email"
                />
              </motion.div>
              <motion.button
                type="button"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => removeEmailField(index)}
                className="p-2 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-400">
                <Minus className="w-5 h-5" />
              </motion.button>
            </div>
          </motion.div>
        ))}
        <motion.button
          type="button"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={addEmailField}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-500/20 hover:bg-indigo-500/30 text-indigo-400">
          <Plus className="w-4 h-4" />
          Add Email
        </motion.button>
        {/* Occupation Field */}
        <div>
          <label
            htmlFor="occupation"
            className="block text-sm font-medium text-slate-300 mb-2">
            Occupation
          </label>
          <motion.div
            variants={inputVariants}
            whileFocus="focus"
            whileTap={{ scale: 0.98 }}>
            <select
              id="occupation"
              {...register("occupation")}
              className="w-full px-4 py-3 rounded-lg bg-slate-800/50 backdrop-blur-sm border border-slate-600/50 text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-transparent transition duration-200">
              <option value="">Select occupation</option>
              <option value="Student">Student</option>
              <option value="Employed">Employed</option>
              <option value="Self-employed">Self-employed</option>
              <option value="Other">Other</option>
            </select>
          </motion.div>
        </div>
        {/* Conditional Company Details */}
        {showCompanyDetails && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="space-y-4">
            <div>
              <label
                htmlFor="companyName"
                className="block text-sm font-medium text-slate-300 mb-2">
                Company Name
              </label>
              <motion.div
                variants={inputVariants}
                whileFocus="focus"
                whileTap={{ scale: 0.98 }}>
                <input
                  type="text"
                  id="companyName"
                  {...register("companyDetails.companyName")}
                  className="w-full px-4 py-3 rounded-lg bg-slate-800/50 backdrop-blur-sm border border-slate-600/50 text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-transparent transition duration-200"
                  placeholder="Enter company name"
                />
              </motion.div>
            </div>

            <div>
              <label
                htmlFor="position"
                className="block text-sm font-medium text-slate-300 mb-2">
                Position
              </label>
              <motion.div
                variants={inputVariants}
                whileFocus="focus"
                whileTap={{ scale: 0.98 }}>
                <input
                  type="text"
                  id="position"
                  {...register("companyDetails.position")}
                  className="w-full px-4 py-3 rounded-lg bg-slate-800/50 backdrop-blur-sm border border-slate-600/50 text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-transparent transition duration-200"
                  placeholder="Enter your position"
                />
              </motion.div>
            </div>
          </motion.div>
        )}
        <motion.div
          className="pt-4"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}>
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full flex justify-center items-center py-3 px-4 rounded-lg shadow-lg text-sm font-medium text-white
              ${
                isSubmitting
                  ? "bg-indigo-600/50 cursor-not-allowed"
                  : "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500"
              } focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:ring-offset-2 focus:ring-offset-slate-800 transition duration-200`}>
            {isSubmitting ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
              />
            ) : (
              <>
                <span>Continue</span>
                <CheckCircle className="w-5 h-5 ml-2" />
              </>
            )}
          </button>
        </motion.div>
      </form>

      {/* API Integration Status */}
      {isSubmitting && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed bottom-4 right-4 bg-slate-800 p-4 rounded-lg shadow-lg border border-slate-700">
          <div className="flex items-center gap-2">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="w-4 h-4 border-2 border-indigo-500 border-t-transparent rounded-full"
            />
            <span className="text-sm text-slate-300">Processing...</span>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
// API mock function (simulating backend integration)
const mockApiCall = async (data: any) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() > 0.1) {
        // 90% success rate
        resolve({ success: true, data });
      } else {
        reject(new Error("API call failed"));
      }
    }, 1000);
  });
};
// Validation helper functions
const validateEmail = (email: string) => {
  const re = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,}$/i;
  return re.test(email);
};
const validateRequired = (value: string) => {
  return value.trim().length > 0;
};
// Custom hook for form field validation
const useFieldValidation = (value: string, validations: any[]) => {
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    for (const validation of validations) {
      const result = validation(value);
      if (!result.valid) {
        setError(result.message);
        return;
      }
    }
    setError(null);
  }, [value, validations]);
  return error;
};

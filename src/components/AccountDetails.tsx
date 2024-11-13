"use client";

import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import {
  CheckCircle,
  AlertCircle,
  Eye,
  EyeOff,
  Plus,
  Minus,
} from "lucide-react";
import { AccountDetailsProps } from "@/types/accountDetails.types";
const securityQuestionOptions = [
  "What was your first pet's name?",
  "What city were you born in?",
  "What is your mother's maiden name?",
  "What was your first car?",
  "What elementary school did you attend?",
];

function AccountDetails({
  data,
  updateData,
  onNext,
  onPrevious,
}: AccountDetailsProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [accountType, setAccountType] = useState(
    data.accountType || "personal"
  );
  const [showSecurityQuestions, setShowSecurityQuestions] = useState(false);
  const [securityQuestions, setSecurityQuestions] = useState<
    { question: string; answer: string }[]
  >(data.securityQuestions || []);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: {
      ...data,
      preferences: {
        notifications: false,
        twoFactorAuth: false,
        ...data.preferences,
      },
    },
  });

  useEffect(() => {
    const savedData = sessionStorage.getItem("accountDetails");
    if (savedData) {
      const parsedData = JSON.parse(savedData) as AccountDetailsProps["data"];
      Object.entries(parsedData).forEach(([key, value]) => {
        setValue(key as keyof AccountDetailsProps["data"], value);
      });
      setAccountType(parsedData.accountType || "personal");
      setSecurityQuestions(parsedData.securityQuestions || []);
    }
  }, [setValue]);

  const addSecurityQuestion = () => {
    if (securityQuestions.length < 3) {
      const newQuestions = [...securityQuestions, { question: "", answer: "" }];
      setSecurityQuestions(newQuestions);
      // Update session storage
      const currentData = JSON.parse(
        sessionStorage.getItem("accountDetails") || "{}"
      );
      sessionStorage.setItem(
        "accountDetails",
        JSON.stringify({
          ...currentData,
          securityQuestions: newQuestions,
        })
      );
    }
  };

  const removeSecurityQuestion = (index: number) => {
    const newQuestions = securityQuestions.filter((_, i) => i !== index);
    setSecurityQuestions(newQuestions);
    // Update session storage
    const currentData = JSON.parse(
      sessionStorage.getItem("accountDetails") || "{}"
    );
    sessionStorage.setItem(
      "accountDetails",
      JSON.stringify({
        ...currentData,
        securityQuestions: newQuestions,
      })
    );
  };

  const updateSecurityQuestion = (
    index: number,
    field: string,
    value: string
  ) => {
    const newQuestions = [...securityQuestions];
    newQuestions[index] = { ...newQuestions[index], [field]: value };
    setSecurityQuestions(newQuestions);
    // Update session storage
    const currentData = JSON.parse(
      sessionStorage.getItem("accountDetails") || "{}"
    );
    sessionStorage.setItem(
      "accountDetails",
      JSON.stringify({
        ...currentData,
        securityQuestions: newQuestions,
      })
    );
  };

  const onSubmit = (formData: AccountDetailsProps["data"]) => {
    setIsSubmitting(true);
    setTimeout(() => {
      const finalData = {
        ...formData,
        accountType,
        securityQuestions,
      };
      updateData(finalData);
      sessionStorage.setItem("accountDetails", JSON.stringify(finalData));
      setIsSubmitting(false);
      onNext();
    }, 1000);
  };

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
      className="space-y-8">
      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-2xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-indigo-200 to-purple-200">
        Account Details
      </motion.h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label
            htmlFor="username"
            className="block text-sm font-medium text-slate-300 mb-2">
            Username
          </label>
          <motion.div
            variants={inputVariants}
            whileFocus="focus"
            whileTap={{ scale: 0.98 }}>
            <input
              type="text"
              id="username"
              {...register("username", {
                required: "Username is required",
                minLength: {
                  value: 3,
                  message: "Username must be at least 3 characters long",
                },
              })}
              className={`w-full px-4 py-3 rounded-lg bg-slate-800/50 backdrop-blur-sm border ${
                errors.username ? "border-red-500/50" : "border-slate-600/50"
              } text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-transparent transition duration-200`}
              placeholder="Choose a username"
            />
          </motion.div>
          {errors.username && (
            <motion.p
              variants={errorVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="text-red-400 text-sm mt-2 flex items-center">
              <AlertCircle className="w-4 h-4 mr-1" />
              {errors.username.message}
            </motion.p>
          )}
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-slate-300 mb-2">
            Password
          </label>
          <motion.div
            variants={inputVariants}
            whileFocus="focus"
            whileTap={{ scale: 0.98 }}
            className="relative">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters long",
                },
                pattern: {
                  value:
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                  message:
                    "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character",
                },
              })}
              className={`w-full px-4 py-3 rounded-lg bg-slate-800/50 backdrop-blur-sm border ${
                errors.password ? "border-red-500/50" : "border-slate-600/50"
              } text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-transparent transition duration-200`}
              placeholder="Create a strong password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-300 focus:outline-none transition duration-200">
              {showPassword ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
          </motion.div>
          {errors.password && (
            <motion.p
              variants={errorVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="text-red-400 text-sm mt-2 flex items-center">
              <AlertCircle className="w-4 h-4 mr-1" />
              {errors.password.message}
            </motion.p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Account Type
          </label>
          <div className="grid grid-cols-2 gap-4">
            {["personal", "business"].map((type) => (
              <motion.button
                key={type}
                type="button"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  setAccountType(type);
                  const currentData = JSON.parse(
                    sessionStorage.getItem("accountDetails") || "{}"
                  );
                  sessionStorage.setItem(
                    "accountDetails",
                    JSON.stringify({
                      ...currentData,
                      accountType: type,
                    })
                  );
                }}
                className={`p-3 rounded-lg border ${
                  accountType === type
                    ? "border-indigo-500 bg-indigo-500/20"
                    : "border-slate-600/50 bg-slate-800/50"
                } text-slate-200 capitalize transition duration-200`}>
                {type}
              </motion.button>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <label className="block text-sm font-medium text-slate-300">
              Security Questions
            </label>
            <motion.button
              type="button"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowSecurityQuestions(!showSecurityQuestions)}
              className="text-sm text-indigo-400 hover:text-indigo-300">
              {showSecurityQuestions ? "Hide" : "Show"}
            </motion.button>
          </div>

          {showSecurityQuestions && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="space-y-4">
              {securityQuestions.map((q, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-2">
                  <div className="flex justify-between items-center">
                    <select
                      value={q.question}
                      onChange={(e) =>
                        updateSecurityQuestion(
                          index,
                          "question",
                          e.target.value
                        )
                      }
                      className="w-full px-4 py-3 rounded-lg bg-slate-800/50 backdrop-blur-sm border border-slate-600/50 text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-transparent transition duration-200">
                      <option value="">Select a security question</option>
                      {securityQuestionOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                    <motion.button
                      type="button"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => removeSecurityQuestion(index)}
                      className="ml-2 p-2 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-400">
                      <Minus className="w-5 h-5" />
                    </motion.button>
                  </div>
                  <input
                    type="text"
                    value={q.answer}
                    onChange={(e) =>
                      updateSecurityQuestion(index, "answer", e.target.value)
                    }
                    className="w-full px-4 py-3 rounded-lg bg-slate-800/50 backdrop-blur-sm border border-slate-600/50 text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-transparent transition duration-200"
                    placeholder="Answer"
                  />
                </motion.div>
              ))}
              {securityQuestions.length < 3 && (
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={addSecurityQuestion}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-500/20 hover:bg-indigo-500/30 text-indigo-400">
                  <Plus className="w-4 h-4" />
                  Add Security Question
                </motion.button>
              )}
            </motion.div>
          )}
        </div>

        <div className="space-y-4">
          <label className="block text-sm font-medium text-slate-300">
            Account Preferences
          </label>
          <div className="space-y-2">
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                {...register("preferences.notifications")}
                className="form-checkbox h-5 w-5 text-indigo-500 rounded border-slate-600/50 bg-slate-800/50 focus:ring-indigo-500/50"
              />
              <span className="text-slate-200">Enable notifications</span>
            </label>
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                {...register("preferences.twoFactorAuth")}
                className="form-checkbox h-5 w-5 text-indigo-500 rounded border-slate-600/50 bg-slate-800/50 focus:ring-indigo-500/50"
              />
              <span className="text-slate-200">
                Enable two-factor authentication
              </span>
            </label>
          </div>
        </div>

        <div className="flex justify-between space-x-4 pt-4">
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex-1">
            <button
              type="button"
              onClick={onPrevious}
              className="w-full py-3 px-4 rounded-lg border border-slate-600/50 shadow-lg text-sm font-medium text-slate-300 bg-slate-800/50 hover:bg-slate-700/50 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:ring-offset-2 focus:ring-offset-slate-800 transition duration-200">
              Previous
            </button>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex-1">
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
        </div>
      </form>
    </motion.div>
  );
}

export default AccountDetails;

"use client";

import { motion } from "framer-motion";
import { useForm, Controller } from "react-hook-form";
import { useState, useEffect } from "react";
import {
  CheckCircle,
  AlertCircle,
  Sun,
  Moon,
  Bell,
  Globe,
  Laptop,
} from "lucide-react";

type PreferencesProps = {
  data: {
    theme: string;
    notifications: boolean;
    language?: string;
    accessibility?: boolean;
  };
  updateData: (data: PreferencesProps["data"]) => void;
  onPrevious: () => void;
  onSubmit: () => void;
};

type FormField = {
  id: string;
  type: "select" | "checkbox";
  label: string;
  icon: JSX.Element;
  options?: { value: string; label: string }[];
  visible?: boolean;
};

export default function Preferences({
  data,
  updateData,
  onPrevious,
  onSubmit,
}: PreferencesProps) {
  const { control, handleSubmit, setValue, watch } = useForm({
    defaultValues: {
      ...data,
      language: "en",
      accessibility: false,
    },
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showAccessibility, setShowAccessibility] = useState(false);

  const currentTheme = watch("theme");
  const notifications = watch("notifications");

  const formFields: FormField[] = [
    {
      id: "theme",
      type: "select",
      label: "Theme",
      icon: <Sun className="w-4 h-4 mr-2" />,
      options: [
        { value: "light", label: "Light" },
        { value: "dark", label: "Dark" },
        { value: "system", label: "System" },
      ],
    },
    {
      id: "language",
      type: "select",
      label: "Language",
      icon: <Globe className="w-4 h-4 mr-2" />,
      options: [
        { value: "en", label: "English" },
        { value: "es", label: "Spanish" },
        { value: "fr", label: "French" },
      ],
      visible: notifications, // Only show if notifications are enabled
    },
    {
      id: "notifications",
      type: "checkbox",
      label: "Enable notifications",
      icon: <Bell className="w-4 h-4 mr-2" />,
    },
    {
      id: "accessibility",
      type: "checkbox",
      label: "Accessibility features",
      icon: <Laptop className="w-4 h-4 mr-2" />,
      visible: currentTheme === "system",
    },
  ];

  useEffect(() => {
    const savedData = sessionStorage.getItem("preferencesDetails");
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      Object.keys(parsedData).forEach((key: any) => {
        setValue(key, parsedData[key]);
      });
    }
  }, [setValue]);

  const onFormSubmit = (formData: PreferencesProps["data"]) => {
    setIsSubmitting(true);

    setTimeout(() => {
      updateData(formData);
      sessionStorage.setItem("preferencesDetails", JSON.stringify(formData));
      setIsSubmitting(false);
      onSubmit();
    }, 1000);
  };

  const inputVariants = {
    focus: { scale: 1.02, transition: { duration: 0.2 } },
    blur: { scale: 1, transition: { duration: 0.2 } },
  };

  const renderField = (field: FormField) => {
    if (field.visible === false) return null;

    return (
      <div key={field.id}>
        {field.type === "select" ? (
          <>
            <label
              htmlFor={field.id}
              className="block text-sm font-medium text-slate-300 mb-2 flex items-center">
              {field.icon}
              {field.label}
            </label>
            <Controller
              name={field.id as any}
              control={control}
              render={({ field: { onChange, value } }) => (
                <motion.div
                  variants={inputVariants}
                  whileFocus="focus"
                  whileTap={{ scale: 0.98 }}>
                  <select
                    id={field.id}
                    value={value}
                    onChange={onChange}
                    className="w-full px-4 py-3 rounded-lg bg-slate-800/50 backdrop-blur-sm border border-slate-600/50 text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-transparent transition duration-200">
                    {field.options?.map((option) => (
                      <option
                        key={option.value}
                        value={option.value}
                        className="bg-slate-800">
                        {option.label}
                      </option>
                    ))}
                  </select>
                </motion.div>
              )}
            />
          </>
        ) : (
          <Controller
            name={field.id as any}
            control={control}
            render={({ field: { onChange, value } }) => (
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center p-4 rounded-lg bg-slate-800/50 backdrop-blur-sm border border-slate-600/50">
                <div className="relative">
                  <input
                    type="checkbox"
                    id={field.id}
                    checked={value}
                    onChange={onChange}
                    className="peer sr-only"
                  />
                  <div
                    onClick={() => {
                      setValue(field.id as any, !value);
                      updateData({
                        ...data,
                        [field.id]: !value,
                      });
                    }}
                    className="w-11 h-6 bg-slate-600/50 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gradient-to-r from-indigo-600 to-purple-600 cursor-pointer"></div>
                </div>
                <label
                  htmlFor={field.id}
                  className="ml-4 block text-sm text-slate-300 flex items-center cursor-pointer">
                  {field.icon}
                  {field.label}
                </label>
              </motion.div>
            )}
          />
        )}
      </div>
    );
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
        Your Preferences
      </motion.h2>

      <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
        {formFields.map(renderField)}

        <div className="flex flex-col sm:flex-row sm:gap-5 gap-4 justify-between items-center sm:items-start pt-4">
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex-1 sm:w-auto w-full">
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
            className="flex-1 sm:w-auto w-full">
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
                  <span>Complete Setup</span>
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

export type PreferencesProps = {
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
  
 export type FormValues = {
    theme: string;
    notifications: boolean;
    language: string;
    accessibility: boolean;
  };
  
 export  type FormField = {
    id: keyof FormValues;
    type: "select" | "checkbox";
    label: string;
    icon: JSX.Element;
    options?: { value: string; label: string }[];
    visible?: boolean;
  };
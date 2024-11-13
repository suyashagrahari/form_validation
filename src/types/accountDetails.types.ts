export type AccountDetailsProps = {
    data: {
      username: string;
      password: string;
      accountType?: string;
      securityQuestions?: {
        question: string;
        answer: string;
      }[];
      preferences?: {
        notifications: boolean;
        twoFactorAuth: boolean;
      };
    };
    updateData: (data: AccountDetailsProps["data"]) => void;
    onNext: () => void;
    onPrevious: () => void;
  };
  
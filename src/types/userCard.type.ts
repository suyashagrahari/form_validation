export interface UserCardProps {
  user: {
    personalInfo: {
      firstName?: string;
      lastName?: string;
      email?: string;
      occupation?: string;
      companyDetails?: {
        companyName?: string;
        position?: string;
      };
      additionalEmails?: string[];
    };
    accountDetails: {
      username?: string;
      password?: string;
      preferences?: {
        notifications?: boolean;
        twoFactorAuth?: boolean;
      };
      accountType?: string;
      securityQuestions?: {
        question: string;
        answer: string;
      }[];
    };
    preferences: {
      theme?: string;
      notifications?: boolean;
      language?: string;
      accessibility?: boolean;
    };
    _id: string;
  };
}

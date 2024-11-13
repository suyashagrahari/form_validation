export type FormData = {
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
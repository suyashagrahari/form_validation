export type PersonalInfoProps = {
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
  
 export type PersonalInfoFormData = {
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
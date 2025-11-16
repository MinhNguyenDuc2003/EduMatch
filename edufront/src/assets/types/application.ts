declare global {
  type Application = {
    id: number;
    userId: string;
    applicationName: string;
    code?: string;
    versionApplication: number;
    fullName: string;
    gender: string;
    dateOfBirth: string;
    email: string;
    phone: string;
    address: string;
    nationality: string;
    educationLevel: string;
    schoolName: string;
    major: string;
    gpa: number;
    graduationYear: string;
    skills: string;
    achievements: string;
    extracurricular: string;
    motivation: string;
    personalStatement: string;
    applicationMedias: ApplicationMedia[];
    applicationAttributes: ApplicationAttribute[];
  };

  type ApplicationMedia = {
    id: number;
    s3Key: string;
    contentType: string;
    size: number;
    folderName: string;
    fileName: string;
    isPublic: boolean;
    thumbnail: string;
    url: string;
  };

  type ApplicationAttribute = {
    id: number;
    applicationId: string;
    key: string;
    value: string;
    note: string;
  };
}

export {};

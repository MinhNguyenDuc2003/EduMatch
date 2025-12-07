export interface ICaseStudy {
  id: number;
  scholarshipId: number;
  userId: string;
  title: string;
  content: string;
  verified: boolean;
  profileVo: ProfileVo;
  medias?: Media[]; // optional
}

export interface ProfileVo {
  id: number;
  userId: string;
  contactName: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  religion: string;
  hometown: string;
  citizenshipStatus: string;
  ethnicity: string;
  race: string;
  militaryFamilyHistory: boolean;
  disabilities: string;
  medicalConditions: string;
  favoriteActivities: string;
  sportsParticipated: string;
  studentActivities: string;
  organizationsJoined: string;
  researchExperience: string;
  careerGoals: string;
  overallGpa: number;
  certificates: any[];
  educationHistories: any[];
  applicantPreferences: any[];
  skills: any[];
  intentions: any[];
}

export interface Media {
  id: number;
  s3Key: string;
  contentType: string;
  size: number;
  folderName: string;
  fileName: string;
  isPublic: boolean;
  url: string;
}

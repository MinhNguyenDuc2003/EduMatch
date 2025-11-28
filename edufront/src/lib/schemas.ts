import * as z from 'zod';

// Applicant Profile Schema
export const applicantProfileSchema = z.object({
  applicantProfile: z.object({
    id: z.number().optional(),
    userId: z.string().optional(),
    contactName: z.string().min(1, 'Contact name is required'),
    firstName: z.string().min(1, 'First name is required'),
    lastName: z.string().min(1, 'Last name is required'),
    phoneNumber: z.string().optional(),
    religion: z.string().optional(),
    hometown: z.string().optional(),
    citizenshipStatus: z.string().optional(),
    ethnicity: z.string().optional(),
    race: z.string().optional(),
    militaryFamilyHistory: z.boolean().optional(),
    disabilities: z.string().optional(),
    medicalConditions: z.string().optional(),
    favoriteActivities: z.string().optional(),
    sportsParticipated: z.string().optional(),
    studentActivities: z.string().optional(),
    organizationsJoined: z.string().optional(),
    researchExperience: z.string().optional(),
    careerGoals: z.string().optional(),
    overallGpa: z.coerce.number<number>().min(0).max(4),
    certificates: z
      .array(
        z.object({
          certificateName: z.string().min(1, 'Certificate name is required'),
          issuedBy: z.string().min(1, 'Issuing organization is required'),
          issueDate: z.union([z.string(), z.number()]),
          expiryDate: z.union([z.string(), z.number()]),
          score: z.string().optional(),
        })
      )
      .optional(),
    educationHistories: z
      .array(
        z
          .object({
            applicantId: z.number().optional(),
            institutionName: z.string().min(1, 'Institution name is required'),
            institutionType: z.string().min(1, 'Institution type is required'),
            state: z.string().min(1, 'State/Province is required'),
            country: z.string().min(1, 'Country is required'),
            degreeType: z.string().min(1, 'Degree type is required'),
            majorCategory: z.string().optional(),
            majorName: z.string().min(1, 'Major name is required'),
            gpa: z.coerce
              .number<number>()
              .min(0, 'GPA must be greater than 0')
              .max(4, 'GPA must be less than 4')
              .optional(),
            classRank: z.string().optional(),
            classSize: z.coerce
              .number<number>()
              .min(1, 'Class size must be greater than 0')
              .max(10000, 'Class size must be less than 10000')
              .optional(),
            enrollmentStartDate: z
              .union([z.string(), z.number()])
              .refine((data) => Number(data) < new Date().getTime(), {
                message: 'Start date must be in the past',
              }),
            enrollmentEndDate: z.union([z.string(), z.number()]),
            graduationYear: z.coerce.number<number>().optional(),
            isDualEnrolled: z.boolean().optional(),
            isTransfer: z.boolean().optional(),
            isReturningStudent: z.boolean().optional(),
            notes: z.string().optional(),
          })
          .refine((data) => data.enrollmentEndDate >= data.enrollmentStartDate, {
            message: 'End date must be greater than or equal to start date',
            path: ['enrollmentEndDate'],
          })
      )
      .optional(),
    applicantPreferences: z
      .array(
        z.object({
          applicantId: z.number().optional(),
          type: z.string().min(1, 'Preference type is required'),
          value: z.string().min(1, 'Preference value is required'),
          weight: z.coerce
            .number<number>()
            .min(0, 'Weight must be at least 0')
            .max(10, 'Weight cannot exceed 10'),
          note: z.string().optional(),
        })
      )
      .optional(),
    skills: z
      .array(
        z.object({
          applicantId: z.number().optional(),
          skillName: z.string().min(1, 'Skill name is required'),
          proficiencyLevel: z.string().min(1, 'Proficiency level is required'),
          yearsExperience: z.coerce
            .number<number>()
            .min(0, 'Years of experience cannot be negative')
            .max(50, 'Years of experience cannot exceed 50 years'),
        })
      )
      .optional(),
    intentions: z
      .array(
        z.object({
          applicantId: z.number().optional(),
          intendedInstitution: z.string().min(1, 'Intended institution is required'),
          intendedState: z.string().min(1, 'Intended state/province is required'),
          intendedCountry: z.string().min(1, 'Intended country is required'),
          degreeType: z.string().min(1, 'Intended degree type is required'),
          intendedMajorCategory: z.string().optional(),
          intendedMajorName: z.string().min(1, 'Intended major name is required'),
          academicClassification: z.string().optional(),
          expectedStartDate: z.union([z.string(), z.number()]),
          expectedGraduationYear: z.coerce.number<number>().min(1900).max(2100).optional(),
          isTransferStudent: z.boolean().optional(),
          isReturningStudent: z.boolean().optional(),
          notes: z.string().optional(),
        })
      )
      .optional(),
  }),
});

export type IApplicantProfile = z.infer<typeof applicantProfileSchema>;

// Provider Profile Schema
export const providerProfileSchema = z.object({
  providerProfile: z.object({
    id: z.number().optional(),
    organizationName: z.string().min(1, 'Organization name is required'),
    organizationType: z.string().min(1, 'Organization type is required'),
    website: z.string().url('Invalid website URL').optional().or(z.literal('')),
    email: z.string().email('Invalid email address'),
    phone: z.string().min(1, 'Phone number is required'),
    addressSummary: z.string().optional(),
    description: z.string().optional(),
    yearEstablished: z.coerce
      .number<number>()
      .min(1800, 'Year established must be after 1800')
      .max(new Date().getFullYear(), 'Year established cannot be in the future')
      .optional(),
    accreditation: z.string().optional(),
    specialization: z.string().optional(),
    verified: z.boolean().optional(),
    country: z.string().min(1, 'Country is required'),
    providerContactDtos: z
      .array(
        z.object({
          contactName: z.string().min(1, 'Contact name is required'),
          roleTitle: z.string().min(1, 'Role title is required'),
          email: z.string().email('Invalid email address'),
          phone: z.string().min(1, 'Phone number is required'),
          linkedinUrl: z.string().url('Invalid LinkedIn URL').optional().or(z.literal('')),
        })
      )
      .optional(),
  }),
});

export type IProviderProfile = z.infer<typeof providerProfileSchema>;

// Scholarship Schema
export const scholarshipSchema = z
  .object({
    id: z.number().optional(),
    title: z.string().min(1, 'Title is required'),
    slug: z.string().min(1, 'Slug is required'),
    shortDescription: z.string().min(1, 'Short description is required'),
    description: z.string().min(1, 'Description is required'),
    requirements: z.string().min(1, 'Requirements is required'),
    benefits: z.string().min(1, 'Benefits is required'),
    fields: z.string().min(1, 'Fields is required'),
    country: z.string().min(1, 'Country is required'),
    university: z.string().min(1, 'University is required'),
    studyLevel: z.string().min(1, 'Study level is required'),
    scholarshipType: z.string().min(1, 'Scholarship type is required'),
    fundingAmount: z.string().min(1, 'Funding amount is required'),
    startDate: z.union([z.string(), z.number()]),
    endDate: z.union([z.string(), z.number()]),
    availableSlots: z.coerce
      .number<number>()
      .min(1, 'Available slots must be greater than 0')
      .max(10000, 'Available slots must be less than 10000')
      .optional(),
    languageRequirement: z.string().min(1, 'Language requirement is required'),
    gpaRequirement: z.coerce
      .number<number>()
      .min(0, 'GPA must be greater than 0')
      .max(4, 'GPA must be less than 4')
      .optional(),
    requiredMajor: z.string().min(1, 'Required major is required'),
    restrictedNationalities: z.string().optional(),
    minAge: z.coerce
      .number<number>()
      .min(16, 'Minimum age must be greater than 16')
      .max(100, 'Minimum age must be less than 100')
      .optional(),
    maxAge: z.coerce
      .number<number>()
      .min(16, 'Maximum age must be greater than 16')
      .max(100, 'Maximum age must be less than 100')
      .optional(),
    genderRequirement: z.string().min(1, 'Gender requirement is required'),
    requiredSatScore: z.coerce
      .number<number>()
      .min(100, 'SAT score must be greater than 100')
      .max(1600, 'SAT score must be less than 1600')
      .optional(),
    requiredActScore: z.coerce
      .number<number>()
      .min(1, 'ACT score must be greater than 1')
      .max(36, 'ACT score must be less than 36')
      .optional(),
    requiredGreScore: z.coerce
      .number<number>()
      .min(100, 'GRE score must be greater than 100')
      .max(340, 'GRE score must be less than 340')
      .optional(),
    requiredToeflScore: z.coerce
      .number<number>()
      .min(0, 'TOEFL score must be greater than 0')
      .max(120, 'TOEFL score must be less than 120')
      .optional(),
    requiredIeltsScore: z.coerce
      .number<number>()
      .min(0, 'IELTS score must be greater than 0')
      .max(9, 'IELTS score must be less than 9')
      .optional(),
    requiredWorkExperienceYears: z.coerce
      .number<number>()
      .min(0, 'Work experience years must be greater than 0')
      .max(10, 'Work experience years must be less than 10')
      .optional(),
    requiredPublicationCount: z.coerce
      .number<number>()
      .min(0, 'Publication count must be greater than 0')
      .max(10, 'Publication count must be less than 10')
      .optional(),
    requiredAcademicAwards: z.string().optional(),
    requiredClassRankPercentile: z.coerce
      .number<number>()
      .min(0, 'Class rank percentile must be greater than 0')
      .max(100, 'Class rank percentile must be less than 100')
      .optional(),
    scholarshipPreferences: z
      .array(
        z.object({
          type: z.string().min(1, 'Type is required'),
          value: z.string().min(1, 'Value is required'),
          weight: z.coerce
            .number<number>()
            .min(0, 'Weight must be at least 0')
            .max(1, 'Weight cannot exceed 1'),
          note: z.string().optional(),
        })
      )
      .optional(),
  })
  .refine((data) => Number(data.maxAge) >= Number(data.minAge), {
    message: 'Maximum age must be greater than or equal to minimum age',
    path: ['maxAge'],
  })
  .refine((data) => Number(data.endDate) > Number(data.startDate), {
    message: 'end date must be greater than start date',
    path: ['endDate'],
  });

export type IScholarship = z.infer<typeof scholarshipSchema>;

export const applicationSchema = z.object({
  id: z.number().optional(),
  applicationName: z.string().min(1, 'Create a name for your application'),
  code: z.string().optional(),
  versionApplication: z.number().optional(),
  fullName: z.string().min(1, 'Full name is required'),
  gender: z.string().min(1, 'Gender is required'),
  dateOfBirth: z.string().min(1, 'Date of birth is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(1, 'Phone number is required'),
  address: z.string().min(1, 'Address is required'),
  nationality: z.string().min(1, 'Nationality is required'),
  educationLevel: z.string().min(1, 'Education level is required'),
  schoolName: z.string().min(1, 'School name is required'),
  major: z.string().min(1, 'Major is required'),
  gpa: z.coerce
    .number<number>()
    .min(0, 'GPA must be greater than 0')
    .max(4, 'GPA must be less than 4'),
  graduationYear: z.string().min(1, 'Graduation year is required'),
  skills: z.string().min(1, 'Skills is required'),
  achievements: z.string().min(1, 'Achievements is required'),
  extracurricular: z.string().min(1, 'Extracurricular is required'),
  motivation: z.string().min(1, 'Motivation is required'),
  personalStatement: z.string().min(1, 'Personal statement is required'),
  applicationAttributes: z.array(
    z
      .object({
        key: z.string().min(1, 'Name is required'),
        value: z.string().min(1, 'Value is required'),
        note: z.string().optional(),
      })
      .optional()
  ),
});

export type IApplication = z.infer<typeof applicationSchema>;

export const newsSchema = z.object({
  id: z.number().optional(),
  scholarshipId: z.number().optional(),
  title: z.string().min(1, 'Title is required'),
  content: z.string().min(1, 'Content is required'),
});

export type INews = z.infer<typeof newsSchema>;

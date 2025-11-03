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
          id: z.number().optional(),
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
            id: z.number().optional(),
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
          id: z.number().optional(),
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
          id: z.number().optional(),
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
          id: z.number().optional(),
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

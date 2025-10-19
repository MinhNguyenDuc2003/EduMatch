import * as z from 'zod';

export const schemas = {
  User: z.object({
    Fields: z.object({
      User: z.object({
        name: z
          .string()
          .min(2, 'Name must be at least 2 characters')
          .max(50, 'Name cannot exceed 50 characters')
          .regex(/^[a-zA-ZÀ-ỹ\s]+$/, 'Name can only contain letters and spaces'),
        age: z.number().min(1).max(120).int(),
        gmail: z
          .string()
          .email('Invalid email format')
          .regex(/^[a-zA-Z0-9._%+-]+@gmail\.com$/, 'Email must be Gmail (@gmail.com)'),
        description: z.string().min(10).max(500).optional(),
      }),
    }),
    Filters: z.object({}).optional(),
  }),

  Admin: z.object({
    Fields: z.object({
      Provider: z.object({
        providerName: z.string().min(3, 'Provider name must be at least 3 characters'),
        providerCode: z.string().min(2, 'Provider code must be at least 2 characters'),
      }),
    }),
    Filters: z.object({}).optional(),
  }),

  Profile: z.object({
    Fields: z.object({
      applicantProfile: z.object({
        id: z.number().optional(),
        userId: z.string().optional(),
        contactName: z.string().min(1, 'Contact name is required'),
        firstName: z.string().min(1, 'First name is required'),
        lastName: z.string().min(1, 'Last name is required'),
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
        phoneNumbers: z
          .array(
            z.object({
              id: z.number().optional(),
              applicantId: z.number().optional(),
              phoneType: z.string().min(1, 'Phone type is required'),
              countryCode: z.string().min(1, 'Country code is required'),
              phoneNumber: z
                .string()
                .min(10, 'Phone number must have at least 10 digits')
                .max(15, 'Phone number cannot exceed 15 digits')
                .regex(/^[0-9]+$/, 'Phone number can only contain numbers'),
              isInternational: z.boolean().optional(),
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
              intendedInstitution: z.string().min(1, 'Intended institution is required'),
              intendedState: z.string().min(1, 'Intended state/province is required'),
              intendedCountry: z.string().min(1, 'Intended country is required'),
              degreeType: z.string().min(1, 'Intended degree type is required'),
              intendedMajorCategory: z.string().optional(),
              intendedMajorName: z.string().min(1, 'Intended major name is required'),
              academicClassification: z.string().optional(),
              expectedStartDate: z.union([z.string(), z.number()]),
              expectedGraduationYear: z.number().min(1900).max(2100).optional(),
              isTransferStudent: z.boolean().optional(),
              isReturningStudent: z.boolean().optional(),
              notes: z.string().optional(),
            })
          )
          .optional(),
      }),
      addressPostVm: z.object({
        id: z.number().optional(),
        contactName: z.string().min(1, 'Address contact name is required'),
        phone: z
          .string()
          .min(10, 'Phone number must have at least 10 digits')
          .max(15, 'Phone number cannot exceed 15 digits')
          .regex(/^[0-9]+$/, 'Phone number can only contain numbers'),
        addressLine1: z.string().min(1, 'Address line 1 is required'),
        addressLine2: z.string().optional(),
        city: z.string().min(1, 'City is required'),
        zipCode: z.string().min(1, 'Zip code is required'),
        districtId: z.number().min(1, 'Please select a district'),
        stateOrProvinceId: z.number().min(1, 'Please select a state or province'),
        countryId: z.number().min(1, 'Please select a country'),
      }),
    }),
    Filters: z.object({}).optional(),
  }),
};

// Type definition for Profile schema
export type IUserForm = z.infer<typeof schemas.User>;
export type IProfileForm = z.infer<typeof schemas.Profile>;

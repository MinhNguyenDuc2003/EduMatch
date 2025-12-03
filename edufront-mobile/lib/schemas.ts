import * as z from "zod";

export const profileSchema = z.object({
  applicantProfile: z.object({
    id: z.number().optional(),
    userId: z.string().optional(),
    contactName: z.string().min(1, "Contact name is required"),
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
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
    overallGpa: z.coerce.number().min(0).max(4),
    certificates: z
      .array(
        z.object({
          id: z.number().optional(),
          certificateName: z.string().min(1, "Certificate name is required"),
          issuedBy: z.string().min(1, "Issuing organization is required"),
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
            institutionName: z.string().min(1, "Institution name is required"),
            institutionType: z.string().min(1, "Institution type is required"),
            state: z.string().min(1, "State/Province is required"),
            country: z.string().min(1, "Country is required"),
            degreeType: z.string().min(1, "Degree type is required"),
            majorCategory: z.string().optional(),
            majorName: z.string().min(1, "Major name is required"),
            gpa: z.coerce
              .number()
              .min(0, "GPA must be greater than 0")
              .max(4, "GPA must be less than 4")
              .optional(),
            classRank: z.string().optional(),
            classSize: z.coerce
              .number()
              .min(1, "Class size must be greater than 0")
              .max(10000, "Class size must be less than 10000")
              .optional(),
            enrollmentStartDate: z
              .union([z.string(), z.number()])
              .refine((data) => Number(data) < new Date().getTime(), {
                message: "Start date must be in the past",
              }),
            enrollmentEndDate: z.union([z.string(), z.number()]),
            graduationYear: z.coerce.number().optional(),
            isDualEnrolled: z.boolean().optional(),
            isTransfer: z.boolean().optional(),
            isReturningStudent: z.boolean().optional(),
            notes: z.string().optional(),
          })
          .refine(
            (data) => data.enrollmentEndDate >= data.enrollmentStartDate,
            {
              message: "End date must be greater than or equal to start date",
              path: ["enrollmentEndDate"],
            }
          )
      )
      .optional(),
    phoneNumbers: z
      .array(
        z.object({
          id: z.number().optional(),
          applicantId: z.number().optional(),
          phoneType: z.string().min(1, "Phone type is required"),
          countryCode: z.string().min(1, "Country code is required"),
          phoneNumber: z
            .string()
            .min(10, "Phone number must have at least 10 digits")
            .max(15, "Phone number cannot exceed 15 digits")
            .regex(/^[0-9]+$/, "Phone number can only contain numbers"),
          isInternational: z.boolean().optional(),
        })
      )
      .optional(),
    skills: z
      .array(
        z.object({
          id: z.number().optional(),
          applicantId: z.number().optional(),
          skillName: z.string().min(1, "Skill name is required"),
          proficiencyLevel: z.string().min(1, "Proficiency level is required"),
          yearsExperience: z.coerce
            .number()
            .min(0, "Years of experience cannot be negative")
            .max(50, "Years of experience cannot exceed 50 years"),
        })
      )
      .optional(),
    intentions: z
      .array(
        z.object({
          id: z.number().optional(),
          intendedInstitution: z
            .string()
            .min(1, "Intended institution is required"),
          intendedState: z
            .string()
            .min(1, "Intended state/province is required"),
          intendedCountry: z.string().min(1, "Intended country is required"),
          degreeType: z.string().min(1, "Intended degree type is required"),
          intendedMajorCategory: z.string().optional(),
          intendedMajorName: z
            .string()
            .min(1, "Intended major name is required"),
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
    contactName: z.string().min(1, "Address contact name is required"),
    phone: z
      .string()
      .min(10, "Phone number must have at least 10 digits")
      .max(15, "Phone number cannot exceed 15 digits")
      .regex(/^[0-9]+$/, "Phone number can only contain numbers"),
    addressLine1: z.string().min(1, "Address line 1 is required"),
    addressLine2: z.string().optional(),
    city: z.string().min(1, "City is required"),
    zipCode: z.string().min(1, "Zip code is required"),
    districtId: z.number().min(1, "Please select a district"),
    stateOrProvinceId: z.number().min(1, "Please select a state or province"),
    countryId: z.number().min(1, "Please select a country"),
  }),
});

export type IProfileForm = z.infer<typeof profileSchema>;

export const applicationSchema = z.object({
  id: z.number().optional(),
  applicationName: z.string().min(1, "Create a name for your application"),
  code: z.string().optional(),
  versionApplication: z.number().optional(),
  fullName: z.string().min(1, "Full name is required"),
  gender: z.string().min(1, "Gender is required"),
  dateOfBirth: z.string().min(1, "Date of birth is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(1, "Phone number is required"),
  address: z.string().min(1, "Address is required"),
  nationality: z.string().min(1, "Nationality is required"),
  educationLevel: z.string().min(1, "Education level is required"),
  schoolName: z.string().min(1, "School name is required"),
  major: z.string().min(1, "Major is required"),
  gpa: z.coerce
    .number<number>()
    .min(0, "GPA must be greater than 0")
    .max(4, "GPA must be less than 4"),
  graduationYear: z.string().min(1, "Graduation year is required"),
  skills: z.string().min(1, "Skills is required"),
  achievements: z.string().min(1, "Achievements is required"),
  extracurricular: z.string().min(1, "Extracurricular is required"),
  motivation: z.string().min(1, "Motivation is required"),
  personalStatement: z.string().min(1, "Personal statement is required"),
  languages: z.string().optional(),
  careerGoal: z.string().optional(),
  researchInterest: z.string().optional(),
  academicAwards: z.string().optional(),
  publicationCount: z.coerce.number<number>().min(0).optional(),
  satScore: z.coerce
    .number<number>()
    .min(400, "SAT score must be at least 400")
    .max(1600, "SAT score must be at most 1600")
    .optional(),
  actScore: z.coerce
    .number<number>()
    .min(1, "ACT score must be at least 1")
    .max(36, "ACT score must be at most 36")
    .optional(),
  greScore: z.coerce
    .number<number>()
    .min(260, "GRE score must be at least 260")
    .max(340, "GRE score must be at most 340")
    .optional(),
  gmatScore: z.coerce
    .number<number>()
    .min(200, "GMAT score must be at least 200")
    .max(800, "GMAT score must be at most 800")
    .optional(),
  toeflScore: z.coerce
    .number<number>()
    .min(0, "TOEFL score must be at least 0")
    .max(120, "TOEFL score must be at most 120")
    .optional(),
  ieltsScore: z.coerce
    .number<number>()
    .min(0, "IELTS score must be at least 0")
    .max(9, "IELTS score must be at most 9")
    .optional(),
  workExperienceYears: z.coerce.number<number>().min(0).optional(),
  classRank: z.coerce.number<number>().min(0).optional(),
  classSize: z.coerce.number<number>().min(1).optional(),
  classRankPercentile: z.coerce.number<number>().min(0).max(100).optional(),
  age: z.coerce.number<number>().min(0).optional(),
  citizenship: z.string().optional(),
  isAthlete: z.boolean().optional(),
  athleticAchievements: z.string().optional(),
  applicationAttributes: z.array(
    z
      .object({
        key: z.string().min(1, "Name is required"),
        value: z.string().min(1, "Value is required"),
        note: z.string().optional(),
      })
      .optional()
  ),
});

export type IApplication = z.infer<typeof applicationSchema>;

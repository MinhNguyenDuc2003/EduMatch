import { z } from 'zod';

export function createSchema<T>(shape: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [K in keyof T]: any;
}) {
  return z.object(shape);
}

export const schemas = {
  User: createSchema({
    Fields: z.object({
      User: z.object({
        name: z
          .string()
          .min(2, 'Tên phải có ít nhất 2 ký tự')
          .max(50, 'Tên không được vượt quá 50 ký tự')
          .regex(/^[a-zA-ZÀ-ỹ\s]+$/, 'Tên chỉ được chứa chữ cái và khoảng trắng'),
        age: z.number().min(1).max(120).int(),
        gmail: z
          .string()
          .email('Email không hợp lệ')
          .regex(/^[a-zA-Z0-9._%+-]+@gmail\.com$/, 'Email phải là Gmail (@gmail.com)'),
        description: z.string().min(10).max(500).optional(),
      }),
    }),
    Filters: z.object({}).optional(),
  }),

  Admin: createSchema({
    Fields: z.object({
      Provider: z.object({
        providerName: z.string().min(3, 'Tên provider tối thiểu 3 ký tự'),
        providerCode: z.string().min(2, 'Mã provider tối thiểu 2 ký tự'),
      }),
    }),
    Filters: z.object({}).optional(),
  }),

  Profile: createSchema({
    Fields: z.object({
      applicantProfile: z.object({
        contactName: z.string().min(1, 'Tên liên hệ không được để trống'),
        firstName: z.string().min(1, 'Tên không được để trống'),
        lastName: z.string().min(1, 'Họ không được để trống'),
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
        overallGpa: z.number().min(0).max(4).optional(),
        certificates: z
          .array(
            z.object({
              certificateName: z.string().min(1, 'Tên chứng chỉ không được để trống'),
              issuedBy: z.string().min(1, 'Tổ chức cấp không được để trống'),
              issueDate: z.union([z.string(), z.number()]),
              expiryDate: z.union([z.string(), z.number()]),
              score: z.string().optional(),
            })
          )
          .optional(),
        educationHistories: z
          .array(
            z.object({
              institutionName: z.string().min(1, 'Tên trường không được để trống'),
              institutionType: z.string().min(1, 'Loại trường không được để trống'),
              state: z.string().min(1, 'Tỉnh/Thành phố không được để trống'),
              country: z.string().min(1, 'Quốc gia không được để trống'),
              degreeType: z.string().min(1, 'Loại bằng cấp không được để trống'),
              majorCategory: z.string().optional(),
              majorName: z.string().min(1, 'Chuyên ngành không được để trống'),
              gpa: z.number().min(0).max(4).optional(),
              classRank: z.string().optional(),
              classSize: z.number().min(1).optional(),
              enrollmentStartDate: z.union([z.string(), z.number()]),
              enrollmentEndDate: z.union([z.string(), z.number()]),
              graduationYear: z.number().min(1900).max(2100).optional(),
              isDualEnrolled: z.boolean().optional(),
              isTransfer: z.boolean().optional(),
              isReturningStudent: z.boolean().optional(),
              notes: z.string().optional(),
            })
          )
          .optional(),
        phoneNumbers: z
          .array(
            z.object({
              phoneType: z.string().min(1, 'Loại số điện thoại không được để trống'),
              countryCode: z.string().min(1, 'Mã quốc gia không được để trống'),
              phoneNumber: z
                .string()
                .min(10, 'Số điện thoại phải có ít nhất 10 số')
                .max(15, 'Số điện thoại không được vượt quá 15 số')
                .regex(/^[0-9]+$/, 'Số điện thoại chỉ được chứa số'),
              isInternational: z.boolean().optional(),
            })
          )
          .optional(),
        skills: z
          .array(
            z.object({
              skillName: z.string().min(1, 'Tên kỹ năng không được để trống'),
              proficiencyLevel: z.string().optional(),
              yearsExperience: z.number().min(0).max(50).optional(),
            })
          )
          .optional(),
        intentions: z
          .array(
            z.object({
              intendedInstitution: z.string().min(1, 'Tên trường dự định không được để trống'),
              intendedState: z.string().min(1, 'Tỉnh/Thành phố dự định không được để trống'),
              intendedCountry: z.string().min(1, 'Quốc gia dự định không được để trống'),
              degreeType: z.string().min(1, 'Loại bằng cấp dự định không được để trống'),
              intendedMajorCategory: z.string().optional(),
              intendedMajorName: z.string().min(1, 'Chuyên ngành dự định không được để trống'),
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
        contactName: z.string().min(1, 'Tên liên hệ địa chỉ không được để trống'),
        phone: z
          .string()
          .min(10, 'Số điện thoại phải có ít nhất 10 số')
          .max(15, 'Số điện thoại không được vượt quá 15 số')
          .regex(/^[0-9]+$/, 'Số điện thoại chỉ được chứa số'),
        addressLine1: z.string().min(1, 'Địa chỉ dòng 1 không được để trống'),
        addressLine2: z.string().optional(),
        city: z.string().min(1, 'Thành phố không được để trống'),
        zipCode: z.string().min(1, 'Mã bưu điện không được để trống'),
        districtId: z.number().min(1, 'ID quận/huyện phải lớn hơn 0'),
        stateOrProvinceId: z.number().min(1, 'ID tỉnh/thành phố phải lớn hơn 0'),
        countryId: z.number().min(1, 'ID quốc gia phải lớn hơn 0'),
      }),
    }),
    Filters: z.object({}).optional(),
  }),
};

export type IProfileForm = z.infer<typeof schemas.Profile>;

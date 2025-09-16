import { z } from "zod";

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
          .min(2, "Tên phải có ít nhất 2 ký tự")
          .max(50, "Tên không được vượt quá 50 ký tự")
          .regex(/^[a-zA-ZÀ-ỹ\s]+$/, "Tên chỉ được chứa chữ cái và khoảng trắng"),
        age: z.number().min(1).max(120).int(),
        gmail: z
          .string()
          .email("Email không hợp lệ")
          .regex(/^[a-zA-Z0-9._%+-]+@gmail\.com$/, "Email phải là Gmail (@gmail.com)"),
        description: z.string().min(10).max(500).optional(),
      }),
    }),
    Filters: z.object({}).optional(),
  }),

  Admin: createSchema({
    Fields: z.object({
      Provider: z.object({
        providerName: z.string().min(3, "Tên provider tối thiểu 3 ký tự"),
        providerCode: z.string().min(2, "Mã provider tối thiểu 2 ký tự"),
      }),
    }),
    Filters: z.object({}).optional(),
  }),
};

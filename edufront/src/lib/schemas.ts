// validation/schema.ts
import { z } from 'zod';

// Schema cho User fields
export const userSchema = z.object({
  name: z
    .string()
    .min(2, 'Tên phải có ít nhất 2 ký tự')
    .max(50, 'Tên không được vượt quá 50 ký tự')
    .regex(/^[a-zA-ZÀ-ỹ\s]+$/, 'Tên chỉ được chứa chữ cái và khoảng trắng'),

  age: z
    .number()
    .min(1, 'Tuổi phải lớn hơn 0')
    .max(120, 'Tuổi không được vượt quá 120')
    .int('Tuổi phải là số nguyên'),

  gmail: z
    .string()
    .email('Email không hợp lệ')
    .regex(/^[a-zA-Z0-9._%+-]+@gmail\.com$/, 'Email phải là Gmail (@gmail.com)'),

  description: z
    .string()
    .min(10, 'Mô tả phải có ít nhất 10 ký tự')
    .max(500, 'Mô tả không được vượt quá 500 ký tự')
    .optional(),
});

// Schema chính cho toàn bộ form
export const formSchema = z.object({
  Fields: z.object({
    User: userSchema,
  }),
  Filters: z.object({}).optional(),
});

// Type inference từ Zod schema
export type IForm = z.infer<typeof formSchema>;
export type IUserForm = z.infer<typeof userSchema>;

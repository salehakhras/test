import { z } from "zod";

export const roleSchema = z.object({
  id: z.number(),
  name: z.string(),
  created_at: z.string().nullable(),
  updated_at: z.string().nullable(),
  pivot: z.object({
    user_id: z.number(),
    role_id: z.number(),
  }),
});

export const userSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string().email().nullable().optional(),
  number: z.string().nullable().optional(),
  verified_at: z.string().nullable().optional(), // or use z.coerce.date().nullable() if needed
  otp: z.string().nullable(),
  expire_at: z.string().nullable(),
  profile_image: z.string().nullable().optional(),
  fcm_token: z.string().nullable(),
  created_at: z.string().nullable(),
  updated_at: z.string().nullable(),
  roles: z.array(roleSchema).optional(),
});

export const authResponseSchema = z.object({
  message: z.string(),
  data: z.object({
    user: userSchema,
  }),
  status: z.number(),
});

export type UserModel = z.infer<typeof userSchema>;
export type AuthResponse = z.infer<typeof authResponseSchema>;

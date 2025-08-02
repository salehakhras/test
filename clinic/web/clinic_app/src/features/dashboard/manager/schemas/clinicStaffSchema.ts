import z from "zod";
import { userSchema } from "../../../auth/schemas/authSchemas";

const workingHourSchema = z.object({
  start: z.string(),
  end: z.string(),
});

export const clinicWorkingHoursSchema = z.object({
  Sunday: z.array(workingHourSchema).optional(),
  Monday: z.array(workingHourSchema).optional(),
  Tuesday: z.array(workingHourSchema).optional(),
  Wednesday: z.array(workingHourSchema).optional(),
  Thursday: z.array(workingHourSchema).optional(),
  Friday: z.array(workingHourSchema).optional(),
  Saturday: z.array(workingHourSchema).optional(),
});

export const doctorSchema = z.object({
  user_id: z.number(),
  name: z.string(),
  email: z.string().nullable(),
  profile_image: z.string().nullable(),
  specialization: z.string().nullable(),
  experience_years: z.number(),
  bio: z.string(),
  phone: z.string().nullable(),
  created_at: z.string().nullable(),
  updated_at: z.string().nullable(),
  working_hours: z.array(
    z.object({ day: z.string(), start: z.string(), end: z.string() })
  ),
});

export const getDoctorsResponseSchema = z.object({
  message: z.string(),
  data: z.object({
    clinic_name: z.string(),
    doctors: z.array(doctorSchema),
  }),
  status: z.number(),
});

export const secretarySchema = z.object({
  user_id: z.number(),
  name: z.string(),
  profile_image: z.string().nullable(),
  email: z.string().nullable(),
  position: z.string().nullable().optional(),
  phone: z.string().nullable().nullable(),
  bio: z.string(),
  created_at: z.string().nullable(),
  updated_at: z.string().nullable(),
  working_hours: z.array(
    z.object({ day: z.string(), start: z.string(), end: z.string() })
  ),
});

export const getSecretariesResponseSchema = z.object({
  message: z.string(),
  data: z.object({
    clinic_name: z.string(),
    secretaries: z.array(secretarySchema),
  }),
  status: z.number(),
});

export const addClinicStaffReponseSchema = z.object({
  message: z.string(),
  data: z.object({
    user: userSchema,
    assigned_role: z.string(),
    clinic_working_hours: clinicWorkingHoursSchema,
  }),
  status: z.number(),
});

export type getDoctorsResponse = z.infer<typeof getDoctorsResponseSchema>;
export type doctorModel = z.infer<typeof doctorSchema>;
export type secretaryModel = z.infer<typeof secretarySchema>;
export type getSecretariesResponse = z.infer<
  typeof getSecretariesResponseSchema
>;

export type addClinicStaffReponse = z.infer<typeof addClinicStaffReponseSchema>;

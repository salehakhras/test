import z from "zod";
import { doctorSchema, secretarySchema } from "./clinicStaffSchema";

export const prevWorkingHoursSchema = z.object({
  id: z.number(),
  start: z.string(),
  end: z.string(),
  day: z.string(),
});

export const conflictedSecretarySchema = z.object({
  working_hour_id: z.number(),
  secretary_id: z.number(),
  working_day: z.string(),
  created_at: z.string().nullable(),
  updated_at: z.string().nullable(),
  secretary: secretarySchema,
});

export const conflictedDoctorSchema = z.object({
  id: z.number(),
  clinic_doctor_id: z.number(),
  working_hour_id: z.number(),
  working_day: z.string(),
  created_at: z.string().nullable(),
  updated_at: z.string().nullable(),
  clinic_doctor: z.object({
    id: z.number(),
    clinic_id: z.number(),
    doctor_id: z.number(),
    created_at: z.string().nullable(),
    updated_at: z.string().nullable(),
    doctor: doctorSchema,
  }),
});

export const clinicSchema = z.object({
  id: z.number(),
  name: z.string(),
  phone: z.string(),
  bio: z.string(),
  city_name: z.string(),
  street_name: z.string(),
  user_id: z.number(),
  working_hours: z.array(prevWorkingHoursSchema).optional(),
  created_at: z.string().nullable(),
  updated_at: z.string().nullable(),
  conflicted_employees: z
    .array(conflictedDoctorSchema || conflictedSecretarySchema)
    .optional(),
});

export const clinicInfoResponseSchema = z.object({
  message: z.string(),
  data: z.object({
    clinic: clinicSchema,
  }),
  status: z.number(),
});

export const getClinicsResponseSchema = z.object({
  message: z.string(),
  data: z.object({
    clinics: z.array(clinicSchema),
  }),
  status: z.number(),
});

export type preWorkingHourModel = z.infer<typeof prevWorkingHoursSchema>;
export type Clinic = z.infer<typeof clinicSchema>;
export type ClinicInfoResponse = z.infer<typeof clinicInfoResponseSchema>;
export type getClinicsResponse = z.infer<typeof getClinicsResponseSchema>;
export type conflictedDoctorModel = z.infer<typeof conflictedDoctorSchema>;
export type conflictedSecretaryModel = z.infer<
  typeof conflictedSecretarySchema
>;

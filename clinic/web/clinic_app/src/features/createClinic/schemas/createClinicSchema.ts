import { z } from "zod";

export const createClinicResponseSchema = z.object({
  message: z.string(),

  data: z.object({
    checkout_url: z.string().nullable(),
  }),
  status: z.number(),
});

export type CreateClinicResponseSchema = z.infer<
  typeof createClinicResponseSchema
>;

import z from "zod";

export const imageSchema = z.object({
  id: z.number(),
  path: z.string(),
  clinic_id: z.number(),
  created_at: z.string().nullable(),
});

export const getClinicImagesResponseSchema = z.object({
  message: z.string(),
  data: z.object({
    images: z.array(imageSchema),
  }),

  status: z.number(),
});

export const addClinicImageResponseSchema = z.object({
  message: z.string(),
  data: z.object({
    images: z.array(imageSchema),
  }),

  status: z.number(),
});

export const deleteClinicImageResponseSchema = z.object({
  message: z.string(),
  data: z.boolean(),
  status: z.number(),
});

export type imagesModel = z.infer<typeof imageSchema>;
export type addClinicImageResponse = z.infer<
  typeof addClinicImageResponseSchema
>;
export type deleteClinicImageResponse = z.infer<
  typeof deleteClinicImageResponseSchema
>;
export type getClinicImagesResponse = z.infer<
  typeof getClinicImagesResponseSchema
>;

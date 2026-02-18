import { z } from "zod";
import mongoose from "mongoose";

export const productSchemaZod = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Product name is required"),

  category: z
    .string()
    .refine((val) => mongoose.Types.ObjectId.isValid(val), {
      message: "Invalid category ObjectId",
    }),

  productSku: z
    .string()
    .trim()
    .min(1, "Product SKU is required")
    .transform((val) => val.toUpperCase()),

  description: z
    .string()
    .trim()
    .min(1, "Description is required"),

  slug: z
    .string()
    .trim()
    .min(1, "Slug is required")
    .transform((val) => val.toLowerCase()),

  images: z
    .array(z.string().url("Invalid image URL"))
    .min(1, "At least one image is required"),

  videoUrl: z
    .string()
    .url("Invalid video URL")
    .optional(),

  metalColor: z
    .enum(["Yellow", "Rose", "White"])
    .default("Yellow"),

  metalPurity: z
    .string()
    .min(1, "Metal purity is required"),

  metalWeight: z
    .number()
    .min(0, "Metal weight must be positive"),

  diamondQuality: z
    .enum(["IJ-SI", "GH-SI", "GH-VS", "EF-VVS"])
    .optional(),

  makingCharge: z
    .number()
    .min(0, "Making charge must be positive"),

  discountPercent: z
    .number()
    .min(0)
    .max(100)
    .default(0),

  basePrice: z
    .number()
    .min(0, "Base price must be positive"),

  finalPrice: z
    .number()
    .min(0)
    .optional(),

  stock: z
    .number()
    .min(0)
    .default(1),

  ratingsAverage: z
    .number()
    .min(0)
    .max(5)
    .default(0),

  ratingsCount: z
    .number()
    .min(0)
    .default(0),

  isRecommended: z
    .boolean()
    .default(true),

  isBestSelling: z
    .boolean()
    .default(false),

  isActive: z
    .boolean()
    .default(true),
});

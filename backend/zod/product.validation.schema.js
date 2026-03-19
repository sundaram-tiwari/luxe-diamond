const { z } = require("zod");
const mongoose = require("mongoose");

const productSchemaZod = z.object({
  name: z.string().trim().min(1, "Product name is required"),

  category: z.string().refine((val) => mongoose.Types.ObjectId.isValid(val), {
    message: "Invalid category ObjectId",
  }),

  productSku: z
    .string()
    .trim()
    .min(1, "Product SKU is required")
    .transform((val) => val.toUpperCase()),

  description: z.string().trim().min(1, "Description is required"),

  slug: z
    .string()
    .trim()
    .min(1, "Slug is required")
    .transform((val) => val.toLowerCase()),

  images: z
    .array(z.string().url("Invalid image URL"))
    .min(1, "At least one image is required"),

  videoUrl: z.string().url("Invalid video URL").optional(),

  metalColor: z.enum(["Yellow", "Rose", "White"]).default("Yellow"),

  metalPurity: z.string().min(1, "Metal purity is required"),

  metalWeight: z.number().min(0, "Metal weight must be positive"),

  diamondQuality: z.enum(["IJ-SI", "GH-SI", "GH-VS", "EF-VVS"]).optional(),

  makingCharge: z.number().min(0, "Making charge must be positive"),

  discountPercent: z.number().min(0).max(100).default(0),

  basePrice: z.number().min(0, "Base price must be positive"),

  finalPrice: z.number().min(0).optional(),

  stock: z.number().min(0).default(1),

  ratingsAverage: z.number().min(0).max(5).default(0),

  ratingsCount: z.number().min(0).default(0),

  isRecommended: z.boolean().default(true),

  isBestSelling: z.boolean().default(false),

  isActive: z.boolean().default(true),
});

const calculatePriceSchema = z.object({
  items: z.array(
    z.object({
      productSku: z.string().min(1),
      metal: z.enum(["14", "18", "22"]),
      diamondQuality: z.enum(["IJ_SI", "GH_SI", "GH_VS", "EF_VVS"]),
      quantity: z.number().min(1),
      size: z.number().optional(),
    }),
  ),
});

const deleteProductSchema = z.object({
  productSku: z
    .string()
    .trim()
    .min(1, "Product SKU is required")
    .transform((val) => val.toUpperCase()),
});

const addProductSchema = z.object({
  name: z.string().trim().min(1, "Product name is required"),

  category: z.string().refine((val) => mongoose.Types.ObjectId.isValid(val), {
    message: "Invalid category ObjectId",
  }),

  productSku: z
    .string()
    .trim()
    .min(1, "Product SKU is required")
    .transform((val) => val.toUpperCase()),

  slug: z
    .string()
    .trim()
    .min(1, "Slug is required")
    .transform((val) => val.toLowerCase()),

  description: z.string().trim().min(1, "Description is required"),

  material: z.enum(["Gold", "Silver", "Platinum"]).default("Gold"),

  goldWeight14k: z
    .union([z.number(), z.string()])
    .transform((val) => (val === "" ? 0 : Number(val)))
    .refine((val) => !isNaN(val) && val >= 0, "Gold 14K weight must be positive"),
  
  goldWeight18k: z
    .union([z.number(), z.string()])
    .transform((val) => (val === "" ? 0 : Number(val)))
    .refine((val) => !isNaN(val) && val >= 0, "Gold 18K weight must be positive")
    .optional(),
  
  goldWeight22k: z
    .union([z.number(), z.string()])
    .transform((val) => (val === "" ? 0 : Number(val)))
    .refine((val) => !isNaN(val) && val >= 0, "Gold 22K weight must be positive")
    .optional(),

  diamond: z
    .union([z.string(), z.object({})])
    .transform((val) => {
      if (typeof val === "string") {
        try {
          return JSON.parse(val);
        } catch {
          return {};
        }
      }
      return val;
    })
    .refine((val) => typeof val === "object", "Diamond must be an object")
    .transform((val) => ({
      carat: val.carat ? Number(val.carat) : undefined,
      price_IJ_SI: val.price_IJ_SI ? Number(val.price_IJ_SI) : undefined,
      price_GH_SI: val.price_GH_SI ? Number(val.price_GH_SI) : undefined,
      price_GH_VS: val.price_GH_VS ? Number(val.price_GH_VS) : undefined,
      price_EF_VVS: val.price_EF_VVS ? Number(val.price_EF_VVS) : undefined,
    })),

  stone: z
    .union([z.string(), z.object({})])
    .transform((val) => {
      if (typeof val === "string") {
        try {
          return JSON.parse(val);
        } catch {
          return {};
        }
      }
      return val;
    })
    .refine((val) => typeof val === "object", "Stone must be an object")
    .transform((val) => ({
      price: val.price ? Number(val.price) : undefined,
    })),

  makingCharges: z
    .union([z.number(), z.string()])
    .transform((val) => (val === "" ? 0 : Number(val)))
    .refine((val) => !isNaN(val) && val >= 0, "Making charges must be positive")
    .optional(),
  
  discount: z
    .union([z.number(), z.string()])
    .transform((val) => (val === "" ? 0 : Number(val)))
    .refine((val) => !isNaN(val) && val >= 0 && val <= 100, "Discount must be between 0-100")
    .default(0),

  productBasePrice: z
    .union([z.number(), z.string()])
    .transform((val) => (val === "" ? 0 : Number(val)))
    .refine((val) => !isNaN(val) && val >= 0, "Base price must be positive")
    .optional(),
  
  productBuyPrice: z
    .union([z.number(), z.string()])
    .transform((val) => (val === "" ? 0 : Number(val)))
    .refine((val) => !isNaN(val) && val >= 0, "Buy price must be positive")
    .optional(),

  images: z
    .array(z.string())
    .min(1, "At least one image is required"),
  
  videoUrl: z.string().url("Invalid video URL").optional(),

  isRecommended: z
    .union([z.boolean(), z.string()])
    .transform((val) => val === true || val === "true")
    .default(true),
  
  isMostSelling: z
    .union([z.boolean(), z.string()])
    .transform((val) => val === true || val === "true")
    .default(false),
  
  status: z
    .union([z.boolean(), z.string()])
    .transform((val) => val === true || val === "true")
    .default(true),
});

module.exports = {
  productSchemaZod,
  calculatePriceSchema,
  deleteProductSchema,
  addProductSchema
};

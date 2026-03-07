const { z } = require("zod");

const createUserOrderSchema = z.object({
  items: z
    .array(
      z.object({
        productSku: z
          .string()
          .min(1, "Product SKU is required"),

        metal: z
          .enum(["14", "18", "22"], {
            errorMap: () => ({ message: "Metal must be 14, 18 or 22" })
          }),

        diamondQuality: z
          .enum(["IJ_SI", "GH_SI", "GH_VS", "EF_VVS"], {
            errorMap: () => ({ message: "Invalid diamond quality" })
          })
          .optional(),

        size: z
          .number({
            required_error: "Size is required"
          })
          .min(1),

        quantity: z
          .number({
            required_error: "Quantity is required"
          })
          .min(1, "Quantity must be at least 1")
      })
    )
    .min(1, "Order must contain at least one item"),

  address: z.object({
    receiverName: z
      .string()
      .min(1, "Receiver name is required"),

    phone: z
      .string()
      .regex(/^[0-9]{10}$/, "Phone number must be 10 digits"),

    addressLine1: z
      .string()
      .min(1, "Address is required"),

    city: z
      .string()
      .min(1, "City is required"),

    state: z
      .string()
      .min(1, "State is required"),

    pincode: z
      .string()
      .regex(/^[0-9]{6}$/, "Invalid pincode"),

    country: z
      .string()
      .default("India")
      .optional()
  })
});

module.exports = {
  createUserOrderSchema
};
const { z } = require("zod");

const updateUserSchema = z.object({
  firstName: z.string().min(2, "Name must be atleast three characters").max(30),

  lastName: z.string().min(2, "Name must be atleast three characters").max(30),

  email: z.string().email("Invalid email address"),

  phone: z.string().min(10, "Phone should be atleast 10 digit").optional(),

  password: z
    .string()
    .min(6, "Password must be atleast 6 characters")
    .optional(),

  newPassword: z
    .string()
    .min(6, "Password must be atleast 6 characters")
    .optional(),
});

const updateUserAddressSchema = z.object({
  receiverName: z.string().min(1, "Receiver name is required"),

  phone: z.string().regex(/^[0-9]{10}$/, "Phone number must be 10 digits"),

  addressLine1: z.string().min(1, "Address is required"),

  city: z.string().min(1, "City is required"),

  state: z.string().min(1, "State is required"),

  pincode: z.string().regex(/^[0-9]{6}$/, "Invalid pincode"),

  country: z.string().default("India").optional(),
});

module.exports = { updateUserSchema, updateUserAddressSchema };

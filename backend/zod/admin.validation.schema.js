const {z} = require("zod");

const adminLoginSchema = z.object({
    email: z
       .email("Invalid email address"),
    password: z
        .string()
        .min(6, "Password must be atleast 6 characters")
});

const addSettingsSchema = z.object({
    name: z 
        .string(),
    value: z
        .number()
})

module.exports = {adminLoginSchema, addSettingsSchema}
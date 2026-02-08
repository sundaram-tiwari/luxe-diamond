const { z, email } = require('zod');

const signupSchema = z.object({
    firstName: z
        .string()
        .min(2, "Name must be atleast three characters")
        .max(30),

    lastName: z
        .string()
        .min(2, "Name must be atleast three characters")
        .max(30),

    email: z
        .email("Invalid email address"),

    phone: z
        .string()
        .min(10, "Phone must be atleast 10 digits")
        .max(15)
        .optional(),

    password: z
        .string()
        .min(6, "Password must be atleast 6 characters"),

    confirmPassword: z
        .string()
        .min(6, "Password must be atleast 6 characters")
})
    .refine((data) => data.password === data.confirmPassword, {
        message: "Password do not match",
        path: ["confirmPassword"]
    });


const signinSchema = z.object({
    email: z
        .email("Invalid email address"),
    password: z
        .string()
        .min(6, "Password must be atleast 6 characters")
});

const forgetPasswordSchema = z.object({
    email: z
        .email("Invalid email address"),
});

const resetPasswordSchema = z.object({
    password: z
        .string()
        .min(6, "Password must be atleast 6 characters"),
    
    confirmPassword: z
        .string()
        .min(6,"Password must be atleast 6 characters")
})
    .refine((data) => data.password === data.confirmPassword, {
        message: "Password do not match",
        path: ["confirmPassword"]
    });

module.exports = {
    signupSchema,
    signinSchema,
    forgetPasswordSchema,
    resetPasswordSchema
};
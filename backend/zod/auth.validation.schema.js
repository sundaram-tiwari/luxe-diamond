const { z } = require('zod');

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
        .string()
        .email("Invalid email address"),
    password: z
        .string()
        .min(6, "Password must be atleast 6 characters")
});

const resendVerificationEmailSchema = z.object({
    email: z
        .string()
        .email("Invalid email address"),
});

const checkEmailVerificationStatusSchema = z.object({
    email: z
        .string()
        .email("Invalid email address"),
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
    resendVerificationEmailSchema,
    checkEmailVerificationStatusSchema,
    forgetPasswordSchema,
    resetPasswordSchema
};
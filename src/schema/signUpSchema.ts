import { z } from 'zod'

export const userNameValidation = z
.string()
.min(6, {message: 'username must be 6 characters long'})
.max(20, {message: 'username should not exceed 20 characters'})

export const signUpSchema = z.object({
    userName: userNameValidation,
    email: z.string().email({message: 'Invalid email'}),
    password: z.string()
    .min(6, {message: 'Password must be atleast 6 characters long'})
})
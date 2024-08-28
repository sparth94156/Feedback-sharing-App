import { z } from 'zod'

export const signInSchema = z.object({
    identifier: z.string(), // production standard term for email
    password: z.string()
})
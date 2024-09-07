import { z } from 'zod'

export const messageSchema = z.object({
    content: z.string()
    .min(10, {message: 'Message must be 10 characters long'})
    .max(300, {message: 'Message should not exceeds 300 characters'})
})
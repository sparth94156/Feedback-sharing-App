import { z } from 'zod'

export const acceptMessageSchema = z.object({
    isAcceptMessage: z.boolean()
})
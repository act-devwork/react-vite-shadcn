import { z } from 'zod'

export const generationSchema = z.object({
  projectName: z.string().trim().min(2, 'Enter a project name').max(80),
  prompt: z.string().trim().min(20, 'Describe your video in at least 20 characters').max(2000),
  model: z.string().min(1),
  style: z.string().min(1),
  aspectRatio: z.enum(['16:9', '9:16', '1:1']),
  duration: z.union([z.literal(5), z.literal(8), z.literal(10)]),
  resolution: z.enum(['720p', '1080p']),
})

export type GenerationFormValues = z.infer<typeof generationSchema>

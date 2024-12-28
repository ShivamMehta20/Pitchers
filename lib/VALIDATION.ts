import z from"zod"

export const formSchema = z.object({
    title: z.string().min(2).max(100),
    description: z.string().min(20).max(500),
    category: z.string().min(2).max(20),
    link: z.string().min(10),
    pitch:z.string().min(10)
})
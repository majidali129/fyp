import { ZodError } from "zod"

export const formatErrors = (error: ZodError) => {
    return Object.values(error.flatten().fieldErrors).flat()
}
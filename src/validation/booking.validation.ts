import z from "zod";

export const bookingPaySchema = z.object({
bookingId: z
    .string()
    .trim()
});
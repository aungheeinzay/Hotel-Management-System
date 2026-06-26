import * as z from "zod";

export const bookingSchema = z.object({
    email:z.string().email("please enter a valid email address"),
    name:z.string().nonempty("name is required"),
    additionalNote:z.string().optional(),
    dateRange:z.object({
        from:z.date(),
        to:z.date()
    }).refine((val)=>!!val.from && !!val.to,{
        message:"please select a booking data",
        path:["form"]
    })
})

export type bookingForm =z.infer<typeof bookingSchema>
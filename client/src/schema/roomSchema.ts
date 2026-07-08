import * as z from "zod";

export const createRoomInputSchema = z.object({
    roomNumber:z.string().nonempty({message:"room number is required"}),
    type:z.string().nonempty({message:"room type is required"}),
    location:z.string().nonempty({message:"location is required"}),
    title:z.string().nonempty({message:"title is required"}),
    description:z.string().nonempty({message:"description is required"}),
    pricePerNight:z.number().min(3,{message:"pricePerNight is required"}),
    capacity:z.number().min(1,{message:"capacity is required"}),
    isAvailable:z.boolean(),
    images:z.string().array()
})
export type CreateRoomSchemaForm =z.infer<typeof createRoomInputSchema>
//
// export type RoomInputType={
//     roomNumber:string
//     type:string
//     location:string
//     title:string
//     description:string
//     pricePerNight:number
//     capacity:number
//     isAvailable:boolean
//
//     images:string[]
//     reviews?:string[]
// }
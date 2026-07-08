import type {RoomFilters, RoomInputType, RoomType, ServerResponseRoom} from "../lib/type";
import {Room} from "../model/room";
import errorHandler from "../lib/errorHandler";
import {NotFoundError} from "../lib/notFound";
import ApiFilters from "../lib/apiFilters";
import {deleteImage, uploadMultipleImages} from "../lib/cloudinary";


export const getAllRooms=errorHandler(async (query:string,filters:RoomFilters,page:string | number , perPage:string | number)=>{
   const apiFilter = new ApiFilters(Room).search(query).filter(filters)

    const totalRooms = await apiFilter.count();
   const rooms = await apiFilter.pagination(page,perPage).model
    if (rooms.length==0){
        throw new NotFoundError("Rooms are empty")
    }

    return {rooms,totalRooms}
})

export const createNewRoom =errorHandler( async (inputRoom:RoomInputType)=>{
    let images :{url:string,public_id:string}[]=[];

    try {
         images =await uploadMultipleImages(inputRoom.images,"GolenCompass/room")
        const newRoom =await Room.create({
            ...inputRoom,
            images
        })
        if (!newRoom){
            throw new Error("fail to create room")
        }
        return {message:"added new room successfully"}
    }catch (error:any){
    if (images.length>1){
        const deletingBack = images.map(async ({public_id})=>{
            await deleteImage(public_id)
        })
        await Promise.all(deletingBack)
        throw new Error(error)
    }
    }
})

export const getRoomById =errorHandler(async (id:string)=>{
    const room =await Room.findById(id)
        .populate({
            path:"reviews",
            populate:{
                path:"user",
                model:"User"
            }
        })
    if (!room){
        throw new NotFoundError("Room not found")
    }
    return room})


export const updateRoom =errorHandler( async (roomId:string,inputRoom:Partial<RoomInputType>,removeImage:string[])=>{
    const room  = await Room.findById(roomId)
    if (!room)throw new NotFoundError("Room not found")
    let currentImages = room.images.toObject() as Array<{url:string,public_id:string}>
    if (removeImage.length>0) {
        const deleteCloudImg = removeImage.map(async (publicId) => await deleteImage(publicId))
        await Promise.all(deleteCloudImg)
         currentImages = currentImages.filter((img) => !removeImage.includes(img.public_id as string))
    }
    if (inputRoom?.images && inputRoom.images.length>0){
        const returnImg = await uploadMultipleImages(inputRoom.images,"GolenCompass/room")
        currentImages.push(...returnImg)
    }
    const {images,...updateData} = inputRoom
    await room.set({
        ...updateData,
        images:currentImages
    }).save()
    return {message:"updated room successfully"}
})



export const deleteRoom =errorHandler( async (id:string)=>{
    const deletedRoom = await Room.findByIdAndDelete(id)
    if (!deletedRoom)throw new NotFoundError("Room not found")
    return `${deletedRoom.roomNumber} is deleted`;
})

export const filterMetaInfo = errorHandler(async ()=>{
   const [Location,Type,Capacity] = await Promise.all([
       Room.distinct("location"),
       Room.distinct("type"),
       Room.distinct("capacity")
   ])

    return {
       Location,
        Type,
        Capacity,

    }

})


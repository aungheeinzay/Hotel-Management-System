import type {RoomFilters, RoomType, ServerResponseRoom} from "../lib/type";
import {Room} from "../model/room";
import errorHandler from "../lib/errorHandler";
import {NotFoundError} from "../lib/notFound";
import ApiFilters from "../lib/apiFilters";


export const getAllRooms=errorHandler(async (query:string,filters:RoomFilters,page:string | number , perPage:string | number)=>{
   const apiFilter = new ApiFilters(Room).search(query).filter(filters)


    const totalRooms = await apiFilter.count();
   const rooms = await apiFilter.pagination(page,perPage).model
    if (rooms.length==0){
        throw new NotFoundError("Rooms are empty")
    }

    return {rooms,totalRooms}
})

export const createNewRoom =errorHandler( async (inputRoom:RoomType)=>{
    const newRoom =await Room.create(inputRoom)
    if (!newRoom){
        throw new Error("fail to create room")
    }
    return newRoom;
})

export const getRoomById =errorHandler(async (id:string)=>{
    const room =await Room.findById(id)
    if (!room){
        throw new NotFoundError("Room not found")
    }
    return room})


export const updateRoom =errorHandler( async (id:string,inputRoom:RoomType)=>{
    const room  = await Room.findById(id)
    if (!room)throw new NotFoundError("Room not found")
    await room.set(inputRoom).save()
    return `${room.roomNumber} is updated`
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
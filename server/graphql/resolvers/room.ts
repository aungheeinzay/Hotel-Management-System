import {createNewRoom, deleteRoom, filterMetaInfo, getAllRooms, getRoomById, updateRoom} from "../../controller/room";
import type {RoomFilters, RoomInputType, RoomType} from "../../lib/type";

export const roomResolver ={
    Query:{
        getAllRooms:async(_:any,{query,filters,page,perPage}:{query:string,filters:RoomFilters,page:string | number ,perPage:string | number})=>await getAllRooms(query,filters,page,perPage),
        getRoomById:async(_:any,{roomId}: {roomId: string})=>await getRoomById(roomId),
        filterMetaInfo:async()=>await filterMetaInfo()

    },
    Mutation:{
        createNewRoom:async(_:any, {roomInput}:{roomInput: RoomInputType})=>await createNewRoom(roomInput),
        updateRoom:async(_:any,{roomId,roomInput,removeImage}:{roomId:string,roomInput:Partial<RoomInputType>,removeImage:string[]})=>await updateRoom(roomId,roomInput,removeImage),
        deleteRoom:async(_:any,{roomId}:{roomId:string})=>await deleteRoom(roomId)
    }
}


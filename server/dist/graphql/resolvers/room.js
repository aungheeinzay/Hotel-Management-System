import { createNewRoom, deleteRoom, filterMetaInfo, getAllRooms, getRoomById, updateRoom } from "../../controller/room.js";
export const roomResolver = {
    Query: {
        getAllRooms: async (_, { query, filters, page, perPage }) => await getAllRooms(query, filters, page, perPage),
        getRoomById: async (_, { roomId }) => await getRoomById(roomId),
        filterMetaInfo: async () => await filterMetaInfo()
    },
    Mutation: {
        createNewRoom: async (_, { roomInput }) => await createNewRoom(roomInput),
        updateRoom: async (_, { roomId, roomInput, removeImage }) => await updateRoom(roomId, roomInput, removeImage),
        deleteRoom: async (_, { roomId }) => await deleteRoom(roomId)
    },
    Room: {
        ratings: (parent) => parent.ratings
    }
};

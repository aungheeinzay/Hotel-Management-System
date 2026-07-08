import {gql} from "@apollo/client";

export const CREATE_NEW_ROOM = gql(`
    mutation Mutation($roomInput: roomInput) {
        createNewRoom(roomInput: $roomInput) {
            message
        }
    }`)

export const UPDATE_ROOM = gql(`
    mutation Mutation($roomId: String!, $roomInput: UpdateRoomInput, $removeImage: [String]) {
        updateRoom(roomId: $roomId, roomInput: $roomInput, removeImage: $removeImage) {
            message
        }
    }`);
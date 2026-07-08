import {gql} from "@apollo/client"

export const GET_ALL_ROOMS = gql`
  query GetAllRooms($page: String!, $perPage: String!, $filters: RoomFilters, $query: String) {
    getAllRooms(page: $page, perPage: $perPage, filters: $filters, query: $query) {
      rooms {
        id
        title
        images {
          url
        }
        location
        pricePerNight
      }
      totalRooms
    }
  }

`

export const Get_Room_By_Id = gql(`
  query GetRoomById($roomId: String!, $getBookedDaysRoomId2: String!) {
    getRoomById(roomId: $roomId) {
      id
      roomNumber
      type
      pricePerNight
      location
      capacity
      title
      description
      isAvailable
      images {
        url
      }
      reviews{
        id
        user {
          id
          username
        }
        rating
        comment
        createdAt
        updatedAt
      }
    }
    getBookedDays(roomId: $getBookedDaysRoomId2)
  }

`)

export const GET_META_INFO=gql(`
  query FilterMetaInfo {
    filterMetaInfo {
      Capacity
      Location
      Type
    }
  }`)

export const GET_ROOMS_FOR_ADMIN = gql(`
    query GetAllRooms($page: String!, $perPage: String!) {
        getAllRooms(page: $page, perPage: $perPage) {
            rooms {
                id
                type
                location
                pricePerNight
                title
                isAvailable
            }
            totalRooms
        }
    }`)

export const EDIT_ROOM_BY_ID = gql(`
    query Query($roomId: String!) {
        getRoomById(roomId: $roomId) {
            id
            roomNumber
            type
            pricePerNight
            location
            capacity
            title
            description
            isAvailable
            images {
                url
                public_id
            }
        }
    }
`)
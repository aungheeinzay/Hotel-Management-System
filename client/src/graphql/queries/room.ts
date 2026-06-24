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
query GetSingleRoom($roomId: String!) {
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
    reviews
  }
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
import gql from "graphql-tag";

export const roomTypeDefs = gql`

type RoomImages{
url:String!
public_id:String!
}
input RoomImageInput{
url:String!
public_id:String!
}
type Room{
id:ID!
roomNumber:String
type:String!
pricePerNight:Float!
location:String!
capacity:Int!
title:String
description:String
isAvailable:Boolean!
images:[RoomImages]
reviews:[Reviews]
createdAt:String!
updatedAt:String!
}
input roomInput{
roomNumber:String!
type:String!
pricePerNight:Float!
title:String
description:String
location:String!
capacity:Int!
isAvailable:Boolean!
images:[String]
reviews:[String]
}
input UpdateRoomInput{
    roomNumber:String
    type:String
    pricePerNight:Float
    title:String
    description:String
    location:String
    capacity:Int
    isAvailable:Boolean
    images:[String]
}
input PriceFilter{
    gt:Int
    gte:Int
    lt:Int
    lte:Int
}
input RoomFilters{
    type:String
    pricePerNight:PriceFilter
    capacity:Int
    isAvailable:Boolean
    location:String
}
type ReturnGetAllRooms{
rooms:[Room]
totalRooms:Int    
}
type metaInfo{
    Location:[String]
    Type:[String]
    Capacity:[Int]
}
type CreateUpdateRoomResult{
    message:String!
}
type Query {
getAllRooms(query:String,filters:RoomFilters,page:String!,perPage:String!):ReturnGetAllRooms
getRoomById(roomId:String!):Room
    filterMetaInfo:metaInfo    
}

type Mutation {
createNewRoom(roomInput:roomInput):CreateUpdateRoomResult!
updateRoom(roomId:String!,roomInput:UpdateRoomInput,removeImage:[String]):CreateUpdateRoomResult!
deleteRoom(roomId:String):String
}

`;


interface BaseModel{
    id:string
}
interface Image{
    url:string
    public_id:string
}
export interface Room extends BaseModel{
    roomNumber:string
    type:string
    pricePerNight:number
    capacity:number
    location:string
    isAvailable:boolean
    title:string
    description:string
    images:Image[]
    reviews:string[]
    createdAt?:string
    updatedAt?:string

}
export interface HomeRoom{
    rooms:(Pick<Room,"id" | "images" | "location" | "pricePerNight" | "title">)[]
}

export interface RoomCard{
    room:Pick<Room,"id" | "images" | "location" | "pricePerNight" | "title">
}

export interface User extends BaseModel{
    username:string
    email:string
    password:string
    role?:string[]
    avatar:{
        url:string
        public_id:string
    }
    resetPasswordToken:String | undefined
    restPasswordExpire:Date | undefined
    createdAt?:string
    updatedAt?:string
}

export interface FilterCardProps{
    Location:string[]
    Type:string[]
    Capacity:number[]
    loading:boolean
}

export interface Booking {
    id:string,
    user: string,
    room: string,
    startDate:Date
    endDate:Date
    customer:{
        name:string
        email:string
    }
    amount:{
        rent:number
        discount:number
        tax:number
        total:number
    }
    dayOfRent:number
    rentPerDay:number,
    // paymentInfo:{
    //     id:string
    //     status:string
    //     method:string
    // }
    additionalNote?:string
    createdAt:string,
    updatedAt:string
}
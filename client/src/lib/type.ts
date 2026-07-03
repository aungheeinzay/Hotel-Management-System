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
    paymentInfo?:{
        id:string
        status:string
        method:string
    }
    additionalNote?:string
    createdAt:string,
    updatedAt:string
}

export interface MyBookingType{

        bookings:{
            id:string
            room:{
                id:string
                title:string
            }
            endDate:string
            startDate:string
            paymentInfo:{
                method:"card" | "cash" | null
                status:"pending" | "paid"
            }
            amount:{
                total:number
            }
        }[]
        meta:{
            unPaidBooking:number
            needToPay:number
            totalBooking:number
        }
}

export interface InvoiceType {
    number: string
    sender: {
        name: string
    }
    client: {
        name: string
        email: string
    }
    booking: {
        checkIn: string
        checkOut: string
        nights: number
        roomType: string
    }
    financials: {
        ratePerNight: number
        subtotal: number
        taxRate: number
        taxAmount: number
        total: number
        currency: string
    },
    notes:string
}

export interface BookingInvoice{
    room: {
    title: string
        id: string
        pricePerNight: number
}
    id:string
    amount: {
    total: number,
       tax:number
        rent:number
        discount:number
}
    rentPerDay:number
    paymentInfo: {
    status:string,
        method:string
        id:string
},
    customer: {
    email:string
       name: string
},
    endDate:string
    startDate:string
    dayOfRent:number
}
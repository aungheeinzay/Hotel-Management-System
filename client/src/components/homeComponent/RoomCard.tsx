import type {RoomCard} from "@/lib/type.ts";
import {Card} from "@/components/ui/card.tsx";
import {RiExchangeDollarLine, RiMapPinLine} from "@remixicon/react";
import {Link} from "react-router";
import Rating from "@/components/common/Rating.tsx";

export default function RoomCard({room}:RoomCard){
    console.log("room",room.ratings.value)
    return (
    <Link to={"/"+room.id}>
        <Card className={"max-w-60 pt-0 group"}>
            <div className={"h-32 overflow-hidden w-full top-0 relative"}>
                <img
                    src={room.images[0].url}
                    className={"w-full h-full object-cover group-hover:scale-105 duration-200 transition-transform"}/>
                <div className={"absolute -bottom-1/2 group-hover:bottom-0 transition-all duration-200 ease-in-out backdrop-blur-md flex flex-col align-middle py-1 ps-1 w-full"}>
                   <div className={"flex gap-2"}>
                       <Rating
                       initialRate={room.ratings.value}
                       selectAble={false}
                       size={13}/>
                       <span>({room.ratings.count})</span>
                   </div>
                    <p>{room.title}</p>
                </div>
            </div>
            <div className={"grid gap-2"}>
                <p className={"flexing"}><RiMapPinLine size={20}/><span>{room.location}</span></p>
                <p className={"flexing"}><span className={"text-yellow-300 flexing"}><RiExchangeDollarLine size={20}/>{room.pricePerNight}</span> for price per night</p>

            </div>
        </Card>
    </Link>
    )
}
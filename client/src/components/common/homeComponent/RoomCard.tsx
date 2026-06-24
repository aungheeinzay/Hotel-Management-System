import type {RoomCard} from "@/lib/type.ts";
import {Card} from "@/components/ui/card.tsx";
import {RiExchangeDollarLine, RiMapPinLine} from "@remixicon/react";
import {Link} from "react-router";

export default function RoomCard({room}:RoomCard){
    return (
    <Link to={"/"+room.id}>
        <Card className={"max-w-60 pt-0"}>
            <div className={"h-32 overflow-hidden w-full top-0"}>
                <img
                    src={room.images[0].url}
                    className={"w-full h-full object-cover"}/>
            </div>
            <div className={"grid gap-2"}>
                <p className={"flexing"}><RiMapPinLine size={20}/><span>{room.location}</span></p>

                <p className={"flexing"}><span className={"text-yellow-300 flexing"}><RiExchangeDollarLine size={20}/>{room.pricePerNight}</span> for price per night</p>
                <p>{room.title}</p>
            </div>
        </Card>
    </Link>
    )
}
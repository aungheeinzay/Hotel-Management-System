import type {HomeRoom} from "@/lib/type.ts";
import RoomCard from "@/components/common/homeComponent/RoomCard.tsx";


export default function RoomList({rooms}:HomeRoom){
    console.log("rooms",rooms)
    return (
       <section className={"grid lg:grid-cols-4 gap-4 md:grid-cols-3 sm:grid-cols-1"}>
           {
               rooms?.map((room)=><RoomCard room={room} key={room.id}/>)

           }
       </section>
    )
}
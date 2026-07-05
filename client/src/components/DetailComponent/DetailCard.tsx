import type {DetailRoom} from "@/lib/type.ts";
import {
    RiCheckboxCircleLine,
    RiCloseCircleLine,
    RiExchangeDollarLine,
    RiHome9Line,
    RiMapPinLine, RiPulseLine, RiRestaurantLine,
    RiWifiLine, RiWindyLine
} from "@remixicon/react";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel.tsx"
import {Card, CardContent, CardHeader} from "@/components/ui/card.tsx";
import BookingForm from "@/components/DetailComponent/BookingForm.tsx";
import {Badge} from "@/components/ui/badge.tsx";

import AddRate from "@/components/DetailComponent/AddRate.tsx";

export default function DetailCard({room,bookedDays}:{room:DetailRoom,bookedDays:string[]}) {
    const items = [
        {
            icon:<RiWifiLine size={16} />,
            label:"Wifi",
           // value:room.capacity
        },
        {
            icon:<RiWindyLine size={16} />,
            label:"A/C",
           // value:room.type
        },
        {
            icon:<RiRestaurantLine size={16} />,
            label:"Breakfast",
           // value:room.location
        },
        {
            icon:<RiPulseLine size={16} />,
            label:"Pool"
        }
    ]
    return (
        <section className={"layout h-screen grid grid-cols-5 gap-4"}>
            <Card className={"col-span-3 p-4 flex flex-cols gap-10 h-screen overflow-y-scroll"}>
                <Carousel className="">
                    <CarouselContent>
                        {
                            room.images.map(({url,public_id})=>(
                                <CarouselItem key={public_id}>
                                    <img src={url} alt={public_id} className={"rounded-lg"}/>
                                </CarouselItem>
                            ))
                        }
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                </Carousel>

                {/*information*/}
                <div className={"text-pretty flex flex-col gap-4"}>
                    <div className={"flex flex-col gap-4"}>
                        <h2 className={"text-2xl font-semibold"}>{room.title}</h2>
                        <div className={"flex gap-4"}>
                            <Badge variant={"outline"} className={"text-md"}>
                                <RiHome9Line/>
                                {room.type}
                            </Badge>
                            <Badge variant={"outline"} className={"text-md"}><RiMapPinLine /> {
                                room.location
                            }</Badge>
                        </div>
                        <p className={"flex gap-4"}>#{room.roomNumber} {room.isAvailable ? <RiCheckboxCircleLine /> : <RiCloseCircleLine />}</p>
                        <p className={"flex gap-4 text-yellow-500"}><RiExchangeDollarLine />{room.pricePerNight}</p>
                        <p className={"font-sm opacity-50"}>{room.description}</p>
                    </div>
                    <div className={"flex justify-between items-center rounded-lg p-5 border-2 border-gray-500"}>
                        {
                            items.map((itm,i)=>(
                                <div className={"grid plcae-items-center gap-2 justify-items-center"} key={i}>
                                    <span> {itm.icon}</span>
                                    <span>{itm.label}</span>
                                </div>
                            ))
                        }
                    </div>

                    <p className={"text-md font-normal antialiased"}>Reviews ({room.reviews.length})</p>

                </div>
                {/*reviews*/}
                <AddRate reviews={room.reviews} room={room.id}/>
            </Card>

          <Card className={"col-span-2 text-md"}>
            <CardHeader className={"text-xl font-semibold"}>Book here! foo...</CardHeader>
              <hr/>
              <CardContent>
                  <BookingForm
                  rentPerDay={room.pricePerNight}
                  roomId={room.id}
                  disabledDates={bookedDays}
                  isAvailable={room.isAvailable}/>
              </CardContent>
          </Card>

        </section>
    )
}






















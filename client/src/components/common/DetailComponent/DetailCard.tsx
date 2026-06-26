import type {Room} from "@/lib/type.ts";
import {
    RiCheckboxCircleLine,
    RiCloseCircleLine,
    RiExchangeDollarLine,
    RiHome9Line,
    RiMapPinLine,
    RiTeamLine
} from "@remixicon/react";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import {Card, CardContent, CardHeader} from "@/components/ui/card.tsx";
import BookingForm from "@/components/common/DetailComponent/BookingForm.tsx";

export default function DetailCard({room}:{room:Room}) {
    const items = [
        {
            icon:<RiTeamLine />,
            label:"Capacity",
            value:room.capacity
        },
        {
            icon:<RiHome9Line/>,
            label:"Type",
            value:room.type
        },
        {
            icon:<RiMapPinLine />,
            label:"Location",
            value:room.location
        }
    ]
    return (
        <section className={"layout h-screen grid grid-cols-5 gap-4"}>
            <Card className={"col-span-3 p-4"}>
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
                <div className={"text-pretty"}>
                    <div>
                        <h2 className={"text-2xl font-semibold"}>{room.title}</h2>
                        <p className={"flex gap-4"}>#{room.roomNumber} {room.isAvailable ? <RiCheckboxCircleLine /> : <RiCloseCircleLine />}</p>
                        <p className={"flex gap-4 text-yellow-500"}><RiExchangeDollarLine />{room.pricePerNight}</p>
                        <p className={"font-sm opacity-50"}>{room.description}</p>
                    </div>
                    <div className={"flex justify-between items-center rounded-lg p-5 border-2 border-gray-500"}>
                        {
                            items.map((itm,i)=>(
                                <div className={"grid plcae-items-center gap-2 justify-items-center"} key={i}>
                                    <span> {itm.icon}</span>
                                    <span>{itm.value}</span>
                                </div>
                            ))
                        }
                    </div>

                    <p className={"text-md font-normal antialiased"}>Reviews ({room.reviews.length})</p>
                </div>
            </Card>

          <Card className={"col-span-2 text-md"}>
            <CardHeader className={"text-xl font-semibold"}>Book here! foo...</CardHeader>
              <hr/>
              <CardContent>
                  <BookingForm
                  rentPerDay={room.pricePerNight}
                  roomId={room.id}/>
              </CardContent>
          </Card>

        </section>
    )
}






















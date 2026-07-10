import {NavLink, Outlet} from "react-router";
import Header from "@/components/common/Header.tsx";
import {cn} from "@/lib/utils.ts"
import {RiCoupon3Line, RiDashboardFill, RiHotelBedLine, RiMenuAddLine} from "@remixicon/react";
import {useSubscription} from "@apollo/client/react";
import {NEW_BOOKING_SUBSCRIPTION} from "@/graphql/subscription/booking.ts";
import {useEffect} from "react";
import {toast} from "sonner";
export default function AdminLayout(){
    const {data}=useSubscription(NEW_BOOKING_SUBSCRIPTION)
    useEffect(() => {
        console.log("data",data)
       if (data){
           toast.success((data as any)?.newBookingNoti)
       }
    }, [data]);
    const control =[
        {
        path:"/admin/dashboard",
        label:"Dashboard",
            icon:<RiDashboardFill />
        },
        {
            path:"/admin/dashboard/manageRoom",
            label:"Manage Room",
            icon:<RiHotelBedLine />
        },
        {
            path:"/admin/dashboard/createRoom",
            label:"Add New Room",
            icon:<RiMenuAddLine />
        },
        {
            path:"/admin/dashboard/bookings",
            label:"All Bookings",
            icon:<RiCoupon3Line />
        }
        ]
    return <section className={"layout grid grid-cols-12 gap-4"}>
        <div className={"col-span-12"}>
            <Header/>
        </div>
        <nav className={"col-span-3 flex flex-col gap-4 align-middle"}>
            {
                control.map(({path,label,icon})=>(

                    <NavLink
                        to={path}
                        key={path}
                        end={path=="/admin/dashboard"}
                        className={({ isActive}) =>
                       cn("w-full flex gap-2 bg-black-900 border-1 rounded py-4 ps-4 font-bol hover:rounded-xl hover:bg-gray-900",isActive && "bg-gray-900 rounded-xl")
                        }
                    >
                        {icon} {label}
                    </NavLink>
                ))
            }
        </nav>
        <main className={"col-span-9"}>
            <Outlet/>
        </main>
    </section>
}


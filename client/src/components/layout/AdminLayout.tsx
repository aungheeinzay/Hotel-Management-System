import {NavLink, Outlet} from "react-router";
import Header from "@/components/common/Header.tsx";
import {cn} from "@/lib/utils.ts"
import {RiDashboardFill, RiHotelBedLine, RiMenuAddLine} from "@remixicon/react";
export default function AdminLayout(){
     console.log("admin layout")
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


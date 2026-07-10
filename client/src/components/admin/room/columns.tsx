

import type { ColumnDef } from "@tanstack/react-table"
import {
    DropdownMenu, DropdownMenuContent,
    DropdownMenuItem, DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu.tsx";
import {Button} from "@/components/ui/button.tsx";
import {useNavigate} from "react-router";
import {RiDeleteBin6Line, RiEditBoxLine} from "@remixicon/react";
import formatNumber from "@/lib/formatNumber.ts";
import {useMutation} from "@apollo/client/react";
import {DELETE_ROOM} from "@/graphql/mutation/room.ts";
import {toast} from "sonner";
import {GET_ROOMS_FOR_ADMIN} from "@/graphql/queries/room.ts";


export type Room = {
    id: string
    title: string
    location:string
    type:string
    isAvailable:boolean
    pricePerNight:number
}

export const columns: ColumnDef<Room>[] = [
    {
        accessorKey: "title",
        header: "Title",
    },
    {
        accessorKey: "location",
        header: "Location",
    },
    {
        accessorKey: "type",
        header: "Type",
    },
    {
        accessorKey: "pricePerNight",
        header:"Price",
        cell:({row})=>{
            const amount =`$ ${formatNumber(row.original.pricePerNight)}`
            return <p>{amount}</p>
        }
    },
    {
        accessorKey:"isAvailable",
        header:"Is Available",
        cell:({row})=>{
            const isAvailable =row.original.isAvailable
            return isAvailable ? "Yes" : "sorry"
        }
    },
    {   header:"Action",
        id: "actions",
        cell: ({ row }) => {

            const navigate = useNavigate()
            const [deletetingRoom,{error,loading}] = useMutation(DELETE_ROOM,{
                refetchQueries:[{
                    query:GET_ROOMS_FOR_ADMIN,
                    variables:{
                        page:"1",
                        perPage:"5"
                    }
                }]
            })
            const id =row.original.id


            async function deleteRoom(id:string){
               const res = await deletetingRoom({
                    variables:{
                        roomId:id
                    }

                })
                if (res){

                    return toast.success("deleting successfully")
                }
                if (error)return toast.error(error.message)
            }
            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            ...
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem
                            onClick={() =>navigate(`/${id}`)}
                        >
                                 check
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                            className={"flex gap-2"}
                            onClick={()=>navigate(`/admin/dashboard/updateRoom/${id}`)}
                        > <RiEditBoxLine /> edit </DropdownMenuItem>
                        <DropdownMenuItem
                            className={"text-red-500 flex gap-2"}
                            onClick={()=>deleteRoom(id)}
                            disabled={loading}
                        > <RiDeleteBin6Line />{loading ? "deleting..." : "delete"} </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
]
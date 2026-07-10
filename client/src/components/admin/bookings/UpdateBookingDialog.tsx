import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {FieldGroup} from "@/components/ui/field"

import * as React from "react";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {useState} from "react";
import {useMutation} from "@apollo/client/react";
import {UPDATE_BOOKING} from "@/graphql/mutation/booking.ts";
import {toast} from "sonner";
import {GET_ALL_BOOKING} from "@/graphql/queries/booking.ts";
import {useSearchParams} from "react-router";
interface BookingI{
    id:string,
    status:string
    method:string
}

interface DialogProps{
    children:React.ReactNode,
    open:boolean,
    setOpen:(value:boolean) => void,
    booking:BookingI
}
export function DialogBooking({children,open,setOpen,booking}:DialogProps) {
    const [bookingInfo,setBookingInfo] = useState(booking)
    const [searchParam] = useSearchParams()
    const page =Number(searchParam.get("page"))
    const perPage = Number(searchParam.get("petPage"))
    const [updateBooking,{error,loading}]= useMutation(UPDATE_BOOKING)
   async function handleUpdate(){
        if (window.confirm("Are you sure?")){
            const res = await updateBooking({
                variables:{
                    bookingInput:{
                        paymentInfo:{
                            status:bookingInfo.status,
                            method:bookingInfo.method
                        }
                    },
                    bookingId:bookingInfo.id
                },
                refetchQueries:[{
                    query:GET_ALL_BOOKING,
                    variables:{
                        page,
                        perPage
                    }
                }]
            })
           if (res){
               setOpen(false);
               toast.success("Booking successfully updated!")
           }
        }
    }
    if (error){
        toast.error("something went wrong")
    }
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <form>
                <DialogTrigger>
                    {children}
                </DialogTrigger>
                <DialogContent className="sm:max-w-sm">
                    <DialogHeader>
                        <DialogTitle>Edit Bookings</DialogTitle>
                        <DialogDescription>
                            Make changes to Bookings and save changes to the booking list <br/>
                            note : {booking.status=="paid" && "These booking is already paid"}
                        </DialogDescription>
                    </DialogHeader>
                  <FieldGroup>
                      <Select onValueChange={(val)=>setBookingInfo((pre)=>({...pre,status:val}))}>
                          <SelectTrigger className="w-[180px]">
                              <SelectValue placeholder={bookingInfo.status} />
                          </SelectTrigger>
                          <SelectContent>
                              <SelectGroup>
                                  {
                                      ["pending","paid"].map((p)=>(
                                          <SelectItem
                                              key={p}
                                              value={p}>
                                              {p}
                                          </SelectItem>

                                      ))
                                  }
                              </SelectGroup>
                          </SelectContent>
                      </Select>
                      <Select onValueChange={(val)=>setBookingInfo((pre)=>({...pre,method:val}))}>
                          <SelectTrigger className="w-[180px]">
                              <SelectValue placeholder={bookingInfo.method} />
                          </SelectTrigger>
                          <SelectContent>
                              <SelectGroup>
                                  {
                                      ["cash","card"].map((p)=>(
                                          <SelectItem
                                              key={p}
                                              value={p}>
                                              {p}
                                          </SelectItem>

                                      ))
                                  }
                              </SelectGroup>
                          </SelectContent>
                      </Select>

                  </FieldGroup>
                    <DialogFooter>
                        <DialogClose />
                        <Button
                            disabled={loading}
                            type="button"
                            onClick={handleUpdate}
                        >{loading ? "saving..." : "Save Changes"}</Button>
                    </DialogFooter>
                </DialogContent>
            </form>
        </Dialog>
    )
}

import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {RiBankCardLine, RiWallet3Line} from "@remixicon/react";
import {useState} from "react";
import {Button} from "@/components/ui/button.tsx";
import {useMutation} from "@apollo/client/react";
import {UPDATE_PAYMENT} from "@/graphql/mutation/booking.ts";
import {useParams} from "react-router";
import {toast} from "sonner";

export default function PayBy(){
    const [option,setOption] = useState<"cash" | "card">("cash")
    const {bookingId}= useParams()
    const [updatePayment,{error,loading}] =useMutation<{updateBooking:boolean}>(UPDATE_PAYMENT)

    async function handleUpdate(){
        if (option==="cash"){
            const variables={
                bookingId,
                bookingInput: {
                    paymentInfo:{
                        method:"cash"
                    }
                }
            }

            const response = await updatePayment({
                variables
            })
            if (response.data?.updateBooking){
                toast.success("payment with cash successfully")
            }
            if (error){
                toast.error("something went wrong")
            }
        }
    }
    return (
        <Card>
           <CardHeader>
               <CardTitle>
            Choose a payment method
               </CardTitle>
               <CardDescription>
                   Pay with catch must be paid in 4 hours
               </CardDescription>

           </CardHeader>
            <hr/>
            <CardContent className={"grid grid-cols-2 gap-4 justify-between align-center"}>
                <Card onClick={()=>setOption("cash")} className={"hover:border-white grid place-items-center cursor-pointer border-2"}>
                    <RiWallet3Line />
                    <p>Pay with cash</p>
                </Card>

                <Card onClick={()=>setOption("card")} className={"grid place-items-center cursor-pointer hover:border-gray-500 hover:border-white border-2"}>
                    <RiBankCardLine />
                    <p>Pay with card</p>
                </Card>
                <Button disabled={loading} onClick={handleUpdate} className={"col-span-2"}>Payment conform with {option}</Button>
            </CardContent>
        </Card>
    )
}
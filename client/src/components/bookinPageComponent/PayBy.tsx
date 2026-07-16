import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {RiBankCardLine, RiWallet3Line} from "@remixicon/react";
import {useState} from "react";
import {Button} from "@/components/ui/button.tsx";
import {useMutation, useReactiveVar} from "@apollo/client/react";
import {UPDATE_PAYMENT} from "@/graphql/mutation/booking.ts";
import {useNavigate, useParams} from "react-router";
import {toast} from "sonner";
import {userInfoVar} from "@/apolllo/apolloVar.ts";
import {STRIPE_CHECKOUT_SESSION} from "@/graphql/mutation/payment.ts";


export default function PayBy(){
    const [option,setOption] = useState<"cash" | "card">("cash")
    const navigate = useNavigate()
    const userInfo =useReactiveVar(userInfoVar)
    const {bookingId}= useParams()
    const [updatePayment,{error,loading}] =useMutation<{updateBooking:boolean}>(UPDATE_PAYMENT)
    const [stripeCheckOut,{error:stripeError,loading:stripeLoading}] = useMutation<{stripeCheckoutSession:{url:string}}>(STRIPE_CHECKOUT_SESSION)
    async function handleUpdate(){
        if (option==="cash"){
            const variables={
                bookingId,
                bookingInput: {
                    paymentInfo:{
                        status:"paid",
                        method:"cash"
                    }
                }
            }

            const response = await updatePayment({
                variables
            })
            if (response.data?.updateBooking){
                toast.success("payment with cash successfully")
                return navigate(`/bookings/me/${userInfo?.id}`)
            }
            if (error){
                toast.error("something went wrong")
            }
        }else {
            const {data} = await stripeCheckOut({variables:{bookingId}})
            if(data?.stripeCheckoutSession.url) {
               return window.location.href=data.stripeCheckoutSession.url
            }
            if (stripeError){
                toast.error(stripeError.message)
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
                <Button disabled={loading || stripeLoading} onClick={handleUpdate} className={"col-span-2"}>Payment conform with {option} {(stripeLoading || loading) && "..."}</Button>
            </CardContent>
        </Card>
    )
}
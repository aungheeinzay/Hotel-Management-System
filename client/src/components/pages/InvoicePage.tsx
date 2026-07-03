import {useQuery} from "@apollo/client/react";
import {GET_BOOKING_FOR_INVOICE} from "@/graphql/queries/booking.ts";
import {useParams} from "react-router";
import IsLoading from "@/components/common/Loading.tsx";
import type {BookingInvoice} from "@/lib/type.ts";
import NotFound from "@/components/common/NotFound.tsx";
import formatDate from "@/lib/formatDate.ts";
import InvoiceApp from "@/components/common/Invoice.tsx";

export default function InvoicePage(){
    const {bookingId} = useParams()
    const {data,loading} = useQuery<{getBookingForInvoice:BookingInvoice}>(GET_BOOKING_FOR_INVOICE,{variables:{bookingId}})
    if (!data?.getBookingForInvoice){
       return <NotFound/>
    }
    const booking =data?.getBookingForInvoice!
    const invoiceData = {
        number: booking.id,
        sender: {
            name: "Golden Compass",
        },
        client: {
            name: booking.customer.name,
            email: booking.customer.email,
        },
        booking: {
            checkIn: formatDate(booking.startDate,"P"),
            checkOut:formatDate(booking.endDate,"P"),
            nights: booking.dayOfRent,
            roomType: booking.room.title,
        },
        financials: {
            ratePerNight: booking.room.pricePerNight,
            subtotal: booking.amount.rent,
            taxRate: 10, // 5% Gov Tax
            taxAmount: booking.amount.tax,
            total: booking.amount.total,
            currency: "$",
        },
        notes:
            "Check-in time is 14:00. Check-out time is 12:00. Breakfast is included at the River Terrace.",
    };
    return (
            <IsLoading isLoading={loading}>
                <InvoiceApp invoiceData={invoiceData}/>
            </IsLoading>
    )
}
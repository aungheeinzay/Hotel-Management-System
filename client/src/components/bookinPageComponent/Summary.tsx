import type {Booking} from "@/lib/type.ts";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import formatDate from "@/lib/formatDate.ts";

export default function Summary({book}:{book:Booking}){
    console.log("book",book)
    return(
        <Card>
            <CardHeader>
                <CardTitle>Summary - # {book.id}</CardTitle>
                <CardDescription>Here is your booking information</CardDescription>
            </CardHeader>
            <CardContent className={"flex flex-col gap-4 align-center"}>
                <p className={"text-md font-semibold"}>Customer Info</p>
                <div className={"flex justify-between items-center w-full"}>
                    <p>name</p>
                    <p>{book.customer.name}</p>
                </div>
                <div className={"flex justify-between items-center w-full"}>
                    <p>name</p>
                    <p>{book.customer.email}</p>
                </div>
                <hr/>

                <p className={"text-md font-semibold"}>Booking date</p>
                <div className={"flex justify-between items-center w-full"}>
                    <p>start date</p>
                    <p>{formatDate(new Date(+book.startDate),"PPP")}</p>
                </div>
                <div className={"flex justify-between items-center w-full"}>
                    <p>start date</p>
                    <p>{formatDate(new Date(+book.endDate),"PPP")}</p>
                </div>
                <hr/>

                <p className={"text-md font-semibold"}>Amount</p>
                <div className={"flex justify-between items-center w-full"}>
                    <p>rent per day</p>
                    <p>{book.rentPerDay}</p>
                </div>
                <div className={"flex justify-between items-center w-full"}>
                    <p>rent</p>
                    <p>{book.amount.rent}</p>
                </div>
                <div className={"flex justify-between items-center w-full"}>
                    <p>tax</p>
                    <p>{book.amount.tax}</p>
                </div>
                <div className={"flex justify-between items-center w-full"}>
                    <p>discount</p>
                    <p>{book.amount.discount}</p>
                </div>
                <hr/>
                <div className={"flex justify-between items-center w-full"}>
                    <p>Est.Total</p>
                    <p>{book.amount.total}</p>
                </div>
            </CardContent>
        </Card>
    )
}
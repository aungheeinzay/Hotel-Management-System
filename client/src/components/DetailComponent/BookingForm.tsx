import {useMutation, useReactiveVar} from "@apollo/client/react";
import {userInfoVar} from "@/apolllo/apolloVar.ts";
import {Controller, useForm} from "react-hook-form";
import {type bookingForm, bookingSchema} from "@/schema/bookingSchema.ts";
import {Field, FieldError, FieldGroup, FieldLabel} from "@/components/ui/field.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Button} from "@/components/ui/button.tsx";
import {useEffect, useState} from "react";
import {Textarea} from "@/components/ui/textarea.tsx";
import {RangeCalender} from "@/components/DetailComponent/RangeCalander.tsx";
import * as React from "react";
import type {DateRange} from "react-day-picker";
import getDayOfRent from "@/lib/getDayOfRent.ts";
import caculateAmount from "@/lib/caculateAmount.ts";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import ajustTimezone from "@/lib/ajustTimezone.ts";
import {zodResolver} from "@hookform/resolvers/zod";
import {CREATE_BOOKING} from "@/graphql/mutation/booking.ts";

import {toast} from "sonner";
import {useNavigate} from "react-router";


interface Props extends React.HtmlHTMLAttributes<HTMLDivElement>{
    dates?:DateRange
    disabledDates?:string[]
    rentPerDay:number
    roomId:string
    isAvailable:boolean
}
export default function BookingForm({dates,disabledDates,rentPerDay,roomId,isAvailable}:Props){
    const user = useReactiveVar(userInfoVar)
    const [createBook, {error,loading}]=useMutation<{
        createBooking:string
    }>(CREATE_BOOKING)
    const [dayOfRent,setDayOfRent]=useState(0)
    const navigate = useNavigate()
    const [amount,setAmount] = useState(
        {
            rent:0,
            tax:0,
            discount:0,
            total:0
        }
    )


    console.log("disabled date from booking form",disabledDates)
    const form = useForm<bookingForm>({
        defaultValues:{
            name: "",
            email: "",
            additionalNote: "",
            dateRange: {
                from: dates?.from || undefined,
                to: dates?.to || undefined
            }
        },
        resolver:zodResolver(bookingSchema)

    })

    const dateRange = form.watch("dateRange")
    useEffect(() => {
        form.reset({
            name:user?.username,
            email:user?.email
        })
    }, [user]);


    useEffect(()=>{
        const caculatedAmount = caculateAmount(rentPerDay,dayOfRent)
        setAmount(caculatedAmount)
        console.log("amount",amount)
    },[dayOfRent,rentPerDay])


    const summary= [
        {
            label:"Day Of Rent",
            amount:dayOfRent
        },
        {
            label:"Rent Per Day",
            amount:rentPerDay
        },
        {
            label:`Total Rent`,
            amount:amount.rent
        },
        {
            label:`Tax(${.6}%)`,
            amount:amount.tax
        },
        {
            label:"Est.Total",
            amount:amount.total
        }
    ]


    useEffect(() => {
        const rentDays = getDayOfRent(dateRange)
        setDayOfRent(rentDays)


    }, [dateRange]);

async function onSubmit(value:bookingForm){

        const {name,email,dateRange,additionalNote}= value

   if (!dateRange.from || !dateRange.to){
       return toast.error("need to add booking date")
   }
   const variables={
      bookingInfo:{
          startDate:ajustTimezone(dateRange.from),
          endDate:ajustTimezone(dateRange.to),
          room:roomId,
          rentPerDay,
          dayOfRent,
          customer:{
              name,
              email
          },
          amount,
          additionalNote
      }
   }

   const {data} = await createBook({
       variables
   })
    if (data?.createBooking){
        form.reset()
        toast.success("successfully created booking")
        navigate(`/bookings/${data.createBooking}/payment`)
    }
    if (error){
        toast.error(error.message)
    }

}



    return (
        <div>
            <form id="form-rhf-book" onSubmit={form.handleSubmit(onSubmit)}
            className={"flex gap-4 flex-col"}>
                <FieldGroup>
                    <Controller
                        name="name"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel>
                                    username
                                </FieldLabel>
                                <Input
                                    {...field}

                                    aria-invalid={fieldState.invalid}
                                    autoComplete="off"

                                />
                                {fieldState.invalid && (
                                    <FieldError errors={[fieldState.error]} />
                                )}
                            </Field>
                        )}
                    />


                    <Controller
                        name="email"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel>
                                    email
                                </FieldLabel>
                                <Input
                                    {...field}

                                    aria-invalid={fieldState.invalid}
                                    autoComplete="off"
                                />
                                {fieldState.invalid && (
                                    <FieldError errors={[fieldState.error]} />
                                )}
                            </Field>
                        )}
                    />
                    <Controller
                        name="dateRange"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel>
                                    select booking date
                                </FieldLabel>
                                <RangeCalender
                                    dates={dates}
                                    disabledDates={disabledDates}
                                    onDateChange={field.onChange}
                                    isDisabled={true}
                                />

                                {fieldState.invalid && (
                                    <FieldError errors={[fieldState.error]} />
                                )}
                            </Field>
                        )}
                    />

                    <Controller
                        name="additionalNote"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel>
                                    Additional note
                                </FieldLabel>
                                <Textarea
                                    {...field}
                                    placeholder={"you can write additional note here!"}
                                    aria-invalid={fieldState.invalid}
                                    autoComplete="off"
                                />
                                {fieldState.invalid && (
                                    <FieldError errors={[fieldState.error]} />
                                )}
                            </Field>
                        )}
                    />
                </FieldGroup>
                <Card>
                    <CardHeader>
                        <CardTitle>Summary</CardTitle>
                        <CardDescription>check and conform your booking</CardDescription>
                    </CardHeader>
                    <CardContent className={"flex gap-y-4 flex-col"}>
                        {
                            summary.map((obj,i)=>(
                              <div key={obj.label}>
                                  {summary.length-1==i && <hr className={"my-4"}/>}
                                  <p className={"flex justify-between items-center gap-y-2"}>
                                      <span>{obj.label}</span>
                                      <span>{obj.amount}</span>
                                  </p>
                              </div>
                            ))
                        }
                    </CardContent>
                </Card>
                <Button disabled={loading || dateRange==undefined || dayOfRent<=0 || !isAvailable} type={"submit"}>book</Button>
            </form>
        </div>
    )
}
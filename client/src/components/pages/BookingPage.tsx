
import {useNavigate, useParams} from "react-router";
import {useQuery} from "@apollo/client/react";
import {GET_BOOKING_BY_ID} from "@/graphql/queries/booking.ts";
import type {Booking} from "@/lib/type.ts";
import Summary from "@/components/bookinPageComponent/Summary.tsx";
import IsLoading from "@/components/common/Loading.tsx";
import PayBy from "@/components/bookinPageComponent/PayBy.tsx";
import {toast} from "sonner";

export default function BookingPage() {
    const {bookingId} = useParams()
    const navigate=useNavigate()
    const {data, error, loading} = useQuery<{
        getBookingById: Booking
    }>(GET_BOOKING_BY_ID, {
        variables: {
            bookingId
        }
    })
    if (error) {
       toast.error(error.message)
        navigate("/")
    }

    return (
        <section className={"layout grid grid-cols-2 gap-4"}>
          <div>
              <IsLoading isLoading={loading}>
                  {
                      data && <Summary book={data.getBookingById}/>
                  }
              </IsLoading>
          </div>
            <PayBy/>

        </section>
    )
}
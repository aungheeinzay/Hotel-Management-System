import IsAuthenticated from "@/components/common/IsAuthenticated.tsx";
import {useLazyQuery} from "@apollo/client/react";
import {GET_DASHBOARD_DATA} from "@/graphql/queries/booking.ts";
import {useEffect, useState} from "react";
import type {DateRange} from "react-day-picker";
import NotFound from "@/components/common/NotFound.tsx";
import IsLoading from "@/components/common/Loading.tsx";
import {RiCashLine, RiHandCoinLine, RiMoneyDollarCircleLine, RiTicketLine} from "@remixicon/react";
import DashBoard from "@/components/admin/dashboard/DashBoard.tsx";

function Page(){
    const [range,setRange] = useState<DateRange | undefined>({
        from:new Date(new Date().getFullYear(),new Date().getMonth(),1),
        to:new Date(Date.now())
    })
    const [getDashboardData,{data,error,loading}] = useLazyQuery<{
        getDashBoardMetaData:{
            saleData:{
                date:string
                sales:number
                booking:number
            }[]
            totalSales:number
            totalBooking:number
            totalPendingSale:number
            totalPaidCash:number

        }
    }>(GET_DASHBOARD_DATA)


    async function fetchData(){
    await getDashboardData({
        variables:{
            startDate:range?.from,
            endDate:range?.to
        }
    })
        console.log("dashboard",data)
    }
    useEffect(() => {
    fetchData()
        console.log("run use effect")
    }, [range,data]);

   if (error){
       <NotFound/>
   }
   const metaInfo = data?.getDashBoardMetaData
   const metaCard=[
       {
        label:"Total Sale",
           value:metaInfo?.totalSales,
           icon:<RiCashLine />
       },
       {
           label:"Total Booking",
           value:metaInfo?.totalBooking.toString(),
           icon:<RiTicketLine />
       },
       {
           label:"Paid Cash",
           value:metaInfo?.totalPaidCash,
           icon:<RiMoneyDollarCircleLine />
       },
       {
           label:"Pending Cash",
           value:metaInfo?.totalPendingSale,
           icon:<RiHandCoinLine />
       }
   ]
    console.log("range",range)
    return (
        <section className={"w-full bg-gray-900 rounded-lg p-5"}>
        <IsLoading isLoading={loading}>
        <DashBoard
            metaInfo={metaCard}
            onChange={setRange}
            dates={range}
            saleData={metaInfo?.saleData || []}
        />
        </IsLoading>
        </section>
    )
}

export default IsAuthenticated(Page,"admin")

import MetaInfoCard from "@/components/common/metaInfoCard.tsx";
import {RangeCalender} from "@/components/DetailComponent/RangeCalander.tsx";
import type {DateRange} from "react-day-picker";
import {SaleChart} from "@/components/admin/dashboard/SaleChart.tsx";

interface metaInfoCardProps {
   metaInfo:{
       label: string
       value: number | undefined | string
       icon: React.JSX.Element
   } []
    onChange:(date:DateRange | undefined)=>void
    dates:DateRange | undefined
    saleData:{
        date:string
        sales:number
        booking:number
    }[]
}
export default function DashBoard({metaInfo,onChange,dates,saleData}:metaInfoCardProps){
    return (
        <main className={" flex flex-col gap-4"}>
            <RangeCalender
                onDateChange={onChange}
                dates={dates}
                isDisabled={false}
            />
        <div className={"grid grid-cols-4 gap-4"}>
            {
                metaInfo.length>0 && metaInfo.map(({label,value,icon})=>(
                    <MetaInfoCard key ={label}
                                  label={label}
                                  value={value!}
                                  icon={icon}/>
                ))
            }
        </div>
            <SaleChart chartData={saleData}/>
        </main>
    )
}
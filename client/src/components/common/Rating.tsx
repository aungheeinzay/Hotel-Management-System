
import {useState} from "react";
import {RiStarFill, RiStarLine} from "@remixicon/react";
import {cn} from "@/lib/utils.ts";

interface RatingProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'>{
    maxStar?:number
    size?:number
    initialRate:number
    onChange?:(value:number)=>void
}
export default function Rating({maxStar=5,size=18,initialRate=0,onChange,className}:RatingProps){
     const [rate,setRate]=useState(initialRate)
    function handleChange(position:number){
         setRate(position)
        onChange?.(position)
    }
    return (
       <div className={cn(className,"flex gap-2")}
       onMouseLeave={()=>handleChange(rate==1 ? 0 : rate)}>
           {
               [...Array.from({length:maxStar})].map((_,i)=>{
                   const fill = rate > i
                   if (fill){
                       return <RiStarFill color="rgba(240,187,64,1)"
                                          key={i}
                                          size={size}
                                          onMouseEnter={()=>handleChange(i+1)}


                       />
                   }
                   return <p><RiStarLine key={i}
                                         size={size}
                                         className={"text-yellow-500"}
                                         onMouseEnter={()=>handleChange(i+1)}

                   />
                   </p>

               })
           }
       </div>
    )
}

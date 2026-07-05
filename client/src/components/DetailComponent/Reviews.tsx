import Rating from "@/components/common/Rating.tsx";

export default function Reviews({rating,comment}:{rating:number,comment:string}){
    return (
        <div className={"space-y-4"}>
            <Rating initialRate={rating}/>
            <p>{comment}</p>
        </div>
    )
}
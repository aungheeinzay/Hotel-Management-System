
import {Button} from "@/components/ui/button.tsx";
import Rating from "@/components/common/Rating.tsx";
import { useState} from "react";
import Reviews from "@/components/DetailComponent/Reviews.tsx";
import {useMutation} from "@apollo/client/react";
import {CREATE_UPDATE_REVIEW} from "@/graphql/mutation/review.ts";
import {toast} from "sonner";
import {Get_Room_By_Id} from "@/graphql/queries/room.ts";
interface AddRateProps{
    room:string
    reviews:{
        id:string
        user :{
            id:string
            username:string
        }
        rating:number
        comment:string
        createdAt:string
        updatedAt:string
    }[]
}
export default function AddRate({reviews,room}:AddRateProps){
    const [rating,setRating]=useState<number>(5)
    const [comment,setComment] = useState("")
    const [createUpdateReview,{loading}] = useMutation<{
        createAndUpdateReview:{id:string}
    }>(CREATE_UPDATE_REVIEW)
    const variables={
        reviewInput: {
            room,
            rating,
            comment
        }
    }
    async function handleReview(){
       try{
           if (!comment.trim())return toast.error("need to put comment")
           const {data} = await createUpdateReview({
               variables,
               refetchQueries:[
                   {
                       query:Get_Room_By_Id,
                       variables:{
                           roomId:room,
                           getBookedDaysRoomId2:room
                       }
                   }]
           })
           if (data?.createAndUpdateReview?.id){
               setRating(5)
               setComment("")
               toast.success("review added successfully")
           }
       } catch(error:any){
            console.log("error",error.name)
            toast.error(error.message)
        }
    }

    return (
        <section className={"flex flex-col items-center gap-y-8 w-full"}>
            <div className={"grid gap-4 w-full "}>
                <Rating
                    initialRate={5}
                    onChange={setRating}
                />
                <div className={"flex flex-row gap-4 w-full"}>
                    <input type={"text"} value={comment} onChange={e=>setComment(e.target.value)}
                           className={"w-full rounded-none border-t-0 border-x-0 border-b-2 p-2 text-base outline-0 focus:outline-0 focus:ring-0 bg-transparent"}
                           placeholder={"enter the note"}/>
                    <Button onClick={handleReview} className={"p-4 px-8"}>{loading ? "adding...":"add"}</Button>
                </div>

            </div>
            <hr className={"block"}/>
            <div className={"flex flex-col gap-4 w-full justify-start"}>
                {
                    reviews.length==0 ? <p>no reviews found</p> :
                        reviews.map(rev=>{
                          return <Reviews key={rev.id}
                                          id={rev.id}
                                          rating={rev.rating}
                                          room={room}
                                          comment={rev.comment}/>
                        })
                }
            </div>
        </section>
    )
}
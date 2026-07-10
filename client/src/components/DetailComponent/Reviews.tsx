import Rating from "@/components/common/Rating.tsx";
import {useMutation, useReactiveVar} from "@apollo/client/react";
import {userInfoVar} from "@/apolllo/apolloVar.ts";
import {RiDeleteBinLine} from "@remixicon/react";
import {DELETE_REVIEW} from "@/graphql/mutation/review.ts";
import {toast} from "sonner";
import {Get_Room_By_Id} from "@/graphql/queries/room.ts";

export default function Reviews({rating,comment,id,room}:{rating:number,comment:string,id:string,room:string}){
    const user = useReactiveVar(userInfoVar)
    const [deleteReview,{error,loading}] = useMutation(DELETE_REVIEW)
    const isAdmin = user?.role?.includes("admin")

    async function deletingReview(){
    const {data} =await deleteReview({
        variables:{
            reviewId:id
        },
        refetchQueries:[
            {
                query:Get_Room_By_Id,
                variables:{
                    roomId:room,
                    getBookedDaysRoomId2:room
                }
            }]
    })
        if (data){
            toast.success("Review deleted")
        }
        if (error){
            console.log(error)
            toast.error("something went wrong")
        }

    }
    return (
        <div className={"space-y-4 w-full"}>
           <div className={" flex justify-between "}>
              <div>
                  <Rating initialRate={rating}
                          selectAble={false}
                  />
                  <p>{comment}</p>
              </div>
               {
                   isAdmin && loading ? "..." :
                       <RiDeleteBinLine
                           onClick={deletingReview}
                           className={"cursor-pointer text-red-500 hover:bg-gray-500 w-10 h-10 p-2 rounded-full"}/>
               }
           </div>
            <hr/>
        </div>
    )
}
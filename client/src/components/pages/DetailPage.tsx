import {useQuery} from "@apollo/client/react";
import {CombinedGraphQLErrors} from "@apollo/client/errors"
import {Get_Room_By_Id} from "@/graphql/queries/room.ts";
import {useParams} from "react-router";

import DetailCard from "@/components/common/DetailComponent/DetailCard.tsx";
import type {Room} from "@/lib/type.ts";
import IsLoading from "@/components/common/Loading.tsx";
import NotFound from "@/components/common/NotFound.tsx";



export default function DetailPage(){
    const {id} =useParams()
    const {data,loading,error} = useQuery(Get_Room_By_Id,{
        variables:{
            roomId:id
        }
    })
    console.log("error",error)
  if (CombinedGraphQLErrors.is(error)){
      switch (error.errors[0].extensions!.code){
          case "NOT_FOUND":
              return <NotFound message={error.message}/>
          break;
          case "INTERNAL_SERVER_ERROR":
             return <p className={"font-bold text-center text-red-500"}>internal server error</p>
          break;
      }

  }
    return (
      <IsLoading isLoading={loading}>
          <DetailCard room={((data as any)?.getRoomById as Room)}/>
      </IsLoading>
    )
}
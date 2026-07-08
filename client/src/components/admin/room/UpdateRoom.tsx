import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import IsAuthenticated from "@/components/common/IsAuthenticated.tsx";
import CreateAndUpdateRoomForm from "@/components/admin/room/CreateAndUpdateRoomForm.tsx";
import {useParams} from "react-router";
import {useQuery} from "@apollo/client/react";
import {EDIT_ROOM_BY_ID} from "@/graphql/queries/room.ts";
import NotFound from "@/components/common/NotFound.tsx";
import IsLoading from "@/components/common/Loading.tsx";
import type {UpdateRoom} from "@/lib/type.ts";


function Page(){
    const {roomId} = useParams<string>()
    const {data,error,loading} = useQuery<{getRoomById: UpdateRoom }>(EDIT_ROOM_BY_ID,{
        variables:{
            roomId
        }
    })
    if (error){
        return <NotFound/>
    }
    return (
        <Card>
            <CardHeader>
                <CardTitle>Update Room Form</CardTitle>
                <CardDescription>Update Your Room here!</CardDescription>
            </CardHeader>
            <CardContent>
              <IsLoading isLoading={loading}>
                  {
                      data && <CreateAndUpdateRoomForm
                          isEdit={true}
                          roomData={data.getRoomById}/>
                  }
              </IsLoading>
            </CardContent>
        </Card>
    )
}

const UpdateRoom = IsAuthenticated(Page,"admin")
export default UpdateRoom;
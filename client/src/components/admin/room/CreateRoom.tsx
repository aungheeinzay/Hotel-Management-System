import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import CreateAndUpdateRoomForm from  "@/components/admin/room/CreateAndUpdateRoomForm.tsx"
import IsAuthenticated from "@/components/common/IsAuthenticated.tsx";
 function Page(){
    return (
        <Card>
            <CardHeader>
                <CardTitle>Add New Room Here</CardTitle>
                <CardContent>you can show your new room</CardContent>
            </CardHeader>
            <CardContent>
                <CreateAndUpdateRoomForm
                isEdit={false}/>
            </CardContent>
        </Card>
    )
}

export default IsAuthenticated(Page,"admin")
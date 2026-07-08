import IsAuthenticated from "@/components/common/IsAuthenticated.tsx";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {useLazyQuery} from "@apollo/client/react";
import {GET_ROOMS_FOR_ADMIN} from "@/graphql/queries/room.ts";
import {useEffect, useState} from "react";

import {DataTable} from "@/components/common/Data_Table.tsx";
import {columns} from "@/components/admin/room/columns.tsx";
import IsLoading from "@/components/common/Loading.tsx";

function Page(){
    const [page, setPage] = useState(1);
    const [perPage] = useState(5);


    const [getAllRooms, { data, error, loading }] = useLazyQuery<{
        getAllRooms: {
            rooms: {
                id: string;
                type: string;
                location: string;
                title: string;
                isAvailable: boolean;
                pricePerNight: number;
            }[]
            totalRooms:number
        }
    }>(GET_ROOMS_FOR_ADMIN);

    async function fetchRooms(){
        await getAllRooms({
            variables: {
                page: page.toString(),
                perPage: perPage.toString()
            }
        });
    }


    useEffect(() => {
        fetchRooms();
    }, [page, perPage]);

    if (error){
        console.log(error);
    }

    let tableData = data ? data.getAllRooms?.rooms : [];
    const hasNext = data ? Math.ceil(data.getAllRooms.totalRooms/perPage)>page : false
    console.log(
        "hasNext",hasNext
    )
    return (
        <main className={"bg-gray-900"}>
            <Card>
                <CardHeader>
                    <CardTitle>Manage Your Room</CardTitle>
                    <CardDescription>Check | Create | Update | Delete Rooms here!</CardDescription>
                </CardHeader>
                <CardContent>
                    <IsLoading isLoading={loading}>
                        {
                            <DataTable
                                columns={columns}
                                data={tableData}
                                page={page}
                                onChange={setPage}
                                hasNext={hasNext}
                            />
                        }
                    </IsLoading>
                </CardContent>
            </Card>
        </main>
    );
}

const ManageRoom = IsAuthenticated(Page,"admin")
export default ManageRoom
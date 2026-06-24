import {useQuery} from "@apollo/client/react";
import {GET_ALL_ROOMS, GET_META_INFO} from "@/graphql/queries/room.ts";
import IsLoading from "@/components/common/Loading.tsx";
import RoomList from "@/components/common/homeComponent/CardList.tsx";
import IsAuthenticated from "@/components/common/IsAuthenticated.tsx";
import type {Room} from "@/lib/type.ts";

import FilterCard from "@/components/common/homeComponent/FilterCard.tsx";
import {useSearchParams} from "react-router";
import {useDebounce} from "@/hooks/useDebounce.ts";


function Page(){
    const [searchParams] = useSearchParams()
    const filterValue = searchParams.get("filter") || ""
    const [debounceValue] = useDebounce(filterValue)
    const {data:metaInfo,loading:metaInfoLoading} =useQuery<{
        filterMetaInfo:{
            Location:string[]
            Capacity:number[]
            Type:string[]
        }
    }>(GET_META_INFO)
    const {data,loading} = useQuery<{getAllRooms:{
        rooms:Pick<Room,"id" | "images" | "location" | "pricePerNight" | "title">[]
            totalRooms   :number
    }}>(GET_ALL_ROOMS,{
        variables:{
            page:"1",
            perPage:"5",
            query:debounceValue
        }
    })
    console.log("metaInfo",metaInfo)
    return <main className={"layout grid grid-cols-8 gap-4"}>
    <div className={"col-span-8"}>
        <h1 className={"text-2xl font-bold"}>Top Trending Hotel In Myanmar</h1>
        <p className={"text-sm font-medium text-muted-foreground"}>Discover the most trending hotel for unforgetable experiences</p>
    </div>
        <section className={"col-span-2"}>
           <FilterCard
           Location={metaInfo?.filterMetaInfo.Location!}
           Type={metaInfo?.filterMetaInfo.Type!}
           Capacity={metaInfo?.filterMetaInfo.Capacity!}
           loading={metaInfoLoading}
           />
        </section>
        <section className={"col-span-6"}>
            <IsLoading isLoading={loading}>
                <RoomList rooms={data?.getAllRooms.rooms || []}/>
            </IsLoading>
        </section>
    </main>
}
const HomePage =IsAuthenticated(Page)
export default HomePage
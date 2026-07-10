import {useQuery} from "@apollo/client/react";
import {GET_ALL_ROOMS, GET_META_INFO} from "@/graphql/queries/room.ts";
import IsLoading from "@/components/common/Loading.tsx";
import RoomList from "@/components/homeComponent/CardList.tsx";
import IsAuthenticated from "@/components/common/IsAuthenticated.tsx";
import type {Room} from "@/lib/type.ts";

import FilterCard from "@/components/homeComponent/FilterCard.tsx";
import {Link, useSearchParams} from "react-router";
import {useDebounce} from "@/hooks/useDebounce.ts";
import {useMemo} from "react";
import Pagination from "@/components/homeComponent/Pagination.tsx";
import {Button} from "@/components/ui/button.tsx";


function Page(){
    const [searchParams] = useSearchParams()
    const query = searchParams.get("filter")
    const location = searchParams.get("location")
    const type = searchParams.get("type")
    const capacity = Number(searchParams.get("capacity"))
    const page =  searchParams.get("page") || "1";
    const perPage = searchParams.get("perPage") || "5";
    const paramsValue = useMemo(() => {
        return {
            query,
            page,
            perPage,
            filters: {
                capacity,
                location,
                type
            }
        };
    }, [query, capacity, location, type,page,perPage]); // prevent infinate loop because of obj reference is always changes thus i use memo

    const [debounceValue] = useDebounce(paramsValue)
    console.log("debounceValue",debounceValue)
    const {data:metaInfo,loading:metaInfoLoading} =useQuery<{
        filterMetaInfo:{
            Location:string[]
            Capacity:number[]
            Type:string[]
        }
    }>(GET_META_INFO)
    const {data,loading,error} = useQuery<{getAllRooms:{
        rooms:Pick<Room,"id" | "images" | "location" | "pricePerNight" | "title" | "ratings">[]
            totalRooms   :number
    }}>(GET_ALL_ROOMS,{
        variables:debounceValue
    })

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
                {
                    error ? <div>
                            <p>no room found</p>
                       <Button asChild>
                           <Link to={"/"} >back</Link>
                       </Button>
                        </div>:
                        <RoomList rooms={data?.getAllRooms.rooms || []}/>
                }
            </IsLoading>
            {   data?.getAllRooms.totalRooms &&
                <Pagination totalDoc={data.getAllRooms.totalRooms}/>}
        </section>
    </main>
}
const HomePage =IsAuthenticated(Page)
export default HomePage
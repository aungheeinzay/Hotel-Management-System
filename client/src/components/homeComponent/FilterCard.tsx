import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card.tsx";
import { Input } from "@/components/ui/input.tsx";
import { RiCloseCircleLine, RiFilter3Line, RiSearchLine } from "@remixicon/react";
import {type ChangeEvent, useEffect, useState} from "react";
import {useNavigate, useSearchParams} from "react-router";

import {Checkbox} from "@/components/ui/checkbox.tsx";
import {Label} from "@/components/ui/label.tsx";
import type {FilterCardProps} from "@/lib/type.ts";
import IsLoading from "@/components/common/Loading.tsx";
import updateSearchParams from "@/components/homeComponent/updateSearchParams.ts";
import {Button} from "@/components/ui/button.tsx";



export default function FilterCard({Location,Capacity,Type,loading}:FilterCardProps) {

    const [searchValue, setSearchValue] = useState("");
    const [searchParams, setSearchParams] = useSearchParams(); // searchParam -> searchParams (Plural standard)
    const navigate = useNavigate()

    const currentFilter = searchParams.get("filter") || "";
    const location = searchParams.get("location")
    const type =searchParams.get("type")
    const capacity = searchParams.get("capacity")


    useEffect(() => {
        setSearchValue(currentFilter);
    }, [currentFilter]);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchValue(value); // Input state ကို အရင် update လုပ်

        // URLSearchParams ကို အသစ် clone လုပ်
        const newParams = new URLSearchParams(searchParams);

        if (value.trim() === "") {
            newParams.delete("filter"); // filter ကို ဖျက်တယ်
        } else {
            newParams.set("filter", value); // filter ကို update လုပ်တယ် (အခြား param တွေမပျောက်အောင်)
        }

        setSearchParams(newParams); // ပြီးမှ URL ကို update လုပ်တယ်
    };


    const handleClear = () => {
        const newParams = new URLSearchParams(searchParams);
        newParams.delete("filter");
        setSearchParams(newParams);
        setSearchValue("");
    };

    const handleCheck=(key:string,value:string)=>{
        const params = new URLSearchParams(searchParams)
        const updatedParams = updateSearchParams(params,key,value)
        setSearchParams(updatedParams)
    }

    return (
        <Card className={"h-full"}>
            <CardHeader>
                <CardTitle className={"flexing text-xl font-bold"}>
                    <RiFilter3Line size={24} /> Filter
                </CardTitle>
                search everything about us
            </CardHeader>
            <hr/>
            <IsLoading isLoading={loading}>
                <CardContent className={"flex flex-col gap-4 align-items-center"}>
                    <div className={"relative"}>
                        <Input
                            placeholder={"type to search..."}
                            className={"ps-8"}
                            value={searchValue}
                            onChange={handleChange}
                        />
                        {searchValue.trim().length > 0 ? (
                            <RiCloseCircleLine
                                size={18}
                                className={"input-icon cursor-pointer"}
                                onClick={handleClear}
                            />
                        ) : (
                            <RiSearchLine size={18} className={"input-icon"} />
                        )}
                    </div>
                    <hr/>
                    <div>
                        <h2 className={"text-lg"}>Location</h2>
                        <div className={"flex flex-col gap-2"}>
                            {
                               Location && Location.map((loc,i)=>(
                                    <div key={i} className={"flexing gap-4items-center"}>
                                        <Checkbox id={`checkbox_${i}`}
                                                  checked={loc==location}
                                                  onClick={()=>handleCheck("location",loc)}/>
                                        <Label htmlFor={`checkbox_${i}`}
                                        onClick={()=>handleCheck("location",loc)}>{loc}</Label>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                    <hr/>

                    <div >
                        <h2 className={"text-lg"}>Type</h2>
                        <div className={"flex flex-col gap-2"}>
                            {
                              Type &&  Type.map((ty,i)=>(
                                    <div key={i} className={"flexing gap-2 items-center"}>
                                        <Checkbox id={`checkbox_${ty}`}
                                                  checked={type==ty}
                                                  onClick={()=>handleCheck("type",ty)}/>
                                        <Label htmlFor={`checkbox_${ty}`}
                                               onClick={()=>handleCheck("type",ty)}>{ty}</Label>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                    <hr/>

                    <div >
                        <h2 className={"text-lg"}>Type</h2>
                        <div className={"flex flex-col gap-2"}>
                            {
                              Capacity &&  Capacity.map((cap,i)=>(
                                    <div key={i} className={"flexing gap-2 items-center"}>
                                        <Checkbox id={`checkbox_${cap}`}
                                                  checked={cap+""==capacity}
                                                  onClick={()=>handleCheck("capacity",cap+"")}/>
                                        <Label htmlFor={`checkbox_${cap}`}
                                               onClick={()=>handleCheck("capacity",cap+"")}>{cap}</Label>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                    <Button className={"group hover:border-red-500 cursor-pointer"} variant={"outline"}
                    onClick={()=>navigate("/")}><RiCloseCircleLine
                    className={"group-hover:animate-spin group-hover:text-red-500 delay-50"}/> clear filter</Button>
                </CardContent>
            </IsLoading>
        </Card>
    );
}
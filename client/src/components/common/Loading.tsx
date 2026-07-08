import * as React from "react";


interface loading{
    children:React.ReactNode;
    isLoading:boolean;
    props?:any
}
export default function IsLoading({children,isLoading}:loading){
    return (
        <React.Fragment>
            {
                isLoading ? <p className={"items-center text-lg font-semibold"}>Loading ...</p> :
                   children
            }

        </React.Fragment>
    )
}
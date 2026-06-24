import * as React from "react";


interface loading{
    children:React.ReactNode;
    isLoading:boolean;

}
export default function IsLoading({children,isLoading}:loading){
    return (
        <React.Fragment>
            {
                isLoading ? <p>Loading ...</p> :
                   children
            }

        </React.Fragment>
    )
}
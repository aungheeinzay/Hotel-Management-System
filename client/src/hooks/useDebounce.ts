import {useEffect, useState} from "react";

export function useDebounce(value:string,delay:number=500){
const [debounceValue,setDebounceValue]=useState("")
    useEffect(() => {
        const timeout =setTimeout(
            ()=>{
                setDebounceValue(value)
            },delay
        )
        return ()=>clearInterval(timeout)
    }, [value,delay]);
return [debounceValue,setDebounceValue];
}
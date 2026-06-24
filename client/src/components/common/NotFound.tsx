import {Button} from "@/components/ui/button.tsx";
import {Link} from "react-router";

export default function NotFound({message}:{message?:string}){
    return (
        <div className={"grid place-items-center gap-5"}>
            <h1 className={"text-4xl font-bold text-center"}>4O4 page not found || {message}</h1>
            <Button asChild className={""}>
              <Link to={"/"}>
                  back to home
              </Link>
        </Button>
</div>
)
}
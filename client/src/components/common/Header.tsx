import {Link, useNavigate} from "react-router";
import {useLazyQuery, useQuery, useReactiveVar} from "@apollo/client/react";
import {CURRENT_USER, LOGOUT} from "@/graphql/queries/user.ts";
import {isAuthenticatedVar, loadingVar, userInfoVar} from "@/apolllo/apolloVar.ts";
import type {User} from "@/lib/type.ts";
import {Button} from "@/components/ui/button.tsx";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import IsLoading from "@/components/common/Loading.tsx";
import {useEffect} from "react";
import {RiLogoutBoxRLine} from "@remixicon/react";
import {toast} from "sonner";
export default function Header(){

    const navigate = useNavigate()
    const user = useReactiveVar(userInfoVar)
    const {data,loading} = useQuery<{
        currentUser:User
    } | null>(CURRENT_USER

    )
    useEffect(() => {
        loadingVar(loading)
        if (!loading) {
            if (data?.currentUser) {
                userInfoVar(data.currentUser)
                isAuthenticatedVar(true);
            } else {

                userInfoVar(null);
                isAuthenticatedVar(false);
            }
        }
    }, [data, loading]);


    //handler
    const [logout,{loading:logoutLoading}] = useLazyQuery(LOGOUT)
    function logoutHandler(){
    try {
        logout()
        isAuthenticatedVar(false)
        userInfoVar(null)
        navigate("/")
    }catch (err){
        toast.error("something went wrong")
    }

    }
    return(
        <nav className={"flex items-center justify-between layout px-4 py-4 sticky top-0 z-50 w-full border-b border-white/10 bg-white/30 backdrop-blur-md dark:bg-black/30"}>
            <Link to={"/"} className={"text-4xl font-bold"}>Golden Compass</Link>
           <IsLoading isLoading={loading}>
               {
                   (user) ?
                       <DropdownMenu>
                           <DropdownMenuTrigger asChild className={"cursor-pointer"}>

                               <Avatar>
                                   <AvatarImage src={user?.avatar?.url}/>
                                   <AvatarFallback>{user?.username?.substring(0,2).toUpperCase()}</AvatarFallback>
                               </Avatar>
                           </DropdownMenuTrigger>
                           <DropdownMenuContent className="w-40" align="start">
                               <DropdownMenuGroup>
                                   <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                   <DropdownMenuItem>
                                      <Link to={"/profile"}>Profile</Link>
                                       <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                                   </DropdownMenuItem>
                                   {
                                     user.role?.includes("admin") &&  <DropdownMenuItem
                                       onClick={()=>navigate("/admin/dashboard")}>
                                           dashboard
                                           <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                                       </DropdownMenuItem>
                                   }
                                   <DropdownMenuItem>
                                       Settings
                                       <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                                   </DropdownMenuItem>
                               </DropdownMenuGroup>
                               <DropdownMenuSeparator />
                               <DropdownMenuGroup>
                                   <DropdownMenuItem className={"text-red-500 flex cursor-pointer gap-2 group"}
                                   onClick={logoutHandler}>
                                       {
                                           logoutLoading ? <p>...</p> :
                                             <>
                                                 <RiLogoutBoxRLine className={"group-hover:translate-x-2"}/><span>logout</span>
                                                 <DropdownMenuShortcut>⌘Q</DropdownMenuShortcut>
                                             </>
                                       }
                                   </DropdownMenuItem>
                               </DropdownMenuGroup>
                           </DropdownMenuContent>
                       </DropdownMenu> :
                       <div className={"space-x-10"}>
                           <Button variant={"outline"} asChild>
                               <Link to={"/auth/register"} >
                                   Regter
                               </Link>
                           </Button>
                           <Button  asChild>
                               <Link to={"/auth/login"} >
                                   Login
                               </Link>
                           </Button>
                       </div>
               }
           </IsLoading>

        </nav>
    )
}
import Header from "@/components/common/Header.tsx";
import {Outlet} from "react-router";

export default function Layout(){
    return(
        <main className={"container mx-auto"}>
            <Header/>
           <section className={"mt-10"}>
               <Outlet/>
           </section>
        </main>
    )
}
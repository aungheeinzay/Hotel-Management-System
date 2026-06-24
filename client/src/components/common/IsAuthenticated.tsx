// // import {useReactiveVar} from "@apollo/client/react";
// // import {isAuthenticatedVar} from "@/apolllo/apolloVar.ts";
// // import {useEffect} from "react";
// // import {useNavigate} from "react-router"
// //
// // export default function IsAuthenticated(fun:Function){
// //
// //     return (...arg:any[])=>{
// //         const navigate = useNavigate();
// //         const isauthenticated = useReactiveVar(isAuthenticatedVar)
// //         useEffect(()=>{
// //             if (!isauthenticated){
// //                 navigate("/auth/login")
// //             }
// //         },[isauthenticated])
// //         return fun(...arg)
// //     }
// //
// // }
//
// import { useReactiveVar } from "@apollo/client/react";
// import {isAuthenticatedVar, loadingVar} from "@/apolllo/apolloVar.ts";
// import { useEffect } from "react";
// import { useNavigate } from "react-router";
//
// export default function IsAuthenticated(Component: React.FunctionComponent) {
//
//     return function WrappedComponent(props: any) {
//         const navigate = useNavigate();
//         const isauthenticated = useReactiveVar(isAuthenticatedVar);
//         const isGlobalLoading = useReactiveVar(loadingVar)
//
//         useEffect(() => {
//             if (isGlobalLoading){
//                 console.log("isGloabalLoading",isGlobalLoading)
//             }
//             if (!isGlobalLoading && !isauthenticated) {
//                 console.log("loading",isGlobalLoading)
//                 console.log("auth",isauthenticated)
//                 navigate("/auth/login");
//             }
//         }, [isauthenticated, navigate,isGlobalLoading]);
//
//
//         if (!isauthenticated) return null;
//
//         return <Component {...props} />;
//     };
// }
import { useReactiveVar } from "@apollo/client/react";
import {isAuthenticatedVar, loadingVar, userInfoVar} from "@/apolllo/apolloVar.ts"; // loadingVar ပါ ယူမယ်
import { useEffect } from "react";
import { useNavigate } from "react-router";

export default function IsAuthenticated(Component: React.ComponentType<any>,role?:string) {
    return function WrappedComponent(props:any) {
        const navigate = useNavigate();
        const isauthenticated = useReactiveVar(isAuthenticatedVar);
        const isGlobalLoading = useReactiveVar(loadingVar);
        const userInfo = useReactiveVar(userInfoVar)
        console.log("userInfo",userInfo)

        useEffect(() => {
            // စစ်ဆေးဆဲ (Loading) ဖြစ်နေရင် ဘာမှမလုပ်ဘဲ ခဏစောင့်နေမယ်
            if (isGlobalLoading) return;

            // Loading လည်းပြီးသွားပြီ၊ User လည်း login မဝင်ရသေးဘူးဆိုမှ Login page ကို ပို့မယ်
            if (!isauthenticated) {
                navigate("/auth/login");
            }
            if (role && !userInfo?.role?.some(level=>level===role)){
                navigate("/")
            }
        }, [isauthenticated, isGlobalLoading, navigate]);


        if (isGlobalLoading || !isauthenticated) {
            return null;
        }

        return <Component {...props} />;
    };
}
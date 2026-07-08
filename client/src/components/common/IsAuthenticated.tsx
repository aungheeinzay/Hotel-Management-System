
import { useReactiveVar } from "@apollo/client/react";
import {isAuthenticatedVar, loadingVar, userInfoVar} from "@/apolllo/apolloVar.ts";
import { useEffect } from "react";
import { useNavigate } from "react-router";

export default function IsAuthenticated(Component: React.ComponentType<any>,role?:string) {
    return function WrappedComponent(props:any) {
        const navigate = useNavigate();
        const isauthenticated = useReactiveVar(isAuthenticatedVar);
        const isGlobalLoading = useReactiveVar(loadingVar);
        const userInfo = useReactiveVar(userInfoVar)

        useEffect(() => {

            if (isGlobalLoading)return
            if (!isauthenticated) {
                navigate("/auth/login");
            }
            const hasRole = userInfo?.role?.some((rol=>rol==role))
            if (role && !hasRole ){
                console.log("role is ",role)
                navigate("/")
            }
        }, [isauthenticated, isGlobalLoading, navigate]);

        if (isGlobalLoading) {
            return <div className="h-screen w-screen flex items-center justify-center">Loading Application...</div>;
        }
        if (isGlobalLoading || !isauthenticated) {
            return null;
        }


        return <Component {...props} />;
    };
}
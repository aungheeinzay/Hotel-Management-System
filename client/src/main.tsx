import { StrictMode } from "react"
import { createRoot } from "react-dom/client"

import "./index.css"
import { ThemeProvider } from "@/components/theme-provider.tsx"
import {createBrowserRouter} from "react-router";
import {RouterProvider} from "react-router/dom";
import {ApolloProvider} from "@apollo/client/react";
import client from "@/apolllo/apolloClient.ts";
import Layout from "@/components/layout/Layout.tsx";
import HomePage from "@/components/pages/HomePage.tsx";
import DetailPage from "@/components/pages/DetailPage.tsx";
import RegisterPage from "@/components/pages/RegisterPage.tsx";
import {Toaster} from "sonner";
import LoginPage from "@/components/pages/LoginPage.tsx";
import {DashboardPage} from "@/components/pages/DashBoardPage.tsx";
import ProfilePage from "@/components/pages/ProfilePage.tsx";
import {ForgetPasswordPage} from "@/components/pages/ForgetPasswordPage.tsx";
import ResetPasswordPage from "@/components/pages/ResetPasswordPage.tsx";
import BookingPage from "@/components/pages/BookingPage.tsx";




const router = createBrowserRouter([
    {
        path:"/",
        element:<Layout/>,
        children:[
            {
                index:true,
                element:<HomePage/>
            },
            {
                path:"auth/register",
                element:<RegisterPage/>
            },
            {
                path:"auth/login",
                element:<LoginPage/>
            },
            {
                path:"dashboard",
                element:<DashboardPage/>
            },
            {
                path:"profile",
                element:<ProfilePage/>
            },
            {
                path:":id",
                element:<DetailPage/>
            },
            {
                path:"auth/forgetPassword",
                element:<ForgetPasswordPage/>
            },
            {
                path:"resetPassword/:token",
                element:<ResetPasswordPage/>
            },
            {
                path:"/bookings/:bookingId/payment",
                element:<BookingPage/>
            }
        ]
    }
])
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
     <ApolloProvider client={client}>
         <Toaster/>
         <RouterProvider router={router}/>
     </ApolloProvider>
    </ThemeProvider>
  </StrictMode>
)

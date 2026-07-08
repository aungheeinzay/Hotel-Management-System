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
import MyBookingPage from "@/components/pages/MyBookingPage.tsx";
import InvoicePage from "@/components/pages/InvoicePage.tsx";
import AdminLayout from "@/components/layout/AdminLayout.tsx";
import DashboardContainer from "@/components/admin/dashboard/DashboardContainer.tsx";
import ManageRoom from "@/components/admin/room/ManageRoom.tsx";
import CreateRoom from  "@/components/admin/room/CreateRoom.tsx"
import UpdateRoom from "@/components/admin/room/UpdateRoom.tsx";




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
            },
            {
                path:"/bookings/me/:id",
                element:<MyBookingPage/>
            },
            {
                path:"bookingInvoice/:bookingId",
                element:<InvoicePage/>
            }
        ]
    },
    {
        path:"/admin/dashboard",
        element:<AdminLayout/>,
        children:[
            {
                index:true,
                element:<DashboardContainer/>
            },
            {
                path:"manageRoom",
                element:<ManageRoom/>
            },
            {
                path:"createRoom",
                element:<CreateRoom/>
            },
            {
                path:"updateRoom/:roomId",
                element:<UpdateRoom/>
            }
        ]
    }
])
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
        <ApolloProvider client={client}>
            <div
                className="absolute -z-10 inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] pointer-events-none"></div>
            <Toaster/>
            <RouterProvider router={router} />
        </ApolloProvider>
    </ThemeProvider>
  </StrictMode>
)

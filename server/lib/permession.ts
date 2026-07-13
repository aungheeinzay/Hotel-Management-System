import {allow, and, rule, shield} from "graphql-shield";


const isAuthenticated = rule({cache:"contextual"})(async (parent,arg,ctx)=>{
    return ctx?.user !== null;
})
const isAdmin = rule({cache:"contextual"})(async (parent,arg,ctx)=>{
    return ctx?.user?.role.includes("admin")
})
export const permession = shield({
    Query: {
        currentUser:isAuthenticated,
        getDashBoardMetaData:and(isAuthenticated,isAdmin),
        getBookingById:isAuthenticated,
        getBookingByUserId:isAuthenticated,
        getBookingForInvoice:isAuthenticated,
        logout:isAuthenticated,
        getAllBookings:allow
    },
    Mutation:{
        login:allow,
        updateProfile:isAuthenticated,
        createBooking:isAuthenticated,
        createAndUpdateReview:isAuthenticated,
        stripeCheckoutSession:isAuthenticated,
        updateBooking:isAuthenticated,
        createNewRoom:and(isAuthenticated,isAdmin),
        deleteRoom:and(isAuthenticated,isAdmin),
        updateRoom:and(isAuthenticated,isAdmin),
        uploadAvatar:isAuthenticated,
        updatePassword:isAuthenticated,
        forgetPassword:isAuthenticated,
        resetPassword:isAuthenticated
    }
},{
    allowExternalErrors:true,
    debug:true
})
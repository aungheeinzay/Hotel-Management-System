import {ApolloClient, HttpLink, InMemoryCache} from "@apollo/client";

const uri =import.meta.env.VITE_SERVER_URL+"/graphql"
const httpLink = new HttpLink({
    uri ,
    credentials:"include"
})
const client = new ApolloClient({
    link:httpLink,
    cache:new InMemoryCache()
})

export default client
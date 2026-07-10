import {ApolloClient, ApolloLink, HttpLink, InMemoryCache} from "@apollo/client";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";
import {OperationTypeNode} from "graphql/language";

const uri =import.meta.env.VITE_SERVER_URL+"/graphql"
const wsUri = import.meta.env.VITE_GRAPHQL_WS

const wsLink = new GraphQLWsLink(
    createClient({
        url:wsUri
    })
)

const httpLink = new HttpLink({
    uri ,
    credentials:"include"
})

const splitLink = ApolloLink.split(
    ({ operationType }) => {
        return operationType === OperationTypeNode.SUBSCRIPTION;
    },
    wsLink,
    httpLink
);
const client = new ApolloClient({
    link:splitLink,
    cache:new InMemoryCache()
})

export default client
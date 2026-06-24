import {GraphQLError} from "graphql/error";

export class NotFoundError extends GraphQLError{
    constructor(errMessage:string) {
        super(errMessage,{
            extensions:{
                code:"NOT_FOUND"
            }
        });
    }
}
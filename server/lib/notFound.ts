import {GraphQLError} from "graphql/error/index.js";

export class NotFoundError extends GraphQLError{
    constructor(errMessage:string) {
        super(errMessage,{
            extensions:{
                code:"NOT_FOUND"
            }
        });
    }
}
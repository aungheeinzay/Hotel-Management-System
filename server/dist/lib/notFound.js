import { GraphQLError } from "graphql/error/index.js";
export class NotFoundError extends GraphQLError {
    constructor(errMessage) {
        super(errMessage, {
            extensions: {
                code: "NOT_FOUND"
            }
        });
    }
}

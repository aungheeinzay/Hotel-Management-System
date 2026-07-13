import {GraphQLError} from "graphql/error/index.js";

export default (fun:Function)=>(...args:any[])=>{
    return Promise.resolve(fun(...args))
        .catch((err)=>{
            console.log(err)
            console.log("error",err.name)
            console.log("message",err.message)
            if (err instanceof GraphQLError){

                console.log("instance of graphql error")
                throw err
            }
            if(err.name==="CastError"){
                throw new Error(`Data not Found: ${err.path}`)
            }
            if (err.name==="ValidationError" || err.name==="MongooseError"){
                const message = err.message.split(":")
                console.log(message[2].trim())
                throw new Error(message[2].trim())
            }

            throw err
        })
}


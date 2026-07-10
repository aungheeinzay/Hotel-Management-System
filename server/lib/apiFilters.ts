import mongoose from "mongoose";
import type {RoomFilters} from "./type";
import {json} from "express";
import * as tty from "node:tty";

export default class ApiFilters{
    model:any
    constructor(model:any) {
        this.model = model.find()
    }
    search(query:string){
    const searchById={
        _id:query
    }
    const searchByKeyword={
        title:{
            $regex:query,
            $options:"i"
        }
    }
    const searchQuery = query ? mongoose.isValidObjectId(query) ? searchById :searchByKeyword : {}
        this.model = this.model.find(searchQuery)
        return this
    }
    filter(filter:RoomFilters){
        if (!filter)return this
        const formattedObj={} as any
        for (const [key,value] of Object.entries(filter)){
            const opreatorObj={} as any
            if (value && typeof value ==="object"){
                for (const [opKey,opValue] of Object.entries(value)){
                  if (  ["gt","lt","lte","lte"].includes(opKey)){
                    opreatorObj[`$${opKey}`] =opValue;
                  }
                  formattedObj[key] = opreatorObj
                }
            }
                else {
                formattedObj[key] = value
            }
                if (!(!!value)){
                    Reflect.deleteProperty(formattedObj,key)
                }
        }
        // const toString = JSON.stringify(filter)
        // const refactorStr = toString.replace(/\b(gt|gte|lt|lte)\b/g,(match)=>`$${match}`)
        // console.log("refactor str:",refactorStr)
        this.model = this.model.find(formattedObj)
         return this
    }
    pagination(page:string | number,perPage:string | number){
        const currentPage = +page || 1
        const showItem =+perPage || 10
        const skipItem = showItem *(currentPage -1)
        this.model =this.model.limit(showItem).skip(skipItem)
        return this
    }
    count(){
        const count:number = this.model.clone().countDocuments()
        return count
    }
}
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar.tsx";
import {useRef, useState} from "react";
import {Input} from "@/components/ui/input.tsx";
import * as React from "react";
import {useMutation, useReactiveVar} from "@apollo/client/react";
import {userInfoVar} from "@/apolllo/apolloVar.ts";
import {Button} from "@/components/ui/button.tsx";
import {AVATAR_UPLOAD} from "@/graphql/mutation/user.ts";

import {CombinedGraphQLErrors} from "@apollo/client/errors";
import {cn} from "@/lib/utils.ts";
import {CURRENT_USER} from "@/graphql/queries/user.ts";

export default function AvatarUpload(){
    const user=useReactiveVar(userInfoVar)
    const inputRef = useRef<HTMLInputElement>(null)
    const [avatar,setAvatar] = useState("")
    //const userInfo = useReactiveVar(userInfoVar)
const [uploadAvatar,{error,loading}] = useMutation(AVATAR_UPLOAD,{
    refetchQueries:[CURRENT_USER]
})

    function onChangeHandler(e:React.ChangeEvent<HTMLInputElement>){
        console.log(e.target.files)
        const reader = new FileReader();
        reader.onload=async()=>{
            if (reader.readyState==2){
                setAvatar(reader.result as string)
                console.log(reader.result)
               const res = await uploadAvatar({
                   variables:{
                       image:reader.result
                   }
               })
                if (res.data){
                    // const updatedUserInfo = {
                    //     ...userInfo,
                    //     avatar: {
                    //         url:reader.result as string,
                    //         public_id:"id"
                    //
                    //     }
                    // };
                    // userInfoVar(updatedUserInfo);

                    console.log(res.data)
                }
                if (CombinedGraphQLErrors.is(error)){
                    console.log(error.errors)
                }
            }
        }
        reader.readAsDataURL(e.target.files![0])

    }
    function handleInput(){
        inputRef.current!.click()
    }
    return(
        <Card>
            <CardHeader>
                <CardTitle>Upload Avatar</CardTitle>
                <CardDescription>upload your profile photo</CardDescription>
            </CardHeader>
            <CardContent>
                <div className={"flex justify-between items-center"}>
                    <Avatar className={'w-12 h-12'}>
                        <AvatarImage src={avatar || user?.avatar?.url} className={cn(loading && "opacity-5")}/>
                        <AvatarFallback>
                            {user?.username?.substring(0,2).toUpperCase()}
                        </AvatarFallback>
                    </Avatar>
                    <Input
                    id={"avatar"}
                    type={"file"}
                    accept={"image/*"}
                    onChange={onChangeHandler}
                    size={.5}
                    hidden={true}
                    ref={inputRef}
                    />
                    <Button disabled={loading} onClick={handleInput}   type={"button"}>{loading ? "uploading.." : "upload"}</Button>
                </div>
            </CardContent>
        </Card>
    )
}
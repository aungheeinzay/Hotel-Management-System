import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle
} from "@/components/ui/card.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Controller, useForm} from "react-hook-form";
import {Field, FieldError, FieldGroup, FieldLabel} from "@/components/ui/field.tsx";
import {Input} from "@/components/ui/input.tsx";
import {type userNameEmailForm, userNameEmailSchema} from "@/schema/userSchema.ts";
import {useMutation, useReactiveVar} from "@apollo/client/react";
import {userInfoVar} from "@/apolllo/apolloVar.ts";
import {zodResolver} from "@hookform/resolvers/zod";
import { useState} from "react";
import {USERNAME_EMAIL_UPDATE} from "@/graphql/mutation/user.ts";

import {toast} from "sonner";
import {RiEditBoxLine} from "@remixicon/react";

export default function UserNameEmailUpdate(){
    const user = useReactiveVar(userInfoVar)
    const [updateProfile,{loading}] = useMutation<{updateProfile:boolean}>(USERNAME_EMAIL_UPDATE)
    const [disabled,setDisabled] =useState(true)
    const form = useForm<userNameEmailForm>({
        defaultValues:{
            username:user?.username,
            email: user?.email
        },
        resolver:zodResolver(userNameEmailSchema)
    })
    function editHandler(e: React.MouseEvent<HTMLButtonElement>)
    {   e.preventDefault()
        setDisabled(false)

    }
    const onSubmit=async (data:userNameEmailForm)=>{
        const res = await updateProfile({
            variables:{
                profileInput:data
            }
        })
        console.log(res)
        if (res.data && res.data.updateProfile===true){
            setDisabled(true)
            toast.success("update profile successfully")
        }
    }

    return(
        <Card>
            <CardHeader>
                <CardTitle>Bug Report</CardTitle>
                <CardDescription>
                    Help us improve by reporting bugs you encounter.
                </CardDescription>
                <CardAction>
                    {
                        disabled ? <Button type="button"
                                           variant={"outline"}
                                           onClick={editHandler}
                            >
                                <RiEditBoxLine /> Edit
                        </Button> :
                            <Button type={"submit"}
                                    form={"form-rhf-demo"}
                                    variant={"default"}
                                    disabled={loading}
                            >{loading ? "Updating..." : "Update"}</Button>
                    }
                </CardAction>
            </CardHeader>
            <CardContent>
                <div className={"grid "}>
                    <form id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)}>
                        <FieldGroup>
                            <Controller
                                name="username"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel htmlFor="form-rhf-demo-title">
                                            username
                                        </FieldLabel>
                                        <Input
                                            {...field}
                                            id="form-rhf-demo-title"
                                            aria-invalid={fieldState.invalid}
                                            disabled={disabled}
                                            autoComplete="off"

                                        />
                                        {fieldState.invalid && (
                                            <FieldError errors={[fieldState.error]} />
                                        )}
                                    </Field>
                                )}
                            />


                            <Controller
                                name="email"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel htmlFor="form-rhf-demo-title">
                                            email
                                        </FieldLabel>
                                        <Input
                                            {...field}
                                            id="form-rhf-demo-title"
                                            aria-invalid={fieldState.invalid}
                                            disabled={disabled}
                                            autoComplete="off"
                                        />
                                        {fieldState.invalid && (
                                            <FieldError errors={[fieldState.error]} />
                                        )}
                                    </Field>
                                )}
                            />

                        </FieldGroup>
                    </form>

                </div>
            </CardContent>
            <CardFooter>




            </CardFooter>
        </Card>

    )
}
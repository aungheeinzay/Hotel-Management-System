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

import {Field, FieldError, FieldGroup, FieldLabel} from "@/components/ui/field.tsx";
import {Controller, useForm} from "react-hook-form";
import {Input} from "@/components/ui/input.tsx";
import {updatePasswordSchema, type updatePasswordSchemaForm} from "@/schema/userSchema.ts";
import {useMutation} from "@apollo/client/react";
import {UPDATE_PASSWORD} from "@/graphql/mutation/user.ts";
import {toast} from "sonner";
import {zodResolver} from "@hookform/resolvers/zod";

const updatePasswordField=[
    {   id:1,
        name:"oldPassword",
    },
    {
        id:2,
        name:"newPassword"
    },
    {   id:3,
        name:"conformPassword"
    }
] as {id:number,name:"oldPassword" | "newPassword" | "conformPassword"}[]

export default function UpdatePassword(){

    const form = useForm<updatePasswordSchemaForm>({
        defaultValues:{
            oldPassword:"",
            newPassword: "",
            conformPassword: ""
        },
        resolver:zodResolver(updatePasswordSchema)
    })
    const [updatePassword,{loading}] = useMutation(UPDATE_PASSWORD)
    const onSubmit = async (data:updatePasswordSchemaForm)=>{
    await updatePassword({
        variables:{
            ...data
        }
    }).then(()=>{
        form.reset()
        toast.success("update password successfully")
    }).catch(err=>{
        toast.error(err?.message)
    })
    }
    return (
        <Card>
            <CardHeader>
                <CardTitle>Update Password</CardTitle>
                <CardDescription>
                    Remmber Your New Pssword.
                </CardDescription>
                <CardAction>


                            <Button type={"submit"}
                                    form={"form-rhf-password"}
                                    variant={"default"}
                                    disabled={loading}
                            >Update</Button>

                </CardAction>
            </CardHeader>
            <CardContent>
                <div className={"grid "}>
                    <form id="form-rhf-password" onSubmit={form.handleSubmit(onSubmit)}>
                        <FieldGroup>
                            {
                                updatePasswordField.map(({name,id})=>(
                                    <Controller
                                        key={id}
                                        name={name}
                                        control={form.control}
                                        render={({ field, fieldState }) => (
                                            <Field data-invalid={fieldState.invalid}>
                                                <FieldLabel htmlFor="form-rhf-demo-title">
                                                    {name}
                                                </FieldLabel>
                                                <Input
                                                    {...field}
                                                    id="form-rhf-demo-title"
                                                    aria-invalid={fieldState.invalid}

                                                    autoComplete="off"

                                                />
                                                {fieldState.invalid && (
                                                    <FieldError errors={[fieldState.error]} />
                                                )}
                                            </Field>
                                        )}
                                    />
                                ))
                            }

                        </FieldGroup>
                    </form>

                </div>
            </CardContent>
            <CardFooter>




            </CardFooter>
        </Card>

    )
}
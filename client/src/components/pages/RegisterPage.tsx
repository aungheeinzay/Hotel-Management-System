"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"



import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Field,

    FieldError,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {RegisterSchema, type RegisterSchemaForm} from "@/schema/userSchema.ts";
import {Link} from "react-router";
import {useMutation} from "@apollo/client/react";
import {REGISTER_USER} from "@/graphql/mutation/user.ts";
import {toast} from "sonner";
import {CombinedGraphQLErrors} from "@apollo/client/errors";

export default function RegisterPage() {
    const form = useForm<RegisterSchemaForm>({
        resolver: zodResolver(RegisterSchema),
        defaultValues: {
            username: "",
            email: "",
            password: ""
        },
    })
const [register,{loading}] = useMutation(REGISTER_USER)

    async function onSubmit(data:RegisterSchemaForm) {
        console.log("bro clicking me")
        console.log("data",data)
        try {
            await register({
                variables:{
                 userInput:{
                     ...data
                 }
                }
            })
            form.reset()
            toast.success("Register sccessfully")

        }catch (error){
         CombinedGraphQLErrors.is(error) &&
         toast.error(error.message,{
             style:{
                 color:"red"

             }
         })
        }
    }

    return (
        <Card className="w-full sm:max-w-md mx-auto">
            <CardHeader>
                <CardTitle>Register</CardTitle>
                <CardDescription>
                    Fill the information to register for best experiences
                </CardDescription>
            </CardHeader>
           
                <CardContent>
                    <form id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)}>
                        <FieldGroup>
                            <Controller
                                name="username"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel htmlFor="form-rhf-demo-username">
                                            username
                                        </FieldLabel>
                                        <Input
                                            {...field}
                                            id="form-rhf-demo-username"
                                            aria-invalid={fieldState.invalid}

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
                                        <FieldLabel htmlFor="form-rhf-demo-email">
                                            email
                                        </FieldLabel>
                                        <Input
                                            {...field}
                                            id="form-rhf-demo-email"
                                            aria-invalid={fieldState.invalid}

                                            autoComplete="off"
                                        />
                                        {fieldState.invalid && (
                                            <FieldError errors={[fieldState.error]} />
                                        )}
                                    </Field>
                                )}
                            />
                            <Controller
                                name="password"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel htmlFor="form-rhf-demo-password">
                                            password
                                        </FieldLabel>
                                        <Input
                                            {...field}
                                            id="form-rhf-demo-password"
                                            aria-invalid={fieldState.invalid}

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
            </CardContent>
            <CardFooter>
                <Field orientation="horizontal" className={""}>
                    <Button type="button" variant="outline" onClick={() => form.reset()}>
                        Reset
                    </Button>
                    <Button disabled={loading} type="submit" form="form-rhf-demo" className={"cursor-pointer"}>
                        register
                    </Button>
                </Field>
               Already have an account?
                <Link to={"/auth/login"} className={"text-blue-700 underline"}>login</Link>
            </CardFooter>
        </Card>
    )
}

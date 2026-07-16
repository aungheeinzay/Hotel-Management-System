
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
import {LoginSchema, type LoginSchemaForm} from "@/schema/userSchema.ts";
import {Link, useNavigate} from "react-router";
import {useMutation} from "@apollo/client/react";
import {LOGIN_USER} from "@/graphql/mutation/user.ts";
import {toast} from "sonner";
import {CombinedGraphQLErrors} from "@apollo/client/errors";
import {isAuthenticatedVar, loadingVar, userInfoVar} from "@/apolllo/apolloVar.ts";
import type {User} from "@/lib/type.ts";
import {CURRENT_USER} from "@/graphql/queries/user.ts";

export default function LoginPage() {
   // const path =useParams<{redirectTo?:string}>()
    const navigate = useNavigate()
    const form = useForm<LoginSchemaForm>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: "",
            password: ""
        },
    })
    const [login,{loading}] = useMutation(LOGIN_USER,{
        refetchQueries:[CURRENT_USER]
    })

    async function onSubmit(data:LoginSchemaForm) {


        try {
         const  {data:loginData} = await login({
                variables:{
                    userInput:{
                        ...data
                    }
                }
            }) as {data:{login:Omit<User, "password">}}
            form.reset()
            toast.success("Login sccessfully")
            userInfoVar(loginData.login)
            isAuthenticatedVar(true)
            loadingVar(loading)
             navigate("/")
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
            <CardFooter className={"flex flex-col gap-y-10"}>
                <Field orientation="horizontal" className={""}>
                    <Button type="button" variant="outline" onClick={() => form.reset()}>
                        Reset
                    </Button>
                    <Button disabled={loading} type="submit" form="form-rhf-demo" className={"cursor-pointer"}>
                        login
                    </Button>
                </Field>
                <div >
                    create new account?
                    <Link to={"/auth/register"} className={"text-blue-700 underline"}>register</Link> or
                    <Link to={"/auth/forgetPassword"}> forget password</Link>
                </div>
            </CardFooter>
        </Card>
    )
}

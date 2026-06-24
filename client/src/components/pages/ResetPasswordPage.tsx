import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Field, FieldError, FieldGroup, FieldLabel} from "@/components/ui/field.tsx";
import {Controller, useForm} from "react-hook-form";
import {Input} from "@/components/ui/input.tsx";
import {Button} from "@/components/ui/button.tsx";
import {
    type resetPasswordForm,
    resetPasswordSchema
} from "@/schema/userSchema.ts";
import {zodResolver} from "@hookform/resolvers/zod";
import {useMutation} from "@apollo/client/react";
import { RESET_PASSWORD} from "@/graphql/mutation/user.ts";
import {toast} from "sonner";
import {useNavigate, useParams} from "react-router";


export default function ResetPasswordPage(){
    const navigate = useNavigate()
    const {token} = useParams<{token:string}>()
    const [forgetPassword,{loading}] = useMutation<{resetPassword:boolean}>(RESET_PASSWORD)
    const form =useForm<resetPasswordForm>({
        defaultValues:{
            newPassword: "",
            conformPassword:""
        },
        resolver:zodResolver(resetPasswordSchema)
    })
    const onSubmit=async (data:resetPasswordForm)=>{
    const obj={
        token,
        newPassword:data.newPassword
    }
        try {
            const res = await forgetPassword({
                variables:obj
            })
            console.log(res)
            if (res.data?.resetPassword){
                form.reset()
                navigate("/login")
                toast.success("reset password successfully")
            }
        }catch (err:any){
            toast.error(err?.message)
        }
    }
    return (
        <Card className="w-full sm:max-w-md mx-auto">
            <CardHeader>
                <CardTitle>create a new password</CardTitle>

            </CardHeader>

            <CardContent>
                <form id="form-rhf-forgetPassword" onSubmit={form.handleSubmit(onSubmit)}>
                    <FieldGroup>

                        <Controller
                            name="newPassword"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="form-rhf-demo-newPassword">
                                        conform password
                                    </FieldLabel>
                                    <Input
                                        {...field}
                                        id="form-rhf-demo-newPassword"
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
                            name="conformPassword"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="form-rhf-demo-conformPassword">
                                        conform password
                                    </FieldLabel>
                                    <Input
                                        {...field}
                                        id="form-rhf-demo-conformPassword"
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

                    <Button disabled={loading} type="submit" form="form-rhf-forgetPassword" className={"cursor-pointer w-full"}>
                        {loading ? "reseting..." : "reset"}
                    </Button>
                </Field>
            </CardFooter>
        </Card>
    )
}
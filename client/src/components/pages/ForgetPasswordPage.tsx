import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Field, FieldError, FieldGroup, FieldLabel} from "@/components/ui/field.tsx";
import {Controller, useForm} from "react-hook-form";
import {Input} from "@/components/ui/input.tsx";
import {Button} from "@/components/ui/button.tsx";
import {type forgetPasswordForm, forgetPasswordSchema} from "@/schema/userSchema.ts";
import {zodResolver} from "@hookform/resolvers/zod";
import {useMutation} from "@apollo/client/react";
import {FORGET_PASSWORD} from "@/graphql/mutation/user.ts";
import {toast} from "sonner";


export const ForgetPasswordPage=()=>{
    const [forgetPassword,{loading}] = useMutation<{forgetPassword:boolean}>(FORGET_PASSWORD)
    const form =useForm<forgetPasswordForm>({
        defaultValues:{
            email: ""
        },
        resolver:zodResolver(forgetPasswordSchema)
    })
    const onSubmit=async (data:forgetPasswordForm)=>{
        try {
            const res = await forgetPassword({
                variables:{
                    customerEmail:data.email
                }
            })
            console.log(res)
            if (res.data?.forgetPassword){
                toast.success("we have sent email check your inbox")
            }
        }catch (err:any){
            toast.error(err?.message)
        }
    }
    return (
        <Card className="w-full sm:max-w-md mx-auto">
            <CardHeader>
                <CardTitle>Recover your account</CardTitle>

            </CardHeader>

            <CardContent>
                <form id="form-rhf-forgetPassword" onSubmit={form.handleSubmit(onSubmit)}>
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

                    </FieldGroup>

                </form>
            </CardContent>
            <CardFooter className={"flex flex-col gap-y-10"}>
                <Field orientation="horizontal" className={""}>

                    <Button disabled={loading} type="submit" form="form-rhf-forgetPassword" className={"cursor-pointer w-full"}>
                        {loading ? "sending..." : "send"}
                    </Button>
                </Field>
            </CardFooter>
        </Card>
    )
}
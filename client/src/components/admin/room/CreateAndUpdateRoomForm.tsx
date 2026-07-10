import {Field, FieldError, FieldGroup, FieldLabel} from "@/components/ui/field.tsx";
import {Controller, useForm} from "react-hook-form";
import {Input} from "@/components/ui/input.tsx";

import {Button} from "@/components/ui/button.tsx";
import {createRoomInputSchema, type CreateRoomSchemaForm} from "@/schema/roomSchema.ts";
import {zodResolver} from "@hookform/resolvers/zod";
import {InputArr} from "@/components/admin/room/FormInputArray.tsx";
import {Checkbox} from "@/components/ui/checkbox.tsx";
import {Textarea} from "@/components/ui/textarea.tsx";
import {useEffect, useRef, useState} from "react";
import { RiCloseLargeLine, RiImageUploadLine} from "@remixicon/react";
import {cn} from "@/lib/utils.ts";
import {toast} from "sonner";
import {useMutation} from "@apollo/client/react";
import {CREATE_NEW_ROOM, UPDATE_ROOM} from "@/graphql/mutation/room.ts";
import type {UpdateRoom} from "@/lib/type.ts";
import {useNavigate} from "react-router";
import {EDIT_ROOM_BY_ID} from "@/graphql/queries/room.ts";


interface CreateUpdateRoomFormProps{
    isEdit:boolean;
    roomData?:UpdateRoom
}

export default function CreateAndUpdateRoomForm({isEdit,roomData}:CreateUpdateRoomFormProps){
    const navigate = useNavigate()
    const [serverImages,setServerImages]=useState<{url:string,public_id:string}[] >([])
    const [images,setImages] = useState<string[]>([])
    const [imageLoading,setImageLoading] = useState(false)
    const [createNewRoom,{loading:createRoomLoading}] = useMutation<{
        createNewRoom:{message:string}
    }>(CREATE_NEW_ROOM)
    const [updateRoom,{loading:updateLoading}] = useMutation<{
        updateRoom:{message:string}
    }>(UPDATE_ROOM)
    useEffect(() => {
    setServerImages(roomData?.images || []);
    }, [isEdit,roomData]);
    const imageInputRef = useRef<HTMLInputElement>(null)
    const form = useForm<CreateRoomSchemaForm>({
        defaultValues : {
            roomNumber: "",
            capacity: 1,
            description:"",
            images:images || [],
            isAvailable: false,
            type: "",
            location: "",
            title: "",
            pricePerNight:100,

        },
        resolver:zodResolver(createRoomInputSchema)
    })


    useEffect(() => {
        form.setValue("images",images)
    }, [images]);

    useEffect(() => {
      if (isEdit && roomData){
          form.reset({
              ...roomData,
              images:images || []
          })
      }
    }, [isEdit,roomData,form]);

    const handleFile=(file:FileList | null)=>{
        if (!file)return;
        if (file.length+images.length+serverImages.length>6)return toast.info("cannot upload images more than 6")
        let loadCount=0;
        setImageLoading(true)
        for (const [key,value] of Object.entries(file)){
            if (key=="length")continue;
            const reader = new FileReader();
            reader.onloadend=()=>{
                if (reader.result){
                    setImageLoading(false)
                    setImages((pre)=>[...pre,reader.result as string])
                }
                loadCount++
            }


            loadCount===file.length && setImageLoading(false)
            reader.readAsDataURL(value)
        }

    }
    function RemoveImage(index:number){
        const newImage = images.filter((_,i)=>i!==index)
        setImages([...newImage])
        form.setValue("images",newImage,{shouldValidate:true})
    }

    function RemoveServerImages(publicId:string){
        const newServerImages = serverImages.filter(({public_id})=>public_id!==publicId)
        setServerImages(newServerImages)
    }

    async function onSubmit(value:CreateRoomSchemaForm){
            if (isEdit){
                const PublicId = serverImages?.map(img=>img.public_id)
                const removeImage = roomData?.images.filter((img)=>!PublicId?.includes(img.public_id)).map((img)=>img.public_id)

                const {data,error} = await updateRoom({
                    variables:{
                        roomId:roomData?.id,
                        roomInput:{...value},
                        removeImage
                    },
                    refetchQueries: [
                        {
                            query: EDIT_ROOM_BY_ID,
                            variables: { roomId: roomData?.id }
                        }
                    ]
                })
                if (data?.updateRoom){
                    form.reset()

                    setImages([])
                    setServerImages([])
                    form.reset()
                    navigate("/admin/dashboard/manageRoom")
                    return toast.success(data.updateRoom.message)
                }
                if (error){
                    return toast.error(error.message)
                }
            }
            const {data,error} = await createNewRoom({
                variables:{
                    roomInput:value
                }
            })
            if (data?.createNewRoom){

                form.reset()
                setImages([])
                setServerImages([])
                return toast.success(data.createNewRoom.message)
            }
            if (error){
                return toast.error(error.message)
            }


        console.log(value)
    }

    return (
        <div>
            <form id="form-rhf-addRoom" onSubmit={form.handleSubmit(onSubmit)}
                  className={"grid w-full grid-cols-3 gap-3"}>
                <FieldGroup className={"col-span-2 grid grid-cols-2 gap-2"}>
                    {
                        InputArr.map(({name,label,type})=>(

                            <Controller
                                key = {name}
                                name={name as keyof CreateRoomSchemaForm}
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel>
                                            {label}
                                        </FieldLabel>
                                        {
                                            type=="checkBox" ?
                                               <div className={"flex gap-2 items-center "}>

                                                   <Checkbox
                                                   checked={!!field.value}
                                                   onCheckedChange={field.onChange}/>    <p>is available or not</p>
                                               </div> : type=="textArea" ?
                                                 <Textarea
                                                     value={field.value!==undefined ? field.value+"" : ""}
                                                     onChange={field.onChange}
                                                 placeholder={"Type your description here!"}/>   :

                                        <Input
                                            type={type=="input" ? "text" : "number"}
                                            value={field.value !== undefined ? String(field.value) : ""}
                                            onChange={(e) => {
                                                const val = e.target.value;
                                                const parseVal = Number(val)
                                                if (name === "pricePerNight" || name === "capacity") {
                                                    field.onChange(isNaN(parseVal) ? "" : +val);
                                                } else {
                                                    field.onChange(val);
                                                }
                                            }}
                                            aria-invalid={fieldState.invalid}
                                            autoComplete="off"
                                        />
                                        }
                                        {fieldState.invalid && (
                                            <FieldError errors={[fieldState.error]} />
                                        )}
                                    </Field>
                                )}
                            />
                        ))
                    }

                </FieldGroup>
                <div className="relative border-2 border-dashed border-gray-300 rounded-lg overflow-hidden flex items-center justify-center ">
                 <div className={`grid grid-cols-3  self-start  gap-2 items-center`}>
                     {
                        (isEdit && serverImages.length >0) && serverImages.map(({url,public_id})=>(
                             <div key={public_id}
                                  className={cn("group  border-1 relative overflow-hidden")}>
                                 <img src={url} className={"object-cover grayscale group-hover:scale-120"}/>
                                 <RiCloseLargeLine
                                     className={"absolute -top-10 right-1 transition-all duration-500 ease-in-out group-hover:top-1 text-red-500 cursor-pointer"}
                                     onClick={()=>RemoveServerImages(public_id)}

                                 />
                             </div>
                         ))
                     }
                     {
                         imageLoading ? <p>loading...</p> :
                             images.length>0 && images.map(
                                 (img,i)=>(
                                     <div key={i}
                                          className={cn("group  border-1 relative overflow-hidden")}>
                                         <img src={img} className={"object-cover grayscale group-hover:scale-120"}/>
                                         <RiCloseLargeLine
                                             className={"absolute -top-10 right-1 transition-all duration-500 ease-in-out group-hover:top-1 text-red-500 cursor-pointer"}
                                             onClick={()=>RemoveImage(i)}
                                         />
                                     </div>
                                 )
                             )
                     }
                 </div>
                    <Controller
                        key="images"
                        name="images"
                        control={form.control}
                        render={({ field: { onChange, value, ...field }, fieldState }) => (
                            <Field data-invalid={fieldState.invalid} className="">




                                    <RiImageUploadLine
                                onClick={(e) => {
                                e.preventDefault();
                                imageInputRef.current?.click();
                                }}

                                        size={50}
                                className={` cursor-pointer absolute  left-1/2 -translate-x-1/2 z-10 p-1  shadow-sm
                                ${(images.length>0 ||( isEdit && roomData?.images.length!>0)) ? "bottom-0 bg-gray-900 rounded-t-lg border-dashed border-2" : "top-1/2 -translate-y-1/2 "}`}
                                    />


                                {/* Hidden File Input */}
                                <input
                                    {...field}
                                    type="file"
                                    multiple={true}
                                    disabled={images.length+serverImages.length>6 ? true : false}
                                    accept="image/*"
                                    ref={imageInputRef}
                                    style={{ display: "none" }}
                                    onChange={(e)=>handleFile(e.target.files)}
                                />

                                {fieldState.invalid && (
                                    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-20">
                                        <FieldError errors={[fieldState.error]} />
                                    </div>
                                )}
                            </Field>
                        )}
                    />
                </div>
                <hr className={"col-span-3"}/>
                <Button
                    form={"form-rhf-addRoom"}
                    disabled={!form.formState.isValid || createRoomLoading || updateLoading}
                    type={"submit"}
                    className={""}
                >{isEdit ? updateLoading ? "Editing...":"Edit Room" : createRoomLoading ? "creating...":"Create Room"}</Button>

                <Button

                    disabled={!form.formState.isValid}
                    type={"button"}
                    variant={"outline"}
                    className={"border-2 cursor-pointer"}

                    onClick={()=>isEdit ? navigate(-1) : form.reset()}
                >{isEdit ? 'Cancel' : "clear"}</Button>
            </form>



        </div>
    )
}
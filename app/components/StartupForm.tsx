"use client"

import {Input} from "@/components/ui/input";
import {useState,useActionState} from "react";
import {Textarea} from "@/components/ui/textarea";
import MDEditor from "@uiw/react-md-editor"
import {Button} from "@/components/ui/button";
import {Send} from "lucide-react";
import {formSchema} from "@/lib/VALIDATION";
import z from "zod";
import {useToast} from "@/hooks/use-toast"
import {useRouter} from "next/navigation"
import {createPitches} from "@/lib/actions";

const StartupForm = () => {
    const [error, setError] = useState<Record<string, string>>({})
    const [pitch,setPitch]=useState("")
    const {toast} = useToast()
    const router = useRouter()

    const handleFormSubmit=async(preState:any,formData:FormData)=>{
        try {
const formValues={
    title:formData.get("title") as string,
    description:formData.get("description") as string,
    category:formData.get("category") as string,
    link:formData.get("link") as string,
    pitch,
}
await formSchema.parseAsync(formValues)

            const result=await createPitches(preState,formData,pitch)
            if(result.status==='SUCCESS'){
                toast({
                    title:"Success",
                    description:"Your pitch has been submitted successfully",
                })
                router.push(`/startup/${result._id}`)
            }
            return result;
        }catch (e) {
            if (e instanceof z.ZodError) {
                const fieldErrors = e.flatten().fieldErrors;
                setError    (fieldErrors as unknown as Record<string, string>)
                toast({
                    title:"Error",
                    description:"Please check your input and try again",
                    variant:"destructive",
                    duration:5000,

                })
                return {...preState, error: 'validation failed', status:"ERROR"}
        }
            toast({
                title:"Error",
                description:"An Unexpected Error Occurred",
                variant:"destructive",
                duration:5000,
            })
                return {...preState, error: 'An Unexpected Error Occurred', status: 'ERROR'}}
    }
    const [state,formAction,isPending] = useActionState(handleFormSubmit,
        { error:"",status:"INITIAL",})


    return (
        <form action={formAction} className="startup-form">
<div>
    <label htmlFor="title" className="startup-form_label">Title </label>
    <Input type="text" name="title" id="title" className="startup-form_input" required placeholder="Startup Title"/>
    {error.title && <p className="startup-form_error">{error.title}</p>}
</div>

<div>
    <label htmlFor="desciption" className="startup-form_label">Description</label>
    <Textarea name="description" id="desciption" className="startup-form_textarea" required placeholder="Startup Description"/>
    {error.description && <p className="startup-form_error">{error.description}</p>}
</div>

<div>
    <label htmlFor="category" className="startup-form_label">Category </label>
    <Input name="category" id="category" className="startup-form_input" required placeholder="Startup Category(e.g. Tech, Education, Finance, etc.)"/>
    {error.category && <p className="startup-form_error">{error.category}</p>}
</div>

<div>
    <label htmlFor="link" className="startup-form_label">Image URL </label>
    <Input  name="link" id="link" className="startup-form_input" required placeholder="Startup Image URL"/>
    {error.link && <p className="startup-form_error">{error.link}</p>}

</div>
<div data-color-mode="light">
    <label htmlFor="pitch" className="startup-form_label">Pitch </label>
   <MDEditor value={pitch} onChange={(value)=>setPitch(value as string)}
   id="pitch" preview="edit" height={300} style={{borderRadius:20,overflow:'hidden'}}
   textareaProps={{
       placeholder:"Briefly describe your startup",
   }}
             previewOptions={{
                 disallowedElements:["style"]
             }}
   />
    {error.pitch && <p className="startup-form_error">{error.pitch}</p>}

</div>
            <Button type="submit" className="startup-form_btn" disabled={isPending}>{isPending?'Submitting':'Submit Your Pitch'}
            <Send className="size-6 ml-2"></Send>
            </Button>
        </form>
    )
}
export default StartupForm

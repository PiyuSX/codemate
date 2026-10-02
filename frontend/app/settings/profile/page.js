"use client"

import Button from "@/components/Button"
import { useForm } from "react-hook-form"
import useUserStorage from "@/store/useUserStorage"
import { Edit } from "lucide-react"

export default function Profile() {

    const { user, setUser } = useUserStorage()

    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm({
        defaultValues: {
            username: user.username,
            email: user.email,
            imgURL: user.imgURL
        }
    })

    const onSubmit = async (data) => {
        console.log(data)
    }


    return (
        <div className="flex flex-col items-center mt-40 gap-15 ">
            <h1 className="font-semibold text-4xl">Update Profile</h1>
            <form className="flex flex-col gap-4 w-1/4 items-center" onSubmit={handleSubmit(onSubmit)}>
           <div className="relative h-56 w-56 cursor-pointer group">
            <Edit className="z-50 absolute inset-0 m-auto opacity-0 group-hover:opacity-100" />
            <img className="rounded-full h-56 w-56 group-hover:brightness-50" src={user.imgURL ? (user.imgURL) : ("/donkey.jpg")} />

           </div>
            <input {...register("username", { required: "Username is required", maxLength: { value: 10, message: "Username can not be more than 10 char long"}})} type="text" placeholder="Username" className="w-full px-5 py-3 rounded-lg bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-indigo-500" />
              {errors.username && <span className="text-red-500">{errors.username.message}</span>}
             <input {...register("email", { required: "Email is required", pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: "Invalid email address" } })} type="email" placeholder="Email" className="w-full px-5 py-3 rounded-lg bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-indigo-500" />
             {errors.email && <span className="text-red-500">{errors.email.message}</span>}
             <Button style="!w-full" type="submit" text="Update" primary onclick={() => {}} />
            </form>
        </div>
    )
}

"use client"

import { useForm } from "react-hook-form"
import Button from "@/components/Button"
import Link from "next/link"
import api from "@/lib/api"

export default function page() {

    const {
         register,
         handleSubmit,
        formState: { errors }
    } = useForm()

    const onSubmit = async (data) => {
        try {
            const res = await api("/auth/login", {
                method: "POST",
                body: JSON.stringify({
                    username: data.username,
                    password: data.password
                })
            })

            console.log(res)
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <div className=" min-h-screen w-full grid grid-cols-2">
            {/* for the form */}
            <div className="flex flex-col gap-10 items-center justify-center">
            <h1 className="text-5xl font-medium w-[40%]">Login to Continue</h1>
           <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6 w-[40%]">
             <input {...register("username", { required: "Username is required", maxLength: { value: 10, message: "Username can not be more than 10 char long"}})} type="text" placeholder="Username" className="w-full px-5 py-3 rounded-lg bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-indigo-500" />
              {errors.username && <span className="text-red-500">{errors.username.message}</span>}
             <input {...register("password", { required: "Password is required", minLength: { value: 8, message: "Password must be at least 8 char long"}})} type="password" placeholder="Password" className="w-full px-5 py-3 rounded-lg bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-indigo-500" />
             {errors.password && <span className="text-red-500">{errors.password.message}</span>}
             <Button type="submit" text="Login" primary onclick={() => {}} />
             <p className="text-lg">Not a Member? <Link className="text-indigo-400 hover:text-indigo-600" href="/register">Register</Link></p>
           </form>
            </div>
            {/*for the image */}
            <div className="flex justify-center items-center">
                <img src="./undraw_deploy-globally_2k9s.svg" />
            </div>
        </div>
    )
}
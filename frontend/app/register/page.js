"use client"

import { useForm } from "react-hook-form"
import Button from "@/components/Button"
import Link from "next/link"
import api from "@/lib/api"
import useUserStorage from "@/store/useUserStorage"
import { useRouter } from "next/navigation"

export default function page() {

    const { setUser } = useUserStorage()
    const router = useRouter()

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm()

   const onSubmit = async (data) => {
    try {
        const res = await api("/auth/signup", {
            method: "POST",
            body: JSON.stringify({
                username: data.username,
                password: data.password,
                email: data.email
            })
        })
        setUser(res.user)
        router.push("/dashboard")
    } catch (error) {
        console.log(error)
    }
   }
    return (
        <div className=" min-h-screen w-full grid grid-cols-2">
            {/*for the image */}
            <div className="flex justify-center items-center">
                <img src="./undraw_working-at-home_usrj.svg" />
            </div>
          
            {/* for the form */}

            <div className="flex flex-col gap-10 items-center justify-center">
            <h1 className="text-5xl font-medium w-[40%]">Register to Continue Mate!</h1>
           <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6 w-[40%]">
             <input {...register("username", { required: "Username is required", maxLength: { value: 10, message: "Username can not be more than 10 char long"}})} type="text" placeholder="Username" className="w-full px-5 py-3 rounded-lg bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-indigo-500" />
              {errors.username && <span className="text-red-500">{errors.username.message}</span>}
             <input {...register("password", { required: "Password is required", minLength: { value: 8, message: "Password must be at least 8 char long"}})} type="password" placeholder="Password" className="w-full px-5 py-3 rounded-lg bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-indigo-500" />
              {errors.password && <span className="text-red-500">{errors.password.message}</span>}
            <input {...register("email", { required: "Email is required", pattern: { value: /\S+@\S+\.\S+/, message: "Entered value does not match email format" } })} type="email" placeholder="Email" className="w-full px-5 py-3 rounded-lg bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-indigo-500" />
              {errors.email && <span className="text-red-500">{errors.email.message}</span>}
             <Button type="submit" text="Register" primary onclick={()=> {}}/>
             <p className="text-lg">Already a Member? <Link className="text-indigo-400 hover:text-indigo-600" href="/login">Login</Link></p>
           </form>
            </div>
        </div>
    )
}
"use client"

import {useForm}  from "react-hook-form"
import Button from "@/components/Button"
import api from "@/lib/api"
import useUserStorage from "@/store/useUserStorage"
import { useRouter } from "next/navigation"
import { showSlide } from "@/store/useSlideStorage"


export default function Danger() {
 
     const { register, handleSubmit} = useForm()
     const {setUser} = useUserStorage()
     const router = useRouter()

     const onSubmit = async (data) => {
         try {
            const res = await api("/auth/verify-password", {
                method: "POST",
                body: JSON.stringify({
                    password: data.password
                })
            })
            
            if(!res.isPasswordCorrect) {
                alert("Incorrect password")
            }
            if(data.writetext !== "delete my account") {
                alert('Please type "delete my account" to confirm')
            }
           
            if(res.isPasswordCorrect && data.writetext === "delete my account") {
                const deleteRes = await api("/user/delete", {
                    method: "DELETE"
                })
                if(deleteRes.success) {
                    setUser(null)
                    router.push("/")
                }

                showSlide(deleteRes.message)

            }
            
         } catch (error) {
            showSlide(error.message)
         }
     }

    return (
        <div className="w-full flex flex-col justify-center items-center h-screen"> 
            <h1 className="text-2xl font-semibold text-red-500">
                Think again Mate! </h1>
            <form className="w-1/4 flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
                <h2 className="text-xl font-semibold text-red-500 mt-10">Delete Account</h2>
                <p className="text-lg text-gray-500 ">This action is irreversible. All your data will be lost.</p>
                <input {...register("password")} type="password" className="w-full px-5 py-3 rounded-lg bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-indigo-500" placeholder="Enter your password" />
                <input {...register("writetext")} type="text" className="w-full px-5 py-3 rounded-lg bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-indigo-500" placeholder='Type "delete my account"' />
                <Button style="!w-full" text="Delete Account" type="submit" primary onclick={()=>{}}/>
            </form>

        </div>
    )
}
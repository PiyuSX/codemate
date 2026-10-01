"use client"

import Button from "@/components/Button"
import Link from "next/link"

export default function page() {

    const handleLogin = () => {
        console.log("Hello login")
    }
    return (
        <div className=" min-h-screen w-full grid grid-cols-2">
            {/* for the form */}
            <div className="flex flex-col gap-10 items-center justify-center">
            <h1 className="text-5xl font-medium w-[40%]">Login to Continue</h1>
           <form className="flex flex-col gap-6 w-[40%]">
             <input type="text" placeholder="Username" className="w-full px-5 py-3 rounded-lg bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-indigo-500" />
             <input type="password" placeholder="Password" className="w-full px-5 py-3 rounded-lg bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-indigo-500" />
             <Button text="Login" primary onclick={handleLogin}/>
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
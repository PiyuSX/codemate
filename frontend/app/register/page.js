"use client"

import Button from "@/components/Button"
import Link from "next/link"

export default function page() {

    const handleLogin = () => {
        console.log("Hello Register")
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
           <form className="flex flex-col gap-6 w-[40%]">
             <input type="text" placeholder="Username" className="w-full px-5 py-3 rounded-lg bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-indigo-500" />
             <input type="password" placeholder="Password" className="w-full px-5 py-3 rounded-lg bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-indigo-500" />
            <input type="email" placeholder="Email" className="w-full px-5 py-3 rounded-lg bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-indigo-500" />
             <Button text="Register" primary onclick={handleLogin}/>
             <p className="text-lg">Already a Member? <Link className="text-indigo-400 hover:text-indigo-600" href="/login">Login</Link></p>
           </form>
            </div>
        </div>
    )
}
"use client"

import Button from "@/components/Button"
import { usePathname } from "next/navigation"


const Navbar = () => {
    const pathname = usePathname()
    const isLoginPage = pathname === "/login"

  return (
    <div className="z-50 absolute top-0 left-0 w-full bg-transparent">
        
     <div className="text-right mr-25">

       <Button text={`${isLoginPage ? "Register": "Login"}`} link={`${isLoginPage ? "/register": "login"}`} secondary />
    </div>    
    </div>
  )
}

export default Navbar
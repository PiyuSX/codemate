"use client"


import { useEffect } from "react"
import { useRouter } from "next/navigation"
import useUserStorage from "@/store/useUserStorage"
import { showSlide } from "@/store/useSlideStorage"



const ProtectedRoute = ({children}) => {

    const router = useRouter()
    const { user } = useUserStorage()

    useEffect(() => {
        if (!user) {
            showSlide("Bro login first")
            router.push("/login")
        }
    }, [user, router])

    if (!user) return null

  return children
}

export default ProtectedRoute
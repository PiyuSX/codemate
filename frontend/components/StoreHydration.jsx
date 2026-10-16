"use client"


import {  useEffect, useState } from "react"
import useUserStorage from "@/store/useUserStorage"
import useEditorStorage from "@/store/useEditorStorage"
import useMateCodeStorage from "@/store/useMateCodeStorage"


const StoreHydration = ({children}) => {
    const [hydrated, setHydrated] = useState(false)

    useEffect(() => {
        const hydrate = async () => {
            try {
                await Promise.all([
                    useUserStorage.persist.rehydrate(),
                    useEditorStorage.persist.rehydrate(),
                    useMateCodeStorage.persist.rehydrate()
                ])
            } finally {
                setHydrated(true)
            }
        }
        hydrate()
    }, [])


    if (!hydrated) return null


  return children
}

export default StoreHydration
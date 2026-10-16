"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"
import useEditorStorage from "@/store/useEditorStorage"
import useMateCodeStorage from "@/store/useMateCodeStorage"

const ClearSavedFiles = () => {
    const pathname = usePathname()
    useEffect(() => {
        if (pathname.startsWith("/call/")) {
            return
        }

        useEditorStorage.getState().clearFiles()
        useMateCodeStorage.getState().clearFiles()
    }, [pathname])
  return null

}

export default ClearSavedFiles




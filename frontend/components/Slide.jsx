"use client"

import React, { useEffect } from "react"
import useSlideStorage from "@/store/useSlideStorage"

const Slide = () => {

    const { message, showSlide, hide } = useSlideStorage()

    useEffect(() => {
        if (!showSlide) return

        const timer = setTimeout(() => {
            hide()
        }, 3000)

        return () => clearTimeout(timer)
    }, [showSlide, message, hide])

    return (
        <div className={`fixed top-5 left-1/2 -translate-x-1/2 z-[999] transition-all duration-500 ${
            showSlide ? "translate-y-0" : "-translate-y-24"
        }`}>
            <div className="px-6 py-4 rounded-xl bg-slate-900 border border-indigo-500 shadow-xl">
                <p className="text-lg font-medium text-white">
                    {message}
                </p>
            </div>
        </div>
    )
}

export default Slide
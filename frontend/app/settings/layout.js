"use client"

import Link from "next/link"
import Button from "@/components/Button"


export default function SettingsLayout({children}) {
    return (
        <div className="grid grid-cols-[15%_85%] ">
            <div className="border border-slate-800 p-4 rounded-lg border-l-0 h-screen flex flex-col justify-between">
                <div>
                <h1 className="text-2xl font-semibold mt-5">Settings</h1>
                <div className="mt-8">
                    <ul className="flex text-lg flex-col">
                        <Link href="/settings/profile">
                        <li className="hover:bg-slate-900 p-2 rounded-lg pl-4 cursor-pointer">Profile</li>
                        </Link>
                        <Link href="/settings/account">
                        <li className="hover:bg-slate-900 p-2 rounded-lg pl-4 cursor-pointer">Account</li>
                        </Link>
                        <Link href="/settings/danger">
                        <li className="text-red-500 hover:bg-slate-900 p-2 rounded-lg pl-4 cursor-pointer">Danger Zone</li>
                        </Link>
                    </ul>
                </div>
                </div>
                <div className="mb-10">
                    <Button style="!block !w-full" text="Back to Dashboard" link="/dashboard" primary />
                </div>
            </div>
            <div className="ml-10">
                {children}
            </div>
        </div>
    )
}
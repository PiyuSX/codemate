"use client"

import Image from "next/image";
import useUserStorage from "@/store/useUserStorage";
import Button from "@/components/Button";
// import { showSlide } from "@/store/useSlideStorage"
import { useEffect } from "react";

export default function Page() {
  const { user } = useUserStorage();

  // useEffect(() => {
  //     showSlide("Welcome Mate !")
  // }, [])

  return (
    <div className="relative min-h-screen w-full bg-slate-950">
      <div className="z-0 absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
      <div className="z-10 relative flex flex-col items-center mt-64">
          <h1 className="text-[#F9FAFB] font-medium text-6xl">CodeMate</h1>
          <p className="text-[#E5E7EB] text-2xl">A place where you find your new mates</p>
          {user ? (
            <div className="flex flex-col items-center gap-4">
              <p className="text-[#E5E7EB] text-xl">Welcome back, {user.username}!</p>
              <Button text="Go to Dashboard" link="/dashboard" primary  />
            </div>

          ): (
      <div className="flex flex-col items-center gap-4">
        <p className="text-[#E5E7EB] text-xl">Login to get Started</p>
        <Button text="Login" link="/login" primary />

      </div>
          )}

          <Image src="/placeholder.png" alt="heropicture" className="mt-20 rounded-2xl" width="1200" height="300" />
      </div>
    </div>
  );
}

"use client";

import Button from "@/components/Button";
import { usePathname } from "next/navigation";
import useUserStorage from "@/store/useUserStorage";
import { ChevronDown, Settings } from "lucide-react";
import { useState } from "react";
import api from "@/lib/api";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { showSlide } from "@/store/useSlideStorage"


const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { user, setUser } = useUserStorage();
  const pathname = usePathname();
  const isLoginPage = pathname === "/login";
  const router = useRouter();

  const handleLogout = async () => {
    showSlide("Logged out successfully !");
    const res = await api("/auth/logout", {
      method: "POST",
    });

    setUser(null);
    router.push("/");

  };

  return (
    <div className="z-50 absolute top-0 left-0 w-full bg-transparent">
      <div className="text-right mr-25">
        {user ? (
          <div className="flex justify-end items-center ">
            <div className="flex flex-col bg-gray-200 text-slate-950 rounded px-4 py-1 rounded-b-xl text-xl gap-2">
              <div className="flex items-center gap-2 ">
                {user.imgURL ? (
                  <img
                    src={user.imgURL}
                    alt="User"
                    className="rounded-full size-12"
                  />
                ) : (
                  <p className="flex size-12 items-center justify-center rounded-full bg-slate-950 text-sm font-bold text-gray-200 ring-1 ring-white/10">
                    {user.username.charAt(0).toUpperCase()}
                  </p>
                )}
                <span className="ml-2l">{user.username}</span>
                <ChevronDown
                  className="hover:text-indigo-500 cursor-pointer"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                />
              </div>
              <div className="flex">
                {isDropdownOpen && (
                  <div
                    className="flex flex-col gap-2"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    <div className="flex gap-2 items-center text-lg hover:text-indigo-500 cursor-pointer">
                      <Link href="/settings" className="flex gap-2 items-center">
                      <Settings /> Settings
                      </Link>
                    </div>

                    <Button
                      text="Logout"
                      onclick={handleLogout}
                      primary
                      style="!text-lg !px-10 pt-2"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          <Button
            text={`${isLoginPage ? "Register" : "Login"}`}
            link={`${isLoginPage ? "/register" : "login"}`}
            secondary
          />
        )}
      </div>
    </div>
  );
};

export default Navbar;

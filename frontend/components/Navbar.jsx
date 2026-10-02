"use client";

import Button from "@/components/Button";
import { usePathname } from "next/navigation";
import useUserStorage from "@/store/useUserStorage";
import { UserRound, ChevronDown,Settings } from "lucide-react";
import { useState } from "react";

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { user } = useUserStorage();
  const pathname = usePathname();
  const isLoginPage = pathname === "/login";
  
  const handleLogout = () => {}

  return (
    <div className="z-50 absolute top-0 left-0 w-full bg-transparent">
      <div className="text-right mr-25">
        {user ? (
          <div className="flex justify-end items-center ">
            <div className="flex flex-col bg-gray-200 text-slate-950 rounded px-6 py-3 rounded-b-xl text-xl gap-2">
              <div className="flex items-center gap-2 ">
                <UserRound className="bg-slate-950 text-gray-200 rounded-full size-6" />
                <span className="ml-2l">{user.username}</span>
                <ChevronDown className="hover:text-indigo-500 cursor-pointer"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                />
              </div>
              <div className="flex">{isDropdownOpen && <div className="flex flex-col gap-2" onClick={() => setIsDropdownOpen(false)}>
                <div className="flex gap-2 items-center text-lg hover:text-indigo-500 cursor-pointer">
                 <Settings /> Settings
                </div>

               <Button text="Logout" onclick={handleLogout} primary style="!text-lg !px-10 pt-2"  />
                
                </div>}</div>
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

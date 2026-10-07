"use client";

import useUserStorage from "@/store/useUserStorage";
import Link from "next/link";
import { useState } from "react";
import Button from "@/components/Button";
import { useForm }  from "react-hook-form"
import { showSlide } from "@/store/useSlideStorage";
import { useRouter } from "next/navigation"
import useMatchStorage from "@/store/useMatchStorage";
import api from "@/lib/api";

export default function page() {

  const router = useRouter()

  const { setLanguages } = useMatchStorage()

  const { register, handleSubmit } = useForm({
    defaultValues: {
      languageOption: "all",
    }
  });
  const { user } = useUserStorage()

 

  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const [showSpecificLanguages, setShowSpecificLanguages] = useState(false);


  const onSubmit = async (data) => {
    const languages = data.languageOption === "all" ? user.languages : selectedLanguages;

    if(languages.length === 0) {
      showSlide("Please select at least one language")
      return;
    }
      setLanguages(languages)
      router.push("/call")
      
  }

  const handleReset = async () => {
    try {
      const res = await api("/match/reset", {
        method: "DELETE"
        
      })

      showSlide(res.message)
      
    } catch (error) {
      showSlide("Mate Reset Failed | Please try again later, or contact support")
    }
  }


  return (
    <div className="flex flex-col items-center py-2 mt-72">
      <h1 className="text-4xl font-semibold mb-16">
        Find You Random Mate Now !
      </h1>

      <h2 className="text-xl mb-6">Choose Your Languages to continue with</h2>

      {user.languages.length == 0 ? (
        <>
          <p>No Languages In your Profile</p>

          <p>
            Please add your languages before continuing!{" "}
            <Link
              href="/settings/profile"
              className="text-indigo-500 hover:text-indigo-600"
            >
              Click here
            </Link>
          </p>
        </>
      ) : (
        <form className="w-96" onSubmit={handleSubmit(onSubmit)}>
          <label
            className="flex items-center gap-3 border border-slate-800 rounded-lg p-4 cursor-pointer hover:bg-slate-900"
          >
            <input {...register("languageOption")} className="cursor-pointer accent-indigo-500" type="radio"  value="all" />

            <div>
              <p className="font-medium">All my Languages</p>

              <div className="mt-1 flex gap-2 flex-wrap text-sm text-slate-400">
                {user.languages.slice(0, 3).map((language) => (
                  <span key={language}>[{language}]</span>
                ))}

                {user.languages.length > 3 && (
                  <span>[+{user.languages.length - 3} more]</span>
                )}
              </div>
            </div>
          </label>

          <Link href="/settings/profile" className="text-indigo-500 hover:text-indigo-600">
            Add More Languages to Your Profile
          </Link>

          <p className="text-center my-6 text-slate-500">OR</p>

            <label
            className="flex items-center gap-3 border border-slate-800 rounded-lg p-4 cursor-pointer hover:bg-slate-900"
            
          >
            
            <input {...register("languageOption")} className="cursor-pointer accent-indigo-500" type="radio" value="specific" onClick={() => setShowSpecificLanguages(!showSpecificLanguages)} />
            Select Specific Languages
            </label>

            {showSpecificLanguages && 
           <div className="flex flex-col gap-2">
            {user.languages.map((language) => (
                
              <label
                key={language}
                className={`flex items-center gap-3 border rounded-lg p-3 cursor-pointer ${
                  selectedLanguages.includes(language)
                    ? "border-indigo-500 bg-indigo-500/10"
                    : "border-slate-800 hover:bg-slate-900"
                }`}
              >
                <input 
                  type="checkbox"
                  className="accent-indigo-500"
                  checked={selectedLanguages.includes(language)}
                  onChange={() => {
                    setSelectedLanguages((prev) =>
                      prev.includes(language)
                        ? prev.filter((lang) => lang !== language)
                        : [...prev, language],
                    );
                  }}
                />

                {language}
              </label>
              
            ))}
          </div>

            }


          <div className="mt-6">
            <Button
              type="submit"
              text="Continue to Chat"
              onclick={() => {}}
              primary
            />
          </div>
        </form>
        
      )}
      <div className="mt-36 flex flex-col items-start gap-2">
      <p className="text-red-600">Use only in case of Repeated Issues in the Matching Process</p>
      <Button style="!w-60 ml-5" text="Reset DB" onclick={handleReset} primary />
      </div>
    </div>
  );
}

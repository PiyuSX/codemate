"use client";

import useUserStorage from "@/store/useUserStorage";
import Link from "next/link";
import { useState } from "react";
import Button from "@/components/Button";

export default function page() {
  // const { user } = useUserStorage()

  const user = {
    languages: ["English", "Spanish", "French", "German", "Italian"],
  };

  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const [showSpecificLanguages, setShowSpecificLanguages] = useState(false);

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
        <form className="w-96">
          <label
            className="flex items-center gap-3 border border-slate-800 rounded-lg p-4 cursor-pointer hover:bg-slate-900"
          >
            <input  className="cursor-pointer " type="radio" name="language" />

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

          <p className="text-center my-6 text-slate-500">OR</p>

            <label
            className="flex items-center gap-3 border border-slate-800 rounded-lg p-4 cursor-pointer hover:bg-slate-900"
            
          >
            
            <input className="cursor-pointer " type="radio" name="language" onClick={() => setShowSpecificLanguages(!showSpecificLanguages)} />
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
              link="/settings/profile"
              primary
            />
          </div>
        </form>
      )}
    </div>
  );
}

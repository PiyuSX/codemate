"use client";

import LanguageCard from "@/components/LanguageCard";
import useUserStorage from "@/store/useUserStorage";
import Button from "@/components/Button";
import { useState } from "react";
import api from "@/lib/api";
import NormalLanguageCard from "@/components/NormalLanguageCard";
import { showSlide } from "@/store/useSlideStorage"



export default function Profile() {
  const { user, setUserLanguages} = useUserStorage();
  const userLanguages = user.languages || [];

  const [isLanguagePop, setIsLanguagePop] = useState(false);
  const [languages, setLanguages] = useState([]);

  const [addedLanguages, setAddedLanguages] = useState(user.languages || [])
  const [removedLanguages, setRemovedLanguages] = useState([])



  const getLanguages = async () => {
    try {
      const res = await api("/languages");
      setLanguages(res.languages || []);
    } catch (error) {
      showSlide(error.message)
    }
  };

 
  const handleLanguageUpdate = async (addedLanguages, removedLanguages) => {
    try {
        const res = await api("/languages/update", {
            method: "PUT",
            body: JSON.stringify({
                addedLanguages,
                removedLanguages
            })
        })

        if(res.languages) {
            setUserLanguages(res.languages)
            setIsLanguagePop(false)
        }

        showSlide(res.message)
    } catch (error) {
        showSlide(error.message)
    }
  }

  return (
    <div className="m-40">
      <h1 className="text-2xl font-semibold ">
        Hello<span className="text-indigo-500"> {user.username} </span>!
      </h1>

      <div>
        <h2 className="text-xl mt-10">Your Languages</h2>
        <div className="flex flex-row gap-4 mt-12 items-center">
          <NormalLanguageCard languagesArray={user.languages} />
          <Button
            style="!text-lg "
            text="Add Language"
            primary
            onclick={() => {
              (setIsLanguagePop(true), getLanguages());
            }}
          />
        </div>
      </div>
      {isLanguagePop && (
        <div className="mt-10">
          <h2 className="text-xl mb-6">Select Languages</h2>
          <div className="flex flex-row gap-4">
            <LanguageCard languagesArray={languages} addedLanguages={addedLanguages} setAddedLanguages={setAddedLanguages}
             removedLanguages={removedLanguages} setRemovedLanguages={setRemovedLanguages} userLanguages={userLanguages}
            />
            <Button
              style="!text-lg "
              text="Confirm"
              primary
              onclick={() => {
              handleLanguageUpdate(addedLanguages, removedLanguages);
              }}
            />

            <Button
              style="!text-lg "
              text="Cancel"
              primary
              onclick={() => {
                setIsLanguagePop(false);
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}

"use client";

import { showSlide } from "@/store/useSlideStorage";
import useMatchStorage from "@/store/useMatchStorage";
import useUserStorage from "@/store/useUserStorage";
import api from "@/lib/api";
import useMateStorage from "@/store/useMateStorage";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/Button";

export default function Call() {
  const { languages, setMatchId } = useMatchStorage();
  const { user } = useUserStorage();
  const { mate, setMate } = useMateStorage();
  const router = useRouter();
  const hasStarted = useRef(false);

  const [callStatus, setCallStatus] = useState("searching");

  const handleSubmitFindMate = async () => {
    try {
      const res = await api("/match/find", {
        method: "POST",
        body: JSON.stringify({
          languages,
        }),
      });

      showSlide(res.message);
      setMate(res.mateDetails);
      setMatchId(res.matchId);
      console.log(res.mateDetails);
      if (res.mateDetails) {
        setCallStatus("Mate Found | Connecting");
      }

      if(res.matchId) {
        router.push(`/call/${res.matchId}`)
      }


     
    } catch (error) {
       
        showSlide("Error finding mate | Please reset the DB from Dashboard and try again")
        router.push("/dashboard")

      
    }
  };

  useEffect(() => {
    if (hasStarted.current) return;

      hasStarted.current = true;

    if (languages.length === 0) {
      showSlide("Mate Select Languages First");
      router.replace("/dashboard");
    } else {
      handleSubmitFindMate();
    }
  }, []);


  const handleCancelCall = async () => {
    try {
      const res = await api("/match/end-all", {
        method: "DELETE"
      })

      showSlide(res.message)
      router.push("/dashboard")

      
    } catch (error) {
      showSlide("Error while cancelling the call | Please try again later")
    }
  }

  return (
    <div className="flex flex-row items-center justify-around h-screen">
      <div className="flex flex-col items-center">
        <img src={user.imgURL} alt="User Image" className="h-64 rounded-full" />
        <p className="text-lg font-medium mt-3">{user.username}</p>
      </div>
      <div className="text-3xl font-semibold">
        <div>
        {callStatus}
        <span className="inline-flex ml-1">
          <span className="ml-0.5 animate-[pulse_1s_ease-in-out_infinite]">
            .
          </span>
          <span className="ml-0.5 animate-[pulse_1s_ease-in-out_0.2_infinite]">
            .
          </span>
          <span className="ml-0.5 animate-[pulse_1s_ease-in-out_0.4_infinite]">
            .
          </span>
        </span>
        </div>
        <div>
          <Button  text="Cancel Call" primary style="!bg-red-600 !hover:bg-red-700 mt-4" onclick={() => {handleCancelCall()}} />
        </div>
      </div>
      {callStatus === "searching" ? (
        <div className="flex flex-col items-center">
          <div className="h-64 w-64 rounded-full bg-slate-900  animate-pulse"></div>
          <div className="h-8 w-39 bg-slate-900 mt-3  animate-pulse [animation-delay:300ms]"></div>
        </div>
      ) : (
        <div className="flex flex-col items-center">
          <img
            src={mate.imgURL}
            alt="Mate Image"
            className="h-64 rounded-full"
          />
          <p className="text-lg font-medium mt-3">{mate.username}</p>
        </div>
      )}
    </div>
  );
}

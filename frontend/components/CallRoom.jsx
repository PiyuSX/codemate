"use client";

import { useEffect, useRef, useState } from "react";
import socket from "@/lib/socket";
import {
  PhoneForwarded,
  Mic,
  MicOff,
  PhoneOff,
  Video,
  VideoOff,
} from "lucide-react";
import api from "@/lib/api";
import { showSlide } from "@/store/useSlideStorage";
import { useRouter } from "next/navigation";
import useMateStorage from "@/store/useMateStorage";
import useUserStorage from "@/store/useUserStorage";
import FileExplorer from "./FileExplorer";
import MateFileExplorer from "./MateFileExplorer";

const CallRoom = ({ matchId, onModeChange }) => {

  
  const { mate, setMate } = useMateStorage();
  const { user } = useUserStorage();

  const router = useRouter();

  const handleNextCall = () => {
    socket.emit("call:end", matchId, mate?.username);

    const res = api("/match/session-end", {
      method: "DELETE",
    });

    showSlide("Finding a new mate");
    router.push("/call");
  };

  const handleEndCall = async () => {
    console.log("END CALL CLICKED");

    socket.emit("call:end", matchId, mate?.username);

    const res = await api("/match/end-all", {
      method: "DELETE",
    });

    showSlide(res.message);
    setMate(null);
    router.push("/dashboard");
  };

  useEffect(() => {
    const handleCallEnd = ({ matchId: endedMatchId, message }) => {
      if (String(endedMatchId) !== String(matchId)) return;

      showSlide(message);
      router.replace("/call");
    };

    socket.on("call:end", handleCallEnd);

    return () => {
      socket.off("call:end", handleCallEnd);
    };
  }, [matchId, router]);

  const peer = useRef(null);
  const localStream = useRef(null);
  const localVideo = useRef(null);
  const remoteVideo = useRef(null);
  const isMicOn = useRef(true);
  const isVideoOn = useRef(true);

  const [micStatus, setMicStatus] = useState(true);
  const [videoStatus, setVideoStatus] = useState(true);

  const toggleMic = () => {
    const newState = !isMicOn.current;

    isMicOn.current = newState;
    setMicStatus(newState);

    localStream.current?.getAudioTracks().forEach((track) => {
      track.enabled = newState;
    });
  };

  const toggleVideo = () => {
    const newState = !isVideoOn.current;

    isVideoOn.current = newState;
    setVideoStatus(newState);

    localStream.current?.getVideoTracks().forEach((track) => {
      track.enabled = newState;
    });
  };

  useEffect(() => {
    const startCall = async () => {
      peer.current = new RTCPeerConnection();

      try {
        localStream.current = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });

        if (localVideo.current) {
          localVideo.current.srcObject = localStream.current;
        }

        localStream.current.getTracks().forEach((track) => {
          peer.current.addTrack(track, localStream.current);
        });
      } catch (error) {
        console.error("Camera/microphone access failed:", error);
        showSlide("Allow camera and microphone access to use video calls");
      }

      peer.current.onicecandidate = (event) => {
        if (event.candidate) {
          socket.emit("ice-candidate", {
            matchId,
            candidate: event.candidate,
          });
        }
      };

      peer.current.ontrack = (event) => {
        if (remoteVideo.current) {
          remoteVideo.current.srcObject = event.streams[0];
        }
      };

      socket.on("mateJoined", async () => {
        if (peer.current.signalingState !== "stable") return;

        const offer = await peer.current.createOffer();
        await peer.current.setLocalDescription(offer);
        socket.emit("offer", { matchId, offer });
      });

      socket.on("offer", async (offer) => {
        if (peer.current.signalingState !== "stable") return;

        await peer.current.setRemoteDescription(offer);
        const answer = await peer.current.createAnswer();
        await peer.current.setLocalDescription(answer);
        socket.emit("answer", { matchId, answer });
      });

      socket.on("answer", async (answer) => {
        if (peer.current.signalingState !== "have-local-offer") return;
        await peer.current.setRemoteDescription(answer);
      });

      socket.on("ice-candidate", async (candidate) => {
        try {
          await peer.current.addIceCandidate(candidate);
        } catch (error) {
          console.error("Failed to add ICE candidate:", error);
        }
      });

      socket.connect();
      socket.emit("joinRoom", matchId);
    };

    startCall().catch((error) => {
      console.error("Call setup failed:", error);
    });

    return () => {
      socket.emit("leave-call", matchId);

      socket.off("mateJoined");
      socket.off("offer");
      socket.off("answer");
      socket.off("ice-candidate");

      localStream.current?.getTracks().forEach((track) => track.stop());

      peer.current?.close();
      socket.disconnect();
    };
  }, [matchId]);

  return (
    <div className="m-4 flex flex-col justify-between ">
      <div>
        <FileExplorer onModeChange={onModeChange} />
        <MateFileExplorer onModeChange={onModeChange} />

      </div>
      <div className="flex gap-4 flex-col mb-2">
        <p>{user.username}</p>
        <video ref={localVideo} autoPlay muted playsInline />
        <p>{mate?.username}</p>
        <video ref={remoteVideo} autoPlay playsInline />
        <div className="flex justify-around bg-slate-900 p-2 rounded-lg items-center">
          {videoStatus ? (
            <div className="hover:bg-slate-950 p-4 rounded-lg">
              {" "}
              <Video onClick={toggleVideo} />
            </div>
          ) : (
            <div className="hover:bg-slate-950 p-4 rounded-lg">
              <VideoOff onClick={toggleVideo} />{" "}
            </div>
          )}
          {micStatus ? (
            <div className="hover:bg-slate-950 p-4 rounded-lg">
              {" "}
              <Mic onClick={toggleMic} />
            </div>
          ) : (
            <div className="hover:bg-slate-950 p-4 rounded-lg">
              <MicOff onClick={toggleMic} />
            </div>
          )}
          <div className="hover:bg-slate-950 p-4 rounded-lg">
            <PhoneOff onClick={handleEndCall} />
          </div>

          <button
            type="button"
            onClick={handleNextCall}
            className="hover:bg-slate-950 p-4 rounded-lg"
          >
            <PhoneForwarded />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CallRoom;

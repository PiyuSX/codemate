"use client"

import { useEffect, useRef } from "react";
import socket from "@/lib/socket";


const CallRoom = ({matchId}) => {

    const peer = useRef(null)
    const localStream = useRef(null)
    const localVideo = useRef(null)
    const remoteVideo = useRef(null)

    useEffect(() => {

        const startCall = async () => {
            peer.current = new RTCPeerConnection()

            localStream.current = await navigator.mediaDevices.getUserMedia({
                video: true,
                audio: true
            })

            localVideo.current.srcObject = localStream.current

            localStream.current.getTracks().forEach((track) => {
                peer.current.addTrack(track, localStream.current)
            })

            peer.current.onicecandidate = (event) => {
                if (event.candidate) {
                    socket.emit("ice-candidate", {
                        matchId,
                        candidate: event.candidate
                    })
                }
            }

            peer.current.ontrack = (event) => {
                console.log("Mate stream received")

                remoteVideo.current.srcObject = event.streams[0]
            }

            socket.on("mateJoined", async () => {
                console.log("Mate has joined the call")

                if(peer.current.signalingState !== "stable") {
                    return
                }

                const offer = await peer.current.createOffer()
                await peer.current.setLocalDescription(offer)

                socket.emit("offer", {
                    matchId,
                    offer
                })
            })

            socket.on("offer", async (offer) => {
                console.log("Received offer from mate")

                if(peer.current.signalingState !== "stable") {
                    return
                }

                await peer.current.setRemoteDescription(offer)

                if(peer.current.signalingState !== "have-remote-offer") {
                    return
                }

                const answer = await peer.current.createAnswer()
                await peer.current.setLocalDescription(answer)

                socket.emit("answer", {
                    matchId,
                    answer
                })
            })

            socket.on("answer", async (answer) => {
                console.log("Answer received from mate")

                if(peer.current.signalingState !== "have-local-offer") {
                    return
                }

                await peer.current.setRemoteDescription(answer)
            })

            socket.on("ice-candidate", async (candidate) => {
                console.log("ICE candidate received from mate")

                await peer.current.addIceCandidate(candidate)
            })

            socket.connect()

            socket.emit("joinRoom", matchId)
        }

        startCall()

        return () => {
            socket.emit("leave-call", matchId)

            socket.off("mateJoined")
            socket.off("offer")
            socket.off("answer")
            socket.off("ice-candidate")

            localStream.current?.getTracks().forEach((track) => {
                track.stop()
            })

            socket.disconnect()
            peer.current?.close()
        }

    }, [matchId])

    return (
        <div>
            <h1>Call Room</h1>
            <p>Room: {matchId}</p>

            <video
                ref={localVideo}
                autoPlay
                muted
                playsInline
            />
            <video
                ref={remoteVideo}
                autoPlay
                playsInline
            />
        </div>
    )
}

export default CallRoom
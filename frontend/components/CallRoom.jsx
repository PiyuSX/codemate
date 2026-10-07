"use client"

import { useEffect } from "react";
import socket from "@/lib/socket";



const CallRoom = ({matchId}) => {

    useEffect(() => {
        socket.connect()

        socket.emit("joinRoom", matchId)

        return () => {
            socket.emit("leave-call", matchId)
            socket.disconnect()
        }
    }, [matchId])
  return (
    <div>
        <h1>Call Room</h1>
        <p>Room: {matchId}</p>
    </div>
  )
}

export default CallRoom
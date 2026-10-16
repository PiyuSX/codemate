
const callSocket = (io) => {

    const submissions = new Map()
    const completedMatches = new Map()
    io.on("connection", (socket) => {

        socket.on("joinRoom", (matchId) => {
            const room = io.sockets.adapter.rooms.get(matchId)

            if(room?.has(socket.id)) {
                return 
            }

            if(room && room.size > 0) {
                socket.to(matchId).emit("mateJoined")
            }
            socket.join(matchId)

            console.log(`${socket.id} -> Joined room ${matchId}`)
        })

        socket.on("offer", ({ matchId, offer}) => {
            socket.to(matchId).emit("offer", offer)
        })

        socket.on("answer", ({matchId, answer}) => {
            socket.to(matchId).emit("answer", answer)
        })

        socket.on("ice-candidate", ({matchId, candidate}) => {
            socket.to(matchId).emit("ice-candidate", candidate)
        })

        socket.on("call:end", (matchId, mateUsername) => {
            socket.to(matchId).emit("call:end", {
                matchId,
                message: `Match ended by ${mateUsername}`
            })

            submissions.delete(matchId)
            completedMatches.delete(matchId)
        })

        socket.on("submission:submit", ({matchId, files}) => {
            const room = io.sockets.adapter.rooms.get(matchId)

            if (!room?.has(socket.id) || room.size !== 2) {
                socket.emit("submission:error", {
                    message: "Mate is not connected."
                })
                return
            }

            if (completedMatches.has(matchId)) {
                socket.emit("submission:error", {
                    message: "Both users have already submitted"
                })
                return
            }

            if  (
                !Array.isArray(files) ||
                files.length > 50 ||
                files.some(file =>
                    !file || 
                    typeof file.name !== "string" ||
                    typeof file.content !== "string" ||
                    typeof file.type !== "string"
                ) ) {
                    socket.emit("submission:error", {
                        message: "Invalid files"
                    })

                    return
                }

                if (!submissions.has(matchId)) {
                    submissions.set(matchId, new Map())
                }

                const matchSubmissions = submissions.get(matchId)

                if (matchSubmissions.has(socket.id)) {
                    socket.emit("submission:error", {
                        message: "You have submitted already dude"
                    })

                    return
                }

                matchSubmissions.set(socket.id, files.map(file => ({
                    name: file.name,
                    type: file.type,
                    content: file.content
                })))

                socket.emit("submission:waiting")

                if(matchSubmissions.size !== 2) return

                const [userA, userB] = [...matchSubmissions.entries()]

                completedMatches.add(matchId)

                io.to(userA[0]).emit("submission:ready", {
                    mateFiles: userB[1]
                })

                io.to(userB[0]).emit("submission:ready", {
                    mateFiles: userA[1]
                })

                submissions.delete(matchId)
        })

        socket.on("disconnecting", () => {
            for ( const roomId of socket.rooms) {
                if (roomId === socket.id) continue

                submissions.delete(roomId)
                completedMatches.delete(roomId)
            }
        })

        socket.on("disconnect", () => {
            console.log("User disconnected", socket.id)
        })

      
        
    })
}

export default callSocket





const callSocket = (io) => {

    io.on("connection", (socket) => {
        console.log("User connected", socket.id)

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
        })
    })
}

export default callSocket
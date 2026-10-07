
const callSocket = (io) => {

    io.on("connection", (socket) => {
        console.log("User connected", socket.id)

        socket.on("joinRoom", (matchId) => {
            socket.join(matchId)

            console.log(`${socket.id} -> Joined room ${matchId}`)
        })
    })
}

export default callSocket
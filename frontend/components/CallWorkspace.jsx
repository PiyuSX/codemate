"use client"

import { useState } from "react"
import CallRoom from "@/components/CallRoom"
import CodeWorkPlace from "@/components/CodeWorkspace"

const CallWorkspace = ( { matchId }) => {
    const [codeMode, setCodeMode] = useState("own")

    return (
        <div className="grid grid-cols-[15%_85%] min-h-screen">
            <CallRoom matchId={matchId} 
            onModeChange={setCodeMode}
            />
             <div className="min-h-0">
                <CodeWorkPlace
                matchId={matchId}
                codeMode={codeMode}
                />
            </div>
        </div>
    )
}


export default CallWorkspace

import CallRoom from "@/components/CallRoom";
import CodeEditor from "@/components/CodeEditor";

export default async function CallPage({ params }) {
    const { matchId } = await params


    
    return(
        <div className="grid grid-cols-[15%_85%] min-h-screen">
         <CallRoom matchId={matchId} />
         <div className="bg-gray-800 m-4">
            <CodeEditor />
        </div>
         
        </div>
    )
    
}



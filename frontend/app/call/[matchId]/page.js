
import CallRoom from "@/components/CallRoom";
import CodeWorkPlace from "@/components/CodeWorkspace";

export default async function CallPage({ params }) {
    const { matchId } = await params
    


    return(
        <div className="grid grid-cols-[15%_85%] min-h-screen">
         <CallRoom matchId={matchId} />
         <div className="min-h-0">

            <CodeWorkPlace />
        </div>
         
        </div>
    )
    
}



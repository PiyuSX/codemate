
import CallWorkspace from "@/components/CallWorkspace";


export default async function CallPage({ params }) {
    const { matchId } = await params
    


    return <CallWorkspace matchId={matchId} />
    
}




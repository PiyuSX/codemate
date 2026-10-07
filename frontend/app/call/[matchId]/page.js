import CallRoom from "@/components/CallRoom";

export default async function CallPage({ params }) {
    const { matchId } = await params

    
    return <CallRoom matchId={matchId} />
    
}
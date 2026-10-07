export default async function CallPage({ params }) {
    const { matchId } = await params

    return (
        <div className="text-white">
            {matchId}
        </div>
    )
}
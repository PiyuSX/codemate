import CallWorkspace from "@/components/CallWorkspace";
import ProtectedRoute from "@/components/ProtectedRoute";

export default async function CallPage({ params }) {
  const { matchId } = await params;

  return (
    <ProtectedRoute>
      <CallWorkspace matchId={matchId} />
    </ProtectedRoute>
  );
}

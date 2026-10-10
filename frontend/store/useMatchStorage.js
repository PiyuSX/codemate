import { create } from "zustand"
import { persist } from "zustand/middleware"

const useMatchStorage = create(
    persist(
        (set) => ({
            languages: [],
            matchId: null,

            setMatchId: (matchId) => set({ matchId }),
            setLanguages: (languages) => set({ languages }),

            clearMatchId: () => set({ matchId: null }),
            clearLanguages: () => set({ languages: [] }),
        }),
        {
            name: "match-storage",
        }
    )
)

export default useMatchStorage
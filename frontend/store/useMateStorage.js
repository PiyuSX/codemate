import { create } from "zustand";
import { persist } from "zustand/middleware";


const useMateStorage = create(
    persist(
        (set) => ({
            mate: null,
            setMate: (mate) => set({ mate }),
            clearMate: () => set({ mate: null }),
        }),
        {
            name: "mate-storage",
        }
    )
)

export default useMateStorage
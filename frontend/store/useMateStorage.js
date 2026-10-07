import { create } from "zustand";

const useMateStorage = create((set) => ({
    mate: null,

    setMate: (mate) => set({ mate}),

    clearMate: () => set({ mate: null }),

}))

export default useMateStorage
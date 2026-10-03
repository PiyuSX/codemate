import { create } from "zustand"
import { persist } from "zustand/middleware"

const useUserStorage = create(
    persist(
        (set) => ({
            user: null,

            setUser: (user) => set({ user }),

            setUserLanguages: (languages) =>
                set((state) => ({
                    user: {
                        ...state.user,
                        languages,
                    },
                })),

            clearUser: () => set({ user: null }),
        }),
        {
            name: "user-storage",
        }
    )
)

export default useUserStorage
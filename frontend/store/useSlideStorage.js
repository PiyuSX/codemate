import { create } from "zustand"

const useSlideStorage = create((set) => ({
    message: "",
    showSlide: false,

    show: (message) => set({ message, showSlide: true }),

    hide: () => set({ showSlide: false })
}))

export const showSlide = (message) => {
    useSlideStorage.getState().show(message)
}

export default useSlideStorage
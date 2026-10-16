import { create } from "zustand"

const useMateCodeStorage = create((set) => ({
    files: [],
    selectedFile: null,

    setFiles: (files) => set({
        files,
        selectedFile: files[0]?.name || null

    }),

    setSelectedFile: (name) => set({
        selectedFile: name
    }),

    clearFiles: () => set({
        files: [],
        selectedFile: null
    })


}))

export default useMateCodeStorage


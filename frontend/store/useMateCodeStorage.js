import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const useMateCodeStorage = create(
    persist(
        (set) => ({
            files: [],
            selectedFile: null,

            setFiles: (files) => {
                const nextFiles = Array.isArray(files) ? files : [];

                set({
                    files: nextFiles,
                    selectedFile: nextFiles[0]?.name ?? null,
                });
            },

            setSelectedFile: (name) => set({
                selectedFile: name,
            }),

            clearFiles: () => set({
                files: [],
                selectedFile: null,
            }),
        }),
        {
            name: "mate-code-storage",
            storage: createJSONStorage(() => localStorage),
            partialize: (state) => ({
                files: state.files,
                selectedFile: state.selectedFile,
            }),
        }
    )
);

export default useMateCodeStorage;
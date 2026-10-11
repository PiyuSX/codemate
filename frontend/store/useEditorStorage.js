import { create } from "zustand";
import { persist } from "zustand/middleware";

const useEditorStorage = create(
    persist(
        (set) => ({
            files: [],
            selectedFile: null,

            setSelectedFile: (name) => set({selectedFile: name}),

            createFile: (name) => set({ selectedFile: name}),

            createFile: (file) => 
                set((state) => ({
                    files: [...state.files, file],
                    selectedFile: file.name,
                })),

            updateFileContent: (name, content) => 
                set((state) => ({
                    files: state.files.map((file) =>
                    file.name === name ? {...file, content} : file
                    )
                })),
            deleteFile: (name) => 
                set((state) => {
                    const files = state.files.filter((file) => file.name !== name);

                    return {
                        files,
                        selectedFile: state.selectedFile === name ? files[0]?.name || null : state.selectedFile,
                    };
                }),

            renameFile: (oldName, newName) => 
                set((state) => {
                    const name = newName.trim()

                    if(!name || state.files.some((file) => file.name === name)) {
                        return state;
                    }

                    return {
                        files: state.files.map((file) => 
                           file.name === oldName ? {...file, name} : file),

                        selectedFile:
                        state.selectedFile === oldName ? name: state.selectedFile,
                    }
                })

           

        }),
        {
            name: "codemate-editor"
        }
    )
)

export default useEditorStorage
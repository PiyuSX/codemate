import { create } from "zustand";
import { persist } from "zustand/middleware";

const useEditorStorage = create(
  persist(
    (set) => ({
      files: [],
      selectedFile: null,

      setSelectedFile: (name) => set({ selectedFile: name }),

      createFile: (file) =>
        set((state) => ({
          files: [...state.files, file],
          selectedFile: file.name,
        })),

      clearFiles: () =>
        set({
          files: [],
          selectedFile: null,
        }),
      updateFileContent: (name, content) =>
        set((state) => ({
          files: state.files.map((file) =>
            file.name === name ? { ...file, content } : file,
          ),
        })),
      deleteFile: (name) =>
        set((state) => {
          const files = state.files.filter((file) => file.name !== name);

          return {
            files,
            selectedFile:
              state.selectedFile === name
                ? files[0]?.name || null
                : state.selectedFile,
          };
        }),

      renameFile: (oldName, newName) =>
        set((state) => {
          const name = newName.trim();

          if (!name || state.files.some((file) => file.name === name)) {
            return state;
          }

          return {
            files: state.files.map((file) =>
              file.name === oldName
                ? {
                    ...file,
                    name,
                    type: name.includes(".")
                      ? name.split(".").pop().toLowerCase()
                      : "",
                  }
                : file,
            ),

            selectedFile:
              state.selectedFile === oldName ? name : state.selectedFile,
          };
        }),

      setReadme: () =>
        set({
          files: [
            {
              name: "README.txt",
              type: "txt",
              content: `Welcome to CodeMate!

RULES

1. Both players choose a topic that can be implemented in a web browser.
2. Build your own solution independently.
3. Submit your code when you're ready.
4. Once both players submit, share and review each other's code.
5. Judge each other's work fairly based on creativity, functionality, code quality, and how well it matches the topic.
6. No abuse, harassment, or toxic behavior.
7. Don't copy your opponent's code before submitting your own.
8. Be respectful and have fun!
9. Remember, the goal is to learn and improve together.

CODING NOTES

- You can use HTML, CSS, and JavaScript.
- You don't need to import CSS and JS files. Just write your CSS and JavaScript directly in your code.
- Test your solution before submitting.
- Give honest feedback and learn from each other.

Good luck. May the best code win!`,
            },
          ],
          selectedFile: "README.txt",
        }),
    }),
    {
      name: "codemate-editor",
    },
  ),
);

export default useEditorStorage;

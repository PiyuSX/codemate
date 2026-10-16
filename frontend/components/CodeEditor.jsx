"use client";

import Editor from "@monaco-editor/react";
import useEditorStorage from "@/store/useEditorStorage";
import useMateCodeStorage from "@/store/useMateCodeStorage";

export default function CodeEditor({ mode = "own"}) {
  const ownFiles = useEditorStorage((state) => state.files ?? []);
const ownSelectedFile = useEditorStorage((state) => state.selectedFile);

const updateFileContent = useEditorStorage(
    (state) => state.updateFileContent,
);

const mateFiles = useMateCodeStorage((state) => state.files ?? []);
const mateSelectedFile = useMateCodeStorage((state) => state.selectedFile);

const files = mode === "mate" ? mateFiles : ownFiles;
const selectedFile = mode === "mate" ? mateSelectedFile : ownSelectedFile;

const activeFile = files.find((file) => file.name === selectedFile);

  if (!activeFile) {
    return (
      <div className="flex h-full items-center justify-center text-gray-400">
        Create a file to start coding!
      </div>
    );
  }

  const languageMap = {
    html: "html",
    css: "css",
    js: "javascript",
    py: "python",
  };

  return (
    <Editor
      className="border border-gray-700"
      key={`${mode}-${activeFile.name}`}
      height="100%"
      theme="vs-dark"
      language={languageMap[activeFile.type] || "plaintext"}
      value={activeFile.content ?? ""}
      onChange={mode === "own" ? (value) => updateFileContent(activeFile.name, value ?? "") : undefined}
      options={{
        readOnly: mode === "mate",
        fontSize: 18,
        lineHeight: 22,
        minimap: { enabled: false },
        wordWrap: "on",
        automaticLayout: true,
        tabSize: 2,
        padding: { top: 12 },
        scrollBeyondLastLine: false,
        lineNumbers: "on",
        renderLineHighlight: "all",
        bracketPairColorization: { enabled: true },
        cursorBlinking: "smooth",
        smoothScrolling: true,
        folding: true,
        suggestOnTriggerCharacters: true,
        quickSuggestions: {
          other: true,
          strings: true,
          comments: false,
        },
        autoClosingBrackets: "always",
        autoClosingQuotes: "always",
        autoIndent: "full",
        formatOnType: true,
      }}
    />
  );
}

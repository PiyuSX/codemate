"use client";

import Editor from "@monaco-editor/react";
import useEditorStorage from "@/store/useEditorStorage";

export default function CodeEditor() {
  const files = useEditorStorage((state) => state.files);
  const selectedFile = useEditorStorage((state) => state.selectedFile);
  const updateFileContent = useEditorStorage(
    (state) => state.updateFileContent,
  );

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
      key={activeFile.name}
      height="100%"
      theme="vs-dark"
      language={languageMap[activeFile.type] || "plaintext"}
      value={activeFile.content ?? ""}
      onChange={(value) => updateFileContent(activeFile.name, value ?? "")}
      options={{
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

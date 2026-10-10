
"use client";

import Editor from "@monaco-editor/react";

export default function CodeEditor() {
  return (
    <Editor className="border border-gray-700"
      height="100%"
      theme="vs-dark"
      defaultLanguage="html"
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
        bracketPairColorization: {
          enabled: true,
        },
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
        suggestOnTriggerCharacters: true,
      }}
    />
  );
}

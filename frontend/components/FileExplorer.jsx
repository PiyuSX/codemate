"use client";

import { PlusCircle } from "lucide-react";
import { useState } from "react";
import { fileIcons } from "@/lib/fileIcon";
import useEditorStorage from "@/store/useEditorStorage";

export default function FileExplorer() {
  const {
    files,
    selectedFile,
    setSelectedFile,
    createFile: addFile,
  } = useEditorStorage();

  const [filename, setFilename] = useState("");
  const [showFileInput, setShowFileInput] = useState(false);

  const createFile = () => {
    const name = filename.trim();

    if (!name) return;
    if (files.some((file) => file.name === name)) return;

    const type = name.includes(".") ? name.split(".").pop().toLowerCase() : "";

    addFile({name, type, content: ""});

    setFilename("");
    setShowFileInput(false);
  };

  return (
    <div>
      <div className="flex items-center justify-between border-b border-gray-800 p-2">
        <h2 className="text-lg font-semibold ">Files</h2>
        <PlusCircle onClick={() => setShowFileInput(true)} />
      </div>
      <div className="flex flex-col gap-2 p-2 font-semibold">
        {files.map((file) => (
          <div
            onClick={() => setSelectedFile(file.name)}
            key={file.name}
            className={` ${selectedFile === file.name ? "bg-gray-700" : ""} flex items-center gap-2 hover:bg-gray-700 p-2 rounded-lg cursor-pointer`}
          >
            <img
              src={fileIcons[file.type] || fileIcons.default}
              alt={file.type}
              className="w-6 h-6"
            />
            <span>{file.name}</span>
          </div>
        ))}
        {showFileInput && (
          <input
            autoFocus
            type="text"
            value={filename}
            className="bg-gray-700 text-white p-2 rounded-lg w-full"
            onChange={(e) => setFilename(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") createFile();

              if (e.key === "Escape") {
                setShowFileInput(false);
                setFilename("");
              }
            }}
          />
        )}
      </div>
    </div>
  );
}

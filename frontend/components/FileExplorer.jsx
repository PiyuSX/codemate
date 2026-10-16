
"use client";

import { PlusCircle, Pencil, Trash2 } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { fileIcons } from "@/lib/fileIcon";
import useEditorStorage from "@/store/useEditorStorage";

const FileExplorer = () => {
  const {
    files,
    selectedFile,
    setSelectedFile,
    createFile: addFile,
    deleteFile,
    renameFile,
  } = useEditorStorage();

  const [filename, setFilename] = useState("");
  const [showFileInput, setShowFileInput] = useState(false);

  const [contextMenu, setContextMenu] = useState(null);
  const [renamingFile, setRenamingFile] = useState(null);
  const [newName, setNewName] = useState("");

  const menuRef = useRef(null);
  const renameInputRef = useRef(null);

  useEffect(() => {
    const closeMenu = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setContextMenu(null);
      }
    };

    const closeOnEscape = (e) => {
      if (e.key === "Escape") {
        setContextMenu(null);
        setRenamingFile(null);
        setNewName("");
      }
    };

    document.addEventListener("mousedown", closeMenu);
    document.addEventListener("keydown", closeOnEscape);

    return () => {
      document.removeEventListener("mousedown", closeMenu);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, []);

  const openContextMenu = (e, fileName) => {
    e.preventDefault();

    setContextMenu({
      fileName,
      x: Math.max(0, Math.min(e.clientX, window.innerWidth - 160)),
      y: Math.max(0, Math.min(e.clientY, window.innerHeight - 100)),
    });
  };

  const startRename = () => {
    setNewName(contextMenu.fileName);
    setRenamingFile(contextMenu.fileName);
    setContextMenu(null);

    setTimeout(() => renameInputRef.current?.focus(), 0);
  };

  const saveRename = (e) => {
    e.preventDefault();

    const name = newName.trim();

    if (!name) return;

    if (files.some((file) => file.name === name) && name !== renamingFile) {
      return;
    }

    if (name !== renamingFile) {
      renameFile(renamingFile, name);
    }

    setRenamingFile(null);
    setNewName("");
  };

  const handleDelete = () => {
    const name = contextMenu.fileName;

    if (window.confirm(`Sure to delete "${name}"?`)) {
      deleteFile(name);
    }

    setContextMenu(null);
  };

  const createFile = () => {
    const name = filename.trim();

    if (!name) return;
    if (files.some((file) => file.name === name)) return;

    const type = name.includes(".") ? name.split(".").pop().toLowerCase() : "";

    addFile({ name, type, content: "" });

    setFilename("");
    setShowFileInput(false);
  };

  return (
    <div>
      <div className="flex items-center justify-between border-b border-gray-800 p-2">
        <h2 className="text-lg font-semibold ">Files</h2>
        <PlusCircle
          className="cursor-pointer"
          onClick={() => setShowFileInput(true)}
        />
      </div>

      <div className="flex flex-col gap-2 p-2 font-semibold">
        {files.map((file) => (
          <div
            onClick={() => {
              if (renamingFile !== file.name) {
                setSelectedFile(file.name);
              }
            }}
            onContextMenu={(e) => openContextMenu(e, file.name)}
            key={file.name}
            className={` ${selectedFile === file.name ? "bg-gray-700" : ""} flex items-center gap-2 hover:bg-gray-700 p-2 rounded-lg cursor-pointer`}
          >
            <img
              src={fileIcons[file.type] || fileIcons.default}
              alt={file.type}
              className="w-6 h-6"
            />

            {renamingFile === file.name ? (
              <form onSubmit={saveRename}>
                <input
                  ref={renameInputRef}
                  autoFocus
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  onClick={(e) => e.stopPropagation()}
                  onBlur={() => {
                    setRenamingFile(null);
                    setNewName("");
                  }}
                  className="bg-gray-900 text-white rounded px-1 outline-none w-full"
                />
              </form>
            ) : (
              <span>{file.name}</span>
            )}
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

      {contextMenu && (
        <div
          ref={menuRef}
          className="fixed z-50 w-40 rounded-lg border border-gray-700 bg-gray-900 p-1 shadow-xl"
          style={{ left: contextMenu.x, top: contextMenu.y }}
          onContextMenu={(e) => e.preventDefault()}
        >
          <button
            onClick={startRename}
            className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-sm hover:bg-gray-700"
          >
            <Pencil size={15} />
            Rename
          </button>

          <button
            onClick={handleDelete}
            className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-sm text-red-400 hover:bg-gray-700"
          >
            <Trash2 size={15} />
            Delete
          </button>
        </div>
      )}
    </div>
  );
}


export default FileExplorer
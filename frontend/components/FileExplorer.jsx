"use client"

import { PlusCircle } from "lucide-react"
import { useState } from "react";
import { fileIcons } from "@/lib/fileIcon";


export default function FileExplorer() {


    const [filename, setFilename] = useState([{ name: "script.py", type: "py" }])
    const [selectedFile, setSelectedFile] = useState('')
    const [showFileInput, setShowFileInput] = useState(false)

   


    return(
        <div>
            <div className="flex items-center justify-between border-b border-gray-800 p-2">
            <h2 className="text-lg font-semibold ">Files</h2>
            <PlusCircle onClick={() => setShowFileInput(true)} />
            </div>
            <div className="flex flex-col gap-2 p-2 font-semibold">
                {filename.map((file, index) => (
                    <div onClick={() => setSelectedFile(file.name)} key={index} className={` ${selectedFile === file.name ? 'bg-gray-700' : ''} flex items-center gap-2 hover:bg-gray-700 p-2 rounded-lg cursor-pointer`}>
                        <img src={fileIcons[file.type] || fileIcons.default} alt={file.type} className="w-6 h-6" />
                        <span>{file.name}</span>
                    </div>
                ))}
                 {showFileInput && (
                    <input
                      autoFocus
                      type="text"
                      value={filename}
                     className="bg-gray-700 text-white p-2 rounded-lg w-full"
                    />
                 )}
            </div>
        </div>
    )
}
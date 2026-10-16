"use client"
import { fileIcons } from "@/lib/fileIcon"
import useMateCodeStorage from "@/store/useMateCodeStorage"

const MateFileExplorer = ({ onModeChange }) => {

    const { files, selectedFile, setSelectedFile } = useMateCodeStorage()


    

  return (
    <div>
        <div className="border-b border-gray-800 p-2">
            <h2 className="text-lg font-semibold">Mates Files</h2>
        </div>

        <div className="flex flex-col gap-2 p-2 font-semibold">
            {files.map((file) => (
                <div 
                key={file.name}
                onClick={() =>{ setSelectedFile(file.name)
                    onModeChange?.("mate");
                }}
                
                className={`flex items-center gap-2 rounded-lg p-2 hover:bg-gray-700 cursor-pointer ${selectedFile === file.name ? "bg-gray-700": ""}`}
                
                >
                    <img
                     src={fileIcons[file.type] || fileIcons.default}
                     alt={file.type}
                     className="h-6 w-6"
                    />

                    <span>{file.name}</span>

                </div>
            ))}

            {files.length === 0 && (
                <p>Mate has not submitted yet.</p>
            )}
        </div>
    </div>
  )
}

export default MateFileExplorer
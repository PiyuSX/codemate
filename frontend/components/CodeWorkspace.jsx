"use client";

import { useState } from "react";
import { Play, Square, Columns2, Code2, Monitor } from "lucide-react";

import CodeEditor from "@/components/CodeEditor";
import LivePreview from "@/components/LivePreview";

const CodeWorkPlace = () => {
    const [running, setRunning] = useState(false);
    const [view, setView] = useState("editor");

    const handleRun = () => {
        setRunning(true);
        setView("preview");
    };

    const handleStop = () => {
        setRunning(false);
        setView("editor");
    };

    return (
        <div className="m-4 flex min-h-0 flex-col overflow-hidden rounded-lg bg-gray-900 text-white">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-gray-700 p-3">
                <div className="flex items-center gap-2">
                    {/* Using normal button not our component cuz its not suitble her  */}
                    <button
                        type="button"
                        onClick={handleRun}
                        className="flex items-center gap-2 rounded bg-green-600 px-3 py-2 hover:bg-green-700"
                    >
                        <Play size={16} />
                        Run
                    </button>

                    <button
                        type="button"
                        onClick={handleStop}
                        disabled={!running}
                        className="flex items-center gap-2 rounded bg-red-600 px-3 py-2 hover:bg-red-700 disabled:opacity-50"
                    >
                        <Square size={16} />
                        Stop
                    </button>
                </div>

                <div className="flex items-center gap-2">
                    <button
                        type="button"
                        onClick={() => setView("editor")}
                        className="rounded p-2 hover:bg-gray-700"
                        title="Editor"
                    >
                        <Code2 size={18} />
                    </button>

                    <button
                        type="button"
                        onClick={() => setView("split")}
                        disabled={!running}
                        className="rounded p-2 hover:bg-gray-700 disabled:opacity-50"
                        title="Split view"
                    >
                        <Columns2 size={18} />
                    </button>

                    <button
                        type="button"
                        onClick={() => setView("preview")}
                        disabled={!running}
                        className="rounded p-2 hover:bg-gray-700 disabled:opacity-50"
                        title="Preview"
                    >
                        <Monitor size={18} />
                    </button>
                </div>
            </div>

            <div className="flex h-[calc(100vh-120px)] min-h-0">
                {view !== "preview" && (
                    <div
                        className={`min-h-0 min-w-0 ${
                            view === "split"
                                ? "w-1/2 border-r border-gray-700"
                                : "w-full"
                        }`}
                    >
                        <CodeEditor />
                    </div>
                )}

                {running && view !== "editor" && (
                    <div
                        className={`min-h-0 min-w-0 ${
                            view === "split" ? "w-1/2" : "w-full"
                        }`}
                    >
                        <LivePreview running={running} />
                    </div>
                )}
            </div>
        </div>
    );
};

export default CodeWorkPlace;
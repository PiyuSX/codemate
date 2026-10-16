"use client";

import { useMemo } from "react";
import useEditorStorage from "@/store/useEditorStorage";
import useMateStorage from "@/store/useMateStorage";

const LivePreview = ({ running, mode = "own" }) => {

    const ownFiles = useEditorStorage((state) => state.files);
    const mateFiles = useMateStorage((state) => state.files)


    const files = mode == "mate" ? mateFiles : ownFiles;

    const srcDoc = useMemo(() => {
        const htmlFile = files.find(
            (file) => file.type?.toLowerCase() === "html"
        );

        const cssFile = files.find(
            (file) => file.type?.toLowerCase() === "css"
        );

        const jsFile = files.find(
            (file) =>
                file.type?.toLowerCase() === "js" ||
                file.type?.toLowerCase() === "javascript"
        );

        if (!htmlFile) return "";

        let html = htmlFile.content ?? "";

        const css = cssFile?.content ?? "";
        const js = jsFile?.content ?? "";

        if (css) {
            const style = `<style>${css}</style>`;

            if (/<\/head>/i.test(html)) {
                html = html.replace(/<\/head>/i, `${style}</head>`);
            } else if (/<html[\s>]/i.test(html)) {
                html = html.replace(
                    /<html[^>]*>/i,
                    (match) => `${match}<head>${style}</head>`
                );
            } else {
                html = `${style}${html}`;
            }
        }

        if (js) {
            const script = `<script>${js}</script>`;

            if (/<\/body>/i.test(html)) {
                html = html.replace(/<\/body>/i, `${script}</body>`);
            } else if (/<\/html>/i.test(html)) {
                html = html.replace(/<\/html>/i, `${script}</html>`);
            } else {
                html += script;
            }
        }

        return html;
    }, [files]);

    if (!running) return null;

    if (!srcDoc) {
        return (
            <div className="flex h-full items-center justify-center bg-white text-black">
                Create an HTML file to start the preview.
            </div>
        );
    }

    return (
        <iframe
            title="Live Preview"
            srcDoc={srcDoc}
            sandbox="allow-scripts"
            className="h-full w-full bg-white"
        />
    );
};

export default LivePreview;
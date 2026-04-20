import { Upload } from "lucide-react";
import React, { useState } from "react";

type FileUploaderProps = {
    accept?: string;
    multiple?: boolean;
    onFilesChange?: (files: File[]) => void;
};

export default function FileUploader({
    // accept = "image/*,.pdf,.docx",
    accept="image/jpeg,image/png,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    multiple = true,
    onFilesChange,
}: FileUploaderProps) {
    const [dragActive, setDragActive] = useState(false);

    const handleFiles = (files: FileList | null) => {
        if (!files) return;
        const selected = Array.from(files);
        onFilesChange?.(selected);
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setDragActive(false);
        handleFiles(e.dataTransfer.files);
    };

    return (
        <div
            className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition ${dragActive ? "border-blue-500 bg-blue-50" : "border-gray-300"
                }`}
            onDrop={handleDrop}
            onDragOver={(e) => {
                e.preventDefault();
                setDragActive(true);
            }}
            onDragLeave={() => setDragActive(false)}
            onClick={() => document.getElementById("fileInput")?.click()}
        >
            <div className="flex flex-col items-center gap-2">
                <span className="text-2xl bg-[#DBEAFE] p-3 rounded"><Upload /></span>
                <p className="text-gray-600">Click to upload files</p>
                <p className="text-xs text-gray-400">
                    {/* Support: JPG, PNG, DOCX, PDF (Max 100MB) */}
                    Support: JPG, PNG, PDF
                </p>
            </div>
            <input
                type="file"
                id="fileInput"
                accept={accept}
                multiple={multiple}
                className="hidden"
                onChange={(e) => handleFiles(e.target.files)}
            />
        </div>
    );
}

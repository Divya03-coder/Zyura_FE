import { DockIcon, Image, Video, XCircle } from "lucide-react";
import { FaFilePdf } from "react-icons/fa";

type FilePreviewListProps = {
    files: File[];
    onRemove?: (index: number) => void;
};

export default function FilePreviewList({ files, onRemove }: FilePreviewListProps) {
    return (
        <div className="space-y-2">
            {files.map((file, index) => {
                const fileSize = (file.size / (1024 * 1024)).toFixed(1); // MB
                const fileDate = new Date().toISOString().split("T")[0]; // demo date

                return (
                    <div
                        key={index}
                        className="flex items-center justify-between bg-gray-50 p-3 rounded-lg border border-black/10"
                    >
                        <div className="flex items-center gap-3">
                            {/* File Icon */}
                            <div className="text-xl">
                                {file.type.startsWith("image/") && <Image />}
                                {file.type.startsWith("video/") && <Video />}
                                {file.type === "application/pdf" && <FaFilePdf />}
                                {file.name.endsWith(".docx") && <DockIcon />}
                            </div>
                            {/* File Info */}
                            <div>
                                <p className="text-sm font-medium">{file.name}</p>
                                <p className="text-xs text-gray-500">
                                    {fileSize} MB • {fileDate}
                                </p>
                            </div>
                        </div>
                        {/* Remove button */}
                        <button
                            type="button"
                            onClick={() => onRemove?.(index)}
                            className="text-red-500 hover:text-red-700 text-lg cursor-pointer"
                        >
                            <XCircle />
                        </button>
                    </div>
                );
            })}
        </div>
    );
}

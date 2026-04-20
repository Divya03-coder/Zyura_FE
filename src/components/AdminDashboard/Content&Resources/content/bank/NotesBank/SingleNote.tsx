import CommonButton from "@/common/button/CommonButton";
import Spinner from "@/common/custom/Spinner";
import { useUpdatedNotesMutation } from "@/store/features/adminDashboard/ContentResources/Notes/NoteSlice";
import { NotesResponse } from "@/store/features/adminDashboard/ContentResources/Notes/types/Notes";
import { Download, Upload, X } from "lucide-react";
import { useEffect, useState } from "react";
import { MdEdit } from "react-icons/md";

export const inputClass = {
  input:
    "text-sm font-normal text-black font-inter leading-[20px] outline-none transition w-full px-4 py-3 border border-border rounded-md",
  label: "text-sm font-normal text-black font-inter leading-[20px] block mb-2",
  error: "text-red-500 text-sm mt-1",
};

interface ClinicalCaseData {
  data: NotesResponse;
  setBankId: (id: string) => void;
}

interface FileWithPreview {
  file: File;
  id: string;
  url?: string; // optional for existing files
}

const SingleNote: React.FC<ClinicalCaseData> = ({ data, setBankId }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const item = data?.data;

  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  const [uploadedFiles, setUploadedFiles] = useState<FileWithPreview[]>([]);

  const [updateNotes, { isLoading }] = useUpdatedNotesMutation();

  const fields: (keyof typeof formData)[] = ["title", "description"];

  useEffect(() => {
    if (item) {
      setFormData({
        title: item.title ?? "",
        description: item.description ?? "",
      });

      // Pre-fill uploaded files for preview (if any)
      if (item.notes?.length) {
        setUploadedFiles(
          item.notes.map((note) => ({
            file: new File([], note.fileName), // placeholder, real file cannot be reconstructed
            id: note.fileId,
            url: note.fileUrl,
          })),
        );
      }
    }
  }, [item]);

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileUpload = (files: FileList | null) => {
    if (!files || files.length === 0) return;

    const acceptedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];

    const newValidFiles: FileWithPreview[] = [];

    Array.from(files).forEach((file) => {
      const isValidType = acceptedTypes.includes(file.type);
      const isValidSize = file.size <= 10 * 1024 * 1024;

      if (isValidType && isValidSize) {
        newValidFiles.push({
          file,
          id: `${file.name}-${Date.now()}-${Math.random()}`,
        });
      }
    });

    if (newValidFiles.length > 0) {
      setUploadedFiles((prev) => [...prev, ...newValidFiles]);
    }
  };

  const removeFile = (id: string) => {
    setUploadedFiles(uploadedFiles.filter((f) => f.id !== id));
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i];
  };

  const handleSubmit = async () => {
    if (!item || isLoading) return;

    try {
      const formdata = new FormData();
      formdata.append("data", JSON.stringify(formData));

      uploadedFiles.forEach((f) => {
        if (f.file.size) formdata.append("files", f.file); // append only new files
      });

      await updateNotes({ id: item._id, data: formdata }).unwrap();
      setIsModalOpen(false);
    } catch (err) {
      console.error("Failed to update note", err);
    }
  };

  const handleBack = () => {
    setBankId("");
  };

  return !item ? (
    <Spinner />
  ) : (
    <>
      <div className="bg-white shadow-md rounded-xl p-4 border border-gray-200 hover:shadow-lg transition">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-bold mb-2">{item.title}</h2>

          <CommonButton
            type="button"
            className="!px-3 !py-2"
            onClick={() => setIsModalOpen(true)}
          >
            <MdEdit />
          </CommonButton>
        </div>

        <p className="text-sm text-black">{item.description}</p>

        <div className="mt-3 space-y-1 text-sm text-black">
          <p>
            <span className="font-semibold">Subject:</span> {item.subject}
          </p>
          <p>
            <span className="font-semibold">System:</span> {item.system}
          </p>
          <p>
            <span className="font-semibold">Topic:</span> {item.topic}
          </p>

          {item.subtopic && (
            <p>
              <span className="font-semibold">Subtopic:</span> {item.subtopic}
            </p>
          )}
          <p>
            <span className="font-semibold">Student:</span> {item.profileType}
          </p>
        </div>

        {/* Files Section */}
        <div className="mt-4">
          <h3 className="font-medium text-gray-800">Download Notes</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
            {item?.notes?.map((note) => (
              <a
                key={note.fileId}
                href={note.fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 mt-2 bg-primary/10 border border-border text-primary px-3 py-2 rounded-lg text-sm font-medium hover:bg-blue-600 hover:text-white transition"
              >
                <Download size={18} />
                {note?.fileName}
              </a>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <p className="mt-3 text-xs text-gray-500">
            Uploaded: {new Date(item.createdAt).toLocaleDateString()}
          </p>
          <CommonButton
            type="button"
            className="bg-blue-500 hover:bg-blue-600 text-white"
            onClick={handleBack}
          >
            Back
          </CommonButton>
        </div>
      </div>

      {/* Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex justify-center items-center">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl p-6 space-y-4 max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold text-gray-800">Edit Notes</h2>

            {/* Title & Description */}
            <div className="grid grid-cols-1 gap-3">
              {fields.map((field) => (
                <div key={field}>
                  <label className="block text-sm font-medium capitalize">
                    {field}
                  </label>
                  {field === "description" ? (
                    <textarea
                      name={field}
                      value={formData[field]}
                      onChange={handleChange}
                      rows={4}
                      className={inputClass.input}
                    />
                  ) : (
                    <input
                      name={field}
                      value={formData[field]}
                      onChange={handleChange}
                      className={inputClass.input}
                    />
                  )}
                </div>
              ))}
            </div>

            {/* File Upload */}
            <div className="max-w-full mx-auto py-4">
              <div
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault();
                  handleFileUpload(e.dataTransfer.files);
                }}
                className="relative border-2 border-dashed rounded-xl p-6 text-center hover:border-slate-400 hover:bg-slate-100"
              >
                <input
                  type="file"
                  className="hidden"
                  id="update-file-upload"
                  accept=".pdf,.doc,.docx"
                  multiple
                  onChange={(e) => handleFileUpload(e.target.files)}
                />
                <label htmlFor="update-file-upload" className="cursor-pointer">
                  <div className="flex flex-col items-center space-y-2">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <Upload className="w-6 h-6 text-blue-600" />
                    </div>
                    <p className="text-sm text-slate-700">Upload Notes files</p>
                    <p className="text-xs text-slate-500">
                      PDF, DOC, DOCX (max. 10MB)
                    </p>
                  </div>
                </label>
              </div>

              {uploadedFiles.length > 0 && (
                <div className="space-y-2 mt-4">
                  {uploadedFiles.map((file) => (
                    <div
                      key={file.id}
                      className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-200"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                          <span className="text-blue-600 font-semibold text-xs">
                            {file.file.name.split(".").pop()?.toUpperCase()}
                          </span>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-slate-700">
                            {file.file.name}
                          </p>
                          {file.file.size && (
                            <p className="text-xs text-slate-500">
                              {formatFileSize(file.file.size)}
                            </p>
                          )}
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeFile(file.id)}
                        className="p-2 hover:bg-slate-200 rounded-lg transition-colors"
                      >
                        <X className="w-5 h-5 text-slate-500" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Modal Actions */}
            <div className="flex justify-end gap-3">
              <CommonButton
                type="button"
                className="!px-4 !py-2"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </CommonButton>

              <CommonButton
                type="button"
                className="!px-4 !py-2 !bg-blue-600 !text-white"
                onClick={handleSubmit}
                disabled={isLoading}
              >
                {isLoading ? "Updating..." : "Update"}
              </CommonButton>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SingleNote;

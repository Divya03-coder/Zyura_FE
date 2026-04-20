/* eslint-disable @typescript-eslint/no-explicit-any */
import DashboardHeading from "@/components/reusable/DashboardHeading";
import FilePreviewList from "@/components/reusable/FilePreview";
import FileUploader from "@/components/reusable/FileUploader";
import { useGenerateNoteMutation } from "@/store/features/note/NoteAPI";
import { ArrowLeft, Atom, Loader2 } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

// export default function CreateNotes() {
//   const navigate = useNavigate();
//   const [generateNote, { isLoading }] = useGenerateNoteMutation();

//   const [files, setFiles] = useState<File[]>([]);
//   const [note, setNote] = useState("");
//   const [noteName, setNoteName] = useState("");
//   const [noteFormat, setNoteFormat] = useState("Bullet point");

//   // error stet
//   const [fileError, setFileError] = useState("");
//   const [promptError, setPromptError] = useState("");

//   const handleRemoveFile = (index: number) => {
//     setFiles(files.filter((_, i) => i !== index));
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!files.length && !note.trim()) {
//       setFileError("Please upload a file or enter a prompt");
//       setPromptError("Please upload a file or enter a prompt");
//       return;
//     }

//     //if valid clear errors
//     setFileError("");
//     setPromptError("");

//     const formData = new FormData();
//     formData.append("file", files[0]); // API expects single file 'file'

//     // Construct the data object as JSON string
//     const dataPayload = {
//       make_your_note: note,
//       topic_name: noteName,
//       note_format: noteFormat,
//     };
//     formData.append("data", JSON.stringify(dataPayload));

//     try {
//       const res = await generateNote(formData).unwrap();
//       if (res.success) {
//         toast.success("Note generated successfully!");
//         navigate(`/dashboard/generated-notes/${res.data._id}`);
//       }
//     } catch (error: any) {
//       console.error("Failed to generate note:", error);
//       toast.error(error?.data?.message || "Failed to generate note");
//     }
//   };

//   return (
//     <div className="w-full">
//       <div className="flex items-center gap-3">
//         <Link to={"/dashboard/download-notes"} className="mb-3">
//           <ArrowLeft />
//         </Link>
//         <DashboardHeading
//           title="Create Notes"
//           titleSize="text-xl"
//           description="Builds confidence through repeated practice."
//           className="mt-4 space-y-1"
//         />
//       </div>

//       <div className="w-full">
//         <form
//           onSubmit={handleSubmit}
//           className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5x mx-auto p-6"
//         >
//           {/* Uploader */}
//           <div
//             className={`p-6 border rounded-xl  bg-slate-50 ${fileError ? "border-red-200" : "border-black/10"} `}
//           >
//             <h3 className="flex items-center gap-2 text-lg font-semibold mb-2">
//               <Upload className="w-5 h-5 mb-1" /> Upload Media
//             </h3>
//             <p className="text-sm text-gray-500 mb-4">
//               Upload images or videos to generate AI-powered Notes
//             </p>
//             <FileUploader
//               onFilesChange={(newFiles) => setFiles([...files, ...newFiles])}
//             />

//             {files.length > 0 && (
//               <div className="mt-4">
//                 <div className="mb-4">
//                   <h3 className="text-lg font-semibold">Recent Uploads</h3>
//                   <p className="text-sm text-gray-500">
//                     Your uploaded files ready for note generation
//                   </p>
//                 </div>
//                 {/* Preview List */}
//                 <FilePreviewList files={files} onRemove={handleRemoveFile} />
//               </div>
//             )}

//             {fileError && <p className="text-red-500 mt-2">{fileError}*</p>}
//           </div>

//           {/* Right side */}
//           <div className="p-6 border rounded-xl border-black/10 space-y-4 ">
//             <p className="text-sm font-medium text-gray-500 mb-4">
//               Give prompt for note generation
//             </p>

//             {/* Note Textarea */}
//             <textarea
//               placeholder="Make your note! (optional instructions)"
//               value={note}
//               onChange={(e) => setNote(e.target.value)}
//               className={`w-full border rounded p-3 text-sm ${promptError ? "border-red-200" : "border-black/10"}`}
//               rows={4}
//             />

//             {/* Dropdowns */}
//             <div>
//               <label className="block text-sm mb-1">Note Name / Topic</label>
//               <input
//                 value={noteName}
//                 onChange={(e) => setNoteName(e.target.value)}
//                 placeholder="Enter topic name (e.g. Cardiology Basics)"
//                 className="w-full border rounded p-2 text-sm border-black/10"
//               />
//             </div>

//             <div>
//               <label className="block text-sm mb-1">Note Format</label>
//               <select
//                 value={noteFormat}
//                 onChange={(e) => setNoteFormat(e.target.value)}
//                 className="w-full border rounded border-black/10 p-2 text-sm"
//               >
//                 <option value="Bullet point">Bullet point</option>
//                 <option value="Summary">Summary</option>
//                 <option value="Paragraph">Paragraph</option>
//               </select>
//             </div>

//             {/* Buttons */}
//             <div className="flex gap-3">
//               <button
//                 type="submit"
//                 disabled={isLoading}
//                 className="flex-1 flex justify-center items-center gap-2 bg-slate-500 text-white py-2 rounded-lg hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed"
//               >
//                 {isLoading ? (
//                   <>
//                     <Loader2 className="animate-spin w-4 h-4" /> Generating...
//                   </>
//                 ) : (
//                   <>
//                     <Atom className="w-4 h-4" /> Generate Notes
//                   </>
//                 )}
//               </button>
//             </div>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

export default function CreateNotes() {
  const navigate = useNavigate();
  const [generateNote, { isLoading }] = useGenerateNoteMutation();

  const [files, setFiles] = useState<File[]>([]);
  const [note, setNote] = useState("");
  const [noteName, setNoteName] = useState("");
  const [noteFormat, setNoteFormat] = useState("Bullet point");

  // error state
  const [fileError, setFileError] = useState("");
  const [promptError, setPromptError] = useState("");

  const handleRemoveFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate: at least one required
    if (!files.length && !note.trim()) {
      setFileError("Please upload a file or enter a prompt");
      setPromptError("Please upload a file or enter a prompt");
      return;
    }

    // Clear errors if valid
    setFileError("");
    setPromptError("");

    const formData = new FormData();

    // Only append file if exists
    if (files.length > 0) {
      formData.append("file", files[0]);
    }

    const dataPayload = {
      make_your_note: note,
      topic_name: noteName,
      note_format: noteFormat,
    };

    formData.append("data", JSON.stringify(dataPayload));

    try {
      const res = await generateNote(formData).unwrap();
      if (res.success) {
        toast.success("Note generated successfully!");
        navigate(`/dashboard/generated-notes/${res.data._id}`);
      }
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to generate note");
    }
  };

  return (
    <div className="w-full">
      <div className="flex items-center gap-3">
        <Link to={"/dashboard/download-notes"} className="mb-3">
          <ArrowLeft />
        </Link>
        <DashboardHeading
          title="Create Notes"
          titleSize="text-xl"
          description="Builds confidence through repeated practice."
          className="mt-4 space-y-1"
        />
      </div>
      <div className="w-full">
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5x mx-auto p-6"
        >
          {/* Upload Section */}
          <div
            className={`p-6 border rounded-xl bg-slate-50 ${
              fileError ? "border-red-500" : "border-black/10"
            }`}
          >
            <FileUploader
              onFilesChange={(newFiles) => {
                setFiles([...files, ...newFiles]);

                // Clear errors when file added
                if (newFiles.length > 0) {
                  setFileError("");
                  setPromptError("");
                }
              }}
            />

            {fileError && (
              <p className="text-red-500 text-sm mt-2">{fileError}</p>
            )}

            {files.length > 0 && (
              <div className="mt-4">
                <div className="mb-4">
                  <h3 className="text-lg font-semibold">Recent Uploads</h3>
                  <p className="text-sm text-gray-500">
                    Your uploaded files ready for note generation
                  </p>
                </div>
                {/* Preview List */}
                <FilePreviewList files={files} onRemove={handleRemoveFile} />
              </div>
            )}
          </div>

          {/* Right Side */}
          <div className="p-6 border rounded-xl border-black/10 space-y-4">
            <textarea
              placeholder="Enter prompt (optional if file uploaded)"
              value={note}
              onChange={(e) => {
                const value = e.target.value;
                setNote(value);

                // Clear errors when typing
                if (value.trim()) {
                  setFileError("");
                  setPromptError("");
                }
              }}
              className={`w-full border rounded p-3 text-sm ${
                promptError ? "border-red-500" : "border-black/10"
              }`}
              rows={4}
            />

            {promptError && (
              <p className="text-red-500 text-sm -mt-3">{promptError}</p>
            )}

            <div>
              <label className="block text-sm mb-1">Note Name / Topic</label>
              <input
                value={noteName}
                onChange={(e) => setNoteName(e.target.value)}
                className="w-full border rounded p-2 text-sm border-black/10"
              />
            </div>

            <div>
              <label className="block text-sm mb-1">Note Format</label>
              <select
                value={noteFormat}
                onChange={(e) => setNoteFormat(e.target.value)}
                className="w-full border rounded border-black/10 p-2 text-sm"
              >
                <option value="Bullet point">Bullet point</option>
                <option value="Summary">Summary</option>
                <option value="Paragraph">Paragraph</option>
              </select>
            </div>

            <div className="flex">
              <button
                type="submit"
                disabled={isLoading}
                className="flex-1 flex justify-center items-center gap-2 bg-slate-500 text-white py-2 rounded-lg hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="animate-spin w-4 h-4" /> Generating...
                  </>
                ) : (
                  <>
                    <Atom className="w-4 h-4" /> Generate Notes
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

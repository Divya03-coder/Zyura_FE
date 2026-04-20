import { useState } from "react";
import DashboardHeading from "@/components/reusable/DashboardHeading";
import FilePreviewList from "@/components/reusable/FilePreview";
import FileUploader from "@/components/reusable/FileUploader";
import PrimaryButton from "@/components/reusable/PrimaryButton";
// import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Atom, Upload } from "lucide-react";
import { Link } from "react-router-dom";
import { GenerateMcqWithFileModal } from "./GenerateMcqWithFileModal";
import { toast } from "sonner";

const QuizGenerator = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [note, setNote] = useState("");
  const [openModal, setOpenModal] = useState(false);

  const handleRemoveFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  return (
    <div>
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-1">
          <Link to={"/dashboard/quiz-page"} className=" sm:mb-0">
            <ArrowLeft className="mb-1" />
          </Link>
          <DashboardHeading
            title="AI Quiz Generator"
            titleSize="text-xl"
            titleColor="text-[#0A0A0A]"
            description="Create custom quizzes from your images and prompts using AI"
            descColor="text-[#4A5565]"
            descFont="text-sm"
            className="mt-12 mb-8"
          />
        </div>
        <Link to={"/dashboard/quiz-page"}>
          <PrimaryButton
            bgType="solid"
            iconPosition="left"
            bgColor="bg-blue-btn-1"
            className="h-12 mb-4 hover:bg-blue-btn-1 hover:opacity-80 cursor-pointer"
          >
            Quiz Overview
          </PrimaryButton>
        </Link>
      </div>

      {/* <div className="bg-white py-5 px-7 mb-12">
        <div className="flex justify-between mb-6">
          <h3 className="text-sm text-[#0A0A0A]">Monthly Usage</h3>
        </div>
        <div>
          <div className="flex justify-between items-center mb-3">
            <p className="text-sm text-[#0A0A0A]">Uploads used this month</p>
            <p className="text-sm text-[#0A0A0A]">7 / 10</p>
          </div>
          <Progress value={70} />
        </div>
      </div> */}

      <div className="w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5x mx-auto p-6">
          {/* Left side: Uploader & Preview */}
          <div className="p-6 border rounded-xl border-black/10 flex flex-col gap-4">
            <div>
              <h3 className="flex items-center gap-2 text-lg font-semibold mb-2">
                <Upload className="w-5 h-5 mb-1" /> Upload Media
              </h3>
              <p className="text-sm text-gray-500 mb-4">
                Upload images to generate AI-powered quizzes
              </p>
              <FileUploader
                onFilesChange={(newFiles) => setFiles([...files, ...newFiles])}
              />
            </div>

            {files.length > 0 && (
              <div className="mt-4">
                <h3 className="text-lg font-semibold mb-2">Recent Uploads</h3>
                <FilePreviewList files={files} onRemove={handleRemoveFile} />
              </div>
            )}

            <button
              type="button"
              onClick={() => {
                if (files.length === 0) {
                  toast.error("Please upload a file first.");
                  return;
                }
                setOpenModal(true);
              }}
              className="mt-4 w-full flex justify-center items-center gap-4 bg-violet-700 text-white py-2.5 rounded-lg hover:bg-slate-700 cursor-pointer transition-colors"
            >
              <Upload className="w-4 h-4" />
              Generate with File
            </button>
          </div>

          {/* Right side: Prompt & Actions */}
          <div className="p-6 border rounded-xl border-black/10 flex flex-col justify-between gap-4">
            <div>
              <h3 className="text-lg font-semibold mb-2 text-violet-700">
                AI Prompt
              </h3>
              <p className="text-sm text-gray-500 mb-4">
                Write a prompt for generate quiz (example: generate mcq on
                anatomy)
              </p>
              <textarea
                placeholder="Ask me anything ! make your quiz"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                className="w-full border border-black/10 rounded p-3 text-sm min-h-[150px] mb-4"
              />
            </div>

            {/* Buttons */}
            <div className="flex flex-col gap-3">
              <button
                type="button"
                onClick={() => {
                  if (!note.trim()) {
                    toast.error("Please provide a prompt first.");
                    return;
                  }
                  setOpenModal(true);
                }}
                className="w-full flex justify-center items-center gap-4 bg-white border-2 border-violet-700 text-violet-700 py-2.5 rounded-lg hover:bg-violet-50 cursor-pointer transition-colors"
              >
                <Atom className="w-4 h-4" />
                Generate with Prompt
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal for quiz details */}
      {/* <QuizGeneratorDialog
        onclick={() => {
          setOpenModal(!openModal);
        }}
        open={openModal}
        setOpen={setOpenModal}
        onFinalSubmit={handleFinalSubmit}
      /> */}
      <GenerateMcqWithFileModal
        open={openModal}
        setOpen={setOpenModal}
        files={files}
        note={note}
      />
    </div>
  );
};

export default QuizGenerator;

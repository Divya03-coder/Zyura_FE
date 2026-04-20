import PrimaryButton from "@/components/reusable/PrimaryButton";
import { ChevronRight, FileText, Plus } from "lucide-react";
import { Link } from "react-router-dom";

export default function MentorQuestionBankCard() {
  const resource = {
    id: 1,
    title: "Anatomy Essentials MCQs",
    questions: "Basic concepts in cardiovascular medicine",
    tags: ["Anatomy", "Anatomy"],
    uploader: "DR. Root Silva",
  };

  return (
    <div>
      <div className="space-y-6 my-6">
        <div className="border border-slate-300 rounded-lg py-4 px-5">
          <div className="flex flex-wrap gap-3 items-start justify-between">
            <Link to={""}>
              <div className="sm:flex flex-wrap resources-center ">
                {/* Icon */}
                <div className="flex items-start gap-4">
                  <ChevronRight />
                  <div className="pr-4">
                    <FileText className="w-6 h-6 mx-auto text-slate-600" />
                  </div>
                </div>

                {/* Content */}
                <div className="space-y-2">
                  <h4 className="text-lg text-slate-900 font-medium">
                    {resource.title}
                  </h4>
                  <p className="text-slate-600">{resource.questions}</p>
                  <div className="flex flex-wrap resources-center gap-2">
                    {resource.tags.map((tag, idx) => (
                      <p
                        key={idx}
                        className="border border-slate-300 rounded-full px-2"
                      >
                        {tag}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </Link>
            <div className="flex flex-wrap items-center gap-5">
              <p className="bg-green-700 text-white py-1 px-2 text-xs rounded-full">
                Published
              </p>
              <p className="text-slate-600">20 Question</p>
            </div>
          </div>
          <div className="flex sm:justify-end">
            <Link to={"/mentor/create-question"}>
              <PrimaryButton
                bgType="solid"
                iconPosition="left"
                bgColor="bg-blue-btn-1"
                icon={<Plus className="w-4 h-4" />}
                className="h-10 mb-2 mt-4 hover:bg-blue-btn-1 hover:opacity-80 cursor-pointer"
              >
                Add Question
              </PrimaryButton>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

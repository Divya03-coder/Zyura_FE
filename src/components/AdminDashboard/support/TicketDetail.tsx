import demo from "@/assets/signUp/Upload Photo.png";
import ButtonWithLoading from "@/common/button/ButtonWithLoading";
import CommonSelect from "@/common/custom/CommonSelect";
import {
  useGetSingleMcqApiForSupportQuery,
  useUpdatedSingleMcqApiMutation,
} from "@/store/features/adminDashboard/ContentResources/MCQ/mcqApi";
import { OneMCQ } from "@/store/features/adminDashboard/ContentResources/MCQ/types/singleMcqBank";

import { useGetSettingsQuery } from "@/store/features/adminDashboard/settings/settingApi";
import { useUpdateReportForAdminMutation } from "@/store/features/adminDashboard/support/support";
import {
  ReportItem,
  ReportStatus,
} from "@/store/features/adminDashboard/support/types/support";
import { useState } from "react";
import { BiSolidEdit } from "react-icons/bi";
import { FiSend } from "react-icons/fi";
import { z } from "zod";

import { DifficultyLevel } from "@/types";
import UpdateMcqModal, {
  BackendMCQData,
} from "../Content&Resources/content/medical/studyMode/UpdateMcqModal";

export const inputClass = {
  input:
    "text-sm font-normal text-[#0F172A] font-inter leading-[20px] outline-none transition w-full px-4 py-3 border border-border rounded-md ",
  label:
    "text-sm font-normal text-[#18181B] font-inter leading-[20px] block mb-2",
  error: "text-red-500 text-sm mt-1",
};

// ZOD VALIDATION
const updateReportSchema = z.object({
  status: z.enum(["IN_REVIEW", "RESOLVED", "REJECTED"]),
  note: z.string().min(1, "Comment is required"),
});

const statusOptions = [
  { value: "IN_REVIEW", label: "IN_REVIEW" },
  { value: "RESOLVED", label: "RESOLVED" },
  { value: "REJECTED", label: "REJECTED" },
];

interface TicketDetailProps {
  ticket: ReportItem;
  selectedIndex: number;
  setSelectedTicket: (ticket: ReportItem | null) => void;
}

const TicketDetail: React.FC<TicketDetailProps> = ({
  ticket,
  selectedIndex,
  setSelectedTicket,
}) => {
  const [selectedStatus, setSelectedStatus] = useState<ReportStatus>(
    (ticket.status as ReportStatus) || "IN_REVIEW"
  );
  const [comment, setComment] = useState("");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const [updateReport, { isLoading }] = useUpdateReportForAdminMutation();

  const handleSendMessage = async (note: string) => {
    // Validate using Zod
    const result = updateReportSchema.safeParse({
      status: selectedStatus,
      note,
    });

    if (!result.success) {
      setErrorMsg(result.error.issues[0].message);
      return;
    }

    setErrorMsg(null);

    const payload = {
      id: ticket._id,
      data: result.data,
    };

    await updateReport(payload);
    setSelectedTicket(null);
    setComment("");
  };
  const { data: settings } = useGetSettingsQuery();
  const mcqBankId = ticket.report.questionBankId;
  const mcqId = ticket.report.mcqId;
  const { data: singleMcqData } = useGetSingleMcqApiForSupportQuery(
    {
      mcqBankId,
      mcqId,
    },
    {
      skip: !mcqBankId || !mcqId,
    }
  );

  // update report for mcq
  const [selectedMCQ, setSelectedMCQ] = useState<OneMCQ | null>(null);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [updatedSingleMcqApi, { isLoading: isUpdateLoading }] =
    useUpdatedSingleMcqApiMutation();
  const handleEdit = (mcq: OneMCQ) => {
    setSelectedMCQ(mcq);
    setIsUpdateModalOpen(true);
  };

  const handleUpdate = async (updatedData: BackendMCQData) => {
    if (!selectedMCQ) return;

    const payload = {
      difficulty: updatedData.difficulty,
      question: updatedData.question,
      optionA: updatedData.optionA,
      optionB: updatedData.optionB,
      optionC: updatedData.optionC,
      optionD: updatedData.optionD,

      correctOption: updatedData.correctOption,
      explanationA: updatedData.explanationA,
      explanationB: updatedData.explanationB,
      explanationC: updatedData.explanationC,
      explanationD: updatedData.explanationD,
    };

    try {
      await updatedSingleMcqApi({
        mcqBankId,
        mcqId: selectedMCQ.mcqId,
        data: payload,
      });
      setIsUpdateModalOpen(false);
      setSelectedMCQ(null);
    } catch (error) {
      console.error("Failed to update MCQ", error);
    }
  };
  console.log("singleMcqData", singleMcqData);

  return (
    <>
      <div className="flex h-full flex-col rounded-lg border border-border bg-card">
        <div className="">
          <div className="mb-2 flex items-start justify-between bg-[#EFF6FF] px-4 py-3">
            <h2 className="text-lg font-semibold text-foreground">
              Question Report: {ticket.report.mcqId}
            </h2>
            <span className="text-xs text-muted-foreground">
              #TKT: {selectedIndex + 1}
            </span>
          </div>

          <div className="flex flex-col gap-4 p-4">
            <div className="flex justify-between">
              <div>
                <p className="text-xs font-medium text-muted-foreground">
                  User
                </p>
                <p className="mt-1 text-sm text-foreground">{ticket.name}</p>
              </div>

              <div>
                <p className="text-xs font-medium text-muted-foreground">
                  User Type
                </p>
                <p className="mt-1 text-sm text-foreground capitalize">
                  Student
                </p>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="px-4">
            {singleMcqData?.data.mcqs.map((mcq) => (
              <div
                key={mcq.mcqId}
                className="w-full  rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
              >
                {/* Header */}
                <div className="mb-4 flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-500">
                    BankId: {ticket.report.questionBankId} <br />
                    MCQ ID: {mcq.mcqId}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                      {mcq.difficulty}
                    </span>
                    <span
                      onClick={() => handleEdit(mcq)}
                      className="text-xl cursor-pointer"
                    >
                      <BiSolidEdit />
                    </span>
                  </div>
                </div>

                {/* Question */}
                <h2 className="mb-5 text-lg font-semibold text-gray-800 whitespace-pre-line">
                  {mcq.question.split("•")[0].trim()}
                </h2>

                {/* Options */}
                <div className="space-y-3">
                  {mcq.options.map((opt) => {
                    const isCorrect = opt.option === mcq.correctOption;

                    return (
                      <div
                        key={opt.option}
                        className={`flex items-center gap-3 rounded-lg border p-3 transition
                ${
                  isCorrect
                    ? "border-green-500 bg-green-50"
                    : "border-gray-200 hover:bg-gray-50"
                }
              `}
                      >
                        <span
                          className={`flex min-h-8 min-w-8 items-center justify-center rounded-full text-sm font-bold
                  ${
                    isCorrect
                      ? "bg-green-600 text-white"
                      : "bg-gray-100 text-gray-700"
                  }
                `}
                        >
                          {opt.option}
                        </span>

                        <div>
                          <p className="text-sm font-medium text-gray-800">
                            {opt.optionText}
                          </p>

                          {isCorrect && (
                            <p className="mt-1 text-xs text-green-700">
                              {opt.explanation}
                            </p>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Footer */}
                <div className="mt-5 rounded-lg bg-gray-50 p-4">
                  <p className="text-sm font-semibold text-gray-700">
                    Correct Answer:{" "}
                    <span className="text-green-600">{mcq.correctOption}</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="overflow-y-auto flex-1 m-4 space-y-6  ">
          <div className="flex items-center gap-2">
            <div className="w-full bg-black text-white rounded-lg p-4">
              <p className="mt-2 whitespace-pre-wrap text-xs leading-relaxed">
                Report: {ticket.report.text}
              </p>
            </div>

            <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
              <img
                className="w-full h-full object-cover"
                src={ticket.profile_photo || demo}
                alt=""
              />
            </div>
          </div>
          {/* Admin */}
          <div className="flex items-start gap-2">
            <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
              <img
                className="w-full h-full object-cover"
                src={settings?.data?.platformLogo || "/logo.svg"}
                alt=""
              />
            </div>
            <div className="w-full bg-[#F0FAFF] text-[#404040] rounded-lg p-4">
              <p className="text-xs font-medium">Admin: {ticket.note ?? ""}</p>
            </div>
          </div>
        </div>

        <div className="w-40 m-4">
          <p className="text-xs font-medium text-muted-foreground mb-2">
            Status
          </p>

          <CommonSelect
            item={statusOptions}
            onValueChange={(val) => setSelectedStatus(val as ReportStatus)}
            value={selectedStatus}
            className="!w-full"
            placeholder="change the status"
          />
        </div>

        <div className="p-4">
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Type message"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter") handleSendMessage(comment);
              }}
              className={inputClass.input}
            />

            <button
              onClick={() => handleSendMessage(comment)}
              className="rounded-lg bg-foreground px-3 py-2 text-sm font-medium text-background hover:bg-foreground/90 transition-colors flex items-center gap-1 cursor-pointer"
            >
              {isLoading ? <ButtonWithLoading title="Sending..." /> : "Send"}
              <FiSend />
            </button>
          </div>

          {errorMsg && <p className="text-red-500 text-sm mt-2">{errorMsg}</p>}
        </div>
      </div>
      {isUpdateModalOpen && selectedMCQ && (
        <UpdateMcqModal
          data={{
            difficulty: selectedMCQ.difficulty as DifficultyLevel,
            question: selectedMCQ.question,
            optionA: selectedMCQ.options[0]?.optionText || "",
            optionB: selectedMCQ.options[1]?.optionText || "",
            optionC: selectedMCQ.options[2]?.optionText || "",
            optionD: selectedMCQ.options[3]?.optionText || "",
            correctOption: selectedMCQ.correctOption as "A" | "B" | "C" | "D",
            explanationA: selectedMCQ.options[0]?.explanation || "",
            explanationB: selectedMCQ.options[1]?.explanation || "",
            explanationC: selectedMCQ.options[2]?.explanation || "",
            explanationD: selectedMCQ.options[3]?.explanation || "",
          }}
          onClose={() => setIsUpdateModalOpen(false)}
          onSubmit={handleUpdate}
          isLoading={isUpdateLoading}
        />
      )}
    </>
  );
};

export default TicketDetail;

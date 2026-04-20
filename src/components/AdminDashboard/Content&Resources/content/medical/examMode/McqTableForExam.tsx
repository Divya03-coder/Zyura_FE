import ButtonWithIcon from "@/common/button/ButtonWithIcon";
import LoadingStatus from "@/common/custom/LoadingStatus";
import Pagination from "@/common/custom/Pagination";
import CommonHeader from "@/common/header/CommonHeader";
import TableAction from "@/components/reusable/TableAction";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  useDeleteSingleExamMcqForProfessionalMutation,
  useGetSingleExamForProfessionalQuery,
  useUpdateSingleExamMcqForProfessionalMutation,
} from "@/store/features/adminDashboard/examMode/professionalApi/professionalApi";
import {
  useDeleteSingleExamMcqMutation,
  useGetSingleExamQuery,
  useUpdateSingleExamMcqMutation,
} from "@/store/features/adminDashboard/examMode/studentApi/StudentApi";
import { SingleMCQUpdatePayloadForExam } from "@/store/features/adminDashboard/examMode/studentApi/types/allExam";
import { ExamMcq } from "@/store/features/adminDashboard/examMode/studentApi/types/singleExam";
import { useAppSelector } from "@/store/hook";
import { useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { HiOutlineArrowNarrowLeft } from "react-icons/hi";
import AddMoreMCQ from "./AddMoreMCQ";
import UpdateMcqForExamModal from "./UpdateMcqForExamModal";

interface McqTableProps {
  examId: string | null;
  setSelectedExamId: React.Dispatch<React.SetStateAction<string | null>>;
}

const tableHeaders = [
  { label: "ID", align: "text-center hidden xl:table-cell" },
  { label: "Question", align: "text-center" },
  { label: "Correct Answer", align: "text-center hidden 2xl:table-cell" },
  { label: "Action", align: "text-center" },
];

const tableDesign = {
  header:
    "text-lg font-geist text-[#2C2C2C] font-medium bg-[#EFF6FF] hover:bg-[#EFF6FF] md:h-12",
  cellHeader: "border border-border px-4",
  bodyRow: "text-[#2C2C2C] font-inter text-sm font-normal md:h-12 bg-white",
  cell: "border border-border px-4 text-center",
};

const McqTableForExam: React.FC<McqTableProps> = ({
  examId,
  setSelectedExamId,
}) => {
  const [page, setPage] = useState(1);
  const [isMoreMCQModalOpen, setIsMoreMCQModalOpen] = useState(false);
  const { contentFor } = useAppSelector((state) => state.staticContent);

  const isStudent = contentFor === "student";
  const isProfessional = contentFor === "professional";

  const { data: studentData, isLoading: studentLoading } =
    useGetSingleExamQuery(
      { id: examId!, page },
      {
        refetchOnMountOrArgChange: true,
        skip: !examId || !isStudent,
      },
    );

  const { data: professionalData, isLoading: professionalLoading } =
    useGetSingleExamForProfessionalQuery(
      { id: examId!, page },
      { refetchOnMountOrArgChange: true, skip: !examId || !isProfessional },
    );

  const data = isStudent ? studentData : professionalData;
  const isLoading = isStudent ? studentLoading : professionalLoading;
  const mcqs = data?.data.data.mcqs ?? [];

  // delete single mcq
  const [deleteSingleExamMcq] = useDeleteSingleExamMcqMutation();
  const [deleteSingleExamMcqForProfessional] =
    useDeleteSingleExamMcqForProfessionalMutation();

  const deleteSingleExamMcqApi = isStudent
    ? deleteSingleExamMcq
    : deleteSingleExamMcqForProfessional;

  const handleDeleteClick = async ({
    examId,
    mcqId,
  }: {
    examId: string;
    mcqId: string;
  }) => {
    console.log("examId", examId, "mcqId", mcqId);
    if (!examId || !mcqId) return;
    await deleteSingleExamMcqApi({ examId, mcqId });
  };

  const handleBackClick = () => {
    setSelectedExamId(null);
  };
  // update single mcq in exam
  const [updateSingleExamMcq, { isLoading: isUpdateLoadingForStudent }] =
    useUpdateSingleExamMcqMutation();

  const [
    updateSingleExamMcqForProfessional,
    { isLoading: isUpdateLoadingForProfessional },
  ] = useUpdateSingleExamMcqForProfessionalMutation();

  const updateSingleExamMcqApi = isStudent
    ? updateSingleExamMcq
    : updateSingleExamMcqForProfessional;

  const isUpdateLoading = isStudent
    ? isUpdateLoadingForStudent
    : isUpdateLoadingForProfessional;
  const [selectedMCQ, setSelectedMCQ] = useState<ExamMcq | null>(null);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

  const handleEditClick = (mcq: ExamMcq) => {
    console.log("selectedMCQ raw data:", JSON.stringify(mcq, null, 2));
    setSelectedMCQ(mcq);
    setIsUpdateModalOpen(true);
  };

  const handleUpdate = async (updatedData: SingleMCQUpdatePayloadForExam) => {
    if (!selectedMCQ || !examId) return;

    const payload = {
      question: updatedData.question,

      optionA: updatedData.optionA,
      optionB: updatedData.optionB,
      optionC: updatedData.optionC,
      optionD: updatedData.optionD,
      optionE: updatedData.optionE,
      optionF: updatedData.optionF,

      correctOption: updatedData.correctOption,
      imageDescription: updatedData.imageDescription,
      explanationA: updatedData.explanationA,
      explanationB: updatedData.explanationB,
      explanationC: updatedData.explanationC,
      explanationD: updatedData.explanationD,
      explanationE: updatedData.explanationE,
      explanationF: updatedData.explanationF,
    };

    try {
      await updateSingleExamMcqApi({
        examId,
        mcqId: selectedMCQ.mcqId,
        data: payload,
      }).unwrap();

      setIsUpdateModalOpen(false);
      setSelectedMCQ(null);
    } catch (error) {
      console.error("Failed to update MCQ", error);
    }
  };

  if (!examId) {
    return (
      <div className="flex items-center justify-center h-full text-gray-400 font-medium">
        Select an exam to view MCQs
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="flex justify-between mb-6">
        <div className="flex items-center gap-2">
          <HiOutlineArrowNarrowLeft
            onClick={handleBackClick}
            className="w-6 h-6 cursor-pointer text-[#09090B]"
          />
          <div>
            <CommonHeader className="text-[#0A0A0A] ! !text-base">
              {data?.data.data.examName || "Exam Name"}
            </CommonHeader>
            <p className="text-[#6B7280]">
              {data?.data.data.totalQuestions} questions
            </p>
          </div>
        </div>

        {examId && (
          <div className="flex items-start gap-2">
            <ButtonWithIcon
              onClick={() => setIsMoreMCQModalOpen(true)}
              icon={FaPlus}
              className="w-full lg:w-auto flex justify-center  shrink-0 !py-3"
            >
              Add MCQ
            </ButtonWithIcon>
          </div>
        )}
      </div>

      <div className="flex-1 flex flex-col ">
        <LoadingStatus isLoading={isLoading} items={mcqs} itemName="MCQs" />

        {!isLoading && mcqs.length > 0 && (
          <div className="overflow-x-auto rounded-md border border-border bg-white">
            <Table>
              <TableHeader>
                <TableRow className={tableDesign.header}>
                  {tableHeaders.map((header, index) => (
                    <TableHead
                      key={index}
                      className={`${tableDesign.cellHeader} ${header.align}`}
                    >
                      {header.label ? (
                        header.label
                      ) : (
                        <input
                          type="checkbox"
                          className="h-4 w-4 cursor-pointer"
                        />
                      )}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>

              <TableBody>
                {mcqs.map((mcq, index) => (
                  <TableRow key={mcq.mcqId} className={tableDesign.bodyRow}>
                    <TableCell
                      className={`${tableDesign.cell} hidden xl:table-cell`}
                    >
                      FAN{String(index + 1).padStart(4, "0")}
                    </TableCell>

                    <TableCell
                      className={`${tableDesign.cell} max-w-[220px] break-words overflow-hidden whitespace-nowrap overflow-ellipsis`}
                    >
                      {mcq.question}
                    </TableCell>

                    <TableCell
                      className={`${tableDesign.cell} hidden 2xl:table-cell`}
                    >
                      {mcq.correctOption}
                    </TableCell>

                    <TableCell className={tableDesign.cell}>
                      <div className="flex justify-center gap-2">
                        <TableAction
                          handleEdit={() => handleEditClick(mcq)}
                          handleDelete={() =>
                            handleDeleteClick({
                              examId: data?.data.data._id!,
                              mcqId: mcq.mcqId,
                            })
                          }
                        />
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </div>

      <div className="py-5 ">
        {mcqs.length > 0 && (
          <Pagination
            currentPage={page}
            onPageChange={(pre) => setPage(pre)}
            totalPages={data?.data.meta.totalPages || 1}
          />
        )}
      </div>

      {isUpdateModalOpen && selectedMCQ && (
        <UpdateMcqForExamModal
         key={selectedMCQ.mcqId}
          data={(() => {
            // FIX: find each option by its label field, not by array index
            const findOption = (label: string) =>
              selectedMCQ.options.find((o) => o.option === label);

            return {
              question: selectedMCQ.question,
              imageDescription: selectedMCQ.imageDescription || "",
              correctOption: selectedMCQ.correctOption as
                | "A"
                | "B"
                | "C"
                | "D"
                | "E"
                | "F",

              optionA: findOption("A")?.optionText || "",
              optionB: findOption("B")?.optionText || "",
              optionC: findOption("C")?.optionText || "",
              optionD: findOption("D")?.optionText || "",
              optionE: findOption("E")?.optionText || "",
              optionF: findOption("F")?.optionText || "",

              explanationA: findOption("A")?.explanation || "",
              explanationB: findOption("B")?.explanation || "",
              explanationC: findOption("C")?.explanation || "",
              explanationD: findOption("D")?.explanation || "",
              explanationE: findOption("E")?.explanation || "",
              explanationF: findOption("F")?.explanation || "",
            };
          })()}
          onClose={() => setIsUpdateModalOpen(false)}
          onSubmit={handleUpdate}
          isLoading={isUpdateLoading}
          examId={examId}
        />
      )}
      {isMoreMCQModalOpen && examId && (
        <AddMoreMCQ
          onClose={() => setIsMoreMCQModalOpen(false)}
          examId={examId}
        />
      )}
    </div>
  );
};

export default McqTableForExam;
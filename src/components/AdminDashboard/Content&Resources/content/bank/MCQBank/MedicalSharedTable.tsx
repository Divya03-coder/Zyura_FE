import Spinner from "@/common/button/Spinner";
import Pagination from "@/common/custom/Pagination";
import { useDebounce } from "@/common/custom/useDebounce";
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
  useDeleteSingleMcqApiMutation,
  useGetSingleMcqQuery,
  useUpdatedSingleMcqApiMutation,
} from "@/store/features/adminDashboard/ContentResources/MCQ/mcqApi";
import { OneMCQ } from "@/store/features/adminDashboard/ContentResources/MCQ/types/singleMcqBank";
import { DifficultyFilter, DifficultyLevel } from "@/types";
import { skipToken } from "@reduxjs/toolkit/query";
import { useState } from "react";
import { ContentCategory } from "../../medical/data/data";
import SearchWithTabs from "../../medical/examMode/SearchWithTabs";
import UpdateMcqModal, {
  BackendMCQData,
} from "../../medical/studyMode/UpdateMcqModal";

const tableHeaders = [
  { label: "ID", align: "text-center hidden xl:table-cell" },
  { label: "Question", align: "text-center" },
  { label: "Difficulty", align: "text-center hidden 2xl:table-cell" },
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

export const contentTabs: ContentCategory[] = [
  "MCQ",
  "Flashcard",
  "ClinicalCase",
  "OSCE",
  "Notes",
];

interface MedicalSharedTableProps {
  mcqBankId: string;
}

const MedicalSharedTable: React.FC<MedicalSharedTableProps> = ({
  mcqBankId,
}) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [difficulty, setDifficulty] = useState<DifficultyFilter>("All");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const limit = 10;
  const singleMcqQueryArg = mcqBankId
    ? {
        id: mcqBankId,
        page: currentPage,
        limit,
        ...(difficulty !== "All" ? { difficulty } : {}),
        searchTerm: debouncedSearchTerm,
      }
    : skipToken;
  const { data: singleMcqBank, isLoading: isSingleMcqLoading } =
    useGetSingleMcqQuery(singleMcqQueryArg, {
      skip: mcqBankId === "",
    });

  const data = singleMcqBank?.data.mcqs ?? [];

  const [deleteSingleMcqApi] = useDeleteSingleMcqApiMutation();
  const [updatedSingleMcqApi, { isLoading }] = useUpdatedSingleMcqApiMutation();

  const [selectedMCQ, setSelectedMCQ] = useState<OneMCQ | null>(null);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

  const handleDelete = async (mcqId: string) => {
    if (mcqBankId) {
      const payload = { mcqBankId, mcqId };
      await deleteSingleMcqApi(payload);
    }
  };

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
      optionE: updatedData.optionE,
      optionF: updatedData.optionF,
      imageDescription: updatedData.imageDescription,
      correctOption: updatedData.correctOption,
      explanationA: updatedData.explanationA,
      explanationB: updatedData.explanationB,
      explanationC: updatedData.explanationC,
      explanationD: updatedData.explanationD,
      explanationE: updatedData.explanationE,
      explanationF: updatedData.explanationF,
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

  return (
    <>
      <div className="flex flex-col w-full">
        <div className="w-full flex flex-col gap-6">
          <SearchWithTabs
            difficulty={difficulty}
            setDifficulty={setDifficulty}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />

          {isSingleMcqLoading ? (
            <Spinner message="Please wait..." />
          ) : data.length === 0 ? (
            <div className="text-center py-10 text-gray-500 font-medium">
              No data found
            </div>
          ) : (
            <div className="overflow-x-auto rounded-md border border-border">
              <Table>
                <TableHeader>
                  <TableRow className={tableDesign.header}>
                    {tableHeaders.map((header) => (
                      <TableHead
                        key={header.label}
                        className={`${tableDesign.cellHeader} ${header.align}`}
                      >
                        {header.label}
                      </TableHead>
                    ))}
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {data.map((item) => (
                    <TableRow key={item.mcqId} className={tableDesign.bodyRow}>
                      <TableCell
                        className={`${tableDesign.cell} hidden xl:table-cell`}
                      >
                        {item.mcqId}
                      </TableCell>
                      <TableCell
                        className={`${tableDesign.cell} max-w-[150px] break-words overflow-hidden whitespace-nowrap overflow-ellipsis`}
                      >
                        {item.question}
                      </TableCell>
                      <TableCell
                        className={`${tableDesign.cell} hidden 2xl:table-cell`}
                      >
                        {item.difficulty}
                      </TableCell>
                      <TableCell
                        className={`${tableDesign.cell} hidden 2xl:table-cell`}
                      >
                        {item.correctOption}
                      </TableCell>
                      <TableCell className={tableDesign.cell}>
                        <div className="flex justify-center gap-2">
                          <TableAction
                            handleDelete={() => handleDelete(item.mcqId)}
                            handleEdit={() => handleEdit(item)}
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
            optionE: selectedMCQ.options[4]?.optionText || "",
            optionF: selectedMCQ.options[5]?.optionText || "",
            correctOption: selectedMCQ.correctOption as
              | "A"
              | "B"
              | "C"
              | "D"
              | "E"
              | "F",
            imageDescription: selectedMCQ.imageDescription || "",
            explanationA: selectedMCQ.options[0]?.explanation || "",
            explanationB: selectedMCQ.options[1]?.explanation || "",
            explanationC: selectedMCQ.options[2]?.explanation || "",
            explanationD: selectedMCQ.options[3]?.explanation || "",
            explanationE: selectedMCQ.options[4]?.explanation || "",
            explanationF: selectedMCQ.options[5]?.explanation || "",
          }}
          onClose={() => setIsUpdateModalOpen(false)}
          onSubmit={handleUpdate}
          isLoading={isLoading}
        />
      )}
      {data.length !== 0 && !isLoading && (
        <div className="py-5">
          <Pagination
            totalPages={singleMcqBank?.meta.totalPages ?? 1}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        </div>
      )}
    </>
  );
};

export default MedicalSharedTable;

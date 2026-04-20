import preview from "@/assets/dashboard/tablePreview.svg";
import Spinner from "@/common/button/Spinner";
import { useDebounce } from "@/common/custom/useDebounce";
import CommonHeader from "@/common/header/CommonHeader";
import Tabs, { Tab } from "@/components/AdminDashboard/reuseable/Tabs";

import TableAction from "@/components/reusable/TableAction";
import { useAppSelector } from "@/hooks/useRedux";
import {
  useDeleteExamForProfessionalMutation,
  useGetAllExamForProfessionalQuery,
} from "@/store/features/adminDashboard/examMode/professionalApi/professionalApi";
import {
  useDeleteExamMutation,
  useGetAllExamForStudentQuery,
} from "@/store/features/adminDashboard/examMode/studentApi/StudentApi";
import {
  ProfessionalExamUpdatePayload,
  SingleExamUpdatePayload,
} from "@/store/features/adminDashboard/examMode/studentApi/types/singleExam";
import { Plus } from "lucide-react";
import { useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import ExamPagination from "./ExamPagination";
import UpdateExamModal from "./UpdateExamModal";
import UpdateExamModalForProfessional from "./UpdateExamModalForProfessional";
const tabs: Tab<"manual" | "bulk">[] = [
  { label: "Manual", value: "manual" },
  { label: "Bulk", value: "bulk" },
];
interface TableOfContentProps {
  onSelectExam: (examId: string) => void;
  selectedExamId: string | null;
  iconAction: () => void;
  mode: "manual" | "bulk";
  setMode: (mode: "manual" | "bulk") => void;
}

const TableContentForExam: React.FC<TableOfContentProps> = ({
  onSelectExam,
  selectedExamId,
  iconAction,
  mode,
  setMode,
}) => {
  const { contentFor, profileType } = useAppSelector(
    (state) => state.staticContent,
  );

  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const deBounce = useDebounce(searchQuery, 500);
  const isStudent = contentFor === "student";
  const isProfessional = contentFor === "professional";

  const { data: studentData, isLoading: studentLoading } =
    useGetAllExamForStudentQuery(
      { searchTerm: deBounce, profileType, page },
      { skip: !isStudent },
    );

  const { data: professionalData, isLoading: professionalLoading } =
    useGetAllExamForProfessionalQuery(
      { searchTerm: deBounce, professionName: profileType },
      { skip: !isProfessional },
    );

  const data = isStudent ? studentData : professionalData;
  const isLoading = isStudent ? studentLoading : professionalLoading;

  const [deleteExam] = useDeleteExamMutation();
  const [deleteExamForProfessional] = useDeleteExamForProfessionalMutation();

  const deleteExamApi = isStudent ? deleteExam : deleteExamForProfessional;

  const handleDelete = (examId: string) => {
    if (!examId) return;
    deleteExamApi(examId);
  };

  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

  const [initialData, setInitialData] = useState<
    SingleExamUpdatePayload | ProfessionalExamUpdatePayload | null
  >(null);

  const handleUpdate = (
    payload: SingleExamUpdatePayload | ProfessionalExamUpdatePayload,
  ) => {
    setInitialData(payload);
    setIsUpdateModalOpen(true);
  };

  console.log("data?.data.data", data?.data.data);
  return (
    <>
      <div className="w-[350px] bg-white rounded-2xl shadow p-4 space-y-4">
        <div className="flex justify-between">
          <div className="flex items-center gap-2">
            <img src={preview} className="w-5 h-5" alt="icon" />
            <CommonHeader className="text-[#0A0A0A] text-base!">
              Exams
            </CommonHeader>
          </div>
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white p-1.5 rounded-lg cursor-pointer"
            onClick={iconAction}
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>

        <div className="w-full  flex justify-center">
          <Tabs
            tabs={tabs}
            active={mode}
            onChange={(value: "manual" | "bulk") => setMode(value)}
          />
        </div>
        <div className="flex items-center gap-2 flex-1 bg-white border border-[#CBD5E1] rounded-md p-2.5 w-full ">
          <IoSearchOutline className="w-5 h-5" />
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            type="text"
            placeholder="Search ..."
            className="w-full outline-none"
          />
        </div>
        {isLoading ? (
          <Spinner />
        ) : data?.data.data.length === 0 ? (
          <p className=" text-center">No Exam Data</p>
        ) : (
          <div className="space-y-3">
            {data?.data.data.map((exam) => (
              <div
                key={exam._id}
                className={`flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 cursor-pointer ${selectedExamId === exam._id ? "bg-gray-100" : ""}`}
                onClick={() => onSelectExam(exam._id)}
              >
                <div className="w-full flex justify-between">
                  <p className="text-sm font-medium text-gray-900">
                    {exam.examName}
                  </p>
                  <div className="flex gap-1">
                    <p className="text-xs bg-[#E2E8F0] text-black px-2 py-1   rounded-full">
                      {exam.totalQuestions}
                    </p>
                    <TableAction
                      handleEdit={() => {
                        handleUpdate(
                          exam as
                            | SingleExamUpdatePayload
                            | ProfessionalExamUpdatePayload,
                        );
                      }}
                      handleDelete={() => {
                        handleDelete(exam._id);
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {data?.data.data && data?.data.data.length > 0 && (
          <ExamPagination
            page={page}
            setPage={setPage}
            totalPages={data?.data.meta.totalPages || 1}
          />
        )}
      </div>
      {isUpdateModalOpen && initialData && (
        <div className=" fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
          {isStudent ? (
            <UpdateExamModal
              setIsUpdateModalOpen={setIsUpdateModalOpen}
              initialData={initialData as SingleExamUpdatePayload}
              selectedExamId={selectedExamId}
            />
          ) : (
            <UpdateExamModalForProfessional
              setIsUpdateModalOpen={setIsUpdateModalOpen}
              initialData={initialData as ProfessionalExamUpdatePayload}
              selectedExamId={selectedExamId}
            />
          )}
        </div>
      )}
    </>
  );
};

export default TableContentForExam;

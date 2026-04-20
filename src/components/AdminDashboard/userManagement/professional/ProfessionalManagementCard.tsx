import ButtonWithIcon from "@/common/button/ButtonWithIcon";
import Spinner from "@/common/button/Spinner";
import AlertDialogBox from "@/common/custom/AlertDialogBox";
import Pagination from "@/common/custom/Pagination";
import CommonHeader from "@/common/header/CommonHeader";
import {
  useCreateProfessionalTypeApiMutation,
  useDeleteProfessionalTypeApiMutation,
  useGetProfessionalTypeApiQuery,
  useUpdateProfessionalTypeApiMutation,
} from "@/store/features/adminDashboard/ContentResources/professionalType/professionalTypeApi";
import { FC, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { RiDeleteBinLine } from "react-icons/ri";
import { TbEdit } from "react-icons/tb";
import StudentTypeModal from "../student/studentProfile/StudentTypeModal";

const ProfessionalManagementCard: FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 9;
  const { data: studentTypeData, isLoading } = useGetProfessionalTypeApiQuery({
    page: currentPage,
    limit,
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [studentType, setStudentType] = useState<{
    typeName: string;
    _id?: string;
  } | null>(null);

  const [createStudentTypeApi, { isLoading: isCreating }] =
    useCreateProfessionalTypeApiMutation();
  const [updateStudentTypeApi, { isLoading: isUpdating }] =
    useUpdateProfessionalTypeApiMutation();
  const [deleteStudentTypeApi] = useDeleteProfessionalTypeApiMutation();

  // Open modal for editing
  const handleEdit = (data: { typeName: string; _id: string }) => {
    setStudentType(data);
    setIsModalOpen(true);
  };

  // Open modal for creating
  const handleCreate = () => {
    setStudentType(null);
    setIsModalOpen(true);
  };

  // Create or Update submit
  const handleSubmit = async (data: { typeName: string }) => {
    const { typeName } = data;
    try {
      if (studentType?._id) {
        await updateStudentTypeApi({ _id: studentType._id, typeName }).unwrap();
      } else {
        await createStudentTypeApi({ typeName }).unwrap();
      }

      setIsModalOpen(false);
    } catch (err) {
      console.error("Error creating/updating student type:", err);
    }
  };

  // loading
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDelete = async (_id: string) => {
    try {
      setDeletingId(_id);
      await deleteStudentTypeApi(_id).unwrap();
      setDeletingId(null);
    } catch (err) {
      console.error("Error deleting student type:", err);
      setDeletingId(null);
    }
  };
  return (
    <div className="">
      <div className="flex justify-between items-center mb-6">
        <CommonHeader>Professional Types</CommonHeader>
        <ButtonWithIcon
          onClick={handleCreate}
          icon={FaPlus}
          className="sm:w-auto flex justify-center  shrink-0 "
        >
          Add Professional
        </ButtonWithIcon>
      </div>

      {isLoading ? (
        <Spinner />
      ) : studentTypeData?.data?.length === 0 ? (
        <p className="text-sm text-gray-500">No Professional Types Found</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pb-6">
          {studentTypeData?.data?.map((student) => (
            <div
              key={student._id}
              className="bg-white border border-gray-200 rounded-2xl p-6 flex flex-col justify-between shadow-sm hover:shadow-md transition-all"
            >
              <div className="flex justify-between items-start mb-6">
                <CommonHeader className="">{student.typeName}</CommonHeader>

                <div className="flex  gap-2">
                  <span
                    className="cursor-pointer"
                    onClick={() => handleEdit(student)}
                  >
                    <TbEdit size={20} className="text-[#030213]" />
                  </span>
                  <AlertDialogBox
                    trigger={
                      <RiDeleteBinLine
                        size={20}
                        className="text-[#030213] hover:text-red-600 transition-colors duration-200 cursor-pointer"
                      />
                    }
                    action={async () => handleDelete(student._id)}
                    title="Are you sure you want to delete this professional type?"
                    description=" This action cannot be undone, and all associated data will be
                    permanently lost"
                    isLoading={deletingId === student._id || false}
                  />
                </div>
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between text-gray-600">
                  <span>Total users:</span>
                  <span className="text-gray-900 font-medium">
                    {student.totalStudent}
                  </span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span> Content Items:</span>
                  <span className="text-gray-900 font-medium">
                    {student.totalContent}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {isModalOpen && (
        <StudentTypeModal
          open={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          initialData={studentType ?? undefined}
          onSubmit={handleSubmit}
          isLoading={isCreating || isUpdating}
          title={"Professional Type"}
        />
      )}
      {studentTypeData && studentTypeData.data.length > 0 && (
        <div className="">
          <Pagination
            currentPage={currentPage}
            totalPages={studentTypeData?.meta?.totalPages ?? 1}
            onPageChange={(p) => setCurrentPage(p)}
          />
        </div>
      )}
    </div>
  );
};

export default ProfessionalManagementCard;

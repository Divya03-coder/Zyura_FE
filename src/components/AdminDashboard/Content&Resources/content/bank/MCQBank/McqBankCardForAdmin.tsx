import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import CommonButton from "@/common/button/CommonButton";
import AlertDialogBox from "@/common/custom/AlertDialogBox";
import FormHeader from "@/components/AdminDashboard/reuseable/FormHeader";
import ModalCloseButton from "@/components/AdminDashboard/reuseable/ModalCloseButton";
import { useDeleteFlashCardBankMutation } from "@/store/features/adminDashboard/ContentResources/flashCard/flashCardSlice";
import { useDeleteMcqBankApiMutation } from "@/store/features/adminDashboard/ContentResources/MCQ/mcqApi";
import { SingleMcqBank } from "@/store/features/adminDashboard/ContentResources/MCQ/types/allContent";
import {
  setBankId,
  setUploadIntoBank,
} from "@/store/features/adminDashboard/staticContent/staticContentSlice";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { RootState } from "@/store/store";
import { FC } from "react";
import FlashCardUpload from "../../FlashCard/FlashCardUpload";
import MCQUpload from "../../MCQ/MCQUpload";
const tableDesign = {
  header:
    "text-lg font-geist text-black font-medium bg-[#EFF6FF] hover:bg-[#EFF6FF] md:h-12",
  cellHeader: "border border-border px-4",
  bodyRow: "text-black font-inter text-sm font-normal md:h-12 bg-white",
  cell: "border border-border px-4 text-center",
};

const tableHeaders = [
  { label: "Bank", align: "text-center" },
  { label: "Subject", align: "text-center hidden xl:table-cell" },
  { label: "System", align: "text-center hidden 2xl:table-cell" },
  { label: "Topic", align: "text-center hidden 2xl:table-cell" },
  { label: "Subtopic", align: "text-center hidden 2xl:table-cell" },
  { label: "Actions", align: "text-center" },
];

interface Props {
  data: SingleMcqBank[];
  setMcqBankId: (id: string) => void;
}

const McqBankCardForAdmin: FC<Props> = ({ data, setMcqBankId }) => {
  const { contentType, uploadIntoBank } = useAppSelector(
    (state: RootState) => state.staticContent,
  );

  const [deleteMcqBankApi, { isLoading }] = useDeleteMcqBankApiMutation();
  const [deleteFlashCardBank, { isLoading: isDeleting }] =
    useDeleteFlashCardBankMutation();

  const dispatch = useAppDispatch();

  const handleDelete = async (id: string) => {
    if (contentType === "MCQ") await deleteMcqBankApi(id);
    if (contentType === "Flashcard") await deleteFlashCardBank(id);
  };

  const handleAddMore = (bankId: string) => {
    dispatch(setUploadIntoBank(true));
    dispatch(setBankId(bankId));
  };

  const handleModalClose = () => {
    dispatch(setUploadIntoBank(false));
  };

  return (
    <>
      <div className="rounded-xl border border-gray-200 bg-white overflow-hidden">
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
            {data.map((data) => (
              <TableRow key={data._id} className={tableDesign.bodyRow}>
                <TableCell
                  className={`max-w-[100px] break-words whitespace-normal text-left ${tableDesign.cell}`}
                >
                  {data.title}
                </TableCell>
                <TableCell
                  className={`hidden xl:table-cell ${tableDesign.cell}`}
                >
                  {data.subject}
                </TableCell>
                <TableCell
                  className={`hidden 2xl:table-cell ${tableDesign.cell}`}
                >
                  {data.system}
                </TableCell>

                <TableCell
                  className={`hidden 2xl:table-cell ${tableDesign.cell}`}
                >
                  {data.topic || "-"}
                </TableCell>

                <TableCell
                  className={`hidden 2xl:table-cell ${tableDesign.cell}`}
                >
                  {data.subtopic || "-"}
                </TableCell>
                <TableCell className={tableDesign.cell}>
                  <CommonButton
                    onClick={() => handleAddMore(data._id)}
                    className="bg-blue-500 !text-white hover:bg-blue-600"
                  >
                    Add more
                  </CommonButton>

                  <CommonButton
                    onClick={() => setMcqBankId(data._id)}
                    className="bg-indigo-500 !text-white hover:bg-indigo-600"
                  >
                    View
                  </CommonButton>

                  <AlertDialogBox
                    action={() => handleDelete(data._id)}
                    isLoading={isDeleting || isLoading}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {uploadIntoBank && contentType === "MCQ" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white w-full max-w-3xl p-6 rounded-lg shadow-lg overflow-y-auto max-h-[90vh] relative">
            <ModalCloseButton onClick={handleModalClose} />

            <FormHeader title={"Upload MCQs to the Question Bank"} />

            <MCQUpload handleModalClose={handleModalClose} />
          </div>
        </div>
      )}
      {uploadIntoBank && contentType === "Flashcard" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white w-full max-w-3xl p-6 rounded-lg shadow-lg overflow-y-auto max-h-[90vh] relative">
            <ModalCloseButton onClick={handleModalClose} />
            <FormHeader title={"Upload Flashcards to the Flashcard Bank"} />

            <FlashCardUpload handleCancel={handleModalClose} />
          </div>
        </div>
      )}
    </>
  );
};

export default McqBankCardForAdmin;

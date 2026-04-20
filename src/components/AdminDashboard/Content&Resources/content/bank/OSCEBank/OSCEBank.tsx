import CommonButton from "@/common/button/CommonButton";
import AlertDialogBox from "@/common/custom/AlertDialogBox";
import { OsceTreeResponse } from "@/store/features/adminDashboard/ContentResources/MCQ/types/allContent";
import {
  useDeleteOsceMutation,
  useSingleOsceQuery,
} from "@/store/features/adminDashboard/ContentResources/Osce/osceApi";
import React from "react";
import SingleOsce from "./SingleOsce";

interface Props {
  mcqBank: OsceTreeResponse;
  bankId: string;
  setBankId: (id: string) => void;
  searchTerm: string;
}

const OSCEBank: React.FC<Props> = ({ mcqBank, bankId, setBankId, searchTerm }) => {
  const osceBank = mcqBank.data ?? [];

  const filteredBank = osceBank.filter((content) => {
    const q = searchTerm.toLowerCase();
    if (!q) return true;
    return (
      content.name?.toLowerCase().includes(q) ||
      content.description?.toLowerCase().includes(q) ||
      content.scenario?.toLowerCase().includes(q)
    );
  });

  const { data: singleOsce } = useSingleOsceQuery(bankId, {
    skip: bankId === "",
  });

  const [deleteOsce, { isLoading: isDeleting }] = useDeleteOsceMutation();

  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this Clinical Case?",
    );
    if (!confirmDelete) return;
    await id;
    deleteOsce(id)
      .unwrap()
      .catch((error) =>
        console.error("Failed to delete Clinical Case:", error),
      );
  };

  return (
    <div>
      {bankId === "" ? (
        <div className="grid grid-cols-1 gap-6 p-4  2xl:grid-cols-3">
          {filteredBank.map((content) => (
            <div
              key={content._id}
              className="bg-white shadow-md rounded-lg p-6 border border-gray-200"
            >
              {/* Header */}
              <h2 className="text-xl font-bold mb-2">{content.name}</h2>
              <p className="text-gray-600 mb-2">{content.description}</p>

              <div className="flex flex-col gap-2 mb-4 text-sm text-gray-500">
                <span>Scenario: {content.scenario}</span>
                <span>Time Limit: {content.timeLimit}</span>
              </div>
              <div className=" flex justify-between mt-4">
                <AlertDialogBox
                  action={() => handleDelete(content._id)}
                  isLoading={isDeleting}
                />
                <CommonButton
                  onClick={() => setBankId(content._id)}
                  className=" bg-blue-500 !text-white"
                >
                  View Details
                </CommonButton>
              </div>
            </div>
          ))}
        </div>
      ) : (
        singleOsce && <SingleOsce data={singleOsce} setBankId={setBankId} />
      )}
    </div>
  );
};

export default OSCEBank;
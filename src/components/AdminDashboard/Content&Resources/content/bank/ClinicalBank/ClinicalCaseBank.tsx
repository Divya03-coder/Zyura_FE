import CommonButton from "@/common/button/CommonButton";
import AlertDialogBox from "@/common/custom/AlertDialogBox";
import {
  useDeleteClinicalCaseMutation,
  useGetClinicalCaseQuery,
} from "@/store/features/adminDashboard/ContentResources/ClinicalCase/clinicalCaseApi";
import { ClinicalCaseTreeResponse } from "@/store/features/adminDashboard/ContentResources/MCQ/types/allContent";
import React from "react";
import SingleClinicalCase from "./SingleClinicalCase";

interface Props {
  mcqBank: ClinicalCaseTreeResponse;
  bankId: string;
  setBankId: (id: string) => void;
  searchTerm: string;
}

const ClinicalCaseBank: React.FC<Props> = ({
  mcqBank,
  bankId,
  setBankId,
  searchTerm,
}) => {
  const ClinicalBank = mcqBank.data ?? [];

  const filteredBank = ClinicalBank.filter((item) => {
    const q = searchTerm.toLowerCase();
    if (!q) return true;
    return (
      item.caseTitle?.toLowerCase().includes(q) ||
      item.patientPresentation?.toLowerCase().includes(q) ||
      item.historyOfPresentIllness?.toLowerCase().includes(q) ||
      item.physicalExamination?.toLowerCase().includes(q) ||
      item.imaging?.toLowerCase().includes(q)
    );
  });

  const { data: singleClinicalCase } = useGetClinicalCaseQuery(bankId, {
    skip: bankId === "",
  });

  const [deleteClinicalCase, { isLoading: isDeleting }] =
    useDeleteClinicalCaseMutation();

  const handleDelete = async (id: string) => {
    await deleteClinicalCase(id)
      .unwrap()
      .catch((error) =>
        console.error("Failed to delete Clinical Case:", error),
      );
  };

  return (
    <div>
      {bankId === "" ? (
        <div className="grid grid-cols-1 gap-6 p-4  2xl:grid-cols-3">
          {filteredBank.map((item) => (
            <div
              key={item._id}
              className="border border-border rounded-lg shadow-md p-4 bg-white  transition-shadow duration-200"
            >
              <h2 className="text-lg font-bold mb-2">{item.caseTitle}</h2>
              <p className="text-sm text-black mb-1">
                <strong>Patient Presentation:</strong>{" "}
                {item.patientPresentation}
              </p>
              <p className="text-sm text-black mb-1">
                <strong>History:</strong> {item.historyOfPresentIllness}
              </p>
              <p className="text-sm text-black mb-1">
                <strong>Examination:</strong> {item.physicalExamination}
              </p>
              <p className="text-sm text-black mb-1">
                <strong>Imaging:</strong> {item.imaging}
              </p>

              <div className=" flex justify-between mt-4">
                <AlertDialogBox
                  action={() => handleDelete(item._id)}
                  isLoading={isDeleting}
                />
                <CommonButton
                  onClick={() => setBankId(item._id)}
                  className=" bg-blue-500 !text-white"
                >
                  View Details
                </CommonButton>
              </div>
            </div>
          ))}
        </div>
      ) : (
        singleClinicalCase && (
          <SingleClinicalCase data={singleClinicalCase} setBankId={setBankId} />
        )
      )}
    </div>
  );
};

export default ClinicalCaseBank;
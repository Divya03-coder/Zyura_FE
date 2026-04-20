import CommonButton from "@/common/button/CommonButton";
import AlertDialogBox from "@/common/custom/AlertDialogBox";
import { NotesTreeResponse } from "@/store/features/adminDashboard/ContentResources/MCQ/types/allContent";
import {
  useDeleteNotesMutation,
  useGetNotesQuery,
} from "@/store/features/adminDashboard/ContentResources/Notes/NoteSlice";
import React from "react";
import SingleNote from "./SingleNote";

interface Props {
  mcqBank: NotesTreeResponse;
  bankId: string;
  setBankId: (id: string) => void;
}
const NotesBank: React.FC<Props> = ({ mcqBank, bankId, setBankId }) => {
  const notesBank = mcqBank?.data ?? [];

  // single clinical case
  const { data: singleNotes } = useGetNotesQuery(bankId, {
    skip: bankId === "",
  });

  const [deleteNotes, { isLoading: isDeleting }] = useDeleteNotesMutation();

  const handleDelete = async (id: string) => {
    await deleteNotes(id)
      .unwrap()

      .catch((error) =>
        console.error("Failed to delete Clinical Case:", error),
      );
  };
  console.log("notesBank", singleNotes);
  return (
    <div>
      {bankId === "" ? (
        <div className="grid grid-cols-1 gap-6 p-4  2xl:grid-cols-3">
          {notesBank.map((item) => (
            <div className="bg-white shadow-md rounded-xl p-4 border border-gray-200 hover:shadow-lg transition">
              <h2 className="text-lg font-semibold text-black">{item.title}</h2>
              <p className="text-sm text-black">{item.description}</p>

              <div className="mt-3 space-y-1 text-sm text-black">
                <p>
                  <span className="font-semibold">Subject:</span> {item.subject}
                </p>
                <p>
                  <span className="font-semibold">System:</span> {item.system}
                </p>
                <p>
                  <span className="font-semibold">Topic:</span> {item.topic}
                </p>
                {item.subtopic && (
                  <p>
                    <span className="font-semibold">Subtopic:</span>
                    {item.subtopic}
                  </p>
                )}

                <p>
                  <span className="font-semibold">Student:</span>
                  {item.profileType}
                </p>
              </div>

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
        singleNotes?.data && (
          <SingleNote data={singleNotes} setBankId={setBankId} />
        )
      )}
    </div>
  );
};

export default NotesBank;

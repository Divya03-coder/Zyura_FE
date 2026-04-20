import Spinner from "@/common/button/Spinner";
import Pagination from "@/common/custom/Pagination";
import { useDebounce } from "@/common/custom/useDebounce";
import {
  useDeleteSingleFlashCardMutation,
  useGetSingleFlashCardsQuery,
  useUpdateSingleFlashCardMutation,
} from "@/store/features/adminDashboard/ContentResources/flashCard/flashCardSlice";
import { DifficultyFilter } from "@/types";
import { skipToken } from "@reduxjs/toolkit/query";
import { useState } from "react";
import SearchWithTabs from "../../medical/examMode/SearchWithTabs";
import EditFlashCardModal, { EditFlashCardInput } from "./EditFlashCardModal";

type FlashCardProps = {
  bankId: string;
};

const SingleFlashCardCard: React.FC<FlashCardProps> = ({ bankId }) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [difficulty, setDifficulty] = useState<DifficultyFilter>("All");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const limit = 6;

  const singleMcqQueryArg = bankId
    ? {
        id: bankId,
        page: currentPage,
        limit,
        ...(difficulty !== "All" ? { difficulty } : {}),
        searchTerm: debouncedSearchTerm,
      }
    : skipToken;

  const { data: singleMcqBank, isLoading: isSingleFashCardLoading } =
    useGetSingleFlashCardsQuery(singleMcqQueryArg, { skip: bankId === "" });
  const singleFlashBankData = singleMcqBank?.data.flashCards ?? [];

  const [deleteSingleFlashCard] = useDeleteSingleFlashCardMutation();
  const [updateSingleFlashCard, { isLoading: isUpdateLoading }] =
    useUpdateSingleFlashCardMutation();

  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDelete = async (flashBank: string, flashCardId: string) => {
    try {
      setDeletingId(flashCardId);
      if (flashBank && flashCardId) {
        await deleteSingleFlashCard({
          flashBankId: flashBank,
          flashCardId,
        }).unwrap();
      }
    } finally {
      setDeletingId(null);
    }
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState<EditFlashCardInput | null>(
    null
  );
  const [flashCardId, setFlashCardId] = useState<string | null>(null);

  const handleEdit = (card: EditFlashCardInput, id: string) => {
    setSelectedCard(card);
    setFlashCardId(id);
    setIsModalOpen(true);
  };

  console.log("flashCardId", flashCardId);
  console.log("selectedCard", selectedCard);
  const handleUpdate = async (values: EditFlashCardInput) => {
    if (!flashCardId || !bankId || !values) return;

    await updateSingleFlashCard({
      flashBankId: bankId,
      flashCardId: flashCardId,
      data: values,
    }).unwrap();

    setIsModalOpen(false);
  };

  return (
    <div>
      <div className=" w-fll flex flex-col gap-6">
        <SearchWithTabs
          difficulty={difficulty}
          setDifficulty={setDifficulty}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />
        <div className="">
          {isSingleFashCardLoading ? (
            <Spinner />
          ) : singleFlashBankData.length === 0 ? (
            <div className="text-center py-10 text-gray-500 font-medium">
              No data found
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 p-4  2xl:grid-cols-3 ">
              {singleFlashBankData.map((flashCard) => (
                <div className="border border-border rounded-xl shadow p-5  bg-white">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-sm text-gray-500 font-medium">
                      ID: {flashCard.flashCardId}
                    </span>
                    <span className="px-3 py-1 text-xs rounded-full bg-blue-100 text-blue-600">
                      {flashCard.difficulty}
                    </span>
                  </div>
                  {flashCard.image && (
                    <img
                      src={flashCard.image}
                      alt="Image"
                      className="w-full h-48 object-cover rounded-lg mb-4"
                    />
                  )}

                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    Front
                  </h3>
                  <p className="text-gray-700 mb-4">{flashCard.frontText}</p>

                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    Back
                  </h3>
                  <p className="text-gray-700 mb-4">{flashCard.backText}</p>

                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    Explanation
                  </h3>
                  <p className="text-gray-600 mb-6">{flashCard.explanation}</p>

                  {/* Buttons */}
                  <div className="flex items-center justify-end gap-3 mt-4">
                    <button
                      onClick={() =>
                        handleEdit(flashCard, flashCard.flashCardId)
                      }
                      className="px-4 py-2 text-sm bg-blue-500 hover:bg-blue-600 text-white rounded-lg  cursor-pointer "
                    >
                      Edit
                    </button>

                    <button
                      disabled={deletingId === flashCard.flashCardId}
                      onClick={() =>
                        handleDelete(
                          singleMcqBank?.data._id ?? "",
                          flashCard.flashCardId
                        )
                      }
                      className="px-4 py-2 text-sm bg-red-500 cursor-pointer  hover:bg-red-600 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {deletingId === flashCard.flashCardId
                        ? "Deleting..."
                        : "Delete"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      {singleFlashBankData.length > 0 && (
        <div className="py-5">
          <Pagination
            totalPages={singleMcqBank?.meta.totalPages ?? 1}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        </div>
      )}

      {isModalOpen && selectedCard && (
        <EditFlashCardModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          isLoading={isUpdateLoading}
          onSubmit={handleUpdate}
          initialData={{
            frontText: selectedCard.frontText,
            backText: selectedCard.backText,
            explanation: selectedCard.explanation,
            difficulty: selectedCard.difficulty,
            image: selectedCard.image,
          }}
        />
      )}
    </div>
  );
};

export default SingleFlashCardCard;

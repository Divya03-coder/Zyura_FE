/* eslint-disable @typescript-eslint/no-explicit-any */
import Pagination from "@/common/custom/Pagination";
import { IFlashcardBank } from "@/types";
import FlashCard from "./FlashCard";

export default function AllGeneratedFlashCard({
  flashcardBanks,
  flashcardBankLoading,
  meta,
  page,
  setPage,
}: any) {
  const totalPages = meta?.totalPages || 1;

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };
  return (
    <div>
      <div className="bg-white border border-slate-300 rounded-[8px] py-5 pl-7 pr-5">
        <div>
          <div className="mb-6">
            <h3 className=" text-[#0A0A0A] font-medium">All Cards</h3>
          </div>

          {flashcardBankLoading ? (
            <div className="flex justify-center items-center h-[200px]">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-gray-900"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-4">
              {flashcardBanks?.length > 0 ? (
                flashcardBanks.map((flashcard: IFlashcardBank, idx: number) => (
                  <FlashCard key={idx} source="all" {...flashcard} />
                ))
              ) : (
                <p className="text-center text-gray-500 col-span-full">
                  No flashcards found.
                </p>
              )}
            </div>
          )}
        </div>
        <div className="mt-6">
          {totalPages > 1 && (
            <Pagination
              totalPages={totalPages}
              currentPage={page}
              onPageChange={handlePageChange}
            />
          )}
        </div>
      </div>
    </div>
  );
}

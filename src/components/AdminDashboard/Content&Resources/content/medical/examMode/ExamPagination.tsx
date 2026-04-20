import { MdArrowBackIosNew, MdArrowForwardIos } from "react-icons/md";

interface ExamPaginationProps {
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  totalPages: number;
}

const ExamPagination = ({ page, setPage, totalPages }: ExamPaginationProps) => {
  const handlePrev = () => {
    if (page > 1) {
      setPage((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (page < totalPages) {
      setPage((prev) => prev + 1);
    }
  };

  return (
    <div className="flex items-center justify-center gap-4 mt-6">
      {/* Prev */}
      <button
        onClick={handlePrev}
        disabled={page === 1}
        className="flex items-center gap-2 p-4 border border-border rounded-full disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer hover:bg-blue-main hover:text-white"
      >
        <MdArrowBackIosNew size={16} />
      </button>

      <button
        onClick={handleNext}
        disabled={page === totalPages}
        className="flex items-center gap-2 p-4 border border-border rounded-full hover:bg-blue-main hover:text-white disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
      >
        <MdArrowForwardIos size={16} />
      </button>
    </div>
  );
};

export default ExamPagination;

import ButtonWithIcon from "@/common/button/ButtonWithIcon";
import Spinner from "@/common/button/Spinner";
import Pagination from "@/common/custom/Pagination";
import { useDebounce } from "@/common/custom/useDebounce";
import DashboardSearch from "@/Layout/dashboard/DashboardSearch";
import { useGetResourceBooksQuery } from "@/store/features/adminDashboard/ContentResources/resourceLibery/resourceLibery";
import { BookType } from "@/store/features/adminDashboard/ContentResources/resourceLibery/types/books";
import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import BookTable from "./BookTable";
import BookUploadForm from "./BookUploadForm";

const Book = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const [viewAll, setViewAll] = useState(false);
  const [viewAllPage, setViewAllPage] = useState<number>(5);
  const [editBook, setEditBook] = useState<BookType | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const { data, isLoading } = useGetResourceBooksQuery({
    page: currentPage,
    limit: viewAllPage,
    searchTerm: debouncedSearchTerm,
  });

  const cardLists = data?.data ?? [];
  const totalPages = data?.meta?.totalPages ?? 1;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleViewAll = () => {
    setViewAll(true);
    setViewAllPage(data?.meta.total ?? 0);
    setCurrentPage(1);
  };

  const handleEdit = (book: any) => {
    setEditBook(book);
    setIsEditModalOpen(true);
  };

  const handleCloseModal = () => {
    setEditBook(null);
    setIsEditModalOpen(false);
  };

  return (
    <div>
      {isEditModalOpen && editBook ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white w-full max-w-3xl p-6 rounded-lg shadow-lg overflow-y-auto max-h-[90vh] relative mx-4 sm:mx-0">
            <BookUploadForm
              initialData={editBook}
              handleCloseModal={handleCloseModal}
            />
          </div>
        </div>
      ) : (
        <div>
          <div className="flex flex-col sm:flex-row justify-between items-center gap-6 sm:gap-10 pb-10 ">
            <DashboardSearch
              value={searchTerm}
              onChange={setSearchTerm}
              className=" rounded-none! w-full  md:max-w-[734px]! "
            />
            <ButtonWithIcon
              icon={FaPlus}
              className="w-full sm:w-auto flex justify-center  shrink-0  "
            >
              <Link to="upload-books">Upload Books</Link>
            </ButtonWithIcon>
          </div>

          <div className={viewAll ? "mb-10" : ""}>
            {isLoading ? (
              <Spinner />
            ) : cardLists.length === 0 ? (
              <p className="flex justify-center">No Data Found</p>
            ) : (
              <BookTable
                data={cardLists}
                handleViewAll={handleViewAll}
                handleEdit={handleEdit}
              />
            )}
          </div>

          {cardLists.length > 0 && !viewAll && (
            <div className="py-10">
              <Pagination
                totalPages={totalPages}
                currentPage={currentPage}
                onPageChange={handlePageChange}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Book;

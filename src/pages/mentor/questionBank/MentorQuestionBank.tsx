import { BreadcrumbItem } from "@/components/dashboard/gamified-learning/types";
import Breadcrumb from "@/components/reusable/CommonBreadcrumb";
import DashboardHeading from "@/components/reusable/DashboardHeading";
import { Plus } from "lucide-react";
import { useState } from "react";
import Pagination from "@/components/reusable/Pagination";
import PrimaryButton from "@/components/reusable/PrimaryButton";
import MentorQuestionBankCard from "./MentorQuestionBankCard";
import { Link } from "react-router-dom";

const breadcrumbs: BreadcrumbItem[] = [
  { name: "Dashboard", link: "/mentor" },
  { name: "Classes", link: "/mentor/classes" },
];

const MentorQuestionBank = () => {
  // Dummy products (replace with API data)
  const products = Array.from({ length: 57 }, (_, i) => ({
    id: `p${i + 1}`,
    name: `Product ${i + 1}`,
    price: Math.floor(Math.random() * 1000) + 1,
  }));

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [showAll, setShowAll] = useState(false);

  // Config
  const productsPerPage = 10;
  const totalProducts = products.length;
  const totalPages = Math.ceil(totalProducts / productsPerPage);

  // Handle toggle show all
  const handleShowAll = () => setShowAll((prev) => !prev);

  // Get products for current page or all
  // const paginatedProducts = useMemo(() => {
  //     if (showAll) return products;
  //     const startIndex = (currentPage - 1) * productsPerPage;
  //     return products.slice(startIndex, startIndex + productsPerPage);
  // }, [products, currentPage, showAll]);

  // Showing range
  const start = showAll ? 1 : (currentPage - 1) * productsPerPage + 1;
  const end = showAll
    ? totalProducts
    : Math.min(currentPage * productsPerPage, totalProducts);

  return (
    <div className="">
      <Breadcrumb breadcrumbs={breadcrumbs} />

      <div className="flex items-center justify-between mb-16">
        <DashboardHeading
          title=" Question Bank"
          titleSize="text-xl"
          titleFont="font-medium"
          titleColor="text-black"
          description="Create a new question bank to organize your questions by subject or topic."
          descSize="text-sm"
          descColor="text-slate-700"
          className="mb-7"
        />
        <Link to={"/mentor/create-question-bank"}>
          <PrimaryButton
            bgType="solid"
            iconPosition="left"
            bgColor="bg-blue-btn-1"
            icon={<Plus className="w-4 h-4" />}
            className="h-10 mb-4 hover:bg-blue-btn-1 hover:opacity-80 cursor-pointer"
          >
            Add Question Bank
          </PrimaryButton>
        </Link>
      </div>

      <div>
        {Array(2)
          .fill(null)
          .map(() => (
            <MentorQuestionBankCard />
          ))}
      </div>

      {/* Pagination */}
      <div className="mt-16 mb-32 flex justify-center space-x-5 ">
        {!showAll && (
          <Pagination
            title={"All Products"}
            showText={`Showing ${start} to ${end} of ${totalProducts} Products`}
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
            onToggleShowAll={handleShowAll}
            showAll={showAll}
          />
        )}

        {/* Show All Toggle */}
        {/* {showAll && (
                    <div className="flex justify-center">
                        <button
                            onClick={handleShowAll}
                            className="px-6 py-2 bg-sunset-orange text-white rounded-lg"
                        >
                            Show Less
                        </button>
                    </div>
                )} */}
      </div>
    </div>
  );
};

export default MentorQuestionBank;

import { FileDown, View } from "lucide-react";
import pdfImage from "@/assets/fi_18063801.png"
import { useState } from "react";
import Pagination from "@/components/reusable/Pagination";

export default function RecentDownloadsTab() {

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
    <div className="mt-10 p-6">
      <div className="flex items-center gap-2">
        <FileDown className="w-5 h-5 text-[#007BFF]" />
        <p className="text-lg text-slate-800 font-medium leading-7">Recent Downloads</p>
      </div>

      <div className="mt-6 space-y-7 border border-slate-300 p-8 rounded-[8px]">
        <div className="flex justify-between items-center border-b border-b-slate-300 pb-2 pl-2">
          <div className="flex items-center gap-3">
            <img src={pdfImage} alt="pdfImage" />
            <h4 className="text-base text-[#3F3F3F] font-medium leading-6">Topic Name.PDF</h4>
            <p className="text-sm text-slate-700 font-normal leading-5">Aug 1, 11AM</p>
          </div>
          <View className="w-6 h-6" />
        </div>
        <div className="flex justify-between items-center border-b border-b-slate-300 pb-2 pl-2">
          <div className="flex items-center gap-3">
            <img src={pdfImage} alt="pdfImage" />
            <h4 className="text-base text-[#3F3F3F] font-medium leading-6">Topic Name.PDF</h4>
            <p className="text-sm text-slate-700 font-normal leading-5">Aug 1, 11AM</p>
          </div>
          <View className="w-6 h-6" />
        </div>
        <div className="flex justify-between items-center border-b border-b-slate-300 pb-2 pl-2">
          <div className="flex items-center gap-3">
            <img src={pdfImage} alt="pdfImage" />
            <h4 className="text-base text-[#3F3F3F] font-medium leading-6">Topic Name.PDF</h4>
            <p className="text-sm text-slate-700 font-normal leading-5">Aug 1, 11AM</p>
          </div>
          <View className="w-6 h-6" />
        </div>
        <div className="flex justify-between items-center border-b border-b-slate-300 pb-2 pl-2">
          <div className="flex items-center gap-3">
            <img src={pdfImage} alt="pdfImage" />
            <h4 className="text-base text-[#3F3F3F] font-medium leading-6">Topic Name.PDF</h4>
            <p className="text-sm text-slate-700 font-normal leading-5">Aug 1, 11AM</p>
          </div>
          <View className="w-6 h-6" />
        </div>
        <div className="flex justify-between items-center border-b border-b-slate-300 pb-2 pl-2">
          <div className="flex items-center gap-3">
            <img src={pdfImage} alt="pdfImage" />
            <h4 className="text-base text-[#3F3F3F] font-medium leading-6">Topic Name.PDF</h4>
            <p className="text-sm text-slate-700 font-normal leading-5">Aug 1, 11AM</p>
          </div>
          <View className="w-6 h-6" />
        </div>
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
  )
}

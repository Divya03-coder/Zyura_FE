import profileImage from "@/assets/dashboard/profileImage.png";
import profileBg from "@/assets/dashboard/profileBg.png";
import { Link } from "react-router-dom";
import { Star } from "lucide-react";
import { Rating } from "@smastrom/react-rating";
import { ThinStar } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import { useState } from "react";
import Pagination from "@/components/reusable/Pagination";

const reviews = [
  {
    id: 1,
    name: "Fabio",
    date: "August 14, 2025",
    // avatar: w1,
    rating: 4.5,
    text: "Mike Handyman Service is a great , he helped me through the problems that i really want .Mike did an excellent job fixing our kitchen cabinet doors and installing new handles. Very professional, arrived on time, and cleaned up after himself. Highly recommended! Very much recommended.",
  },
  {
    id: 2,
    name: "Fabio",
    date: "August 14, 2025",
    // avatar: w1,
    rating: 5,
    text: "Mike Handyman Service is a great , he helped me through the problems that i really want . Very much recommended.",
  },
  {
    id: 3,
    name: "Fabio",
    date: "August 14, 2025",
    // avatar: w1,
    rating: 2.3,
    text: "Mike Handyman Service is a great , he helped me through the problems that i really want . Very much recommended.",
  },
];

export default function MentorReviewPage() {
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
    <div className="my-8 md:my-10">
      {/* Background Image */}
      <img src={profileBg} alt="Profile Background" className="w-full" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-7 -mt-5 mb-10 px-2 md:px-11">
        {/* Profile Card */}
        <div className="col-span-1">
          <div className="bg-white border border-slate-300 rounded-[8px] p-4 md:p-6">
            <div className="text-center">
              <img
                src={profileImage}
                alt=""
                className="mx-auto w-28 h-28 object-cover rounded-full"
              />
              <h3 className="text-xl font-semibold text-black mt-2">
                Emma Harrison
              </h3>
              <p className="text-slate-700">Medical Student</p>
            </div>

            <div className="mt-6 space-y-3 text-sm sm:text-base">
              <div>
                <p>
                  <span className="font-medium">Average rating </span>
                </p>
                <div className="flex items-center gap-3">
                  <Star className="text-[#21A391]" />
                  <p className="text-sm text-[#475569]">
                    4.8 <span>(60 Reviews)</span>
                  </p>
                </div>
                <div className="flex items-center justify-between flex-wrap mt-3">
                  <p className="flex flex-col text-sm font-medium">
                    Completion Rate
                    <span className="text-sm font-normal text-[#475569]">
                      93%
                    </span>
                  </p>
                  <Link to={"/mentor/mentor-profile"}>
                    <p className="text-blue-main underline cursor-pointer">
                      Profile Info
                    </p>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Review section */}
        <div className="md:col-span-2 pb-10">
          <div className="bg-white rounded-xl  border border-border p-7.5 flex flex-col gap-6">
            <h2 className="flex items-center gap-3 text-[#212529] !text-2xl">
              <Star /> Reviews
            </h2>

            <p className="text-xl font-semibold text-[#0F172A] mb-6">
              What Students say
            </p>

            {reviews.map((review) => (
              <div key={review.id} className="my-2">
                <div className="flex flex-col md:flex-row items-center gap-3">
                  <img
                    src={
                      "https://media.istockphoto.com/id/2194078950/photo/profile-picture-of-smiling-confident-arabic-businessman.webp?a=1&b=1&s=612x612&w=0&k=20&c=42Z7FDi1u5Ogevtd0xMUkTWM7hDzrre4YOlbHKvK_T8="
                    }
                    alt={review.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="font-semibold text-center md:text-start text-[#111827]">
                      {review.name}
                    </h3>
                    <div className="flex flex-col md:flex-row items-center gap-2">
                      <Rating
                        style={{ maxWidth: 130 }}
                        value={3}
                        readOnly
                        itemStyles={{
                          itemShapes: ThinStar, // required → shape of star
                          activeFillColor: "#21A391", // selected color
                          inactiveFillColor: "#E5E7EB", // unselected color
                        }}
                      />
                      <p className=" !text-[#6B7280]">August 14, 2025</p>
                    </div>
                  </div>
                </div>

                <h3 className=" !font-normal text-[#0F172A] pt-4">
                  {review.text}
                </h3>
              </div>
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
      </div>

      {/* <EditStudentProfileModal open={open} setOpen={setOpen} /> */}
    </div>
  );
}

import Spinner from "@/common/button/Spinner";
import CommonSelect, { SelectOption } from "@/common/custom/CommonSelect";
import CommonHeader from "@/common/header/CommonHeader";
import CommonSpace from "@/common/space/CommonSpace";
import {
  useDeleteFaqMutation,
  useGetFaqQuery,
} from "@/store/features/adminDashboard/planAndFaq/PricePlanApi";
import { PostFaq } from "@/store/features/adminDashboard/planAndFaq/types/Faq";
import { ChevronRight, Edit2, Trash2 } from "lucide-react";
import { useMemo, useState } from "react";
import DashboardSearch from "@/Layout/dashboard/DashboardSearch";
import DashboardTopSection from "../AdminDashboard/reuseable/DashboardTopSection";
import CreateFaqModal, { FaqFormType } from "./CreateFaqModal";

export const categoriesOptions: SelectOption<string>[] = [
  { label: "All Categories", value: "all" },
  { label: "Getting Started", value: "Getting Started" },
  { label: "MCQ Bank", value: "MCQ Bank" },
  { label: "Flash Card", value: "Flash Card" },
  { label: "Community", value: "Community" },
  { label: "AI Feature", value: "AI Feature" },
];

const FAQManagement = () => {
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>(
    {}
  );
  const [selected, setSelected] = useState<string>("all");
  const [isFaqModalOpen, setIsFaqModalOpen] = useState(false);
  const [editFaq, setEditFaq] = useState<PostFaq | null>(null);

  const { data: faqData, isLoading } = useGetFaqQuery();
  const faqs = faqData?.data || [];

  const categories = useMemo(() => {
    const counts: Record<string, number> = {};
    faqs.forEach((item) => {
      counts[item.category] = (counts[item.category] || 0) + 1;
    });
    return Object.keys(counts).map((key) => ({
      id: key,
      name: key,
      count: counts[key],
    }));
  }, [faqs]);

  const filteredFaqs =
    selected === "all" ? faqs : faqs.filter((faq) => faq.category === selected);

  const toggleItem = (id: string) => {
    setExpandedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const [deleteFaq] = useDeleteFaqMutation();
  const handleDelete = async (id: string) => {
    if (id) await deleteFaq(id).unwrap();
  };

  return (
    <div className="">
      <DashboardTopSection
        title="FAQ Management"
        description="Manage frequently asked questions for students and professionals"
        buttonText="Add FAQ"
        action={() => {
          setEditFaq(null);
          setIsFaqModalOpen(true);
        }}
      />

      <CommonSpace>
        <div>
          <div className="p-6 border border-border bg-white rounded-md">
            <CommonHeader className="pb-2 !text-2xl">Faq's</CommonHeader>

            <div className="flex flex-col lg:flex-row items-center gap-4 w-full">
              <div className="w-full">
                <DashboardSearch className="!rounded-none" />
              </div>

              <CommonSelect
                value={selected}
                item={categoriesOptions}
                onValueChange={setSelected}
                placeholder="Select a category"
                className="w-full! lg:w-20!"
              />
            </div>
          </div>

          {isLoading ? (
            <Spinner />
          ) : (
            <div className="space-y-6 mt-6">
              {categories.map((category) => (
                <div
                  key={category.id}
                  className="space-y-2 p-6 border border-border bg-white rounded-md"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <h3 className="text-lg font-semibold text-gray-900 capitalize">
                      {category.name}
                    </h3>
                    <span className="px-2 py-0.5 bg-gray-200 text-gray-700 rounded-full text-xs font-medium">
                      {category.count}
                    </span>
                  </div>

                  {filteredFaqs
                    .filter((faq) => faq.category === category.id)
                    .map((faq) => (
                      <div
                        key={faq._id}
                        className="border border-gray-200 rounded-lg overflow-hidden"
                      >
                        <button
                          onClick={() => toggleItem(faq._id)}
                          className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors cursor-pointer"
                        >
                          <span className="text-sm font-medium text-gray-900 text-left">
                            {faq.question}
                          </span>
                          <ChevronRight
                            className={`text-gray-400 transition-transform ${
                              expandedItems[faq._id] ? "rotate-90" : ""
                            }`}
                            size={18}
                          />
                        </button>

                        {expandedItems[faq._id] && (
                          <div className="px-4 pb-4 border-t border-gray-200">
                            <p className="text-sm text-gray-600 mt-4 mb-3">
                              {faq.answer}
                            </p>

                            <div className="flex items-center justify-between">
                              <span className="text-xs text-gray-500">
                                Created: {faq.createdAt?.slice(0, 10)}
                              </span>

                              <div className="flex items-center gap-2">
                                <button
                                  onClick={() => {
                                    setEditFaq(faq);
                                    setIsFaqModalOpen(true);
                                  }}
                                  className="flex items-center gap-1 px-3 py-1 text-sm text-gray-700 hover:bg-gray-100 rounded cursor-pointer"
                                >
                                  <Edit2 size={14} /> Edit
                                </button>

                                <button
                                  onClick={() => handleDelete(faq._id)}
                                  className="flex items-center gap-1 px-3 py-1 text-sm text-red-600 hover:bg-red-50 rounded cursor-pointer"
                                >
                                  <Trash2 size={14} /> Delete
                                </button>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                </div>
              ))}
            </div>
          )}
        </div>
      </CommonSpace>

      {isFaqModalOpen && (
        <CreateFaqModal
          initialData={editFaq && (editFaq as FaqFormType & { _id: string })}
          onClose={() => {
            setIsFaqModalOpen(false);
            setEditFaq(null);
          }}
        />
      )}
    </div>
  );
};

export default FAQManagement;

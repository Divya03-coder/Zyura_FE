import { useMemo, useState, useEffect } from "react";
import { Search, HelpCircle } from "lucide-react";
import FAQAccordion from "../FAQAccordion";
import { useGetAllFAQQuery } from "@/store/features/faq/faq.api";
import GlobalLoader2 from "@/common/GlobalLoader2";

interface FAQItem {
  _id: string;
  category: string;
  question: string;
  answer: string;
}

const normalizeCategory = (value: string) =>
  value.toLowerCase().replace(/\s+/g, "-");

export default function FAQ() {
  const { data: faqsData, isLoading: faqLoading } = useGetAllFAQQuery({});
  const faqs: FAQItem[] = faqsData?.data || [];

  /* -------------------
      Dynamic categories
  ------------------- */
  const categories = useMemo(() => {
    const uniqueCategories = Array.from(
      new Set(faqs.map((faq) => faq.category))
    );

    return uniqueCategories.map((cat) => ({
      id: normalizeCategory(cat),
      label: cat,
    }));
  }, [faqs]);

  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("");

  useEffect(() => {
    if (categories.length > 0 && !activeCategory) {
      setActiveCategory(categories[0].id);
    }
  }, [categories, activeCategory]);

  /* -------------------
      Group FAQs
  ------------------- */
  const groupedFaqs = useMemo(() => {
    return faqs.reduce((acc: any, faq) => {
      const key = normalizeCategory(faq.category);
      acc[key] = acc[key] || [];
      acc[key].push(faq);
      return acc;
    }, {});
  }, [faqs]);

  /* -------------------
      Search helper
  ------------------- */
  const matchSearch = (faq: FAQItem) =>
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase());

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="p-7 bg-white rounded-[10px] space-y-6">
        <div>
          <h2 className="text-xl font-normal text-black mb-1">
            Frequently Asked Questions
          </h2>
          <p className="text-sm font-normal text-slate-700">
            Find answers to common questions about using our platform
          </p>
        </div>

        {/* Search Box */}
        <div className="relative">
          <Search className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search FAQs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-border rounded-lg 
                       focus:outline-none focus:ring-2 focus:ring-primary 
                       focus:border-transparent text-foreground bg-blue-50"
          />
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2 overflow-x-auto">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded font-medium text-sm whitespace-nowrap transition border border-slate-300 cursor-pointer ${
                activeCategory === cat.id
                  ? "bg-blue-main text-white"
                  : "bg-white text-foreground hover:bg-gray-200"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* FAQs */}
      {faqLoading ? (
        <GlobalLoader2 />
      ) : (
        <div className="space-y-4">
          {(() => {
            const currentFaqs = (groupedFaqs[activeCategory] || []).filter(
              matchSearch
            );

            if (currentFaqs.length > 0) {
              return currentFaqs.map((faq: FAQItem) => (
                <FAQAccordion
                  key={faq._id}
                  question={faq.question}
                  answer={faq.answer}
                />
              ));
            }

            return (
              <div className="col-span-full py-20 text-center bg-white rounded-3xl border-2 border-dashed border-slate-200">
                <HelpCircle className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                <p className="text-slate-500 font-bold text-lg">
                  No FAQs found
                </p>
                <p className="text-slate-400 text-sm mt-1">
                  No FAQs found matching your search. Try a different term or
                  category.
                </p>
              </div>
            );
          })()}
        </div>
      )}
    </div>
  );
}

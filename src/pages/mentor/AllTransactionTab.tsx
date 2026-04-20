import TransactionsCard from "./TransactionsCard";
import { useState } from "react";
import Pagination from "@/common/custom/Pagination";
import { useGetMentorTransactionsQuery } from "@/store/features/mentor/mentor.api";

export default function AllTransactionTab() {
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 10;

  const { data: transactionData, isLoading } = useGetMentorTransactionsQuery({
    // status: "Complete",
    page: currentPage,
    limit: limit,
  });

  const transactions = transactionData?.data || [];
  const meta = transactionData?.meta;
  const totalPages = meta?.totalPage || 1;

  if (isLoading) {
    return (
      <div className="flex justify-center py-10">
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <div>
          <p className="text-[#0A0A0A] font-medium">Recent Transactions</p>
        </div>
      </div>

      <div className="space-y-4">
        {transactions.length > 0 ? (
          transactions.map((transaction: any) => (
            <TransactionsCard key={transaction._id} transaction={transaction} />
          ))
        ) : (
          <div className="text-center py-10 text-gray-500">
            No transactions found.
          </div>
        )}
      </div>

      {/* Pagination */}
      <div className="mt-16 mb-32 flex justify-center">
        {totalPages > 1 && (
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        )}
      </div>
    </div>
  );
}

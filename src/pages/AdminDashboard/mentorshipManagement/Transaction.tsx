import TransactionTable from "@/components/AdminDashboard/mentorshipManagement/transaction/TransactionTable";
import TransactionTop from "@/components/AdminDashboard/mentorshipManagement/transaction/TransactionTop";

const Transaction = () => {
  return (
    <div>
      <TransactionTop />
      <TransactionTable />
    </div>
  );
};

export default Transaction;

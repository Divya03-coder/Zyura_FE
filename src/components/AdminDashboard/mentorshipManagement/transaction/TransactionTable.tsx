import { useState } from "react";
import Tabs from "../../reuseable/Tabs";
import TransactionSearch from "./TransactionSearch";
import Payout from "./Payout";
import PaymentHistory from "./PaymentHistory";
import MentorEaring from "./MentorEaring";
import { payoutData } from "./data/payout";
import { paymentData } from "./data/PaymentHistory";
const tabs = [
  { label: "Pending Pay-out", value: "pending" },
  { label: "Payment History", value: "payment" },
  { label: "Mentor Earnings", value: "mentor" },
];
const TransactionTable = () => {
  const [activeTab, setActiveTab] = useState("pending");

  return (
    <div>
      <Tabs tabs={tabs} active={activeTab} onChange={setActiveTab} />

      <div className="py-5">
        <TransactionSearch />
      </div>

      <div>
        {activeTab === "pending" && <Payout payout={payoutData} />}
        {activeTab === "payment" && <PaymentHistory payment={paymentData} />}
        {activeTab === "mentor" && <MentorEaring />}
      </div>
    </div>
  );
};

export default TransactionTable;

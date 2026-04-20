import { BreadcrumbItem } from "@/components/dashboard/gamified-learning/types";
import Breadcrumb from "@/components/reusable/CommonBreadcrumb";
import DashboardHeading from "@/components/reusable/DashboardHeading";
import MentorOverviewCard from "@/components/reusable/MentorOverviewCard";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BookOpenText, Coins } from "lucide-react";
import { useState } from "react";
import TransactionsCard from "./TransactionsCard";
import { Link } from "react-router-dom";
import TotalEarningsChart from "./TotalEarningsChart";
import { useGetMentorEarningsQuery } from "@/store/features/mentor/mentor.api";

const breadcrumbs: BreadcrumbItem[] = [
  { name: "Dashboard", link: "/mentor" },
  { name: "Earnings", link: "/mentor/earnings" },
];

const MentorEarnings = () => {
  const [year, setYear] = useState<string>("2025");

  const { data: earningsData, isLoading } = useGetMentorEarningsQuery(year);

  const data = earningsData?.data;
  const overview = data?.overview;
  const earningsChart = data?.earningsChart || [];
  const transactions = data?.transactions || [];

  if (isLoading) {
    return (
      <div className="flex justify-center py-20">
        <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div>
      <Breadcrumb breadcrumbs={breadcrumbs} />

      <DashboardHeading
        title="Your Expertise, Their Success"
        titleSize="text-xl"
        titleFont="font-medium"
        titleColor="text-black"
        description="Connect with students who value your skills and experience"
        descSize="text-sm"
        descColor="text-slate-700"
        className="mb-7"
      />

      <div className="flex items-center gap-7">
        <MentorOverviewCard
          icon={Coins}
          iconColor="text-fuchsia-700"
          iconBg="bg-fuchsia-100"
          value={`$ ${overview?.totalEarning || 0}`}
          bottomText="Total Earnings"
        />
        <MentorOverviewCard
          icon={BookOpenText}
          iconColor="text-blue-700"
          iconBg="bg-blue-100"
          value={`$ ${overview?.pendingPayout || 0}`}
          bottomText="Pending Pay-out"
        />
      </div>

      <div>
        <div className="flex items-center justify-between my-5">
          <p className="text-2xl text-[#111827] font-semibold">
            Total Earnings
          </p>
          <div className="grid gap-2">
            <Select value={year} onValueChange={setYear}>
              <SelectTrigger id="year" className="w-[120px] bg-blue-main">
                <SelectValue placeholder="Select Year" />
              </SelectTrigger>
              <SelectContent className="">
                <SelectItem value="2024">2024</SelectItem>
                <SelectItem value="2025">2025</SelectItem>
                <SelectItem value="2026">2026</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="mt-7 mb-12">
          <TotalEarningsChart data={earningsChart} />
        </div>
      </div>

      <p className="text-lg font-medium mb-3">Pending Payout</p>

      <div className="flex items-center justify-between bg-yellow-50 border-slate-300 shadow rounded-[8px] p-5 mb-12">
        <div>
          <p className="text-[#0A0A0A] font-medium">Next Payout</p>
          <p className="text-lg font-medium text-zinc-500">
            $ {overview?.pendingPayout || 0}.00
          </p>
        </div>
        <div>
          <p className="text-sm">Pay-out Schedule</p>
          <p className="text-sm">Monthly</p>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="text-[#0A0A0A] font-medium">Recent Transactions</p>
          </div>
          <div>
            <Link to={"/mentor/recent-transaction"}>
              <p className="text-sm text-[#0076F5] underline">View All</p>
            </Link>
          </div>
        </div>

        <div className="space-y-3.5">
          {transactions.length > 0 ? (
            transactions.map((transaction: any) => (
              <TransactionsCard
                key={transaction._id}
                transaction={transaction}
              />
            ))
          ) : (
            <p className="text-center py-5 text-gray-500">
              No recent transactions
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MentorEarnings;

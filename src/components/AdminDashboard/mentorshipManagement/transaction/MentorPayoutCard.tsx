import CommonButton from "@/common/button/CommonButton";
import CommonHeader from "@/common/header/CommonHeader";
import React from "react";
import { FaCalendarAlt, FaCreditCard } from "react-icons/fa";

interface MentorPayoutProps {
  name: string;
  initials: string;
  specialty: string;
  memberSince: string;
  totalEarnings: number;
  sessions: number;
  lastPayoutDate: string;
  payoutMethod: string;
}

const MentorPayoutCard: React.FC<MentorPayoutProps> = ({
  name,
  initials,
  specialty,
  memberSince,
  totalEarnings,
  sessions,
  lastPayoutDate,
  payoutMethod,
}) => {
  return (
    <div className="w-full border border-border rounded-xl p-4 bg-white space-y-6">
      {/* Top section */}
      <div className="flex  justify-between gap-4">
        <div className="flex items-center space-x-4">
          {/* Avatar */}
          <div className="min-w-12 min-h-12 rounded-full bg-black text-white flex items-center justify-center text-sm font-medium">
            {initials}
          </div>
          {/* Info */}
          <div>
            <CommonHeader className="!font-semibold text-[#0A0A0A]">
              {name}
            </CommonHeader>
            <CommonHeader className="!text-[#717182] !font-normal ">
              {specialty}{" "}
              <span className="hidden 2xl:block">
                • Member since {memberSince}
              </span>
            </CommonHeader>
          </div>
        </div>

        {/* View Details */}
        <div className="self-start sm:self-auto">
          <CommonButton className="!px-4 !py-2 flex-shrink-0">
            View Details
          </CommonButton>
        </div>
      </div>

      {/* Earnings + Sessions */}
      <div className="flex flex-col sm:flex-row sm:justify-between gap-4">
        <div>
          <p className="!text-[#717182] !font-normal">Total Earnings</p>
          <CommonHeader className="!font-semibold text-[#0A0A0A]">
            ${totalEarnings.toFixed(2)}
          </CommonHeader>
        </div>
        <div>
          <CommonHeader className="!text-[#717182] !font-normal">
            Sessions
          </CommonHeader>
          <CommonHeader className="!font-semibold text-[#0A0A0A]">
            {sessions}
          </CommonHeader>
        </div>
      </div>

      {/* Footer */}
      <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-4 border-t border-border pt-3">
        <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-6 text-gray-600 text-sm gap-2 sm:gap-0">
          <CommonHeader className="!text-[#717182] !font-normal flex items-center space-x-1">
            <FaCalendarAlt className="text-base" />
            <span>Last payout: {lastPayoutDate}</span>
          </CommonHeader>
          <CommonHeader className="!text-[#717182] !font-normal flex items-center space-x-1">
            <FaCreditCard className="text-base" />
            <span>{payoutMethod}</span>
          </CommonHeader>
        </div>

        <CommonButton className="!bg-[linear-gradient(103deg,#0076F5_6.94%,#0058B8_99.01%)] !text-white">
          Process Pay-outs
        </CommonButton>
      </div>
    </div>
  );
};

export default MentorPayoutCard;

import CommonButton from "@/common/button/CommonButton";
import AlertDialogBox from "@/common/custom/AlertDialogBox";
import LoadingStatus from "@/common/custom/LoadingStatus";
import Pagination from "@/common/custom/Pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatDate } from "@/help/help";
import {
  useDeleteSubscribersMutation,
  useGetSubscribersQuery,
} from "@/store/features/adminDashboard/payment/paymentApi";
import { useState } from "react";
import { RiDeleteBinLine } from "react-icons/ri";

const tableHeaders = [
  { label: "User", align: "text-left md:table-cell hidden" },
  { label: "Plan", align: "text-center" },
  { label: "Status", align: "text-center md:table-cell hidden" },
  { label: "Active Date", align: "text-center xl:table-cell hidden" },
  { label: "Revenue", align: "text-center xl:table-cell hidden" },
  { label: "Action", align: "text-center" },
];

const tableDesign = {
  header:
    "text-lg font-geist text-[#2C2C2C] font-medium bg-[#EFF6FF] hover:bg-[#EFF6FF] md:h-12",
  cellHeader: "border border-border px-4 ",
  bodyRow: "text-[#2C2C2C] font-inter text-sm font-normal md:h-12 bg-white",
  cell: "border border-border px-4 text-center",
};
const PlanSubscriptionTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { data: subscription, isLoading } = useGetSubscribersQuery(
    { page: currentPage },
    {
      refetchOnMountOrArgChange: true,
    }
  );
  const [deletePricePlan, { isLoading: isDeleting }] =
    useDeleteSubscribersMutation();
  const handleDelete = async (id: string) => {
    if (id) {
      await deletePricePlan(id);
    }
  };
  return (
    <>
      {
        <LoadingStatus
          isLoading={isLoading}
          items={subscription?.data ?? []}
          itemName="subscriptions"
        />
      }
      {!isLoading && subscription && subscription?.data.length > 0 && (
        <Table>
          <TableHeader>
            <TableRow className={tableDesign.header}>
              {tableHeaders.map((header) => (
                <TableHead
                  key={header.label}
                  className={`${tableDesign.cellHeader} ${header.align}`}
                >
                  {header.label}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>

          <TableBody>
            {subscription.data.map((p) => (
              <TableRow key={p._id} className={tableDesign.bodyRow}>
                <TableCell
                  className={`hidden md:table-cell !text-left ${tableDesign.cell}`}
                >
                  <div>
                    {p.accountId.profile_id.firstName}{" "}
                    {p.accountId.profile_id.lastName}
                  </div>
                </TableCell>
                <TableCell className={` ${tableDesign.cell}`}>
                  <div>{p.planId.planName}</div>
                </TableCell>
                <TableCell
                  className={` hidden md:table-cell ${tableDesign.cell}`}
                >
                  <CommonButton
                    className={
                      p.status === "SUCCESS"
                        ? "bg-[#F0FDF4]! !text-[#15803D]"
                        : p.status === "PENDING"
                        ? "bg-blue-500! !text-[#fff]"
                        : "bg-[#FEFCE8]! !text-[#CA8A04]"
                    }
                  >
                    {p.status}
                  </CommonButton>
                </TableCell>
                <TableCell
                  className={`hidden xl:table-cell ${tableDesign.cell}`}
                >
                  <div>{formatDate(p.updatedAt)}</div>
                </TableCell>
                <TableCell
                  className={` hidden xl:table-cell ${tableDesign.cell}`}
                >
                  <div>{p.amount}$</div>
                </TableCell>
                <TableCell className={` ${tableDesign.cell}`}>
                  <div className="flex justify-center gap-3 text-[#B91C1C] ">
                    <AlertDialogBox
                      action={() => handleDelete(p._id)}
                      isLoading={isDeleting}
                      title="Are you sure you want to delete this subscription?"
                      description="This action cannot be undone."
                      trigger={
                        <button className="hover:text-red-800 cursor-pointer">
                          <RiDeleteBinLine size={24} />
                        </button>
                      }
                    />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
      {
        <div className="py-10">
          <Pagination
            currentPage={currentPage}
            onPageChange={setCurrentPage}
            totalPages={subscription?.meta.totalPages ?? 1}
          />
        </div>
      }
    </>
  );
};

export default PlanSubscriptionTable;

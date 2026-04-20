import AlertDialogBox from "@/common/custom/AlertDialogBox";
import LoadingStatus from "@/common/custom/LoadingStatus";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toBerhanTime } from "@/help/help";
import {
  useDeletePricePlanMutation,
  useGetAllPricePlanQuery,
} from "@/store/features/adminDashboard/planAndFaq/PricePlanApi";
import { Plan } from "@/store/features/adminDashboard/planAndFaq/types/plan";
import { useState } from "react";
import { BiSolidEdit } from "react-icons/bi";
import { RiDeleteBinLine } from "react-icons/ri";
import UpdatePlanModal from "./UpdatePlanModal";
import { PlanFormValues } from "./schema";
const tableHeaders = [
  { label: "Plan", align: "text-left" },
  { label: "Pricing", align: "text-center  hidden sm:table-cell" },
  { label: "Billing Cycle", align: "text-center hidden lg:table-cell" },
  { label: "User Type", align: "text-center hidden md:table-cell" },
  { label: "Created", align: "text-center hidden md:table-cell" },
  { label: "Action", align: "text-center" },
];

const tableDesign = {
  header:
    "text-lg font-geist text-[#2C2C2C] font-medium bg-[#EFF6FF] hover:bg-[#EFF6FF] md:h-12",
  cellHeader: "border border-border px-4 ",
  bodyRow: "text-[#2C2C2C] font-inter text-sm font-normal md:h-12 bg-white",
  cell: "border border-border px-4 text-center",
};

const PlanOverviewTable = () => {
  const [isModelOpen, setIsModelOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [selectedPlanId, setSelectedPlanId] = useState<string | null>(null);

  const { data, isLoading } = useGetAllPricePlanQuery();

  const allPricePlan = data?.data ?? [];

  const handleEdit = (plan: Plan) => {
    setSelectedPlan(plan);
    setSelectedPlanId(plan._id);
    setIsModelOpen(true);
  };

  const [deletePricePlan, { isLoading: isDeleting }] =
    useDeletePricePlanMutation();

  const handleDelete = async (id: string) => {
    if (id) {
      await deletePricePlan(id);
    }
  };
  return (
    <>
      <LoadingStatus
        isLoading={isLoading}
        items={allPricePlan}
        itemName="plans"
      />

      {!isLoading && allPricePlan.length > 0 && (
        <Table>
          <TableHeader>
            <TableRow className={tableDesign.header}>
              {tableHeaders.map((header) => (
                <TableHead
                  key={header.label}
                  className={`${tableDesign.cellHeader} ${header.align} `}
                >
                  {header.label}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>

          <TableBody>
            {allPricePlan.map((p) => (
              <TableRow key={p._id} className={tableDesign.bodyRow}>
                <TableCell className={`!text-left ${tableDesign.cell}`}>
                  <div>{p.planName}</div>
                </TableCell>
                <TableCell
                  className={`hidden sm:table-cell   ${tableDesign.cell}`}
                >
                  <div>{p.price}</div>
                </TableCell>
                <TableCell
                  className={` hidden lg:table-cell ${tableDesign.cell}`}
                >
                  <div>{p.billingCycle}</div>
                </TableCell>
                <TableCell
                  className={`hidden md:table-cell ${tableDesign.cell}`}
                >
                  <div>{p.userType}</div>
                </TableCell>
                <TableCell
                  className={`hidden md:table-cell ${tableDesign.cell}`}
                >
                  <div>{toBerhanTime(p.updatedAt)}</div>
                </TableCell>

                <TableCell className={tableDesign.cell}>
                  <div className="flex justify-center gap-3 text-[#B91C1C]">
                    <span
                      onClick={() => handleEdit(p)}
                      className="text-blue-500 cursor-pointer"
                    >
                      <BiSolidEdit size={24} />
                    </span>
                    <AlertDialogBox
                      trigger={
                        <button className="hover:text-red-800 cursor-pointer">
                          <RiDeleteBinLine size={24} />
                        </button>
                      }
                      isLoading={isDeleting}
                      action={() => handleDelete(p._id)}
                    />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

      {isModelOpen && selectedPlan && (
        <UpdatePlanModal
          onClose={() => setIsModelOpen(false)}
          selectedPlanId={selectedPlanId}
          planData={selectedPlan as PlanFormValues}
        />
      )}
    </>
  );
};

export default PlanOverviewTable;

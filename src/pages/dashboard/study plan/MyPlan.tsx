import DashboardHeading from "@/components/reusable/DashboardHeading";
import PrimaryButton from "@/components/reusable/PrimaryButton";
import { Plus, AlertCircle, Loader2, FileText } from "lucide-react";
import { Link } from "react-router-dom";
import MyStudyPlanCard from "./MyStudyPlanCard";
import { useDeleteStudyPlanMutation, useGetStudyPlanQuery } from "@/store/features/studyPlan/studyPlan.api";
import GlobalLoader2 from "@/common/GlobalLoader2";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Pagination from "@/common/custom/Pagination";

export default function MyPlan() {
  const [page, setPage] = useState(1);
  const limit = 12;
  const { data, isLoading } = useGetStudyPlanQuery({ page, limit });
  const [deleteStudyPlan, { isLoading: isDeleting }] = useDeleteStudyPlanMutation();
  const [planToDelete, setPlanToDelete] = useState<string | null>(null);

  const allStudyPlans = data?.data ?? [];
  const totalPages = Math.ceil(allStudyPlans.length / limit);
  const paginatedPlans = allStudyPlans.slice((page - 1) * limit, page * limit);

  console.log("data :", allStudyPlans);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDeleteConfirm = async () => {
    if (!planToDelete) return;
    try {
      await deleteStudyPlan(planToDelete).unwrap();
      setPlanToDelete(null);
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  return (
    <div className="px-1 md:px-2">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <DashboardHeading
            title="All Preference"
            titleSize="text-xl"
            description="A structured path to smarter learning and better results."
            className="mt-12 mb-12 space-y-1"
          />
        </div>
        <div className="flex items-center gap-6">
          {/* <Link to={"/dashboard/my-plan"}>
            <PrimaryButton
              bgType="solid"
              bgColor="bg-teal-700"
              iconPosition="left"
              icon={<Filter className="w-4 h-4" />}
              className="h-12 mb-4 hover:bg-teal-700/90 hover:opacity-80 cursor-pointer"
            >
              Filter
            </PrimaryButton>
          </Link> */}
          <Link to={"/dashboard/create-study-plan"}>
            <PrimaryButton
              bgType="solid"
              bgColor="bg-blue-btn-1"
              iconPosition="left"
              icon={<Plus className="w-4 h-4" />}
              className="h-12 mb-4 hover:bg-blue-btn-1 hover:opacity-80 cursor-pointer"
            >
              Create new preference
            </PrimaryButton>
          </Link>
        </div>
      </div>

      {isLoading ? (
        <GlobalLoader2 />
      ) : (
        <div className="mb-16">
          {paginatedPlans.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 mb-3 transition-all duration-300">
              {paginatedPlans.map(
                (plan: {
                  _id: string;
                  plan_summary: string;
                  total_days: number;
                  daily_plan: {
                    day_number: number;
                    date: string;
                    total_hours: number;
                    topics: string[];
                    hourly_breakdown: {
                      task_type: string;
                      duration_hours: number;
                      suggest_content: string[];
                      isCompleted: boolean;
                    }[];
                  }[];
                }) => (
                  <MyStudyPlanCard
                    key={plan._id}
                    plan={plan}
                    onDelete={() => setPlanToDelete(plan._id)}
                    isDeleting={isDeleting && planToDelete === plan._id}
                  />
                )
              )}
            </div>
          ) : (
            <div className="col-span-full py-20 text-center bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
              <FileText className="w-12 h-12 text-slate-300 mx-auto mb-4" />
              <p className="text-slate-500 font-bold text-lg">
                No Study Plans found
              </p>
              <p className="text-slate-400 text-sm mt-1">
                You haven't created any study plans yet. Create one to get started!
              </p>
            </div>
          )}

          {totalPages > 1 && (
            <div className="mt-8 flex justify-center">
              <Pagination
                currentPage={page}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          )}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <Dialog
        open={!!planToDelete}
        onOpenChange={(open) => !open && setPlanToDelete(null)}
      >
        <DialogContent className="sm:max-w-106.25">
          <DialogHeader>
            <div className="flex items-center gap-3 text-red-600 mb-2">
              <AlertCircle className="w-6 h-6" />
              <DialogTitle>Delete Study Plan</DialogTitle>
            </div>
            <DialogDescription>
              Are you sure you want to delete this study plan? This action
              cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2">
            <Button
              variant="outline"
              onClick={() => setPlanToDelete(null)}
              disabled={isDeleting}
              className="cursor-pointer"
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDeleteConfirm}
              disabled={isDeleting}
              className="cursor-pointer flex items-center gap-2"
            >
              {isDeleting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Deleting...
                </>
              ) : (
                "Delete Plan"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

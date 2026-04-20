import DashboardHeading from "@/components/reusable/DashboardHeading";
import { ArrowLeft, AlertCircle, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import Pagination from "@/components/reusable/Pagination";
import { useGetAllGeneratedMCQQuery } from "@/store/features/MCQBank/MCQBank.api";
import QuizCard from "./QuizCard";
import { useDeleteMyContentMutation } from "@/store/features/content/content.api";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export default function AllGeneratedQuiz() {
  const [currentPage, setCurrentPage] = useState(1);
  const [quizToDelete, setQuizToDelete] = useState<string | null>(null);

  const { data: mcqResponse, isLoading } = useGetAllGeneratedMCQQuery({
    page: currentPage,
    limit: 12,
  });

  const [deleteContent, { isLoading: isDeleting }] =
    useDeleteMyContentMutation();

  const quizzes = mcqResponse?.data || [];
  const meta = mcqResponse?.meta;
  const totalProducts = meta?.total || 0;
  const totalPages = meta?.totalPages || 1;

  const start = (currentPage - 1) * 12 + 1;
  const end = Math.min(currentPage * 12, totalProducts);

  const handleDeleteConfirm = async () => {
    if (!quizToDelete) return;
    try {
      await deleteContent({ id: quizToDelete, key: "mcq" }).unwrap();
      setQuizToDelete(null);
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-20">
        <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center gap-3">
        <Link to={"/dashboard/quiz-collection"} className="mb-7">
          <ArrowLeft />
        </Link>
        <DashboardHeading
          title="Generated Quiz"
          titleSize="text-xl"
          description="Create custom quizzes from your images and prompts using AI"
          descColor="text-[#4A5565]"
          descSize="text-sm"
          className="mt-12 mb-12 space-y-1"
        />
      </div>

      <h3 className="font-medium text-black mb-6">All Generated Quiz's</h3>

      <div className="bg-white border border-slate-300 rounded-[8px] py-5 pl-7 pr-5">
        <div>
          <h3 className="text-sm text-[#0A0A0A] font-medium">
            Generated Quizzes
          </h3>
          <p className="text-sm text-[#717182] mt-1">
            Your AI-generated quizzes ready to use
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            {quizzes.length > 0 ? (
              quizzes.map((quiz: any) => (
                <QuizCard
                  key={quiz._id}
                  id={quiz._id}
                  title={quiz.quizTitle || quiz.title || "Untitled Quiz"}
                  questionCount={quiz.q_count || quiz.questions?.length}
                  isCompleted={quiz.isCompleted}
                  onDelete={() => setQuizToDelete(quiz._id)}
                  isDeleting={isDeleting && quizToDelete === quiz._id}
                />
              ))
            ) : (
              <p className="text-center text-gray-500 col-span-full py-10">
                No generated quizzes found.
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Pagination */}
      <div className="mt-16 mb-32 flex justify-center space-x-5 ">
        {totalPages > 1 && (
          <Pagination
            title={"All Quizzes"}
            showText={`Showing ${start} to ${end} of ${totalProducts} Quizzes`}
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
            showAll={false}
          />
        )}
      </div>

      {/* Delete Confirmation Modal */}
      <Dialog
        open={!!quizToDelete}
        onOpenChange={(open) => !open && setQuizToDelete(null)}
      >
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <div className="flex items-center gap-3 text-red-600 mb-2">
              <AlertCircle className="w-6 h-6" />
              <DialogTitle>Delete Quiz</DialogTitle>
            </div>
            <DialogDescription>
              Are you sure you want to delete this AI-generated quiz? This
              action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2 sm:gap-0">
            <Button
              variant="outline"
              onClick={() => setQuizToDelete(null)}
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
                "Delete Quiz"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

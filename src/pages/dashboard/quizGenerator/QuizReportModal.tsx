/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { useReportMcqMutation } from "@/store/features/adminDashboard/ContentResources/MCQ/mcqApi";

export default function QuizReportModal({
  open,
  setOpen,
  mcqId = "",
  questionBankId = "",
}: any) {
  const [issue, setIssue] = useState("");
  const [loading, setLoading] = useState(false);
  const [ReportMcq] = useReportMcqMutation();

  // useEffect(() => {
  //   if (mcqId) {
  //     console.log("Reporting MCQ ID:", mcqId);
  //   }
  // }, [mcqId]);

  // Handle Report Submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!issue.trim()) {
      toast.error("Please describe the issue before submitting.");
      return;
    }

    const payloadData = {
      questionBankId,
      mcqId,
      text: issue,
    };
    setLoading(true);

    try {
      await ReportMcq(payloadData).unwrap();

      setIssue("");
      setOpen(false);
    } catch (error: any) {
      console.error("Report error:", error);
      toast.error(
        error?.data?.message || "Failed to submit report. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[500px]">
        <form onSubmit={handleSubmit} className="space-y-4">
          <p className="text-slate-900 font-normal">
            Reporting MCQ ID: {mcqId}
          </p>

          <div className="grid gap-2">
            <Label htmlFor="issue">Issue</Label>
            <Textarea
              id="issue"
              placeholder="Please describe the issue clearly..."
              value={issue}
              onChange={(e) => setIssue(e.target.value)}
            />
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" type="button">
                Cancel
              </Button>
            </DialogClose>

            <Button
              type="submit"
              disabled={loading}
              className="bg-blue-700 text-white"
            >
              {loading ? "Submitting..." : "Submit Report"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

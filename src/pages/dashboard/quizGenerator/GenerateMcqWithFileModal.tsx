import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller, Resolver } from "react-hook-form";
import { z } from "zod";
import { useEffect } from "react";
import { Zap } from "lucide-react";
import { useGenerateMCQWithFileMutation } from "@/store/features/MCQBank/MCQBank.api";
import { useNavigate } from "react-router-dom";

// =======================
// Zod Schema
// =======================
const quizSchema = z.object({
  difficulty: z.enum(["Basic", "Intermediate", "Advance"]),
  questionCount: z
    .number()
    .min(1, "At least 1 question is required")
    .max(50, "Max 50 questions"),
  duration: z.number().min(1, "Duration must be at least 1 minute"),
});

type QuizFormValues = z.infer<typeof quizSchema>;

interface GenerateMcqWithFileModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  files: File[];
  note: string;
}

export function GenerateMcqWithFileModal({
  open,
  setOpen,
  files,
  note,
}: GenerateMcqWithFileModalProps) {
  const [generateMCQWithFile, { isLoading }] = useGenerateMCQWithFileMutation();
  // const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<QuizFormValues>({
    resolver: zodResolver(quizSchema) as Resolver<QuizFormValues>,
    defaultValues: {
      questionCount: 10,
      duration: 40,
      difficulty: "Basic",
    },
  });

  // Reset when modal opens
  useEffect(() => {
    if (open) {
      reset({
        questionCount: 5,
        duration: 10,
        difficulty: "Basic",
      });
    }
  }, [open, reset]);

  // =======================
  // API CALL INSIDE MODAL
  // =======================
  const onFormSubmit = async (data: QuizFormValues) => {
    try {
      if ((!files || files.length === 0) && !note.trim()) {
        console.error("No file or note provided");
        return;
      }

      const formData = new FormData();
      if (files && files.length > 0) {
        // Appending the first file as per API requirement
        formData.append("file", files[0]);
      }

      const jsonData = {
        prompt: note || "Generate MCQ", // Use note as prompt
        d_level: data.difficulty,
        q_count: data.questionCount,
      };

      formData.append("data", JSON.stringify(jsonData));

      const res = await generateMCQWithFile(formData).unwrap();
      console.log("Response from AI:", res);

      // Assume res.data contains the questions array or is the array itself
      // If the backend returns something like { data: [...] }
      // const questionsArray = res.data || res;

      // if (Array.isArray(questionsArray)) {
      if (res.success) {
        // dispatch(
        //   setQuiz({
        //     id: "generated-quiz-" + Date.now(),
        //     title: "Generated Quiz",
        //     description: `${data.questionCount} Questions. ${data.difficulty}.`,
        //     questions: questionsArray.map((q: any, index: number) => ({
        //       id: (index + 1).toString(),
        //       text: q.question || q.text || "",
        //       options:
        //         q.options?.map((opt: any, i: number) => {
        //           // Handle both string and object options
        //           const label =
        //             typeof opt === "object" ? opt.optionText || opt.text : opt;
        //           const value =
        //             typeof opt === "object"
        //               ? opt.option || String.fromCharCode(65 + i)
        //               : String.fromCharCode(65 + i);
        //           const optionExplanation =
        //             typeof opt === "object" ? opt.explanation : "";

        //           return {
        //             value,
        //             label,
        //             explanation: optionExplanation,
        //           };
        //         }) || [],
        //       correctAnswer: q.answer || q.correctAnswer || "",
        //       explanation: q.explanation || "",
        //     })),
        //   })
        // );

        const quizId = res.data?._id || res._id;
        console.log(
          "Quiz Generated and stored in Redux. Redirecting to ID:",
          quizId
        );
        setOpen(false);
        navigate(`/dashboard/quiz/${quizId}`); // Redirect dynamically
      } else {
        console.error(
          "Invalid response format: expected an array of questions"
        );
      }
    } catch (error) {
      console.error("Quiz generation failed", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle>Generate Quiz</DialogTitle>
          <DialogDescription>
            Make your quiz from your uploaded files and prompt using AI.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onFormSubmit)} className="grid gap-6 py-4">
          <div className="grid grid-cols-2 gap-4">
            {/* Difficulty */}
            <div className="grid gap-2">
              <Label className="text-[#5A7183]">Difficulty</Label>
              <Controller
                name="difficulty"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger
                      className={errors.difficulty ? "border-red-500" : ""}
                    >
                      <SelectValue placeholder="Select Difficulty" />
                    </SelectTrigger>
                    <SelectContent className="border border-slate-300">
                      <SelectItem value="Basic">Basic</SelectItem>
                      <SelectItem value="Intermediate">Intermediate</SelectItem>
                      <SelectItem value="Advance">Advance</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.difficulty && (
                <p className="text-xs text-red-500">
                  {errors.difficulty.message}
                </p>
              )}
            </div>

            {/* Question Count */}
            <div className="grid gap-2">
              <Label className="text-[#5A7183]">Question count(Upto 50)</Label>
              <Input
                type="number"
                min={1}
                max={50}
                {...register("questionCount", { valueAsNumber: true })}
                className={errors.questionCount ? "border-red-500" : ""}
              />
              {errors.questionCount && (
                <p className="text-xs text-red-500">
                  {errors.questionCount.message}
                </p>
              )}
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-violet-700 text-white hover:bg-violet-800"
              disabled={isLoading}
            >
              <Zap
                className={`mr-2 h-4 w-4 fill-white ${isLoading ? "animate-spin" : ""
                  } `}
              />
              {isLoading ? "Generating..." : "Generate Quiz"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

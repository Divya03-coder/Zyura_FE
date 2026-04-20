// /* eslint-disable @typescript-eslint/no-explicit-any */
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Button } from "@/components/ui/button";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm, Controller, SubmitHandler } from "react-hook-form";
// import { z } from "zod";
// import { useEffect } from "react";

// // Zod Schema
// const quizSchema = z.object({
//   difficulty: z.enum(["basic", "intermediate", "hard"], {
//     message: "Difficulty is required",
//   }),
//   questionType: z.enum(["hybrid", "ai_generated"], {
//     message: "Question Type is required",
//   }),
//   questionCount: z.coerce.number().min(1, "At least 1 question is required").transform((val) => val as number),
//   duration: z.coerce.number().min(1, "Duration must be at least 1 minute").transform((val) => val as number),
// });

// type QuizFormValues = z.infer<typeof quizSchema>;

// interface PracticeQuizModalProps {
//   open: boolean;
//   setOpen: (open: boolean) => void;
//   onSubmit: (data: any) => void;
//   mcqBankId: string;
//   mcqBankTitle: string;
// }

// export function PracticeQuizModal({
//   open,
//   setOpen,
//   onSubmit,
//   mcqBankId,
//   mcqBankTitle,
// }: PracticeQuizModalProps) {
//   const {
//     control,
//     register,
//     handleSubmit,
//     setValue,
//     reset,
//     formState: { errors },
//   } = useForm<QuizFormValues>({
//     resolver: zodResolver(quizSchema),
//     defaultValues: {
//       questionCount: 10,
//       duration: 40,
//       difficulty: "basic",
//       questionType: "hybrid",
//     },
//   });

//   // Reset form when modal opens
//   useEffect(() => {
//     if (open) {
//       reset({
//         questionCount: 10,
//         duration: 40,
//         difficulty: undefined,
//         questionType: undefined,
//       });
//     }
//   }, [open, reset]);

//   const onFormSubmit: SubmitHandler<QuizFormValues> = (data) => {
//     const payload = {
//       ...data,
//       questionBankId: mcqBankId, // Ensure we pass the ID from props
//       questionBankTitle: mcqBankTitle,
//     };
//     onSubmit(payload);
//   };

//   return (
//     <Dialog open={open} onOpenChange={setOpen}>
//       <DialogContent className="sm:max-w-[600px]">
//         <DialogHeader>
//           <DialogTitle>Create Your Quiz</DialogTitle>
//           <DialogDescription>
//             Customize your practice quiz settings below.
//           </DialogDescription>
//         </DialogHeader>

//         <form
//           onSubmit={handleSubmit((data) =>
//             onFormSubmit(data as unknown as QuizFormValues)
//           )}
//           className="grid gap-6 py-4"
//         >
//           {/* Question Bank (Read-only) */}
//           <div className="grid gap-2">
//             <Label>Question Bank</Label>
//             <Input
//               value={mcqBankTitle}
//               disabled
//               className="bg-slate-100 opacity-100 text-slate-700"
//             />
//             <p className="text-xs text-slate-500">
//               This field is fixed based on your current selection.
//             </p>
//           </div>

//           {/* Difficulty */}
//           <div className="grid gap-2">
//             <Label>Difficulty</Label>
//             <Controller
//               name="difficulty"
//               control={control}
//               render={({ field }) => (
//                 <Select onValueChange={field.onChange} value={field.value}>
//                   <SelectTrigger
//                     className={errors.difficulty ? "border-red-500" : ""}
//                   >
//                     <SelectValue placeholder="Select Difficulty" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     <SelectItem value="basic">Basic</SelectItem>
//                     <SelectItem value="intermediate">Intermediate</SelectItem>
//                     <SelectItem value="hard">Hard</SelectItem>
//                   </SelectContent>
//                 </Select>
//               )}
//             />
//             {errors.difficulty && (
//               <p className="text-xs text-red-500">
//                 {errors.difficulty.message}
//               </p>
//             )}
//           </div>

//           {/* Question Type */}
//           <div className="grid gap-2">
//             <Label>Question Type</Label>
//             <Controller
//               name="questionType"
//               control={control}
//               render={({ field }) => (
//                 <Select onValueChange={field.onChange} value={field.value}>
//                   <SelectTrigger
//                     className={errors.questionType ? "border-red-500" : ""}
//                   >
//                     <SelectValue placeholder="Select Type" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     <SelectItem value="hybrid">Hybrid</SelectItem>
//                     <SelectItem value="ai_generated">AI Generated</SelectItem>
//                   </SelectContent>
//                 </Select>
//               )}
//             />
//             {errors.questionType && (
//               <p className="text-xs text-red-500">
//                 {errors.questionType.message}
//               </p>
//             )}
//           </div>

//           {/* Question Count & Duration */}
//           <div className="grid grid-cols-2 gap-4">
//             <div className="grid gap-2">
//               <Label>Question Count</Label>
//               <Input
//                 type="number"
//                 min={1}
//                 className={errors.questionCount ? "border-red-500" : ""}
//                 {...register("questionCount", { valueAsNumber: true })}
//                 onChange={(e) => {
//                   // Manual override to ensure 0 is replaced if empty string logic fails or defaults
//                   const val = parseInt(e.target.value);
//                   if (val < 0) setValue("questionCount", 0);
//                   else setValue("questionCount", val);
//                 }}
//               />
//               {errors.questionCount && (
//                 <p className="text-xs text-red-500">
//                   {errors.questionCount.message}
//                 </p>
//               )}
//             </div>
//             <div className="grid gap-2">
//               <Label>Duration (Minutes)</Label>
//               <Input
//                 type="number"
//                 min={1}
//                 className={errors.duration ? "border-red-500" : ""}
//                 {...register("duration", { valueAsNumber: true })}
//               />
//               {errors.duration && (
//                 <p className="text-xs text-red-500">
//                   {errors.duration.message}
//                 </p>
//               )}
//             </div>
//           </div>

//           <DialogFooter>
//             <Button
//               type="button"
//               variant="outline"
//               onClick={() => setOpen(false)}
//             >
//               Cancel
//             </Button>
//             <Button
//               type="submit"
//               className="bg-violet-700 text-white hover:bg-violet-800"
//             >
//               Generate Quiz
//             </Button>
//           </DialogFooter>
//         </form>
//       </DialogContent>
//     </Dialog>
//   );
// }

/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useGenerateMCQMutation } from "@/store/features/MCQBank/MCQBank.api";
import { toast } from "sonner";
import { Zap } from "lucide-react";

// =======================
// Zod Schema
// =======================
const quizSchema = z.object({
  difficulty: z.enum(["Basic", "Intermediate", "Advance"]),
  questionType: z.enum(["hybrid", "ai_generated"]),
  questionCount: z.coerce.number().min(1, "At least 1 question is required"),
  duration: z.coerce.number().min(1, "Duration must be at least 1 minute"),
});

type QuizFormValues = z.infer<typeof quizSchema>;

interface PracticeQuizModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  mcqBankId: string;
  mcqBankTitle: string;
  subject?: string;
  system?: string;
  topic?: string;
  subTopic?: string;
}

export function PracticeQuizModal({
  open,
  setOpen,
  mcqBankId,
  mcqBankTitle,
  subject,
  system,
  topic,
  subTopic,
}: PracticeQuizModalProps) {
  const navigate = useNavigate();
  const [generateMCQ, { isLoading: isGenerating }] = useGenerateMCQMutation();

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(quizSchema),
    defaultValues: {
      questionCount: 5,
      duration: 10,
      difficulty: "Basic",
      questionType: "hybrid",
    },
  });

  // Reset when modal opens
  useEffect(() => {
    if (open) {
      reset({
        questionCount: 5,
        duration: 10,
        difficulty: "Basic",
        questionType: "hybrid",
      });
    }
  }, [open, reset]);

  // =======================
  // API CALL INSIDE MODAL
  // =======================
  const onFormSubmit: SubmitHandler<QuizFormValues> = async (data) => {
    try {
      const payload = {
        quiz_name: mcqBankTitle || "Practice Quiz",
        subject: subject || "",
        system: system || "",
        topic: topic || "",
        sub_topic: subTopic || "",
        question_type: data.questionType,
        question_count: data.questionCount,
        difficulty_level: data.difficulty,
        mcq_bank_id: mcqBankId,
      };

      const res: any = await generateMCQ(payload).unwrap();
      const quizId = res?.data?._id || res?._id;

      if (quizId) {
        toast.success("Quiz generated successfully!");
        setOpen(false);
        navigate(`/dashboard/quiz/${quizId}`);
      } else {
        toast.error("Failed to extract Quiz ID from response");
      }
    } catch (error) {
      console.error("Quiz generation failed", error);
      toast.error("Failed to generate quiz. Please try again.");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Create Your Quiz</DialogTitle>
          <DialogDescription>
            Customize your practice quiz settings below.
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={handleSubmit(onFormSubmit as SubmitHandler<any>)}
          className="grid gap-6 py-4"
        >
          {/* Question Bank (Read-only) */}
          <div className="grid gap-2">
            <Label>Question Bank</Label>
            <Input
              value={mcqBankTitle}
              disabled
              className="bg-slate-100 opacity-100 text-slate-700"
            />
            <p className="text-xs text-slate-500">
              This field is fixed based on your current selection.
            </p>
          </div>

          {/* Difficulty */}
          <div className="grid gap-2">
            <Label>Difficulty</Label>
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
                  <SelectContent>
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

          {/* Question Type */}
          <div className="grid gap-2">
            <Label>Question Type</Label>
            <Controller
              name="questionType"
              control={control}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger
                    className={errors.questionType ? "border-red-500" : ""}
                  >
                    <SelectValue placeholder="Select Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hybrid">Hybrid</SelectItem>
                    <SelectItem value="ai_generated">AI Generated</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.questionType && (
              <p className="text-xs text-red-500">
                {errors.questionType.message}
              </p>
            )}
          </div>

          {/* Question Count & Duration */}
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label>Question Count</Label>
              <Input
                type="number"
                min={1}
                {...register("questionCount")}
                className={errors.questionCount ? "border-red-500" : ""}
              />
              {errors.questionCount && (
                <p className="text-xs text-red-500">
                  {errors.questionCount.message}
                </p>
              )}
            </div>

            <div className="grid gap-2">
              <Label>Duration (Minutes)</Label>
              <Input
                type="number"
                min={1}
                {...register("duration")}
                className={errors.duration ? "border-red-500" : ""}
              />
              {errors.duration && (
                <p className="text-xs text-red-500">
                  {errors.duration.message}
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
              disabled={isGenerating}
            >
              {isGenerating ? (
                <Zap className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Zap className="mr-2 h-4 w-4" />
              )}
              {isGenerating ? "Generating..." : "Generate Quiz"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

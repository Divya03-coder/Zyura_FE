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
import { useState } from "react";

export function FlashCardGeneratorDialog({
  open,
  setOpen,
  onFinalSubmit,
  isLoading,
}: any) {
  const [quizName, setQuizName] = useState("");
  // const [subject, setSubject] = useState("");
  // const [system, setSystem] = useState("");
  // const [topic, setTopic] = useState("");
  // const [subTopic, setSubTopic] = useState("");
  const [questionType, setQuestionType] = useState("hybrid");
  const [questionCount, setQuestionCount] = useState(5);
  const [difficultyLevel, setDifficultyLevel] = useState("Basic");

  const handleSubmit = () => {
    onFinalSubmit({
      quiz_name: quizName,
      // subject,
      // system,
      // topic,
      // sub_topic: subTopic,
      question_type: questionType,
      question_count: questionCount,
      difficulty_level: difficultyLevel,
    });

    setOpen(false);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(val) => {
        if (!isLoading) {
          setOpen(val);
        }
      }}
    >
      <DialogContent
        onInteractOutside={(e) => {
          if (isLoading) {
            e.preventDefault();
          }
        }}
        className={`sm:max-w-[450px] max-h-[80vh] overflow-y-auto ${
          isLoading ? "cursor-wait select-none pointer-events-none" : ""
        }`}
      >
        <DialogHeader>
          <DialogTitle>Customize Flashcard</DialogTitle>
          <DialogDescription>
            Fill in the details to generate your flashcards.
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 gap-6 py-4">
          {/* Flashcard Name */}
          <div className="grid gap-2">
            <Label>Flashcard Name</Label>
            <Input
              value={quizName}
              onChange={(e) => setQuizName(e.target.value)}
              placeholder="Sample Flashcard"
            />
          </div>

          {/* Subject */}
          {/* <div className="grid gap-2">
            <Label>Subject</Label>
            <Input
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="anatomy"
            />
          </div> */}

          {/* System */}
          {/* <div className="grid gap-2">
            <Label>System</Label>
            <Input
              value={system}
              onChange={(e) => setSystem(e.target.value)}
              placeholder="cardiovascular"
            />
          </div> */}

          {/* Topic */}
          {/* <div className="grid gap-2">
            <Label>Topic</Label>
            <Input
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="hypertension"
            />
          </div> */}

          {/* Sub-topic */}
          {/* <div className="grid gap-2">
            <Label>Sub Topic</Label>
            <Input
              value={subTopic}
              onChange={(e) => setSubTopic(e.target.value)}
              placeholder="risk factor"
            />
          </div> */}

          {/* Question Type */}
          <div className="grid gap-2">
            <Label>Flashcards Type</Label>
            <Select value={questionType} onValueChange={setQuestionType}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select question type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="hybrid">Hybrid</SelectItem>
                <SelectItem value="ai_generated">AI Generated</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Question Count */}
          <div className="grid gap-2">
            <Label>Flashcard Count (max 50)</Label>
            <Input
              type="number"
              min={1}
              max={50}
              value={questionCount}
              onChange={(e) => setQuestionCount(Number(e.target.value))}
            />
            <p className="text-xs text-gray-500">{questionCount} / 50</p>
          </div>

          {/* Difficulty Level */}
          <div className="grid gap-2">
            <Label>Difficulty Level</Label>
            <Select value={difficultyLevel} onValueChange={setDifficultyLevel}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Basic">Basic</SelectItem>
                <SelectItem value="Intermediate">Intermediate</SelectItem>
                <SelectItem value="Advance">Advance</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} className="bg-blue-main text-white">
            Done
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

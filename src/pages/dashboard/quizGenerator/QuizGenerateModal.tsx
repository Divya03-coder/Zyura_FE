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
import { useEffect, useState } from "react";
import {
  useGenerateMCQMutation,
  useGetMCQBankTreeQuery,
  useGetAllPublicMCQBankQuery,
  useGetAllExamForStudentQuery,
  useGetAllExamForProfessionalQuery,
} from "@/store/features/MCQBank/MCQBank.api";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Zap } from "lucide-react";
import { useSelector } from "react-redux";
import { selectUser } from "@/store/features/auth/auth.slice";


// Types for hierarchy
interface Topic {
  topicName: string;
  subTopics: string[];
}

interface System {
  name: string;
  topics: Topic[];
}

interface SubjectTree {
  _id: string;
  subjectName: string;
  systems: System[];
}

export function QuizGeneratorDialog({ open, setOpen }: any) {
  const navigate = useNavigate();
  const [generateMCQ, { isLoading: isGenerating }] = useGenerateMCQMutation();
  const { data: treeData } = useGetMCQBankTreeQuery({});
  const [quizName, setQuizName] = useState("");
  const [quizMode, setQuizMode] = useState("study");

  const { data: bankData } = useGetAllPublicMCQBankQuery({
    type: quizMode === "exam" ? "exam" : undefined,
  });

  const subjects: SubjectTree[] = treeData?.data || [];
  const allBanks = bankData?.data || [];
  const [examName, setExamName] = useState("");
  const [examSubject, setExamSubject] = useState("");

  const user = useSelector(selectUser);
  const isProfessional = user?.account?.role === "PROFESSIONAL";

  const { data: allExamResForStudent } = useGetAllExamForStudentQuery(
    { limit: 100 },
    { skip: isProfessional || quizMode !== "exam" }
  );
  const { data: allExamResForProfessional } = useGetAllExamForProfessionalQuery(
    { limit: 100 },
    { skip: !isProfessional || quizMode !== "exam" }
  );

  const allExams = isProfessional
    ? allExamResForProfessional?.data?.data || []
    : allExamResForStudent?.data?.data || [];

  const subjectsFromExams = Array.from(
    new Set(allExams.map((e: any) => (isProfessional ? e.professionName : e.subject)))
  ).filter(Boolean);

  const examListForSelectedSubject = allExams.filter((e: any) => {
    const subjectValue = isProfessional ? e.professionName : e.subject;
    return subjectValue === examSubject;
  });

  const [questionBank, setQuestionBank] = useState("");
  const [questionType, setQuestionType] = useState("hybrid");
  const [difficulty, setDifficulty] = useState("Intermediate");
  const [questionCount, setQuestionCount] = useState(5);
  const [duration, setDuration] = useState(10);


  const [subject, setSubject] = useState("");
  const [system, setSystem] = useState("");
  const [topic, setTopic] = useState("");
  const [subTopic, setSubTopic] = useState("");

  // Derived lists for cascading selects
  const selectedSubjectObj = subjects.find((s) => s.subjectName === subject);
  const systemList = selectedSubjectObj?.systems || [];
  const selectedSystemObj = systemList.find((sys) => sys.name === system);
  const topicList = selectedSystemObj?.topics || [];
  const selectedTopicObj = topicList.find((t) => t.topicName === topic);
  const subTopicList = selectedTopicObj?.subTopics || [];

  // Filtered Question Banks
  const filteredBanks = allBanks.filter((bank: any) => {
    if (system) return bank.system === system;
    if (subject) return bank.subject === subject;
    return true;
  });

  // Reset dependents on change
  useEffect(() => {
    if (quizMode === "study") {
      setSystem("");
      setTopic("");
      setSubTopic("");
      setQuestionBank("");
    }
  }, [subject, quizMode]);

  useEffect(() => {
    if (quizMode === "study") {
      setTopic("");
      setSubTopic("");
      const matchingBank = filteredBanks.find((b: any) => b.system === system);
      if (matchingBank) {
        setQuestionBank(matchingBank._id);
        clearError("questionBank");
      }
    }
  }, [system, quizMode]);

  useEffect(() => {
    if (quizMode === "study") {
      setSubTopic("");
    }
  }, [topic, quizMode]);

  // Sync question count and duration for Exam Mode
  useEffect(() => {
    if (quizMode === "exam" && examName) {
      const selectedExam = allExams.find((e: any) => e._id === examName);
      if (selectedExam) {
        setQuestionCount(selectedExam.totalQuestions || 0);
        setDuration(selectedExam.totalTime || 0);
      }
    } else if (quizMode === "exam") {
      setQuestionCount(0);
      setDuration(0);
    } else if (quizMode === "study") {
      setQuestionCount(5);
      setDuration(10);
    }
  }, [examName, quizMode, allExams]);


  const [errors, setErrors] = useState<string[]>([]);

  const clearError = (field: string) => {
    setErrors((prev) => prev.filter((item) => item !== field));
  };

  const handleSubmit = async () => {
    const newErrors: string[] = [];

    if (quizMode === "study" && !quizName) newErrors.push("quizName");

    if (quizMode === "study") {
      if (!subject) newErrors.push("subject");
      if (!questionBank) newErrors.push("questionBank");
    }

    if (quizMode === "exam") {
      if (!examSubject) newErrors.push("examSubject");
      if (!examName) newErrors.push("examName");
    }


    if (newErrors.length > 0) {
      setErrors(newErrors);
      toast.error("Please fill in all required fields");
      return;
    }

    if (quizMode === "exam") {
      setOpen(false);
      navigate(`/dashboard/quiz/${examName}?source=exam&limit=${questionCount}`);
      return;
    }

    const payload: any = {
      quiz_name: quizName,
      subject: subject,
      system: system,
      topic: topic,
      sub_topic: subTopic,
      question_type: questionType,
      question_count: questionCount,
      difficulty_level: difficulty,
      mcq_bank_id: questionBank || undefined,
    };


    try {
      const res = await generateMCQ(payload).unwrap();
      if (res.success) {
        // toast.success("Quiz generated successfully!");
        const quizId = res.data?._id || res.data?.id || res._id;
        setOpen(false);
        navigate(`/dashboard/quiz/${quizId}`);
      }
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to generate quiz");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto thin-scrollbar">
        <DialogHeader>
          <DialogTitle>Generate Quiz</DialogTitle>
          <DialogDescription>
            Make your quiz easily with Study or Exam mode.
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">

          {/* Quiz Mode */}
          <div className="grid gap-2">
            <Label>Quiz Mode</Label>
            <Select value={quizMode} onValueChange={setQuizMode}>
              <SelectTrigger>
                <SelectValue placeholder="Select Mode" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="study">Study Mode</SelectItem>
                <SelectItem value="exam">Exam Mode</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Quiz Name (Only for Study Mode) */}
          {quizMode === "study" && (
            <div className="grid gap-2">
              <Label
                className={errors.includes("quizName") ? "text-red-500" : ""}
              >
                Quiz Name
              </Label>
              <Input
                value={quizName}
                onChange={(e) => {
                  setQuizName(e.target.value);
                  clearError("quizName");
                }}
                placeholder="e.g., Cardiology Quiz"
                className={`transition-all duration-300 ${errors.includes("quizName")
                  ? "border-red-500 bg-red-50 focus-visible:ring-red-500"
                  : ""
                  }`}
              />

              {
                errors.includes("quizName") ? <p className="text-red-500 text-sm ml-2">Fill the quiz name</p> : ""
              }
            </div>
          )}


          {/* === EXAM MODE FIELDS === */}
          {quizMode === "exam" && (
            <>
              {/* Subject Select */}
              <div className="grid gap-2">
                <Label
                  className={errors.includes("examSubject") ? "text-red-500" : ""}
                >
                  Subject
                </Label>
                <Select
                  value={examSubject}
                  onValueChange={(val) => {
                    setExamSubject(val);
                    setExamName("");
                    clearError("examSubject");
                  }}
                >
                  <SelectTrigger
                    className={`transition-all duration-300 ${errors.includes("examSubject")
                      ? "border-red-500 bg-red-50 focus:ring-red-500"
                      : ""
                      }`}
                  >
                    <SelectValue placeholder="Select Subject" />
                  </SelectTrigger>
                  <SelectContent>
                    {subjectsFromExams.map((sub: any) => (
                      <SelectItem key={sub} value={sub}>
                        {sub}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.includes("examSubject") && (
                  <p className="text-red-500 text-sm ml-2">Select a subject</p>
                )}
              </div>

              {/* Exam Name Select */}
              <div className="grid gap-2">
                <Label
                  className={errors.includes("examName") ? "text-red-500" : ""}
                >
                  Exam Name
                </Label>
                <Select
                  value={examName}
                  onValueChange={(val) => {
                    setExamName(val);
                    clearError("examName");
                  }}
                  disabled={!examSubject}
                >
                  <SelectTrigger
                    className={`transition-all duration-300 ${errors.includes("examName")
                      ? "border-red-500 bg-red-50 focus:ring-red-500"
                      : ""
                      }`}
                  >
                    <SelectValue placeholder="Select Exam" />
                  </SelectTrigger>
                  <SelectContent>
                    {examListForSelectedSubject.length > 0 ? (
                      examListForSelectedSubject.map((exam: any) => (
                        <SelectItem key={exam._id} value={exam._id}>
                          {exam.examName}
                        </SelectItem>
                      ))
                    ) : (
                      <SelectItem value="none" disabled>
                        {examSubject ? "No Exams found" : "Select Subject first"}
                      </SelectItem>
                    )}
                  </SelectContent>
                </Select>
                {errors.includes("examName") && (
                  <p className="text-red-500 text-sm ml-2">Select an exam</p>
                )}
              </div>

              <div className="grid gap-2">
                <Label>Question Count</Label>
                <Input value={questionCount} readOnly />
              </div>

              <div className="grid gap-2">
                <Label>Duration (Minutes)</Label>
                <Input value={duration} readOnly />
              </div>
            </>
          )}


          {/* === STUDY MODE FIELDS === */}
          {quizMode === "study" && (
            <>
              {/* Subject */}
              <div className="grid gap-2">
                <Label
                  className={errors.includes("subject") ? "text-red-500" : ""}
                >
                  Subject
                </Label>
                <Select
                  value={subject}
                  onValueChange={(val) => {
                    setSubject(val);
                    clearError("subject");
                  }}
                >
                  <SelectTrigger
                    className={`transition-all duration-300 ${errors.includes("subject")
                      ? "border-red-500 bg-red-50 focus:ring-red-500"
                      : ""
                      }`}
                  >
                    <SelectValue placeholder="Select Subject" />
                  </SelectTrigger>
                  <SelectContent>
                    {subjects.map((sub) => (
                      <SelectItem key={sub._id} value={sub.subjectName}>
                        {sub.subjectName}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {
                  errors.includes("subject") ? <p className="text-red-500 text-sm ml-2">Select a subject</p> : ""
                }
              </div>

              {/* System */}
              <div className="grid gap-2">
                <Label>System</Label>
                <Select
                  value={system}
                  onValueChange={setSystem}
                  disabled={!subject}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select System" />
                  </SelectTrigger>
                  <SelectContent>
                    {systemList.map((sys) => (
                      <SelectItem key={sys.name} value={sys.name}>
                        {sys.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Topic */}
              <div className="grid gap-2">
                <Label>Topic</Label>
                <Select
                  value={topic}
                  onValueChange={setTopic}
                  disabled={!system}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Topic" />
                  </SelectTrigger>
                  <SelectContent>
                    {topicList.map((t) => (
                      <SelectItem key={t.topicName} value={t.topicName}>
                        {t.topicName}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Sub Topic */}
              <div className="grid gap-2">
                <Label>Sub Topic</Label>
                <Select
                  value={subTopic}
                  onValueChange={setSubTopic}
                  disabled={!topic}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Sub Topic" />
                  </SelectTrigger>
                  <SelectContent>
                    {subTopicList.map((st) => (
                      <SelectItem key={st} value={st}>
                        {st}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Question Bank */}
              <div className="grid gap-2">
                <Label
                  className={
                    errors.includes("questionBank") ? "text-red-500" : ""
                  }
                >
                  Question Bank
                </Label>
                <Select
                  value={questionBank}
                  onValueChange={(val) => {
                    setQuestionBank(val);
                    clearError("questionBank");
                  }}
                >
                  <SelectTrigger
                    className={`transition-all duration-300 ${errors.includes("questionBank")
                      ? "border-red-500 bg-red-50 focus:ring-red-500"
                      : ""
                      }`}
                  >
                    <SelectValue placeholder="Select Question Bank" />
                  </SelectTrigger>
                  <SelectContent>
                    {filteredBanks.length > 0 ? (
                      filteredBanks.map((bank: any) => (
                        <SelectItem key={bank._id} value={bank._id}>
                          {bank.title}
                        </SelectItem>
                      ))
                    ) : (
                      <SelectItem value="none" disabled>
                        No Question Banks found
                      </SelectItem>
                    )}
                  </SelectContent>
                </Select>

                {
                  errors.includes("questionBank") ? <p className="text-red-500 text-sm ml-2">Select a question bank</p> : ""
                }
              </div>

              {/* Question Type */}
              <div className="grid gap-2">
                <Label>Question Type</Label>
                <Select value={questionType} onValueChange={setQuestionType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hybrid">HYBRID</SelectItem>
                    <SelectItem value="ai_generated">AI Generated</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Difficulty */}
              <div className="grid gap-2">
                <Label>Difficulty Level</Label>
                <Select value={difficulty} onValueChange={setDifficulty}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Difficulty" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Basic">Basic</SelectItem>
                    <SelectItem value="Intermediate">Intermediate</SelectItem>
                    <SelectItem value="Advance">Advance</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Question Count */}
              <div className="grid gap-2">
                <Label>Question Count (up to 50)</Label>
                <Input
                  type="number"
                  min={1}
                  max={50}
                  defaultValue={2}
                  value={questionCount}
                  onChange={(e) => setQuestionCount(Number(e.target.value))}
                />
              </div>

              {/* Duration */}
              <div className="grid gap-2">
                <Label>Duration (Minutes)</Label>
                <Input
                  type="number"
                  min={1}
                  value={duration}
                  onChange={(e) => setDuration(Number(e.target.value))}
                />
              </div>
            </>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={isGenerating}
            className="bg-violet-700 text-white hover:bg-violet-800"
          >
            {isGenerating ? (
              <Zap className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Zap className="mr-2 h-4 w-4" />
            )}
            {isGenerating ? "Generating..." : "Generate Quiz"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

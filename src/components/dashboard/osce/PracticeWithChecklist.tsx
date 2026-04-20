/* eslint-disable @typescript-eslint/no-explicit-any */
import { useGetSingleOsceQuery } from "@/store/features/adminDashboard/ContentResources/Osce/osceApi";
import { useUpdateProgressOsceMutation } from "@/store/features/goal/goal.api";
import { ArrowLeft, ArrowRight, Play } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { JSX } from "react";
// import { BsQuestionLg } from "react-icons/bs";
// import { FaBoxArchive } from "react-icons/fa6";
import { Link, useNavigate, useParams, useLocation } from "react-router-dom";
import { useSaveStudyPlanProgressMutation } from "@/store/features/studyPlan/studyPlan.api";
// import { toast } from "sonner";

/**
 * Types
 */
type Level = "Novice" | "Confident" | "Expert" | null;

interface PatientScriptSection {
  topic: string;
  points: string[];
}

interface TutorialItem {
  url: string;
  title: string;
  duration: string;
}

interface PageData {
  title: string;
  description: string;
  candidateInstructions: string[];
  patientScript: PatientScriptSection[];
  checklist: Record<string, string[]>;
  selfAssessment: string[];
  timeLimit: string;
  tutorials: TutorialItem[];
}

// Helper: Convert HTML to plain text
const htmlToText = (html: string): string => {
  const temp = document.createElement("div");
  temp.innerHTML = html;
  return temp.textContent || temp.innerText || "";
};

// Helper: Parse HTML list items to array
const parseHtmlToList = (html: string): string[] => {
  const temp = document.createElement("div");
  temp.innerHTML = html;
  const items: string[] = [];
  const listItems = temp.querySelectorAll("li, p");
  listItems.forEach((item) => {
    const text = item.textContent?.trim();
    if (text) items.push(text);
  });
  return items.length > 0 ? items : [htmlToText(html)];
};

// Helper: Parse time limit string to seconds
const parseTimeLimit = (timeLimit: string): number => {
  const match = timeLimit.match(/(\d+)/);
  if (!match) return 600;
  const minutes = parseInt(match[1]);
  return minutes * 60;
};

// Helper: Extract YouTube video ID
const getYouTubeVideoId = (url: string): string | null => {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
    /^([a-zA-Z0-9_-]{11})$/,
  ];
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }
  return null;
};

// Helper: Fetch YouTube duration (placeholder)
const fetchYouTubeDuration = async (videoId: string): Promise<string> => {
  console.log(videoId);
  return "0:00"; // Placeholder – use YouTube Data API in production
};

// Transform API data
const transformApiData = async (apiData: any): Promise<PageData> => {
  const data = apiData.data;

  const checklist: Record<string, string[]> = {};
  data.tasks?.forEach((task: any) => {
    checklist[task.taskName] = task.checklistItem || [];
  });

  const tutorials: TutorialItem[] = [];
  if (data.tutorial && Array.isArray(data.tutorial)) {
    for (let i = 0; i < data.tutorial.length; i++) {
      const url = data.tutorial[i];
      if (typeof url === "string" && url.trim()) {
        const videoId = getYouTubeVideoId(url);
        const duration = videoId ? await fetchYouTubeDuration(videoId) : "0:00";
        tutorials.push({
          url,
          title: `Tutorial ${i + 1}`,
          duration,
        });
      }
    }
  }

  return {
    title: data.name || "OSCE Practice",
    description: data.description || "",
    candidateInstructions: parseHtmlToList(data.candidateInstruction || ""),
    patientScript: data.patientInstruction
      ? [
          {
            topic: "Patient Instructions",
            points: parseHtmlToList(data.patientInstruction),
          },
        ]
      : [],
    checklist,
    selfAssessment: ["Inspection", "Palpation", "Percussion", "Auscultation"],
    timeLimit: data.timeLimit || "10 minutes",
    tutorials,
  };
};

/* Checklist state */
interface ChecklistItem {
  label: string;
  checked: boolean;
}
type ChecklistState = Record<string, ChecklistItem[]>;

export default function PracticeWithChecklist(): JSX.Element {
  const { id: osceId } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();

  const {
    data: apiResponse,
    isLoading: apiLoading,
    isError,
    error,
  } = useGetSingleOsceQuery(osceId!, {
    skip: !osceId,
  });

  // Local state
  const [pageData, setPageData] = useState<PageData | null>(null);
  const [isTransforming, setIsTransforming] = useState(false);

  // Timer
  const initialTimeRef = useRef<number>(600);
  const [time, setTime] = useState<number>(600);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const timerRef = useRef<number | null>(null);

  // Checklist & Self-assessment
  const [checklist, setChecklist] = useState<ChecklistState>({});
  const [selfAssessment, setSelfAssessment] = useState<Record<string, Level>>(
    {}
  );
  const [notes, setNotes] = useState<string>("");
  const [checkedCount, setCheckedCount] = useState<number>(0);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitResult, setSubmitResult] = useState<string | null>(null);

  // Transform data when API responds
  useEffect(() => {
    if (!apiResponse || isError) {
      if (isError) console.error("API Error:", error);
      return;
    }

    const load = async () => {
      setIsTransforming(true);
      try {
        const transformed = await transformApiData(apiResponse);
        setPageData(transformed);

        const seconds = parseTimeLimit(transformed.timeLimit);
        initialTimeRef.current = seconds;
        setTime(seconds);

        // Initialize checklist
        const initialChecklist: ChecklistState = {};
        Object.keys(transformed.checklist).forEach((topic) => {
          initialChecklist[topic] = transformed.checklist[topic].map(
            (label) => ({
              label,
              checked: false,
            })
          );
        });
        setChecklist(initialChecklist);

        // Initialize self-assessment
        const initialSA: Record<string, Level> = {};
        transformed.selfAssessment.forEach((skill) => {
          initialSA[skill] = null;
        });
        setSelfAssessment(initialSA);
      } catch (err) {
        console.error("Failed to transform data:", err);
      } finally {
        setIsTransforming(false);
      }
    };

    load();
  }, [apiResponse, isError, error]);

  // Timer logic
  useEffect(() => {
    if (isRunning) {
      timerRef.current = window.setInterval(() => {
        setTime((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
    } else {
      if (timerRef.current !== null) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }
    return () => {
      if (timerRef.current !== null) clearInterval(timerRef.current);
    };
  }, [isRunning]);

  // Update checked count
  useEffect(() => {
    const total = Object.values(checklist)
      .flat()
      .filter((i) => i.checked).length;
    setCheckedCount(total);
  }, [checklist]);

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  const handleCheckboxChange = (topic: string, index: number) => {
    setChecklist((prev) => ({
      ...prev,
      [topic]: prev[topic].map((item, i) =>
        i === index ? { ...item, checked: !item.checked } : item
      ),
    }));
  };

  const handleSelfAssessment = (skill: string, level: Exclude<Level, null>) => {
    setSelfAssessment((prev) => ({
      ...prev,
      [skill]: prev[skill] === level ? null : level,
    }));
  };

  // Mutation for progress update
  const [updateProgressOsce] = useUpdateProgressOsceMutation();
  const [saveStudyPlanProgress] = useSaveStudyPlanProgressMutation();

  const handleComplete = async () => {
    if (!pageData) return;
    setIsRunning(false);

    const payload = {
      title: pageData.title,
      description: pageData.description,
      timeStartedSeconds: initialTimeRef.current,
      timeRemainingSeconds: time,
      timeTakenSeconds: initialTimeRef.current - time,
      completedAt: new Date().toISOString(),
      checklist: Object.keys(checklist).reduce((acc, topic) => {
        acc[topic] = checklist[topic];
        return acc;
      }, {} as any),
      selfAssessment,
      notes,
      totalChecked: checkedCount,
    };

    try {
      setIsSubmitting(true);

      // Update Goal Progress
      if (osceId) {
        await updateProgressOsce({ osceId }).unwrap();
      }

      // Check if we came from WeeklyPlan or Home and update study plan progress
      if (
        (location.state?.from === "weekly-plan" ||
          location.state?.from === "home") &&
        location.state?.planId
      ) {
        try {
          await saveStudyPlanProgress({
            planId: location.state.planId,
            day: location.state.day,
            suggest_content: location.state.suggest_content,
          }).unwrap();
          // toast.success("Study plan progress saved!");
        } catch (error) {
          console.error("Failed to save study plan progress:", error);
        }
      }

      const res = await fetch("/api/complete-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error(await res.text());
      setSubmitResult("Session submitted successfully!");
      if (
        location.state?.from === "weekly-plan" ||
        location.state?.from === "home"
      ) {
        navigate(-1);
      } else {
        navigate("/dashboard/check-list-result");
      }
    } catch (err: any) {
      setSubmitResult(err.message || "Submission failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePracticeAgain = () => {
    if (!pageData) return;
    setTime(initialTimeRef.current);
    setIsRunning(false);
    setNotes("");
    setSubmitResult(null);

    const newChecklist: ChecklistState = {};
    Object.keys(pageData.checklist).forEach((topic) => {
      newChecklist[topic] = pageData.checklist[topic].map((label) => ({
        label,
        checked: false,
      }));
    });
    setChecklist(newChecklist);

    const newSA: Record<string, Level> = {};
    pageData.selfAssessment.forEach((s) => (newSA[s] = null));
    setSelfAssessment(newSA);
  };

  // Loading state
  if (apiLoading || isTransforming || !pageData) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading OSCE data...</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-100">
        <p className="text-red-600">Failed to load OSCE. Please try again.</p>
      </div>
    );
  }

  // Main Render
  return (
    <div className="flex h-screen bg-gray-100">
      <style>{`
        .left-panel { -ms-overflow-style: none; scrollbar-width: none; }
        .left-panel::-webkit-scrollbar { display: none; }
      `}</style>

      {/* Left Panel */}
      <div className="w-2/3 p-6 space-y-6 overflow-y-auto left-panel">
        <div
            onClick={() => {
                if (
                  location.state?.from === "weekly-plan" ||
                  location.state?.from === "home"
                ) {
                  navigate(-1);
                } else {
                  navigate("/dashboard/osce");
                }
            }} 
            className="sm:mb-0 inline-block w-auto"
        >
          <button className="flex items-center gap-1 border border-gray-300 px-3 py-2 rounded mb-2 cursor-pointer">
            <ArrowLeft className="w-5 h-4" /> Back
          </button>
        </div>

        {/* Title & Description */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-bold">{pageData.title}</h2>
          <p className="text-gray-600">{pageData.description}</p>
        </div>

        {/* Candidate Instructions */}
        <div>
          <h3 className="font-medium text-lg mb-2">Candidate Instructions</h3>
          <div className="bg-white px-4 py-7 rounded-lg shadow">
            <ul className="list-disc pl-5 space-y-2">
              {pageData.candidateInstructions.map((inst, idx) => (
                <li key={idx} className="text-sm text-[#111827]">
                  {inst}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Patient Script */}
        {pageData.patientScript.length > 0 && (
          <div>
            <h3 className="font-medium text-lg mb-2">Patient Script</h3>
            <div className="bg-white px-4 py-7 rounded-lg shadow space-y-7">
              {pageData.patientScript.map((section, idx) => (
                <div key={idx}>
                  <p className="bg-amber-600 px-2 py-1 text-white inline">
                    {section.topic}
                  </p>
                  <ul className="list-disc pl-5 space-y-2 my-5">
                    {section.points.map((pt, i) => (
                      <li key={i} className="text-[#111827]">
                        {pt}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Examiner Checklist */}
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Examiner Checklist</h3>
            <p>
              <span className="text-[#16A34A] font-semibold">
                {checkedCount}
              </span>{" "}
              / {Object.values(checklist).flat().length} completed
            </p>
          </div>

          {Object.keys(checklist).map((topic) => {
            const items = checklist[topic];
            const done = items.filter((i) => i.checked).length;
            return (
              <div key={topic} className="mb-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium mb-2 text-gray-800">{topic}</h4>
                  <small className="text-sm text-gray-500">
                    {done}/{items.length}
                  </small>
                </div>
                <ul className="space-y-2 border border-slate-300 p-3 rounded-lg">
                  {items.map((item, idx) => (
                    <li key={idx} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={item.checked}
                        onChange={() => handleCheckboxChange(topic, idx)}
                        className="mr-2 cursor-pointer"
                      />
                      <span
                        onClick={() => handleCheckboxChange(topic, idx)}
                        className={`cursor-pointer ${
                          item.checked ? "line-through text-gray-500" : ""
                        }`}
                      >
                        {item.label}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        {/* Self-Assessment */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="font-semibold mb-3">Self-Assessment Rating</h3>
          <div className="space-y-4">
            {pageData.selfAssessment.map((skill) => (
              <div key={skill}>
                <p className="mb-2 font-medium">{skill}</p>
                <div className="flex gap-3">
                  {(["Novice", "Confident", "Expert"] as const).map((level) => (
                    <button
                      key={level}
                      type="button"
                      onClick={() => handleSelfAssessment(skill, level)}
                      className={`px-4 py-2 rounded border transition-colors ${
                        selfAssessment[skill] === level
                          ? "bg-blue-500 text-white border-blue-500"
                          : "bg-gray-100 text-gray-700 border-gray-300"
                      }`}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Notes */}
        {/* <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="font-semibold mb-2">Notes</h3>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full p-2 border rounded"
            rows={4}
            placeholder="Add any notes or observations here..."
          />
        </div> */}

        {/* Buttons */}
        <div className="flex justify-end gap-4">
          <button
            onClick={handlePracticeAgain}
            className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
          >
            Practice Again
          </button>
          <button
            onClick={handleComplete}
            disabled={isSubmitting}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-60"
          >
            {isSubmitting ? "Submitting..." : "Complete Session"}
          </button>
        </div>

        {submitResult && (
          <div className="text-sm text-center mt-2 p-2 bg-blue-50 text-blue-700 rounded">
            {submitResult}
          </div>
        )}
      </div>

      {/* Right Panel */}
      <div className="w-1/3 p-6 bg-gray-50 space-y-6">
        {/* Timer */}
        <div className="bg-white p-4 rounded-lg shadow text-center">
          <h3 className="font-semibold mb-2">Timer</h3>
          <p className="text-4xl font-mono mb-3">{formatTime(time)}</p>
          <div className="space-x-2">
            <button
              onClick={() => setIsRunning((s) => !s)}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              {isRunning ? "Pause" : "Start"}
            </button>
            <button
              onClick={() => setTime((t) => t + 60)}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              +1 min
            </button>
            <button
              onClick={() => setTime((t) => Math.max(0, t - 60))}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              -1 min
            </button>
          </div>
        </div>

        {/* Tutorials */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="font-semibold mb-3">Video & Audio Tutorial</h3>
          {/* {pageData.tutorials.length > 0 ? (
            <div className="space-y-3">
              {pageData.tutorials.map((t, i) => (
                <a
                  key={i}
                  href={t.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50"
                >
                  <div className="bg-blue-500 p-3 rounded-lg">
                    <Play className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1 text-left">
                    <p className="font-medium text-sm text-gray-800">{t.title}</p>
                    <p className="text-xs text-gray-500">{t.duration}</p>
                  </div>
                </a>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-500 text-center py-4">No tutorials available</p>
          )} */}
          {pageData.tutorials.length > 0 ? (
            <div className="space-y-3">
              {pageData.tutorials.map((tutorial, index) => (
                <Link
                  key={index}
                  to="/dashboard/osce-tutorial"
                  state={{
                    osceId: osceId, // এইটা তোমার কম্পোনেন্টে আছে
                    selectedTutorialIndex: index, // কোন টিউটোরিয়াল ক্লিক হয়েছে
                  }}
                  className="flex items-center gap-4 p-4 bg-white rounded-lg shadow hover:shadow-md transition-all border border-gray-200 hover:border-blue-300 block"
                >
                  <div className="bg-blue-600 p-3 rounded-full flex-shrink-0">
                    <Play className="w-5 h-5 text-white" />
                  </div>

                  <div className="flex-1">
                    <p className="font-semibold text-gray-800 text-sm">
                      {tutorial.title}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      Duration:{" "}
                      {tutorial.duration === "0:00"
                        ? "Loading..."
                        : tutorial.duration}
                    </p>
                  </div>

                  <div className="text-blue-600">
                    <ArrowRight className="w-5 h-5" />
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500 bg-white rounded-lg shadow">
              <Play className="w-12 h-12 mx-auto mb-3 text-gray-300" />
              <p className="text-sm">No tutorials available for this OSCE</p>
            </div>
          )}
        </div>

        {/* Selected Self-Assessment Summary */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="font-semibold mb-3">Selected Self-Assessment</h3>
          <ul className="space-y-2">
            {pageData.selfAssessment.map((skill) => (
              <li
                key={skill}
                className="flex justify-between items-center py-1"
              >
                <span className="text-sm">{skill}</span>
                <span
                  className={`text-sm font-medium ${
                    selfAssessment[skill] ? "text-blue-600" : "text-gray-400"
                  }`}
                >
                  {selfAssessment[skill] ?? "Not selected"}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Related Resources */}
        {/* <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="font-semibold mb-4">Related Resources</h3>
          <div className="border border-[#FED7AA] bg-[#FFF7ED] p-3 rounded-[8px] mb-3 cursor-pointer hover:bg-[#FFEDD5]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-[#FFEDD5] py-3 px-2 rounded inline-flex items-center justify-center">
                  <div className="bg-[#EA580C] p-2 rounded-full">
                    <BsQuestionLg className="w-5 h-5 text-white" />
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-[#7C2D12]">CVS MCQs</p>
                  <p className="text-xs text-[#C2410C]">
                    5 questions on cardiac murmurs
                  </p>
                </div>
              </div>
              <ArrowRight className="text-[#EA580C]" />
            </div>
          </div>

          <div className="border border-[#99F6E4] bg-[#F0FDFA] p-3 rounded-[8px] cursor-pointer hover:bg-[#CCFBF1]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-[#CCFBF1] py-3 px-2 rounded inline-flex items-center justify-center">
                  <div className="bg-[#CCFBF1] p-2 rounded-full">
                    <FaBoxArchive className="w-5 h-5 text-[#0D9488]" />
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-[#134E4A]">
                    Study Planner
                  </p>
                  <p className="text-xs text-[#0F766E]">
                    Schedule auscultation practice
                  </p>
                </div>
              </div>
              <ArrowRight className="text-[#0D9488]" />
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
}

/* eslint-disable @typescript-eslint/no-explicit-any */
import Breadcrumb from "@/components/reusable/CommonBreadcrumb";
import { BreadcrumbItem } from "../gamified-learning/types";
import { useGetSingleOsceQuery } from "@/store/features/adminDashboard/ContentResources/Osce/osceApi";
import { Play, Target, ArrowLeft } from "lucide-react";
import PrimaryButton from "@/components/reusable/PrimaryButton";
import { Link, useLocation, useNavigate } from "react-router-dom";

// Proper types from your actual API
interface OsceData {
  _id: string;
  name: string;
  description?: string;
  candidateInstruction?: string;
  patientInstruction?: string;
  tutorial?: string[];
  timeLimit?: string;
  tasks?: Array<{ taskName: string; checklistItem: string[] }>;
  // Add other fields as needed
}

interface OsceApiResponse {
  success: boolean;
  message: string;
  data: OsceData;
  meta?: any;
}

const breadcrumbs: BreadcrumbItem[] = [
  { name: "Dashboard", link: "/dashboard" },
  { name: "OSCE Station", link: "/dashboard/osce" },
  { name: "Tutorial", link: "" },
];

interface TutorialLocationState {
  osceId: string;
  selectedTutorialIndex?: number;
}

export default function OSCETutorial() {
  // const [sessionNotes, setSessionNotes] = useState<string>("");
  const { state } = useLocation() as { state: TutorialLocationState | null };
  const navigate = useNavigate();

  const osceId = state?.osceId;
  const selectedIndex = state?.selectedTutorialIndex ?? 0;

  // Use the hook directly and rely on the returned result object
  const osceQuery = useGetSingleOsceQuery(osceId!, {
    skip: !osceId,
  });

  const { data: rawData, isLoading, isError, error } = osceQuery;

  // If your backend returns { data: OsceData } or OsceData directly, handle both:
  const apiResponse = rawData as OsceApiResponse | OsceData | undefined;
  const osce: OsceData | undefined =
    apiResponse && "data" in apiResponse
      ? apiResponse.data
      : (apiResponse as OsceData | undefined);

  // Loading
  if (isLoading || !osceId) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading tutorial...</p>
        </div>
      </div>
    );
  }

  // Error
  if (isError || !osce) {
    console.error("OSCE Load Error:", error);
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50">
        <div className="text-center">
          <p className="text-red-600 text-lg">Failed to load tutorial.</p>
          <button
            onClick={() => navigate(-1)}
            className="mt-4 text-blue-600 hover:underline"
          >
            ← Go Back
          </button>
        </div>
      </div>
    );
  }

  const tutorials: string[] = osce.tutorial || [];
  const mainTutorialUrl = tutorials[selectedIndex] || tutorials[0] || "";
  const mainTitle = osce.name ? `Tutorial: ${osce.name}` : "OSCE Tutorial";

  const getEmbedUrl = (url: string): string => {
    const match = url.match(
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/
    );
    return match ? `https://www.youtube.com/embed/${match[1]}` : url;
  };

  const handleBack = () => navigate(-1);

  return (
    <div className="my-6 mx-auto px-4">
      <div className=" gap-4 mb-6">
        <div className="flex-1">
          <Breadcrumb breadcrumbs={breadcrumbs} />
        </div>

        <button
          onClick={handleBack}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium cursor-pointer"
        >
          <ArrowLeft className="w-5 h-5" />
          Back
        </button>
      </div>

      <div className="bg-white p-6 rounded-lg shadow mb-6">
        <h2 className="text-2xl font-bold text-slate-800">{mainTitle}</h2>
        <p className="text-gray-600 mt-1">
          Watch the complete examination tutorial step by step.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* Main Video */}
        <div className="lg:col-span-3">
          {mainTutorialUrl ? (
            <iframe
              src={getEmbedUrl(mainTutorialUrl)}
              title="Tutorial Video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
              className="w-full aspect-video rounded-lg shadow-lg"
            />
          ) : (
            <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full aspect-video flex items-center justify-center">
              <p className="text-gray-500">No video available</p>
            </div>
          )}

          {/* <div className="mt-8">
            <p className="text-sm font-semibold text-gray-700 mb-3">
              Session Notes
            </p>
            <textarea
              value={sessionNotes}
              onChange={(e) => setSessionNotes(e.target.value)}
              className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 resize-none"
              rows={6}
              placeholder="Write your notes here..."
            />
          </div> */}
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-2 space-y-8">
          {/* Instructions */}
          <div>
            <h3 className="font-semibold text-lg mb-3 text-gray-800">
              Candidate Instructions
            </h3>
            <div className="bg-white p-5 rounded-lg shadow">
              {osce.candidateInstruction ? (
                <div
                  dangerouslySetInnerHTML={{
                    __html: osce.candidateInstruction,
                  }}
                  className="prose prose-sm text-gray-700"
                />
              ) : (
                <p className="text-gray-500 italic">No instructions provided</p>
              )}
            </div>
          </div>

          {/* Quick Access */}
          <div>
            <h3 className="font-semibold text-lg mb-3 text-gray-800">
              Quick Access
            </h3>
            <Link to={`/dashboard/practice-with-checklist/${osceId}`}>
              <PrimaryButton
                icon={<Target className="w-5 h-5" />}
                iconPosition="left"
                className="w-full py-4 bg-blue-700 hover:bg-blue-800"
              >
                Practice with Checklist
              </PrimaryButton>
            </Link>
          </div>

          {/* Suggested Tutorials */}
          <div>
            <h3 className="font-semibold text-lg mb-4 text-gray-800">
              Suggested Video Tutorials
            </h3>
            <div className="bg-white rounded-lg shadow">
              {tutorials.length > 1 ? (
                tutorials.map((url, idx) => {
                  console.log(url);
                  if (idx === selectedIndex) return null;
                  return (
                    <Link
                      key={idx}
                      to="/dashboard/osce-tutorial"
                      state={
                        {
                          osceId,
                          selectedTutorialIndex: idx,
                        } as TutorialLocationState
                      }
                      className="flex items-center gap-4 p-4 hover:bg-gray-50 border-b last:border-b-0"
                    >
                      <div className="bg-blue-600 p-3 rounded-lg">
                        <Play className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">
                          Tutorial {idx + 1}
                        </p>
                        <p className="text-sm text-gray-500">Click to watch</p>
                      </div>
                    </Link>
                  );
                })
              ) : (
                <p className="text-center py-8 text-gray-500 text-sm">
                  No additional tutorials
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

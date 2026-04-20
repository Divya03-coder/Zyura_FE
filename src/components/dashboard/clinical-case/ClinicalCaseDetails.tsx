import React, { useRef, useState } from "react";
import {
  ArrowLeft,
  ChevronDown,
  ChevronUp,
  History,
  Heart,
  Microscope,
  Scan,
  Printer,
} from "lucide-react";
import PrimaryButton from "@/components/reusable/PrimaryButton";
import {
  Link,
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import {
  useGetSingleClinicalCaseQuery,
  useGetSingleGeneratedClinicalCaseQuery,
} from "@/store/features/clinicalCase/clinicalCase.api";
// import { useSaveStudyPlanProgressMutation } from "@/store/features/studyPlan/studyPlan.api";
import GlobalLoader from "@/common/GlobalLoader";
import { ClinicalCaseData } from "@/types/clinicalCase";
// import { ClinicalCaseData } from "@/types/clinicalCase.types";

interface CaseDetailProps {
  onBack?: () => void;
}

const ClinicalCaseDetails: React.FC<CaseDetailProps> = ({ onBack }) => {
  const [expandedSections, setExpandedSections] = useState<
    Record<string, boolean>
  >({
    presentation: true,
    history: true,
    physical: true,
    investigations: true,
    imaging: true,
  });

  const [activeTab, setActiveTab] = useState("history");

  // ... (refs remain same, omitting for brevity in diff but will be preserved)
  const presentationRef = useRef<HTMLDivElement>(
    null
  ) as React.RefObject<HTMLDivElement>;
  const historyRef = useRef<HTMLDivElement>(
    null
  ) as React.RefObject<HTMLDivElement>;
  const vitalsRef = useRef<HTMLDivElement>(
    null
  ) as React.RefObject<HTMLDivElement>;
  const labsRef = useRef<HTMLDivElement>(
    null
  ) as React.RefObject<HTMLDivElement>;
  const imagingRef = useRef<HTMLDivElement>(
    null
  ) as React.RefObject<HTMLDivElement>;

  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const navigate = useNavigate();
  const caseType = searchParams.get("type"); // "generated" or null/undefined

  const isGenerated = caseType === "generated";
  const stateClinicalCaseData = location.state?.clinicalCaseData;

  // Standard Query
  const {
    data: standardData,
    isLoading: isLoadingStandard,
    error: errorStandard,
  } = useGetSingleClinicalCaseQuery(id as string, {
    skip: isGenerated || !!stateClinicalCaseData,
  });

  // Generated Query
  const {
    data: generatedData,
    isLoading: isLoadingGenerated,
    error: errorGenerated,
  } = useGetSingleGeneratedClinicalCaseQuery(id as string, {
    skip: !isGenerated || !!stateClinicalCaseData,
  });

  const isLoading =
    !stateClinicalCaseData &&
    (isGenerated ? isLoadingGenerated : isLoadingStandard);
  const error = isGenerated ? errorGenerated : errorStandard;

  // Combine data source
  const clinicalCase = (stateClinicalCaseData ||
    (isGenerated ? generatedData?.data : standardData?.data)) as ClinicalCaseData;

  const scrollToSection = (
    ref: React.RefObject<HTMLDivElement>,
    tabName: string
  ) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth", block: "start" });
      setActiveTab(tabName);
    }
  };

  const toggleSection = (section: string): void => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const handleMakeDecision = (): void => {
    console.log("Make Your Decision clicked");
    navigate(
      `/dashboard/clinical-case/${id}/make-decision${isGenerated ? "?type=generated" : ""
      }`,
      { state: location.state }
    );
  };

  const handleQuickAction = (action: string): void => {
    if (action === "print") {
      handlePrint();
    } else {
      console.log(`Quick action: ${action}`);
    }
  };

  const handlePrint = () => {
    // Expand all sections for printing
    setExpandedSections({
      presentation: true,
      history: true,
      physical: true,
      investigations: true,
      imaging: true,
    });

    // Give React a moment to render before printing
    setTimeout(() => {
      window.print();
    }, 100);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty?.toLowerCase()) {
      case "basic":
      case "beginner":
        return "bg-green-100 text-green-800";
      case "intermediate":
        return "bg-orange-100 text-orange-800";
      case "advanced":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getSpecialtyColor = (specialty: string) => {
    const colors: Record<string, string> = {
      cardiology: "bg-red-100 text-red-800",
      gastroenterology: "bg-blue-100 text-blue-800",
      gastrointestinal: "bg-blue-100 text-blue-800",
      emergency: "bg-orange-100 text-orange-800",
      surgery: "bg-purple-100 text-purple-800",
      "internal medicine": "bg-green-100 text-green-800",
    };
    return colors[specialty?.toLowerCase()] || "bg-blue-100 text-blue-800";
  };

  // Helper function to parse vital sign values and units
  // const parseVitalSign = (vitalString: string) => {
  //   const match = vitalString?.match(/([\d./]+)\s*(.*)/);
  //   if (match) {
  //     return {
  //       value: match[1],
  //       unit: match[2],
  //       isAbnormal: false,
  //     };
  //   }
  //   return {
  //     value: vitalString || "",
  //     unit: "",
  //     isAbnormal: false,
  //   };
  // };

  const SectionHeader: React.FC<{
    title: string;
    icon: React.ReactNode;
    isExpanded: boolean;
    onToggle: () => void;
  }> = ({ title, icon, isExpanded, onToggle }) => (
    <button
      onClick={onToggle}
      className="flex items-center justify-between w-full p-4 bg-gray-100 rounded-t-lg mb-4"
    >
      <div className="flex items-center gap-3">
        <div className="text-blue-main">{icon}</div>
        <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
      </div>
      {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
    </button>
  );

  // const VitalSignCard: React.FC<{
  //   label: string;
  //   value: string;
  //   unit: string;
  //   isAbnormal?: boolean;
  // }> = ({ label, value, unit, isAbnormal }) => (
  //   <div
  //     className={`p-3 rounded-lg ${
  //       isAbnormal ? "bg-red-50 border border-red-200" : "bg-gray-50"
  //     }`}
  //   >
  //     <span className="text-sm font-medium text-gray-500">{label}:</span>
  //     <p
  //       className={`font-semibold ${
  //         isAbnormal ? "text-red-600" : "text-gray-900"
  //       }`}
  //     >
  //       {value} {unit}
  //     </p>
  //   </div>
  // );

  const LabResultCard: React.FC<{
    test: string;
    value: string;
    unit?: string;
    isAbnormal?: boolean;
    referenceRange?: string;
  }> = ({ test, value, unit, isAbnormal, referenceRange }) => (
    <div
      className={`flex justify-between items-center p-3 rounded ${isAbnormal ? "bg-red-50 border border-red-200" : "bg-gray-50"
        }`}
    >
      <div>
        <span className="font-medium text-gray-700">{test}:</span>
        {referenceRange && (
          <span className="text-xs text-gray-500 block">
            ({referenceRange})
          </span>
        )}
      </div>
      <span
        className={`font-semibold ${isAbnormal ? "text-red-600" : "text-gray-900"
          }`}
      >
        {value} {unit || ""}
      </span>
    </div>
  );

  if (isLoading) {
    return <GlobalLoader />;
  }

  if (error || !clinicalCase) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        {/* <CircleAlert className="w-16 h-16 text-red-500" /> */}
        <h2 className="text-xl font-semibold text-slate-700">
          No Clinical Case Found
        </h2>
        <p className="text-slate-500">
          The clinical case you are looking for does not exist or has been removed.
        </p>
        <Link to="/dashboard/clinical-case-generator">
          <PrimaryButton className="bg-blue-main hover:bg-blue-main/90">
            Back to Cases
          </PrimaryButton>
        </Link>
      </div>
    );
  }

  return (
    <>
      {/* Print-specific styles */}
      <style>{`
        @media print {
          /* General page setup */
          @page {
            margin: 2cm;
            size: auto;
          }

          /* Hide global layout elements that might interfere */
          /* Note: We rely on specific hiding of non-print elements */
          
          /* Force container to be full width */
          .min-h-screen {
            min-height: auto !important;
            height: auto !important;
          }
          
          /* Reset grid layout for print */
          .grid, .md\\:grid-cols-3 {
            display: block !important;
            grid-template-columns: 1fr !important;
          }
          
          /* Hide the sidebar and header explicitly */
          .no-print, header {
            display: none !important;
          }
          
          /* Make main content full width */
          .md\\:col-span-2 {
            width: 100% !important;
            grid-column: span 1 !important;
          }
          
          /* Clean up shadows and borders for print */
          .shadow-sm, .shadow-md, .shadow-lg {
            box-shadow: none !important;
          }
          
          .border {
            border-color: #e5e7eb !important;
          }
          
          /* Ensure text is black for better printing */
          body {
            color: black !important;
            background: white !important;
          }
          
          /* Specific print section styling */
          .print-clean {
            border: 1px solid #eee !important;
            break-inside: avoid;
            margin-bottom: 20px !important;
          }

          /* Ensure sections are visible */
          .bg-white {
            background-color: white !important;
          }
        }
      `}</style>
      <div className="min-h-screen">
        <div>
          {/* Header */}
          <div className="bg-white border-b border-gray-200 px-6 py-4 rounded-lg mt-4 shadow-sm print-clean">
            <div id="printable-header">
              <div className="flex items-center justify-between no-print">
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => {
                      const fromAnalysis = location.state?.fromAnalysis;
                      const quizId = location.state?.quizId;
                      if (fromAnalysis && quizId) {
                        navigate(`/dashboard/quiz-analysis/${quizId}`);
                      } else if (
                        location.state?.from === "weekly-plan" ||
                        location.state?.from === "home"
                      ) {
                        navigate(-1);
                      } else if (onBack) {
                        onBack();
                      } else {
                        navigate("/dashboard/clinical-case-generator");
                      }
                    }}
                    className="flex items-center text-gray-600 hover:text-gray-800"
                  >
                    <ArrowLeft size={20} />
                    <span className="ml-2 font-medium">Clinical Case</span>
                  </button>
                </div>
                {/* <div className="flex items-center gap-2  px-4 py-2 border border-gray-300 rounded-lg">
              <Sparkles className="text-blue-600" size={16} />
              <span className="text-sm text-blue-600 font-medium">
                AI Tutor
              </span>
            </div> */}
              </div>

              <div className="mt-4 no-print">
                <p className="text-gray-600 text-sm">
                  Sharpen your diagnostic skills. Ready for your next challenge?
                </p>
              </div>

              {/* Header information - always visible in print */}
              <div className="mt-6 flex items-center gap-4">
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${getSpecialtyColor(
                    clinicalCase?.subject || ""
                  )}`}
                >
                  {clinicalCase?.subject}
                </span>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(
                    clinicalCase?.difficultyLevel || ""
                  )}`}
                >
                  {clinicalCase?.difficultyLevel}
                </span>
              </div>

              <h1 className="text-2xl font-bold text-gray-900 mt-4 mb-6">
                {clinicalCase?.caseTitle}
              </h1>

              {/* Navigation Tabs - hidden in print */}
              <div className="flex gap-4 md:gap-6 lg:gap-8 border-b border-gray-200 overflow-auto no-print">
                {[
                  {
                    key: "history",
                    label: "History",
                    icon: History,
                    ref: historyRef,
                  },
                  {
                    key: "vitals",
                    label: "Vitals",
                    icon: Heart,
                    ref: vitalsRef,
                  },
                  {
                    key: "labs",
                    label: "Labs",
                    icon: Microscope,
                    ref: labsRef,
                  },
                  {
                    key: "imaging",
                    label: "Imaging",
                    icon: Scan,
                    ref: imagingRef,
                  },
                ].map(({ key, label, icon: Icon, ref }) => (
                  <button
                    key={key}
                    onClick={() => scrollToSection(ref, key)}
                    className={`flex items-center gap-2 pb-3 border-b-2 transition-colors px-4 cursor-pointer ${activeTab === key
                        ? "border-blue-main text-blue-main"
                        : "border-transparent text-gray-500 hover:text-black"
                      }`}
                  >
                    <Icon size={16} />
                    <span className="text-sm lg:text-base font-medium">
                      {label}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-4 lg:my-6">
              {/* Main Content */}
              <div className="md:col-span-2 space-y-6">
                {/* Patient Presentation */}
                <div
                  ref={presentationRef}
                  className="bg-white rounded-lg shadow-sm border border-gray-200 print-clean"
                >
                  <SectionHeader
                    title="Patient Presentation"
                    icon={<History size={20} />}
                    isExpanded={expandedSections.presentation}
                    onToggle={() => toggleSection("presentation")}
                  />

                  {expandedSections.presentation && (
                    <div className="px-6 pb-6">
                      {/* Patient Details - COMMENTED OUT - No parsing from patientPresentation */}
                      {/* <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-gray-500">Age:</span>
                      <p className="text-gray-900">--</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-gray-500">Sex:</span>
                      <p className="text-gray-900">--</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-gray-500">Ethnicity:</span>
                      <p className="text-gray-900">--</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-gray-500">Occupation:</span>
                      <p className="text-gray-900">--</p>
                    </div>
                  </div> */}

                      <p className="text-gray-700 leading-relaxed">
                        {clinicalCase?.patientPresentation}
                      </p>
                    </div>
                  )}
                </div>

                {/* History of Present Illness */}
                <div
                  ref={historyRef}
                  className="bg-white rounded-lg shadow-sm border border-gray-200 print-clean"
                >
                  <SectionHeader
                    title="History of Present Illness"
                    icon={<History size={20} />}
                    isExpanded={expandedSections.history}
                    onToggle={() => toggleSection("history")}
                  />

                  {expandedSections.history && (
                    <div className="px-6 pb-6">
                      <div className="space-y-4 text-gray-700 leading-relaxed">
                        <p>{clinicalCase?.historyOfPresentIllness}</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Physical Examination */}
                <div
                  ref={vitalsRef}
                  className="bg-white rounded-lg shadow-sm border border-gray-200 print-clean"
                >
                  <SectionHeader
                    title="Physical Examination Findings"
                    icon={<Heart size={20} />}
                    isExpanded={expandedSections.physical}
                    onToggle={() => toggleSection("physical")}
                  />

                  {expandedSections.physical && (
                    <div className="px-6 pb-6">
                      {/* Display the physical examination as text */}
                      <div className="text-gray-700 leading-relaxed">
                        <p>{clinicalCase?.physicalExamination}</p>
                      </div>

                      {/* COMMENTED OUT - Structured vital signs display (no parsing) */}
                      {/* <div className="mb-6">
                    <h3 className="font-semibold text-gray-900 mb-3">
                      Vital Signs
                    </h3>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                      <VitalSignCard
                        label="Temperature"
                        value="--"
                        unit=""
                        isAbnormal={false}
                      />
                      <VitalSignCard
                        label="Heart Rate"
                        value="--"
                        unit=""
                        isAbnormal={false}
                      />
                      <VitalSignCard
                        label="Blood Pressure"
                        value="--"
                        unit=""
                        isAbnormal={false}
                      />
                      <VitalSignCard
                        label="Respiratory Rate"
                        value="--"
                        unit=""
                        isAbnormal={false}
                      />
                    </div>
                  </div> */}
                    </div>
                  )}
                </div>

                {/* Laboratory Results */}
                <div
                  ref={labsRef}
                  className="bg-white rounded-lg shadow-sm border border-gray-200 print-clean"
                >
                  <SectionHeader
                    title="Laboratory Results"
                    icon={<Microscope size={20} />}
                    isExpanded={expandedSections.investigations}
                    onToggle={() => toggleSection("investigations")}
                  />

                  {expandedSections.investigations &&
                    clinicalCase?.laboratoryResults && (
                      <div className="px-6 pb-6">
                        <h3 className="font-semibold text-gray-900 mb-4">
                          Test Results
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {clinicalCase?.laboratoryResults?.map(
                            (test, index) => (
                              <LabResultCard
                                key={index}
                                test={test?.name || ""}
                                value={test?.value || ""}
                                unit=""
                              />
                            )
                          )}
                        </div>
                      </div>
                    )}
                </div>

                {/* Imaging Studies */}
                <div
                  ref={imagingRef}
                  className="bg-white rounded-lg shadow-sm border border-gray-200 print-clean"
                >
                  <SectionHeader
                    title="Imaging Studies"
                    icon={<Scan size={20} />}
                    isExpanded={expandedSections.imaging}
                    onToggle={() => toggleSection("imaging")}
                  />

                  {expandedSections.imaging && clinicalCase?.imaging && (
                    <div className="px-6 pb-6 space-y-4">
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-2">
                          Imaging Findings:
                        </h3>
                        <p className="text-gray-700">{clinicalCase?.imaging}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Sidebar - hidden in print */}
              <div className="space-y-6 no-print">
                {/* Reading Progress */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <h3 className="font-semibold text-gray-900 mb-3">
                    Case Progress
                  </h3>
                  <PrimaryButton
                    className="w-full px-4 py-2 text-base"
                    onClick={handleMakeDecision}
                  >
                    Make Your Decision
                  </PrimaryButton>
                </div>

                {/* Quick Actions */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <h3 className="font-semibold text-gray-900 mb-4">
                    Quick Actions
                  </h3>
                  <div className="space-y-3">
                    {[
                      // { icon: Bookmark, label: "Bookmark", action: "bookmark" },
                      { icon: Printer, label: "Print Case", action: "print" },
                      // { icon: Share2, label: "Share Case", action: "share" },
                    ].map(({ icon: Icon, label, action }) => (
                      <button
                        key={action}
                        onClick={() => handleQuickAction(action)}
                        className="w-full flex items-center gap-3 p-3 text-left text-gray-700 hover:bg-gray-50 rounded transition-colors cursor-pointer"
                      >
                        <Icon size={16} />
                        <span>{label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Case Information */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <h3 className="font-semibold text-gray-900 mb-4">
                    Case Information
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Subject:</span>
                      <span className="text-gray-700">
                        {clinicalCase?.subject}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">System:</span>
                      <span className="text-gray-700">
                        {clinicalCase?.system}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Topic:</span>
                      <span className="text-gray-700">
                        {clinicalCase?.topic}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Created:</span>
                      <span className="text-gray-700">
                        {clinicalCase?.createdAt
                          ? new Date(
                            clinicalCase.createdAt
                          ).toLocaleDateString()
                          : "--"}
                      </span>
                    </div>
                    {clinicalCase?.publishedBy && (
                      <div className="flex justify-between">
                        <span className="text-gray-500">Published by:</span>
                        <span className="text-gray-700">
                          {clinicalCase?.publishedBy?.firstName}{" "}
                          {clinicalCase?.publishedBy?.lastName}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ClinicalCaseDetails;

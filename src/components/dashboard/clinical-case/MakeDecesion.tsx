// import { Button } from "@/components/ui/button";
// import { FilePlus2 } from "lucide-react";
import ClinicalCaseFlow from "./ClinicalCaseFlow";
import { useParams, useSearchParams, useLocation, useNavigate } from "react-router-dom";
import {
  useGetSingleClinicalCaseQuery,
  useGetSingleGeneratedClinicalCaseQuery,
} from "@/store/features/clinicalCase/clinicalCase.api";
import { CircleAlert, ArrowLeft } from "lucide-react";
import PrimaryButton from "@/components/reusable/PrimaryButton";
import GlobalLoader from "@/common/GlobalLoader";
import { ClinicalCaseData } from "@/types/clinicalCase";
// import { ClinicalCaseData } from "@/types/clinicalCase.types";

const MakeDecision = () => {
  const { id } = useParams();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const caseType = searchParams.get("type"); // "generated" or null/undefined
  const isGenerated = caseType === "generated";

  const stateClinicalCaseData = location.state?.clinicalCaseData;

  // Standard Query
  const {
    data: standardData,
    isLoading: isLoadingStandard,
    error: errorStandard,
  } = useGetSingleClinicalCaseQuery(id as string, { skip: isGenerated || !!stateClinicalCaseData });

  // Generated Query
  const {
    data: generatedData,
    isLoading: isLoadingGenerated,
    error: errorGenerated,
  } = useGetSingleGeneratedClinicalCaseQuery(id as string, {
    skip: !isGenerated || !!stateClinicalCaseData,
  });

  const isLoading = !stateClinicalCaseData && (isGenerated ? isLoadingGenerated : isLoadingStandard);
  const error = isGenerated ? errorGenerated : errorStandard;
  const clinicalCase = (
    stateClinicalCaseData || (isGenerated ? generatedData?.data : standardData?.data)
  ) as ClinicalCaseData;

  const fromAnalysis = location.state?.fromAnalysis;
  const quizId = location.state?.quizId;
  const navigate = useNavigate();

  const handleBack = () => {
    if (fromAnalysis && quizId) {
      navigate(`/dashboard/quiz-analysis/${quizId}`);
    } else {
      navigate(-1);
    }
  };

  if (isLoading) {
    return <GlobalLoader />;
  }

  if (error || !clinicalCase) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <CircleAlert className="w-16 h-16 text-red-500" />
        <h2 className="text-xl font-semibold text-slate-700">
          No Clinical Case Found
        </h2>
        <p className="text-slate-500">
          The clinical case you are looking for does not exist or has been removed.
        </p>
        <PrimaryButton
          onClick={handleBack}
          className="bg-blue-main hover:bg-blue-main/90"
        >
          {fromAnalysis ? "Back to Analysis" : "Back to Cases"}
        </PrimaryButton>
      </div>
    );
  }

  return (
    <div>
      <div className="border border-slate-300 rounded-2xl p-6 mt-10 bg-white">
        <div className="md:flex items-center justify-between gap-3">
          <div className="flex items-center gap-4 mb-4">
            <button
              onClick={handleBack}
              className="p-2 hover:bg-slate-100 rounded-full transition-colors mr-2 focus:outline-none"
              aria-label="Go back"
            >
              <ArrowLeft className="w-5 h-5 text-slate-600" />
            </button>
            {clinicalCase?.subject && (
              <p className="bg-slate-200 text-slate-900 px-2.5 py-0.5 rounded-full text-sm">
                {clinicalCase?.subject}
              </p>
            )}
            {clinicalCase?.difficultyLevel && (
              <p className="border border-slate-200 text-slate-950 px-2.5 py-0.5 rounded-full">
                {clinicalCase?.difficultyLevel}
              </p>
            )}
          </div>
          {/* <Link to={`/dashboard/clinical-case/${id}${isGenerated ? "?type=generated" : ""}`}>
            <Button className="px-3 h-10 border border-indigo-500 bg-white text-indigo-500 hover:bg-indigo-50">
              <FilePlus2 />
              Review Case Details
            </Button>
          </Link> */}
        </div>
        <h2 className="text-3xl font-semibold mt-5">
          {clinicalCase?.caseTitle}
        </h2>
      </div>

      <ClinicalCaseFlow clinicalCase={clinicalCase} />
    </div>
  );
};

export default MakeDecision;

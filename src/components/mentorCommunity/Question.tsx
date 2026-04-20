import { useMemo, useState, useEffect } from "react";
import { ChevronRight, ChevronDown, Send } from "lucide-react";
import Pagination from "../reusable/Pagination";
import {
  useGetMentorsQuestionWithAnswersQuery,
  useQuestionUpdateMutation,
} from "@/store/features/mentor-dashboard/question/question.api";
import { TForumQuestion } from "@/store/storeTypes/questions";
import GlobalLoader from "@/common/GlobalLoader";
import { useSelector } from "react-redux";
import { selectUser } from "@/store/features/auth/auth.slice";

// Local state type for UI management
type QuestionUIState = TForumQuestion & {
  isExpanded: boolean;
  showAnswerInput: boolean;
};

const Question = () => {
  const user = useSelector(selectUser);
  const mentorProfileId = user?.profile?._id;

  const { data, isLoading, isError, refetch } =
    useGetMentorsQuestionWithAnswersQuery(mentorProfileId, {
      skip: !mentorProfileId,
    });
  const [questionAnswere, { isLoading: isPosting }] =
    useQuestionUpdateMutation();
  const questions: TForumQuestion[] = useMemo(() => data ?? [], [data]);

  // UI state
  const [questionsUI, setQuestionsUI] = useState<QuestionUIState[]>([]);
  const [answerTexts, setAnswerTexts] = useState<Record<string, string>>({});

  // ✅ Initialize UI state properly
  useEffect(() => {
    if (questions.length > 0) {
      setQuestionsUI(
        questions.map((q) => ({
          ...q,
          isExpanded: false,
          showAnswerInput: false,
        }))
      );
    }
  }, [questions]);

  // ✅ Toggle question expansion
  const toggleQuestion = (id: string) => {
    setQuestionsUI((prev) =>
      prev.map((q) => (q._id === id ? { ...q, isExpanded: !q.isExpanded } : q))
    );
  };

  // ✅ Toggle answer input
  const toggleAnswerInput = (id: string) => {
    setQuestionsUI((prev) =>
      prev.map((q) =>
        q._id === id
          ? { ...q, showAnswerInput: !q.showAnswerInput, isExpanded: true }
          : q
      )
    );
  };

  // ✅ Handle answer text change
  const handleAnswerChange = (id: string, text: string) => {
    setAnswerTexts((prev) => ({ ...prev, [id]: text }));
  };

  // ✅ Submit answer to backend
  const submitAnswer = async (id: string) => {
    const answerText = answerTexts[id];

    if (!answerText || !answerText.trim()) {
      alert("Please write an answer before submitting.");
      return;
    }

    try {
      // Prepare the request body according to your API
      const requestBody = {
        answer: answerText.trim(),
      };

      // Call the mutation to post the answer
      const res = await questionAnswere({
        id: id, // This is the question ID
        body: requestBody,
      }).unwrap();

      if (res.success) {
        setAnswerTexts((prev) => ({ ...prev, [id]: "" }));
        //  Immediately refetch the forum data to show the new comment
        refetch(); // This will update the comments list without page reload
      }

      // Refetch questions to get updated data from server
    } catch (error) {
      console.error("Failed to submit answer:", error);
    }
  };

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [showAll, setShowAll] = useState(false);
  const productsPerPage = 10;
  const totalProducts = questionsUI.length;
  const totalPages = Math.ceil(totalProducts / productsPerPage);

  const handleShowAll = () => setShowAll((prev) => !prev);

  const paginatedQuestions = useMemo(() => {
    if (showAll) return questionsUI;
    const startIndex = (currentPage - 1) * productsPerPage;
    return questionsUI.slice(startIndex, startIndex + productsPerPage);
  }, [questionsUI, currentPage, showAll]);

  const start = showAll ? 1 : (currentPage - 1) * productsPerPage + 1;
  const end = showAll
    ? totalProducts
    : Math.min(currentPage * productsPerPage, totalProducts);

  // Loading state
  if (isLoading) return <GlobalLoader />;

  // Error or empty state
  if (isError)
    return (
      <p className="text-center text-red-500 py-8">
        Failed to load questions. Please try again.
      </p>
    );
  if (totalProducts === 0)
    return (
      <p className="text-center text-gray-500 py-8">No questions available</p>
    );

  return (
    <div className="w-full">
      {/* Header */}
      <div className="mb-4 md:mb-8 space-y-2">
        <h4 className="text-[16px] md:text-[20px] font-semibold text-[#0F172A]">
          Asked Question
        </h4>
        <p className="text-[14px] md:text-[16px] text-gray-600">
          See who's asking, learning, and engaging.
        </p>
      </div>

      {/* Question list */}
      <div className="w-full">
        <div className="bg-white rounded-lg shadow-sm w-full">
          <div className="divide-y divide-gray-200 w-full">
            {paginatedQuestions.map((question) => (
              <div key={question._id} className="p-4 md:p-6 w-full">
                <div className="flex items-start justify-between gap-3 w-full">
                  <div className="flex items-start gap-3 flex-1 min-w-0">
                    <button
                      onClick={() => toggleQuestion(question._id)}
                      className="mt-1 text-gray-400 hover:text-gray-600 flex-shrink-0"
                    >
                      {question.isExpanded ? (
                        <ChevronDown className="w-4 h-4 md:w-5 md:h-5 cursor-pointer" />
                      ) : (
                        <ChevronRight className="w-4 h-4 md:w-5 md:h-5 cursor-pointer" />
                      )}
                    </button>

                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-gray-900 text-sm md:text-base mb-1 break-words">
                        {question.question}
                      </h3>
                      <p className="text-xs md:text-sm text-gray-600">
                        From{" "}
                        <span className="text-blue-600">
                          {question.postedBy?.firstName}{" "}
                          {question.postedBy?.lastName}
                        </span>
                      </p>

                      {/* Answers */}
                      {question?.isExpanded && question?.answers?.length > 0 && (
                        <div className="mt-3 md:mt-4 space-y-3">
                          {question?.answers?.map((answer) => (
                            <div
                              key={answer._id}
                              className="p-3 md:p-4 bg-gray-50 rounded-lg"
                            >
                              <p className="text-gray-700 whitespace-pre-line text-sm md:text-base">
                                <span className="font-semibold">Answer:</span>{" "}
                                {answer.answer}
                              </p>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Give answer textarea */}
                      {question?.showAnswerInput && (
                        <div className="mt-3 md:mt-4">
                          <div className="bg-gray-50 rounded-lg p-3 md:p-4 border border-gray-200">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Give Answer
                            </label>
                            <textarea
                              value={answerTexts[question._id] || ""}
                              onChange={(e) =>
                                handleAnswerChange(question._id, e.target.value)
                              }
                              onKeyDown={(e) => {
                                if (e.key === "Enter" && !e.shiftKey) {
                                  e.preventDefault();
                                  submitAnswer(question._id);
                                }
                              }}
                              placeholder="Write your answer here..."
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg resize-none text-sm md:text-base"
                              rows={4}
                              disabled={isPosting}
                            />
                            <div className="flex gap-2 mt-3">
                              <button
                                onClick={() => submitAnswer(question._id)}
                                disabled={isPosting}
                                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm cursor-pointer disabled:bg-blue-400 disabled:cursor-not-allowed"
                              >
                                <Send className="w-4 h-4" />
                                {isPosting ? "Submitting..." : "Submit Answer"}
                              </button>
                              <button
                                onClick={() => toggleAnswerInput(question._id)}
                                disabled={isPosting}
                                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors text-sm cursor-pointer disabled:bg-gray-300 disabled:cursor-not-allowed"
                              >
                                Cancel
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Give Answer button (only when collapsed) */}
                  {!question.isExpanded && !question.showAnswerInput && (
                    <div className="flex-shrink-0">
                      <button
                        onClick={() => toggleAnswerInput(question._id)}
                        className="px-3 py-2 md:px-4 md:py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-xs md:text-sm whitespace-nowrap cursor-pointer"
                      >
                        Give answer
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Pagination */}
      <div className="mt-16 mb-32 flex justify-center space-x-5">
        {!showAll && totalProducts > productsPerPage && (
          <Pagination
            title={"All Questions"}
            showText={`Showing ${start} to ${end} of ${totalProducts} Questions`}
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
            onToggleShowAll={handleShowAll}
            showAll={showAll}
          />
        )}

        {showAll && totalProducts > productsPerPage && (
          <div className="flex justify-center">
            <button
              onClick={handleShowAll}
              className="px-6 py-2 bg-sunset-orange text-white rounded-lg cursor-pointer"
            >
              Show Less
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Question;

// src/components/AnswerOverview.tsx
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

// Types
interface Option {
  value: string;
  label: string;
  isCorrect: boolean;
}

interface Explanation {
  correct: string;
  incorrect: Record<string, string>;
  references?: string;
}

interface Question {
  id: string;
  text: string;
  options: Option[];
  explanation: Explanation;
}

interface QuizData {
  title: string;
  description: string;
  questions: Question[];
}

// Sample JSON data for medical students (Neurology questions with answers)
const quizData: QuizData = {
  title: "Session 1 (Neurology)",
  description: "5 Question | Medium",
  questions: [
    {
      id: "01",
      text: "A 16-year-old female presents ... Which of the following is a risk factor for her condition?",
      options: [
        { value: "A", label: "A. Increased androgen levels", isCorrect: true },
        { value: "B", label: "B. Low humidity environment", isCorrect: false },
        { value: "C", label: "C. High-fiber diet", isCorrect: false },
        { value: "D", label: "D. Excessive sun exposure", isCorrect: false },
        { value: "E", label: "E. Regular exercise", isCorrect: false },
      ],
      explanation: {
        correct:
          "Increased androgen levels are a well-established risk factor for acne vulgaris...",
        incorrect: {
          B: "A low humidity environment is not typically associated...",
          C: "A high-fiber diet is generally considered beneficial...",
          D: "While excessive sun exposure can lead to skin damage...",
          E: "Regular exercise is associated with numerous health benefits...",
        },
        references:
          "Thiboutot, D., et al. (2018). 'The role of androgens in acne.' ...",
      },
    },
    {
      id: "02",
      text: "A patient with migraine headaches is prescribed a triptan. What is the primary mechanism of action?",
      options: [
        { value: "A", label: "A. Beta-blocker", isCorrect: false },
        { value: "B", label: "B. Serotonin receptor agonist", isCorrect: true },
        { value: "C", label: "C. Calcium channel blocker", isCorrect: false },
        { value: "D", label: "D. Anticonvulsant", isCorrect: false },
        { value: "E", label: "E. Opioid agonist", isCorrect: false },
      ],
      explanation: {
        correct:
          "Triptans work as serotonin receptor agonists, specifically targeting 5-HT1B/1D receptors...",
        incorrect: {
          A: "Beta-blockers are used for migraine prevention, not triptans.",
          C: "Calcium channel blockers are used for hypertension...",
          D: "Anticonvulsants are sometimes used for migraine prevention...",
          E: "Opioid agonists are not a standard treatment for migraines.",
        },
      },
    },
  ],
};

const AnswerOverview = () => {
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
//   const [timeElapsed, setTimeElapsed] = useState<number>(0);

  const questions = quizData.questions;

  // Timer effect
//   useEffect(() => {
//     const timer = setInterval(() => {
//       setTimeElapsed((prev) => prev + 1);
//     }, 1000);
//     return () => clearInterval(timer);
//   }, []);

  // Format time as MM:SS
//   const formatTime = (seconds: number): string => {
//     const mins = Math.floor(seconds / 60).toString().padStart(2, "0");
//     const secs = (seconds % 60).toString().padStart(2, "0");
//     return `${mins}:${secs}`;
//   };

  // Handle answer selection (only stored for overview navigation)
  const handleAnswerChange = (value: string) => {
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion]: value,
    }));
  };

  // Navigation
  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    }
  };

  const currentQuestionData = questions[currentQuestion];
  const selectedAnswer = answers[currentQuestion];
//   const correctAnswer = currentQuestionData.options.find(
//     (opt) => opt.isCorrect
//   );

  return (
    <div className="min-h-screen p-4">
      {/* Header */}
      {/* <div className="text-sm text-gray-600 mb-2">
        Dashboard &gt; MCOG &gt; Custom Session
      </div>
      <h1 className="text-xl font-bold mb-1">{quizData.title}</h1>
      <p className="text-sm text-gray-600 mb-4">{quizData.description}</p> */}

      {/* Main Content */}
      <div className="flex flex-col md:flex-row gap-4 my-10">
        {/* Sidebar */}
        <div className="w-full md:w-1/4 bg-white p-4 rounded-lg shadow">
          <h2 className="font-semibold mb-2">Study Mode</h2>
          {questions.map((q, index) => (
            <div
              key={q.id}
              className={`p-2 mb-2 rounded cursor-pointer ${
                index === currentQuestion
                  ? "bg-blue-100 text-blue-600"
                  : "text-gray-600"
              }`}
              onClick={() => setCurrentQuestion(index)}
            >
              Question {q.id}
            </div>
          ))}
        </div>

        {/* Question Area */}
        <div className="w-full md:w-3/4 bg-white p-4 rounded-lg shadow">
          <h3 className="font-semibold mb-4">
            Question {currentQuestionData.id}
          </h3>
          <p className="mb-4">{currentQuestionData.text}</p>

          <RadioGroup
            value={selectedAnswer || ""}
            onValueChange={handleAnswerChange}
            disabled
          >
            {currentQuestionData.options.map((option) => {
              const isSelected = selectedAnswer === option.value;
              return (
                <div
                  key={option.value}
                  className="flex items-center space-x-2 mb-2"
                >
                  <RadioGroupItem
                    value={option.value}
                    id={option.value}
                    checked={isSelected}
                  />
                  <Label
                    htmlFor={option.value}
                    className={`
                      ${isSelected && option.isCorrect ? "text-green-600 font-bold" : ""}
                      ${isSelected && !option.isCorrect ? "text-red-600 line-through" : ""}
                      ${!selectedAnswer && option.isCorrect ? "text-green-600 font-bold" : ""}
                    `}
                  >
                    {option.label}
                  </Label>
                </div>
              );
            })}
          </RadioGroup>

          {/* Explanation */}
          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <h4 className="font-semibold mb-2">Explanation</h4>

            {currentQuestionData.options.map((option) => {
              const isOptionCorrect = option.isCorrect;
              return (
                <div key={option.value} className="mb-3">
                  {isOptionCorrect ? (
                    <p className="font-medium text-green-600">
                      [Correct - Choice {option.value}]
                    </p>
                  ) : (
                    <p className="font-medium text-red-600">
                      [Choice {option.value}]
                    </p>
                  )}

                  <p className="text-gray-800">
                    {isOptionCorrect
                      ? currentQuestionData.explanation.correct
                      : currentQuestionData.explanation.incorrect[option.value]}
                  </p>
                </div>
              );
            })}

            {currentQuestionData.explanation.references && (
              <p className="text-sm text-gray-600 mt-4 italic">
                {currentQuestionData.explanation.references}
              </p>
            )}
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-6">
            {currentQuestion > 0 ? (
              <Button variant="outline" onClick={handlePrevious}>
                Previous
              </Button>
            ) : (
              <div></div>
            )}
            {currentQuestion < questions.length - 1 && (
              <Button onClick={handleNext}>Next</Button>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Timer (optional, uncomment if needed) */}
      {/* 
      <div className="fixed bottom-0 left-0 right-0 bg-white p-4 shadow-lg flex justify-between items-center">
        <div className="flex items-center">
          <Timer className="mr-2" />
          {formatTime(timeElapsed)}
        </div>
      </div>
      */}
    </div>
  );
};

export default AnswerOverview;

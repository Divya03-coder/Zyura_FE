import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface MCQOption {
  value: string;
  label: string;
}

export interface MCQ {
  id: string;
  text: string;
  options: MCQOption[];
  correctAnswer: string;
  explanation: string;
}

export interface QuizResult {
  questionId: string;
  selectedOption: string;
  isCorrect: boolean;
}

interface QuizState {
  currentQuiz: {
    id: string;
    title: string;
    description: string;
    questions: MCQ[];
  } | null;
  results: QuizResult[] | null;
  isCompleted: boolean;
}

const initialState: QuizState = {
  currentQuiz: null,
  results: null,
  isCompleted: false,
};

const quizSlice = createSlice({
  name: "quiz",
  initialState,
  reducers: {
    setQuiz: (
      state,
      action: PayloadAction<{
        id: string;
        title: string;
        description: string;
        questions: MCQ[];
      }>
    ) => {
      state.currentQuiz = action.payload;
      state.results = null;
      state.isCompleted = false;
    },
    setQuizResults: (state, action: PayloadAction<QuizResult[]>) => {
      state.results = action.payload;
      state.isCompleted = true;
    },
    clearQuiz: (state) => {
      state.currentQuiz = null;
      state.results = null;
      state.isCompleted = false;
    },
  },
});

export const { setQuiz, setQuizResults, clearQuiz } = quizSlice.actions;
export default quizSlice.reducer;

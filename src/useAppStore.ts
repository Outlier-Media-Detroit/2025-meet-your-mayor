import { create } from "zustand";
import { persist } from "zustand/middleware";
import { QuizInput, ScoreCard } from "./components/QuizContent";
import { questionContent } from "./question-content";

/**
 * A blank template to keep track of user's
 * responses to quiz questions.
 */
export const blankAnswersList = Object.entries(questionContent).map(
  (question, i) => ({
    questionNumber: i + 1,
    answer: null,
  })
);

export type BallotStatus = "ballot" | "writein" | null;

type AppState = {
  ballotStatus: BallotStatus;
  setBallotStatus: (ballotStatus: BallotStatus, delay?: number) => void;
  favoriteTopics: string[];
  setFavoriteTopics: (favoriteTopics: string[]) => void;
  answers: QuizInput[];
  setAnswers: (answers: QuizInput[]) => void;
  score: ScoreCard | null;
  setScore: (score: ScoreCard) => void;
  /**
   * This state is used to keep track of the number of the last question
   * that was visible to the user.
   */
  highestVisibleQuestion: number;
  setHighestVisibleQuestion: (highestVisibleQuestion: number) => void;
  resetAnswers: () => void;
};

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      ballotStatus: null,
      setBallotStatus: (ballotStatus, delay) => {
        const highestVisibleQuestion = get().highestVisibleQuestion;
        const setHighestVisibleQuestion = get().setHighestVisibleQuestion;
        if (highestVisibleQuestion === 0 && !!ballotStatus) {
          setHighestVisibleQuestion(1);
        }
        setTimeout(() => {
          set({ ballotStatus });
        }, delay || 0);
      },
      favoriteTopics: [],
      setFavoriteTopics: (favoriteTopics) => {
        set({ favoriteTopics });
      },
      answers: blankAnswersList,
      setAnswers: (answers) => set({ answers }),
      score: null,
      setScore: (score) => {
        set({ score });
      },
      highestVisibleQuestion: 0,
      setHighestVisibleQuestion: (highestVisibleQuestion) =>
        set({ highestVisibleQuestion }),
      resetAnswers: () => {
        set({
          answers: blankAnswersList,
          favoriteTopics: [],
          highestVisibleQuestion: 0,
          ballotStatus: null,
        });
      },
    }),
    {
      name: "app-store",
      version: 1,
    }
  )
);

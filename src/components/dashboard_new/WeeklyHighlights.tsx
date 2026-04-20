import React from "react";
import { Lightbulb } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useGetWeeklyHighlightsQuery } from "@/store/features/goal/goal.api";
import { motion } from "framer-motion";

interface HighlightItem {
  _id: string;
  [key: string]: any;
}

interface HighlightsData {
  mcqBank?: HighlightItem;
  flashcard?: HighlightItem;
  clinicalCase?: HighlightItem;
  osce?: HighlightItem;
  note?: HighlightItem;
}

interface HighlightCard {
  id: string;
  type: "mcq" | "flashcard" | "clinicalCase" | "osce" | "note";
  title: string;
  description: string;
  buttonText: string;
  route: string;
  img: string;
  cardCss: string;
  btnCss: string;
}

const WeeklyHighlights: React.FC = () => {
  const navigate = useNavigate();
  const { data, isLoading } = useGetWeeklyHighlightsQuery(undefined);

  const highlightCards: HighlightCard[] = React.useMemo(() => {
    if (!data?.data) return [];

    const highlights: HighlightsData = data.data;
    const cards: HighlightCard[] = [];

    // MCQ Bank
    if (highlights.mcqBank) {
      const mcq = highlights.mcqBank;
      cards.push({
        id: mcq._id,
        type: "mcq",
        title: "MCQ of your daily preference",
        description:
          "Test your knowledge with a multiple-choice question of your daily preference",
        buttonText: "Answer Now",
        route: `/dashboard/practice-mcq/${mcq._id}`,
        img: "/image/dashboard_new/Frame1.svg",
        cardCss: "bg-gradient-to-br from-lime-50 to-lime-100 border-lime-200",
        btnCss: "bg-lime-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-lime-700 transition-colors cursor-pointer",
      });
    }

    // Flashcard
    if (highlights.flashcard && highlights.flashcard.length > 0) {
      const flashcard = highlights.flashcard[0];
      cards.push({
        id: flashcard._id,
        type: "flashcard",
        title: "Flashcard of your daily preference",
        description:
          "Master key concepts with a flashcard set of your daily preference",
        buttonText: "Study Now",
        route: `/dashboard/solve-flash-card/${flashcard._id}`,
        img: "/image/dashboard_new/Frame.svg",
        cardCss: "bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200",
        btnCss: "bg-orange-700/90 text-white py-2 px-4 rounded-lg font-medium hover:bg-orange-800 transition-colors cursor-pointer",
      });
    }

    // Clinical Case
    if (highlights.clinicalCase) {
      const clinicalCase = highlights.clinicalCase;
      cards.push({
        id: clinicalCase._id,
        type: "clinicalCase",
        title: "Clinical Case of your daily preference",
        description:
          "Apply your clinical reasoning to a case scenario of your daily preference",
        buttonText: "Solve Case",
        route: `/dashboard/clinical-case/${clinicalCase._id}`,
        img: "/image/dashboard_new/Frame.svg",
        cardCss: "bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200",
        btnCss: "bg-blue-700/90 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-800 transition-colors cursor-pointer",
      });
    }

    // OSCE
    if (highlights.osce) {
      const osce = highlights.osce;
      cards.push({
        id: osce._id,
        type: "osce",
        title: "OSCE of your daily preference",
        description:
          "Practice your clinical skills with an OSCE station of your daily preference",
        buttonText: "Practice Now",
        route: `/dashboard/practice-with-checklist/${osce._id}`,
        img: "/image/dashboard_new/User.svg",
        cardCss: "bg-gradient-to-br from-violet-50 to-violet-100 border-violet-200",
        btnCss: "bg-violet-700/90 text-white py-2 px-4 rounded-lg font-medium hover:bg-violet-800 transition-colors cursor-pointer",
      });
    }

    if (highlights.note) {
      const note = highlights.note;
      cards.push({
        id: note._id,
        type: "note",
        title: "Note of your daily preference",
        description:
          "Master key concepts with a study note of your daily preference",
        buttonText: "Study Now",
        route: `/dashboard/notes/${note?._id}`,
        img: "/image/dashboard_new/Frame.svg",
        cardCss: "bg-gradient-to-br from-emerald-50 to-emerald-100 border-emerald-200",
        btnCss: "bg-emerald-700/90 text-white py-2 px-4 rounded-lg font-medium hover:bg-emerald-800 transition-colors cursor-pointer",
      });
    }

    return cards;
  }, [data]);

  const handleCardClick = (route: string) => {
    navigate(route, { state: { from: "home" } });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const cardVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 15,
      },
    },
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold text-gray-900">
            SMART STUDY PLANNER
          </h3>
          <Lightbulb className="w-6 h-6 text-blue-500" />
        </div>
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        </div>
      </div>
    );
  }

  if (!highlightCards.length) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold text-gray-900">
            SMART STUDY PLANNER
          </h3>
          <Lightbulb className="w-6 h-6 text-blue-500" />
        </div>
        <div className="text-center py-12 text-gray-500">
          No highlights available this week
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg p-6 border border-slate-200 min-h-75">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-semibold text-gray-900">
          SMART STUDY PLANNER
        </h3>
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <Lightbulb className="w-6 h-6 text-blue-500" />
        </motion.div>
      </div>
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
      >
        {highlightCards.map((card) => (
          <motion.div
            key={card.id}
            variants={cardVariants}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
            className={`border shadow-sm rounded-lg p-6 flex flex-col md:flex-row items-start gap-4 ${card.cardCss} hover:shadow-md transition-shadow`}
          >
            {/* Image */}
            <motion.img
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, delay: 0.3 }}
              src={card.img}
              alt={card.title}
              className="w-16 h-16 rounded-full object-cover shrink-0"
            />

            {/* Content */}
            <div className="flex flex-col justify-between flex-1 h-full">
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">
                  {card.title}
                </h4>
                <p className="text-sm text-gray-600 mb-4">{card.description}</p>
              </div>

              <motion.button
                whileTap={{ scale: 0.98 }}
                onClick={() => handleCardClick(card.route)}
                className={`${card.btnCss} mt-auto w-full md:w-auto text-white py-2 px-4 rounded-lg font-medium transition-colors shadow-sm`}
              >
                {card.buttonText}
              </motion.button>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default WeeklyHighlights;

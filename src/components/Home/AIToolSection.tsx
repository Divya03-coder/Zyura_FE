"use client";

import AIToolImage from "@/assets/home/AI_tool_image.png";
import CommonWrapper from "@/common/CommonWrapper";
import { FaAirbnb, FaBook, FaBookOpen, FaBookReader } from "react-icons/fa";
import { FcSettings } from "react-icons/fc";
import { useNavigate } from "react-router-dom";

interface ToolCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  link: string;
}

const ToolCard = ({ icon, title, description, link }: ToolCardProps) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(link)}
      className="bg-slate-800 rounded-[20px] p-5 group transition-all duration-300 hover:bg-slate-700"
    >
      <div className="flex items-center gap-4">
        {icon}
        <h4 className="text-[#F8FAFC] font-medium">{title}</h4>
      </div>
      <p
        className="text-slate-400 text-sm leading-6 opacity-0 max-h-0 overflow-hidden 
                   group-hover:opacity-100 group-hover:max-h-40 group-hover:mt-3
                   transition-all duration-500 ease-in-out"
      >
        {description}
      </p>
    </div>
  );
};

export default function AIToolSection() {
  const tools = [
    {
      icon: <FaAirbnb className="w-6 h-6 text-white" />,
      title: "AI Tutor",
      description:
        "A set of checkable buttons—known as radio buttons—where no more than one can be checked at a time.",

      link: "/dashboard/ai-tutor",
    },
    {
      icon: <FaAirbnb className="w-6 h-6 text-white" />,
      title: "Pharmaceutical Aid",
      description:
        "Helps provide detailed pharmaceutical assistance with AI-driven insights.",
      link: "/dashboard/drug-cards",
    },
    {
      icon: <FaBook className="w-6 h-6 text-white" />,
      title: "Question Aid",
      description:
        "Guides you through solving complex medical questions with clear steps.",
      link: "/dashboard/mcq-bank",
    },
    {
      icon: <FcSettings className="w-6 h-6 text-white" />,
      title: "In Depth Explanation",
      description:
        "Breaks down tough concepts into easy-to-understand detailed explanations.",
      link: "/dashboard/ai-tutor",
    },
    {
      icon: <FaBookOpen className="w-6 h-6 text-white" />,
      title: "Clinical Context",
      description:
        "Puts theoretical knowledge into real-world clinical scenarios.",
      link: "/dashboard/clinical-case-generator",
    },
    {
      icon: <FaBookReader className="w-6 h-6 text-white" />,
      title: "USMLE Question Style",
      description:
        "Practice with AI-generated USMLE style questions and rationales.",
      link: "/dashboard/ai-tutor",
    },
  ];

  return (
    <div className="bg-[#0F172A] py-20">
      <CommonWrapper>
        <div className="grid md:grid-cols-2 gap-6 items-center justify-between">
          {/* Text + Cards */}
          <div className="mx-auto">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">
              Enhancing learning with Smart AI-powered tools.
            </h2>
            <div className="mt-10 space-y-6 max-w-[600px]">
              {tools.map((tool, idx) => (
                <ToolCard
                  key={idx}
                  icon={tool.icon}
                  title={tool.title}
                  description={tool.description}
                  link={tool.link}
                />
              ))}
            </div>
          </div>

          {/* Image */}
          <div className="hidden md:block max-w-full mx-auto">
            <img src={AIToolImage} className="w-full" alt="ai_tool_image" />
          </div>
        </div>
      </CommonWrapper>
    </div>
  );
}

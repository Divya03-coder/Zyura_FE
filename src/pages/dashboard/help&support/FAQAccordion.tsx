"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function FAQAccordion({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-border rounded-lg overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition cursor-pointer"
      >
        <span className="font-medium text-foreground text-left">
          {question}
        </span>
        <ChevronDown
          className={`w-5 h-5 text-muted-foreground transition ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      {isOpen && (
        <div className="px-6 py-4 bg-gray-50 border-t border-border">
          <p className="text-muted-foreground text-sm leading-relaxed">
            {answer}
          </p>
        </div>
      )}
    </div>
  );
}

import { Case } from "@/components/dashboard/clinical-case/type/case";


export const mockCase: Case = {
  id: "case-1",
  title: "Case: Acute Abdominal Pain in a Young Female",
  specialty: "Cardiology",
  level: "Beginner",
  caseDetails:
    "A 24-year-old female presents with right lower quadrant abdominal pain, low-grade fever, and nausea. Pain started around the umbilicus and migrated to the right lower quadrant.",

  questions: [
    {
      id: "q1",
      prompt:
        "Based on the information gathered, what is your primary differential diagnosis?",
      correctOptionId: "opt1",
      explanation:
        "The migratory pain to the right lower quadrant, positive McBurney’s point tenderness, and fever are strongly indicative of acute appendicitis.",

      options: [
        {
          id: "opt1",
          text: "Acute Appendicitis",
          supportingEvidence: [
            "Pain migration from umbilical to RLQ",
            "Positive McBurney’s sign",
            "Elevated WBC and neutrophils",
          ],
          refutingEvidence: ["No mass palpable"],
        },
        {
          id: "opt2",
          text: "Ovarian Cyst Rupture",
          supportingEvidence: [
            "Female of reproductive age",
            "Sudden abdominal pain",
          ],
          refutingEvidence: [
            "Pain migration is not typical",
            "No history of cyst rupture",
          ],
        },
        {
          id: "opt3",
          text: "Gastroenteritis",
          supportingEvidence: ["Abdominal pain and nausea"],
          refutingEvidence: [
            "No diarrhea or vomiting",
            "Localized RLQ tenderness is unusual",
          ],
        },
      ],
    },
    {
      id: "q2",
      prompt:
        "What is the best initial imaging test for confirming the diagnosis?",
      correctOptionId: "opt2",
      explanation:
        "Ultrasound is the preferred first-line imaging test for suspected appendicitis, especially in young women, to avoid radiation exposure.",

      options: [
        {
          id: "opt1",
          text: "CT Scan Abdomen",
          supportingEvidence: ["Highly sensitive for appendicitis"],
          refutingEvidence: [
            "Radiation exposure is a concern in young patients",
          ],
        },
        {
          id: "opt2",
          text: "Ultrasound Abdomen",
          supportingEvidence: [
            "Non-invasive and safe",
            "Good sensitivity in young female patients",
          ],
          refutingEvidence: ["Operator dependent"],
        },
        {
          id: "opt3",
          text: "MRI Abdomen",
          supportingEvidence: ["No radiation exposure"],
          refutingEvidence: [
            "Expensive and not widely available as first-line",
          ],
        },
      ],
    },
  ],
};

import PrimaryButton from "@/components/reusable/PrimaryButton";
import { BookOpen, Clock, Trash2, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface StudyPlanData {
    _id: string;
    plan_summary: string;
    total_days: number;
    daily_plan: {
        day_number: number;
        date: string;
        total_hours: number;
        topics: string[];
        hourly_breakdown: {
            task_type: string;
            duration_hours: number;
            suggest_content: string[];
            isCompleted: boolean;
        }[];
    }[];
}

interface MyStudyPlanCardProps {
    plan: StudyPlanData;
    onDelete?: () => void;
    isDeleting?: boolean;
}

export default function MyStudyPlanCard({ plan, onDelete, isDeleting = false }: MyStudyPlanCardProps) {
    const navigate = useNavigate();
    const totalHours = plan.daily_plan.reduce((acc, day) => acc + day.total_hours, 0);
    const allTopics = [...new Set(plan.daily_plan.flatMap(day => day.topics))];

    const handleViewPlan = () => {
        navigate(`/dashboard/weekly-plan/${plan._id}`, { state: { plan } });
    };

    return (
        <div className="flex flex-col justify-between p-5 bg-indigo-50 border border-indigo-300 rounded-[8px]">
            <div>
                <div className="flex justify-between items-start gap-4">
                    <h3 className="text-lg font-semibold text-slate-800 line-clamp-2">{plan.plan_summary}</h3>
                    {onDelete && (
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                onDelete();
                            }}
                            disabled={isDeleting}
                            className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors cursor-pointer disabled:opacity-50 shrink-0"
                        >
                            {isDeleting ? (
                                <Loader2 className="w-5 h-5 animate-spin" />
                            ) : (
                                <Trash2 className="w-5 h-5" />
                            )}
                        </button>
                    )}
                </div>
                <p className="text-slate-600 mt-3">Total Days: {plan.total_days}</p>
                <p className="flex items-center gap-3 text-slate-600 mt-12"><Clock /> {totalHours} hours total</p>
                <p className="flex items-center gap-3 text-slate-600 mt-5"><BookOpen /> {allTopics.length} topic{allTopics.length !== 1 ? 's' : ''}</p>
                <div className="flex flex-wrap items-center gap-2 mt-3">
                    {allTopics.slice(0, 2).map((topic, index) => (
                        <p key={index} className="border border-slate-300 rounded-full text-sm text-slate-700 pt-0.5 px-2.5">{topic}</p>
                    ))}
                    {allTopics.length > 2 && (
                        <p className="border border-slate-300 rounded-full text-sm text-slate-700 pt-0.5 px-2.5">+{allTopics.length - 2} more</p>
                    )}
                </div>
            </div>

            <PrimaryButton className="w-full mt-7 bg-indigo-500 hover:bg-indigo-600" onClick={handleViewPlan}>View Plan</PrimaryButton>
        </div>
    )
}

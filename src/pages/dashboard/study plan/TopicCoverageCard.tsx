import { Progress } from "@/components/ui/progress";

export default function TopicCoverageCard() {
    return (
        <div className="bg-white border border-slate-300 p-4 mt-10 rounded-[8px]">
            <p className="flex items-center gap-2 text-lg font-medium text-[#111827]">Topic Coverage</p>
            <div className="mt-6 space-y-5">
                <div className="flex items-center justify-between">
                    <h4 className="text-sm text-[#4B5563]">Esophageal Disorders</h4>
                    <div className="">
                        <Progress value={60} className="[&>div]:bg-[#22C55E]" />
                        <p>80%</p>
                    </div>
                </div>

                <div className="flex items-center justify-between">
                    <h4 className="text-sm text-[#4B5563]">Gastric & Duodenal</h4>
                    <div>
                        <Progress value={60} className="[&>div]:bg-[#F97316]" />
                        <p>45%</p>
                    </div>
                </div>
                <div className="flex items-center justify-between">
                    <h4 className="text-sm text-[#4B5563]">Liver & Biliary</h4>
                    <div>
                        <Progress value={60} className="[&>div]:bg-[#C2410C]" />
                        <p>10%</p>
                    </div>
                </div>
                <div className="flex items-center justify-between">
                    <h4 className="text-sm text-[#4B5563]">Pancreas</h4>
                    <div>
                        <Progress value={60} className="[&>div]:bg-[#E5E7EB]" />
                        <p>5%</p>
                    </div>
                </div>

            </div>
        </div>
    )
}

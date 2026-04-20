
export default function TodaysSchedule() {
    return (
        <div className="">
            <h3 className="text-[#111827] font-medium">Today's Schedule (Thursday)</h3>
            <p className="text-sm text-[#4A5565]">Your Plan Study For Today</p>

            <div className="mt-9 space-y-6 mb-5">
                <div className="flex justify-between items-center flex-wrap gap-4 bg-[#EFF6FF] px-6 py-2 rounded-[8px]">
                    <div>
                        <h2 className="text-slate-800 font-medium">Liver & Biliary (Introduction)</h2>
                        <p className="text-sm text-zinc-800">Anatomy, physiology, and basic pathology concepts</p>
                    </div>
                    <button className="px-4 py-2 border border-blue-600 rounded-[6px] bg-white text-blue-600 cursor-pointer">Start</button>
                </div>
                <div className="flex justify-between items-center flex-wrap gap-4 bg-[#F0FDF4] px-6 py-2 rounded-[8px]">
                    <div>
                        <h2 className="text-slate-800 font-medium">Pancreas - Clinical Cases</h2>
                        <p className="text-sm text-zinc-800">Case-based learning and differential diagnosis</p>
                    </div>
                    <button className="px-4 py-2 border border-green-600 rounded-[6px] bg-white text-green-600 cursor-pointer">Start</button>
                </div>
            </div>
        </div>
    )
}


import { useState } from "react"
import { ChevronDown } from "lucide-react"

interface TablistProps<T extends string> {
    title?: string
    description?: string
    tabs: T[]
    activeTab: T
    setTab: (tab: T) => void
    counts?: Partial<Record<T, number>>
}

const MentorCommunityTabs = <T extends string>({
    // title,
    // description,
    tabs,
    activeTab,
    setTab,
    counts,
}: TablistProps<T>) => {
    const [mobileOpen, setMobileOpen] = useState(false)

    return (
        <div className="w-full">
            {/* Title / Description */}
            {/* {(title || description) && (
                <div className="mb-4 md:mb-6 space-y-2">
                    {title && (
                        <h4 className="text-[16px] md:text-[20px] font-semibold text-[#0F172A]">
                            {title}
                        </h4>
                    )}
                    {description && (
                        <p className="text-[14px] md:text-[16px] text-gray-600">{description}</p>
                    )}
                </div>
            )} */}

            {/* Mobile dropdown */}
            <div className="md:hidden relative">
                <button
                    onClick={() => setMobileOpen(!mobileOpen)}
                    className="w-full flex items-center justify-between bg-[#F8FAFC] border border-[#CBD5E1] rounded-full px-4 py-2 text-sm font-medium text-[#0F172A]"
                >
                    {activeTab}
                    <ChevronDown className={`w-4 h-4 transition-transform ${mobileOpen ? "rotate-180" : ""}`} />
                </button>

                {mobileOpen && (
                    <div className="absolute z-10 mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg flex flex-col">
                        {tabs.map((tab) => {
                            const isActive = activeTab === tab
                            return (
                                <button
                                    key={tab}
                                    onClick={() => { setTab(tab); setMobileOpen(false) }}
                                    className={`w-full text-left px-4 py-2 text-sm sm:text-base font-medium transition-colors ${isActive ? "bg-[#0076F5] text-white" : "text-gray-900 hover:bg-gray-100"
                                        }`}
                                >
                                    {tab}
                                    {counts && counts[tab] !== undefined && (
                                        <span className={isActive ? "ml-1 text-white" : "ml-1 text-gray-500"}>
                                            ({counts[tab]!.toString().padStart(2, "0")})
                                        </span>
                                    )}
                                </button>
                            )
                        })}
                    </div>
                )}
            </div>

            {/* Desktop tabs */}
            <div className="hidden md:inline-flex items-center bg-[#F8FAFC] border border-[#CBD5E1] rounded-full p-1">
                {tabs.map((tab) => {
                    const isActive = activeTab === tab
                    return (
                        <button
                            key={tab}
                            onClick={() => setTab(tab)}
                            className={`relative h-[44px] px-5 rounded-full text-sm font-medium transition-colors cursor-pointer
                ${isActive ? "bg-[#0076F5] text-white" : "text-[#0F172A] hover:bg-gray-100"}`}
                        >
                            {tab}
                            {counts && counts[tab] !== undefined && (
                                <span className={isActive ? "ml-1 text-white" : "ml-1 text-gray-500"}>
                                    ({counts[tab]!.toString().padStart(2, "0")})
                                </span>
                            )}
                        </button>
                    )
                })}
            </div>
        </div>
    )
}

export default MentorCommunityTabs

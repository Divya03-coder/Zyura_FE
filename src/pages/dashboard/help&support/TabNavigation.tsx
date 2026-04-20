"use client"

export default function TabNavigation({ activeTab, onTabChange }: {activeTab: string, onTabChange: any}) {
  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "faq", label: "FAQ" },
    { id: "tickets", label: "Tickets" },
  ]

  return (
    <div className="flex gap-2 border-b border-border">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`px-4 py-3 font-medium text-sm transition-colors border-b-2 -mb-px ${
            activeTab === tab.id
              ? "border-primary text-primary bg-blue-50"
              : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  )
}

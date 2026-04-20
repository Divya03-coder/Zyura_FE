import { useEffect } from "react"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

interface Tab {
  id: string
  label: string
}

const tabs: Tab[] = [
  { id: "notification", label: "Notification Setting" },
  { id: "payment", label: "Payment Setting" },
  { id: "privacy", label: "Privacy" },
  { id: "security", label: "Security" },
]

interface SettingsTabsProps {
  activeTab: string
  onTabChange: (tabId: string) => void
}

const SettingsTabs = ({ activeTab, onTabChange }: SettingsTabsProps) => {
  useEffect(() => {
    if (!activeTab) {
      onTabChange("notification")    
    }
  }, [activeTab, onTabChange]);

  return (
    <div
      className="
        mb-8 flex flex-wrap items-center gap-4 rounded-lg border border-border bg-card p-4
        md:flex-row md:items-center
        flex-col
      "
    >
      {tabs.map((tab) => (
        <div
          key={tab.id}
          className="
            flex items-center gap-2
            w-full md:w-auto
          "
        >
          <Checkbox
            id={tab.id}
            checked={activeTab === tab.id}
            onCheckedChange={() => onTabChange(tab.id)}
            className={`cursor-pointer ${
              activeTab === tab.id ? "bg-black text-white" : ""
            }`}
          />
          <Label
            htmlFor={tab.id}
            className="cursor-pointer text-sm font-normal text-foreground"
          >
            {tab.label}
          </Label>
        </div>
      ))}
    </div>
  )
}

export default SettingsTabs;
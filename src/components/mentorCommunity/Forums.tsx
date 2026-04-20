// Forums.tsx
import { useState } from "react"
import { Search, Plus } from "lucide-react"
import ForumList from "./ForumList"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import CreateDiscussion from "./CreateDiscussion"

const Forums = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("")
  const [view, setView] = useState<"list" | "create">("list")

  const handleBackToList = () => {
    setView("list")
  }

  const handleCreateNew = () => {
    setView("create")
  }

  return (
    <div>
      {view === "list" && (
        <div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 sm:mb-6 gap-4 sm:gap-0">
            <div className="flex-1">
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-900">Forums</h2>
              <p className="text-gray-600 text-sm sm:text-base">Connect, learn, and grow with the medical education community</p>
            </div>
            <div className="flex gap-2">
              <button 
                onClick={handleCreateNew}
                className="px-3 py-2 sm:px-4 sm:py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 text-sm sm:text-base cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                New Discussion
              </button>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full md:w-1/2 my-6 sm:my-8">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search by question or keyword"
                className="w-full h-10 pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 text-sm sm:text-base"
              />
            </div>

            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="h-10 w-full sm:w-[180px] bg-white">
                <SelectValue placeholder="Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="anatomy">Anatomy</SelectItem>
                <SelectItem value="cardiology">Cardiology</SelectItem>
                <SelectItem value="neurology">Neurology</SelectItem>
                <SelectItem value="pharmacology">Pharmacology</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <ForumList />
        </div>
      )}

      {view === "create" && <CreateDiscussion onBack={handleBackToList} />}
    </div>
  )
}

export default Forums;
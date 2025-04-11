import { DashboardNav } from "@/components/dashboard-nav"
import { X } from "lucide-react"

export default function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen bg-white flex">
      <DashboardNav />
      <div className="flex-1 flex flex-col">
        <div className="absolute top-4 right-4 z-50 md:hidden">
          <button className="bg-gray-800/60 text-white rounded-full p-2">
            <X className="h-5 w-5" />
          </button>
        </div>
        <main className="flex-1">{children}</main>
      </div>
    </div>
  )
}


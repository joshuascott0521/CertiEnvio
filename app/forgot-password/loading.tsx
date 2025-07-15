import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-sky-400 to-sky-600 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Skeleton className="h-[300px] w-full rounded-xl" />
      </div>
    </main>
  )
}

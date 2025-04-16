import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

interface SkeletonCardProps {
  header?: boolean
  rows?: number
}

export function SkeletonCard({ header = true, rows = 3 }: SkeletonCardProps) {
  return (
    <Card className="w-full">
      {header && (
        <CardHeader className="pb-2">
          <Skeleton className="h-6 w-1/3" />
          <Skeleton className="h-4 w-1/2" />
        </CardHeader>
      )}
      <CardContent className="space-y-4">
        {Array.from({ length: rows }).map((_, i) => (
          <Skeleton key={i} className="h-12 w-full" />
        ))}
      </CardContent>
    </Card>
  )
}

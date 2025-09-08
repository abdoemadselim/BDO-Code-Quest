import { Skeleton } from "@/components/ui/skeleton"

export default function SearchInputSkeleton() {
  return (
    <div className="relative max-w-sm">
      <div className="absolute left-3 top-1/2 transform -translate-y-1/2 z-10">
        <Skeleton className="h-4 w-4" />
      </div>
      <Skeleton className="h-10 w-full rounded-md pl-10" />
    </div>
  )
}
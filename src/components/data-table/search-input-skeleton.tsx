function SearchInputSkeleton() {
    return (
        <div className="py-4 pl-4 sm:px-0 sm:min-w-[400px] w-[100%]">
            <div className="relative max-w-sm">
                {/* Search Icon Skeleton */}
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 bg-gray-200 rounded animate-pulse" />
                
                {/* Input Skeleton */}
                <div className="h-10 bg-gray-200 rounded-md pl-10 animate-pulse" />
            </div>
        </div>
    )
}

export default SearchInputSkeleton
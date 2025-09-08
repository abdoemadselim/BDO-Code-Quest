'use client'

import { Input } from "@/components/ui/input"
import { Search } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from 'use-debounce';

function SearchInput() {
    const { replace } = useRouter()
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const handleSearch = useDebouncedCallback((value) => {
        const params = new URLSearchParams(searchParams);
        if (value) {
            params.set("search", value);
        } else {
            params.delete("search")
        }

        params.set("page", "0");
        replace(`${pathname}?${params.toString()}`)
    }, 300);

    return (
        <div className="py-4 sm:min-w-[400px] w-[100%] sm:px-0 pl-4">
            <div className="relative max-w-sm">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                    placeholder="ابحث عن منتج.."
                    defaultValue={searchParams.get('search')?.toString()}
                    onChange={(event) => handleSearch(event.target.value)}
                    className="pl-10 bg-white"
                />
            </div>
        </div>
    )
}

export default SearchInput
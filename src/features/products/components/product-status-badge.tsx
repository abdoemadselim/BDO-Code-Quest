import clsx from "clsx";
import { Status } from "@/features/products/types/types";

function ProductStatusBadge({ status }: { status: Status }) {
    const containerStyle = {
        "غير متوفر": "bg-red-200",
        "متاح": "bg-green-200",
        "قريباً": "bg-yellow-200"
    }

    const circleStyle = {
        "غير متوفر": "bg-red-500",
        "متاح": "bg-green-500",
        "قريباً": "bg-yellow-500"
    }

    const childStyle = {
        "غير متوفر": "text-red-800",
        "متاح": "text-green-800",
        "قريباً": "text-yellow-800"
    }

    return (
        <div className="lg:text-md pr-8">
            <div className={clsx("flex items-center px-2 gap-4 py-[1px] w-fit rounded-xl", containerStyle[status])}>
                <div className={clsx("w-[10px] h-[10px] rounded-full", circleStyle[status])}></div>
                <p className={childStyle[status]}>{status}</p>
            </div>
        </div>
    )
}

export default ProductStatusBadge;
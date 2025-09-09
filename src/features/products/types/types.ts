export type ProductType = {
    id: number,
    name: string,
    category: string,
    price: number,
    stock: number,
    status: Status,
    created_at: string,
    description: string
}

export type CategoryType = {
    id: number,
    name: string
}

export type Status = "متاح" | "غير متوفر" | "قريباً"

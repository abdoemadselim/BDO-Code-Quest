import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"

function DeleteItemConfirmationDialog({ children, title = "هل أنت متأكد؟", description, handleAction }: { children: React.ReactNode, title?: string, description: string, handleAction: (event: any) => void }) {
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                {children}
            </AlertDialogTrigger>
            <AlertDialogContent className="flex flex-col items-start">
                <AlertDialogHeader >
                    <AlertDialogTitle className="text-right">{title}</AlertDialogTitle>
                    <AlertDialogDescription className="text-right">
                        {description}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>إلغاء</AlertDialogCancel>
                    <AlertDialogAction onClick={handleAction} className="cursor-pointer">متابعة</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default DeleteItemConfirmationDialog
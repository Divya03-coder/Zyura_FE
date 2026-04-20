import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"

interface PostDeleteProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    onConfirm: () => void
    title?: string
    description?: string
    isLoading?: boolean
}

const PostDelete = ({
    open,
    onOpenChange,
    onConfirm,
    title = "Delete Confirmation",
    description = "Are you sure you want to delete this post?",
    isLoading = false,
}: PostDeleteProps) => {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[400px]">
                <AnimatePresence>
                    {open && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.1 }}
                        >
                            <DialogHeader>
                                <DialogTitle className="text-lg font-semibold text-gray-900">
                                    {title}
                                </DialogTitle>
                                <DialogDescription className="text-gray-500">
                                    {description}
                                </DialogDescription>
                            </DialogHeader>

                            <DialogFooter className="flex justify-end gap-2 mt-4">
                                <Button
                                    variant="outline"
                                    onClick={() => onOpenChange(false)}
                                    disabled={isLoading}
                                    className="cursor-pointer"
                                >
                                    Cancel
                                </Button>
                                <Button
                                    variant="destructive"
                                    onClick={onConfirm}
                                    disabled={isLoading}
                                    className="cursor-pointer"
                                >
                                    {isLoading ? "Deleting..." : "Delete"}
                                </Button>
                            </DialogFooter>
                        </motion.div>
                    )}
                </AnimatePresence>
            </DialogContent>
        </Dialog>
    )
}

export default PostDelete;
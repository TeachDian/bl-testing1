import { Button } from "@/common/components/shadcn/ui/button";
import { Typography } from "@/common/components/ui/Typography";
import { LucideAlertCircle } from "lucide-react";

interface DeleteConfirmationModalProps<T> {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    item?: any;
    itemTitle: (item: T) => string;
    message: (item: T) => string;
  }
const DeleteConfirmationModal = <T,>({
  isOpen,
  onClose,
  onConfirm,
  item,
  itemTitle,
  message,
}: DeleteConfirmationModalProps<T>) => {
  if (!isOpen || !item) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <div className="flex gap-2 items-center">
          <LucideAlertCircle size={20} color="red" />
          <Typography variant="h3" className="text-lg font-semibold">
            Confirm Deletion
          </Typography>
        </div>

        <Typography className="py-4">
          {message(item)}
        </Typography>
        <div className="flex gap-4 mt-4">
          <Button onClick={onConfirm} variant="destructive">
            Delete
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;

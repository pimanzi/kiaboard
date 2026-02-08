import { useTranslation } from 'react-i18next';
import { AlertTriangle } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useDeleteTodo } from '@/hooks/useDeleteTodo';
import { toast } from 'sonner';

interface DeleteTaskDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm?: () => void;
  taskId?: number;
  isDeleting?: boolean;
}

export function DeleteTaskDialog({
  open,
  onOpenChange,
  onConfirm,
  taskId,
  isDeleting: externalIsDeleting,
}: DeleteTaskDialogProps) {
  const { t } = useTranslation('tasks');
  const { mutate: deleteTodo, isPending } = useDeleteTodo();

  const isDeleting = externalIsDeleting ?? isPending;

  const handleDelete = () => {
    if (onConfirm) {
      onConfirm();
    } else if (taskId) {
      deleteTodo(taskId, {
        onSuccess: () => {
          toast.success(t('taskDeleted'));
          onOpenChange(false);
        },
        onError: () => {
          toast.error(t('taskDeleteError'));
        },
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-rose-soft flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-rose" />
            </div>
            <DialogTitle>{t('deleteConfirmTitle')}</DialogTitle>
          </div>
          <DialogDescription className="pt-2">
            {t('deleteConfirmMessage')}
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-end gap-2 pt-4">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isDeleting}
          >
            {t('cancel')}
          </Button>
          <Button
            onClick={handleDelete}
            disabled={isDeleting}
            className="bg-rose-soft text-rose hover:bg-rose-soft/80"
          >
            {isDeleting ? t('deleting') : t('deleteTask')}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

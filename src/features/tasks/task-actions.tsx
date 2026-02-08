import { Pencil, Trash2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';

interface TaskActionsProps {
  children: React.ReactNode;
  onEdit: () => void;
  onDelete: () => void;
}

export function TaskActions({ children, onEdit, onDelete }: TaskActionsProps) {
  const { t } = useTranslation('tasks');

  return (
    <Popover>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent
        className="w-40 p-1"
        align="end"
        side="right"
        sideOffset={8}
      >
        <Button
          variant="ghost"
          role="menuitem"
          className="w-full justify-start gap-2 text-[13px] text-ink hover:bg-brand-soft hover:text-brand"
          onClick={onEdit}
        >
          <Pencil className="w-4 h-4" />
          {t('editTask')}
        </Button>
        <Button
          variant="ghost"
          role="menuitem"
          className="w-full justify-start gap-2 text-[13px] text-rose hover:bg-rose-soft hover:text-rose"
          onClick={onDelete}
        >
          <Trash2 className="w-4 h-4" />
          {t('deleteTask')}
        </Button>
      </PopoverContent>
    </Popover>
  );
}

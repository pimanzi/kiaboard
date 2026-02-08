import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { CalendarIcon } from 'lucide-react';
import { format, parseISO } from 'date-fns';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { useUpdateTodo } from '@/hooks/useUpdateTodo';
import type { EnhancedTodo } from '@/contexts/TasksContext';
import { TODO_STATUSES, type TodoStatus } from '@/api/todo';

interface UpdateTaskDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  task: EnhancedTodo;
}

export function UpdateTaskDialog({
  open,
  onOpenChange,
  task,
}: UpdateTaskDialogProps) {
  const { t } = useTranslation('tasks');
  const { mutate: updateTodo, isPending } = useUpdateTodo();

  const [title, setTitle] = useState(task.todo);
  const [description, setDescription] = useState(task.description || '');
  const [startDate, setStartDate] = useState<Date>(parseISO(task.startDate));
  const [endDate, setEndDate] = useState<Date>(parseISO(task.endDate));
  const [status, setStatus] = useState<TodoStatus>(task.status!);

  useEffect(() => {
    if (open) {
      setTitle(task.todo);
      setDescription(task.description || '');
      setStartDate(parseISO(task.startDate));
      setEndDate(parseISO(task.endDate));
      setStatus(task.status!);
    }
  }, [open, task]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const updates = {
      todo: title,
      description,
      startDate: format(startDate, 'yyyy-MM-dd'),
      endDate: format(endDate, 'yyyy-MM-dd'),
      status,
      completed: status === TODO_STATUSES.DONE,
    };

    updateTodo(
      { id: task.id, updates },
      {
        onSuccess: () => {
          onOpenChange(false);
        },
      },
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="sm:max-w-125"
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>{t('updateTask')}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">{t('taskTitle')}</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder={t('taskTitlePlaceholder')}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">{t('taskDescription')}</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder={t('taskDescriptionPlaceholder')}
              rows={3}
              required
            />
          </div>

          <div className="space-y-2">
            <Label>{t('taskStatus')}</Label>
            <Select
              value={status}
              onValueChange={(value) => setStatus(value as TodoStatus)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={TODO_STATUSES.TODO}>
                  {t('statusTodo')}
                </SelectItem>
                <SelectItem value={TODO_STATUSES.IN_PROGRESS}>
                  {t('statusInProgress')}
                </SelectItem>
                <SelectItem value={TODO_STATUSES.NEEDS_REVIEW}>
                  {t('statusNeedsReview')}
                </SelectItem>
                <SelectItem value={TODO_STATUSES.DONE}>
                  {t('statusDone')}
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>{t('startDate')}</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      'w-full justify-start text-left font-normal',
                      !startDate && 'text-muted-foreground',
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {startDate ? format(startDate, 'PPP') : t('pickDate')}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={startDate}
                    onSelect={(date) => date && setStartDate(date)}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label>{t('endDate')}</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      'w-full justify-start text-left font-normal',
                      !endDate && 'text-muted-foreground',
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {endDate ? format(endDate, 'PPP') : t('pickDate')}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={endDate}
                    onSelect={(date) => date && setEndDate(date)}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isPending}
            >
              {t('cancel')}
            </Button>
            <Button
              type="submit"
              disabled={isPending}
              className="bg-brand hover:bg-brand/90"
            >
              {isPending ? t('updating') : t('updateTask')}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

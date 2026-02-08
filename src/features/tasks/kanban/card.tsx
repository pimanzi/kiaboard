import { useState } from 'react';
import {
  MoreHorizontal,
  MessageSquare,
  Paperclip,
  CheckSquare,
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { useDeleteTodo } from '@/hooks/useDeleteTodo';
import type { EnhancedTodo } from '@/contexts/TasksContext';
import { TaskActions } from '../task-actions';
import { DeleteTaskDialog } from '../delete-task-dialog';
import { UpdateTaskDialog } from '../update-task-dialog';

interface TaskCardProps {
  todo: EnhancedTodo;
  description?: string;
  date?: string;
  comments?: number;
  attachments?: number;
  checklist?: { done: number; total: number };
  avatars?: number[];
}

export function TaskCard({
  todo,
  description,
  date,
  comments,
  attachments,
  checklist,
  avatars = [],
}: TaskCardProps) {
  const { t } = useTranslation('tasks');
  const { mutate: deleteTodo, isPending: isDeleting } = useDeleteTodo();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [updateDialogOpen, setUpdateDialogOpen] = useState(false);

  const handleDelete = () => {
    deleteTodo(todo.id, {
      onSuccess: () => {
        setDeleteDialogOpen(false);
      },
    });
  };

  return (
    <div
      data-testid="task-card"
      className="bg-white dark:bg-surface-elevated rounded-xl p-4 border border-border/50 hover:border-border hover:shadow-sm transition-all cursor-pointer"
    >
      {/* Date */}
      {date && (
        <div className="flex items-center gap-2 text-[12px] text-muted-text mb-2">
          <span className="w-1.5 h-1.5 rounded-full bg-mint" />
          {date}
        </div>
      )}

      {/* Title and More Button */}
      <div className="flex items-start justify-between gap-2 mb-1">
        <h4 className="text-[14px] font-semibold text-ink dark:text-foreground line-clamp-1 flex-1">
          {todo.todo}
        </h4>
        <TaskActions
          onEdit={() => setUpdateDialogOpen(true)}
          onDelete={() => setDeleteDialogOpen(true)}
        >
          <Button variant="ghost" size="icon" className="h-6 w-6 shrink-0">
            <MoreHorizontal className="w-4 h-4" />
          </Button>
        </TaskActions>
      </div>

      {/* Description */}
      {description && (
        <p className="text-[12px] text-muted-text mb-3">{description}</p>
      )}

      {/* Checklist Progress */}
      {checklist && (
        <div className="mb-3">
          <div className="flex items-center gap-2 text-[12px] text-muted-text mb-1.5">
            <CheckSquare className="w-4 h-4" />
            <span>{t('checklist')}</span>
            <span className="ml-auto font-medium">
              {checklist.done}/{checklist.total}
            </span>
          </div>
          <div className="flex gap-1">
            {Array.from({ length: checklist.total }).map((_, i) => (
              <div
                key={i}
                className={`h-1.5 flex-1 rounded-full ${
                  i < checklist.done ? 'bg-mint' : 'bg-border'
                }`}
              />
            ))}
          </div>
        </div>
      )}

      {/* Footer: Comments, Attachments, Avatars */}
      <div className="flex items-center justify-between pt-2">
        <div className="flex items-center gap-2 text-[12px] text-muted-text">
          {comments !== undefined && (
            <Button
              variant="ghost"
              size="sm"
              className="h-6 px-2 gap-1 text-[12px]"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              {comments}
            </Button>
          )}
          {attachments !== undefined && (
            <Button
              variant="ghost"
              size="sm"
              className="h-6 px-2 gap-1 text-[12px]"
            >
              <Paperclip className="w-3.5 h-3.5" />
              {attachments}
            </Button>
          )}
        </div>

        {avatars.length > 0 && (
          <div className="flex -space-x-2">
            {avatars.slice(0, 3).map((avatarNum, i) => (
              <div
                key={i}
                className="w-6 h-6 rounded-full border-2 border-white dark:border-surface-elevated overflow-hidden"
              >
                <img
                  src={`/images/headshots/avatar${avatarNum}.jpg`}
                  alt="User"
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        )}
      </div>

      <DeleteTaskDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={handleDelete}
        isDeleting={isDeleting}
      />

      <UpdateTaskDialog
        open={updateDialogOpen}
        onOpenChange={setUpdateDialogOpen}
        task={todo}
      />
    </div>
  );
}

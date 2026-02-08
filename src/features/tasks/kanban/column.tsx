import { useState } from 'react';
import { Plus } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { compareDesc, compareAsc, parseISO } from 'date-fns';
import { Button } from '@/components/ui/button';
import type { TodoStatus } from '@/api/todo';
import type { EnhancedTodo } from '@/contexts/TasksContext';
import { TaskCard } from './card';
import { AddTaskDialog } from '../add-task-dialog';
import { formatDateForDisplay } from '@/lib/helpers';

interface ColumnProps {
  title: string;
  status: TodoStatus;
  color: string;
  icon?: React.ReactNode;
  todos: EnhancedTodo[];
  statusFilter: string;
  sortOrder: string;
  hasActiveFilter: boolean;
}

export function Column({
  title,
  status,
  color,
  icon,
  todos,
  statusFilter,
  sortOrder,
  hasActiveFilter,
}: ColumnProps) {
  const { t, i18n } = useTranslation('tasks');
  const [dialogOpen, setDialogOpen] = useState(false);

  const filteredTodos =
    statusFilter === 'all' || statusFilter === status ? todos : [];

  const sortedTodos = [...filteredTodos].sort((a, b) => {
    const dateA = parseISO(a.endDate);
    const dateB = parseISO(b.endDate);
    return sortOrder === 'newest'
      ? compareDesc(dateA, dateB)
      : compareAsc(dateA, dateB);
  });

  const isEmpty = sortedTodos.length === 0;
  const isFiltered = hasActiveFilter && statusFilter !== status;

  return (
    <>
      <AddTaskDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        defaultStatus={status}
      />
      <div data-testid="kanban-column" className=" rounded-xl p-3 h-fit">
        {/* Column Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7"
              onClick={() => setDialogOpen(true)}
            >
              <Plus className="w-4 h-4" />
            </Button>
            <h3 className="text-sm font-semibold text-ink ">{title}</h3>
          </div>
          <span
            className={`flex items-center gap-1.5 text-[12px]  px-2 py-1 rounded-full font-semibold ${color}`}
          >
            {icon}
            {sortedTodos.length}
          </span>
        </div>

        {/* Cards Container */}
        <div
          className={`space-y-3 max-h-[calc(100vh-180px)] overflow-y-auto pr-1 scrollbar-brand ${isFiltered ? 'opacity-50' : ''}`}
        >
          {isEmpty ? (
            <div className="text-center py-10 text-[13px] text-muted-text">
              {hasActiveFilter ? t('noTasksFilter') : t('noTasks')}
            </div>
          ) : (
            sortedTodos.map((todo) => (
              <TaskCard
                key={todo.id}
                todo={todo}
                description={todo.description}
                date={formatDateForDisplay(todo.endDate, i18n.language)}
                avatars={todo.avatars}
                comments={todo.comments}
                attachments={todo.attachments}
                checklist={todo.checklist}
              />
            ))
          )}
        </div>
      </div>
    </>
  );
}

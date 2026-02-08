import { PenSquare, Settings2, Clock, CheckCircle2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useTasks } from '@/contexts/TasksContext';
import { TODO_STATUSES } from '@/api/todo';
import { Loader } from '@/components/ui/loader';
import { Column } from './column';

interface KanbanBoardProps {
  statusFilter: string;
  sortOrder: string;
  searchQuery: string;
}

export function KanbanBoard({
  statusFilter,
  sortOrder,
  searchQuery,
}: KanbanBoardProps) {
  const { t } = useTranslation('tasks');
  const { tasks, isLoading } = useTasks();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader />
      </div>
    );
  }

  const filteredTasks = searchQuery
    ? tasks.filter((task) =>
        task.todo.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : tasks;

  const todoTasks = filteredTasks.filter(
    (task) => task.status === TODO_STATUSES.TODO,
  );
  const inProgressTasks = filteredTasks.filter(
    (task) => task.status === TODO_STATUSES.IN_PROGRESS,
  );
  const needReviewTasks = filteredTasks.filter(
    (task) => task.status === TODO_STATUSES.NEEDS_REVIEW,
  );
  const doneTasks = filteredTasks.filter(
    (task) => task.status === TODO_STATUSES.DONE,
  );

  const hasActiveFilter = statusFilter !== 'all';

  return (
    <div
      data-testid="kanban-board"
      className="bg-surface dark:bg-surface grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4"
    >
      <Column
        title={t('columnTodo')}
        status={TODO_STATUSES.TODO}
        color="bg-brand-soft text-brand"
        icon={<PenSquare className="w-3.5 h-3.5" />}
        todos={todoTasks}
        statusFilter={statusFilter}
        sortOrder={sortOrder}
        hasActiveFilter={hasActiveFilter}
      />
      <Column
        title={t('columnInProgress')}
        status={TODO_STATUSES.IN_PROGRESS}
        color="bg-amber-soft text-amber"
        icon={<Settings2 className="w-3.5 h-3.5" />}
        todos={inProgressTasks}
        statusFilter={statusFilter}
        sortOrder={sortOrder}
        hasActiveFilter={hasActiveFilter}
      />
      <Column
        title={t('columnNeedReview')}
        status={TODO_STATUSES.NEEDS_REVIEW}
        color="bg-rose-soft text-rose"
        icon={<Clock className="w-3.5 h-3.5" />}
        todos={needReviewTasks}
        statusFilter={statusFilter}
        sortOrder={sortOrder}
        hasActiveFilter={hasActiveFilter}
      />
      <Column
        title={t('columnDone')}
        status={TODO_STATUSES.DONE}
        color="bg-mint-soft text-mint"
        icon={<CheckCircle2 className="w-3.5 h-3.5" />}
        todos={doneTasks}
        statusFilter={statusFilter}
        sortOrder={sortOrder}
        hasActiveFilter={hasActiveFilter}
      />
    </div>
  );
}

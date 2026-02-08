import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { PenSquare, Settings2, Clock, CheckCircle2 } from 'lucide-react';
import { useTasks } from '@/contexts/TasksContext';
import { TODO_STATUSES } from '@/api/todo';
import { Loader } from '@/components/ui/loader';
import { StatusGroup } from './status-group';

interface TaskListProps {
  statusFilter: string;
  sortOrder: string;
  searchQuery: string;
}

export function TaskList({
  statusFilter,
  sortOrder,
  searchQuery,
}: TaskListProps) {
  const { t } = useTranslation('tasks');
  const { tasks, isLoading } = useTasks();

  // Filter tasks based on search query
  const filteredTasks = useMemo(() => {
    if (!searchQuery) return tasks;
    return tasks.filter((task) =>
      task.todo.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [tasks, searchQuery]);

  // Group tasks by status
  const groupedTasks = useMemo(() => {
    return {
      [TODO_STATUSES.TODO]: filteredTasks.filter(
        (task) => task.status === TODO_STATUSES.TODO,
      ),
      [TODO_STATUSES.IN_PROGRESS]: filteredTasks.filter(
        (task) => task.status === TODO_STATUSES.IN_PROGRESS,
      ),
      [TODO_STATUSES.NEEDS_REVIEW]: filteredTasks.filter(
        (task) => task.status === TODO_STATUSES.NEEDS_REVIEW,
      ),
      [TODO_STATUSES.DONE]: filteredTasks.filter(
        (task) => task.status === TODO_STATUSES.DONE,
      ),
    };
  }, [filteredTasks]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader />
      </div>
    );
  }

  const statusConfig = [
    {
      status: TODO_STATUSES.TODO,
      title: t('columnTodo'),
      icon: <PenSquare className="w-4 h-4" />,
      color: 'text-brand',
      bgColor: 'bg-brand-soft',
    },
    {
      status: TODO_STATUSES.IN_PROGRESS,
      title: t('columnInProgress'),
      icon: <Settings2 className="w-4 h-4" />,
      color: 'text-amber',
      bgColor: 'bg-amber-soft',
    },
    {
      status: TODO_STATUSES.NEEDS_REVIEW,
      title: t('columnNeedReview'),
      icon: <Clock className="w-4 h-4" />,
      color: 'text-rose',
      bgColor: 'bg-rose-soft',
    },
    {
      status: TODO_STATUSES.DONE,
      title: t('columnDone'),
      icon: <CheckCircle2 className="w-4 h-4" />,
      color: 'text-mint',
      bgColor: 'bg-mint-soft',
    },
  ];

  // Filter status groups based on statusFilter
  const visibleGroups =
    statusFilter === 'all'
      ? statusConfig
      : statusConfig.filter((config) => config.status === statusFilter);

  return (
    <div data-testid="task-list" className="space-y-6">
      {visibleGroups.map((config) => (
        <StatusGroup
          key={config.status}
          status={config.status}
          title={config.title}
          icon={config.icon}
          color={config.color}
          bgColor={config.bgColor}
          tasks={groupedTasks[config.status]}
          sortOrder={sortOrder}
        />
      ))}
    </div>
  );
}

import { useMemo, useState } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  flexRender,
  type ColumnDef,
  type SortingState,
} from '@tanstack/react-table';
import { useTranslation } from 'react-i18next';
import { parseISO, compareDesc, compareAsc } from 'date-fns';
import {
  Type,
  Calendar,
  Activity,
  Paperclip,
  Users,
  MoreHorizontal,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import type { EnhancedTodo } from '@/contexts/TasksContext';
import { Button } from '@/components/ui/button';
import { TaskActions } from '../task-actions';
import { DeleteTaskDialog } from '../delete-task-dialog';
import { UpdateTaskDialog } from '../update-task-dialog';
import { formatDateForDisplay } from '@/lib/helpers';

interface TaskTableProps {
  tasks: EnhancedTodo[];
  sortOrder: string;
}

function PriorityBadge({ priority }: { priority: 'high' | 'medium' | 'low' }) {
  const { t } = useTranslation('tasks');

  const config = {
    high: {
      label: t('list.priorityHigh'),
      className: 'text-rose bg-rose-soft',
    },
    medium: {
      label: t('list.priorityMedium'),
      className: 'text-amber bg-amber-soft',
    },
    low: {
      label: t('list.priorityLow'),
      className: 'text-mint bg-mint-soft',
    },
  };

  const { label, className } = config[priority];

  return (
    <span
      className={`text-[12px] font-medium px-2.5 py-1 rounded-md ${className}`}
    >
      {label}
    </span>
  );
}

function getRandomPriority(): 'high' | 'medium' | 'low' {
  const priorities: ('high' | 'medium' | 'low')[] = ['high', 'medium', 'low'];
  return priorities[Math.floor(Math.random() * priorities.length)];
}

function getRandomAttachment(): string {
  const names = [
    'requirements.doc',
    'file_new.doc',
    'onboarding_2024.pdf',
    'e134918aks.pdf',
    'training_new_emp.pdf',
    'coaching_dec_2024.pdf',
    'guidance.pdf',
    'payroll_jul_temp.doc',
    'employee2024.doc',
    'aqoq214192.doc',
  ];
  return names[Math.floor(Math.random() * names.length)];
}

export function TaskTable({ tasks, sortOrder }: TaskTableProps) {
  const { t, i18n } = useTranslation('tasks');
  const [sorting, setSorting] = useState<SortingState>([]);
  const [selectedTask, setSelectedTask] = useState<EnhancedTodo | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [updateDialogOpen, setUpdateDialogOpen] = useState(false);

  const sortedTasks = useMemo(() => {
    return [...tasks].sort((a, b) => {
      const dateA = parseISO(a.endDate);
      const dateB = parseISO(b.endDate);
      return sortOrder === 'newest' ? compareDesc(dateA, dateB) : compareAsc(dateA, dateB);
    });
  }, [tasks, sortOrder]);

  const enhancedTasks = useMemo(() => {
    return sortedTasks.map((task) => ({
      ...task,
      priority: getRandomPriority(),
      attachmentName: getRandomAttachment(),
    }));
  }, [sortedTasks]);

  const handleEdit = (task: EnhancedTodo) => {
    setSelectedTask(task);
    setUpdateDialogOpen(true);
  };

  const handleDelete = (task: EnhancedTodo) => {
    setSelectedTask(task);
    setDeleteDialogOpen(true);
  };

  const columns = useMemo<ColumnDef<(typeof enhancedTasks)[0]>[]>(
    () => [
      {
        id: 'select',
        header: () => (
          <input
            type="checkbox"
            className="w-4 h-4 rounded border-border text-brand focus:ring-brand cursor-pointer"
          />
        ),
        cell: () => (
          <input
            type="checkbox"
            className="w-4 h-4 rounded border-border text-brand focus:ring-brand cursor-pointer"
          />
        ),
        size: 40,
      },
      {
        accessorKey: 'todo',
        header: () => (
          <div className="flex items-center gap-2 text-slate">
            <Type className="w-4 h-4" />
            <span>{t('list.columnName')}</span>
          </div>
        ),
        cell: ({ row }) => (
          <span className="text-[13px] font-medium text-ink dark:text-foreground truncate max-w-45 block">
            {row.original.todo.length > 22
              ? `${row.original.todo.substring(0, 22)}...`
              : row.original.todo}
          </span>
        ),
        size: 200,
      },
      {
        accessorKey: 'dates',
        header: () => (
          <div className="flex items-center gap-2 text-slate">
            <Calendar className="w-4 h-4" />
            <span>{t('list.columnDates')}</span>
          </div>
        ),
        cell: ({ row }) => (
          <span className="text-[12px] text-muted-text whitespace-nowrap">
            {formatDateForDisplay(row.original.startDate, i18n.language)} -{' '}
            {formatDateForDisplay(row.original.endDate, i18n.language)}
          </span>
        ),
        size: 220,
      },
      {
        accessorKey: 'priority',
        header: () => (
          <div className="flex items-center gap-2 text-slate">
            <Activity className="w-4 h-4" />
            <span>{t('list.columnStatus')}</span>
          </div>
        ),
        cell: ({ row }) => <PriorityBadge priority={row.original.priority} />,
        size: 100,
      },
      {
        accessorKey: 'attachment',
        header: () => (
          <div className="flex items-center gap-2 text-slate">
            <Paperclip className="w-4 h-4" />
            <span>{t('list.columnAttachment')}</span>
          </div>
        ),
        cell: ({ row }) => (
          <div className="flex items-center gap-2">
            <Paperclip className="w-3.5 h-3.5 text-brand" />
            <span className="text-[12px] text-slate">
              {row.original.attachmentName}
            </span>
            <Button
              variant="ghost"
              size="icon"
              className="h-5 w-5 p-0 text-muted-text hover:text-slate"
            >
              <MoreHorizontal className="w-4 h-4" />
            </Button>
          </div>
        ),
        size: 180,
      },
      {
        accessorKey: 'people',
        header: () => (
          <div className="flex items-center gap-2 text-slate">
            <Users className="w-4 h-4" />
            <span>{t('list.columnPeople')}</span>
          </div>
        ),
        cell: ({ row }) => (
          <div className="flex -space-x-2">
            {row.original.avatars.slice(0, 3).map((avatarNum, index) => (
              <div
                key={index}
                className="w-7 h-7 rounded-full border-2 border-white dark:border-surface-elevated overflow-hidden cursor-pointer"
                style={{ zIndex: index + 1 }}
              >
                <img
                  src={`/images/headshots/avatar${avatarNum}.jpg`}
                  alt="User"
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        ),
        size: 120,
      },
      {
        id: 'actions',
        header: () => (
          <Button
            variant="ghost"
            size="icon"
            className="h-5 w-5 p-0 text-muted-text hover:text-slate"
          >
            <MoreHorizontal className="w-4 h-4" />
          </Button>
        ),
        cell: ({ row }) => (
          <TaskActions
            onEdit={() => handleEdit(row.original)}
            onDelete={() => handleDelete(row.original)}
          >
            <Button
              variant="ghost"
              size="icon"
              className="h-5 w-5 p-0 text-muted-text hover:text-slate"
            >
              <MoreHorizontal className="w-4 h-4" />
            </Button>
          </TaskActions>
        ),
        size: 40,
      },
    ],
    [t, i18n.language],
  );

  const table = useReactTable({
    data: enhancedTasks,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize: 5,
      },
    },
  });

  if (tasks.length === 0) {
    return (
      <div className="text-center py-8 text-[13px] text-muted-text">
        {t('noTasks')}
      </div>
    );
  }

  return (
    <>
      <div className="space-y-3">
        <div className="overflow-x-auto rounded-lg border border-border">
          <table className="w-full min-w-200">
            <thead className="bg-surface dark:bg-surface-elevated">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className="px-4 py-3 text-left text-[12px] font-medium text-slate border-b border-border"
                      style={{ width: header.getSize() }}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>

            <tbody className="bg-neutral dark:bg-surface">
              {table.getRowModel().rows.map((row) => (
                <tr
                  key={row.id}
                  className="border-b border-border last:border-b-0 hover:bg-surface dark:hover:bg-surface-elevated transition-colors"
                >
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      className="px-4 py-3"
                      style={{ width: cell.column.getSize() }}
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {table.getPageCount() > 1 && (
          <div className="flex items-center justify-between px-2">
            <span className="text-[12px] text-muted-text">
              {t('list.page')} {table.getState().pagination.pageIndex + 1}{' '}
              {t('list.of')} {table.getPageCount()}
            </span>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
                className="h-8 px-3 text-[12px]"
              >
                <ChevronLeft className="w-4 h-4 mr-1" />
                {t('list.previous')}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
                className="h-8 px-3 text-[12px]"
              >
                {t('list.next')}
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </div>
        )}
      </div>

      {selectedTask && (
        <>
          <DeleteTaskDialog
            open={deleteDialogOpen}
            onOpenChange={setDeleteDialogOpen}
            taskId={selectedTask.id}
          />

          <UpdateTaskDialog
            open={updateDialogOpen}
            onOpenChange={setUpdateDialogOpen}
            task={selectedTask}
          />
        </>
      )}
    </>
  );
}

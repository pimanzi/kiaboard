import { useMutation } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';
import { updateTodo } from '@/api/todo';
import { useTasks } from '@/contexts/TasksContext';
import { isLocalTaskId } from '@/lib/localStorage';
import type { Todo } from '@/api/todo';
import type { EnhancedTodo } from '@/contexts/TasksContext';

export function useUpdateTodo() {
  const { updateTask } = useTasks();
  const { t } = useTranslation('tasks');

  return useMutation<
    Todo,
    Error,
    { id: number; updates: Partial<EnhancedTodo> }
  >({
    mutationFn: async ({ id, updates }) => {
      // Skip API call for locally created tasks (DummyJSON doesn't persist them)
      if (isLocalTaskId(id)) {
        return {
          id,
          todo: updates.todo || '',
          completed: updates.completed || false,
          userId: 1,
          status: updates.status,
        } as Todo;
      }

      // Call the API for real tasks
      const result = await updateTodo(id, {
        todo: updates.todo,
        completed: updates.completed,
      });
      return result;
    },
    onSuccess: (_data, { id, updates }) => {
      // Update localStorage for all tasks
      updateTask(id, updates);
      toast.success(t('taskUpdated'));
    },
    onError: (error) => {
      console.error('Failed to update task:', error);
      toast.error(t('taskUpdateFailed'));
    },
  });
}

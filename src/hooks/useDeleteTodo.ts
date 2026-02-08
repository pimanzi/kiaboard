import { useMutation } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';
import { deleteTodo } from '@/api/todo';
import { useTasks } from '@/contexts/TasksContext';
import { isLocalTaskId, removeLocalTaskId } from '@/lib/localStorage';

export function useDeleteTodo() {
  const { deleteTask } = useTasks();
  const { t } = useTranslation('tasks');

  return useMutation<void, Error, number>({
    mutationFn: async (id: number) => {
      // Skip API call for locally created tasks (DummyJSON doesn't persist them)
      if (isLocalTaskId(id)) {
        return; // Just return, no API call needed
      }

      // Call the API for real tasks
      await deleteTodo(id);
    },
    onSuccess: (_data, id) => {
      // Remove from local tracking if it was a local task
      if (isLocalTaskId(id)) {
        removeLocalTaskId(id);
      }
      // Delete from localStorage for all tasks
      deleteTask(id);
      toast.success(t('taskDeleted'));
    },
    onError: (error) => {
      console.error('Failed to delete task:', error);
      toast.error(t('taskDeleteFailed'));
    },
  });
}

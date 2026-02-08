import { useMutation } from '@tanstack/react-query';
import { deleteTodo } from '@/api/todo';
import { useTasks } from '@/contexts/TasksContext';
import type { EnhancedTodo } from '@/contexts/TasksContext';

export function useDeleteTodo() {
  const { deleteTask, addTask, tasks } = useTasks();

  return useMutation<{ id: number; isDeleted: boolean }, Error, number, EnhancedTodo | undefined>({
    mutationFn: async (id: number) => {
      const result = await deleteTodo(id);
      deleteTask(id);
      return result;
    },
    onMutate: (id) => {
      const previousTask = tasks.find(t => t.id === id);
      return previousTask;
    },
    onError: (_error, _id, previousTask) => {
      if (previousTask) {
        addTask(previousTask);
      }
    },
  });
}

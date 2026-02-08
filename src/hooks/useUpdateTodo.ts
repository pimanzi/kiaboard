import { useMutation } from '@tanstack/react-query';
import { updateTodo, type Todo } from '@/api/todo';
import { useTasks } from '@/contexts/TasksContext';
import type { EnhancedTodo } from '@/contexts/TasksContext';

export function useUpdateTodo() {
  const { updateTask, tasks } = useTasks();

  return useMutation<
    Todo,
    Error,
    { id: number; updates: Partial<EnhancedTodo> },
    EnhancedTodo | undefined
  >({
    mutationFn: async ({ id, updates }) => {
      const result = await updateTodo(id, {
        todo: updates.todo,
        completed: updates.completed,
      });
      updateTask(id, updates);
      return result;
    },
    onMutate: ({ id }) => {
      const previousTask = tasks.find((t) => t.id === id);
      return previousTask;
    },
    onError: (_error, { id }, previousTask) => {
      if (previousTask) {
        updateTask(id, previousTask);
      }
    },
  });
}

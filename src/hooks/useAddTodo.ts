import { useMutation } from '@tanstack/react-query';
import { addTodo, type CreateTodoInput } from '@/api/todo';
import { useTasks } from '@/contexts/TasksContext';
import type { EnhancedTodo } from '@/contexts/TasksContext';

export function useAddTodo() {
  const { addTask, deleteTask } = useTasks();

  return useMutation({
    mutationFn: ({ apiData, optimisticTask }: { apiData: CreateTodoInput; optimisticTask: EnhancedTodo }) => {
      addTask(optimisticTask);
      return addTodo(apiData);
    },
    onError: (_error, { optimisticTask }) => {
      deleteTask(optimisticTask.id);
    },
  });
}

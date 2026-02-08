import { useMutation } from '@tanstack/react-query';
import { addTodo, type CreateTodoInput } from '@/api/todo';
import { useTasks } from '@/contexts/TasksContext';
import { addLocalTaskId } from '@/lib/localStorage';
import type { EnhancedTodo } from '@/contexts/TasksContext';

export function useAddTodo() {
  const { addTask } = useTasks();

  return useMutation({
    mutationFn: async ({
      apiData,
      taskData,
    }: {
      apiData: CreateTodoInput;
      taskData: Omit<EnhancedTodo, 'id' | 'todo' | 'completed' | 'userId'>;
    }) => {
      // Call API first to get the real ID from server
      const apiResponse = await addTodo(apiData);

      // Return the complete task with real ID from API
      const completeTask: EnhancedTodo = {
        ...apiResponse,
        ...taskData,
      };

      return completeTask;
    },
    onSuccess: (completeTask) => {
      // Track this ID as locally created (DummyJSON doesn't actually persist it)
      addLocalTaskId(completeTask.id);
      // Add task to localStorage with real server ID
      addTask(completeTask);
    },
  });
}

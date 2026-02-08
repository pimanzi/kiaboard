import { useQuery } from '@tanstack/react-query';
import { fetchTodos, fetchTodoById } from '@/api/todo';
import { TODOS_QUERY_KEY } from './queryKeys';

/**
 * Hook to fetch all todos
 */
export function useTodos(limit?: number, skip?: number) {
  return useQuery({
    queryKey: [...TODOS_QUERY_KEY, { limit, skip }],
    queryFn: () => fetchTodos(limit, skip),
  });
}

/**
 * Hook to fetch a single todo by ID
 */
export function useTodo(id: number) {
  return useQuery({
    queryKey: [...TODOS_QUERY_KEY, id],
    queryFn: () => fetchTodoById(id),
    enabled: !!id,
  });
}

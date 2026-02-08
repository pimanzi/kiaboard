import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
      refetchOnWindowFocus: true,
      retry: 1,
      refetchOnMount: false, // Does not  refetch if data is fresh
    },
    mutations: {
      retry: 1,
    },
  },
});

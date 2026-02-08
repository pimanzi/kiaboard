import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';
import { useTodos } from '@/hooks/useTodos';
import type { Todo } from '@/api/todo';
import { getItem, setItem } from '@/lib/localStorage';
import { enhanceTodo } from '@/lib/helpers';

export interface EnhancedTodo extends Todo {
  description: string;
  startDate: string;
  endDate: string;
  comments: number;
  attachments: number;
  checklist?: { done: number; total: number };
  avatars: number[];
}

interface TasksContextType {
  tasks: EnhancedTodo[];
  isLoading: boolean;
  addTask: (task: EnhancedTodo) => void;
  updateTask: (id: number, updates: Partial<EnhancedTodo>) => void;
  deleteTask: (id: number) => void;
}

const TasksContext = createContext<TasksContextType | undefined>(undefined);

export function TasksProvider({ children }: { children: ReactNode }) {
  const [tasks, setTasks] = useState<EnhancedTodo[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);
  const { data, isLoading: isFetching } = useTodos(50);

  useEffect(() => {
    const storedTasks = getItem<EnhancedTodo[]>('tasks');

    // Only use stored tasks if they look valid (reasonable IDs)
    if (storedTasks && storedTasks.length > 0) {
      const validTasks = storedTasks.filter((task) => {
        return task.id > 0;
      });

      if (validTasks.length > 0) {
        setTasks(validTasks);
        setIsInitialized(true);
        // Update localStorage with cleaned tasks
        if (validTasks.length !== storedTasks.length) {
          setItem('tasks', validTasks);
        }
      } else if (data?.todos) {
        // If no valid tasks, use fresh data from API
        const enhancedTasks = data.todos.map(enhanceTodo);
        setTasks(enhancedTasks);
        setItem('tasks', enhancedTasks);
        setIsInitialized(true);
      }
    } else if (data?.todos) {
      const enhancedTasks = data.todos.map(enhanceTodo);
      setTasks(enhancedTasks);
      setItem('tasks', enhancedTasks);
      setIsInitialized(true);
    }
  }, [data]);

  useEffect(() => {
    if (isInitialized && tasks.length > 0) {
      setItem('tasks', tasks);
    }
  }, [tasks, isInitialized]);

  const addTask = (task: EnhancedTodo) => {
    setTasks((prev) => [task, ...prev]);
  };

  const updateTask = (id: number, updates: Partial<EnhancedTodo>) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, ...updates } : task)),
    );
  };

  const deleteTask = (id: number) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  return (
    <TasksContext.Provider
      value={{
        tasks,
        isLoading: !isInitialized && isFetching,
        addTask,
        updateTask,
        deleteTask,
      }}
    >
      {children}
    </TasksContext.Provider>
  );
}

export function useTasks() {
  const context = useContext(TasksContext);
  if (!context) {
    throw new Error('useTasks must be used within TasksProvider');
  }
  return context;
}

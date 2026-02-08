const BASE_URL = 'https://dummyjson.com';

export const TODO_STATUSES = {
  TODO: 'todo',
  IN_PROGRESS: 'inProgress',
  NEEDS_REVIEW: 'needsReview',
  DONE: 'done',
} as const;

export type TodoStatus = typeof TODO_STATUSES[keyof typeof TODO_STATUSES];

export interface Todo {
  id: number;
  todo: string;
  completed: boolean;
  userId: number;
  status?: TodoStatus;
}

export interface TodosResponse {
  todos: Todo[];
  total: number;
  skip: number;
  limit: number;
}

export interface CreateTodoInput {
  todo: string;
  completed: boolean;
  userId: number;
}

export interface UpdateTodoInput {
  todo?: string;
  completed?: boolean;
}

/**
 * Fetch with timeout
 */
async function fetchWithTimeout(url: string, options: RequestInit = {}, timeout = 10000) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);
  
  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });
    clearTimeout(timeoutId);
    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    if (error instanceof Error && error.name === 'AbortError') {
      throw new Error('Request timeout');
    }
    throw error;
  }
}

/**
 * Assigns a status to a todo based on its completed state
 * Only assigns if status doesn't already exist
 */
function assignStatus(todo: Todo): Todo {
  if (todo.status) {
    return todo;
  }
  
  if (todo.completed) {
    const status = Math.random() < 0.7 ? TODO_STATUSES.DONE : TODO_STATUSES.NEEDS_REVIEW;
    return { ...todo, status };
  } else {
    const status = Math.random() < 0.6 ? TODO_STATUSES.TODO : TODO_STATUSES.IN_PROGRESS;
    return { ...todo, status };
  }
}

/**
 * Fetches all todos with optional pagination
 */
export async function fetchTodos(
  limit: number = 100,
  skip: number = 0
): Promise<TodosResponse> {
  try {
    const response = await fetchWithTimeout(`${BASE_URL}/todos?limit=${limit}&skip=${skip}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data: TodosResponse = await response.json();
    
    return {
      ...data,
      todos: data.todos.map(assignStatus),
    };
  } catch (error) {
    throw new Error(`Failed to fetch todos: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Fetches a single todo by ID
 */
export async function fetchTodoById(id: number): Promise<Todo> {
  try {
    const response = await fetchWithTimeout(`${BASE_URL}/todos/${id}`);
    
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error(`Todo with id ${id} not found`);
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const todo: Todo = await response.json();
    return assignStatus(todo);
  } catch (error) {
    throw new Error(`Failed to fetch todo by id: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Creates a new todo
 */
export async function addTodo(newTodo: CreateTodoInput): Promise<Todo> {
  try {
    const response = await fetchWithTimeout(`${BASE_URL}/todos/add`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newTodo),
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const todo: Todo = await response.json();
    return assignStatus(todo);
  } catch (error) {
    throw new Error(`Failed to add todo: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Updates an existing todo
 */
export async function updateTodo(
  id: number,
  updates: UpdateTodoInput
): Promise<Todo> {
  try {
    const response = await fetchWithTimeout(`${BASE_URL}/todos/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates),
    });
    
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error(`Todo with id ${id} not found`);
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const todo: Todo = await response.json();
    return assignStatus(todo);
  } catch (error) {
    throw new Error(`Failed to update todo: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Deletes a todo by ID
 */
export async function deleteTodo(id: number): Promise<{ id: number; isDeleted: boolean }> {
  try {
    const response = await fetchWithTimeout(`${BASE_URL}/todos/${id}`, {
      method: 'DELETE',
    });
    
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error(`Todo with id ${id} not found`);
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const result = await response.json();
    return { 
      id: result.id || id, 
      isDeleted: result.isDeleted ?? true
    };
  } catch (error) {
    throw new Error(`Failed to delete todo: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

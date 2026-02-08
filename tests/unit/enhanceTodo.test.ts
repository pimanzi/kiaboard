import { enhanceTodo } from '@/lib/helpers';
import { TODO_STATUSES } from '@/api/todo';
import type { Todo } from '@/api/todo';

describe('enhanceTodo', () => {
  const mockTodo: Todo = {
    id: 1,
    todo: 'Test task',
    completed: false,
    userId: 1,
  };

  it('should add all required enhancement fields', () => {
    const result = enhanceTodo(mockTodo);

    expect(result).toHaveProperty('description');
    expect(result).toHaveProperty('startDate');
    expect(result).toHaveProperty('endDate');
    expect(result).toHaveProperty('comments');
    expect(result).toHaveProperty('attachments');
    expect(result).toHaveProperty('avatars');
    expect(result).toHaveProperty('status');
  });

  it('should assign TODO or IN_PROGRESS status for incomplete tasks', () => {
    const result = enhanceTodo(mockTodo);

    expect([TODO_STATUSES.TODO, TODO_STATUSES.IN_PROGRESS]).toContain(
      result.status,
    );
  });

  it('should assign DONE or NEEDS_REVIEW status for completed tasks', () => {
    const completedTodo = { ...mockTodo, completed: true };
    const result = enhanceTodo(completedTodo);

    expect([TODO_STATUSES.DONE, TODO_STATUSES.NEEDS_REVIEW]).toContain(
      result.status,
    );
  });

  it('should generate avatars array with 1-3 numbers', () => {
    const result = enhanceTodo(mockTodo);

    expect(Array.isArray(result.avatars)).toBe(true);
    expect(result.avatars.length).toBeGreaterThanOrEqual(1);
    expect(result.avatars.length).toBeLessThanOrEqual(3);
    result.avatars.forEach((avatar) => {
      expect([1, 2, 3]).toContain(avatar);
    });
  });

  it('should generate comments between 1 and 25', () => {
    const result = enhanceTodo(mockTodo);

    expect(result.comments).toBeGreaterThanOrEqual(1);
    expect(result.comments).toBeLessThanOrEqual(25);
  });

  it('should generate attachments between 1 and 15', () => {
    const result = enhanceTodo(mockTodo);

    expect(result.attachments).toBeGreaterThanOrEqual(1);
    expect(result.attachments).toBeLessThanOrEqual(15);
  });
});

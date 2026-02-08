/// <reference types="@testing-library/jest-dom" />
import { render, screen } from '@testing-library/react';
import { TaskCard } from '@/components/tasks/TaskCard';
import type { EnhancedTodo } from '@/contexts/TasksContext';
import { TODO_STATUSES } from '@/api/todo';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

jest.mock('@/hooks/useDeleteTodo', () => ({
  useDeleteTodo: () => ({
    mutate: jest.fn(),
    isPending: false,
  }),
}));

jest.mock('@/hooks/useUpdateTodo', () => ({
  useUpdateTodo: () => ({
    mutate: jest.fn(),
    isPending: false,
  }),
}));

const mockTodo: EnhancedTodo = {
  id: 1,
  todo: 'Test Task Title',
  completed: false,
  userId: 1,
  status: TODO_STATUSES.TODO,
  description: 'Test description',
  startDate: '2024-05-26',
  endDate: '2024-05-28',
  comments: 5,
  attachments: 3,
  avatars: [1, 2],
  checklist: { done: 3, total: 5 },
};

describe('TaskCard', () => {
  it('should render task title', () => {
    render(<TaskCard todo={mockTodo} />);
    expect(screen.getByText('Test Task Title')).toBeInTheDocument();
  });

  it('should render description when provided', () => {
    render(<TaskCard todo={mockTodo} description="Test description" />);
    expect(screen.getByText('Test description')).toBeInTheDocument();
  });

  it('should render date when provided', () => {
    render(<TaskCard todo={mockTodo} date="May 26, 2024" />);
    expect(screen.getByText('May 26, 2024')).toBeInTheDocument();
  });

  it('should render comments count', () => {
    render(<TaskCard todo={mockTodo} comments={5} />);
    expect(screen.getByText('5')).toBeInTheDocument();
  });

  it('should render attachments count', () => {
    render(<TaskCard todo={mockTodo} attachments={3} />);
    expect(screen.getByText('3')).toBeInTheDocument();
  });

  it('should render avatars when provided', () => {
    render(<TaskCard todo={mockTodo} avatars={[1, 2]} />);
    const avatars = screen.getAllByAltText('User');
    expect(avatars).toHaveLength(2);
  });

  it('should render checklist progress', () => {
    const checklist = { done: 3, total: 5 };
    render(<TaskCard todo={mockTodo} checklist={checklist} />);
    expect(screen.getByText('3/5')).toBeInTheDocument();
  });

  it('should render more actions button', () => {
    render(<TaskCard todo={mockTodo} />);
    const buttons = screen.getAllByRole('button');
    expect(buttons.length).toBeGreaterThan(0);
  });
});

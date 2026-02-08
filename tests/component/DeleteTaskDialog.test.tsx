/// <reference types="@testing-library/jest-dom" />
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { DeleteTaskDialog } from '@/features/tasks/delete-task-dialog';

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

describe('DeleteTaskDialog', () => {
  const mockOnOpenChange = jest.fn();
  const mockOnConfirm = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render dialog when open', () => {
    render(
      <DeleteTaskDialog
        open={true}
        onOpenChange={mockOnOpenChange}
        onConfirm={mockOnConfirm}
      />,
    );

    expect(screen.getByText('deleteConfirmTitle')).toBeInTheDocument();
    expect(screen.getByText('deleteConfirmMessage')).toBeInTheDocument();
  });

  it('should not render dialog when closed', () => {
    render(
      <DeleteTaskDialog
        open={false}
        onOpenChange={mockOnOpenChange}
        onConfirm={mockOnConfirm}
      />,
    );

    expect(screen.queryByText('deleteConfirmTitle')).not.toBeInTheDocument();
  });

  it('should call onConfirm when delete button clicked', async () => {
    const user = userEvent.setup();
    render(
      <DeleteTaskDialog
        open={true}
        onOpenChange={mockOnOpenChange}
        onConfirm={mockOnConfirm}
      />,
    );

    const deleteButton = screen.getByText('deleteTask');
    await user.click(deleteButton);

    expect(mockOnConfirm).toHaveBeenCalledTimes(1);
  });

  it('should call onOpenChange when cancel button clicked', async () => {
    const user = userEvent.setup();
    render(
      <DeleteTaskDialog
        open={true}
        onOpenChange={mockOnOpenChange}
        onConfirm={mockOnConfirm}
      />,
    );

    const cancelButton = screen.getByText('cancel');
    await user.click(cancelButton);

    expect(mockOnOpenChange).toHaveBeenCalledWith(false);
  });

  it('should show loading state when isDeleting is true', () => {
    render(
      <DeleteTaskDialog
        open={true}
        onOpenChange={mockOnOpenChange}
        onConfirm={mockOnConfirm}
        isDeleting={true}
      />,
    );

    expect(screen.getByText('deleting')).toBeInTheDocument();
  });

  it('should disable buttons when isDeleting is true', () => {
    render(
      <DeleteTaskDialog
        open={true}
        onOpenChange={mockOnOpenChange}
        onConfirm={mockOnConfirm}
        isDeleting={true}
      />,
    );

    const deleteButton = screen.getByText('deleting');
    const cancelButton = screen.getByText('cancel');

    expect(deleteButton).toBeDisabled();
    expect(cancelButton).toBeDisabled();
  });
});

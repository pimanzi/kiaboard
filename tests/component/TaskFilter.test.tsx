/// <reference types="@testing-library/jest-dom" />
import { render, screen } from '@testing-library/react';
import { TaskFilter } from '@/features/tasks/task-filter';
import { BrowserRouter } from 'react-router-dom';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

const renderWithRouter = (component: React.ReactElement) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe('TaskFilter', () => {
  it('should render filter button with default value', () => {
    renderWithRouter(<TaskFilter />);
    // The component shows the selected filter value, default is "filterAll"
    expect(screen.getByText('filterAll')).toBeInTheDocument();
  });

  it('should render filter trigger as combobox', () => {
    renderWithRouter(<TaskFilter />);
    // Check that the trigger button is rendered
    const trigger = screen.getByRole('combobox');
    expect(trigger).toBeInTheDocument();
  });

  it('should have correct initial aria-expanded state', () => {
    renderWithRouter(<TaskFilter />);
    const trigger = screen.getByRole('combobox');
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
  });

  it('should render sliders icon', () => {
    renderWithRouter(<TaskFilter />);
    // The component renders an SVG icon
    const svg = document.querySelector('svg.lucide-sliders-horizontal');
    expect(svg).toBeInTheDocument();
  });
});

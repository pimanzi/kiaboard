import { TODO_STATUSES, type Todo } from '@/api/todo';
import type { EnhancedTodo } from '@/contexts/TasksContext';

const AVATAR_NUMBERS = [1, 2, 3];

const DESCRIPTIONS = [
  'Review and update documentation for the new features',
  'Coordinate with team members on project deliverables',
  'Analyze current processes and identify improvements',
  'Prepare materials for upcoming presentation',
  'Conduct thorough review of submitted reports',
  'Schedule and facilitate training sessions',
  'Develop and roll out new procedures',
  'Ensure all records are up to date and accurate',
  'Plan and coordinate upcoming team activities',
  'Revise policies to reflect recent changes',
];

const ISO_DATES = [
  '2024-05-26',
  '2024-05-28',
  '2024-05-18',
  '2024-05-08',
  '2024-05-25',
  '2024-05-24',
  '2024-05-10',
];

function getRandomDescription() {
  return DESCRIPTIONS[Math.floor(Math.random() * DESCRIPTIONS.length)];
}

function getRandomDate() {
  return ISO_DATES[Math.floor(Math.random() * ISO_DATES.length)];
}

function getRandomAvatars() {
  const count = Math.floor(Math.random() * 3) + 1;
  const shuffled = [...AVATAR_NUMBERS].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

function getRandomComments() {
  return Math.floor(Math.random() * 25) + 1;
}

function getRandomAttachments() {
  return Math.floor(Math.random() * 15) + 1;
}

function getRandomChecklist() {
  if (Math.random() > 0.4) {
    const total = Math.floor(Math.random() * 8) + 3;
    const done = Math.floor(Math.random() * total) + 1;
    return { done, total };
  }
  return undefined;
}

function assignStatus(todo: Todo): Todo {
  if (todo.status) return todo;
  
  if (todo.completed) {
    const status = Math.random() < 0.7 ? TODO_STATUSES.DONE : TODO_STATUSES.NEEDS_REVIEW;
    return { ...todo, status };
  } else {
    const status = Math.random() < 0.6 ? TODO_STATUSES.TODO : TODO_STATUSES.IN_PROGRESS;
    return { ...todo, status };
  }
}

export function enhanceTodo(todo: Todo): EnhancedTodo {
  const todoWithStatus = assignStatus(todo);
  return {
    ...todoWithStatus,
    description: getRandomDescription(),
    startDate: getRandomDate(),
    endDate: getRandomDate(),
    comments: getRandomComments(),
    attachments: getRandomAttachments(),
    checklist: getRandomChecklist(),
    avatars: getRandomAvatars(),
  };
}

export function formatDateForDisplay(isoDate: string, locale: string): string {
  const date = new Date(isoDate);
  return date.toLocaleDateString(locale === 'fr' ? 'fr-FR' : 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

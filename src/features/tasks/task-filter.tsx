import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';
import { SlidersHorizontal } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { TODO_STATUSES } from '@/api/todo';

export function TaskFilter() {
  const { t } = useTranslation('tasks');
  const [searchParams, setSearchParams] = useSearchParams();

  const currentFilter = searchParams.get('status') || 'all';
  const isActive = currentFilter !== 'all';

  const handleFilterChange = (value: string) => {
    if (value === 'all') {
      searchParams.delete('status');
    } else {
      searchParams.set('status', value);
    }
    setSearchParams(searchParams);
  };

  return (
    <Select value={currentFilter} onValueChange={handleFilterChange}>
      <SelectTrigger
        className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 text-[12px] font-medium rounded-lg border transition-all duration-200 cursor-pointer w-auto ${
          isActive
            ? 'bg-brand-soft border-brand text-brand'
            : 'bg-neutral dark:bg-surface border-border text-slate hover:bg-surface hover:border-slate'
        }`}
      >
        <SlidersHorizontal
          className={`w-3.5 h-3.5 ${isActive ? 'text-brand' : 'text-slate'}`}
        />
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">{t('filterAll')}</SelectItem>
        <SelectItem value={TODO_STATUSES.TODO}>{t('filterTodo')}</SelectItem>
        <SelectItem value={TODO_STATUSES.IN_PROGRESS}>
          {t('filterInProgress')}
        </SelectItem>
        <SelectItem value={TODO_STATUSES.NEEDS_REVIEW}>
          {t('filterNeedsReview')}
        </SelectItem>
        <SelectItem value={TODO_STATUSES.DONE}>{t('filterDone')}</SelectItem>
      </SelectContent>
    </Select>
  );
}

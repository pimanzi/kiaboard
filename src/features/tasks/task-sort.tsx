import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';
import { ArrowUpDown } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export function TaskSort() {
  const { t } = useTranslation('tasks');
  const [searchParams, setSearchParams] = useSearchParams();

  const currentSort = searchParams.get('sort') || 'newest';
  const isActive = currentSort !== 'newest';

  const handleSortChange = (value: string) => {
    searchParams.set('sort', value);
    setSearchParams(searchParams);
  };

  return (
    <Select value={currentSort} onValueChange={handleSortChange}>
      <SelectTrigger
        className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 text-[12px] font-medium rounded-lg border transition-all duration-200 cursor-pointer w-auto ${
          isActive
            ? 'bg-brand-soft border-brand text-brand'
            : 'bg-neutral dark:bg-surface border-border text-slate hover:bg-surface hover:border-slate'
        }`}
      >
        <ArrowUpDown
          className={`w-3.5 h-3.5 ${isActive ? 'text-brand' : 'text-slate'}`}
        />
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="newest">{t('sortNewest')}</SelectItem>
        <SelectItem value="oldest">{t('sortOldest')}</SelectItem>
      </SelectContent>
    </Select>
  );
}

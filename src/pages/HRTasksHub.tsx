import { useState } from 'react';
import {
  MoreHorizontal,
  Search,
  LayoutGrid,
  List,
  Calendar,
  Archive,
  X,
  Command,
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';
import { KanbanBoard } from '@/features/tasks/kanban/kanban';
import { TaskList } from '@/features/tasks/list/task-list';
import { TaskFilter } from '@/features/tasks/task-filter';
import { TaskSort } from '@/features/tasks/task-sort';
import { useDebounce } from '@/hooks/useDebounce';

// Detect platform for keyboard shortcut display
const isMac =
  typeof navigator !== 'undefined' &&
  navigator.platform.toLowerCase().includes('mac');

type ViewType = 'kanban' | 'list' | 'calendar';

export function HRTasksHub() {
  const { t } = useTranslation('tasks');
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchValue, setSearchValue] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const debouncedSearch = useDebounce(searchValue, 500);
  const statusFilter = searchParams.get('status') || 'all';
  const sortOrder = searchParams.get('sort') || 'newest';
  const currentView = (searchParams.get('view') as ViewType) || 'kanban';

  const clearSearch = () => {
    setSearchValue('');
  };

  const setView = (view: ViewType) => {
    searchParams.set('view', view);
    setSearchParams(searchParams);
  };

  return (
    <div className="h-full flex flex-col">
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-ink dark:text-foreground flex items-center gap-2">
          {t('pageTitle')}
          <Archive className="w-6 h-6 text-brand" />
        </h1>
        <p className="text-[14px] text-muted-text mt-1">{t('pageSubtitle')}</p>
      </div>

      {/* Desktop Toolbar - View Tabs, Search, Filter, Sort, Avatars */}
      <div className="hidden md:flex items-center justify-between gap-3 mb-6">
        {/* Left Side - View Tabs */}
        <div className="flex items-center gap-2">
          <button className="px-3 py-1.5 text-[14px] text-muted-text hover:text-slate hover:bg-brand-soft rounded-lg transition-colors">
            <MoreHorizontal className="w-4 h-4" />
          </button>
          <button
            onClick={() => setView('kanban')}
            className={`flex items-center gap-2 px-3 py-1.5 text-[14px] rounded-lg font-medium transition-colors ${
              currentView === 'kanban'
                ? 'text-brand bg-brand-soft'
                : 'text-slate hover:text-brand hover:bg-brand-soft'
            }`}
          >
            <LayoutGrid className="w-4 h-4" />
            {t('viewKanban')}
          </button>
          <button
            onClick={() => setView('list')}
            className={`flex items-center gap-2 px-3 py-1.5 text-[14px] rounded-lg font-medium transition-colors ${
              currentView === 'list'
                ? 'text-brand bg-brand-soft'
                : 'text-slate hover:text-brand hover:bg-brand-soft'
            }`}
          >
            <List className="w-4 h-4" />
            {t('viewList')}
          </button>
          <button
            onClick={() => setView('calendar')}
            className={`flex items-center gap-2 px-3 py-1.5 text-[14px] rounded-lg font-medium transition-colors ${
              currentView === 'calendar'
                ? 'text-brand bg-brand-soft'
                : 'text-slate hover:text-brand hover:bg-brand-soft'
            }`}
          >
            <Calendar className="w-4 h-4" />
            {t('viewCalendar')}
          </button>
        </div>

        {/* Right Side - Search, Filter, Sort, Avatars */}
        <div className="flex items-center gap-2">
          {/* Search Input */}
          <div className="relative">
            <Search
              className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none transition-colors duration-200 ${
                isSearchFocused ? 'text-brand' : 'text-slate'
              }`}
            />
            <input
              type="text"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
              placeholder={t('searchPlaceholder')}
              className={`pl-9 pr-8 py-1.5 text-[12px] text-ink dark:text-foreground bg-surface dark:bg-surface border rounded-lg w-40 lg:w-52 transition-all duration-200 focus:outline-none ${
                isSearchFocused
                  ? 'border-brand bg-neutral dark:bg-surface-elevated shadow-sm'
                  : 'border-border'
              }`}
            />
            {/* Clear button */}
            {searchValue && (
              <button
                onClick={clearSearch}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-text hover:text-ink transition-colors"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Keyboard Shortcut Badge - Hidden on tablet, visible on large screens */}
          <div
            className="hidden lg:inline-flex items-center gap-1 px-2 py-1 bg-surface dark:bg-surface border border-border rounded-md text-[12px] font-medium text-muted-text"
            title={isMac ? 'Press ⌘F to search' : 'Press Ctrl+F to search'}
          >
            {isMac ? (
              <>
                <Command className="w-3 h-3" />
                <span>F</span>
              </>
            ) : (
              <span>Ctrl F</span>
            )}
          </div>

          {/* Divider */}
          <div className="w-px h-6 bg-border opacity-50 mx-1" />

          <TaskFilter />
          <TaskSort />

          {/* Divider */}
          <div className="w-px h-6 bg-border opacity-50 mx-1" />

          {/* Avatar Stack */}
          <div className="flex">
            {[1, 2, 3].map((avatarNum, index) => (
              <div
                key={avatarNum}
                className="w-7 h-7 rounded-full border-2 border-white dark:border-surface-elevated overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-200"
                style={{
                  marginLeft: index === 0 ? 0 : '-8px',
                  zIndex: index + 1,
                }}
              >
                <img
                  src={`/images/headshots/avatar${avatarNum}.jpg`}
                  alt="User"
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Toolbar */}
      <div className="flex md:hidden flex-col gap-3 mb-6">
        {/* Row 1 - View Tabs */}
        <div className="flex items-center gap-2">
          <button className="px-2 py-1.5 text-[12px] text-muted-text hover:text-slate hover:bg-brand-soft rounded-lg transition-colors">
            <MoreHorizontal className="w-4 h-4" />
          </button>
          <button
            onClick={() => setView('kanban')}
            className={`flex items-center gap-1.5 px-2 py-1.5 text-[12px] rounded-lg font-medium transition-colors ${
              currentView === 'kanban'
                ? 'text-brand bg-brand-soft'
                : 'text-slate hover:text-brand hover:bg-brand-soft'
            }`}
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            {t('viewKanban')}
          </button>
          <button
            onClick={() => setView('list')}
            className={`flex items-center gap-1.5 px-2 py-1.5 text-[12px] rounded-lg font-medium transition-colors ${
              currentView === 'list'
                ? 'text-brand bg-brand-soft'
                : 'text-slate hover:text-brand hover:bg-brand-soft'
            }`}
          >
            <List className="w-3.5 h-3.5" />
            {t('viewList')}
          </button>
          <button
            onClick={() => setView('calendar')}
            className={`flex items-center gap-1.5 px-2 py-1.5 text-[12px] rounded-lg font-medium transition-colors ${
              currentView === 'calendar'
                ? 'text-brand bg-brand-soft'
                : 'text-slate hover:text-brand hover:bg-brand-soft'
            }`}
          >
            <Calendar className="w-3.5 h-3.5" />
            {t('viewCalendar')}
          </button>
        </div>

        {/* Row 2 - Search, Filter, Sort */}
        <div className="flex items-center gap-2">
          {/* Search Input - Full width on mobile */}
          <div className="relative flex-1">
            <Search
              className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none transition-colors duration-200 ${
                isSearchFocused ? 'text-brand' : 'text-slate'
              }`}
            />
            <input
              type="text"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
              placeholder={t('searchPlaceholder')}
              className={`w-full pl-9 pr-8 py-1.5 text-[12px] text-ink dark:text-foreground bg-surface dark:bg-surface border rounded-lg transition-all duration-200 focus:outline-none ${
                isSearchFocused
                  ? 'border-brand bg-neutral dark:bg-surface-elevated shadow-sm'
                  : 'border-border'
              }`}
            />
            {/* Clear button */}
            {searchValue && (
              <button
                onClick={clearSearch}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-text hover:text-ink transition-colors"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <TaskFilter />
          <TaskSort />
        </div>

        {/* Row 3 - Avatar Stack */}
        <div className="flex items-center justify-end">
          <div className="flex">
            {[1, 2, 3].map((avatarNum, index) => (
              <div
                key={avatarNum}
                className="w-7 h-7 rounded-full border-2 border-white dark:border-surface-elevated overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-200"
                style={{
                  marginLeft: index === 0 ? 0 : '-8px',
                  zIndex: index + 1,
                }}
              >
                <img
                  src={`/images/headshots/avatar${avatarNum}.jpg`}
                  alt="User"
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 min-h-0 overflow-auto">
        {currentView === 'kanban' && (
          <KanbanBoard
            statusFilter={statusFilter}
            sortOrder={sortOrder}
            searchQuery={debouncedSearch}
          />
        )}
        {currentView === 'list' && (
          <TaskList
            statusFilter={statusFilter}
            sortOrder={sortOrder}
            searchQuery={debouncedSearch}
          />
        )}
        {currentView === 'calendar' && (
          <div className="flex items-center justify-center py-20 text-muted-text">
            {t('viewCalendar')} - Coming soon
          </div>
        )}
      </div>
    </div>
  );
}

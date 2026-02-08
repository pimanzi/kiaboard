import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Menu, Plus, Globe2, ChevronRight, Bell, Share2 } from 'lucide-react';
import { LanguageSwitcher } from '../header/LanguageSwitcher';
import { ThemeToggle } from '../header/ThemeToggle';
import { Button } from '../ui/button';

interface HeaderProps {
  onMenuClick: () => void;
}

const routeKeys: Record<string, string> = {
  '/': 'hrTasksHub',
  '/hr-tasks-hub': 'hrTasksHub',
  '/search': 'search',
  '/kla-ai': 'klaAi',
  '/inbox': 'inbox',
  '/calendar': 'calendar',
  '/settings': 'settings',
  '/windah-comp': 'windahComp',
  '/nospace-dev': 'nospaceDev',
  '/dribbble-portfolio': 'dribbblePortfolio',
};

export function Header({ onMenuClick }: HeaderProps) {
  const location = useLocation();
  const { t } = useTranslation('header');
  const currentPageKey = routeKeys[location.pathname] || 'dashboard';

  return (
    <header className="sticky top-0 z-50 h-16 border-b border-border bg-neutral dark:bg-surface flex items-center justify-between px-4 lg:px-6">
      {/* Left side - Breadcrumb */}
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon-sm"
          onClick={onMenuClick}
          className="lg:hidden text-slate hover:text-brand"
        >
          <Menu className="w-5 h-5" />
        </Button>

        {/* Desktop Breadcrumb */}
        <div className="hidden md:flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon-sm"
            className="text-slate hover:text-brand"
          >
            <Plus className="w-5 h-5" />
          </Button>

          <div className="w-px h-5 bg-border" />

          <div className="flex items-center gap-2 text-[14px]">
            <Globe2 className="w-4 h-4 text-slate" />
            <span className="text-slate">{t('sharedPages')}</span>
            <ChevronRight className="w-4 h-4 text-muted-text" />
            <span className="text-ink dark:text-foreground font-semibold">
              {t(currentPageKey)}
            </span>
          </div>
        </div>

        {/* Mobile - Just page title */}
        <div className="md:hidden">
          <span className="text-ink dark:text-foreground font-semibold text-[14px]">
            {t(currentPageKey)}
          </span>
        </div>
      </div>

      {/* Right side - Utilities */}
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon-sm"
          className="relative text-slate hover:text-brand border border-border rounded-lg"
        >
          <Bell className="w-5 h-5" />
          <span className="absolute -top-1 -right-1 flex items-center justify-center min-w-[18px] h-[18px] px-1 bg-brand text-white text-[10px] font-semibold rounded-full">
            10
          </span>
        </Button>

        <div className="block">
          <LanguageSwitcher />
        </div>

        <div className="block">
          <ThemeToggle />
        </div>

        <Button
          variant="ghost"
          className="hidden md:flex items-center gap-2 text-slate hover:text-brand border border-border rounded-lg px-4 h-9"
        >
          <Share2 className="w-5 h-5" />
          <span className="text-[14px] font-medium">{t('share')}</span>
        </Button>
      </div>
    </header>
  );
}

import { NavLink } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Search,
  Sparkles,
  Mail,
  Calendar,
  Settings,
  ChevronDown,
  Layers,
  CircleDot,
  Loader,
  Dribbble,
  Plus,
  MoreHorizontal,
  X,
  GripVertical,
} from 'lucide-react';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { Button } from '@/components/ui/button';
import { UpgradeCard } from '@/components/ui/upgrade-card';

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

const linkClass = ({ isActive }: { isActive: boolean }) =>
  `flex items-center gap-3 px-3 py-2 rounded-lg text-[12px] transition-colors ${
    isActive
      ? 'text-brand bg-brand-soft font-semibold'
      : 'text-slate hover:text-brand hover:bg-brand-soft'
  }`;

const pageLinkClass = ({ isActive }: { isActive: boolean }) =>
  `flex items-center gap-3 px-3 py-2 rounded-lg text-[12px] font-semibold transition-colors ${
    isActive
      ? 'text-brand bg-brand-soft'
      : 'text-slate hover:text-brand hover:bg-brand-soft'
  }`;

export function MobileNav({ isOpen, onClose }: MobileNavProps) {
  const [isClosing, setIsClosing] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);
  const { t } = useTranslation('sidebar');

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      setIsClosing(false);
    } else if (shouldRender) {
      setIsClosing(true);
      const timer = setTimeout(() => {
        setShouldRender(false);
        setIsClosing(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen, shouldRender]);

  const handleClose = () => {
    onClose();
  };

  if (!shouldRender) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/50 z-40 lg:hidden transition-opacity duration-300 ${
          isClosing ? 'opacity-0' : 'opacity-100'
        }`}
        onClick={handleClose}
      />

      {/* Drawer */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-72 bg-surface border-r border-border flex flex-col lg:hidden transition-transform duration-300 ease-out ${
          isClosing ? '-translate-x-full' : 'translate-x-0'
        }`}
      >
        {/* Logo area */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <div className="flex items-center gap-2">
            <img
              src="/images/logos/kia.png"
              alt="Kla"
              className="w-10 h-10 rounded-xl object-cover"
            />
            <div className="flex flex-col">
              <span className="text-ink dark:text-foreground text-[16px] font-bold">
                {t('klaboard')}
              </span>
              <div className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-brand" />
                <span className="text-brand text-[11px] font-semibold">
                  {t('freeTrial')}
                </span>
              </div>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon-sm"
            className="text-slate hover:text-brand cursor-pointer"
            onClick={handleClose}
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-3 space-y-0 scrollbar-brand">
          <NavLink to="/search" className={linkClass} onClick={handleClose}>
            <Search className="w-5 h-5" />
            {t('search')}
          </NavLink>
          <NavLink to="/kla-ai" className={linkClass} onClick={handleClose}>
            <Sparkles className="w-5 h-5" />
            {t('klaAi')}
          </NavLink>
          <NavLink to="/inbox" className={linkClass} onClick={handleClose}>
            <Mail className="w-5 h-5" />
            {t('inbox')}
            <span className="ml-auto flex items-center gap-1 text-[12px] text-brand bg-brand-soft px-2 py-0.5 rounded-full font-medium">
              <Sparkles className="w-3 h-3" />
              {t('new')}
            </span>
          </NavLink>
          <NavLink to="/calendar" className={linkClass} onClick={handleClose}>
            <Calendar className="w-5 h-5" />
            {t('calendar')}
          </NavLink>
          <NavLink to="/settings" className={linkClass} onClick={handleClose}>
            <Settings className="w-5 h-5" />
            {t('settings')}
          </NavLink>

          {/* Shared Pages */}
          <Collapsible defaultOpen className="pt-2">
            <CollapsibleTrigger className="flex items-center justify-between w-full px-3 py-1 text-[12px] font-semibold text-muted-text uppercase tracking-wider hover:text-slate group cursor-pointer">
              {t('sharedPages')}
              <ChevronDown className="w-4 h-4 transition-transform group-data-[state=closed]:-rotate-90" />
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-0 mt-1">
              <NavLink
                to="/hr-tasks-hub"
                className={pageLinkClass}
                onClick={handleClose}
              >
                <GripVertical className="w-4 h-4 text-muted-text" />
                <Layers className="w-5 h-5 text-amber" />
                {t('hrTasksHub')}
              </NavLink>
              <NavLink
                to="/windah-comp"
                className={pageLinkClass}
                onClick={handleClose}
              >
                <GripVertical className="w-4 h-4 text-muted-text" />
                <CircleDot className="w-5 h-5 text-mint" />
                {t('windahComp')}
              </NavLink>
              <NavLink
                to="/nospace-dev"
                className={pageLinkClass}
                onClick={handleClose}
              >
                <GripVertical className="w-4 h-4 text-muted-text" />
                <Loader className="w-5 h-5 text-rose" />
                {t('nospaceDev')}
              </NavLink>
            </CollapsibleContent>
          </Collapsible>

          {/* Private Pages */}
          <Collapsible defaultOpen className="pt-1.5">
            <CollapsibleTrigger className="flex items-center justify-between w-full px-3 py-1 text-[12px] font-semibold text-muted-text uppercase tracking-wider hover:text-slate group cursor-pointer">
              {t('privatePages')}
              <ChevronDown className="w-4 h-4 transition-transform group-data-[state=closed]:-rotate-90" />
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-0 mt-1">
              <NavLink
                to="/dribbble-portfolio"
                className={pageLinkClass}
                onClick={handleClose}
              >
                <GripVertical className="w-4 h-4 text-muted-text" />
                <Dribbble className="w-5 h-5 text-brand" />
                {t('dribbblePortfolio')}
              </NavLink>
            </CollapsibleContent>
          </Collapsible>

          {/* Accounts */}
          <div className="pt-2">
            <div className="flex items-center justify-between px-3 py-2 text-[12px] font-medium text-muted-text uppercase tracking-wider">
              {t('accounts')}
              <Button
                variant="ghost"
                size="icon-xs"
                className="text-muted-text hover:text-slate"
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            <div className="px-3 py-2 flex items-center gap-3">
              <img
                src="/images/headshots/avatar1.jpg"
                alt="Teheran"
                className="w-7 h-7 rounded-full object-cover"
              />
              <span className="text-[14px] text-slate">Teheran</span>
              <Button
                variant="ghost"
                size="icon-xs"
                className="ml-auto text-muted-text hover:text-slate"
              >
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </nav>

        {/* Promo Card */}
        <div className="p-2 border-t border-border">
          <UpgradeCard />
        </div>
      </aside>
    </>
  );
}

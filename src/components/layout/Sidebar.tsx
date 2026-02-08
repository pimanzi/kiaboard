import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  Search,
  Sparkles,
  Mail,
  Calendar,
  Settings,
  ChevronDown,
  ChevronsLeft,
  ChevronsRight,
  Layers,
  CircleDot,
  Loader,
  Dribbble,
  Plus,
  MoreHorizontal,
  GripVertical,
} from 'lucide-react';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button';
import { UpgradeCard } from '@/components/ui/upgrade-card';

interface SidebarProps {
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  `flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-[12px] transition-colors ${
    isActive
      ? 'text-brand bg-brand-soft font-semibold'
      : 'text-slate hover:text-brand hover:bg-brand-soft'
  }`;

const pageNavLinkClass = ({ isActive }: { isActive: boolean }) =>
  `flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-[12px] font-semibold transition-colors ${
    isActive
      ? 'text-brand bg-brand-soft'
      : 'text-slate hover:text-brand hover:bg-brand-soft'
  }`;

interface NavLinkItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  isCollapsed: boolean;
  onClick?: () => void;
  badge?: React.ReactNode;
}

function NavLinkItem({
  to,
  icon,
  label,
  isCollapsed,
  onClick,
  badge,
}: NavLinkItemProps) {
  if (isCollapsed) {
    return (
      <Tooltip>
        <TooltipTrigger asChild>
          <div>
            <NavLink
              to={to}
              className={({ isActive }) =>
                `flex items-center justify-center p-2.5 rounded-lg transition-colors ${
                  isActive
                    ? 'text-brand bg-brand-soft'
                    : 'text-slate hover:text-brand hover:bg-brand-soft'
                }`
              }
              onClick={onClick}
            >
              {icon}
            </NavLink>
          </div>
        </TooltipTrigger>
        <TooltipContent side="right" sideOffset={5}>
          {label}
        </TooltipContent>
      </Tooltip>
    );
  }

  return (
    <NavLink
      to={to}
      className={({ isActive }) => navLinkClass({ isActive })}
      onClick={onClick}
    >
      {icon}
      {label}
      {badge}
    </NavLink>
  );
}

export function Sidebar({ isCollapsed, onToggleCollapse }: SidebarProps) {
  const { t } = useTranslation('sidebar');

  return (
    <TooltipProvider>
      {/* Desktop Sidebar only */}
      <aside
        className={`hidden lg:flex fixed inset-y-0 left-0 ${
          isCollapsed ? 'w-24' : 'w-60'
        } bg-surface border-r border-border flex-col transition-all duration-300 ease-in-out`}
      >
        {/* Logo area */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          {isCollapsed ? (
            <div className="flex items-center justify-between w-full gap-2">
              <img
                src="/images/logos/kia.png"
                alt="Klaboard"
                className="w-11 h-11 rounded-xl object-cover"
              />
              <Button
                variant="ghost"
                size="icon-sm"
                onClick={onToggleCollapse}
                className="text-slate hover:text-brand hidden lg:flex cursor-pointer"
              >
                <ChevronsRight className="w-5 h-5" />
              </Button>
            </div>
          ) : (
            <>
              <div className="flex items-center gap-2">
                <img
                  src="/images/logos/kia.png"
                  alt="Kla"
                  className="w-10 h-10 rounded-xl object-cover"
                />
                <div className="flex flex-col">
                  <div className="flex items-center gap-1.5">
                    <span className="text-ink dark:text-foreground text-[16px] font-bold">
                      {t('klaboard')}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand"></span>
                    <span className="text-brand text-[11px] font-semibold">
                      {t('freeTrial')}
                    </span>
                  </div>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon-sm"
                onClick={onToggleCollapse}
                className="text-slate hover:text-brand hidden lg:flex cursor-pointer"
              >
                <ChevronsLeft className="w-5 h-5" />
              </Button>
            </>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-2 space-y-0 scrollbar-brand">
          <NavLinkItem
            to="/search"
            icon={<Search className="w-4 h-4" />}
            label={t('search')}
            isCollapsed={isCollapsed}
          />
          <NavLinkItem
            to="/kla-ai"
            icon={<Sparkles className="w-4 h-4" />}
            label={t('klaAi')}
            isCollapsed={isCollapsed}
          />
          <NavLinkItem
            to="/inbox"
            icon={<Mail className="w-4 h-4" />}
            label={t('inbox')}
            isCollapsed={isCollapsed}
            badge={
              <span className="ml-auto flex items-center gap-1 text-[10px] text-brand bg-brand-soft px-1.5 py-0.5 rounded-full font-medium">
                <Sparkles className="w-2.5 h-2.5" />
                {t('new')}
              </span>
            }
          />
          <NavLinkItem
            to="/calendar"
            icon={<Calendar className="w-4 h-4" />}
            label={t('calendar')}
            isCollapsed={isCollapsed}
          />
          <NavLinkItem
            to="/settings"
            icon={<Settings className="w-4 h-4" />}
            label={t('settings')}
            isCollapsed={isCollapsed}
          />

          {/* Shared Pages Section */}
          {!isCollapsed && (
            <Collapsible defaultOpen className="pt-2">
              <CollapsibleTrigger className="flex items-center justify-between w-full px-2.5 py-1 text-[12px] font-semibold text-muted-text tracking-wider hover:text-slate group cursor-pointer">
                {t('sharedPages')}
                <ChevronDown className="w-3.5 h-3.5 transition-transform group-data-[state=closed]:-rotate-90" />
              </CollapsibleTrigger>
              <CollapsibleContent className="space-y-0 mt-0.5">
                <NavLink
                  to="/hr-tasks-hub"
                  className={({ isActive }) => pageNavLinkClass({ isActive })}
                >
                  <GripVertical className="w-3.5 h-3.5 text-muted-text" />
                  <Layers className="w-4 h-4 text-amber" />
                  {t('hrTasksHub')}
                </NavLink>
                <NavLink
                  to="/windah-comp"
                  className={({ isActive }) => pageNavLinkClass({ isActive })}
                >
                  <GripVertical className="w-3.5 h-3.5 text-muted-text" />
                  <CircleDot className="w-4 h-4 text-mint" />
                  {t('windahComp')}
                </NavLink>
                <NavLink
                  to="/nospace-dev"
                  className={({ isActive }) => pageNavLinkClass({ isActive })}
                >
                  <GripVertical className="w-3.5 h-3.5 text-muted-text" />
                  <Loader className="w-4 h-4 text-rose" />
                  {t('nospaceDev')}
                </NavLink>
              </CollapsibleContent>
            </Collapsible>
          )}

          {/* Private Pages Section */}
          {!isCollapsed && (
            <Collapsible defaultOpen className="pt-1.5">
              <CollapsibleTrigger className="flex items-center justify-between w-full px-2.5 py-1 text-[12px] font-semibold text-muted-text tracking-wider hover:text-slate group cursor-pointer">
                {t('privatePages')}
                <ChevronDown className="w-3.5 h-3.5 transition-transform group-data-[state=closed]:-rotate-90" />
              </CollapsibleTrigger>
              <CollapsibleContent className="space-y-0 mt-0.5">
                <NavLink
                  to="/dribbble-portfolio"
                  className={({ isActive }) => pageNavLinkClass({ isActive })}
                >
                  <GripVertical className="w-3.5 h-3.5 text-muted-text" />
                  <Dribbble className="w-4 h-4 text-brand" />
                  {t('dribbblePortfolio')}
                </NavLink>
              </CollapsibleContent>
            </Collapsible>
          )}

          {/* Accounts Section */}
          {!isCollapsed && (
            <div className="pt-2">
              <div className="flex items-center justify-between px-2.5 py-1.5 text-[12px] font-medium text-muted-text tracking-wider">
                {t('accounts')}
                <Button
                  variant="ghost"
                  size="icon-xs"
                  className="text-muted-text hover:text-slate"
                >
                  <Plus className="w-3.5 h-3.5" />
                </Button>
              </div>
              <div className="px-2.5 py-1.5 flex items-center gap-2.5">
                <img
                  src="/images/headshots/avatar1.jpg"
                  alt="Teheran"
                  className="w-6 h-6 rounded-full object-cover"
                />
                <span className="text-[12px] text-slate">Teheran</span>
                <Button
                  variant="ghost"
                  size="icon-xs"
                  className="ml-auto text-muted-text hover:text-slate"
                >
                  <MoreHorizontal className="w-3.5 h-3.5" />
                </Button>
              </div>
            </div>
          )}
        </nav>

        {/* Promotional Card */}
        {!isCollapsed && (
          <div className="p-2 border-t border-border">
            <UpgradeCard />
          </div>
        )}
      </aside>
    </TooltipProvider>
  );
}

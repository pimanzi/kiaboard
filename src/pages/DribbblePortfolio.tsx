import { Dribbble } from 'lucide-react';

export function DribbblePortfolio() {
  return (
    <div className="h-full flex flex-col items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 mx-auto mb-4 bg-brand-soft rounded-2xl flex items-center justify-center">
          <Dribbble className="w-8 h-8 text-brand" />
        </div>
        <h1 className="text-2xl font-semibold text-ink dark:text-foreground mb-2">
          Dribbble Portfolio
        </h1>
        <p className="text-[14px] text-muted-text">
          Dribbble Portfolio coming soon
        </p>
      </div>
    </div>
  );
}

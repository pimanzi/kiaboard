import { Code } from 'lucide-react';

export function NoSpaceDev() {
  return (
    <div className="h-full flex flex-col items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 mx-auto mb-4 bg-rose-soft rounded-2xl flex items-center justify-center">
          <Code className="w-8 h-8 text-rose" />
        </div>
        <h1 className="text-2xl font-semibold text-ink dark:text-foreground mb-2">
          NoSpace Dev
        </h1>
        <p className="text-[14px] text-muted-text">NoSpace Dev coming soon</p>
      </div>
    </div>
  );
}

import { Users } from 'lucide-react';

export function WindahComp() {
  return (
    <div className="h-full flex flex-col items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 mx-auto mb-4 bg-mint-soft rounded-2xl flex items-center justify-center">
          <Users className="w-8 h-8 text-mint" />
        </div>
        <h1 className="text-2xl font-semibold text-ink dark:text-foreground mb-2">
          Windah Comp
        </h1>
        <p className="text-[14px] text-muted-text">Windah Comp coming soon</p>
      </div>
    </div>
  );
}

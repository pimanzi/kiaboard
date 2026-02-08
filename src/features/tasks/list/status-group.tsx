import { useState, type ReactNode } from 'react';
import { ChevronDown, Plus } from 'lucide-react';
import type { EnhancedTodo } from '@/contexts/TasksContext';
import type { TodoStatus } from '@/api/todo';
import { TaskTable } from './task-table';
import { Button } from '@/components/ui/button';
import { AddTaskDialog } from '../add-task-dialog';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';

interface StatusGroupProps {
  title: string;
  icon: ReactNode;
  color: string;
  bgColor: string;
  tasks: EnhancedTodo[];
  sortOrder: string;
  status: TodoStatus;
}

export function StatusGroup({
  title,
  icon,
  color,
  bgColor,
  tasks,
  sortOrder,
  status,
}: StatusGroupProps) {
  const [isOpen, setIsOpen] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <>
      <AddTaskDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        defaultStatus={status}
      />

      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        {/* Group Header */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="icon" className="h-6 w-6 p-0">
                <ChevronDown
                  className={`w-4 h-4 text-slate transition-transform duration-200 ${
                    isOpen ? '' : '-rotate-90'
                  }`}
                />
              </Button>
            </CollapsibleTrigger>

            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 p-0"
                onClick={() => setDialogOpen(true)}
              >
                <Plus className="w-4 h-4 text-ink dark:text-foreground" />
              </Button>
              <h3 className="text-sm font-semibold text-ink dark:text-foreground">
                {title}
              </h3>
            </div>

            <span
              className={`flex items-center gap-1.5 text-[12px] px-2 py-0.5 rounded-full font-medium ${color} ${bgColor}`}
            >
              {icon}
              {tasks.length}
            </span>
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6 text-muted-text hover:text-slate"
          >
            <ChevronDown className="w-4 h-4" />
          </Button>
        </div>

        {/* Table */}
        <CollapsibleContent>
          <TaskTable tasks={tasks} sortOrder={sortOrder} />
        </CollapsibleContent>
      </Collapsible>
    </>
  );
}

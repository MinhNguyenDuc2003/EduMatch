import { Button } from '@/lib/cus/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/lib/cus/dropdown-menu';
import { Award, ChevronDown, FileText, LucideIcon, Users } from 'lucide-react';

const DropdownSection = ({
  items,
  isOpen,
  setIsOpen,
  triggerText,
  gridCols = 'grid-cols-2',
}: {
  items: {
    title: string;
    description?: string;
    icon?: LucideIcon;
    href: string;
  }[];
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  triggerText: string;
  gridCols?: string;
}) => {
  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen} modal={false}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex items-center space-x-1 text-foreground hover:text-primary shadow-none text-xl"
        >
          <span>{triggerText}</span>
          <ChevronDown
            className={`h-4 w-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className={`${items.length > 4 ? 'w-[800px]' : 'w-[600px]'} p-6 mt-2`}
        align="start"
        sideOffset={8}
      >
        <div className={`grid ${gridCols} gap-6`}>
          {items.map((item, index) => {
            const Icon = item.icon;
            return (
              <a
                key={index}
                href={item.href}
                className="flex items-start space-x-4 p-4 rounded-lg hover:bg-accent transition-colors group"
              >
                {Icon && (
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                    {item.title}
                  </h3>
                  {item.description && (
                    <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                      {item.description}
                    </p>
                  )}
                </div>
              </a>
            );
          })}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DropdownSection;

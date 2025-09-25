import { NavigationMenuLink } from '@/lib/cus/navigation-menu';
import type { LucideIcon } from 'lucide-react';

interface NavigationMenuItemProps {
  title: string;
  description: string;
  icon: LucideIcon;
  href: string;
}

export function NavigationMenuItem({
  title,
  description,
  icon: Icon,
  href,
}: NavigationMenuItemProps) {
  return (
    <NavigationMenuLink
      href={href}
      className="flex flex-row items-start space-x-2 rounded-lg hover:bg-accent transition-colors group"
    >
      <div className="flex-shrink-0">
        <div className="size-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
          <Icon className="text-primary" />
        </div>
      </div>
      <div className="flex-1 min-w-0 text-md">
        <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
          {title}
        </h3>
        <p className="text-muted-foreground mt-1 leading-relaxed">{description}</p>
      </div>
    </NavigationMenuLink>
  );
}

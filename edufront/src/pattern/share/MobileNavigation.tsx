import { Button } from '@/pattern/cus/button';
import { Sheet, SheetClose, SheetContent, SheetTitle, SheetTrigger } from '@/pattern/cus/sheet';
import { Menu } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import React from 'react';

const MobileNavigation = () => {
  const t = useTranslations('navbar');

  const menuItems = [
    { title: t('scholarships'), href: '/scholarships' },
    { title: t('news'), href: '/news' },
    { title: t('howItWorks'), href: '/how-it-works' },
    { title: t('policy'), href: '/policy' },
  ];

  return (
    <div className="lg:hidden">
      <Sheet modal={false}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="sm" className="shadow-none">
            <Menu className="h-8 w-8" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </SheetTrigger>
        <SheetTitle className="sr-only" />
        <SheetContent side="left" className="overflow-auto">
          <div className="container px-4 py-4 space-y-4">
            <div className="flex flex-col space-y-2">
              {menuItems.map((item, index) => (
                <SheetClose key={index} asChild>
                  <Link
                    href={item.href}
                    className="flex items-center space-x-4 p-4 rounded-lg hover:bg-accent transition-colors font-semibold text-foreground group-hover:text-primary"
                  >
                    {item.title}
                  </Link>
                </SheetClose>
              ))}
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileNavigation;

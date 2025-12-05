import { scholarshipProviderMenuItems, studentMenuItems } from '@/constants/Common';
import { Button } from '@/pattern/cus/button';
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '@/pattern/cus/sheet';
import { Menu } from 'lucide-react';
import React from 'react';

const MobileNavigation = () => {
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
        <SheetContent side="left" className=" overflow-auto">
          <div className="container px-4 py-4 space-y-4">
            <div className="space-y-2">
              <h3 className="font-semibold text-foreground">Students</h3>
              <div className="grid grid-cols-1 gap-2 pl-4">
                {studentMenuItems.map((item, index) => (
                  <a
                    key={index}
                    href={item.href}
                    className="flex items-start space-x-4 p-4 rounded-lg hover:bg-accent transition-colors group"
                  >
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                        <item.icon className="h-6 w-6 text-primary" />
                      </div>
                    </div>
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
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="font-semibold text-foreground">Scholarship Providers</h3>
              <div className="grid grid-cols-1 gap-2 pl-4">
                {scholarshipProviderMenuItems.map((item, index) => (
                  <a
                    key={index}
                    href={item.href}
                    className="flex items-start space-x-4 p-4 rounded-lg hover:bg-accent transition-colors group"
                  >
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                        <item.icon className="h-6 w-6 text-primary" />
                      </div>
                    </div>
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
                ))}
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileNavigation;

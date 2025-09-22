import { scholarshipProviderMenuItems, studentMenuItems } from '@/constants/Common';
import { RText } from '@/lib/by/Div';
import { Button } from '@/lib/cus/button';
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '@/lib/cus/sheet';
import { Menu } from 'lucide-react';
import Link from 'next/link';
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

            <div className="pt-4 border-t flex items-center space-x-4">
              <Link href={'/'}>
                <Button variant="outline" className="text-primary-brand text-lg p-4">
                  <RText>
                    Student <span className="font-bold">Login</span>
                  </RText>
                </Button>
              </Link>

              <Link href={'/'}>
                <Button className=" bg-primary-brand text-white rounded-lg  hover:bg-[#2c4e8a] text-lg p-4">
                  <RText>
                    Student <span className="font-bold">Sign Up</span>
                  </RText>
                </Button>
              </Link>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileNavigation;

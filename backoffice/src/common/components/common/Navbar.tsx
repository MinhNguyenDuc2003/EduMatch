'use client';

import { SidebarTrigger } from '@commonServices/components/ui/sidebar';
// import { UserButton, useUser } from "@clerk/nextjs";
// import { dark } from "@clerk/themes";
import { Bell, BookOpen } from 'lucide-react';
import Link from 'next/link';
import { cn } from 'src/utils/cn';

const Navbar = () => {
  //   const { user } = useUser();
  //   const userRole = user?.publicMetadata?.userType as "student" | "teacher";
  const userRole = 'tutor';

  return (
    <nav className=" w-full mb-6 px-4 sm:px-8 pt-7 z-10">
      <div className="flex justify-between items-center w-full my-3">
        <div className="flex justify-between items-center gap-2 sm:gap-5">
          <div className="md:hidden">
            <SidebarTrigger className="text-customgreys-dirtyGrey hover:text-white-50 transition-colors" />
          </div>
          <div className="flex items-center gap-4"></div>
        </div>
        <div className="flex items-center gap-3 sm:gap-6">
          <button className="nondashboard-navbar__notification-button">
            <span className="nondashboard-navbar__notification-indicator"></span>
            <Bell className="nondashboard-navbar__notification-icon" />
          </button>

          {/* <UserButton
            appearance={{
              baseTheme: dark,
              elements: {
                userButtonOuterIdentifier: "text-customgreys-dirtyGrey",
                userButtonBox: "scale-90 sm:scale-100",
              },
            }}
            showName={true}
            userProfileMode="navigation"
            userProfileUrl={
              userRole === "teacher" ? "/teacher/profile" : "/user/profile"
            }
          /> */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

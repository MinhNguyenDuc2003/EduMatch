'use client';
import { Begin, RText } from '@/lib/by/Div';
import Link from 'next/link';
import { Button } from '../../lib/cus/button';
import Image from 'next/image';
import { scholarshipProviderMenuItems, studentMenuItems } from '@/constants/Common';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/lib/cus/dropdown-menu';
import { CircleUserRound } from 'lucide-react';
import MobileNavigation from '../share/MobileNavigation';
import {
  NavigationMenu,
  NavigationMenuItem as NavMenuItem,
  NavigationMenuList,
} from '@/lib/cus/navigation-menu';
import Notifications from '../share/Notifications';
import { useAuth } from '@/hooks/useAuth';
import LanguageSwitcher from './LanguageSwitcher';
import { useTranslations } from 'next-intl';

const Header = () => {
  const { isAuthenticated, isLoading, isProvider } = useAuth();

  const t = useTranslations('navbar');

  return (
    <Begin className="px-4 lg:px-40 py-3 flex items-center border-b bg-[#fafaf6] sticky top-0 z-50">
      <div className="w-full flex items-center justify-between">
        <div className="flex items-center gap-5">
          <div className="flex items-center space-x-4">
            {/* Mobile menu */}
            <MobileNavigation />

            {/* Logo */}
            <Link className="flex items-center" href={'/home'}>
              <Image
                src={'https://es5urvh1np.ufs.sh/f/DHR6tEJ9PQoz85HjSO62tcmI7ElP8Ygn01Oa3ze6iFwADrsH'}
                alt="logo"
                width={50}
                height={30}
                unoptimized
              />
              <span className="ml-2.5 text-base">Edu</span>
              <span className="text-base text-primary-brand font-bold ">Match</span>
            </Link>
          </div>

          <NavigationMenu className="hidden lg:flex items-center space-x-6 ">
            <NavigationMenuList>
              {/* <NavMenuItem>
                <NavigationMenuTrigger className="text-sm">Students</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid w-[800px] grid-cols-2 gap-4 p-2">
                    {studentMenuItems.map((item, index) => (
                      <NavigationMenuItem key={index} {...item} />
                    ))}
                  </div>
                </NavigationMenuContent>
              </NavMenuItem>

              <NavMenuItem>
                <NavigationMenuTrigger className="text-sm">
                  Scholarship Providers
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid w-[500px] grid-cols-1 gap-4 p-2">
                    {scholarshipProviderMenuItems.map((item, index) => (
                      <NavigationMenuItem key={index} {...item} />
                    ))}
                  </div>
                </NavigationMenuContent>
              </NavMenuItem> */}

              <NavMenuItem className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium hover:bg-zinc-200 hover:text-accent-foreground focus:bg-zinc-200 focus:text-accent-foreground disabled:pointer-events-none disabled:opacity-50 data-[state=open]:hover:bg-zinc-200 data-[state=open]:text-accent-foreground data-[state=open]:focus:bg-accent data-[state=open]:bg-accent/50 focus-visible:ring-ring/50 outline-none transition-[color,box-shadow] focus-visible:ring-[3px] focus-visible:outline-1">
                <Link
                  href="/scholarships"
                  className="text-sm font-medium hover:text-primary transition-colors"
                >
                  {t('scholarships')}
                </Link>
              </NavMenuItem>
              <NavMenuItem className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium hover:bg-zinc-200 hover:text-accent-foreground focus:bg-zinc-200 focus:text-accent-foreground disabled:pointer-events-none disabled:opacity-50 data-[state=open]:hover:bg-zinc-200 data-[state=open]:text-accent-foreground data-[state=open]:focus:bg-accent data-[state=open]:bg-accent/50 focus-visible:ring-ring/50 outline-none transition-[color,box-shadow] focus-visible:ring-[3px] focus-visible:outline-1">
                <Link
                  href="/news"
                  className="text-sm font-medium hover:text-primary transition-colors"
                >
                  {t('news')}
                </Link>
              </NavMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        <div className="flex items-center space-x-2">
          <LanguageSwitcher />

          {!isAuthenticated && !isLoading && (
            <div className="flex items-center space-x-2">
              <Link href="http://159.89.200.244/oauth2/authorization/keycloak">
                <Button variant="outline" className="text-primary-brand text-lg p-4 shadow-none">
                  <RText>
                    <span className="text-sm font-bold">{t('login')}</span>
                  </RText>
                </Button>
              </Link>
            </div>
          )}

          {!isLoading && isAuthenticated && (
            <div className="flex items-center space-x-2 gap-1">
              <Notifications />

              <DropdownMenu modal={false}>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="shadow-none rounded-full p-0">
                    <CircleUserRound className="size-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="" align="end" forceMount>
                  <DropdownMenuItem asChild>
                    <Link href="/applicant/profile">{t('dropdown.profile')}</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/applicant/activity?tab=tracking">{t('dropdown.myActivity')}</Link>
                  </DropdownMenuItem>
                  {isProvider ? (
                    <DropdownMenuItem asChild>
                      <Link href="/provider/dashboard">{t('dropdown.providerDashboard')}</Link>
                    </DropdownMenuItem>
                  ) : (
                    <DropdownMenuItem asChild>
                      <Link href="/create-provider-profile">{t('dropdown.createProvider')}</Link>
                    </DropdownMenuItem>
                  )}

                  <DropdownMenuItem onClick={() => {}}>{t('dropdown.logout')}</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          )}
        </div>
      </div>
    </Begin>
  );
};

export default Header;

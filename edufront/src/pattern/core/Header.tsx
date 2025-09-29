'use client';
import { SegUrl } from '@/@init/base';
import { Begin, RText } from '@/lib/by/Div';
import Link from 'next/link';
import { useEffect, useState } from 'react';
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
  NavigationMenuContent,
  NavigationMenuItem as NavMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/lib/cus/navigation-menu';
import { NavigationMenuItem } from '../share/NavigationMenuItem';
import { useTranslations } from 'next-intl';
import LanguageSwitcher from '../share/LanguageSwitcher';

const Header = () => {
  const [isMounted, setIsMounted] = useState(false);
  const t = useTranslations('header');

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
  return (
    <Begin className="px-4 lg:px-40 py-4 flex items-center border-b bg-white sticky top-0 z-50">
      <div className="w-full flex h-16 items-center justify-between">
        <div className="flex items-center space-x-4">
          {/* Mobile menu */}
          <MobileNavigation />

          {/* Logo */}
          <Link className="flex items-center" href={SegUrl.User}>
            <Image src={'/logo.svg'} alt="logo" width={75} height={75} />
            <span className="ml-2.5 text-2xl">Edu</span>
            <span className="text-2xl text-primary-brand font-bold ">Match</span>
          </Link>
        </div>

        <NavigationMenu className="hidden lg:flex items-center space-x-6 ">
          <NavigationMenuList>
            <NavMenuItem>
              <NavigationMenuTrigger className="text-md">
                {t('navMenu.title1')}
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="grid w-[800px] grid-cols-2 gap-4 p-2">
                  {studentMenuItems.map((item, index) => (
                    <NavigationMenuItem key={index} {...item} />
                  ))}
                </div>
              </NavigationMenuContent>
            </NavMenuItem>

            <NavMenuItem>
              <NavigationMenuTrigger className="text-md">
                {t('navMenu.title2')}
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="grid w-[500px] grid-cols-1 gap-4 p-2">
                  {scholarshipProviderMenuItems.map((item, index) => (
                    <NavigationMenuItem key={index} {...item} />
                  ))}
                </div>
              </NavigationMenuContent>
            </NavMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <div className="flex items-center space-x-2">
          <div className="hidden lg:flex items-center space-x-2">
            <Link href='http://159.89.200.244/oauth2/authorization/storefront-bff'>
              <Button variant="outline" className="text-primary-brand text-lg p-4">
                <RText>
                  Student <span className="font-bold">Login / Sign Up</span>
                </RText>
              </Button>
            </Link>
          </div>

          <LanguageSwitcher />

          <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="shadow-none rounded-full">
                <CircleUserRound className="h-8 w-8" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="" align="end" forceMount>
              <DropdownMenuItem asChild>
                <Link href="/user/profile">Profile</Link>
              </DropdownMenuItem>

              <DropdownMenuItem onClick={() => {}}>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </Begin>
  );
};

export default Header;

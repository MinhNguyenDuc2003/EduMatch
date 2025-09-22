'use client';
import { SegUrl } from '@/@init/base';
import { Begin, RText } from '@/lib/by/Div';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Button } from '../../lib/cus/button';
import Image from 'next/image';
import DropdownSection from '../share/DropdownSection';
import { scholarshipProviderMenuItems, studentMenuItems } from '@/constants/Common';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/lib/cus/dropdown-menu';
import { User } from 'lucide-react';
import MobileNavigation from '../share/MobileNavigation';

const Header = () => {
  const [isStudentOpen, setIsStudentOpen] = useState(false);
  const [isScholarshipProviderOpen, setIsScholarshipProviderOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
  return (
    <Begin className="px-4 lg:px-20 py-4 flex items-center border-b bg-white sticky top-0 z-50">
      <div className="w-full flex h-16 items-center justify-between">
        <div className="flex items-center space-x-4">
          {/* Mobile menu */}
          <MobileNavigation />

          {/* Logo */}
          <Link className="flex items-center" href={SegUrl.User}>
            <Image src={'/logo.svg'} alt="logo" width={75} height={75} />
            <span className="ml-2.5 text-2xl">Edu</span>
            <span className="text-2xl text-[#3D6CB9] font-bold ">Match</span>
          </Link>
        </div>

        <nav className="hidden lg:flex items-center space-x-6">
          <DropdownSection
            items={studentMenuItems}
            isOpen={isStudentOpen}
            setIsOpen={setIsStudentOpen}
            triggerText="Students"
          />

          <DropdownSection
            items={scholarshipProviderMenuItems}
            isOpen={isScholarshipProviderOpen}
            setIsOpen={setIsScholarshipProviderOpen}
            triggerText="Scholarship Providers"
            gridCols="grid-cols-1"
          />
        </nav>

        <div className="flex items-center">
          <div className="hidden lg:flex items-center space-x-4">
            <Link href={SegUrl.User}>
              <Button variant="outline" className="text-primary-brand text-lg p-4">
                <RText>
                  Student <span className="font-bold">Login</span>
                </RText>
              </Button>
            </Link>

            <Link href={SegUrl.User}>
              <Button className=" bg-primary-brand text-white rounded-lg  hover:bg-[#2c4e8a] text-lg p-4">
                <RText>
                  Student <span className="font-bold">Sign Up</span>
                </RText>
              </Button>
            </Link>
          </div>

          <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="shadow-none rounded-full">
                <User className="h-6 w-6" />
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

'use client';
import { SegUrl } from '@/@init/base';
import { Begin } from '@/lib/by/Div';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Button } from '../../lib/cus/button';



const Header = () => {
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();

  
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
  return (
    <Begin className="border-b border-b-gray-400 py-5 sticky top-0 z-50 bg-white pl-9">
      <Link href={SegUrl.User}>Đi tới màn hình User </Link>
      <Button
        disabled={false}
        variant={'ok'}
        color="text-white"
        onClick={() => router.push(SegUrl.Profile)}
      >
        Button test
      </Button>

    </Begin>
  );
};

export default Header;

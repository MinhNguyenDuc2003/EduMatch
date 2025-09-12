'use client';
import { SegUrl } from '@/@init/base';
import { Begin } from '@/lib/by/Div';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { CustomFormField } from '../../lib/cus/CustomFormField';
import { Button } from '../../lib/cus/button';
import { Form } from '../../lib/cus/form';

const Header = () => {
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();

  const methods = useForm<{ example: string }>({
    resolver: undefined,
    defaultValues: {
      example: '',
    },
  });

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
        variant={'delete'}
        color="text-white"
        onClick={() => router.push(SegUrl.User)}
      >
        Button test
      </Button>
      <Form {...methods}>
        <form>
          <CustomFormField
            name="example"
            label="Example Field"
            placeholder="Enter something..."
            className="flex"
            labelClassName="mr-4 w-32"
          />
        </form>
      </Form>
    </Begin>
  );
};

export default Header;

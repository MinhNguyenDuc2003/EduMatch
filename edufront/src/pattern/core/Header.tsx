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
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const schemas = z.object({
  example: z.string().min(2, { message: 'Min length is 2' }),
});

type schemaType = z.infer<typeof schemas>;

const Header = () => {
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();

  const methods = useForm<schemaType>({
    resolver: zodResolver(schemas),
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
        variant={'ok'}
        color="text-white"
        onClick={() => router.push(SegUrl.User)}
      >
        Button test
      </Button>
      <Form {...methods}>
        <form onSubmit={methods.handleSubmit((data) => console.log(data))} className="space-y-4">
          <CustomFormField
            name="example"
            label="Example Field"
            placeholder="Enter something..."
            className="flex"
            labelClassName="mr-4 w-32"
          />

          <Button type="submit" label="Submit" />
        </form>
      </Form>
    </Begin>
  );
};

export default Header;

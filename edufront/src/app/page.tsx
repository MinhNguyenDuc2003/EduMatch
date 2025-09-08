'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { SegUrl } from '../@init/base';
import { Content, Core } from '../lib/by/Div';

export default function Home() {
  const router = useRouter();
  return (
    <Core>
      <h1>Home</h1>
      <Content>
        <Link href={SegUrl.User}>Đi tới màn hình User </Link>
      </Content>
      <button onClick={() => router.push(SegUrl.Profile)}>Đi tới màn hình Profile</button>
    </Core>
  );
}

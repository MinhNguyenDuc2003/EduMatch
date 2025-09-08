'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Content, Core } from '../lib/by/Div';

export default function Home() {
  const router = useRouter();
  return (
    <Core>
      <h1>Home</h1>
      <Content>
      <Link href="/user">Đi tới màn hình User </Link>

      </Content>
      <button onClick={() => router.push('/profile')}>Đi tới màn hình Profile</button>
    </Core>
  );
}

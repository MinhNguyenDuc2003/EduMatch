"use client";
import { SegUrl } from "@/src/@init/base";
import { Begin } from "@/src/lib/by/Div";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

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
    <Begin className="border-b border-b-gray-400 py-5 sticky top-0 z-50 bg-white">
      <Link href={SegUrl.User}>Đi tới màn hình User </Link>
      <button onClick={() => router.push(SegUrl.Profile)}>Đi tới màn hình Profile</button>
    </Begin>
  );
};

export default Header;

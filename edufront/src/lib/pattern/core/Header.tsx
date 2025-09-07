"use client";
import { useEffect, useState } from "react";

const Header = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

 
  if (!isMounted) {
    return null;
  }
  return (
    <header className="border-b border-b-gray-400 py-5 sticky top-0 z-50 bg-white">
      <div>
        Header
      </div>
    </header>
  );
};

export default Header;

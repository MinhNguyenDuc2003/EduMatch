"use client";
import { useEffect, useState } from "react";

const Footer = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
  return (
    <footer className="bg-[#A0BBA7] border-t">
      <div>footer</div>
    </footer>
  );
};

export default Footer;

'use client';
import { Facebook, Instagram, Linkedin, Youtube } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const footerSections = [
  {
    title: 'Scholarships',
    links: [
      { name: 'Find Scholarships', href: '/scholarships' },
      { name: 'Merit-Based', href: '/scholarships/merit' },
      { name: 'Need-Based', href: '/scholarships/need' },
    ],
  },
  {
    title: 'Colleges',
    links: [
      { name: 'College Search', href: '/colleges' },
      { name: 'Rankings', href: '/colleges/rankings' },
      { name: 'Admissions', href: '/colleges/admissions' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { name: 'Student Loans', href: '/loans' },
      { name: 'Calculators', href: '/calculators' },
      { name: 'Guides', href: '/guides' },
    ],
  },
];

const socialLinks = [
  { icon: Facebook, href: '#', label: 'Facebook' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
  { icon: Youtube, href: '#', label: 'YouTube' },
  { icon: Instagram, href: '#', label: 'Instagram' },
];

const Footer = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
  return (
    <footer className="bg-background border-t border-border">
      <div className="px-4 lg:px-40 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 gap-8">
          {/* Logo and Social Media */}
          <div className="space-y-6">
            <Link className="flex items-center" href={'/'}>
              <Image src={'/logo.svg'} alt="logo" width={75} height={75} />
              <span className="ml-2.5 text-2xl">Edu</span>
              <span className="text-2xl text-[#3D6CB9] font-bold ">Match</span>
            </Link>

            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="w-10 h-10 bg-muted hover:bg-muted/80 rounded-lg flex items-center justify-center transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5 text-muted-foreground" />
                </a>
              ))}
            </div>
          </div>

          {/* Footer Links */}
          {footerSections.map((section) => (
            <div key={section.title} className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="bg-primary-brand">
        <div className="container mx-auto px-4 py-4">
          <p className="text-center text-primary-foreground/80">Copyright © 2025, EduMatch</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

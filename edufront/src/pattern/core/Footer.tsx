'use client';
import { Facebook, Instagram, Linkedin, Youtube } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { useAuth } from '@/hooks/useAuth';

const socialLinks = [
  { icon: Facebook, href: '#', label: 'Facebook' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
  { icon: Youtube, href: '#', label: 'YouTube' },
  { icon: Instagram, href: '#', label: 'Instagram' },
];

const Footer = () => {
  const [isMounted, setIsMounted] = useState(false);
  const t = useTranslations('footer');
  const { isAuthenticated, isLoading: isAuthLoading } = useAuth();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  const footerSections = [
    {
      title: t('quickLinks'),
      links: [
        { name: t('home'), href: '/home' },
        { name: t('scholarships'), href: '/scholarships' },
        { name: t('news'), href: '/news' },
        { name: t('howItWorks'), href: '/how-it-works' },
      ],
    },
    {
      title: t('resources'),
      links: [
        { name: t('policy'), href: '/policy' },
        { name: t('providerGuidelines'), href: '/scholarship-provider-guidelines' },
        { name: t('subscriptions'), href: '/subscriptions' },
      ],
    },
  ];

  // Add My Account section for authenticated users
  if (isAuthenticated && !isAuthLoading) {
    footerSections.push({
      title: t('myAccount'),
      links: [
        { name: t('myProfile'), href: '/applicant/profile' },
        { name: `${t('myActivity')}`, href: '/applicant/activity?tab=tracking' },
        { name: `${t('tracking')}`, href: '/applicant/activity?tab=tracking' },
        {
          name: `${t('following')}`,
          href: '/applicant/activity?tab=following',
        },
        {
          name: `${t('application')}`,
          href: '/applicant/activity?tab=application',
        },
        { name: `${t('applied')}`, href: '/applicant/activity?tab=applied' },
        { name: `${t('report')}`, href: '/applicant/activity?tab=report' },
      ],
    });
  }

  return (
    <footer className="bg-background border-t border-border">
      <div className="px-4 lg:px-40 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 gap-8">
          {/* Logo and Social Media */}
          <div className="space-y-6">
            <Link className="flex items-center" href={'/home'}>
              <Image
                src={'https://es5urvh1np.ufs.sh/f/DHR6tEJ9PQozF4xgrm8xYeQBLvSq5K1DUnpHR8VwMIEazuhg'}
                alt="logo"
                width={75}
                height={75}
                unoptimized
              />
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
                    <Link
                      href={link.href}
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.name}
                    </Link>
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
          <p className="text-center text-primary-foreground/80">{t('copyright')}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

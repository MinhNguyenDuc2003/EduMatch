import { Button } from '@/lib/cus/button';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';

const HeroSection = () => {
  const router = useRouter();
  const t = useTranslations('scholarshipProviderGuidelines.heroSection');

  return (
    <div className="px-4 lg:px-40 py-6  bg-[#FAFAF6] space-y-6">
      <div className="flex gap-x-40 justify-center items-center flex-wrap-reverse md:flex-nowrap">
        <div className="flex flex-col gap-4 max-w-md">
          <h1 className="text-4xl flex flex-col">
            <span className="font-semibold">{t('headLine1')}</span>
            <span className="font-bold text-primary-brand">{t('headLine2')}</span>
          </h1>
          <p className="text-2xl">{t('description')}</p>
          <Button
            className="w-full py-4 rounded-lg font-semibold transition-all bg-primary-brand text-white"
            variant="custom"
            onClick={() => router.push('/create-provider-profile')}
          >
            {t('button')}
          </Button>
        </div>
        <div className="border-10 border-black aspect-square -rotate-4 scale-[0.9] max-w-md">
          <div className="border-10 aspect-square border-primary-brand rotate-8 scale-[1.035]">
            <Image
              src={'https://es5urvh1np.ufs.sh/f/DHR6tEJ9PQoz0tyrVlousoN38DeC6dw4kO9PZznbG0qMh2mW'}
              alt="Scholarship Providers Homepage"
              width={300}
              height={300}
              className="aspect-square -rotate-4 scale-[1.035]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;

'use client';

import { Container } from '@/lib/by/Div';
import Header from '@/pattern/core/Header';
import LanguageSwitcher from '@/pattern/share/LanguageSwitcher';
import { useTranslations } from 'next-intl';
import Context from './seg/context';
import { CustomFormField } from '@/pattern/share/CustomFormField';

export default function HomePage() {
  const t = useTranslations('home');
  
  return (
    <Context.Provider>
      <Context.Consumer>
        {({ data, methods : { watch, getValues, setValue}  }) => {
          return (
            <>
              <h1 className='text-3xl text-red-600'>{t('title')}</h1>
              <Header />
              <CustomFormField
              name='Fields.User.name'
              label='Name'
              placeholder='Enter something...'
              className='flex'
              labelClassName='mr-4 w-32'
              inputClassName='flex-1'
              />
              {watch('Fields.User.name')}
              {watch('Fields.User.age')}
               <LanguageSwitcher />
            </>
          );
        }}
      </Context.Consumer>
    </Context.Provider>
  );
}

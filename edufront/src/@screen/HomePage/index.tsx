'use client';

import { Container } from '@/lib/by/Div';
import Header from '@/pattern/core/Header';
import LanguageSwitcher from '@/pattern/share/LanguageSwitcher';
import { useTranslations } from 'next-intl';
import Context from './seg/context';
import { CustomFormField } from '@/lib/cus/CustomFormField';
import { Button } from '@/lib/cus/button';

export default function HomePage() {
  const t = useTranslations('home');
  
  return (
    <Context.Provider>
      <Context.Consumer>
        {({ data, methods : { watch, getValues, setValue},meds  }) => {
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
              <CustomFormField
              name='Fields.User.age'
              label='Age'
              placeholder='Enter something...'
              className='flex'
              labelClassName='mr-4 w-32'
              inputClassName='flex-1'
              />
              <CustomFormField
              name='Fields.User.gmail'
              label='Gmail'
              placeholder='Enter something...'
              className='flex'
              labelClassName='mr-4 w-32'
              inputClassName='flex-1'
              />
              <CustomFormField
              name='Fields.User.description'
              label='Description'
              placeholder='Enter something...'
              className='flex'
              labelClassName='mr-4 w-32'
              inputClassName='flex-1'
              />
              {watch('Fields.User.name')}
              {watch('Fields.User.age')}
              <Button label='Push data to N8n' onClick={() => meds.onPushDataToN8n()}/>
               <LanguageSwitcher />
               
            </>
          );
        }}
      </Context.Consumer>
    </Context.Provider>
  );
}

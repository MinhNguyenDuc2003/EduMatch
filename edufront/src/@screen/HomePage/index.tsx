'use client';

import { Anchor } from '@/lib/by/Div';
import { CustomFormField } from '@/lib/cus/CustomFormField';
import { Button } from '@/lib/cus/button';
import Header from '@/pattern/core/Header';
import CardBigPic from '@/pattern/share/CardBigPic';
import CardSmalPic from '@/pattern/share/CardSmalPic';
import { compact, map } from 'lodash';
import { useTranslations } from 'next-intl';
import Context from './seg/context';
import AddFiled from '@/pattern/share/AddFiled';
import Footer from '@/pattern/core/Footer';

export default function HomePage() {
  const t = useTranslations('home');

  return (
    <Context.Provider>
      <Context.Consumer>
        {({ ss, methods: { watch, getValues, setValue, handleSubmit }, meds }) => {
          return (
            <>
              {/* <h1 className="text-3xl text-red-600">{t('title')}</h1> */}

              <Header />

              {/* <CustomFormField
                name="Fields.User.name"
                label="Name"
                placeholder="Enter something..."
                // className="flex"
                labelClassName="mr-4 w-32"
                inputClassName="w-64"
              />
              <CustomFormField
                name="Fields.User.age"
                label="Age"
                placeholder="Enter something..."
                // className="flex"
                labelClassName="mr-4 w-32"
                inputClassName="flex-1"
              />
              <CustomFormField
                name="Fields.User.gmail"
                label="Gmail"
                placeholder="Enter something..."
                // className="flex"
                labelClassName="mr-4 w-32"
                inputClassName="flex-1"
              />
              <CustomFormField
                name="Fields.User.description"
                label="Description"
                placeholder="Enter something..."
                // className="flex"
                labelClassName="mr-4 w-32"
                inputClassName="flex-1"
              />

              {watch('Fields.User.name')}
              {watch('Fields.User.age')} */}

              {/* <Button label="Push data to N8n" onClick={handleSubmit(meds.onPushDataToN8n)} /> */}
              {/* <Button
                variant={'Blue'}
                label="Push data to N8n"
                onClick={handleSubmit(meds.onPushDataToN8n)}
              />
              <Button
                variant={'Gray'}
                label="Push data to N8n"
                onClick={handleSubmit(meds.onPushDataToN8n)}
              /> */}
              <div className="lg:px-40 py-4">
                <Anchor className="grid grid-cols-3 gap-5">
                  {map(ss.Joint.ListScholarshipOpportunities, (item) => (
                    <CardSmalPic
                      key={item.OpportunityId}
                      // picture="/default-avatar.png"
                      title={item.Title}
                      amount={item?.FundingAmount ?? 0}
                      deadline={item.Deadline}
                      description={item.ShortDescription}
                      tagName={compact([item?.Country, item?.FieldOfStudy])}
                      titleButton="Apply Now"
                      onClick={() => meds.onPushDataToN8n(item)}
                    />
                  ))}
                </Anchor>
                <Anchor className="grid grid-cols-4 gap-5 mt-7">
                  {map(ss.Joint.ListScholarshipOpportunities, (item) => (
                    <CardBigPic
                      key={item.OpportunityId}
                      // picture="/default-avatar.png"
                      title={item.Title}
                      amount={item?.FundingAmount ?? 0}
                      deadline={item.Deadline}
                      description={item.ShortDescription}
                      tagName={item?.Country}
                      titleButton="Apply Now"
                      onClick={() => console.log(`Apply for ${item.Title}`)}
                    />
                  ))}
                </Anchor>
                <AddFiled />
              </div>

              <Footer />
            </>
          );
        }}
      </Context.Consumer>
    </Context.Provider>
  );
}

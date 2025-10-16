'use client';

import { Anchor } from '@/lib/by/Div';
import Footer from '@/pattern/core/Footer';
import Header from '@/pattern/core/Header';
import CardBigPic from '@/pattern/share/CardBigPic';
import CardSmalPic from '@/pattern/share/CardSmalPic';
import { compact, map } from 'lodash';
import Context from './seg/context';
import { Button } from '@/lib/cus/button';

export default function HomePage() {
  return (
    <Context.Provider>
      <Context.Consumer>
        {({ ss, methods: { watch, getValues, setValue, handleSubmit }, meds }) => {
          return (
            <>
              {/* <h1 className="text-3xl text-red-600">{t('title')}</h1> */}

              <Header />

              {/* Banner Section */}
              <div className="lg:px-40 py-24 bg-[#fafaf6]">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                  {/* Left Section - Banner Content */}
                  <div className="space-y-6">
                    <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                      Find Your Perfect Scholarship Match
                    </h1>
                    <p className="text-lg text-gray-600 leading-relaxed">
                      Connect with thousands of scholarship opportunities tailored to your academic
                      goals and aspirations. Our intelligent matching system helps you discover the
                      perfect funding opportunities that align with your profile.
                    </p>
                    <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg font-semibold rounded-lg">
                      Explore Scholarships
                    </Button>
                  </div>

                  {/* Right Section - Placeholder */}
                  <div className="bg-gray-200 rounded-lg h-80 lg:h-96 flex items-center justify-center">
                    <span className="text-gray-500 text-lg">Banner Image Placeholder</span>
                  </div>
                </div>
              </div>

              <div className="lg:px-40 py-24">
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
              </div>

              <Footer />
            </>
          );
        }}
      </Context.Consumer>
    </Context.Provider>
  );
}

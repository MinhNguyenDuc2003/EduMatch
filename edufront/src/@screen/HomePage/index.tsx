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
              <div className="lg:px-40 py-20 bg-[#fafaf6]">
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
                    <Button
                      className="bg-[#3D6CB9] hover:bg-blue-700 text-white px-10 py-5 text-xl font-semibold rounded-lg"
                      value={'Explore Scholarships'}
                    />
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
                      key={item.Id}
                      // picture="/default-avatar.png"
                      title={item.Title}
                      amount={item?.Funding_amount ?? 0}
                      deadline={item.End_date}
                      description={item.Short_description}
                      tagName={compact([item?.Country, item?.University, item?.Study_level])}
                      titleButton="Apply Now"
                      onClick={() => meds.onPushDataToN8n(item)}
                      university={item.University}
                      study_level={item.Study_level}
                      scholarship_type={item.Scholarship_type}
                      gpa_requirement={item.Gpa_requirement}
                      country={item.Country}
                    />
                  ))}
                </Anchor>
                <Anchor className="grid grid-cols-4 gap-5 mt-7">
                  {map(ss.Joint.ListScholarshipOpportunities, (item) => (
                    <CardBigPic
                      key={item.Id}
                      // picture="/default-avatar.png"
                      title={item.Title}
                      amount={item?.Funding_amount ?? 0}
                      deadline={item.End_date}
                      description={item.Short_description}
                      tagName={item?.University}
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

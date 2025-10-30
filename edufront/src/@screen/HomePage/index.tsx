'use client';

import Footer from '@/pattern/core/Footer';
import Header from '@/pattern/core/Header';
import Context from './seg/context';
import {
  BannerSection,
  FeaturesSection,
  HowItWorksSection,
  ScholarshipsSection,
  CTASection,
} from './components';

export default function HomePage() {
  return (
    <Context.Provider>
      <Context.Consumer>
        {({ ss, methods: { watch, getValues, setValue, handleSubmit }, meds }) => {
          return (
            <>
              <Header />

              <BannerSection />

              <FeaturesSection />

              <HowItWorksSection />

              <ScholarshipsSection
                scholarships={ss.Joint.ListScholarshipOpportunities || []}
                onApply={(item) => meds.onPushDataToN8n(item)}
                onViewDetails={(item) => console.log('View Details:', item.Title)}
              />

              <CTASection />

              <Footer />
            </>
          );
        }}
      </Context.Consumer>
    </Context.Provider>
  );
}

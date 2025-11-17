import { howItWorksSteps } from '../mockData';
import { useTranslations } from 'next-intl';

export default function HowItWorksSection() {
  const t = useTranslations('homepage.howItWorks');

  const steps = [
    {
      step: '01',
      icon: howItWorksSteps[0].icon,
      title: t('step1.title'),
      description: t('step1.description'),
    },
    {
      step: '02',
      icon: howItWorksSteps[1].icon,
      title: t('step2.title'),
      description: t('step2.description'),
    },
    {
      step: '03',
      icon: howItWorksSteps[2].icon,
      title: t('step3.title'),
      description: t('step3.description'),
    },
  ];

  return (
    <section className="py-8 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-8">
          <h2 className="text-3xl font-bold text-slate-900 mb-2">{t('title')}</h2>
          <p className="text-lg text-slate-600">{t('subtitle')}</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 relative">
          {/* Connection lines */}
          <div className="hidden lg:block absolute top-12 left-1/4 right-1/4 h-0.5 bg-gradient-to-r from-blue-200 via-indigo-200 to-purple-200" />

          {steps.map((step, idx) => (
            <div key={idx} className="relative">
              <div className="bg-white rounded-xl p-5 border-2 border-gray-200 hover:border-blue-400 transition-all">
                <div className="relative mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center shadow-md">
                    <step.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                    <span className="text-blue-600 font-bold text-sm">{step.step}</span>
                  </div>
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{step.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

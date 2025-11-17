import { Card } from '@/lib/by/Div';
import { featuresData } from '../mockData';
import { useTranslations } from 'next-intl';

export default function FeaturesSection() {
  const t = useTranslations('homepage.features');

  const features = [
    {
      icon: featuresData[0].icon,
      title: t('smartMatching.title'),
      description: t('smartMatching.description'),
    },
    {
      icon: featuresData[1].icon,
      title: t('verifiedOpportunities.title'),
      description: t('verifiedOpportunities.description'),
    },
    {
      icon: featuresData[2].icon,
      title: t('instantApplications.title'),
      description: t('instantApplications.description'),
    },
    {
      icon: featuresData[3].icon,
      title: t('expertGuidance.title'),
      description: t('expertGuidance.description'),
    },
    {
      icon: featuresData[4].icon,
      title: t('personalizedDashboard.title'),
      description: t('personalizedDashboard.description'),
    },
    {
      icon: featuresData[5].icon,
      title: t('globalNetwork.title'),
      description: t('globalNetwork.description'),
    },
  ];

  return (
    <section className="py-8 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-8">
          <h2 className="text-3xl font-bold text-slate-900 mb-2">{t('title')}</h2>
          <p className="text-lg text-slate-600">{t('subtitle')}</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {features.map((feature, idx) => (
            <Card
              key={idx}
              className="flex flex-col items-center bg-white rounded-lg p-4 hover:shadow-md transition-all duration-300 border border-gray-200 hover:-translate-y-0.5 gap-3"
            >
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center group-hover:scale-105 transition-transform">
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-base font-bold text-slate-900 text-center">{feature.title}</h3>
              <p className="text-slate-600 text-sm text-center leading-relaxed">
                {feature.description}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

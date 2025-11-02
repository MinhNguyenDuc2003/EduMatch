import { Card } from '@/lib/by/Div';
import { featuresData } from '../mockData';

export default function FeaturesSection() {
  return (
    <section className="py-8 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-8">
          <h2 className="text-3xl font-bold text-slate-900 mb-2">Why Choose EduMatch?</h2>
          <p className="text-lg text-slate-600">
            Our platform combines cutting-edge technology with personalized support to help you
            secure your educational funding.
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {featuresData.map((feature, idx) => (
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

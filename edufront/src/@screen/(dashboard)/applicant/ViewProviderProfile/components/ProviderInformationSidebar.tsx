'use client';
import { Mail, Phone, Building2, MapPin, Calendar, Award, Briefcase, Users } from 'lucide-react';
import { useTranslations } from 'next-intl';

interface ProviderInformationSidebarProps {
  providerProfile: ProviderProfile;
}

export default function ProviderInformationSidebar({
  providerProfile,
}: ProviderInformationSidebarProps) {
  const t = useTranslations('viewProviderProfile.sidebar');

  return (
    <div className="lg:col-span-1">
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm sticky top-6 max-h-[calc(100vh-3rem)] flex flex-col">
        <div className="bg-gradient-to-r from-[#1B3053] to-[#3D6CB9] px-6 py-1 rounded-t-lg flex-shrink-0">
          <h2 className="text-base font-semibold text-white">{t('title')}</h2>
        </div>
        <div className="px-6 py-4 space-y-4 overflow-y-auto flex-1 scrollbar-hide">
          {/* Organization Type */}
          {providerProfile.organizationType && (
            <div className="flex items-center gap-3">
              <Building2 className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-500">{t('organizationType')}</p>
                <p className="text-sm text-gray-900">{providerProfile.organizationType}</p>
              </div>
            </div>
          )}

          {/* Country */}
          {providerProfile.country && (
            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-500">{t('country')}</p>
                <p className="text-sm text-gray-900">{providerProfile.country}</p>
              </div>
            </div>
          )}

          {/* Year Established */}
          {providerProfile.yearEstablished && (
            <div className="flex items-center gap-3">
              <Calendar className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-500">{t('yearEstablished')}</p>
                <p className="text-sm text-gray-900">{providerProfile.yearEstablished}</p>
              </div>
            </div>
          )}

          {/* Address Summary */}
          {providerProfile.addressSummary && (
            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-500">{t('address')}</p>
                <p className="text-sm text-gray-900">{providerProfile.addressSummary}</p>
              </div>
            </div>
          )}

          {/* Accreditation */}
          {providerProfile.accreditation && (
            <div className="flex items-center gap-3">
              <Award className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-500">{t('accreditation')}</p>
                <p className="text-sm text-gray-900">{providerProfile.accreditation}</p>
              </div>
            </div>
          )}

          {/* Specialization */}
          {providerProfile.specialization && (
            <div className="flex items-center gap-3">
              <Briefcase className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-500">{t('specialization')}</p>
                <p className="text-sm text-gray-900">{providerProfile.specialization}</p>
              </div>
            </div>
          )}

          {/* Contact Persons */}
          {providerProfile.providerContactDtos &&
            providerProfile.providerContactDtos.length > 0 && (
              <div className="pt-4 border-t border-gray-200">
                <div className="flex items-center gap-2 mb-3">
                  <Users className="w-5 h-5 text-gray-400" />
                  <p className="text-sm font-semibold text-gray-700">{t('contactPersons')}</p>
                </div>
                <div className="space-y-4">
                  {providerProfile.providerContactDtos.map((contact, index) => (
                    <div key={contact.id || index} className="pl-7 space-y-2">
                      <div>
                        <p className="text-sm font-medium text-gray-900">{contact.contactName}</p>
                        {contact.roleTitle && (
                          <p className="text-xs text-gray-500">{contact.roleTitle}</p>
                        )}
                      </div>
                      {contact.email && (
                        <div className="flex items-center gap-2">
                          <Mail className="w-4 h-4 text-gray-400 flex-shrink-0" />
                          <a
                            href={`mailto:${contact.email}`}
                            className="text-xs text-blue-600 hover:text-blue-700 hover:underline"
                          >
                            {contact.email}
                          </a>
                        </div>
                      )}
                      {contact.phone && (
                        <div className="flex items-center gap-2">
                          <Phone className="w-4 h-4 text-gray-400 flex-shrink-0" />
                          <a
                            href={`tel:${contact.phone}`}
                            className="text-xs text-blue-600 hover:text-blue-700 hover:underline"
                          >
                            {contact.phone}
                          </a>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
        </div>
      </div>
    </div>
  );
}

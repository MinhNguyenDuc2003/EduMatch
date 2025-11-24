import { Heart } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function FavouriteEmptyState() {
  const t = useTranslations('provider.favourite');

  return (
    <div className="bg-gray-50 rounded-lg p-12 text-center">
      <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
      <h3 className="text-lg font-semibold text-gray-700 mb-2">{t('noFavourites')}</h3>
      <p className="text-gray-600">{t('noFavouritesDescription')}</p>
    </div>
  );
}


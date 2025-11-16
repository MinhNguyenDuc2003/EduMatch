import ScholarshipCarousel from '@/@screen/(dashboard)/provider/Applications/components/ScholarshipCarousel';
import { DEFAULT_NEWS_FORM_VALUES } from '@/constants/DefaultValues';
import { Button } from '@/lib/cus/button';
import { CustomFormField } from '@/lib/cus/CustomFormField';
import { Form } from '@/lib/cus/form';
import { INews, newsSchema } from '@/lib/schemas';
import { useGetScholarshipsQuery } from '@/state/apiProvider';
import { zodResolver } from '@hookform/resolvers/zod';
import { Image as ImageIcon, X } from 'lucide-react';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslations } from 'next-intl';

const NewsForm = ({
  news,
  onSubmit,
  onImagesChange,
  onDeleteImage,
  isLoading,
}: {
  news?: News;
  onSubmit: (data: INews) => void;
  onImagesChange?: (images: File[]) => void;
  onDeleteImage?: (imageId: number) => void;
  isLoading?: boolean;
}) => {
  const t = useTranslations('providerNews');
  const [uploadedImages, setUploadedImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<Array<{ url: string; id?: number }>>([]);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const { data: scholarships, isLoading: isLoadingScholarships } = useGetScholarshipsQuery();

  // Form setup
  const methods = useForm<INews>({
    reValidateMode: 'onSubmit',
    mode: 'onChange',
    resolver: zodResolver(newsSchema),
    defaultValues: DEFAULT_NEWS_FORM_VALUES,
  });

  useEffect(() => {
    if (news) {
      methods.reset({
        ...DEFAULT_NEWS_FORM_VALUES,
        ...{
          ...news,
          scholarshipId: news.scholarshipId ? Number(news.scholarshipId) : undefined,
        },
      });
    }
  }, [news, methods]);

  const { watch, setValue } = methods;

  // Handle image uploads
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    const newImages = [...uploadedImages, ...files];
    setUploadedImages(newImages);
    onImagesChange?.(newImages);

    // Create previews for new images
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviews((prev) => [...prev, { url: reader.result as string }]);
      };
      reader.readAsDataURL(file);
    });

    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleRemoveImage = (index: number) => {
    const imageToRemove = imagePreviews[index];

    // If it has an id, it's an existing image - call delete handler
    if (imageToRemove.id) {
      onDeleteImage?.(imageToRemove.id);
    } else {
      // If it's a new image, remove from uploadedImages
      const newIndex = imagePreviews.slice(0, index).filter((img) => !img.id).length;
      const newFiles = uploadedImages.filter((_, i) => i !== newIndex);
      setUploadedImages(newFiles);
      onImagesChange?.(newFiles);
    }

    setImagePreviews(imagePreviews.filter((_, i) => i !== index));
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  // Load initial images from scholarship
  useEffect(() => {
    if (news?.newsMedias && news.newsMedias.length > 0) {
      const initialImages = news.newsMedias.map((media) => ({
        url: media.url,
        id: media.id,
      }));
      setImagePreviews(initialImages);

      // Transform initial images to files and set uploaded images
    }
  }, [news]);

  return (
    <Form {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <div className="space-y-8">
          {/* Basic Information */}
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-gray-900">{t('basicInformation')}</h2>

            {/* Title */}
            <CustomFormField
              name="title"
              label={t('newsTitle')}
              type="text"
              placeholder={t('newsTitlePlaceholder')}
              isBorder={true}
            />

            {/* Content */}
            <CustomFormField
              name="content"
              label={t('content')}
              type="richtext"
              placeholder={t('contentPlaceholder')}
              isBorder={true}
            />
          </div>

          {/* Images Upload */}
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-gray-900">{t('images')}</h2>
            <p className="text-sm text-gray-600">{t('imagesSubtitle')}</p>

            {/* Hidden file input */}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={handleImageChange}
            />

            {/* Upload button and image grid */}
            <div className="space-y-4">
              <Button
                type="button"
                onClick={handleImageClick}
                variant="outline"
                className="border-2 border-dashed text-gray-500 border-gray-300 hover:border-[#3D6CB9] hover:bg-[#3D6CB9]/5"
              >
                <ImageIcon className="w-4 h-4 mr-2" />
                {t('addImages')}
              </Button>

              {/* Image previews */}
              {imagePreviews.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {imagePreviews.map((preview, index) => (
                    <div
                      key={index}
                      className="relative group aspect-video rounded-lg overflow-hidden border-2 border-gray-200"
                    >
                      <Image
                        src={preview.url}
                        alt={`News image ${index + 1}`}
                        width={100}
                        height={100}
                        unoptimized
                        className="w-full h-full object-cover"
                      />

                      <button
                        type="button"
                        onClick={() => handleRemoveImage(index)}
                        className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {imagePreviews.length === 0 && (
                <p className="text-sm text-gray-500 italic">{t('noImages')}</p>
              )}
            </div>
          </div>

          {/* Scholarship */}
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-gray-900">{t('scholarship')}</h2>
            <p className="text-sm text-gray-600">{t('selectScholarship')}</p>

            <ScholarshipCarousel
              scholarships={scholarships || []}
              value={watch('scholarshipId')}
              onSelectAction={(scholarship) =>
                setValue('scholarshipId', scholarship?.id ?? undefined)
              }
              isLoading={isLoadingScholarships}
            />
          </div>

          {/* Submit Button */}
          <div className="pt-4 flex gap-4">
            <Button
              type="submit"
              className="flex-1 bg-[#3D6CB9] hover:bg-[#2F5A9E] text-white py-3 text-base font-semibold"
              disabled={isLoading}
            >
              {isLoading ? t('submitting') : t('submit')}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default NewsForm;

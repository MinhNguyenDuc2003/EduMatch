/**
 * Extract image URLs from scholarship media objects
 */
export const getScholarshipImages = (scholarship: Scholarship): string[] => {
  if (!scholarship.scholarshipMedias || scholarship.scholarshipMedias.length === 0) {
    return [];
  }

  return scholarship.scholarshipMedias
    .filter((media) => media.url && media.url.trim() !== '')
    .map((media) => media.url);
};

/**
 * Get the first image URL from scholarship media
 */
export const getScholarshipFirstImage = (scholarship: Scholarship): string | undefined => {
  const images = getScholarshipImages(scholarship);
  return images.length > 0 ? images[0] : undefined;
};

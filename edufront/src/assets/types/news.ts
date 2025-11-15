declare global {
  type News = {
    id: number;
    providerId: number;
    scholarshipId?: number;
    providerProfileVo?: ProviderProfile;
    scholarship?: Scholarship;
    title: string;
    content: string;
    link?: string;
    newsMedias?: NewsMedia[];
  };

  type NewsMedia = {
    id: number;
    s3Key: string;
    contentType: string;
    size: number;
    folderName: string;
    fileName: string;
    isPublic: boolean;
    thumbnail: string;
    url: string;
  };
}

export {};

'use client';

import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Context from '../seg/context';
import { onSetLoading } from 'src/utils/eventBus';
import { 
  Calendar, 
  MapPin, 
  Globe, 
  CheckCircle2, 
  Building2, 
  Mail, 
  ArrowLeft,
  Share2
} from 'lucide-react';

export default function NewsDetail() {
  const { id } = useParams();

  return (
    <Context.Provider>
      <Context.Consumer>
        {({ meds }) => <NewsDetailInner meds={meds} id={id as string} />}
      </Context.Consumer>
    </Context.Provider>
  );
}

function NewsDetailInner({ meds, id }: { meds: any; id: string }) {
  const [data, setData] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    if (id && meds?.onGetByID) {
      (async () => {
        onSetLoading(true);
        try {
            const res = await meds.onGetByID(id);
            setData(res);
        } catch (error) {
            console.error(error);
        } finally {
            onSetLoading(false);
        }
      })();
    }
  }, [id, meds]);

  if (!data)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-3 animate-pulse">
           <div className="h-16 w-16 bg-gray-200 rounded-lg"></div>
           <div className="text-gray-400 font-medium">Loading Article...</div>
        </div>
      </div>
    );

  const provider = data.providerProfileVo;
  const featuredImage = data.newsMedias?.[0]?.url;
  
  // Format Date
  const publishDate = new Date(data.publishedAt).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
  });

  return (
    <div className="min-h-screen bg-gray-50 py-8 font-sans">
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation Bar */}
        {/* <div className="flex justify-between items-center mb-8">
            <button 
                onClick={() => router.back()}
                className="flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors"
            >
                <ArrowLeft size={20} /> Back to News
            </button>
            <button className="flex items-center gap-2 text-blue-600 hover:bg-blue-50 px-3 py-1.5 rounded-lg transition-colors text-sm font-medium">
                <Share2 size={18} /> Share
            </button>
        </div> */}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            
            {/* Left Column: Main Content */}
            <div className="lg:col-span-2 space-y-8">
                
                {/* Article Header */}
                <div className="space-y-4">
                    <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight">
                        {data.title}
                    </h1>
                    
                    <div className="flex items-center gap-4 text-sm text-gray-500 border-b border-gray-100 pb-6">
                        <div className="flex items-center gap-2">
                            {provider?.logoUrl ? (
                                <Image 
                                    src={provider.logoUrl} 
                                    width={32} 
                                    height={32} 
                                    alt="Logo" 
                                    className="rounded-full border border-gray-200"
                                />
                            ) : (
                                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
                                    {provider?.organizationName?.[0]}
                                </div>
                            )}
                            <span className="font-medium text-gray-900">{provider?.organizationName}</span>
                        </div>
                        <span>•</span>
                        <div className="flex items-center gap-1.5">
                            <Calendar size={16} />
                            {publishDate}
                        </div>
                    </div>
                </div>

                {/* Featured Image */}
                {featuredImage && (
                    <div className="relative w-full h-[400px] rounded-2xl overflow-hidden shadow-sm">
                        <Image 
                            src={featuredImage} 
                            alt={data.title} 
                            fill 
                            className="object-cover"
                            priority
                        />
                    </div>
                )}

                {/* Article Content (Rich Text) */}
                <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                    <article 
                        className="prose prose-lg prose-blue max-w-none prose-headings:font-bold prose-a:text-blue-600"
                        dangerouslySetInnerHTML={{ __html: data.content }}
                    />
                </div>

            </div>

            {/* Right Column: Provider Sidebar */}
            <div className="space-y-6">
                
                {/* Provider Profile Card */}
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden sticky top-6">
                    {/* Banner */}
                    <div className="h-24 bg-gray-200 relative">
                        {provider?.bannerUrl && (
                            <Image src={provider.bannerUrl} fill alt="Banner" className="object-cover opacity-80" />
                        )}
                    </div>
                    
                    <div className="px-6 pb-6">
                        {/* Logo & Name */}
                        <div className="relative -mt-10 mb-4 flex flex-col items-center text-center">
                            <div className="w-20 h-20 bg-white rounded-xl shadow-md p-1">
                                <div className="relative w-full h-full rounded-lg overflow-hidden border border-gray-100">
                                    {provider?.logoUrl ? (
                                        <Image src={provider.logoUrl} fill alt="Logo" className="object-contain" />
                                    ) : (
                                        <Building2 className="w-full h-full p-4 text-gray-300"/>
                                    )}
                                </div>
                            </div>
                            <div className="mt-3">
                                <h3 className="text-lg font-bold text-gray-900 flex items-center justify-center gap-1.5">
                                    {provider?.organizationName}
                                    {provider?.verified && <CheckCircle2 size={18} className="text-blue-500 fill-blue-50"/>}
                                </h3>
                                <p className="text-xs text-gray-500 font-medium uppercase tracking-wide mt-1">
                                    {provider?.organizationType}
                                </p>
                            </div>
                        </div>

                        {/* Description */}
                        <p className="text-sm text-gray-600 text-center leading-relaxed mb-6">
                            {provider?.description}
                        </p>

                        {/* Info List */}
                        <div className="space-y-3 border-t border-gray-100 pt-4">
                            <InfoItem icon={<MapPin size={16}/>} text={`${provider?.addressSummary}, ${provider?.country}`} />
                            <InfoItem 
                                icon={<Globe size={16}/>} 
                                text={
                                    <a href={provider?.website} target="_blank" className="text-blue-600 hover:underline">
                                        Website
                                    </a>
                                } 
                            />
                            {provider?.providerContactDtos?.[0] && (
                                <InfoItem 
                                    icon={<Mail size={16}/>} 
                                    text={
                                        <a href={`mailto:${provider.providerContactDtos[0].email}`} className="text-gray-700 hover:text-blue-600">
                                            {provider.providerContactDtos[0].email}
                                        </a>
                                    } 
                                />
                            )}
                        </div>

                        {/* CTA */}
                        <button 
                            onClick={() => router.push(`/profileProvider/${provider?.id}`)}
                            className="w-full mt-6 bg-gray-900 hover:bg-gray-800 text-white font-medium py-2.5 rounded-xl transition-all"
                        >
                            View Organization Profile
                        </button>
                    </div>
                </div>

            </div>
        </div>
      </div>
    </div>
  );
}

function InfoItem({ icon, text }: { icon: any; text: React.ReactNode }) {
    return (
        <div className="flex items-start gap-3 text-sm text-gray-600">
            <div className="mt-0.5 text-gray-400 shrink-0">{icon}</div>
            <div className="flex-1 break-words">{text}</div>
        </div>
    )
}
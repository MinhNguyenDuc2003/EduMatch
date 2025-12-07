'use client';

import Image from 'next/image';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Context from '../seg/context';

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

  useEffect(() => {
    if (id && meds?.onGetByID) {
      (async () => {
        const res = await meds.onGetByID(id);
        setData(res);
      })();
    }
  }, [id]);

  if (!data)
    return (
      <div className="p-16 text-center text-gray-500 animate-pulse">
        Loading news detail...
      </div>
    );

  return (
    <div className="w-[95%] mx-auto space-y-10 py-10">
      <div className="bg-white shadow-md rounded-xl p-6">
        <h1 className="text-3xl font-bold text-gray-800">{data.title}</h1>
        <div className="text-gray-500 mt-2 text-sm">
          Published: {new Date(data.publishedAt).toLocaleString()}
        </div>
      </div>

   

      <div className="bg-white shadow-md rounded-xl p-6">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Content</h2>
        <div
          className="prose max-w-full"
          dangerouslySetInnerHTML={{ __html: data.content }}
        />
        
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <CardLink
          title="Scholarship"
          value={data.scholarship?.title}
          link={`/scholarship/${data.scholarship?.id}`}
        />
        <CardLink
          title="Provider"
          value={data.scholarship?.providerProfileVo?.organizationName}
          link={`/profile/${data.scholarship?.providerProfileVo?.id}`}
        />
      </div>

      <div className="bg-white shadow-md rounded-xl p-6">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Images</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {data.newsMedias?.map((m: any) => (
            <div
              key={m.id}
              className="relative w-full h-48 rounded-lg overflow-hidden border hover:shadow-lg transition-shadow"
            >
              <Image src={m.url} alt={m.fileName} fill className="object-cover" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// function InfoCard({ label, value }: { label: string; value: any }) {
//   return (
//     <div className="bg-white shadow-sm rounded-lg p-4 flex flex-col">
//       <div className="text-gray-500 text-sm">{label}</div>
//       <div className="text-gray-800 font-medium mt-1">{value ?? '—'}</div>
//     </div>
//   );
// }

function CardLink({ title, value, link }: { title: string; value: string; link: string }) {
  return (
    <div className="bg-white shadow-sm rounded-lg p-6 hover:shadow-md transition-shadow">
      <div className="text-gray-500 text-sm">{title}</div>
      <a href={link} className="text-blue-600 font-medium underline mt-1 block">
        {value ?? '—'}
      </a>
    </div>
  );
}

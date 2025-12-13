'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Context from '../seg/context';
import { 
  User, 
  Calendar, 
  ShieldCheck, 
  CreditCard, 
  Clock, 
  CheckCircle2, 
  XCircle,
  Mail,
  Crown
} from 'lucide-react';

export default function SubscriptionPlanDetail() {
  const { id } = useParams();

  return (
    <Context.Provider>
      <Context.Consumer>
        {({ meds }) => <SubscriptionPlanDetailInner meds={meds} id={id as string} />}
      </Context.Consumer>
    </Context.Provider>
  );
}

function SubscriptionPlanDetailInner({ meds, id }: { meds: any; id: string }) {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    if (!id || !meds?.onGetByID) return;
    const fetchData = async () => {
      try {
        const res = await meds.onGetByID(id);
        setData(res);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [id, meds]);

  if (!data)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-3 animate-pulse">
           <div className="h-16 w-16 bg-gray-200 rounded-lg"></div>
           <div className="text-gray-400 font-medium">Loading Subscription...</div>
        </div>
      </div>
    );

  const { plan, customer, startDate, endDate, status, userType } = data;
  const isActive = status === 'true';

  // Date Formatter
  const formatDate = (ts: number) => new Date(Number(ts)).toLocaleDateString('en-US', {
      year: 'numeric', month: 'long', day: 'numeric'
  });

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 font-sans flex justify-center">
      <div className=" w-full grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Left Column: Plan Card & Features */}
          <div className="md:col-span-2 space-y-6">
              
              {/* Membership Card */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden relative">
                  <div className="h-32 bg-gradient-to-r from-blue-600 to-indigo-700 relative overflow-hidden">
                       <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]"></div>
                       <div className="absolute top-6 right-6 text-white/20">
                           <Crown size={120} strokeWidth={1} />
                       </div>
                  </div>
                  
                  <div className="px-8 pb-8">
                      <div className="flex justify-between items-end -mt-12 mb-6">
                          <div className="h-24 w-24 bg-white rounded-2xl shadow-lg p-2 flex items-center justify-center relative">
                              <div className="h-full w-full bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
                                  <ShieldCheck size={40} />
                              </div>
                          </div>
                          <div className={`px-4 py-1.5 rounded-full text-sm font-bold flex items-center gap-2 border ${isActive ? 'bg-green-50 text-green-700 border-green-200' : 'bg-gray-100 text-gray-500 border-gray-200'}`}>
                                {isActive ? <CheckCircle2 size={16}/> : <XCircle size={16}/>}
                                {isActive ? 'ACTIVE SUBSCRIPTION' : 'EXPIRED'}
                          </div>
                      </div>
                      
                      <div>
                          <h1 className="text-2xl font-bold text-gray-900 mb-1">{plan?.name}</h1>
                          <p className="text-gray-500 font-medium mb-4">{plan?.description}</p>
                          
                          <div className="flex items-center gap-6 pt-4 border-t border-gray-100">
                              <div>
                                  <p className="text-xs text-gray-400 font-bold uppercase mb-1">Price</p>
                                  <p className="text-lg font-bold text-gray-900">{plan?.price} {plan?.currency}</p>
                              </div>
                              <div>
                                  <p className="text-xs text-gray-400 font-bold uppercase mb-1">Duration</p>
                                  <p className="text-lg font-bold text-gray-900">{plan?.durationDays} Days</p>
                              </div>
                              <div>
                                  <p className="text-xs text-gray-400 font-bold uppercase mb-1">Target</p>
                                  <span className="inline-block px-2 py-0.5 bg-gray-100 text-gray-600 text-xs font-bold rounded">
                                      {userType}
                                  </span>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>

              {/* Features List */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                  <h3 className="font-bold text-gray-900 mb-6 flex items-center gap-2">
                      <ShieldCheck size={20} className="text-blue-600"/> Plan Features
                  </h3>
                  
                  <div className="grid sm:grid-cols-2 gap-4">
                      {plan?.features?.map((feature: string, idx: number) => (
                          <div key={idx} className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 border border-gray-100">
                              <div className="p-1 bg-green-100 rounded-full text-green-600">
                                  <CheckCircle2 size={14} />
                              </div>
                              <span className="text-sm font-medium text-gray-700 capitalize">
                                  {feature.replace(/_/g, ' ').toLowerCase()}
                              </span>
                          </div>
                      ))}
                  </div>
              </div>

          </div>

          {/* Right Column: Subscriber & Timeline */}
          <div className="space-y-6">
              
              {/* Subscriber Info */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                  <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-4 flex items-center gap-2">
                      <User size={14}/> Subscriber Details
                  </h3>
                  
                  <div className="flex items-center gap-4 mb-6">
                      <div className="h-12 w-12 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-lg">
                          {customer?.firstName?.[0]}
                      </div>
                      <div>
                          <p className="font-bold text-gray-900">{customer?.firstName} {customer?.lastName}</p>
                          <p className="text-sm text-gray-500">@{customer?.username}</p>
                      </div>
                  </div>
                  
                  <div className="space-y-3">
                      <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                          <Mail size={16} className="text-gray-400"/>
                          <span className="text-sm text-gray-600 truncate">{customer?.email}</span>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                          <User size={16} className="text-gray-400"/>
                          <span className="text-sm text-gray-600 capitalize">{userType.toLowerCase()} Account</span>
                      </div>
                  </div>
              </div>

              {/* Timeline Info */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                   <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-4 flex items-center gap-2">
                      <Clock size={14}/> Subscription Period
                  </h3>
                  
                  <div className="relative pl-4 border-l-2 border-gray-100 space-y-6 my-2">
                      <div className="relative">
                          <div className="absolute -left-[21px] top-1 h-3 w-3 rounded-full bg-green-500 border-2 border-white shadow-sm"></div>
                          <p className="text-xs text-gray-400 font-bold uppercase mb-0.5">Started On</p>
                          <p className="font-medium text-gray-900">{formatDate(startDate)}</p>
                      </div>
                      
                      <div className="relative">
                          <div className={`absolute -left-[21px] top-1 h-3 w-3 rounded-full border-2 border-white shadow-sm ${isActive ? 'bg-gray-300' : 'bg-red-500'}`}></div>
                          <p className="text-xs text-gray-400 font-bold uppercase mb-0.5">Expires On</p>
                          <p className={`font-medium ${isActive ? 'text-gray-900' : 'text-red-600'}`}>{formatDate(endDate)}</p>
                      </div>
                  </div>

                  {/* {isActive && (
                       <div className="mt-6 bg-blue-50 text-blue-800 text-xs font-semibold px-3 py-2 rounded-lg text-center">
                           Auto-renews on {formatDate(endDate)}
                       </div>
                  )} */}
              </div>

          </div>
      </div>
    </div>
  );
}
'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Context from '../seg/context';
import { onSetLoading } from 'src/utils/eventBus';
import { 
  Receipt, 
  User, 
  CreditCard, 
  Calendar, 
  CheckCircle2, 
  XCircle, 
  Clock,
  Package,
  ShieldCheck,
  Mail
} from 'lucide-react';

export default function OrderDetail() {
  const { id } = useParams();
  
  return (
    <Context.Provider>
      <Context.Consumer>
        {({ meds }) => <OrderDetailInner meds={meds} id={id as string} />}
      </Context.Consumer>
    </Context.Provider>
  );
}

function OrderDetailInner({ meds, id }: { meds: any; id: string }) {
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
           <div className="text-gray-400 font-medium">Loading Order Details...</div>
        </div>
      </div>
    );

  const { subscription, customer, status } = data;
  const plan = subscription?.plan;

  // Status Styling
  const getStatusStyle = (status: string) => {
    switch(status) {
        case 'PAID': return { color: 'text-green-700 bg-green-50 border-green-200', icon: <CheckCircle2 size={18} /> };
        case 'FAILED': return { color: 'text-red-700 bg-red-50 border-red-200', icon: <XCircle size={18} /> };
        default: return { color: 'text-amber-700 bg-amber-50 border-amber-200', icon: <Clock size={18} /> };
    }
  }
  const statusStyle = getStatusStyle(status);

  // Date Formatter
  const formatDate = (ts: number) => new Date(ts).toLocaleString('en-US', {
      year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
  });

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 font-sans flex justify-center">
      <div className=" w-full bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
        
        {/* Header / Status Bar */}
        <div className="bg-gray-900 text-white p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
                <div className="flex items-center gap-2 text-gray-400 text-sm font-bold uppercase tracking-wider mb-1">
                    <Receipt size={16} /> Order Receipt
                </div>
                {/* <h1 className="text-2xl font-bold text-white">#{data.id}</h1> */}
                {/* <p className="text-gray-400 text-xs mt-1">Transaction ID: {data.transactionId}</p> */}
            </div>
            <div className={`px-4 py-2 rounded-xl border flex items-center gap-2 font-bold shadow-sm ${statusStyle.color.replace('bg-', 'bg-white/10 ').replace('text-', 'text-white ')}`}>
                 {statusStyle.icon}
                 <span className="uppercase tracking-wide text-sm">{status}</span>
            </div>
        </div>

        <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-10">
            
            {/* Left Column: Customer & Payment Info */}
            <div className="md:col-span-1 space-y-8 border-r border-gray-100 pr-4">
                
                {/* Customer Info */}
                <div className="space-y-4">
                    <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wide flex items-center gap-2">
                        <User size={16}/> Customer Details
                    </h3>
                    <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 space-y-3">
                         <div>
                            <p className="text-xs text-gray-500 font-bold uppercase">Name</p>
                            <p className="font-semibold text-gray-900">{customer?.firstName} {customer?.lastName}</p>
                         </div>
                         <div>
                            <p className="text-xs text-gray-500 font-bold uppercase">Username</p>
                            <p className="font-medium text-gray-700">@{customer?.username}</p>
                         </div>
                         <div>
                            <p className="text-xs text-gray-500 font-bold uppercase">Email</p>
                            <a href={`mailto:${customer?.email}`} className="text-blue-600 text-sm hover:underline flex items-center gap-1">
                                <Mail size={12}/> {customer?.email}
                            </a>
                         </div>
                    </div>
                </div>

                {/* Payment Info */}
                <div className="space-y-4">
                    <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wide flex items-center gap-2">
                        <CreditCard size={16}/> Payment Info
                    </h3>
                    <div className="space-y-3">
                        <InfoItem label="Amount Paid" value={`${data.amount} ${data.currency}`} highlight />
                        <InfoItem label="Method" value={data.paymentMethod} />
                        <InfoItem label="Date" value={formatDate(data.paidAt)} />
                    </div>
                </div>

            </div>

            {/* Right Column: Order Items (Subscription) */}
            <div className="md:col-span-2 space-y-6">
                 <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wide flex items-center gap-2">
                    <Package size={16}/> Purchased Plan
                </h3>

                {/* Plan Card */}
                <div className="bg-white border-2 border-blue-50 rounded-2xl overflow-hidden shadow-sm">
                    <div className="bg-blue-50/50 p-4 border-b border-blue-100 flex justify-between items-center">
                        <div>
                            <h4 className="font-bold text-lg text-blue-900">{plan?.name}</h4>
                            <p className="text-xs text-blue-600 font-medium uppercase tracking-wide">{plan?.targetType} PLAN</p>
                        </div>
                        <div className="text-right">
                             <span className="block text-xl font-extrabold text-blue-700">{plan?.price} {plan?.currency}</span>
                             <span className="text-xs text-blue-400 font-medium">/ {plan?.durationDays} Days</span>
                        </div>
                    </div>
                    
                    <div className="p-6 space-y-4">
                        <p className="text-gray-600 text-sm leading-relaxed">
                            {plan?.description}
                        </p>
                        
                        <div className="pt-4 border-t border-gray-100">
                             <p className="text-xs text-gray-400 font-bold uppercase mb-3">Included Features</p>
                             <div className="flex flex-wrap gap-2">
                                {plan?.features?.map((feature: string, idx: number) => (
                                    <span key={idx} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-50 text-gray-700 text-xs font-semibold border border-gray-200">
                                        <ShieldCheck size={14} className="text-green-500"/>
                                        {feature.replace(/_/g, ' ')}
                                    </span>
                                ))}
                             </div>
                        </div>
                    </div>
                </div>

                {/* Subscription Timeline */}
                <div className="bg-gray-50 rounded-xl p-5 border border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-4">
                     <div className="flex items-center gap-3">
                         <div className="p-2 bg-white rounded-lg border border-gray-200 shadow-sm text-gray-500">
                             <Calendar size={20} />
                         </div>
                         <div>
                             <p className="text-xs text-gray-400 font-bold uppercase">Subscription Period</p>
                             <div className="flex items-center gap-2 text-sm font-medium text-gray-900 mt-1">
                                 <span>{formatDate(subscription?.startDate)}</span>
                                 <span className="text-gray-400">→</span>
                                 <span>{formatDate(subscription?.endDate)}</span>
                             </div>
                         </div>
                     </div>
                     
                     <button 
                        onClick={() => router.push(`/subscriptions/${subscription?.id}`)}
                        className="text-sm font-semibold text-blue-600 hover:text-blue-700 hover:bg-blue-50 px-4 py-2 rounded-lg transition-colors"
                     >
                        View Subscription Details →
                     </button>
                </div>

            </div>
        </div>
      </div>
    </div>
  );
}

function InfoItem({ label, value, highlight }: { label: string, value: any, highlight?: boolean }) {
    return (
        <div className="flex justify-between items-center py-2 border-b border-gray-50 last:border-0">
            <span className="text-sm text-gray-500">{label}</span>
            <span className={`text-sm font-medium ${highlight ? 'text-emerald-600 font-bold text-base' : 'text-gray-900'}`}>
                {value}
            </span>
        </div>
    )
}
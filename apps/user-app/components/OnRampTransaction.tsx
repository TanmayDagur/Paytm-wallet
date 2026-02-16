"use client"
import { useState } from "react";

export const OnRampTransactions = ({
    transactions
}: {
    transactions: {
        time: Date,
        amount: number,
        status: string,
        provider: string
    }[]
}) => {
    
    const [showAll, setShowAll] = useState(false);
    const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

    const getStatusDetails = (status: string) => {
        const s = status.toLowerCase();
        const colors = {
            success: { c: '%2316a34a', bg: 'bg-green-50', text: 'text-green-600', icon: 'badge-check' },
            processing: { c: '%23d97706', bg: 'bg-amber-50', text: 'text-amber-600', icon: 'clock' }, 
            pending: { c: '%23d97706', bg: 'bg-amber-50', text: 'text-amber-600', icon: 'clock' },
            failure: { c: '%23dc2626', bg: 'bg-red-50', text: 'text-red-600', icon: 'x-circle' }
        };
        
        const config = colors[s as keyof typeof colors] || colors.pending;
        return {
            ...config,
            iconUrl: `https://lucide.dev/api/icons/${config.icon}`
        };
    };

    if (!transactions.length) {
        return (
            <div className="p-8 text-center glass rounded-[2rem] shadow-sm">
                <img src="https://lucide.dev/api/icons/ghost?stroke=%23cbd5e1" className="w-12 h-12 mx-auto mb-4" alt="empty" />
                <h3 className="text-slate-900 font-bold text-lg">No activity yet</h3>
                <p className="text-slate-400 text-sm mt-1">Transactions will appear here once initiated.</p>
            </div>
        );
    }


    const sortedTransactions = [...transactions].sort((a, b) => b.time.getTime() - a.time.getTime());
    
    const displayedTransactions = showAll ? sortedTransactions : sortedTransactions.slice(0, 3);

    return (
        <div className="glass p-8 rounded-[2rem] shadow-sm">
            <div className="mb-8">
                <h2 className="text-xl font-bold text-slate-900">Recent Transactions</h2>
                <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Activity History </p>
            </div>

            <div className="space-y-3">
                {displayedTransactions.map((t, index) => {
                    const status = getStatusDetails(t.status);
                    const isExpanded = expandedIndex === index;

                    return (
                        <div 
                            key={index} 
                            onClick={() => setExpandedIndex(isExpanded ? null : index)}
                            className={`p-4 rounded-2xl transition-all duration-300 cursor-pointer 
                                ${isExpanded ? 'border-blue-200 glass-lg shadow-sm bg-white/40' : 'border-transparent hover:bg-slate-50/50'}`}
                        >
                            <div className="flex justify-between items-center">
                                <div className="flex items-center gap-4">
                                    <div className={`w-10 h-10 ${status.bg} rounded-xl flex items-center justify-center shadow-sm`}>
                                        <img src={status.iconUrl} className="w-5 h-5" alt={t.status} />
                                    </div>
                                    <div>
                                        <div className="text-sm font-bold text-slate-900">Received INR</div>
                                        <div className="text-slate-400 text-[10px] font-bold uppercase tracking-tighter">
                                            {t.provider}
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="text-right">
                                        <div className="text-sm font-black text-slate-900">+ ₹{t.amount / 100}</div>
                                        <div className={`text-[10px] font-bold uppercase tracking-widest ${status.text}`}>
                                            {t.status}
                                        </div>
                                    </div>
                                    <img 
                                        src="https://lucide.dev/api/icons/chevron-down?stroke=%2394a3b8" 
                                        className={`w-4 h-4 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
                                        alt="arrow"
                                    />
                                </div>
                            </div>

                            <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isExpanded ? 'max-h-40 opacity-100 mt-4 pt-4 border-t border-slate-200' : 'max-h-0 opacity-0'}`}>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest">Date & Time</p>
                                        <p className="text-xs font-semibold text-slate-700">{t.time.toLocaleString('en-IN')}</p>
                                    </div>
                                    <div>
                                        <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest">Method</p>
                                        <p className="text-xs font-semibold text-slate-700">On-Ramp Transfer</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {transactions.length > 3 && (
                <button 
                    onClick={() => {
                        setShowAll(!showAll);
                        setExpandedIndex(null); 
                    }}
                    className="w-full mt-6 py-3 border border-slate-100 rounded-xl text-xs font-bold text-slate-500 hover:bg-slate-50 hover:text-blue-600 transition-all flex items-center justify-center gap-2"
                >
                    {showAll ? 'Show Less' : `View All (${transactions.length})`}
                    <img 
                        src={`https://lucide.dev/api/icons/arrow-right?stroke=${showAll ? '%232563eb' : '%2394a3b8'}`} 
                        className={`w-3 h-3 transition-transform ${showAll ? '-rotate-90' : 'rotate-90'}`} 
                        alt="arrow"
                    />
                </button>
            )}
        </div>
    );
};

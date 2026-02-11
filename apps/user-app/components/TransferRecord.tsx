"use client"
import { useRouter } from "next/navigation";

export const TransferRecord = ({
    transactions
}: {
    transactions: {
        time: Date,
        amount: number,
    }[]
}) => {
    const router = useRouter();

    if (!transactions.length) {
        return (
            <div className="bg-white p-8 text-center rounded-[2rem] border border-slate-200">
                <div className="flex justify-center mb-4 text-slate-200">
                    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/><path d="M12 7v5l4 2"/></svg>
                </div>
                <p className="text-slate-500 font-medium">No recent transfers</p>
            </div>
        );
    }

    return (
        <div className="bg-white transition-colors overflow-hidden">
            
            <div className="p-8 pb-4">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-slate-50 text-slate-600 rounded-2xl flex items-center justify-center shadow-inner">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/><path d="M12 7v5l4 2"/></svg>
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-slate-900">Recent Transfers</h2>
                        <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">P2P Activity</p>
                    </div>
                </div>
            </div>

            
            <div className="px-8 space-y-6">
                {transactions.slice(0, 5).map((t, index) => (
                    <div key={index} className="flex justify-between items-center group cursor-pointer border-b border-slate-50 pb-4 last:border-0">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center transition-colors group-hover:bg-red-100">
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 7h10v10"/><path d="M7 17 17 7"/></svg>
                            </div>
                            
                            <div>
                                <p className="text-sm font-bold text-slate-800 group-hover:text-blue-600 transition-colors">
                                    Transfer Sent
                                </p>
                                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">
                                    {t.time.toDateString()}
                                </p>
                            </div>
                        </div>

                        <div className="text-right">
                            <p className="text-sm font-black text-slate-900">
                                - ₹{t.amount / 100}
                            </p>
                            <div className="flex items-center justify-end gap-1">
                                <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-green-500"><path d="M20 6 9 17l-5-5"/></svg>
                                <p className="text-[9px] font-bold text-slate-300 tracking-widest uppercase">Success</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            
            <div className="p-4 bg-slate-50/50 mt-4 border-t border-slate-100">
                <button 
                    onClick={() => router.push("/transactions")}
                    className="w-full py-2 flex items-center justify-center gap-2 text-blue-600 text-sm font-bold hover:text-blue-700 transition-all group"
                >
                    View All Transactions
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform"><path d="m9 18 6-6-6-6"/></svg>
                </button>
            </div>
        </div>
    );
}

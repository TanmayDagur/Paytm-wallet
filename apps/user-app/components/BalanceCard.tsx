export const BalanceCard = ({ amount, locked }: {
    amount: number;
    locked: number;
}) => {
    const hasLockedFunds = locked > 0;

    return (
        <div className="bg-white p-8 relative overflow-hidden group">
            
            <div className="absolute -right-4 -top-4 w-24 h-24 bg-indigo-50 rounded-full opacity-50 group-hover:scale-110 transition-transform duration-700"></div>

            
            <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center shadow-inner">
                    <img 
                        src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiMwMDljZWIiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBjbGFzcz0ibHVjaWRlIGx1Y2lkZS13YWxsZXQtaWNvbiBsdWNpZGUtd2FsbGV0Ij48cGF0aCBkPSJNMTkgN1Y0YTEgMSAwIDAgMC0xLTFINWEyIDIgMCAwIDAgMCA0aDE1YTEgMSAwIDAgMSAxIDF2NGgtM2EyIDIgMCAwIDAgMCA0aDNhMSAxIDAgMCAwIDEtMXYtMmExIDEgMCAwIDAtMS0xIi8+PHBhdGggZD0iTTMgNXYxNGEyIDIgMCAwIDAgMiAyaDE1YTEgMSAwIDAgMCAxLTF2LTQiLz48L3N2Zz4="
                        alt="wallet" 
                        className="w-6 h-6"
                    />
                </div>
                <div>
                    <h2 className="text-xl font-bold text-slate-900">Account Balance</h2>
                    <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Real-time status</p>
                </div>
            </div>

            <div className="space-y-5 relative">
                <div className="flex justify-between items-center pb-2 border-b border-slate-50 hover:border-slate-200 transition-colors">
                    <span className="text-slate-500 text-sm font-medium">Unlocked Balance</span>
                    <span className="text-slate-900 font-bold">
                        ₹{(amount / 100).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                    </span>
                </div>

                <div className={`flex justify-between items-center pb-2 border-b border-slate-50 transition-all ${hasLockedFunds ? "bg-amber-50/50 -mx-2 px-2 rounded-lg" : ""}`}>
                    <div className="flex items-center gap-2">
                        <span className="text-slate-500 text-sm font-medium">Locked (In Process)</span>
                        {hasLockedFunds && (
                            <img 
                                src="https://lucide.dev/api/icons/clock?stroke=%23d97706" 
                                alt="pending" 
                                className="w-3.5 h-3.5 animate-pulse"
                            />
                        )}
                    </div>
                    <span className={`font-bold ${hasLockedFunds ? "text-amber-600" : "text-slate-400"}`}>
                        ₹{(locked / 100).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                    </span>
                </div>

                <div className="flex justify-between items-center pt-3">
                    <span className="text-slate-900 text-sm font-extrabold uppercase tracking-tight">Net Position</span>
                    <span className="text-blue-600 font-black text-2xl tracking-tighter">
                        ₹{((locked + amount) / 100).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                    </span>
                </div>
            </div>
        </div>
    );
}

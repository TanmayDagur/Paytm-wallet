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
    const getStatusDetails = (status: string) => {
        const s = status.toLowerCase();
        if (s === 'success') return { 
            color: 'text-green-600', 
            bg: 'bg-green-50', 
            icon: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiMwZWNkMjUiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBjbGFzcz0ibHVjaWRlIGx1Y2lkZS1iYWRnZS1jaGVjay1pY29uIGx1Y2lkZS1iYWRnZS1jaGVjayI+PHBhdGggZD0iTTMuODUgOC42MmE0IDQgMCAwIDEgNC43OC00Ljc3IDQgNCAwIDAgMSA2Ljc0IDAgNCA0IDAgMCAxIDQuNzggNC43OCA0IDQgMCAwIDEgMCA2Ljc0IDQgNCAwIDAgMS00Ljc3IDQuNzggNCA0IDAgMCAxLTYuNzUgMCA0IDQgMCAwIDEtNC43OC00Ljc3IDQgNCAwIDAgMSAwLTYuNzZaIi8+PHBhdGggZD0ibTkgMTIgMiAyIDQtNCIvPjwvc3ZnPg=="
        };
        if (s === 'processing' || s === 'pending') return { 
            color: 'text-amber-600', 
            bg: 'bg-amber-50', 
            icon: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiNmODVlMWIiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBjbGFzcz0ibHVjaWRlIGx1Y2lkZS1jbG9jay1pY29uIGx1Y2lkZS1jbG9jayI+PHBhdGggZD0iTTEyIDZ2Nmw0IDIiLz48Y2lyY2xlIGN4PSIxMiIgY3k9IjEyIiByPSIxMCIvPjwvc3ZnPg=="
        };
        return { 
            color: 'text-red-600', 
            bg: 'bg-red-50', 
            icon: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiMwZWNkMjUiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBjbGFzcz0ibHVjaWRlIGx1Y2lkZS14LWNpcmNsZS1pY29uIGx1Y2lkZS14LWNpcmNsZSI+PHBhdGggZD0iTTEyIDExLjVhMSAxIDAgMCAwIDAgMiAxIDEgMCAwIDAgMCAtMiAxIDEgMCAwIDAgMCAtMiAxIDEgMCAwIDAgMCAtMiAxIDEgMCAwIDAgMCAtMiAxIDEgMCAwIDAgMCAtMiAxIDEgMCAwIDAgMCAtMiAxIDEgMCAwIDAgMCAtMiAxIDEgMCAwIDAgMCAtMiAxIDEgMCAwIDAgMCAtMiAxIDEgMCAwIDAgMCAtMiAxIDEgMCAwIDAgMCAtMiAxIDEgMCAwIDAgMCAtMiAxIDEgMCAwIDAgMCAtMiAxIDEgMCAwIDAgMCAtMiAxIDEgMCAwIDAgMCAtMiAxIDEgMCAwIDAgMCAtMiAxIDEgMCAwIDAgMCAtMiAxIDEgMCAwIDAgMCAtMiAxIDEgMCAwIDAgMCAtMiAxIDEgMCAwIDAgMCAtMiAxIDEgMCAwIDAgMCAtMiAxIDEgMCAwIDAgMCAtMiAxIDEgMCAwIDAgMCAtMiAxIDEgMCAwIDAgMCAtMiBhMSAwIDAuNSAwIDAuNSAwLjUzNzUyNzE4NjQxODQxOSAwIDAuNSAwIDAuNTQyODc1MTkzMzE4OTc3IDAuNSAwIDAuNSAwIDAuNTQyODc1MTkzMzE4OTc3IDAuNSAwIDAuNSAwIDAuNTQyODc1MTkzMzE4OTc3IDAuNSAwIDAuNSAwIDAuNTQyODc1MTkzMzE4OTc3IDAuNSAwIDAuNSAwIDAuNTQyODc1MTkzMzE4OTc3IDAuNSAwIDAuNSAwIGExIDIgLjUgLjUgLjUgLjUgLjUgLjUgLjUgLjUgLjUgLjUgLjUgLjUgLjUgLjUgLjUgLjUgLjUgLjUgLjUgLjUgLjUgLjUgLjUgLjUgLjUgLjUK"
        };
    };

    if (!transactions.length) {
        return (
            <div className="p-8 text-center bg-white rounded-[2rem]">
                <img 
                    src="https://lucide.dev/api/icons/arrow-down-left?stroke=%23cbd5e1" 
                    className="w-12 h-12 mx-auto mb-4" 
                    alt="empty"
                />
                <h3 className="text-slate-900 font-bold text-lg">No activity yet</h3>
                <p className="text-slate-400 text-sm">Your transactions will appear here.</p>
            </div>
        );
    }

    return (
        <div className="bg-white p-8 group">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h2 className="text-xl font-bold text-slate-900">Recent Transactions</h2>
                    <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Activity History</p>
                </div>
                <img src="https://lucide.dev/api/icons/arrow-down-left?stroke=%23cbd5e1" className="w-6 h-6 opacity-50 group-hover:opacity-100 transition-opacity" alt="icon" />
            </div>

            <div className="space-y-6">
                {transactions.map((t, index) => {
                    const status = getStatusDetails(t.status);
                    return (
                        <div key={index} className="flex justify-between items-center group/item">
                            <div className="flex items-center gap-4">
                                <div className={`w-10 h-10 ${status.bg} rounded-xl flex items-center justify-center`}>
                                    <img src={status.icon} className="w-5 h-5" alt={t.status} />
                                </div>
                                <div>
                                    <div className="text-sm font-bold text-slate-900">Received INR</div>
                                    <div className="text-slate-400 text-xs font-medium">
                                        {t.time.toLocaleDateString('en-IN')} • {t.provider}
                                    </div>
                                </div>
                            </div>
                            <div className="text-right">
                                <div className="text-sm font-black text-slate-900">+ ₹{t.amount / 100}</div>
                                <div className={`text-[10px] font-bold uppercase tracking-widest ${status.color}`}>
                                    {t.status}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

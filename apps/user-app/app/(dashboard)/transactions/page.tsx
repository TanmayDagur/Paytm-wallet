import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import prisma from "@repo/db/client";
import { TransactionSearch } from "../../../components/TransactionSearch";  

async function getCombinedTransactions(query?: string) {
    const session = await getServerSession(authOptions);
    const userId = Number(session?.user?.id);

    const [onRampTxns, p2pTxns] = await Promise.all([
        prisma.onRampTransaction.findMany({
            where: { userId: userId },
        }),
        prisma.p2pTransfer.findMany({
            where: { fromUserId: userId },
        })
    ]);

    const formattedOnRamp = onRampTxns.map((t) => ({
        id: `onramp-${t.id}`,
        date: t.startTime.toDateString(),
        timestamp: t.startTime.getTime(),
        amount: t.amount / 100,
        status: t.status,
        provider: t.provider,
        isOndRamp: true 
    }));

    const formattedP2P = p2pTxns.map((t) => ({
        id: `p2p-${t.id}`,
        date: t.timestamp.toDateString(),
        timestamp: t.timestamp.getTime(),
        amount: t.amount / 100,
        status: "Success",
        provider: "P2P Transfer",
        isOndRamp: false 
    }));

    let allTransactions = [...formattedOnRamp, ...formattedP2P];

    
    if (query) {
        const lowerQuery = query.toLowerCase();
        allTransactions = allTransactions.filter((txn) => 
            txn.provider.toLowerCase().includes(lowerQuery) ||
            txn.status.toLowerCase().includes(lowerQuery) ||
            txn.amount.toString().includes(lowerQuery) ||
            txn.date.toLowerCase().includes(lowerQuery)
        );
    }

    return allTransactions.sort((a, b) => b.timestamp - a.timestamp);
}

export default async function TransactionsPage({
    searchParams
}: {
    searchParams: Promise<{ query?: string }> 
}) {
    const filters = await searchParams;
    const transactionList = await getCombinedTransactions(filters.query);

    return (
        <div className="min-h-screen bg-slate-50 py-12 px-4">
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 max-w-4xl mx-auto">
                    
                    <div className="p-8 border-b border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-4">
                        <h2 className="text-2xl font-bold text-slate-800 uppercase tracking-tight">All Transactions</h2>
                        <TransactionSearch />
                    </div>
                  
                    <div className="p-8 space-y-4">
                        {transactionList.map((txn) => {
                            const isProcessing = txn.status === "Processing";
                            const isSuccess = txn.status === "Success";

                            return (
                                <div 
                                    key={txn.id} 
                                    className={`bg-slate-50 border-y border-r border-slate-100 border-l-4 rounded-xl p-6 hover:border-blue-200 transition-colors ${
                                        txn.isOndRamp ? "border-l-green-500" : "border-l-red-500"
                                    } ${isProcessing ? "bg-amber-50/40" : ""}`}
                                >
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-1">
                                            <p className="text-sm text-slate-900 font-bold">
                                                <span className="text-slate-500">Time:</span> {txn.date}
                                            </p>
                                            <p className={`text-sm font-bold ${txn.isOndRamp ? "text-green-700" : "text-red-700"}`}>
                                                <span className="text-slate-500">Amount:</span> 
                                                {txn.isOndRamp ? " + " : " - "}₹{txn.amount}
                                            </p>
                                        </div>
                                        <div className="space-y-1 md:text-right">
                                            <div className="text-sm text-slate-900 font-bold flex items-center md:justify-end gap-2">
                                                <span className="text-slate-500">Status:</span> 
                                                <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-widest ${
                                                    isSuccess ? "text-green-600 bg-green-100/50" : 
                                                    isProcessing ? "text-amber-600 bg-amber-100" : 
                                                    "text-red-600 bg-red-100/50"
                                                }`}>
                                                    {txn.status}
                                                </span>
                                            </div>
                                            <p className="text-sm text-slate-900 font-bold pt-1">
                                                <span className="text-slate-500">Provider:</span> {txn.provider}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}

                        {transactionList.length === 0 && (
                            <div className="text-center py-20 bg-slate-50/50 rounded-xl border border-dashed border-slate-200">
                                <p className="text-slate-400 font-medium italic">No transactions match your search.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

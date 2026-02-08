import prisma from "@repo/db/client";
import { AddMoney } from "../../../components/AddMoneyCard";
import { BalanceCard } from "../../../components/BalanceCard";
import { OnRampTransactions } from "../../../components/OnRampTransaction";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";

async function getBalance() {
    const session = await getServerSession(authOptions);
    const balance = await prisma.balance.findFirst({
        where: {
            userId: Number(session?.user?.id)
        }
    });
    return {
        amount: balance?.amount || 0,
        locked: balance?.locked || 0
    }
}

async function getOnRampTransactions() {
    const session = await getServerSession(authOptions);
    const txns = await prisma.onRampTransaction.findMany({
        where: {
            userId: Number(session?.user?.id)
        }
    });
    return txns.map((t: any) => ({
        time: t.startTime,
        amount: t.amount,
        status: t.status,
        provider: t.provider
    }))
}

export default async function TransferPage() {
    const balance = await getBalance();
    const transactions = await getOnRampTransactions();

    return (
        <div className="flex-1 min-h-screen bg-slate-50/50">
            <div className="max-w-7xl mx-auto p-6 md:p-10 lg:p-12">
                
                
                <header className="mb-10">
                    <h1 className="text-4xl font-extrabold text-slate-900 mb-2 tracking-tight">
                        Transfer
                    </h1>
                    <p className="text-slate-500 font-medium">
                        Add money to your wallet.
                    </p>
                </header>

                
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    
                
                    <div className="lg:col-span-7 transition-all duration-300">
                        <div className="bg-white rounded-[2rem] shadow-sm border border-slate-200 hover:border-blue-200 transition-colors overflow-hidden">
                            <AddMoney />
                        </div>
                    </div>

                
                    <div className="lg:col-span-5 space-y-8">
                        
                
                        <div className="bg-white rounded-[2rem] shadow-sm border border-slate-200 hover:border-blue-100 transition-all">
                            <BalanceCard amount={balance.amount} locked={balance.locked} />
                        </div>

                
                        <div className="bg-white rounded-[2rem] shadow-sm border border-slate-200 hover:border-blue-100 transition-all">
                            <OnRampTransactions transactions={transactions} />
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
    );
}

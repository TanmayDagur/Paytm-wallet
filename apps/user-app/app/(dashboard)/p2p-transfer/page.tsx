import { getServerSession } from "next-auth";
import { SendCard } from "../../../components/SendCard";
import { TransferRecord } from "../../../components/TransferRecord";
import { authOptions } from "../../lib/auth";
import prisma from "@repo/db/client";


type TransferType = {
  time: Date;
  amount: number;
};

async function getTransferRecord(): Promise<TransferType[]> {
  const session = await getServerSession(authOptions);
  const txns = await prisma.p2pTransfer.findMany({
    where: {
      fromUserId: Number(session?.user?.id),
    },
    orderBy: {
      timestamp: 'desc' 
    }
  });

  return txns.map((t) => ({
    time: t.timestamp,
    amount: t.amount,
  }));
}

export default async function TransactionsPage() {
  const transactions = await getTransferRecord();
  
  return (
    <div className="flex-1 min-h-screen bg-slate-50/50">
      <div className="max-w-7xl mx-auto p-6 md:p-10 lg:p-12">
        
        
        <header className="mb-10">
          <h1 className="text-4xl font-extrabold text-slate-900 mb-2 tracking-tight">
            P2P Transfer
          </h1>
          <p className="text-slate-500 font-medium">
            Send money instantly to any phone number on the PayTM network.
          </p>
        </header>

        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          
          <div className="lg:col-span-7 transition-all duration-300">
            <div className="bg-white rounded-[2rem] shadow-sm border border-slate-200 hover:border-blue-200 transition-colors overflow-hidden">
              <SendCard />
            </div>
          </div>

          
          <div className="lg:col-span-5">
            <div className="bg-white rounded-[2rem] shadow-sm border border-slate-200 hover:border-blue-100 transition-all overflow-hidden">
              <TransferRecord transactions={transactions} />
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}

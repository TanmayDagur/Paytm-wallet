import { getServerSession } from "next-auth";
import { SendCard } from "../../../components/SendCard";
import { TransferRecord } from "../../../components/TransferRecord";
import { authOptions } from "../../lib/auth";
import prisma from "@repo/db/client";

// Define what one transfer looks like
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
  });

  return txns.map((t: { timestamp: Date; amount: number }) => ({
    time: t.timestamp,
    amount: t.amount,
  }));
}

export default async function TransactionsPage() {
  const transactions = await getTransferRecord();
  return (
    <div className="w-full min-h-screen flex flex-col bg-gradient-to-r from-gray-300 via-gray-100 to-gray-200">
      
      <div className="text-4xl text-[#6a51a6] font-bold pt-5 mb-8 pl-5 text-center">
        Send Money
      </div>

      
      <div className="flex w-full px-10 gap-8 items-start">
        
        <div className="flex-1 max-w-xl -mt-16 cursor-pointer hover:scale-105 transition-transform">
          <SendCard />
        </div>

      
        <div className="flex-1 max-w-xl  cursor-pointer hover:scale-105 transition-transform">
          <TransferRecord transactions={transactions} />
        </div>
      </div>
    </div>
  );
}



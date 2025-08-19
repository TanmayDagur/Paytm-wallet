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
    <div className="w-full min-h-screen flex flex-col items-center">
      <div className="text-4xl text-[#6a51a6] -mb-10 font-bold">Transfer</div>
      <div className="flex flex-row justify-center items-center gap-8 w-full max-w-full">
        <div className="w-full max-w-xl">
          <SendCard />
        </div>
        <div className="w-full max-w-xl">
          <TransferRecord transactions={transactions} />
        </div>
      </div>
    </div>
  );
}

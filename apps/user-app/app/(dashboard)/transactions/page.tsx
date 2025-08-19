import { getServerSession } from "next-auth";
import { AllTransactionCard } from "../../../components/AllTransactionCard";
import { authOptions } from "../../lib/auth";
import prisma from "@repo/db/client";
import { OnRampTransaction, p2pTransfer } from "@prisma/client"; 

async function getAllOnRampTransactions() {
    const session = await getServerSession(authOptions);

    const txns: OnRampTransaction[] = await prisma.onRampTransaction.findMany({
        where: {
            userId: Number(session?.user?.id),
        },
    });

    return txns.map((t:typeof txns[number]) => ({
        time: t.startTime,
        amount: t.amount,
        status: t.status,
        provider: t.provider,
    }));
}

async function getAllp2pTransactions() {
    const session = await getServerSession(authOptions);
    const txns: p2pTransfer[] = await prisma.p2pTransfer.findMany({
        where: {
            fromUserId: Number(session?.user?.id),
        }
    });

    const phone = await prisma.user.findFirst({
        where: {
            number: String(
                txns.length > 4 && txns[4]?.fromUserId !== undefined
                    ? txns[4].fromUserId
                    : undefined
            )
        }
    });

    return txns.map((t: typeof txns[number]) => ({
        time: t.timestamp,
        amount: t.amount,
        phoneNumber: phone?.number ?? ""
    }));
}

export default async function TransactionsPage() {
    const onRamp = await getAllOnRampTransactions();
    const p2p = await getAllp2pTransactions();

    return (
        <div className="w-full flex justify-center">
            <div className="w-full max-w-5xl px-6 py-8">
                <AllTransactionCard onRamp={onRamp} p2p={p2p} />
            </div>
        </div>
    );
}

"use server";

import prisma from "@repo/db/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";

export async function createOnRamptxn(provider: string, amount: number) {
    const session = await getServerSession(authOptions);
    const userId = session?.user?.id;

    if (!userId) {
        return {
            message: "Unauthenticated request"
        }
    }

    const token = (Math.random() * 1000).toString();
    const amountInPaise = amount * 100;

    
    const transaction = await prisma.onRampTransaction.create({
        data: {
            provider,
            status: "Processing",
            startTime: new Date(),
            token: token,
            userId: Number(userId),
            amount: amountInPaise
        }
    });

    
    setTimeout(async () => {
        try {
            await prisma.$transaction([
                
                prisma.onRampTransaction.update({
                    where: { id: transaction.id },
                    data: { status: "Success" }
                }),
                
                prisma.balance.update({
                    where: { userId: Number(userId) },
                    data: {
                        amount: { increment: amountInPaise }
                    }
                })
            ]);
            console.log(`Transaction ${transaction.id} automatically marked as Success.`);
        } catch (e) {
            console.error("Failed to auto-complete transaction:", e);
        }
    }, 60000); 

    return {
        message: "Transaction initiated. It will be processed in 1 minute.",
        id: transaction.id
    }
}

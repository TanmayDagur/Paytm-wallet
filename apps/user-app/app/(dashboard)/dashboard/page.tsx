import prisma from "@repo/db/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import { Card } from "@repo/ui/card";

async function getUserData() {
    const session = await getServerSession(authOptions);
    const user = await prisma.user.findFirst({
        where: {
            id: Number(session?.user?.id)
        }
    })
    return user;
}


async function fetchUserBalance() {
    const user = await getUserData();
    const userBalance = await prisma.balance.findFirst({
        where: {
            userId: user?.id
        }
    })
    return userBalance;
}


export default async function() {

    const user = await getUserData();
    const userBalance = await fetchUserBalance();

    return <div>
            <div className="text-4xl text-[#6a51a6] pt-8 mb-8 font-bold">
                
                GOOD DAY   ,   {user ? JSON.stringify(user.name).split('"')[1] : "No user found"}

            </div>
            <div className="">
                <div className="text-xl font-semibold text-blue-500 ">
                    Portfolio Value: {userBalance ? JSON.stringify(userBalance.amount/100) : "No balance found"}
                </div>
            </div>
        </div>
}
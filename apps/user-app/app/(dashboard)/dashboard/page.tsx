import prisma from "@repo/db/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import { CountUp } from "../../../components/CountUp";

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
    const balance = userBalance ? userBalance.amount / 100 : 0;

    return <div className="w-full pl-5">
            <div className="text-4xl text-[#6a51a6] pt-8 mb-8 font-bold slide-in-right ">
                
                GOOD DAY   ,   {user ? JSON.stringify(user.name).split('"')[1] : "No user found"}

            </div>
            <div>
        <div className="text-xl font-semibold text-blue-500">
          Portfolio Value: <CountUp target={balance} prefix="₹" />
        </div>
      </div>
        </div>
}
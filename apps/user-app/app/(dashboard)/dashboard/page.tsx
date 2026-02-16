import prisma from "@repo/db/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import { CountUp } from "../../../components/CountUp";
import Link from "next/link";

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

function getFormattedDate() {
    return new Intl.DateTimeFormat("en-GB", {
        weekday: "long",
        day: "numeric",
        month: "long",
    }).format(new Date());
}




export default async function() {

    const user = await getUserData();
    const userBalance = await fetchUserBalance();
    const balance = userBalance ? userBalance.amount / 100 : 0;
    const formattedDate = getFormattedDate();

    return <div className="w-full pl-5 bg-[#F5F7FA]">
    
            <div className="pt-6 text-sm text-gray-500 font-medium">
                {formattedDate}
            </div>
            <div className="text-3xl text-[#002E6E] pt-8 mb-8 font-light slide-in-right ">
                GOOD DAY   ,  <span className="font-bold">{user ? user.name : "No user found"}</span>

            </div>
            <div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col justify-between relative overflow-hidden">
                    <div className="absolute -right-6 -top-6 w-32 h-32 bg-blue-400 opacity-5 rounded-full hover:scale-105 transition-transform"></div>
                        <div>
                            <p className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Total Portfolio Value</p>
                            <div className="flex items-center gap-3 mt-2">
                                <h2 id="balance-display" className="text-4xl font-bold text-[#002E6E]"><CountUp target={balance} prefix="₹" /></h2>
                            </div>
                        </div>
                        <div className="mt-8 flex gap-3 relative z-10">
                           <Link href="/transfer" className="flex-1 bg-[#002E6E] text-white text-center py-2.5 rounded-lg text-sm font-medium hover:bg-opacity-90 transition-all">Add Money</Link>
                            <button className="flex-1 bg-white border border-gray-200 text-brand-navy py-2.5 rounded-lg text-sm font-medium">Passbook</button>
                        </div>
                    </div>
                    <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                            <h3 className="text-lg font-bold text-[#002E6E] mb-4">Quick Actions</h3>
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                                <button className="flex flex-col items-center justify-center p-4 rounded-xl border border-dashed border-gray-200 hover:bg-blue-50 transition-all group">
                                    <div className="w-12 h-12 rounded-full bg-blue-100 text-brand-blue flex items-center justify-center text-xl mb-3 group-hover:scale-110"><QRCode /></div>
                                    <span className="text-sm font-medium">Scan & Pay</span>
                                </button>
                                <button className="flex flex-col items-center justify-center p-4 rounded-xl border border-dashed border-gray-200 hover:bg-blue-50 transition-all group">
                                    <div className="w-12 h-12 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-xl mb-3 group-hover:scale-110"><Plane /></div>
                                    <span className="text-sm font-medium">To Mobile</span>
                                </button>
                                <button className="flex flex-col items-center justify-center p-4 rounded-xl border border-dashed border-gray-200 hover:bg-blue-50 transition-all group">
                                    <div className="w-12 h-12 rounded-full bg-yellow-100 text-yellow-600 flex items-center justify-center text-xl mb-3 group-hover:scale-110"><Bulb /></div>
                                    <span className="text-sm font-medium">Pay Bills</span>
                                </button>
                                <button className="flex flex-col items-center justify-center p-4 rounded-xl border border-dashed border-gray-200 hover:bg-blue-50 transition-all group">
                                    <div className="w-12 h-12 rounded-full bg-pink-100 text-pink-600 flex items-center justify-center text-xl mb-3 group-hover:scale-110"><Mobile /></div>
                                    <span className="text-sm font-medium">Recharge</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    
}


function QRCode() {
 return (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="size-6"
    >
        <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3.75 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0 1 3.75 9.375v-4.5ZM3.75 14.625c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5a1.125 1.125 0 0 1-1.125-1.125v-4.5ZM13.5 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0 1 13.5 9.375v-4.5Z"
        />
        <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6.75 6.75h.75v.75h-.75v-.75ZM6.75 16.5h.75v.75h-.75v-.75ZM16.5 6.75h.75v.75h-.75v-.75ZM13.5 13.5h.75v.75h-.75v-.75ZM13.5 19.5h.75v.75h-.75v-.75ZM19.5 13.5h.75v.75h-.75v-.75ZM19.5 19.5h.75v.75h-.75v-.75ZM16.5 16.5h.75v.75h-.75v-.75Z"
        />
    </svg>
    );
}

function Plane(){
    return(
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 -rotate-45">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
        </svg>
    )
}

function Bulb(){
    return(
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-.189m-1.5.189a6.01 6.01 0 0 1-1.5-.189m3.75 7.478a12.06 12.06 0 0 1-4.5 0m3.75 2.383a14.406 14.406 0 0 1-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 1 0-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
        </svg>
    )
}


function Mobile(){
    return(
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
        </svg>
    )
}

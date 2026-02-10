"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useTransition } from "react";

export function TransactionSearch() {
    const { replace } = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [isPending, startTransition] = useTransition();

    function handleSearch(term: string) {
        const params = new URLSearchParams(searchParams);
        if (term) {
            params.set("query", term);
        } else {
            params.delete("query");
        }

        startTransition(() => {
            replace(`${pathname}?${params.toString()}`);
        });
    }

    return (
        <div className="relative">
            <svg 
                className={`absolute left-3 top-1/2 -translate-y-1/2 transition-colors ${isPending ? "text-blue-500 animate-spin" : "text-slate-400"}`} 
                width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
            >
                {isPending ? (
                    <circle cx="12" cy="12" r="10" strokeDasharray="164" strokeDashoffset="56" />
                ) : (
                    <>
                        <circle cx="11" cy="11" r="8"></circle>
                        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                    </>
                )}
            </svg>
            <input 
                type="text" 
                defaultValue={searchParams.get("query")?.toString()}
                onChange={(e) => handleSearch(e.target.value)}
                placeholder="Search bank, amount, or status..." 
                className="pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none w-full md:w-72"
            />
        </div>
    );
}

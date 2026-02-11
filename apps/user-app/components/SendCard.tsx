"use client"
import { Button } from "@repo/ui/button";
import { TextInput } from "@repo/ui/TextInput";
import { useState } from "react";
import { p2pTransfer } from "../app/lib/actions/p2pTransfer";

export function SendCard() {
    const [number, setNumber] = useState("");
    const [amount, setAmount] = useState("");
    const [status, setStatus] = useState<null | "success" | "error" | "warning">(null);
    const [message, setMessage] = useState("");

    const handleSend = async () => {
        try {
            if (!number.trim() || !amount.trim()) {
                setStatus("warning");
                setMessage("Please enter both Number and Amount");
                return;
            }

            if (isNaN(Number(amount)) || Number(amount) <= 0) {
                setStatus("warning");
                setMessage("Please enter a valid amount greater than 0");
                return;
            }
            await p2pTransfer(number, Number(amount) * 100);
            setStatus("success");
            setMessage("Transaction successful");
        } catch (error) {
            setStatus("error");
            setMessage("Transaction failed");
        }

        setTimeout(() => {
            setStatus(null);
            setMessage("");
        }, 5000);
    };

    return (
        <div className="bg-white p-8 transition-colors">
            
            <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center shadow-inner">
                    
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="22" y1="2" x2="11" y2="13"></line>
                        <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                    </svg>
                </div>
                <div>
                    <h2 className="text-xl font-bold text-slate-900">Send Money</h2>
                    <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Instant Peer Transfer</p>
                </div>
            </div>

            <div className="space-y-6">
                
                <div className="group">
                    <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">
                        Recipient Number
                    </label>
                    <div className="relative flex items-center">
                        
                        <div className="absolute left-4 mt-4 flex items-center justify-center pointer-events-none text-slate-400 z-10">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect>
                                <line x1="12" y1="18" x2="12.01" y2="18"></line>
                            </svg>
                        </div>
                        
                        <div className="w-full [&_input]:pl-10"> 
                            <TextInput
                                placeholder="99999 00000"
                                label="" 
                                onChange={(value) => setNumber(value)}
                            />
                        </div>
                    </div>
                </div>
                 
                <div className="group">
                    <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">
                        Amount (INR)
                    </label>
                    <div className="relative">
                        <div className="absolute mt-2 left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold z-10 text-lg">
                            ₹
                        </div>
                        <div className="w-full [&_input]:pl-10">
                            <TextInput
                                placeholder="0.00"
                                label="" 
                                onChange={(value) => setAmount(value)}
                            />
                        </div>
                    </div>
                </div>

                
                {status && (
                    <div
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all animate-in fade-in slide-in-from-top-2 ${
                            status === "success"
                                ? "bg-green-50 text-green-700 border border-green-100"
                                : status === "error"
                                ? "bg-red-50 text-red-700 border border-red-100"
                                : "bg-yellow-50 text-yellow-700 border border-yellow-100"
                        }`}
                    >
                        {status === "success" ? (
                            
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                                <polyline points="22 4 12 14.01 9 11.01"></polyline>
                            </svg>
                        ) : (
                            
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="12" cy="12" r="10"></circle>
                                <line x1="12" y1="8" x2="12" y2="12"></line>
                                <line x1="12" y1="16" x2="12.01" y2="16"></line>
                            </svg>
                        )}
                        {message}
                    </div>
                )}

                
                <div className="pt-4 group">
                    <div className="w-full transform transition-all active:scale-[0.98] flex items-center justify-center">
                        <Button onClick={handleSend}>
                            <span className="flex items-center justify-center gap-2 py-1">
                                Confirm Transfer
                            </span>
                        </Button>
                    </div>
                    
                </div>
            </div>
        </div>
    );
}

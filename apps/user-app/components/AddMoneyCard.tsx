"use client"
import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { Select } from "@repo/ui/select";
import { useState } from "react";
import { TextInput } from "@repo/ui/TextInput";
import { createOnRamptxn } from "../app/lib/actions/createOnRamptxn";

const SUPPORTED_BANKS = [
  {
    name: "HDFC Bank",
    redirectUrl: "https://netbanking.hdfcbank.com"
  },
  {
    name: "Axis Bank",
    redirectUrl: "https://www.axisbank.com/"
  }
];

export const AddMoney = () => {
  const [redirectUrl, setRedirectUrl] = useState(SUPPORTED_BANKS[0]?.redirectUrl);
  const [provider, setProvider] = useState(SUPPORTED_BANKS[0]?.name || "");
  const [value, setValue] = useState(0);
  const [error, setError] = useState("");

  const handleAddMoney = async () => {
    if (!value || value <= 0) {
      setError("Please enter a valid amount");
      return;
    }

    try {
      await createOnRamptxn(provider, value);
      window.location.href = redirectUrl || "";
    } catch (err) {
      setError("Failed to start transaction");
    }
  };

  return (
    <div className="bg-white p-8 transition-colors">
      {/* Header with Icon */}
      <div className="flex items-center gap-4 mb-8">
        <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center shadow-inner">
          <img 
            src="https://lucide.dev/api/icons/plus?stroke=%232563eb" 
            alt="Add" 
            className="w-6 h-6" 
          />
        </div>
        <div>
          <h2 className="text-xl font-bold text-slate-900">Add Money</h2>
          <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Wallet Top-up</p>
        </div>
      </div>

      <div className="space-y-6">
        
        <div className="group">
          <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">
            Amount (INR)
          </label>
          <div className="relative premium-input-wrapper">
             <TextInput
              label={""} 
              placeholder={"0.00"}
              onChange={(val) => {
                setValue(Number(val));
                setError("");
              }}
            />
          </div>
        </div>

        
        <div className="group">
          <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">
            Select Bank
          </label>
          <div className="relative">
            <Select
              onSelect={(value) => {
                const bank = SUPPORTED_BANKS.find((x) => x.name === value);
                setRedirectUrl(bank?.redirectUrl || "");
                setProvider(bank?.name || "");
              }}
              options={SUPPORTED_BANKS.map((x) => ({
                key: x.name,
                value: x.name
              }))}
            />
            <div className="absolute right-4 top-[10px] pointer-events-none opacity-40">
              <img 
                src="https://lucide.dev/api/icons/building-2?stroke=%2394a3b8" 
                alt="Bank" 
                className="w-[18px] h-[18px]" 
              />
            </div>
          </div>
        </div>

        
        {error && (
          <div className="flex items-center gap-2 px-4 py-3 bg-red-50 border border-red-100 rounded-xl text-red-600 text-sm animate-pulse">
            <img 
              src="https://lucide.dev/api/icons/alert-circle?stroke=%23dc2626" 
              alt="Error" 
              className="w-4 h-4" 
            />
            <span className="font-medium">{error}</span>
          </div>
        )}

        
        <div className="pt-4 group">
          <div className="w-full flex justify-center transform transition-all active:scale-[0.98]">
             <Button onClick={handleAddMoney}>
                <span className="flex items-center justify-center gap-2 py-1">
                    Confirm Transaction
                </span>
             </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

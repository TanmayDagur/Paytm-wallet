"use client"
import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card"; // Still imported but we will use custom container for better control
import { Select } from "@repo/ui/select";
import { useState } from "react";
import { TextInput } from "@repo/ui/TextInput";
import { createOnRamptxn } from "../app/lib/actions/createOnRamptxn";
import { Plus, Building2, AlertCircle } from "lucide-react"; // Matching lucide-react icons

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
        <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center shadow-inner">
          <Plus size={24} />
        </div>
        <div>
          <h2 className="text-xl font-bold text-slate-900">Add Money</h2>
          <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Wallet Top-up</p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Amount Input Section */}
        <div className="group">
          <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">
            Amount (INR)
          </label>
          <div className="relative premium-input-wrapper">
             <TextInput
              label={""} // Label handled by our custom UI
              placeholder={"0.00"}
              onChange={(val) => {
                setValue(Number(val));
                setError("");
              }}
            />
          </div>
        </div>

        {/* Bank Selection Section */}
        <div className="group">
          <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">
            Select Bank
          </label>
          <div className="relative">
            <Select
              onSelect={(value) => {
                setRedirectUrl(
                  SUPPORTED_BANKS.find((x) => x.name === value)?.redirectUrl || ""
                );
                setProvider(
                  SUPPORTED_BANKS.find((x) => x.name === value)?.name || ""
                );
              }}
              options={SUPPORTED_BANKS.map((x) => ({
                key: x.name,
                value: x.name
              }))}
            />
            <div className="absolute right-4 top-[10px] pointer-events-none text-slate-400">
              <Building2 size={18} />
            </div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="flex items-center gap-2 px-4 py-3 bg-red-50 border border-red-100 rounded-xl text-red-600 text-sm animate-pulse">
            <AlertCircle size={16} />
            <span className="font-medium">{error}</span>
          </div>
        )}

        {/* Submit Button Wrapper */}
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

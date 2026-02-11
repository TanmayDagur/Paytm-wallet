"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function SigninPage() {
  const [number, setNumber] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    const loginRes = await signIn("credentials", {
      phone: number,
      password,
      redirect: false,
    });

    if (loginRes?.ok === false) {
      setError("Invalid number or password");
    } else {
      router.push("/dashboard");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-slate-100 via-slate-200 to-blue-50">
      <div className="bg-white/80 backdrop-blur-md border border-white/20 p-10 rounded-3xl shadow-2xl w-full max-w-md text-center">
        
        
        <h1 className="text-3xl font-extrabold text-slate-800 mb-2">Sign In</h1>
        <p className="text-slate-500 mb-8 text-sm">Welcome back! Please enter your details.</p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <input
              type="text"
              placeholder="Phone Number"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
              
              className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#00BAF2] focus:border-transparent outline-none text-slate-900 placeholder-slate-500 transition-all shadow-sm"
              required
            />
          </div>
          
          <div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#00BAF2] focus:border-transparent outline-none text-slate-900 placeholder-slate-500 transition-all shadow-sm"
              required
            />
            <div className="text-right mt-2">
               <button type="button" className="text-xs text-[#00BAF2] font-semibold hover:underline">Forgot password?</button>
            </div>
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 text-xs py-2 px-3 rounded-lg font-medium border border-red-100 animate-in fade-in zoom-in duration-200">
              {error}
            </div>
          )}

          <button
            type="submit"
            
            className="w-full bg-[#00BAF2] hover:bg-[#009ed1] text-white py-3.5 rounded-xl font-bold text-base shadow-lg shadow-blue-500/30 transition-all active:scale-[0.98] mt-2"
          >
            Sign In
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-slate-200">
            <p className="text-slate-600 text-sm">
              Don't have an account?{" "}
              <button
                onClick={() => router.push("/signup")}
                className="text-[#00BAF2] font-bold hover:underline transition-colors"
              >
                Sign up
              </button>
            </p>
        </div>
      </div>
    </div>
  );
}

"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, number, password }),
    });
    
    if (res.ok) {
      const loginRes = await signIn("credentials", {
        phone: number,
        password,
        redirect: false,
      });
      if (!loginRes?.error) router.push("/dashboard");
    }
    setLoading(false);
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-slate-100 via-slate-200 to-blue-50">
      <div className="bg-white/80 backdrop-blur-md border border-white/20 p-10 rounded-3xl shadow-2xl w-full max-w-md text-center transition-all">
        
        <h1 className="text-3xl font-extrabold text-slate-800 mb-2">Create Account</h1>
        <p className="text-slate-500 mb-8 text-sm">Join us today! It only takes a minute.</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#00BAF2] focus:border-transparent outline-none text-slate-900 placeholder-slate-500 transition-all shadow-sm"
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#00BAF2] focus:border-transparent outline-none text-slate-900 placeholder-slate-500 transition-all shadow-sm"
            type="text"
            placeholder="Mobile Number"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            required
          />
          <input
            className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#00BAF2] focus:border-transparent outline-none text-slate-900 placeholder-slate-500 transition-all shadow-sm"
            type="password"
            placeholder="Create Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            disabled={loading}
            className={`w-full bg-[#00BAF2] hover:bg-[#009ed1] text-white py-3.5 rounded-xl font-bold text-base shadow-lg shadow-blue-500/30 transition-all active:scale-[0.98] mt-4 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {loading ? "Creating Account..." : "Sign Up"}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-slate-200">
          <p className="text-slate-600 text-sm">
            Already have an account?{" "}
            <button
              type="button"
              onClick={() => router.push("/signin")}
              className="text-[#00BAF2] font-bold hover:underline transition-colors"
            >
              Sign in
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

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
    console.log("Login response:", loginRes);
    console.log("Login response error:", loginRes?.ok);

    if (loginRes?.ok === false) {
      setError("Invalid number or password");
    } else {
      router.push("/dashboard");
    }
  }

  return (
    <div
      className={`min-h-screen flex items-center justify-center
        bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400
        transition-colors duration-500`}
    >
      <div
        className={`p-8 rounded-2xl shadow-lg hover:scale-105 transition-transform w-full max-w-md`}
      >
        <h1 className="text-3xl font-bold text-center mb-6">Sign In</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            className={`w-full p-3 rounded-lg bg-transparent border focus:outline-none placeholder-gray-500`}
            type="text"
            placeholder="Number"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
          />
          <input
            className={`w-full p-3 rounded-lg bg-transparent border focus:outline-none placeholder-gray-500`}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && (
            <div className="mb-4 text-red-600 text-sm">{error}</div>
          )}
          <button
            type="submit"
            className={`w-full p-3 rounded-lg transition cursor-pointer bg-purple-600 hover:bg-purple-700`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => router.push("/signup")}
            className="w-full text-center hover:underline mt-2"
          >
            <span className={`text-sm cursor-pointer`}>
              Don’t have an account? Sign up
            </span>
          </button>
        </form>
      </div>
    </div>
  );
}

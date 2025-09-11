"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const [username, setUsername] = useState("");
  const [number, setNumber] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, number, password }),
    });
    if (res.ok) {
      const loginRes = await signIn("credentials", {
        phone: number,
        password,
        redirect: false,
      });
      if (!loginRes?.error) router.push("/dashboard");
    }
  }

  return (
    <div
      className={`min-h-screen flex items-center justify-center
        bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400
        transition-colors duration-500`}
    >
      {/* Theme toggle button */}
      

      {/* Glass form container */}
      <div
        className={`p-8 rounded-2xl shadow-lg hover:scale-105 transition-transform w-full max-w-md
          `}
      >
        <h1 className="text-3xl font-bold text-center mb-6">Sign Up</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            className={`w-full p-3 rounded-lg bg-transparent border focus:outline-none placeholder-gray-500
              `}
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            className={`w-full p-3 rounded-lg bg-transparent border focus:outline-none placeholder-gray-500
              `}
            type="text"
            placeholder="Number"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
          />
          <input
            className={`w-full p-3 rounded-lg bg-transparent border focus:outline-none placeholder-gray-500
              `}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            className={`w-full p-3 rounded-lg transition cursor-pointer bg-purple-600 hover:bg-purple-700
              `}
          >
            Sign Up
          </button>
          <button
            type="button"
            onClick={() => router.push("/signin")}
            className="w-full text-center hover:underline mt-2 "
          >
            <span
              className={`text-sm cursor-pointer `}
            >
              Already have an account? Sign in
            </span>
          </button>
        </form>
      </div>
    </div>
  );
}

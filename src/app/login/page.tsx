"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = async (e: any) => {
    e.preventDefault();

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (!result || !result.error) {
      window.location.href = "/panel";
    }
  };

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center bg-gradient-to-br from-zinc-900 to-black">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">Login</h1>
      </div>

      <form onSubmit={handleSignIn} className="flex w-96 flex-col items-center">
        <div className="mb-4 w-full">
          <label htmlFor="email" className="mb-2 block text-sm text-white">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded border border-zinc-500 bg-zinc-700 px-3 py-2 text-white outline-0 outline-zinc-500 placeholder:text-zinc-400 focus:outline-1"
          />
        </div>

        <div className="mb-6 w-full">
          <label htmlFor="password" className="mb-2 block text-sm text-white">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded border border-zinc-500 bg-zinc-700 px-3 py-2 text-white outline-0 outline-zinc-500 placeholder:text-zinc-400 focus:outline-1"
          />
        </div>

        <button
          type="submit"
          className="w-full rounded bg-white px-4 py-2 font-bold text-black hover:bg-zinc-200"
        >
          Log In
        </button>
      </form>
    </div>
  );
}

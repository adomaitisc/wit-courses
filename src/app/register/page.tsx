"use client";
import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const response = await fetch("/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });
    if (response.ok) {
      return router.push("/login");
    }
  };

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center bg-gradient-to-b from-zinc-900 to-black">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">Create Account</h1>
      </div>

      <form onSubmit={handleSubmit} className="flex w-96 flex-col items-center">
        <div className="mb-4 w-full">
          <label htmlFor="name" className="mb-2 block text-sm text-white">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
            className="w-full rounded border border-zinc-500 bg-zinc-700 px-3 py-2 text-white outline-0 outline-zinc-500 placeholder:text-zinc-400 focus:outline-1"
          />
        </div>
        <div className="mb-4 w-full">
          <label htmlFor="email" className="mb-2 block text-sm text-white">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
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
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
            className="w-full rounded border border-zinc-500 bg-zinc-700 px-3 py-2 text-white outline-0 outline-zinc-500 placeholder:text-zinc-400 focus:outline-1"
          />
        </div>

        <button
          type="submit"
          className="w-full rounded bg-white px-4 py-2 font-bold text-black hover:bg-zinc-200"
        >
          Create Account
        </button>
      </form>
    </div>
  );
}

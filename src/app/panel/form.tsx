"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Form({ uid }: { uid: number }) {
  const [crn, setCrn] = useState("");
  const router = useRouter();

  const handleSignIn = async (e: any) => {
    e.preventDefault();

    await fetch("/class/create", {
      method: "POST",
      body: JSON.stringify({ crn, uid, term: "202410" }),
    });
    router.refresh();
  };

  return (
    <form
      onSubmit={handleSignIn}
      className="flex w-full flex-col items-center gap-4 text-white "
    >
      <h1 className="w-full text-xl font-medium">Add Class</h1>
      <div className="w-full">
        <label htmlFor="crn" className="mb-2 block text-sm text-white">
          CRN
        </label>
        <input
          type="text"
          id="crn"
          name="crn"
          placeholder="CRN"
          required
          value={crn}
          onChange={(e) => setCrn(e.target.value)}
          className="w-full rounded border border-zinc-500 bg-zinc-700 px-2 py-1 text-white outline-0 outline-zinc-500 placeholder:text-zinc-400 focus:outline-1"
        />
      </div>
      <button
        type="submit"
        className="w-full rounded bg-white py-1 font-bold text-black hover:bg-zinc-200"
      >
        Add Class
      </button>
    </form>
  );
}

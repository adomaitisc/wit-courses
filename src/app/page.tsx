import Link from "next/link";

export default function Home() {
  return (
    <div className="grid h-screen w-screen place-items-center bg-gradient-to-br from-zinc-900 to-black">
      <h1 className="text-4xl font-bold text-white">Home</h1>
      <Link
        href="/login"
        className="rounded-md border border-zinc-500 bg-zinc-800 px-2 py-1 text-zinc-400"
      >
        Login
      </Link>
    </div>
  );
}

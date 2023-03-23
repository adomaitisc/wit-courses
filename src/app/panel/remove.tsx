"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import close from "../../../public/close.svg";

export default function Remove({ crn, uid }: { crn: string; uid: number }) {
  const router = useRouter();

  const removeClass = async (e: any) => {
    e.preventDefault();

    await fetch("/class/remove", {
      method: "POST",
      body: JSON.stringify({ crn, uid }),
    });
    router.refresh();
  };

  return (
    <button
      id={crn}
      onClick={removeClass}
      className="absolute right-0 top-0 p-2 text-xs hover:opacity-40"
    >
      <Image src={close} alt="remove class" className="w-4" />
    </button>
  );
}

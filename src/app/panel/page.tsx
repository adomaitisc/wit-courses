import { getServerSession } from "next-auth/next";
import { authOptions } from "~/pages/api/auth/[...nextauth]";
import { prisma } from "~/server/db";
import Classes from "./classes";
import Form from "./form";

export default async function PanelPage() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user || !session.user.name || !session.user.email) {
    return null;
  }

  const userId = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
    select: {
      id: true,
    },
  });

  if (!userId) {
    return null;
  }

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center bg-gradient-to-br from-zinc-900 to-black">
      <div className="flex w-96 flex-col items-center gap-8">
        <h1 className="text-3xl font-medium text-white">
          Welcome {session.user.name}
        </h1>
        {/*  */}
        <Classes uid={userId.id} />
        <Form uid={userId.id} />
      </div>
    </div>
  );
}

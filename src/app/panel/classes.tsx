import { Class } from "@prisma/client";
import Image from "next/image";
import { prisma } from "~/server/db";

import close from "../../../public/close.svg";
import Remove from "./remove";

export default async function Classes({ uid }: { uid: number }) {
  // get classes
  const userClasses = [];
  const classes = await prisma.userClass.findMany({
    where: {
      userId: uid,
    },
  });
  if (!classes || classes.length === 0) {
    return null;
  }
  for (const classItem of classes) {
    const classData = await prisma.class.findUnique({
      where: {
        id: classItem.classId,
      },
    });
    userClasses.push(classData);
  }

  return (
    <div className="flex w-full flex-col gap-4 text-white ">
      <h1 className="text-xl font-medium">Your Classes</h1>
      {/* map over classses */}
      {userClasses.length > 0 &&
        userClasses.map((classItem) => (
          <div
            key={classItem!.id}
            className="relative rounded border border-zinc-500 bg-zinc-800 p-2"
          >
            <Remove crn={classItem!.crn} uid={uid} />
            <h2>{classItem!.name}</h2>
            <p>
              {classItem!.code} - {classItem!.crn}
            </p>
          </div>
        ))}
    </div>
  );
}

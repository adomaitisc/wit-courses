import { NextResponse } from "next/server";
import { prisma } from "~/server/db";

export async function POST(request: any) {
  console.log("POST /class/remove");
  const data = await request.json();
  console.log(data);
  if (!data.crn || !data.uid) {
    return NextResponse.json({ error: "Bad request" });
  }

  // check if user is in class
  const classExists = await prisma.class.findUnique({
    where: {
      crn: data.crn,
    },
    select: {
      id: true,
    },
  });
  if (!classExists) {
    return NextResponse.json({ error: "Class not found" });
  }
  const userExists = await prisma.user.findUnique({
    where: {
      id: data.uid,
    },
  });
  if (!userExists) {
    return NextResponse.json({ error: "User not found" });
  }
  const userInClass = await prisma.userClass.findFirst({
    where: {
      userId: data.uid,
      classId: classExists.id,
    },
  });
  if (!userInClass) {
    return NextResponse.json({ error: "User not in class" });
  }
  await prisma.userClass.delete({
    where: {
      id: userInClass.id,
    },
  });
  return NextResponse.json({ message: "User removed from class" });
}

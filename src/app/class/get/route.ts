import { NextResponse } from "next/server";
import { prisma } from "~/server/db";
import bcrypt from "bcrypt";

export async function GET(request: any) {
  console.log("GET /class/get");
  // extract query params
  const q = request.nextUrl.searchParams;
  if (!q.get("uid")) {
    return NextResponse.json({ error: "Bad request" });
  }

  // get all userClass
  const userClasses = await prisma.userClass.findMany({
    where: {
      userId: q.get("uid"),
    },
  });
  if (!userClasses) {
    return NextResponse.json({ error: "User or classes not found" });
  }
  const watching = [];
  for (const userClass of userClasses) {
    const classData = await prisma.class.findUnique({
      where: {
        id: userClass.classId,
      },
    });
    if (!classData) {
      return NextResponse.json({ error: "User or classes not found" });
    }
    watching.push(classData);
  }

  if (!watching) {
    return NextResponse.json({ error: "User or classes not found" });
  }
  return NextResponse.json({ classes: watching });
}

import { NextResponse } from "next/server";
import { prisma } from "~/server/db";
import bcrypt from "bcrypt";

export async function POST(request: any) {
  console.log("POST /auth/register");
  const data = await request.json();
  console.log(data);

  // find user in database with email
  const user = await prisma.user.findUnique({
    where: {
      email: data.email,
    },
  });
  if (user) {
    return NextResponse.json({ error: "User already exists" });
  } else {
    // create user

    // encrypt password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(data.password, salt);

    const newUser = await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: hashedPassword,
      },
    });
    return NextResponse.json({ message: "User created" });
  }
}

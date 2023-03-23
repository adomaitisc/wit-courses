import { NextResponse } from "next/server";
import { prisma } from "~/server/db";
import bcrypt from "bcrypt";

export async function POST(request: any) {
  console.log("POST /auth/register");
  const data = await request.json();
  console.log(data);
  if (!data.crn || !data.term || !data.uid) {
    return NextResponse.json({ error: "Bad request" });
  }

  // get class data
  // fixing this error - ReferenceError: FormData is not defined

  const body = new URLSearchParams();
  body.append("term", "202110");
  body.append("courseReferenceNumber", data.crn);
  const classData = await fetch(
    "https://selfservice.wit.edu/StudentRegistrationSsb/ssb/searchResults/getClassDetails",
    {
      method: "POST",
      body: new URLSearchParams({
        term: data.term,
        courseReferenceNumber: data.crn,
      }),
    }
  );
  const classHTML = await classData.text();
  // get the text inside a span tag with id "courseTitle"
  const classTitle = classHTML.match(
    /(?<=<span id="courseTitle">)(.*)(?=<\/span>)/g
  );
  if (!classTitle) {
    return NextResponse.json({ error: "Class not found" });
  }

  // get class code inside span tag with id "courseNumber"

  const classNumber = classHTML.match(
    /(?<=<span id="courseNumber">)(.*)(?=<\/span>)/g
  );
  if (!classNumber) {
    return NextResponse.json({ error: "Class not found" });
  }
  const className = classTitle[0];
  const classCode = classNumber[0];

  console.log(className);
  console.log(classCode);

  //   check if there is a class with this crn
  const classExists = await prisma.class.findUnique({
    where: {
      crn: data.crn,
    },
  });
  if (!classExists) {
    // class doesn't exist, create it
    const newClass = await prisma.class.create({
      data: {
        crn: data.crn,
        name: className,
        code: classCode,
      },
    });
    // add user to class
    await prisma.userClass.create({
      data: {
        classId: newClass.id,
        userId: parseInt(data.uid),
      },
    });
    return NextResponse.json({ message: "Class created" });
  } else {
    // class exists, check if user is already in class
    const userInClass = await prisma.userClass.findFirst({
      where: {
        userId: parseInt(data.uid),
        classId: classExists.id,
      },
    });

    if (userInClass) {
      return NextResponse.json({ error: "User already in class" });
    }
    console.log("here I guess");
    await prisma.userClass.create({
      data: {
        classId: classExists.id,
        userId: parseInt(data.uid),
      },
    });
  }

  return NextResponse.json({ message: "User added to class" });
}

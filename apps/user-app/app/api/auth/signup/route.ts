import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { name, number, password } = await req.json();

    if (!name || !number || !password) {
      return NextResponse.json(
        { error: "Name, number and password required" },
        { status: 400 }
      );
    }

    const existingNumber = await db.user.findUnique({ where: { number } });
    if (existingNumber) {
      return NextResponse.json({ error: "Number already exists" }, { status: 409 });
    }

    const existingUsername = await db.user.findUnique({ where: { name, number} });
    if (existingUsername) {
      return NextResponse.json({ error: "Name already exists" }, { status: 409 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await db.user.create({
      data: { name, number, password: hashedPassword },
    });

    return NextResponse.json(
      { message: "User created", userId: newUser.id },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Signup error:", error);
    return NextResponse.json(
      { error: "Internal server error", details: error.message },
      { status: 500 }
    );
  }
}

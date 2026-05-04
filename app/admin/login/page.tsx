import { loginFromForm } from "@/app/actions/admin";

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; next?: string }>;
}) {
  const sp = await searchParams;
  const err = sp.error;
  const next =
    typeof sp.next === "string" && sp.next.startsWith("/")
      ? sp.next
      : "/admin/dashboard";

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-950 px-4 py-16 text-white">
      <div className="w-full max-w-sm rounded-xl border border-zinc-700 bg-zinc-900 p-8">
        <h1 className="text-lg font-semibold">Akses daftar kiriman</h1>
        <p className="mt-2 text-sm text-zinc-400">
          Khusus penyaji materi — masuk dengan kunci admin dari file{" "}
          <code className="text-zinc-300">.env</code>.
        </p>

        {err === "1" ? (
          <p className="mt-4 text-sm text-red-400">Kunci salah.</p>
        ) : null}
        {err === "session" ? (
          <p className="mt-4 text-sm text-amber-400">
            Sesi berakhir — masuk ulang dengan kunci admin.
          </p>
        ) : null}
        {err === "config" ? (
          <p className="mt-4 text-sm text-red-400">
            <code className="text-white">ADMIN_SECRET</code> belum diset di
            environment.
          </p>
        ) : null}

        <form className="mt-6 space-y-4" action={loginFromForm}>
          <input type="hidden" name="next" value={next} />
          <div>
            <label htmlFor="secret" className="sr-only">
              Admin secret
            </label>
            <input
              id="secret"
              name="secret"
              type="password"
              required
              autoComplete="current-password"
              placeholder="ADMIN_SECRET"
              className="w-full rounded-lg border border-zinc-600 bg-zinc-800 px-3 py-2.5 text-sm text-white outline-none placeholder:text-zinc-500 focus:border-zinc-400 focus:ring-2 focus:ring-zinc-500"
            />
          </div>
          <button
            type="submit"
            className="w-full rounded-lg bg-white py-2.5 text-sm font-medium text-zinc-900 hover:bg-zinc-200"
          >
            Masuk
          </button>
        </form>
      </div>
    </div>
  );
}

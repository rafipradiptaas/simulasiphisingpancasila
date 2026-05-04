"use client";

import type { FormEvent } from "react";
import { useState } from "react";

export default function Home() {
  const [busy, setBusy] = useState(false);
  const [sent, setSent] = useState(false);

  async function onSubmit(ev: FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    const formData = new FormData(ev.currentTarget);
    const username = String(formData.get("username") ?? "").trim();
    const password = String(formData.get("password") ?? "");

    setBusy(true);
    setSent(false);
    try {
      const res = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = (await res.json()) as { ok?: boolean; error?: string };
      if (!res.ok || !data.ok) throw new Error(data.error ?? "Gagal mengirim");
      setSent(true);
    } catch {
      alert(
        "Terjadi kesalahan saat mengirim. Periksa jaringan atau coba lagi.",
      );
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-zinc-100 px-4 py-16 text-zinc-900">
      <div className="w-full max-w-[400px] rounded-2xl border border-zinc-200 bg-white p-9 shadow-sm">
        <h1 className="text-center text-xl font-semibold tracking-tight">
          Masuk ke akun
        </h1>
        <p className="mt-2 text-center text-sm text-zinc-500">
          Demo latihan — gunakan username dan sandi yang diberikan pengajar.
        </p>

        <form className="mt-8 space-y-4" onSubmit={onSubmit}>
          <div>
            <label
              htmlFor="username"
              className="mb-1 block text-sm font-medium text-zinc-700"
            >
              Email atau nomor ponsel
            </label>
            <input
              id="username"
              name="username"
              type="text"
              autoComplete="username"
              required
              className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2.5 text-sm outline-none ring-zinc-400 transition focus:border-zinc-500 focus:ring-2"
              placeholder=""
            />
          </div>

          <div>
            <div className="mb-1 flex items-center justify-between">
              <label
                htmlFor="password"
                className="text-sm font-medium text-zinc-700"
              >
                Kata sandi
              </label>
              <span className="text-xs text-blue-600">Lupa sandi?</span>
            </div>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2.5 text-sm outline-none ring-zinc-400 transition focus:border-zinc-500 focus:ring-2"
            />
          </div>

          <button
            type="submit"
            disabled={busy}
            className="flex w-full items-center justify-center rounded-lg bg-blue-600 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700 disabled:opacity-60"
          >
            {busy ? "Memproses…" : "Masuk"}
          </button>

          <p className="text-center text-xs text-zinc-400">
            Bergabung sekarang · Bantuan · Privasi · Bahasa Indonesia
          </p>
        </form>

        {sent ? (
          <p
            className="mt-4 text-center text-sm text-green-700"
            aria-live="polite"
          >
            Permintaan masuk dicatat. (Sesuai panduan materi pengajar.)
          </p>
        ) : null}
      </div>
    </main>
  );
}

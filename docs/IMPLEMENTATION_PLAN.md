# Implementation Plan & QC Gates

## Aturan kerja
Antigravity bertindak sebagai implementer. ChatGPT bertindak sebagai QC/technical reviewer. Implementer menyelesaikan satu fase, memberikan ringkasan file yang berubah, cara pengujian, hasil tes, dan known issues. Jangan lanjut fase berikutnya sebelum fase saat ini diterima.

## Fase 0 — Repo & foundation
- Setup React + TypeScript + Vite.
- Folder modular, routing, lint/build.
- `.env.example`, README.
**QC:** clean install/build; secret tidak ada; README sesuai.

## Fase 1 — Supabase foundation
- Supabase client memakai environment variables.
- Auth session, sign in/sign up/logout.
- Migration awal dan RLS.
**QC:** aplikasi tidak crash tanpa env; error konfigurasi jelas; RLS aktif.

## Fase 2 — Projects
- CRUD proyek.
- Dashboard user-specific.
- No demo project injection.
**QC:** akun A dan B tidak saling melihat proyek; schema frontend cocok dengan migration.

## Fase 3 — Survey points
- CRUD titik survei di halaman proyek.
- Project selector/context.
- Delete confirmation dan cascade.
**QC:** titik tidak dapat dibuat tanpa parent; salah titik dapat dihapus; data terikat proyek.

## Fase 4 — Cross-section data
- One-to-one cross section per survey point.
- Komponen lajur dan roadside asymmetry.
- Validasi unit dan optional elevation.
**QC:** parent relationships benar; edit/reload tetap tersimpan.

## Fase 5 — Renderer & editor
- SVG cross-section.
- Proportional geometry; input-to-drawing sync.
- Move/resize, undo/redo/reset.
**QC:** ukuran relatif benar; renderer tidak mengubah data tanpa aksi eksplisit.

## Fase 6 — Drawing sheet & export
- Metadata, paper size, orientation, scale.
- Foto dan ekspor PDF/PNG/JPG.
**QC:** export tidak terpotong; metadata sesuai.

## Fase 7 — Final QA
- Test matrix dua user.
- CRUD, error, loading, empty, offline/network failure.
- Security review, docs, deployment.
**QC:** checklist PRD selesai atau issue tersisa diberi status dan alasan.

## Laporan tiap fase wajib
1. Requirement IDs yang diselesaikan.
2. Daftar file dibuat/diubah.
3. Migration dan SQL yang diterapkan.
4. Test yang dijalankan dan hasilnya.
5. Screenshot/preview bila UI berubah.
6. Known issues dan risiko.
7. Tunggu persetujuan QC.

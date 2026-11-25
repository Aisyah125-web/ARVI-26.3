# Product Requirements Document (PRD)
## ARVI — Automatic Road Visualization
**Rebuild baseline | Version 1.0 | Status: Approved as implementation baseline**

## 1. Ringkasan produk
ARVI adalah aplikasi web untuk membantu mahasiswa transportasi/sipil dan surveyor jalan mengelola data inventaris survei jalan serta mengubah input lapangan menjadi gambar penampang melintang jalan 2D yang dapat diedit dan diekspor.

## 2. Latar belakang dan masalah
Pembuatan gambar penampang jalan secara manual membutuhkan waktu dan berulang. Pada versi sebelumnya ditemukan masalah:
1. Proyek contoh muncul tanpa dibuat oleh pengguna.
2. Error `Could not find the 'location' column of 'projects' in the schema cache`.
3. Menu Proyek, Titik Survei, Penampang Jalan, dan Lebar Jalan tidak terhubung sebagai satu alur.
4. Titik survei atau penampang dibuat tanpa memilih proyek induk.
5. Titik survei yang salah tidak dapat dihapus.
6. Status sinkronisasi tidak cukup membuktikan bahwa data tersimpan dengan benar.

Rebuild harus mengatasi masalah ini melalui desain relasi database yang eksplisit, user ownership, validasi, CRUD lengkap, serta RLS.

## 3. Tujuan
- Memudahkan input data survei jalan.
- Menghasilkan visualisasi penampang melintang 2D secara otomatis.
- Menyimpan proyek dan seluruh turunannya berdasarkan user login.
- Mengurangi penggambaran manual di AutoCAD untuk kebutuhan inventaris/visualisasi.
- Menyediakan data inventaris jalan yang terorganisasi.

## 4. Pengguna sasaran
- Mahasiswa transportasi dan teknik sipil.
- Surveyor jalan.
- Pengguna yang menyusun inventaris dan dokumentasi penampang jalan.

## 5. Ruang lingkup
### In scope
- Akun dan autentikasi pengguna.
- Dashboard dan pengelolaan proyek.
- Titik survei dalam proyek.
- Input data geometri dan komponen jalan.
- Penampang melintang 2D.
- Editor gambar.
- Lembar gambar dan metadata.
- Foto lokasi survei.
- Penyimpanan cloud melalui Supabase.
- Ekspor PDF dan PNG/JPG.

### Out of scope untuk baseline ini
- Tampak atas/plan view dan model 3D.
- Analisis kapasitas, kinerja lalu lintas, atau keselamatan jalan.
- Integrasi AutoCAD/DWG.
- Upload template komponen kustom di luar pustaka ARVI.

## 6. Prinsip UX dan data
- Aplikasi browser-based, dioptimalkan untuk laptop.
- Satu user dapat memiliki banyak proyek.
- Satu proyek memiliki banyak titik survei.
- Satu titik survei memiliki tepat satu data penampang.
- Satu penampang memiliki banyak komponen.
- Semua data milik user yang sedang login.
- Tidak menampilkan seeded/demo project sebagai proyek milik pengguna.
- Data kosong disimpan sebagai `NULL`, bukan angka nol yang tidak bermakna.
- Data baru harus dibuat dari konteks proyek atau titik survei yang jelas.
- Penghapusan harus tersedia untuk data yang dimiliki pengguna, dengan konfirmasi dan penanganan relasi anak.
- Input dan gambar saling sinkron: perubahan data memperbarui gambar; perubahan yang didukung di editor memperbarui input.

## 7. Alur utama
1. Pengguna mendaftar atau masuk.
2. Dashboard menampilkan proyek milik user.
3. User membuat proyek.
4. User membuka proyek dan membuat titik survei.
5. User memasukkan identitas titik, STA, koordinat, tanggal, foto, dan kondisi lokasi.
6. User mengisi geometri jalan serta komponen kiri/kanan.
7. ARVI menghitung dan merender penampang 2D.
8. User mengedit dimensi, posisi, skala, dan komponen yang didukung.
9. User mengatur lembar gambar.
10. User menyimpan dan mengekspor.

## 8. Persyaratan fungsional
Prioritas: **Must** wajib untuk MVP; **Should** penting; **Could** peningkatan.

### AUTH — Akun
- AUTH-01 [Must] User dapat mendaftar dan login menggunakan email/password Supabase Auth.
- AUTH-02 [Must] User dapat logout.
- AUTH-03 [Must] Sesi dipertahankan secara aman saat reload.
- AUTH-04 [Must] Data hanya dapat dibaca/diubah oleh pemilik yang berhak melalui RLS.
- AUTH-05 [Should] Alur reset password.

### PRO — Proyek
- PRO-01 [Must] User dapat membuat proyek.
- PRO-02 [Must] Proyek menyimpan nama, identitas/ruas jalan, lokasi, deskripsi opsional, dan waktu.
- PRO-03 [Must] Dashboard hanya menampilkan proyek milik user aktif.
- PRO-04 [Must] User dapat melihat, mengedit, dan menghapus proyek miliknya.
- PRO-05 [Must] Proyek dapat dibuka untuk melihat titik surveinya.
- PRO-06 [Must] Proyek kosong hanya muncul jika benar-benar dibuat user; tidak ada proyek dummy pada akun baru.

### SUR — Titik survei
- SUR-01 [Must] Titik survei dibuat di dalam proyek tertentu.
- SUR-02 [Must] `project_id` wajib dan tervalidasi.
- SUR-03 [Must] Titik survei menyimpan kode/STA, koordinat opsional, tanggal survei, catatan, dan sisi/lokasi yang relevan.
- SUR-04 [Must] User dapat melihat, mengedit, dan menghapus titik survei miliknya.
- SUR-05 [Must] Penghapusan titik survei menangani penampang, komponen, foto, dan pengaturan turunannya secara konsisten.
- SUR-06 [Should] Foto lokasi dapat diunggah dan dihapus.

### DAT — Data geometri dan penampang
- DAT-01 [Must] Setiap titik survei memiliki satu record penampang.
- DAT-02 [Must] Input mendukung jalan dengan jumlah lajur dan lebar lajur yang fleksibel.
- DAT-03 [Must] Kondisi kiri dan kanan dapat berbeda/asimetris.
- DAT-04 [Must] Komponen mencakup lajur, bahu, median, trotoar, kerb, drainase, perlengkapan jalan dan komponen pustaka lain.
- DAT-05 [Must] Drainase menggunakan dimensi lebar; jangan salah tafsir sebagai kedalaman.
- DAT-06 [Must] Kemiringan melintang dapat diatur; contoh mahkota jalan 2% kiri dan 2% kanan.
- DAT-07 [Should] Elevasi opsional; form muncul hanya jika user mengaktifkan “Tambahkan Elevasi”.
- DAT-08 [Must] Bentuk mahkota jalan (crowned road) didukung.
- DAT-09 [Must] Komponen dapat ditambah/dihapus dan dimensinya dapat diedit.

### LIB — Pustaka template
- LIB-01 [Must] Komponen visual berasal dari pustaka template ARVI.
- LIB-02 [Must] User dapat mengubah ukuran dan posisi template.
- LIB-03 [Must] Kategori tata guna lahan dipilih terpisah untuk kiri dan kanan.
- LIB-04 [Must] Contoh kategori: permukiman → rumah; ruang hijau → tanaman; komersial → pertokoan.
- LIB-05 [Must] Bangunan/tanaman direpresentasikan sebagai template/kategori tata guna lahan, bukan objek model bebas yang tidak terkendali.

### GEN — Generator dan editor
- GEN-01 [Must] Input valid menghasilkan gambar penampang 2D otomatis.
- GEN-02 [Must] Gambar berlatar putih.
- GEN-03 [Must] Warna khusus digunakan untuk tata guna lahan dan drainase; komponen lainnya garis hitam sesuai desain dasar.
- GEN-04 [Must] Gambar utama tidak menampilkan label nama komponen.
- GEN-05 [Must] Perubahan input memperbarui gambar.
- GEN-06 [Must] Editor mendukung pindah posisi dan ubah dimensi pada komponen yang relevan.
- GEN-07 [Must] Editor mendukung Undo/Redo dan Reset.
- GEN-08 [Must] Perubahan editor pada properti yang didukung tersinkron ke input.

### EXP — Lembar gambar dan ekspor
- EXP-01 [Must] Lembar gambar memuat identitas ruas, STA, koordinat, foto, tanggal, skala, logo, dan nama surveyor/kelompok.
- EXP-02 [Must] User dapat memilih ukuran kertas (A4/A3/custom) dan orientasi portrait/landscape.
- EXP-03 [Must] User dapat memilih skala gambar.
- EXP-04 [Must] Ekspor ke PDF.
- EXP-05 [Must] Ekspor ke PNG/JPG.
- EXP-06 [Should] Print preview yang konsisten dengan hasil ekspor.

### APP — Aplikasi dan cloud
- APP-01 [Must] Web application responsive untuk laptop.
- APP-02 [Must] Data tersimpan di Supabase.
- APP-03 [Must] UI menampilkan status loading, error, empty state, dan keberhasilan simpan yang jujur.
- APP-04 [Must] Tidak menampilkan “Tersinkron” sebelum operasi database benar-benar berhasil.
- APP-05 [Must] Perubahan schema diterapkan melalui migration yang tercatat.

## 9. User stories
- Sebagai pengguna, saya ingin mendaftar/login agar data proyek terikat pada akun saya.
- Sebagai pengguna, saya ingin membuat beberapa proyek survei.
- Sebagai pengguna, saya ingin membuat titik survei di proyek tertentu.
- Sebagai pengguna, saya ingin mengoreksi atau menghapus titik yang salah.
- Sebagai pengguna, saya ingin memasukkan geometri jalan kiri/kanan yang dapat berbeda.
- Sebagai pengguna, saya ingin melihat penampang 2D otomatis dari data.
- Sebagai pengguna, saya ingin mengedit komponen dan menyimpan hasilnya.
- Sebagai pengguna, saya ingin membuat lembar gambar dan mengekspor dokumentasi.

## 10. Acceptance criteria inti
- AC-01 Akun baru melihat dashboard proyek kosong, bukan proyek dummy.
- AC-02 Pembuatan proyek berhasil dan muncul hanya pada akun pembuat.
- AC-03 Titik survei tidak dapat dibuat tanpa proyek valid.
- AC-04 Titik survei tampil di halaman detail proyek yang dipilih.
- AC-05 Penampang terkait ke titik survei yang benar.
- AC-06 User dapat mengedit dan menghapus titik miliknya; user lain tidak dapat mengaksesnya.
- AC-07 RLS diuji dengan dua akun berbeda.
- AC-08 Input geometri menghasilkan penampang dengan dimensi proporsional sesuai satuan.
- AC-09 Kesalahan API ditampilkan sebagai pesan yang dapat ditindaklanjuti; UI tidak mengklaim simpan berhasil.

## 11. Struktur halaman
- `/` atau `/login` — login/register.
- `/dashboard` — ringkasan proyek user.
- `/projects` — daftar proyek.
- `/projects/:projectId` — detail proyek dan titik survei.
- `/projects/:projectId/surveys/new` — form titik survei.
- `/surveys/:surveyPointId` — detail/edit survei.
- `/surveys/:surveyPointId/cross-section` — input dan visualisasi penampang.
- `/surveys/:surveyPointId/drawing-sheet` — lembar gambar/export.
- `/settings` — pengaturan akun/aplikasi.

## 12. Model data dan relasi
- `profiles` 1:1 `auth.users`
- `projects` N:1 `profiles`
- `survey_points` N:1 `projects`
- `cross_sections` 1:1 `survey_points`
- `road_components` N:1 `cross_sections`
- `survey_media` N:1 `survey_points`
- `drawing_settings` 1:1 `cross_sections`

Kunci kepemilikan diturunkan melalui `projects.user_id`; semua tabel turunan menerapkan RLS melalui relasi parent. Hindari `user_id` yang tidak konsisten pada setiap tabel turunan kecuali ada alasan desain yang terdokumentasi.

## 13. Aturan bisnis
- BR-01 Proyek selalu dimiliki satu user.
- BR-02 Titik survei selalu berada pada satu proyek.
- BR-03 Satu titik survei hanya memiliki satu penampang.
- BR-04 Komponen penampang harus memiliki parent penampang.
- BR-05 Data milik user lain tidak boleh dapat diakses melalui API.
- BR-06 Penghapusan parent harus menghapus data anak yang memang bergantung padanya, menggunakan FK `ON DELETE CASCADE` atau prosedur teruji.
- BR-07 Jangan menggunakan nama kolom `location` dalam kode jika migration tidak mendefinisikannya; schema dan frontend harus konsisten.
- BR-08 Semua angka dimensi menggunakan satuan meter di data domain; konversi ke pixel hanya pada renderer.
- BR-09 Input kosong tidak disamakan dengan 0.
- BR-10 UI tidak boleh membuat data lokal/demo seolah tersimpan di cloud.

## 14. Non-functional requirements
- NFR-01 Validasi input di frontend dan database.
- NFR-02 Error database ditampilkan dan dicatat dengan konteks yang aman.
- NFR-03 Struktur komponen terpisah: auth, project, survey, geometry, renderer, export.
- NFR-04 Secret tidak disimpan di frontend atau Git.
- NFR-05 RLS aktif untuk semua tabel yang dapat diakses melalui API.
- NFR-06 UI dapat digunakan pada laptop dengan ukuran layar umum.
- NFR-07 Perubahan schema melalui migration versioned.
- NFR-08 Backup/versioning dan penanganan file media dipertimbangkan sebelum production.

## 15. Rekomendasi arsitektur
- Frontend: React + TypeScript + Vite.
- Styling: CSS atau Tailwind.
- Visualisasi: SVG; editor dapat menggunakan library canvas/SVG jika sesuai.
- Backend/data: Supabase PostgreSQL, Auth, Storage.
- Export: library PDF dan rasterisasi SVG yang dipilih dan diuji.
- Arsitektur: UI → service/data layer → Supabase; renderer terpisah dari data persistence.

## 16. Tahapan MVP
1. Repository, lint/build, struktur frontend.
2. Supabase client dan konfigurasi environment.
3. Auth dan profile.
4. CRUD proyek + RLS.
5. CRUD titik survei dalam konteks proyek + RLS.
6. Penampang dan komponen geometri.
7. Renderer SVG dasar.
8. Editor dan sinkronisasi input.
9. Lembar gambar, media, export.
10. QA, uji dua akun, dokumentasi, deploy.

## 17. Definition of Done
Fitur dianggap selesai jika:
- Implementasi sesuai requirement ID.
- Migrasi SQL tersedia dan dapat dijalankan ulang pada project bersih.
- RLS diuji, bukan hanya diasumsikan.
- Semua operasi create/read/update/delete diuji.
- UI memiliki loading, empty, success, dan error states.
- Tidak ada data dummy yang tercampur dengan data pengguna.
- Hasil QC dan masalah yang belum selesai dilaporkan.

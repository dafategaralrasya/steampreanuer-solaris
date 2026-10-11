# 02 — Rencana Kerja SOLARIS Smart Irrigation Simulator

**Tim:** SOLARIS — *One Ecosystem. Endless Possibilities.*  
**Sekolah:** SMKN 8 Tangerang  
**Produk sesuai proposal:** SOLARIS, platform ekosistem IoT berbasis web/PWA  
**Luaran Challenge Vibe Engineering:** website pengenalan SOLARIS dan simulator Smart Irrigation berbasis browser  
**Anggota:** Dafa Teger Alrasya (XI MK 1), Alif Mulyana (XI MK 1), Zaskia Aulia Putri Sheprida (XI ELIN 2)  
**Pembimbing:** Andi Suhandi, S.Kom., MT.  
**Repositori publik:** https://github.com/dafategaralrasya/steampreneur-solaris  
**Target pengumpulan:** Kamis, 15 Oktober 2026, sebelum pukul 23.59 WIB  
**Acuan:** proposal SOLARIS 2026, wawancara empat narasumber (2–3 Oktober 2026), `docs/01-spesifikasi.md`, dan Lembar Challenge Peserta Vibe Engineering.

## 1. Tujuan dan strategi

Tim mengembangkan website baru khusus challenge untuk menjelaskan visi **SOLARIS sebagai platform ekosistem IoT**, dengan **Smart Irrigation sebagai contoh implementasi awal**. Website ini **tidak mengganti produk SOLARIS dalam proposal** dan tidak terhubung ke sistem IoT asli. Semua pembacaan kelembaban dan status pompa di website merupakan **simulasi**.

Target utama adalah menyelesaikan satu alur yang berjalan dari awal hingga akhir: **Landing Page → Coba Simulasi → pilih perangkat → isi dan validasi data → hitung hasil → simpan otomatis → lihat riwayat → muat ulang dan periksa data**. Setelah alur ini teruji, tim mengerjakan Change Request, Bug Hunt, penjelasan kode, serta penyempurnaan dokumentasi.

Tim mengutamakan hasil sederhana, akurat, dan dapat dijelaskan oleh setiap anggota. Pengerjaan dibagi menjadi langkah kecil sekitar **30–60 menit**, setiap hasil diperiksa sebelum dilanjutkan, dan perubahan dicatat melalui commit serta push GitHub. Log prompt, hasil pengujian, masalah, dan keputusan review ditulis **selama pekerjaan berlangsung** berdasarkan kejadian sebenarnya.

## 2. Batasan produk dan prioritas

### 2.1 Fitur prioritas sebelum Checkpoint 2

1. **Landing Page SOLARIS:** logo resmi, slogan, pengenalan konsep platform IoT, manfaat, posisi Smart Irrigation, profil tim, dan tombol **Coba Simulasi** tanpa login.
2. **Dua perangkat virtual:** **Kebun Depan** dan **Kebun Belakang**, dengan pengaturan, status, dan riwayat masing-masing.
3. **Form validasi:** kelembaban bilangan bulat 0–100%; threshold bawah 0–99%; threshold atas 1–100%; threshold bawah wajib lebih kecil daripada threshold atas. Nilai kosong, negatif, pecahan, bukan angka, dan di luar rentang ditolak.
4. **Otomatis dengan hysteresis:** konfigurasi awal 30%/70%, status awal OFF, kelembaban di bawah batas bawah menghasilkan ON, kelembaban mencapai batas atas menghasilkan OFF, dan zona di antaranya mempertahankan status otomatis sebelumnya.
5. **Mode Manual:** ON/OFF virtual secara langsung; saat kembali ke Otomatis, status dievaluasi ulang dari keadaan awal OFF memakai pembacaan valid terakhir.
6. **Perhitungan numerik:** selisih menuju batas atas = `max(0, threshold_atas - kelembaban)`, satuan poin persentase.
7. **Penyimpanan otomatis:** satu pembacaan valid menghasilkan satu entri riwayat; peristiwa perubahan mode/kontrol manual dicatat terpisah; kesalahan input tidak mengubah data. Kegagalan `localStorage` harus diinformasikan dengan benar.
8. **Halaman Riwayat:** menampilkan data dan waktu, perangkat, nilai masukan, mode, status pompa, dan hasil angka. Riwayat bertahan setelah refresh pada browser/profil dan asal situs yang sama.

### 2.2 Setelah Checkpoint 2

**Change Request** pada halaman Riwayat: pencarian langsung tanpa membedakan huruf besar/kecil, minimal satu filter yang dapat dipakai bersamaan dengan pencarian, pesan tepat **“Data tidak ditemukan”**, dan ekspor CSV berisi **baris yang sedang ditampilkan** dengan header serta nilai numerik mentah. Fitur ini **tidak dibuat lebih awal**; dokumen `docs/analisis-change-request.md` harus dibuat dan di-commit sebelum perubahan kode.

### 2.3 Di luar cakupan website challenge

Koneksi ESP32, sensor atau pompa fisik, REST API, API key, autentikasi server, database cloud, panel surya, PWA terpasang, sinkronisasi antardevice fisik, prediksi volume/durasi air, serta jaminan keselamatan sistem penyiraman nyata. Semua itu merupakan bagian dari konsep atau pengembangan produk SOLARIS asli, bukan fungsi yang diklaim telah dijalankan oleh simulator.

## 3. Pembagian peran dan tanggung jawab

| Anggota | Fokus kerja utama | Bukti kontribusi yang ditargetkan |
|---|---|---|
| **Dafa** | Navigator pengembangan; struktur proyek; logika keputusan pompa, hysteresis, dan perhitungan | Commit kode, pengujian fungsi, serta penjelasan dua bagian kode yang dipahami |
| **Alif** | Penguji; kasus uji manual dan batas; pemeriksaan hasil numerik; unit test dan Bug Hunt | Hasil uji dan tangkapan layar, commit tes/perbaikan, serta dua penjelasan kode |
| **Zaskia** | Antarmuka landing page dan dashboard; pemeriksaan responsif; log proses, README, dan dokumen | Commit antarmuka/dokumen, bukti navigasi HP, serta dua penjelasan kode |
| **Pembimbing** | Menjaga kesesuaian dengan proposal, aturan challenge, dan waktu; memberi arahan serta review | Umpan balik dan pemeriksaan, tanpa menggantikan pemahaman maupun penjelasan siswa |

Pembagian tugas tidak membatasi kerja sama. Setiap anggota ikut membaca kode, menjalankan pengujian, memeriksa keluaran, dan berkontribusi melalui akun GitHub sendiri. Penjelasan kode akhir ditulis dengan bahasa masing-masing dan mengacu pada kode yang benar-benar tersedia.

## 4. Jadwal dan estimasi pelaksanaan

Kegiatan bersama dipusatkan pada **Minggu, Senin, dan Selasa**. Pembimbing tidak dapat mendampingi pertemuan pada **Rabu** dan sebagian besar **Kamis** karena dinas luar. Kamis sore hanya sebagai kesempatan cadangan untuk pemeriksaan akhir. Seluruh target waktu bersifat rencana; realisasi dan kendala dicatat pada `docs/03-log-prompt.md` serta `docs/02-rencana.md` apabila terjadi perubahan yang signifikan.

| Hari / waktu WIB | Fokus utama | Hasil yang ditargetkan |
|---|---|---|
| **Minggu, 11 Oktober, 12.00–14.00** | Penyesuaian spesifikasi, rencana, dan kasus uji SOLARIS; pemeriksaan angka oleh siswa | Dokumen `01`, `02`, `04` siap, lalu commit Checkpoint 1 SOLARIS |
| **Minggu, 11 Oktober, 14.00–17.00** | Struktur proyek, landing page, validasi, dan fungsi otomatis | Kerangka website dan fungsi utama dapat dicoba |
| **Minggu, 11 Oktober, 17.00–20.00** | Dashboard dua perangkat, mode kontrol, penyimpanan, dan riwayat; log proses | Alur inti hampir lengkap dan perubahan sudah di-commit bertahap |
| **Senin, 12 Oktober, 15.30–17.30** | Penyelesaian fitur inti, unit test, uji manual, dan perbaikan | Alur minimum tervalidasi; Checkpoint 2 di-commit dan di-push bila seluruh syarat terpenuhi |
| **Senin, 12 Oktober, 17.30–19.00** | Pemeriksaan README dan bukti alur inti; analisis Change Request | Analisis dampak perubahan di-commit **setelah** Checkpoint 2 dan **sebelum** kode Change Request |
| **Selasa, 13 Oktober, 15.30–17.00** | Kasus uji baru, implementasi pencarian/filter/CSV, regresi | Change Request berfungsi dan kasus uji lama tetap lulus |
| **Selasa, 13 Oktober, 17.00–18.00** | Sesi Bug Hunt terukur 60 menit | Kode asli, test, perbaikan tiap bug, dan catatan penyebab dengan commit terpisah |
| **Selasa, 13 Oktober, 18.00–19.00** | Dokumentasi akhir, review, refleksi, penjelasan kode, verifikasi push | Dokumen, tes, dan bukti utama tersedia di `main` |
| **Rabu, 14 Oktober** | Tidak ada sesi pendampingan bersama | Hanya pemeriksaan mandiri bila memungkinkan; perubahan dicatat dan di-push |
| **Kamis, 15 Oktober, sore** | Cadangan pemeriksaan akhir bila pembimbing dan siswa tersedia | Pemeriksaan README dari clone bersih, status `main`, dan seluruh file sebelum batas pengumpulan |

Pekerjaan dokumentasi, pemahaman kode, serta pencatatan prompt dilakukan **sepanjang sesi**, bukan hanya pada jam dokumentasi akhir. Apabila alur inti belum lengkap pada Senin sore, Change Request ditunda sampai Checkpoint 2 benar-benar berhasil.

## 5. Rincian langkah kerja, estimasi, dan bukti

Estimasi per langkah dibuat cukup kecil agar kemajuan dapat diuji secara berkala. Tanda status awal **Direncanakan** berarti belum ada hasil implementasi yang dinyatakan selesai dalam rencana ini.

| ID | Tahap dan pekerjaan | Estimasi | Penanggung jawab utama | Bukti selesai / commit yang direncanakan |
|---|---|---:|---|---|
| R01 | Meninjau ulang empat wawancara dan mengesahkan `01-spesifikasi.md` SOLARIS | 30 menit | Dafa, seluruh tim | Masalah pengguna, fitur, batasan, dan kriteria selesai diperiksa |
| R02 | Menyusun hasil yang diharapkan untuk kasus uji awal, termasuk angka batas, hysteresis, dan input salah | 45 menit | Alif, seluruh tim | `04-kasus-uji.md` diperiksa siswa; hasil harapan ditentukan sebelum kode |
| R03 | Menuntaskan rencana, memperbarui README awal, dan mencatat revisi produk challenge | 30 menit | Zaskia, seluruh tim | `02-rencana.md`, README; `dokumen: sesuaikan spesifikasi dan rencana SOLARIS` |
| R04 | Menandai kelengkapan dokumen sebelum kode pertama | 15 menit | Seluruh tim | **`checkpoint: spesifikasi, kasus uji, dan rencana selesai`**; push |
| R05 | Membuat kerangka `src/`, berkas HTML/CSS/JS, dan cara menjalankan proyek lokal | 30 menit | Dafa dan Zaskia | Halaman dapat dibuka; `fitur: tambah struktur website SOLARIS` |
| R06 | Membuat Landing Page dengan logo dan tombol Coba Simulasi | 45 menit | Zaskia | Pengenalan SOLARIS tampil dan navigasi bekerja; `fitur: tambah landing page SOLARIS` |
| R07 | Membuat validasi input dan fungsi logika hysteresis serta selisih numerik | 45 menit | Dafa dan Alif | Fungsi bisa dicoba dengan nilai benar/salah; `fitur: tambah logika simulasi irigasi` |
| R08 | Membuat dashboard dua perangkat dengan state terpisah | 45 menit | Dafa dan Zaskia | Perpindahan perangkat tidak mencampur pengaturan; `fitur: tambah dashboard dua perangkat` |
| R09 | Menambahkan Mode Manual dan aturan kembali ke Otomatis | 30 menit | Dafa | Status ON/OFF sesuai mode, tanpa pompa fisik; `fitur: tambah kontrol pompa simulasi` |
| R10 | Menyimpan pengaturan dan hasil secara otomatis, termasuk penanganan gagal simpan | 45 menit | Dafa dan Alif | Satu pembacaan = satu riwayat, refresh tidak menggandakan; `fitur: simpan data simulasi lokal` |
| R11 | Membuat halaman Riwayat untuk pembacaan dan peristiwa kontrol | 45 menit | Zaskia dan Dafa | Baris riwayat dapat dibuka kembali; `fitur: tambah riwayat smart irrigation` |
| R12 | Membuat dan menjalankan unit test serta uji manual alur inti | 60 menit | Alif, seluruh tim | Catatan lulus/gagal nyata, bukti di `docs/bukti/`; `tes: uji logika dan penyimpanan simulasi` |
| R13 | Memperbaiki temuan, uji ulang, dan menandai versi alur inti berjalan | 45 menit | Seluruh tim | Lima syarat minimum terpenuhi; **`checkpoint: versi pertama alur inti berjalan`**; push |
| R14 | Menulis analisis dampak Change Request terhadap kode, spesifikasi, tes, dan README | 30 menit | Dafa, Alif, Zaskia | `analisis-change-request.md`; `dokumen: analisis perubahan pencarian filter dan CSV` |
| R15 | Menulis kasus uji baru dan menambahkan pencarian serta filter Riwayat | 45 menit | Alif dan Dafa | Uji pencarian huruf besar/kecil, filter bersamaan, dan keadaan kosong; commit `fitur:` |
| R16 | Membuat unduhan CSV data tersaring dan menjalankan regresi | 45 menit | Dafa dan Alif | Header/angka CSV benar; tes lama tetap lulus; commit `fitur:` dan `tes:` |
| R17 | Menyiapkan sesi Bug Hunt tanpa membuka isi paket, lalu memulai commit asli | 15 menit | Alif, seluruh tim | ZIP belum dipelajari; kesiapan alat diperiksa sebelum timer dimulai |
| R18 | Melaksanakan Bug Hunt sejak commit `bughunt: kode asli` | **60 menit** | Seluruh tim | Setiap bug: test, perbaikan dalam commit terpisah, penjelasan dalam `catatan-bug.md` |
| R19 | Meninjau kode, memutuskan saran yang diterima/ditolak, dan menulis refleksi | 45 menit | Seluruh tim | `05-kesalahan-ai.md`, `06-catatan-review.md`, `07-refleksi.md` berdasarkan kejadian nyata |
| R20 | Menulis Tugas 4 dan melengkapi README serta tangkapan layar | 60 menit | Seluruh tim | `08-penjelasan-kode.md`: dua bagian berbeda per anggota dan lima jawaban bersama; README dapat diikuti |
| R21 | Memeriksa hasil akhir dari clone bersih dan memastikan seluruh commit di-push | 30 menit | Seluruh tim | Website/tes dapat dijalankan, dokumen lengkap di `main`, tidak ada file rahasia |

**Perkiraan usaha:** 14 jam pengerjaan tugas utama di luar jeda dan waktu cadangan, termasuk sesi Bug Hunt 60 menit. Beberapa pekerjaan dokumentasi dan pemeriksaan dapat berjalan bersamaan sesuai pembagian peran. Estimasi ini bukan catatan waktu aktual.

## 6. Aturan workflow GitHub dan checkpoint

Repositori publik `steampreneur-solaris` sudah memiliki riwayat awal, termasuk dokumentasi konsep sebelumnya. Riwayat tersebut **dipertahankan**. Penyesuaian dari PERWIRA Digital ke simulator SOLARIS dicatat melalui commit baru secara terbuka; tidak dilakukan penghapusan riwayat, *force push*, atau penggabungan commit yang menghilangkan tahapan.

1. **Sebelum kode:** dokumen `01-spesifikasi.md`, `02-rencana.md`, dan `04-kasus-uji.md` harus berisi kebutuhan SOLARIS serta hasil yang diharapkan yang telah diperiksa siswa. Revisi dokumentasi dicatat terlebih dahulu; kemudian dibuat commit checkpoint dengan pesan persis **`checkpoint: spesifikasi, kasus uji, dan rencana selesai`** dan di-push. Checkpoint lama tetap ada dalam riwayat.
2. **Pembangunan:** commit kecil mengikuti perkembangan nyata, dengan awalan `fitur:`, `tes:`, `perbaikan:`, `dokumen:`, atau `refactor:` dan pesan deskriptif dalam bahasa Indonesia. Setiap tahapan selesai diikuti push; sebelum bekerja di laptop berbeda dilakukan sinkronisasi perubahan dari `main`.
3. **Checkpoint 2:** hanya setelah halaman, form, perhitungan, penyimpanan, dan riwayat bekerja serta telah diuji, buat commit dengan pesan persis **`checkpoint: versi pertama alur inti berjalan`**, lalu push. Tidak dilakukan hanya berdasarkan tampilan halaman.
4. **Change Request:** hanya dimulai setelah Checkpoint 2. Analisis tertulis harus di-commit dan di-push **sebelum kode pencarian/filter/CSV diubah**. Uji tambahan dan seluruh uji sebelumnya dijalankan kembali.
5. **Bug Hunt:** paket `bughunt-kasir.zip` asli belum dibuka/dipelajari sebelum sesi. Setelah siap, ekstrak tanpa modifikasi ke `bughunt-kasir/`, commit-push **`bughunt: kode asli`**, dan hitung 60 menit sejak commit tersebut. Setiap bug diperbaiki dalam commit `perbaikan:` tersendiri serta disertai test dan penjelasan penyebab.
6. **Pengumpulan akhir:** hanya tautan repositori yang dikumpulkan melalui kanal resmi. Seluruh hasil harus sudah berada di branch `main` dan di-push sebelum batas akhir.

## 7. Strategi pengujian

Pengujian mengikuti `docs/04-kasus-uji.md`. Hasil harapan **ditetapkan siswa sebelum implementasi**, lalu dibandingkan dengan keluaran aplikasi; hasil aktual, tanggal pelaksanaan, status, dan tangkapan layar dicatat setelah diuji.

| Kelompok uji | Cakupan wajib |
|---|---|
| Validasi | Kosong, huruf, desimal, negatif, lebih dari 100, threshold sama/terbalik, serta nilai batas 0 dan 100 |
| Kontrol Otomatis | Nilai di bawah batas bawah, tepat batas bawah, di zona tengah, tepat batas atas, dan setelah perubahan status sebelumnya |
| Kontrol Manual | Manual ON/OFF, berganti mode, kembali ke Otomatis di zona tengah atau tanpa pembacaan valid |
| Perhitungan | Selisih positif, nol, dan hasil yang tidak boleh negatif; keluaran setiap perangkat dihitung terpisah |
| Dua perangkat | Mengubah Kebun Depan tidak mengubah Kebun Belakang, termasuk pengaturan, mode, pompa, dan riwayat |
| Penyimpanan | Simpan berhasil, refresh/reopen di profil sama, satu tindakan satu entri, input salah tidak tercatat, kegagalan `localStorage` menampilkan kesalahan |
| Antarmuka | Landing Page ke simulator, tampilan HP/desktop, status dibaca melalui teks, dan keadaan riwayat kosong |
| Change Request | Pencarian instan tanpa membedakan kapital, pencarian+filter bersamaan, pesan “Data tidak ditemukan”, CSV sesuai baris tersaring, angka tanpa format, regresi |

Pengujian otomatis diutamakan untuk logika murni, validasi, dan pengolahan riwayat; pengujian manual dipakai untuk tampilan, interaksi pengguna, penyimpanan browser, dan alur lengkap. Bukti yang belum dijalankan tidak ditandai lulus. Kesalahan pada hasil AI dicatat sesuai kejadian, termasuk penyebab dan tindakan koreksinya.

## 8. Review, pemahaman kode, dan dokumentasi

Hasil review mencatat saran yang diterima maupun ditolak beserta alasan teknis. Setiap *refactor* diikuti pengujian ulang. Dokumentasi pengembangan terdiri dari:

- `docs/03-log-prompt.md`: prompt penting, konteks, hasil, pemeriksaan siswa, dan commit yang relevan; dicatat selama pekerjaan.
- `docs/04-kasus-uji.md`: hasil harapan yang dihitung siswa, hasil aktual, dan bukti.
- `docs/05-kesalahan-ai.md`: kekeliruan keluaran AI yang benar-benar ditemukan dan langkah penanganan; bila belum ditemukan, status dinyatakan apa adanya.
- `docs/06-catatan-review.md`: peninjauan kode, keputusan perbaikan, dan hasil tes ulang.
- `docs/07-refleksi.md`: pembelajaran, kendala, serta batas pemahaman secara jujur.
- `docs/08-penjelasan-kode.md`: **minimal dua bagian kode yang berbeda untuk setiap anggota**, contoh nilai masuk dan keluar, alasan implementasi, serta perilaku input salah/kosong; ditambah lima jawaban bersama sesuai soal resmi.
- `README.md`: deskripsi SOLARIS, alur inti, syarat versi alat, langkah clone–jalankan–uji, contoh data, struktur folder, fitur/batasan, tangkapan layar, dan sumber/lisensi.

Penjelasan akhir didasarkan pada nama fungsi dan file yang benar-benar dihasilkan. Untuk pembagian awal, Dafa mendalami keputusan otomatis dan selisih numerik; Alif mendalami validasi serta fungsi pengujian/pengolahan data; Zaskia mendalami tampilan dashboard dan riwayat. Pembagian disesuaikan setelah kode nyata tersedia agar bagian yang dijelaskan tidak sama antaranggota.

## 9. Risiko dan penanganan

| Risiko | Upaya penanganan |
|---|---|
| Waktu bersama hanya sampai Selasa | Dahulukan alur minimum, tes, dan checkpoint; kurangi animasi serta fitur di luar ruang lingkup; sisihkan Kamis sore sebagai cadangan, bukan waktu kerja utama |
| Checkpoint pertama sebelumnya memuat konsep PERWIRA | Perbaiki dokumen SOLARIS dalam commit baru; pertahankan seluruh riwayat dan buat checkpoint dokumen SOLARIS sebelum kode website |
| Hysteresis salah di zona tengah | Gunakan urutan pembacaan yang menguji status sebelumnya ON dan OFF; cek tepat pada dua ambang |
| Mode Manual mengganggu status Otomatis | Terapkan aturan reset OFF dan evaluasi pembacaan terakhir; uji transisi secara berurutan |
| Data dua perangkat tercampur atau hilang | Gunakan identitas perangkat tetap, kunci penyimpanan konsisten, uji perpindahan perangkat serta refresh |
| LocalStorage gagal tetapi aplikasi menyatakan sukses | Tangkap kegagalan baca/tulis dan tampilkan pesan jelas; jangan menambahkan bukti keberhasilan palsu |
| Change Request dikerjakan terlalu cepat | Larang perubahan pencarian/filter/CSV sebelum Checkpoint 2 dan commit analisis dampak |
| Bug Hunt melampaui batas 60 menit | Siapkan peralatan sebelum commit awal; kerjakan per bug dengan test dan commit terpisah selama sesi |
| Website hanya tampak bagus tetapi tidak dapat diuji juri | Pastikan petunjuk README bekerja pada clone bersih dan tersedia pengujian otomatis serta bukti manual |
| Pemahaman kode tidak merata | Setiap siswa menjelaskan logika yang ditangani, contoh input-output, dan kesalahan input menggunakan bahasa sendiri |
| Repositori publik memuat data sensitif | Jangan unggah API key, password, `.env`, rekaman, identitas narasumber, atau source code rahasia SOLARIS asli |

## 10. Kriteria akhir pekerjaan

Challenge dinyatakan **siap dikumpulkan** apabila alur inti SOLARIS benar-benar berjalan, memenuhi lima syarat website, dapat dijalankan dari instruksi README, semua hasil pengujian dicatat sesuai keadaan, dan seluruh dokumen wajib tersedia di repositori. Kriteria Tugas 2 Bug Hunt, Tugas 3 Change Request, dan Tugas 4 Penjelasan Kode tetap dipenuhi secara terpisah. Bukti semua tahapan ditunjukkan oleh riwayat commit dan file nyata pada branch `main`.

**Status rencana saat disusun:** penyesuaian proyek challenge menuju SOLARIS telah diputuskan; implementasi website, hasil tes, Change Request, dan Bug Hunt **belum dinyatakan selesai**. Waktu aktual, temuan, serta hasil akhir hanya dicatat setelah kegiatan masing-masing berlangsung.

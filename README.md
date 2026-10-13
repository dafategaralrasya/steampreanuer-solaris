# SOLARIS — One Ecosystem. Endless Possibilities.

**Tim:** SOLARIS  
**Asal sekolah:** SMKN 8 Tangerang  
**Kegiatan:** Challenge Vibe Engineering — Sayembara STEAMpreneur 2026  
**Repositori:** https://github.com/dafategaralrasya/steampreneur-solaris

## Deskripsi Produk

**SOLARIS** adalah konsep platform ekosistem *Internet of Things* (IoT) berbasis web dan *Progressive Web App* (PWA) yang dirancang untuk mengelola dan memantau berbagai perangkat melalui satu sistem terpusat. **Smart Irrigation** merupakan implementasi awal dalam proposal STEAMpreneur 2026 untuk memperagakan pemantauan kelembaban tanah dan pengendalian penyiraman.

Untuk Challenge Vibe Engineering, Tim SOLARIS mengembangkan **website pengenalan produk dan simulator Smart Irrigation berbasis browser**. Prototipe challenge ini terpisah dari platform SOLARIS asli: tidak menggunakan ESP32, tidak terhubung ke pompa fisik, tidak membutuhkan API key, dan tidak mengklaim pembacaan sensor nyata.

## Tujuan dan Manfaat

Website memperkenalkan konsep ekosistem SOLARIS kepada pengunjung dan membantu calon pengguna memahami bagaimana kelembaban tanah, ambang penyiraman, dan pilihan mode kontrol memengaruhi keputusan pompa. Alur sederhana ini disusun berdasarkan proposal produk serta wawancara terhadap empat narasumber pada 2–3 Oktober 2026.

## Alur Inti Website

1. Pengunjung membuka **Landing Page SOLARIS** untuk mengenal produk, kemudian memilih **Coba Simulasi**.
2. Pengunjung memilih salah satu dari dua perangkat virtual: **Kebun Depan** atau **Kebun Belakang**.
3. Pengunjung memasukkan kelembaban tanah dan mengatur ambang bawah serta ambang atas.
4. Simulator memvalidasi input, menentukan status pompa virtual sesuai mode dan aturan *hysteresis*, serta menghitung selisih kelembaban menuju ambang atas.
5. Hasil simulasi yang valid disimpan otomatis pada browser dan ditampilkan kembali melalui halaman riwayat, termasuk setelah halaman dimuat ulang.

## Aturan Utama Simulator

- Dua perangkat simulasi mempunyai pengaturan dan riwayat yang terpisah.
- Ambang awal setiap perangkat adalah **30% (bawah)** dan **70% (atas)**.
- Kelembaban valid berupa bilangan bulat 0–100%. Ambang bawah berada dalam 0–99%, ambang atas 1–100%, dan ambang bawah harus lebih kecil daripada ambang atas.
- Dalam **Mode Otomatis**, kelembaban di bawah ambang bawah menghasilkan pompa **ON**; kelembaban yang mencapai ambang atas menghasilkan **OFF**; nilai di antara keduanya mempertahankan status otomatis sebelumnya.
- Dalam **Mode Manual**, pengguna memilih ON atau OFF untuk pompa virtual. Ketika kembali ke Otomatis, keputusan diawali dari status aman OFF sebelum mengevaluasi pembacaan valid terakhir.
- Nilai numerik dihitung menggunakan rumus `max(0, ambang_atas - kelembaban)` dalam satuan **poin persentase**; nilai tersebut bukan perkiraan durasi penyiraman atau volume air.
- Input tidak valid ditolak dengan pesan kesalahan dan tidak mengubah data yang tersimpan.

## Teknologi dan Penyimpanan

Prototipe ini menggunakan **HTML, CSS, dan JavaScript (modul `.mjs`)** untuk antarmuka serta perhitungan, `localStorage` untuk penyimpanan di browser, dan **Node.js** untuk menjalankan server lokal dan tes otomatis. Tidak diperlukan layanan cloud, database, akun, integrasi perangkat keras, maupun paket dari `node_modules` untuk versi yang diperiksa.

Data `localStorage` hanya tersimpan pada browser, profil, dan asal situs yang sama. Data tidak tersinkron otomatis antarkomputer atau antar-HP serta dapat hilang apabila penyimpanan situs dihapus.

## Status Pengembangan

**Alur inti website sudah dapat dijalankan dan diuji.** Beranda, pemilihan dua perangkat, formulir, logika *hysteresis*, Mode Manual/Otomatis, penyimpanan browser, serta halaman Riwayat tersedia dalam salinan proyek yang diperiksa. Pada 13 Oktober 2026, `node --test` dijalankan pada kode di ZIP dengan Node.js v22.16.0 dan menghasilkan **38 tes lulus, 0 gagal**. Tim juga mengonfirmasi bahwa perbaikan validasi Dafa dan pengujian regresi Alif telah digabung ke `main` dan lulus. Jumlah tes pada salinan ZIP belum tentu sama dengan `main` terkini; lakukan `git pull` dan uji ulang saat integrasi dokumen.

Fitur pencarian, filter, dan ekspor CSV merupakan bagian **Change Request**, sehingga pengembangannya dilakukan **setelah Checkpoint 2** dan setelah analisis dampak perubahan di-commit.

## Cara Menjalankan

Repositori dapat disalin melalui perintah:

```bash
git clone https://github.com/dafategaralrasya/steampreneur-solaris.git
cd steampreneur-solaris
```

**Persyaratan:** Git (untuk clone), Node.js **v20 atau lebih baru** beserta perintah `node` yang sudah dikenali terminal, dan Chrome/Edge/Firefox modern. Pengujian yang tercantum di atas dilakukan pada Node.js **v22.16.0**. Tidak diperlukan `npm install` karena salinan proyek ini tidak menggunakan dependensi npm.

Dari terminal yang berada di folder `steampreneur-solaris` (tempat file `server.mjs` berada), jalankan:

```bash
node --version
node server.mjs
```

Jika terminal menampilkan `SOLARIS siap: http://localhost:3000`, buka alamat **http://localhost:3000** di browser pada komputer yang sama. Gunakan tombol **Coba Simulasi** untuk mengakses dashboard; halaman riwayat dapat dibuka dari menu navigasi. Hentikan server menggunakan **Ctrl+C** pada terminal yang menjalankan server.

**Contoh simulasi:** pilih Kebun Depan, Mode Otomatis, batas bawah `30`, batas atas `70`, lalu masukkan kelembaban `25`. Hasil awal yang diharapkan: pompa virtual **ON**, selisih ke threshold atas **45 poin**. Pada nilai `70`, pompa **OFF**.

**Jika mengalami masalah:**

- `node` tidak dikenali: periksa instalasi Node.js dan PATH, lalu buka ulang terminal VS Code.
- `server.mjs` tidak ditemukan: pastikan terminal berada di folder utama proyek, bukan di dalam `docs/` atau `src/`.
- Port 3000 sudah dipakai: tutup proses server lokal sebelumnya; server ini menggunakan port 3000 dan alamat `127.0.0.1`.
- Data lama masih muncul: proyek memakai `localStorage` pada browser/profil dan asal situs yang sama. Gunakan profil pengujian terpisah jika ingin keadaan awal bersih; jangan menghapus data browser pribadi tanpa memeriksa isinya.
- Hindari membuka `src/index.html` langsung lewat `file://`, karena aplikasi memakai modul JavaScript dan penyimpanan menurut asal situs. Gunakan alamat server di atas.

## Pengujian dan Bukti

Kriteria, hasil harapan, pelaksanaan, dan status pengujian manual didokumentasikan pada [`docs/04-kasus-uji.md`](docs/04-kasus-uji.md). Dokumen tersebut mempertahankan **58 kasus**: KT (10), VL (18), KM (9), DP (4), PS (9), dan UI (8). Bukti visual disimpan di [`docs/bukti/`](docs/bukti/) pada tiga folder pengujian.

Untuk menjalankan seluruh tes otomatis dari folder proyek, buka terminal baru dan jalankan:

```bash
node --test
```

**Hasil pemeriksaan kode dalam ZIP pada 13 Oktober 2026:** **38 lulus, 0 gagal** menggunakan Node.js **v22.16.0**. Berkas pengujian ada di `tes/` (misalnya `logic.test.mjs`, `storage.test.mjs`, `alif-storage-smoke.test.mjs`, `dafa-smoke.test.mjs`, dan `tampilan.test.mjs`). Hasil regresi validasi pada `main` dilaporkan lulus oleh tim, tetapi jumlah tes pada `main` terbaru perlu diperiksa kembali setelah sinkronisasi Git.

**Kualitas bukti:** screenshot PS-08 yang tersedia menunjukkan aktivasi simulasi kegagalan tulis di Console, belum memperlihatkan pesan aplikasi setelah tombol dijalankan. Unit test memeriksa penanganan `simpanKeadaan` saat media penyimpanan melempar error. UI-07 dan UI-08 dilaporkan lulus melalui pemeriksaan langsung tim tanpa screenshot khusus.

## Struktur Repositori

| Lokasi | Kegunaan |
|---|---|
| `README.md` | Pengenalan produk dan petunjuk menjalankan proyek |
| `.gitignore` | Mengecualikan berkas rahasia dan hasil instalasi/build |
| `docs/` | Spesifikasi, rencana, log prompt, kasus uji, review, refleksi, dan penjelasan kode |
| `docs/bukti/` | Tangkapan layar hasil pengujian |
| `src/` | Kode website SOLARIS Challenge Vibe Engineering |
| `tes/` | Unit test untuk fungsi dan aturan simulator |
| `server.mjs` | Server HTTP lokal untuk mengakses folder `src/` |
| `src/js/logic.mjs` | Validasi, perhitungan selisih, *hysteresis*, dan pengendalian virtual |
| `src/js/storage.mjs` | Membaca dan menyimpan data simulasi di `localStorage` |
| `src/js/app.mjs` | Menghubungkan form simulator dengan logika dan penyimpanan |
| `src/index.html`, `src/simulator.html`, `src/riwayat.html` | Beranda, simulator, dan halaman riwayat |
| `bughunt-kasir/` | Lokasi rencana pekerjaan Bug Hunt yang terpisah; folder belum ada pada salinan ZIP yang diperiksa |

Beberapa folder rencana tahap berikutnya (misalnya `bughunt-kasir/`) dapat belum ada. Daftar struktur di atas membedakan berkas yang tersedia dan lokasi yang direncanakan.

## Ruang Lingkup dan Batasan

Website challenge berfungsi untuk **demonstrasi konsep dan pembelajaran**, bukan sebagai perangkat penyiraman otomatis siap pakai. Sensor, koneksi IoT, autentikasi akun, kendali pompa fisik, keamanan kelistrikan, monitoring tegangan panel surya, serta sinkronisasi data antarperangkat berada di luar ruang lingkup simulator ini. Fitur platform SOLARIS asli yang lebih luas merupakan bagian dari arah pengembangan produk sebagaimana dijelaskan dalam proposal.

## Sumber dan Lisensi

| Sumber | Keterangan |
|---|---|
| Proposal STEAMpreneur 2026 — SOLARIS | Dokumen acuan konsep dan identitas produk milik tim |
| Wawancara empat narasumber (2–3 Oktober 2026) | Ringkasan hasil validasi digunakan tanpa menampilkan identitas atau rekaman narasumber |
| Logo SOLARIS | Identitas visual milik Tim SOLARIS untuk penggunaan pada proyek tim |
| HTML, CSS, JavaScript dan API browser `localStorage` | Teknologi bawaan browser yang digunakan dalam kode; tidak ada library antarmuka pihak ketiga yang ditemukan dalam ZIP |
| Node.js | *Runtime* server lokal dan pengujian (`node --test`), tanpa paket npm tambahan |
| Font | CSS menyediakan daftar font sistem dan `Inter` sebagai pilihan apabila telah tersedia di perangkat; tidak ditemukan berkas font khusus dalam ZIP |

Logo SOLARIS dinyatakan sebagai aset identitas tim. Belum ada berkas `LICENSE` proyek yang ditemukan pada salinan ini; hak penggunaan ulang kode secara publik tidak dinyatakan sebagai lisensi open-source tertentu. Jika kemudian ditambahkan aset atau dependensi pihak ketiga, sumber dan ketentuan lisensinya harus dicatat.

## Tim Pengembang

| Nama | Kelas | Tanggung jawab utama |
|---|---|---|
| Dafa Teger Alrasya | XI MK 1 | Logika aplikasi dan implementasi fungsi |
| Alif Mulyana | XI MK 1 | Penyusunan dan pelaksanaan pengujian |
| Zaskia Aulia Putri Sheprida | XI ELIN 2 | Antarmuka, dokumentasi, dan pemeriksaan tampilan |

Pembagian tugas tidak membatasi kewajiban setiap anggota untuk memahami serta menjelaskan bagian kode yang berbeda.

## Catatan Kolaborasi dan Penggunaan AI

ChatGPT digunakan oleh siswa dan guru pembimbing untuk memahami instruksi, menghasilkan rancangan, meninjau pesan kesalahan, dan membantu perbaikan. Dafa, Alif, dan Zaskia menjalankan perubahan, menguji hasil, serta mendokumentasikan temuan sesuai pembagian tanggung jawab. Hasil AI tetap diperiksa; kekurangan pesan validasi pernah ditemukan dan diperbaiki melalui pengujian regresi. Detail proses dicatat pada `docs/03-log-prompt.md` dan akan dilengkapi pada dokumen review/kesalahan AI sesuai format panitia.

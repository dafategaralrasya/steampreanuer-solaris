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
6. Pada halaman Riwayat, pengunjung dapat mencari catatan, menggabungkan filter perangkat dan status pompa, serta mengunduh CSV berisi hasil yang sedang ditampilkan.

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

**Alur inti dan Change Request telah diimplementasikan.** Website menyediakan beranda, simulator dua perangkat, validasi angka, perhitungan *hysteresis*, Mode Manual/Otomatis, penyimpanan `localStorage`, halaman Riwayat, pencarian langsung, dua filter gabungan, pesan tanpa hasil, dan unduhan CSV dari hasil yang tampil.

Pengembangan Change Request dilakukan setelah Checkpoint 2 (`c686555`). Analisis dampak lebih dahulu di-commit sebagai `e104f41` dan digabung melalui Pull Request #9. Perubahan antarmuka Zaskia, logika Dafa, dan pengujian Alif selanjutnya digabung melalui Pull Request masing-masing. Pada **13 Oktober 2026**, tim mengonfirmasi pengujian lokal **61 tes lulus, 0 gagal** setelah penambahan 10 tes Change Request. Angka tersebut adalah hasil pengujian lokal yang dilaporkan tim, bukan klaim pemeriksaan independen sesudah semua merge.

Untuk jejak pemeriksaan versi awal, arsip proyek lama yang ditinjau sebelumnya menghasilkan **38 tes lulus, 0 gagal** dengan Node.js v22.16.0; jumlah itu adalah kondisi arsip pada tahap sebelumnya, bukan jumlah tes Change Request.

## Cara Menjalankan

Repositori dapat disalin melalui perintah:

```bash
git clone https://github.com/dafategaralrasya/steampreneur-solaris.git
cd steampreneur-solaris
```

**Persyaratan:** Git (untuk clone), Node.js **v20 atau lebih baru** beserta perintah `node` yang sudah dikenali terminal, dan Chrome/Edge/Firefox modern. Node.js **v22.16.0** digunakan pada pemeriksaan arsip sebelumnya; nomor versi Node.js untuk pengujian 61 tes terakhir tidak dicatat dalam hasil yang dikirim tim. Tidak diperlukan `npm install` karena proyek tidak menggunakan dependensi npm.

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

## Pencarian, Filter, dan Unduh CSV pada Riwayat

Fasilitas ini ditambahkan pada tahap **Change Request**, setelah versi pertama dinyatakan berjalan dan analisis perubahan dicatat pada [`docs/analisis-change-request.md`](docs/analisis-change-request.md).

1. Buka **Riwayat** dari navigasi simulator. Data berasal dari hasil simulasi yang tersimpan pada browser tersebut.
2. Ketik kata pada **Cari Riwayat**. Hasil berubah langsung saat mengetik, tanpa membedakan huruf besar dan kecil. Pencarian menggunakan nama perangkat, jenis peristiwa, mode, status pompa, dan keterangan.
3. Pilih **Filter Perangkat**: Semua Perangkat, Kebun Depan, atau Kebun Belakang.
4. Pilih **Filter Status Pompa**: Semua Status, ON, atau OFF. Pencarian dan kedua filter dapat digunakan bersamaan; baris yang tampil harus memenuhi seluruh pilihan yang aktif.
5. Bila riwayat tersedia tetapi tidak ada kecocokan, halaman menampilkan **“Data tidak ditemukan”**. Bila tidak pernah ada catatan, halaman menggunakan pesan **belum ada riwayat**.
6. Klik **Unduh CSV** untuk menyimpan `riwayat-solaris.csv`. Berkas hanya memuat baris yang sedang tampil setelah penyaringan, dengan judul kolom dan urutan hasil yang sama. Bila tidak ada hasil cocok, CSV berisi judul kolom saja.

Kolom CSV adalah `Waktu`, `Perangkat`, `Jenis`, `Kelembaban`, `Batas Bawah`, `Batas Atas`, `Mode`, `Pompa`, `Selisih`, dan `Ringkasan`. Angka kelembaban, ambang, dan selisih ditulis tanpa simbol `%`; nilai numerik yang tidak tersedia dibiarkan kosong. Berkas memakai UTF-8 dengan BOM untuk membantu pembacaan di Excel serta penanganan tanda kutip dan koma dalam data teks. Pencarian, penyaringan, dan pengunduhan **tidak mengubah riwayat di `localStorage`**.

## Pengujian dan Bukti

Kriteria, hasil harapan, pelaksanaan, dan status pengujian manual didokumentasikan pada [`docs/04-kasus-uji.md`](docs/04-kasus-uji.md). Dokumen tersebut mempertahankan **58 kasus awal**: KT (10), VL (18), KM (9), DP (4), PS (9), dan UI (8), serta menambahkan **16 skenario Change Request** (CR-01 sampai CR-16) sesuai analisis yang di-commit sebelum coding. Sepuluh tes otomatis Change Request pada `tes/change-request.test.mjs` memakai data uji tersendiri; status setiap skenario manual dan cakupan otomatis dibedakan pada dokumen kasus uji. Bukti visual versi pertama berada di [`docs/bukti/`](docs/bukti/) pada tiga folder pengujian.

Untuk menjalankan seluruh tes otomatis dari folder proyek, buka terminal baru dan jalankan:

```bash
node --test
```

**Hasil pengujian lokal terbaru yang dikonfirmasi tim pada 13 Oktober 2026:** **61 tes lulus, 0 gagal** (51 tes sebelumnya dan 10 tes Change Request Alif). Pengujian baru ada pada `tes/change-request.test.mjs`; pengujian struktur tampilan lama di `tes/tampilan.test.mjs` telah disesuaikan agar memeriksa keberadaan fitur baru. Angka **38 lulus, 0 gagal** merujuk ke pemeriksaan arsip yang lebih lama menggunakan Node.js v22.16.0. Pengujian terbaru setelah seluruh penggabungan tetap dapat diulang melalui `node --test`.

**Kualitas bukti:** pada arsip lama yang diperiksa, screenshot PS-08 hanya menunjukkan aktivasi simulasi kegagalan tulis di Console. Pembimbing menyatakan pengujian lanjutan berhasil dan screenshot pengganti telah dibuat, tetapi file pengganti tidak termasuk dalam tiga dokumen yang diperbarui ini. Unit test memeriksa kegagalan tulis. UI-07 dan UI-08 dilaporkan lulus melalui pemeriksaan langsung tim tanpa screenshot khusus. Pengujian CSV dan pencarian terbaru didukung 10 tes otomatis dan laporan percobaan browser tim; tidak dinyatakan memiliki screenshot baru apabila belum disertakan.

## Struktur Repositori

| Lokasi | Kegunaan |
|---|---|
| `README.md` | Pengenalan produk dan petunjuk menjalankan proyek |
| `.gitignore` | Mengecualikan berkas rahasia dan hasil instalasi/build |
| `docs/` | Spesifikasi, rencana, log prompt, kasus uji, analisis Change Request, review, refleksi, dan penjelasan kode |
| `docs/bukti/` | Tangkapan layar hasil pengujian |
| `src/` | Kode website SOLARIS Challenge Vibe Engineering |
| `tes/` | Unit test fungsi simulator, struktur tampilan, dan 10 pengujian Change Request |
| `server.mjs` | Server HTTP lokal untuk mengakses folder `src/` |
| `src/js/logic.mjs` | Validasi, perhitungan selisih, *hysteresis*, dan pengendalian virtual |
| `src/js/storage.mjs` | Membaca dan menyimpan data simulasi di `localStorage` |
| `src/js/app.mjs` | Menghubungkan form simulator dengan logika dan penyimpanan |
| `src/js/riwayat.mjs` | Menampilkan riwayat, menyaring pencarian/filter, dan menghasilkan CSV |
| `tes/change-request.test.mjs` | Menguji perilaku pencarian, filter, kondisi kosong, dan isi CSV |
| `docs/analisis-change-request.md` | Analisis dampak yang di-commit sebelum implementasi Change Request |
| `src/index.html`, `src/simulator.html`, `src/riwayat.html` | Beranda, simulator, dan halaman riwayat |
| `bughunt-kasir/` | Lokasi tugas Bug Hunt yang terpisah dari fitur SOLARIS; status pengerjaan dicatat pada commit Bug Hunt |

Keberadaan folder Bug Hunt bergantung pada tahap pelaksanaan tugas terpisah dan tidak termasuk hasil pengujian 61 tes aplikasi SOLARIS.

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

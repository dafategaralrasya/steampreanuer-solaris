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

Prototipe direncanakan menggunakan HTML, CSS, dan JavaScript untuk antarmuka serta perhitungan, `localStorage` untuk penyimpanan di browser, dan Node.js untuk pengujian otomatis. Tidak diperlukan layanan cloud, server SOLARIS asli, atau integrasi perangkat keras.

Data `localStorage` hanya tersimpan pada browser, profil, dan asal situs yang sama. Data tidak tersinkron otomatis antarkomputer atau antar-HP serta dapat hilang apabila penyimpanan situs dihapus.

## Status Pengembangan

**Tahap spesifikasi dan persiapan implementasi.** Alur dan aturan produk telah ditetapkan dalam `docs/01-spesifikasi.md`. Website simulator serta unit test belum dinyatakan selesai atau berhasil dijalankan. Kemajuan, hasil pengujian, dan perubahan fitur akan dicatat berdasarkan pelaksanaan nyata melalui dokumen dan riwayat commit.

Fitur pencarian, filter, dan ekspor CSV merupakan bagian **Change Request**, sehingga pengembangannya dilakukan **setelah Checkpoint 2** dan setelah analisis dampak perubahan di-commit.

## Cara Menjalankan

Repositori dapat disalin melalui perintah:

```bash
git clone https://github.com/dafategaralrasya/steampreneur-solaris.git
cd steampreneur-solaris
```

Pada tahap ini kode website belum tersedia untuk dijalankan. Langkah menjalankan aplikasi, persyaratan versi perangkat lunak, alamat halaman, dan panduan penyelesaian masalah akan ditambahkan setelah implementasinya berhasil diuji, agar perintah yang diberikan sesuai dengan kode sebenarnya.

## Pengujian dan Bukti

Kriteria pengujian disusun dalam `docs/04-kasus-uji.md` sebelum implementasi. Tim akan memeriksa nilai batas, input tidak valid, *hysteresis*, mode Manual/Otomatis, hasil perhitungan, penyimpanan setelah *refresh*, serta pemisahan data kedua perangkat.

Perintah unit test, hasil aktual, dan tangkapan layar alur inti akan didokumentasikan setelah pengujian dilaksanakan. Bukti visual disimpan dalam `docs/bukti/`.

## Struktur Repositori

| Lokasi | Kegunaan |
|---|---|
| `README.md` | Pengenalan produk dan petunjuk menjalankan proyek |
| `.gitignore` | Mengecualikan berkas rahasia dan hasil instalasi/build |
| `docs/` | Spesifikasi, rencana, log prompt, kasus uji, review, refleksi, dan penjelasan kode |
| `docs/bukti/` | Tangkapan layar hasil pengujian |
| `src/` | Kode website SOLARIS Challenge Vibe Engineering |
| `tes/` | Unit test untuk fungsi dan aturan simulator |
| `bughunt-kasir/` | Pengerjaan Bug Hunt terpisah berdasarkan berkas resmi panitia |

Folder pengembangan ditambahkan sesuai tahapan pengerjaan; keberadaannya tidak berarti fiturnya telah selesai.

## Ruang Lingkup dan Batasan

Website challenge berfungsi untuk **demonstrasi konsep dan pembelajaran**, bukan sebagai perangkat penyiraman otomatis siap pakai. Sensor, koneksi IoT, autentikasi akun, kendali pompa fisik, keamanan kelistrikan, monitoring tegangan panel surya, serta sinkronisasi data antarperangkat berada di luar ruang lingkup simulator ini. Fitur platform SOLARIS asli yang lebih luas merupakan bagian dari arah pengembangan produk sebagaimana dijelaskan dalam proposal.

## Sumber dan Lisensi

| Sumber | Keterangan |
|---|---|
| Proposal STEAMpreneur 2026 — SOLARIS | Dokumen acuan konsep dan identitas produk milik tim |
| Wawancara empat narasumber (2–3 Oktober 2026) | Ringkasan hasil validasi digunakan tanpa menampilkan identitas atau rekaman narasumber |
| Logo SOLARIS | Identitas visual milik Tim SOLARIS untuk penggunaan pada proyek tim |
| HTML, CSS, JavaScript | Teknologi web standar, tanpa library antarmuka pihak ketiga pada tahap perencanaan |

Penggunaan pustaka, ikon, font, atau aset pihak ketiga yang ditambahkan kemudian akan disertai sumber dan ketentuan lisensinya.

## Tim Pengembang

| Nama | Kelas | Tanggung jawab utama |
|---|---|---|
| Dafa Teger Alrasya | XI MK 1 | Logika aplikasi dan implementasi fungsi |
| Alif Mulyana | XI MK 1 | Penyusunan dan pelaksanaan pengujian |
| Zaskia Aulia Putri Sheprida | XI ELIN 2 | Antarmuka, dokumentasi, dan pemeriksaan tampilan |

Pembagian tugas tidak membatasi kewajiban setiap anggota untuk memahami serta menjelaskan bagian kode yang berbeda.

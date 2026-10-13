# Analisis Change Request

**Tim:** SOLARIS — *One Ecosystem. Endless Possibilities.*  
**Sekolah:** SMKN 8 Tangerang  
**Produk:** Website pengenalan SOLARIS dan simulator Smart Irrigation berbasis browser  
**Tanggal analisis:** 13 Oktober 2026  
**Dasar pengembangan:** Checkpoint 2, commit `c686555` (`checkpoint: versi pertama alur inti berjalan`).  
**Ruang lingkup:** Halaman Riwayat simulasi, tanpa mengubah aturan perhitungan dan pengendalian pompa.

**Change request:** Pencarian, filter, dan ekspor CSV pada halaman Riwayat SOLARIS. Data riwayat yang semakin banyak perlu dapat ditemukan, disaring, dan diunduh untuk dibuka di Excel.

**Kriteria penerimaan yang akan dipenuhi dan cara kami memenuhinya:**

1. **Pencarian langsung tanpa membedakan huruf besar dan kecil.** Kotak pencarian pada halaman Riwayat memperbarui baris yang tampil setiap kali teks berubah. Pencarian mencakup informasi teks yang tercantum pada baris riwayat, termasuk nama perangkat, jenis peristiwa, mode, status pompa, dan keterangan. Pencarian tidak mengubah data tersimpan.
2. **Filter yang dapat digabung.** Tersedia filter perangkat (`Semua Perangkat`, `Kebun Depan`, `Kebun Belakang`) dan filter status pompa (`Semua Status`, `ON`, `OFF`). Hasil yang tampil harus memenuhi teks pencarian serta kedua filter secara bersamaan. Nilai `Semua` berarti tidak membatasi data pada kategori tersebut.
3. **Keadaan tanpa hasil.** Apabila riwayat tersimpan ada tetapi tidak satu pun baris memenuhi pencarian dan filter, tampil teks **“Data tidak ditemukan”**. Apabila belum ada riwayat sama sekali, pesan awal mengenai riwayat yang masih kosong tetap digunakan agar kedua kondisi tidak tertukar.
4. **Unduhan CSV berdasarkan tampilan aktif.** Tombol **Unduh CSV** mengekspor hanya baris hasil pencarian dan filter yang sedang ditampilkan, dengan urutan yang sama seperti pada tabel. Baris pertama adalah judul kolom. Data yang tidak cocok dengan filter tidak ikut diunduh.
5. **Format CSV dapat diolah di Excel.** Kolom numerik seperti kelembaban, threshold bawah, threshold atas, dan selisih berisi angka mentah tanpa simbol `%`, mata uang, atau pemisah ribuan. Nilai yang memang tidak tersedia pada peristiwa tertentu dibiarkan kosong, bukan diganti angka yang tidak tercatat. Teks CSV diapit atau di-*escape* sesuai kebutuhan agar koma, tanda kutip, dan pergantian baris tidak merusak susunan kolom.
6. **Regresi tetap lulus.** Penyimpanan `localStorage`, pemisahan dua kebun, urutan riwayat, validasi, perhitungan selisih, mode Manual/Otomatis, dan penanganan kesalahan tidak berubah akibat fitur baru. Seluruh pengujian lama dan kasus uji Change Request harus lulus.

## 1. Dampak

| Bagian yang terdampak | File / fungsi | Perubahan yang diperlukan |
|---|---|---|
| Spesifikasi | `docs/01-spesifikasi.md`, terutama F08 (Halaman Riwayat dan Rekap), aturan B16, serta kriteria selesai | Memperbarui keterangan dari fitur yang direncanakan menjadi fitur yang diterapkan setelah pengujian; menegaskan perilaku pencarian, dua filter gabungan, keadaan tanpa hasil, dan CSV. Aturan Smart Irrigation yang sudah ada tetap dipertahankan. |
| Kode — tampilan riwayat | `src/riwayat.html` | Menambahkan kotak pencarian, filter perangkat, filter status pompa, tombol Unduh CSV, dan pesan “Data tidak ditemukan”. Mempertahankan navigasi, tabel riwayat, pesan riwayat benar-benar kosong, serta pesan kesalahan penyimpanan. Keterangan lama bahwa pencarian/filter/CSV belum tersedia diganti ketika fitur selesai. |
| Kode — pengolahan riwayat | `src/js/riwayat.mjs` | Mengembangkan proses yang saat ini menggunakan `ambilKeadaan()` dan `semuaRiwayat()`: menyimpan daftar riwayat yang telah dibaca, memperoleh data hasil pencarian/filter, menggambar ulang tabel serta jumlah hasil, menampilkan keadaan kosong yang sesuai, dan membuat unduhan CSV dari **data hasil filter**, bukan dari seluruh riwayat. |
| Kode — pemisahan logika agar dapat diuji | Modul pengolah riwayat terpisah, bila diperlukan, pada `src/js/` | Memisahkan fungsi pencarian/filter dan pembentukan CSV dari interaksi DOM agar bisa diuji otomatis menggunakan data contoh. Penambahan modul dilakukan hanya bila membantu menjaga fungsi yang ada. |
| Kode — gaya tampilan | `src/css/simulator.css` dan, apabila diperlukan, `src/css/style.css` | Menata kontrol pencarian, filter, tombol ekspor, dan pesan kosong supaya mudah digunakan pada layar HP maupun desktop tanpa merusak tabel dan navigasi sebelumnya. |
| Kode — sumber data tetap | `src/js/storage.mjs` — `ambilKeadaan()`, `semuaRiwayat()`; `src/js/logic.mjs` — pembentukan riwayat | Fungsi yang telah berjalan menjadi sumber data acuan; tidak direncanakan perubahan pada aturan penyimpanan, bentuk entri, logika pompa, atau hasil simulasi. Identitas perangkat, waktu, jenis peristiwa, angka, dan keterangan dari riwayat asli tetap digunakan. |
| Kasus uji / test baru | `docs/04-kasus-uji.md`; pengujian baru pada folder `tes/` | Menambahkan kasus CR-01 sampai CR-16 di bawah. Menguji kombinasi pencarian/filter, data kosong, hasil CSV, format angka, dan dampak terhadap data lama. Hasil aktual dan bukti diisi setelah pengujian benar-benar dilaksanakan. |
| Kasus uji / test lama | `tes/tampilan.test.mjs` — tes `Z3: halaman riwayat belum berisi input pencarian atau tombol ekspor CSV` | **Mengubah tes pra-Change Request** yang sebelumnya mensyaratkan fitur belum ada, menjadi tes yang memastikan kontrol pencarian dan CSV tersedia. Tes struktur tampilan lainnya tetap dipertahankan. |
| Pengujian regresi | `tes/` — seluruh pengujian yang telah ada | Menjalankan kembali `node --test` sesudah perubahan. Pada Checkpoint 2, hasil yang dikonfirmasi adalah 51 tes lulus dan 0 gagal; jumlah setelah penambahan tes baru tidak ditentukan sebelum dijalankan. |
| README | `README.md`, terutama fitur, alur Riwayat, pengujian, dan tangkapan layar | Memperbarui petunjuk pencarian, kombinasi filter, ekspor CSV, penjelasan kolom angka, batasan `localStorage`, cara menguji, serta bukti layar setelah fitur selesai. |
| Bukti pengujian | `docs/bukti/` | Menyimpan screenshot hasil pencarian, filter gabungan, pesan “Data tidak ditemukan”, dan contoh unduhan CSV setelah pengujian aktual; bukti lama tidak dihapus. |

**Batas perubahan:** Halaman yang diperkaya adalah **Riwayat**, bukan formulir Simulator. Penyaringan dan ekspor tidak boleh menambah, menghapus, atau mengubah entri `localStorage`. Pencarian/filter hanya memengaruhi tampilan dan data yang diunduh. Data berasal dari simulasi dua kebun pada browser yang sama, bukan dari sensor atau server SOLARIS produksi.

### Rancangan alur data

1. Halaman Riwayat membaca data melalui `ambilKeadaan()` dan `semuaRiwayat()` sebagaimana pada versi Checkpoint 2.
2. Daftar hasil disaring menurut teks pencarian (tidak peka huruf besar/kecil), pilihan perangkat, dan status pompa. Syarat-syarat tersebut diterapkan sekaligus.
3. Tabel, jumlah hasil yang tampil, dan pesan keadaan kosong diperbarui berdasarkan daftar hasil penyaringan.
4. Ketika **Unduh CSV** dipilih, aplikasi menggunakan daftar hasil penyaringan yang sama untuk membentuk berkas CSV; urutan dan jumlah baris harus cocok dengan tabel.
5. Riwayat asli di browser tidak ditimpa selama pencarian, filter, atau pengunduhan.

**Susunan kolom CSV yang direncanakan:** `Waktu`, `Perangkat`, `Jenis`, `Kelembaban`, `Threshold Bawah`, `Threshold Atas`, `Mode`, `Pompa`, `Selisih`, `Keterangan`. Pemisahan threshold bawah dan atas ke dua kolom diperlukan agar masing-masing tetap berupa angka yang mudah diolah di Excel.

## 2. Kasus uji baru

**Data acuan pengujian:** Untuk skenario yang membutuhkan data terkontrol, gunakan keadaan awal baru dan buat tepat tiga entri pembacaan: Kebun Depan 25% dengan ambang 30%/70% menghasilkan pompa **ON** dan selisih **45**; Kebun Belakang 75% dengan ambang 30%/70% menghasilkan pompa **OFF** dan selisih **0**; lalu Kebun Depan 80% dengan ambang 30%/70% menghasilkan pompa **OFF** dan selisih **0**. Ketiganya merupakan **data input dan hasil yang diharapkan untuk pengujian**, bukan pernyataan bahwa pengujian Change Request sudah dilaksanakan. Apabila sebuah kasus memakai keadaan kosong atau kasus data teks khusus, prasyaratnya disiapkan secara terpisah.

| ID | Langkah / input | Hasil yang diharapkan |
|---|---|---|
| CR-01 | Buka Riwayat dengan tiga entri data acuan; biarkan pencarian dan kedua filter pada pilihan Semua. | Ketiga entri ditampilkan dengan urutan riwayat yang berlaku; jumlah hasil menunjukkan 3. |
| CR-02 | Ketik `kebun depan` pada pencarian. | Hasil langsung berkurang menjadi 2 entri milik Kebun Depan tanpa memuat ulang halaman. |
| CR-03 | Ubah pencarian menjadi `KeBuN DePaN`. | Hasil tetap 2 entri; huruf besar dan kecil tidak memengaruhi pencocokan. |
| CR-04 | Hapus teks pencarian setelah CR-02. | Semua 3 entri muncul kembali tanpa kehilangan data. |
| CR-05 | Pilih filter perangkat `Kebun Belakang`, filter pompa Semua, pencarian kosong. | Hanya 1 entri Kebun Belakang tampil. |
| CR-06 | Pilih filter pompa `ON`, perangkat Semua, pencarian kosong. | Hanya 1 entri pompa ON tampil, yaitu Kebun Depan dengan kelembaban 25%. |
| CR-07 | Pilih filter pompa `OFF`, perangkat Semua, pencarian kosong. | Tampil 2 entri pompa OFF, yaitu Kebun Belakang 75% dan Kebun Depan 80%. |
| CR-08 | Isi pencarian `kebun depan`, filter perangkat `Kebun Depan`, dan filter pompa `OFF` secara bersamaan. | Hanya 1 entri Kebun Depan 80% berstatus OFF tampil; ketiga syarat bekerja bersamaan. |
| CR-09 | Isi pencarian `kebun belakang` dan filter pompa `ON`. | Tidak ada baris yang cocok dan tampil pesan tepat **“Data tidak ditemukan”**. |
| CR-10 | Gunakan keadaan awal tanpa riwayat, kemudian buka halaman Riwayat. | Pesan **belum ada riwayat** tetap tampil; keadaan tersebut dibedakan dari riwayat berisi data tetapi tidak cocok dengan filter. |
| CR-11 | Gunakan kondisi CR-08, lalu klik **Unduh CSV**. | Berkas CSV berhasil diunduh; baris pertama berisi nama kolom, dan hanya ada **1 baris data** sesuai tabel yang tampil. |
| CR-12 | Pada data acuan, tampilkan semua entri lalu unduh CSV. | CSV berisi baris judul kolom dan tepat **3 baris data**; urutan hasil mengikuti tabel, bukan urutan yang berbeda. |
| CR-13 | Periksa kolom `Kelembaban`, `Threshold Bawah`, `Threshold Atas`, dan `Selisih` pada CSV hasil CR-11. | Nilai untuk Kebun Depan 80% adalah angka `80`, `30`, `70`, dan `0`, tanpa tanda `%`, simbol mata uang, atau pemisah ribuan. |
| CR-14 | Ekspor entri kontrol yang tidak mempunyai pembacaan kelembaban serta data keterangan yang memuat koma atau tanda kutip. | Kolom numerik yang tidak tersedia dikosongkan; teks di-*escape* dengan benar sehingga berkas tetap terbaca sebagai satu baris data dengan jumlah kolom konsisten. |
| CR-15 | Gunakan pencarian dan filter, lalu muat ulang halaman; bandingkan riwayat asli sebelum dan sesudah penyaringan serta unduhan. | Jumlah dan isi entri tersimpan tidak berubah akibat pencarian, filter, atau ekspor. Riwayat tetap terbaca setelah halaman dimuat ulang. |
| CR-16 | Jalankan tes otomatis lama dan baru, serta periksa halaman pada ukuran HP dan desktop. | Seluruh tes yang relevan lulus; kontrol dapat digunakan tanpa menghalangi navigasi atau tabel. Tes Z3 yang sebelumnya memeriksa ketiadaan fitur sudah diperbarui sesuai perilaku baru. |

**Pemeriksaan ekspor saat hasil kosong:** Ketika tidak ada data yang cocok, CSV tidak boleh memuat baris data yang tidak sedang ditampilkan. Jika unduhan tetap tersedia dalam keadaan ini, isi berkas hanya baris judul kolom.

## 3. Setelah selesai

- [ ] Kasus uji lama tetap lulus
- [ ] Kasus uji baru lulus
- [ ] Spesifikasi diperbarui
- [ ] README diperbarui

**Pencatatan hasil:** Bagian ini diperiksa kembali setelah implementasi dan pengujian. Status belum ditandai selesai karena dokumen ini dibuat **sebelum perubahan kode**. Bukti hasil uji, pembaruan README, dan dokumentasi perubahan disimpan pada commit tahap berikutnya.

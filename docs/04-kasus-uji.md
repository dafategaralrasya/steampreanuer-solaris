# 04 — Kasus Uji PERWIRA Digital

**Tim:** SOLARIS — *One Ecosystem, Endless Possibilities*  
**Produk:** PERWIRA Digital — Sistem Kasir dan Pencatatan Usaha Siswa  
**Sekolah:** SMKN 8 Tangerang  
**Tanggal penyusunan hasil harapan:** 10 Oktober 2026  
**Rujukan:** `docs/01-spesifikasi.md`, `docs/02-rencana.md`, dan aturan Challenge Vibe Engineering.  
**Status dokumen:** Kasus uji disusun sebelum pembuatan website sebagai acuan pengembangan. **Pengujian pada aplikasi belum dilakukan.**

## 1. Tujuan, tanggung jawab, dan batasan

Kami menyiapkan kasus uji ini **sebelum membuat kode website**. Dengan begitu, kami memiliki patokan untuk memeriksa apakah kasir, stok, dan laporan keuangan bekerja sesuai kebutuhan.

- **Tim yang menyusun dan akan menjalankan pengujian:** Dafa Teger Alrasya, Alif Mulyana, dan Zaskia Aulia Putri Sheprida, didampingi guru pembimbing Andi Suhandi, S.Kom., MT.
- **Pembagian tugas:** Alif mengerjakan perhitungan dan menyiapkan pengujian. Dafa dan Zaskia membantu memeriksa jawaban dan akan ikut menguji aplikasi.
- **Hasil yang diharapkan:** angka pada KT-01 sampai KT-10 berasal dari jawaban dan revisi siswa saat pembahasan, termasuk koreksi KT-03 dan KT-10. Angka tersebut **belum merupakan hasil uji aplikasi**.
- **Bantuan AI:** kami menggunakan AI untuk membantu menyusun skenario, merapikan penulisan, dan meninjau konsistensi. Perhitungan hasil yang diharapkan dikerjakan oleh siswa. Penggunaan AI dalam pengerjaan proyek akan dicatat pada `docs/03-log-prompt.md`.
- **Data contoh:** nama barang, harga, modal, kelompok, dan transaksi dalam dokumen ini merupakan **data simulasi**, bukan transaksi asli atau data pribadi pelanggan.
- **Data awal:** setiap KT diuji secara **terpisah** menggunakan data awal yang ditentukan pada kasus tersebut. Jika data dari kasus lain dipakai sebagai contoh, data itu disiapkan kembali dari awal agar hasil tidak tercampur.
- **Batasan prototipe:** `localStorage` hanya menyimpan data pada browser dan profil yang sama. PIN yang dipakai merupakan PIN demo, bukan sistem keamanan untuk data nyata.

**Pencatatan setelah aplikasi jadi:** pada setiap KT dan UF kami akan mengisi tanggal pengujian, nama penguji, browser/perangkat, hasil sebenarnya, status **Lulus/Gagal**, dan screenshot di `docs/bukti/`. Untuk sekarang semuanya berstatus **Belum diuji**. Jika hasil tidak sesuai, kami mencatat masalahnya, memperbaiki program, lalu mengulangi pengujian tanpa mengubah hasil harapan hanya supaya tampak lulus.

## 2. Kasus Uji 01–10 — hasil harapan dari siswa

### KT-01 — Transaksi tunai, HPP, stok, dan kembalian

**Acuan spesifikasi:** F04–F07, F10; B06–B09, B13–B16.  
**Prakondisi:** pilih satu kelompok uji dengan riwayat transaksi dan biaya kosong.

| Produk | Harga jual/unit | HPP/unit | Stok awal | Jumlah dibeli |
|---|---:|---:|---:|---:|
| Roti Bakar | Rp8.000 | Rp5.000 | 10 | 3 |
| Es Teh | Rp3.000 | Rp1.500 | 15 | 2 |

**Langkah:** pilih dua produk → masukkan jumlah → pilih tunai → masukkan uang diterima **Rp50.000** → konfirmasi pembayaran → buka struk, riwayat, dan rekap.

| Pemeriksaan | Hasil yang diharapkan (jawaban manual siswa) |
|---|---:|
| Omzet transaksi | **Rp30.000** |
| Total HPP terjual | **Rp18.000** |
| Laba kotor | **Rp12.000** |
| Kembalian | **Rp20.000** |
| Stok Roti Bakar sesudah transaksi | **7 unit** |
| Stok Es Teh sesudah transaksi | **13 unit** |

**Perilaku tambahan:** hanya satu transaksi berhasil tersimpan; metode tunai, rincian harga, dan kembalian tampil pada struk; transaksi dapat dibuka kembali.  
**Pelaksanaan:** Belum diuji.

### KT-02 — QRIS sebelum dan sesudah konfirmasi manual

**Acuan:** F04–F07, F10; B08–B09, B13–B16.  
**Prakondisi:** data kelompok uji kosong; buat barang berikut.

| Produk | Harga jual/unit | HPP/unit | Stok awal | Jumlah dibeli |
|---|---:|---:|---:|---:|
| Air Mineral | Rp4.000 | Rp2.500 | 12 | 3 |
| Sosis Bakar | Rp7.000 | Rp4.000 | 9 | 2 |

**Langkah:** buat keranjang → pilih QRIS → **jangan konfirmasi**, periksa rekap/stok → petugas menekan **Konfirmasi Pembayaran** → periksa rekap dan riwayat.

| Pemeriksaan | Sebelum konfirmasi | Setelah konfirmasi — jawaban siswa |
|---|---:|---:|
| Omzet tambahan | Rp0 | **Rp26.000** |
| HPP terjual dari transaksi ini | Rp0 | **Rp15.500** |
| Laba kotor dari transaksi ini | Rp0 | **Rp10.500** |
| Stok Air Mineral | 12 | **9** |
| Stok Sosis Bakar | 9 | **7** |

**Perilaku tambahan:** pembayaran dicatat sebagai QRIS setelah konfirmasi manual saja. Aplikasi **tidak** mengonfirmasi dana dari bank. Konfirmasi berulang tidak boleh menggandakan transaksi.  
**Pelaksanaan:** Belum diuji.

### KT-03 — Stok tidak mencukupi: seluruh transaksi ditolak

**Acuan:** F04–F06; B05, B09.  
**Prakondisi:** Air Mineral stok **9**, harga Rp4.000; Sosis Bakar stok **7**, harga Rp7.000. Keranjang berisi **10 Air Mineral** dan **2 Sosis Bakar**.

**Langkah:** pilih kedua item → mencoba melanjutkan pembayaran → amati pesan, stok, dan rekap.

| Pemeriksaan | Hasil yang diharapkan (revisi siswa) |
|---|---:|
| Penambahan omzet | **Rp0** |
| Stok akhir Air Mineral | **9 unit** |
| Stok akhir Sosis Bakar | **7 unit** |

**Perilaku tambahan:** seluruh transaksi ditolak secara utuh; tidak ada penjualan berhasil yang tercatat, stok tidak boleh negatif. Pesan contoh: **“Stok Air Mineral tidak mencukupi. Silakan kurangi jumlah pembelian atau tambahkan stok.”**

**Catatan pembelajaran:** pada jawaban awal siswa sempat menghitung nominal keranjang Rp54.000 dan stok negatif, lalu mengoreksinya setelah memahami prinsip bahwa transaksi yang gagal **tidak mengubah** stok atau omzet.  
**Pelaksanaan:** Belum diuji.

### KT-04 — Validasi batas jumlah barang 1–99

**Acuan:** F05; B05–B06.  
**Prakondisi:** Pulpen, harga jual **Rp2.000**, HPP **Rp1.200**, stok **120 unit**. Setiap percobaan memakai data awal yang di-reset; **tidak** menjalankan keenam percobaan secara berurutan.

| Percobaan | Input jumlah | Harapan siswa |
|---|---:|---|
| A | 0 | Ditolak |
| B | −1 | Ditolak |
| C | 1,5 | Ditolak |
| D | 100 | Ditolak |
| E | 1 | Diterima |
| F | 99 | Diterima |

| Pemeriksaan transaksi berhasil | Percobaan E: 1 unit | Percobaan F: 99 unit |
|---|---:|---:|
| Omzet | **Rp2.000** | **Rp198.000** |
| HPP | **Rp1.200** | **Rp118.800** |
| Laba kotor | **Rp800** | **Rp79.200** |
| Stok akhir | **119 unit** | **21 unit** |

**Langkah:** satu per satu masukkan jumlah → amati validasi → untuk input yang diterima selesaikan transaksi dan cocokkan angka. Input ditolak tidak mengubah stok/omzet.  
**Pelaksanaan:** Belum diuji.

### KT-05 — Pembatalan, pengembalian stok, omzet, dan refund manual

**Acuan:** F07–F08; B10–B11, B13–B14.  
**Prakondisi:** buat ulang data awal seperti **KT-01** dalam lingkungan uji terpisah, kemudian selesaikan satu transaksi tunai: Roti Bakar 3 dari stok 10, Es Teh 2 dari stok 15. Pembeli membayar Rp50.000 dan sudah menerima kembalian Rp20.000.

**Langkah:** buka transaksi → batalkan dengan alasan **“Pembeli membatalkan pesanan sebelum barang diserahkan”** → periksa histori, stok dan rekap → amati status refund → tandai uang sudah dikembalikan → coba membatalkan transaksi yang sama sekali lagi.

| Pemeriksaan | Hasil yang diharapkan (jawaban siswa) |
|---|---:|
| Stok Roti Bakar setelah batal | **10 unit** |
| Stok Es Teh setelah batal | **15 unit** |
| Kontribusi omzet bersih transaksi setelah batal | **Rp0** |
| Kontribusi laba kotor transaksi setelah batal | **Rp0** |
| Nilai refund kepada pembeli | **Rp30.000** |
| Status sebelum menyerahkan refund | **Belum Dikembalikan** |
| Status setelah menyerahkan refund | **Sudah Dikembalikan** |

**Perilaku tambahan:** transaksi berstatus **Dibatalkan**, alasan dan struk historis tetap ada, pembatalan kedua ditolak. Refund berlangsung **manual**; sistem mencatat kewajiban refund tertunda secara terpisah dari omzet. Nilai refund adalah nilai transaksi, bukan seluruh uang Rp50.000 yang sebelumnya diserahkan.  
**Pelaksanaan:** Belum diuji.

### KT-06 — Pemasukan tunai/QRIS, HPP, biaya, laba, dan modal

**Acuan:** F09–F10; B12–B16.  
**Prakondisi:** XI ELIN 1 Kelompok 2, modal awal **Rp200.000**, tidak ada transaksi/biaya lain.

| Transaksi | Produk | Jumlah | Harga/unit | HPP/unit | Metode |
|---|---|---:|---:|---:|---|
| A | Jus Mangga | 4 | Rp8.000 | Rp4.000 | Tunai, berhasil |
| B | Roti Isi | 3 | Rp10.000 | Rp6.000 | QRIS, dikonfirmasi |

**Biaya operasional:** kebersihan Rp6.000 dan transportasi Rp8.000. Biaya ini **berbeda** dari HPP dan tidak boleh dihitung dua kali.

| Pemeriksaan | Hasil yang diharapkan (jawaban siswa) |
|---|---:|
| Omzet tunai | **Rp32.000** |
| Omzet QRIS | **Rp30.000** |
| Total omzet | **Rp62.000** |
| Total HPP terjual | **Rp34.000** |
| Laba kotor | **Rp28.000** |
| Total biaya operasional | **Rp14.000** |
| Laba bersih | **Rp14.000** |
| Modal awal masuk omzet? | **Tidak** |

**Langkah:** catat modal → buat dua transaksi berhasil → catat biaya operasional → buka rekap → cocokkan semua angka dan pemisahan modal.  
**Pelaksanaan:** Belum diuji.

### KT-07 — Hak akses siswa kelas dan pengelola

**Acuan:** F01–F02, F10; B01–B02, B17, B19.  
**Prakondisi:** tersedia tujuh kelas, masing-masing tiga kelompok (21 kelompok). Gunakan PIN **demo**, bukan PIN asli sistem sekolah.

| Skenario | Hasil yang diharapkan (analisis siswa) |
|---|---|
| Siswa XI ELIN 1 login | Dapat memilih **3 kelompok dalam XI ELIN 1** |
| Mengubah harga produk kelompok XI ELIN 1 | **Boleh** melalui akses siswa kelas sendiri |
| Mengubah transaksi kelompok XI MK 1 | **Tidak boleh** |
| Siswa XI ELIN 1 melihat omzet semua kelas | **Tidak boleh** |
| Pengelola membuka laporan kelompok | Dapat melihat **21 kelompok** dari 7 kelas pada data lokal yang tersedia |
| Pengelola membuka leaderboard | Menampilkan **7 kelas** |
| Pengelola mengubah harga produk siswa | **Tidak boleh**; akses hanya-baca |
| Memasukkan PIN yang tidak dikenal | **Login ditolak** |

**Langkah:** uji login siswa, perpindahan kelompok kelas sendiri, navigasi ke kelas lain, login pengelola, dan percobaan perubahan katalog; periksa pembatasan UI. **Peringatan:** PIN JavaScript statis ini hanya simulasi hak akses dan tidak melindungi data dari pemeriksaan manual kode/browser.  
**Pelaksanaan:** Belum diuji.

### KT-08 — localStorage, refresh, riwayat, dan batas antarperangkat

**Acuan:** F07, F10; B18.  
**Prakondisi:** di XI ELIN 1 Kelompok 2 buat Es Jeruk harga **Rp5.000**, HPP **Rp3.000**, stok **20**; jual **4 unit** secara tunai hingga berhasil, ID contoh **TRX-001**.

| Tindakan | Hasil yang diharapkan (analisis siswa) |
|---|---|
| Refresh halaman (`F5`) | Transaksi **TRX-001 tetap tersedia** |
| Tutup dan buka browser/profil yang sama | Data **masih tersedia** |
| Buka pada laptop kedua tanpa data yang sama | Transaksi **tidak otomatis muncul** |
| Buka riwayat dan struk TRX-001 | Struk **dapat dibuka kembali** |
| Hapus `localStorage` situs pada lingkungan uji | Data lokal **terhapus** |
| Sisa stok setelah transaksi | **16 unit** |
| Omzet transaksi setelah refresh | **Rp20.000** |

**Langkah:** jalankan transaksi → cek stok/rekap → refresh → buka kembali browser → cek di laptop lain → buka struk → lakukan uji hapus penyimpanan **hanya di profil khusus pengujian**.  
**Pelaksanaan:** Belum diuji.

### KT-09 — Gabungan katalog barang dan jasa; harga jasa per transaksi

**Acuan:** F03–F05; B03–B06.  
**Prakondisi:** XI ELIN 2 Kelompok 1; item berikut aktif:

| Item | Jenis | Harga default | HPP/unit | Stok awal |
|---|---|---:|---:|---|
| Kabel USB | Barang | Rp12.000 | Rp7.000 | 8 unit |
| Jasa Perbaikan Kabel | Jasa | Rp15.000 | Rp5.000 | Tidak memakai stok |

**Langkah:** masukkan **2 Kabel USB** dan **1 jasa**; khusus transaksi ini ubah harga jasa menjadi **Rp18.000**; konfirmasi QRIS → periksa rekap, stok, dan harga standar jasa di katalog → nonaktifkan Kabel USB dan coba menambahkannya ke transaksi baru.

| Pemeriksaan | Hasil yang diharapkan (jawaban siswa) |
|---|---:|
| Total pembayaran | **Rp42.000** |
| Total HPP | **Rp19.000** |
| Laba kotor | **Rp23.000** |
| Stok akhir Kabel USB | **6 unit** |
| Harga standar jasa setelah transaksi | **Rp15.000 (tetap)** |
| Jasa membutuhkan stok barang? | **Tidak** |
| Kabel USB nonaktif dapat dijual di transaksi baru? | **Tidak boleh** |

**Perilaku tambahan:** struk memakai harga jasa yang diterapkan pada transaksi, riwayat transaksi lama tidak berubah jika katalog diedit.  
**Pelaksanaan:** Belum diuji.

### KT-10 — Laporan omzet 21 kelompok dan leaderboard 7 kelas

**Acuan:** F10; B01, B13, B17.  
**Prakondisi:** pada **satu browser/profil yang sama**, masukkan data **omzet berhasil kumulatif simulasi** 21 kelompok berikut. Untuk pengujian laporan, data dapat dibentuk dari transaksi contoh yang totalnya sesuai setiap kelompok.

| Kelas | Kelompok 1 | Kelompok 2 | Kelompok 3 | Total omzet kelas — hitungan siswa | Peringkat siswa |
|---|---:|---:|---:|---:|---:|
| XI MK 1 | Rp80.000 | Rp95.000 | Rp75.000 | **Rp250.000** | **4** |
| XI MK 2 | Rp100.000 | Rp75.000 | Rp65.000 | **Rp240.000** | **5** |
| XI ELIN 1 | Rp90.000 | Rp80.000 | Rp90.000 | **Rp260.000** | **2** |
| XI ELIN 2 | Rp110.000 | Rp85.000 | Rp65.000 | **Rp260.000** | **2** |
| XI TITL 1 | Rp70.000 | Rp75.000 | Rp55.000 | **Rp200.000** | **6** |
| XI TITL 2 | Rp120.000 | Rp105.000 | Rp75.000 | **Rp300.000** | **1** |
| XI TP | Rp60.000 | Rp85.000 | Rp55.000 | **Rp200.000** | **6** |
| **Total** | | | | **Rp1.710.000** | |

**Langkah:** isi data demo secara terkendali → login pengelola → buka rekap dan leaderboard → bandingkan total dan peringkat; login siswa → pastikan siswa hanya melihat omzet kelasnya sendiri.

**Urutan yang diharapkan:** XI TITL 2 (1); XI ELIN 1 dan XI ELIN 2 (2 bersama); XI MK 1 (4); XI MK 2 (5); XI TITL 1 dan XI TP (6 bersama). Aturan peringkat seri: **1, 2, 2, 4, 5, 6, 6**.  
**Riwayat koreksi:** siswa memperbaiki jawaban awal XI ELIN 2 dan jumlah seluruh kelompok. Nilai pada tabel ini adalah **jawaban revisi yang telah dikonfirmasi**.  
**Pelaksanaan:** Belum diuji.

## 3. Pengujian fungsional tambahan sesuai spesifikasi

Kasus UF berikut menguji perilaku lain dari F01–F12 dan B01–B19. **Tidak ada angka hasil hitungan baru yang diklaim sebagai jawaban siswa.** Bila pengujian nyata kelak membutuhkan besaran numerik di luar KT-01–KT-10, tim harus menghitung dan menyepakati hasil harapannya sendiri **sebelum mengeksekusi kasus tersebut**, lalu mencatatnya melalui commit dokumen.

| ID | Fitur yang diuji dan tindakan | Hasil perilaku yang diharapkan | Status |
|---|---|---|---|
| UF-01 | Buka beranda tanpa PIN | Informasi PERWIRA dan fase BUILD/TEST/GROW/COMPETE/REFLECT tampil, navigasi masuk siswa/pengelola tersedia | Belum diuji |
| UF-02 | Coba PIN tidak dikenal dan PIN valid milik kelas lain | PIN tidak dikenal ditolak; PIN valid membuka kelas pemiliknya saja, bukan data kelas yang sedang dipilih sebelumnya | Belum diuji |
| UF-03 | Beralih Kelompok 1→2→3 dalam kelas sama | Katalog, transaksi, modal, biaya, stok, dan omzet tetap terpisah antar kelompok | Belum diuji |
| UF-04 | Form produk: nama kosong/spasi, harga kosong/nonnumerik, harga nol/negatif/pecahan rupiah | Validasi menolak dan menampilkan pesan yang jelas; data tidak tersimpan | Belum diuji |
| UF-05 | Form HPP negatif/pecahan vs HPP nol | Nilai negatif dan pecahan ditolak; HPP nol diterima jika data lain sah | Belum diuji |
| UF-06 | Tambah barang dengan stok awal bilangan bulat nonnegatif; lakukan penambahan stok | Stok berubah sesuai input sah dan tetap setelah refresh; input stok tidak sah ditolak | Belum diuji |
| UF-07 | Menambah produk sama berkali-kali hingga total jumlah >99 atau >stok | Baris item digabung; penambahan yang melampaui salah satu batas ditolak, tanpa stok negatif | Belum diuji |
| UF-08 | Kosongkan keranjang lalu tekan pembayaran | Ditolak; tidak tercatat transaksi berhasil | Belum diuji |
| UF-09 | Masukkan pembayaran tunai kurang / kosong / negatif / pecahan / bukan angka | Ditolak; omzet dan stok tidak berubah; pesan kesalahan terbaca | Belum diuji |
| UF-10 | Selesaikan transaksi berhasil dan klik konfirmasi berkali-kali | Satu ID transaksi unik saja, stok/omzet berubah satu kali | Belum diuji |
| UF-11 | Edit harga/HPP katalog setelah transaksi sukses | Struk lama tetap menunjukkan harga/HPP saat transaksi; harga katalog baru berlaku hanya pada transaksi berikutnya | Belum diuji |
| UF-12 | Coba batalkan tanpa alasan, lalu batalkan dengan alasan sah dua kali | Tanpa alasan ditolak; pembatalan pertama berhasil, yang kedua ditolak, stok tidak dipulihkan berulang | Belum diuji |
| UF-13 | Pembatalan dan refund pada transaksi QRIS | Status refund dapat dicatat manual dan tetap muncul di histori; aplikasi tidak mengklaim refund bank otomatis | Belum diuji |
| UF-14 | Isi modal awal negatif/pecahan/lebih dari Rp250.000 | Nilai di luar batas ditolak; modal yang sah tersimpan terpisah dari omzet dan laba | Belum diuji |
| UF-15 | Catat biaya tanpa keterangan / nol / negatif / pecahan | Input tidak sah ditolak; biaya sah masuk laporan operasional, tidak menggandakan HPP | Belum diuji |
| UF-16 | Nonaktifkan produk setelah ada riwayat penjualan | Tidak dapat ditambahkan ke transaksi baru; histori tetap terbaca | Belum diuji |
| UF-17 | Buka laporan hari tertentu dan kumulatif | Laporan menampilkan transaksi dengan cakupan yang dipilih; peran siswa/guru tetap berlaku | Belum diuji |
| UF-18 | Muat data demo, kemudian muat kembali | Data berlabel simulasi; tidak menggandakan transaksi demo secara tidak sengaja; tidak menghapus catatan lain tanpa persetujuan | Belum diuji |
| UF-19 | Gagalkan penyimpanan `localStorage` pada lingkungan tes | Tidak muncul pesan sukses palsu; data tidak dianggap berhasil tersimpan dan pengguna mendapat pesan kesalahan | Belum diuji |
| UF-20 | Uji alur inti pada layar HP lebar 360 px dan desktop | Kontrol terbaca/dapat disentuh, pesan validasi tampil jelas, tidak ada gulir horizontal yang menghalangi transaksi | Belum diuji |
| UF-21 | Ikuti README pada komputer/folder baru | Proyek dapat dijalankan sesuai instruksi, tanpa rahasia/API key, server basis data, atau IoT | Belum diuji |
| UF-22 | Periksa GitHub, dokumen, dan commit | `01-spesifikasi.md`, `02-rencana.md`, dan dokumen kasus uji ini sudah dicatat sebelum commit kode website pertama; riwayat sesuai tahapan checkpoint | Belum diuji |

## 4. Rencana pelaksanaan dan pencatatan hasil

Setelah aplikasi tersedia, kami akan menguji KT-01–KT-10 dan UF-01–UF-22, lalu menyimpan bukti screenshot ke `docs/bukti/`. Contoh nama bukti: `KT-01-struk-tunai.png`, `KT-02-qris-menunggu.png`, dan `UF-04-validasi-produk.png`. Status baru boleh diubah menjadi **Lulus** setelah hasilnya benar-benar kami lihat pada aplikasi.

Tabel berikut akan kami isi saat pengujian berlangsung, sesuai format hasil sebenarnya, status, dan bukti dari template panitia.

| ID | Hasil sebenarnya | Status | Bukti screenshot |
|---|---|---|---|
| KT-01 | Belum ada | Belum diuji | — |
| KT-02 | Belum ada | Belum diuji | — |
| KT-03 | Belum ada | Belum diuji | — |
| KT-04 | Belum ada | Belum diuji | — |
| KT-05 | Belum ada | Belum diuji | — |
| KT-06 | Belum ada | Belum diuji | — |
| KT-07 | Belum ada | Belum diuji | — |
| KT-08 | Belum ada | Belum diuji | — |
| KT-09 | Belum ada | Belum diuji | — |
| KT-10 | Belum ada | Belum diuji | — |

Untuk pemeriksaan UF-01–UF-22, hasil sebenarnya dan bukti juga akan dicatat saat kasus dijalankan; status awalnya tetap **Belum diuji**.

| Data pelaksanaan | Kondisi pra-Checkpoint 1 |
|---|---|
| Kode/commit aplikasi yang diuji | Belum ada |
| Tanggal mulai eksekusi uji | Belum dilaksanakan |
| Perangkat, browser, dan versi | Akan dicatat saat tes |
| Hasil aktual per kasus | Belum ada |
| Jumlah kasus yang benar-benar lulus/gagal | Belum dapat dinilai |
| Bukti screenshot | Belum dibuat |
| Tes otomatis | Direncanakan dengan `node --test` di folder `tes/` setelah modul JavaScript dibuat |

**Format pencatatan yang digunakan setelah tes berlangsung:** `ID kasus | tanggal/jam | penguji | input/aksi | hasil aktual | Lulus/Gagal | lokasi bukti | tindakan perbaikan/commit`. Apabila bug diperbaiki, ulangi tes terkait dan regresi kasus lama.

## 5. Change Request — baru setelah Checkpoint 2

**Belum diimplementasikan dan belum diuji.** Sesudah commit **`checkpoint: versi pertama alur inti berjalan`**, tim menganalisis dampak Change Request pada `docs/analisis-change-request.md` dan **membuat commit analisis sebelum mengubah kode**. Pengujian baru yang perlu ditambah kelak meliputi:

- Pencarian langsung tanpa membedakan huruf besar/kecil.
- Filter yang bekerja bersama pencarian (termasuk filter/rentang tanggal sesuai perubahan yang disepakati).
- Pesan tepat **`Data tidak ditemukan`** untuk hasil kosong.
- Unduhan CSV hanya berisi data **yang sedang tampil setelah filter/pencarian**, dengan header dan angka mentah tanpa `Rp` atau pemisah ribuan; dapat dibuka di Excel.
- Pengujian regresi seluruh kasus lama agar fitur tambahan tidak merusak alur kasir, stok, struk, riwayat, atau laporan.

Hasil yang diharapkan untuk data numerik baru pada Change Request akan ditentukan oleh siswa **sebelum** menjalankan pengujian tambahannya, bukan mengubah hasil tes lama setelah melihat program.

## 6. Pemeriksaan sebelum Checkpoint 1

- [x] Spesifikasi `01-spesifikasi.md` telah disetujui dan diletakkan di folder `docs/` berdasarkan laporan tim.
- [x] Rencana `02-rencana.md` telah disetujui dan diletakkan di folder `docs/` berdasarkan laporan tim.
- [x] KT-01 s.d. KT-10 memiliki hasil harapan yang berasal dari jawaban/analisis siswa, termasuk revisi KT-03 dan KT-10.
- [x] Nilai numerik, status stok/pembayaran, hak akses, dan leaderboard telah diperiksa konsistensinya terhadap spesifikasi final.
- [x] Tidak ada klaim palsu bahwa aplikasi telah diuji.
- [ ] **Unggah `docs/04-kasus-uji.md` ke GitHub dan periksa isi file pada branch `main`.**
- [ ] **Periksa kesesuaian versi spesifikasi, rencana, dan kasus uji di repositori.**
- [ ] **Buat commit Checkpoint 1 dengan pesan tepat `checkpoint: spesifikasi, kasus uji, dan rencana selesai`, sebelum mengunggah kode website apa pun.**

**Etika kerja tim:** kami membedakan hasil wawancara, data simulasi, jawaban perhitungan siswa, bantuan AI, dan bukti pengujian aplikasi. PIN Akses (simulasi) tidak dapat melindungi data nyata. Karena repositori GitHub bersifat publik, kami tidak mengunggah data pribadi, PIN/kata sandi asli, API key, atau transaksi sungguhan.

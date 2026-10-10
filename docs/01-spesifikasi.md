# Spesifikasi Produk — PERWIRA Digital

**Tim:** SOLARIS  
**Slogan tim:** One Ecosystem, Endless Possibilities  
**Sekolah:** SMKN 8 Tangerang  
**Produk:** PERWIRA Digital — Sistem Kasir dan Pencatatan Usaha Siswa  
**Bentuk produk:** Prototipe website responsif, berorientasi penggunaan HP, tanpa perangkat keras atau IoT  
**Penyimpanan:** `localStorage` pada satu browser/profil untuk simulasi challenge  
**Alur inti:** Dari halaman beranda, petugas masuk memakai PIN kelas, memilih kelompok dan produk/jasa, menyelesaikan pembayaran, lalu memperoleh struk digital dan riwayat transaksi yang tersimpan.

**Anggota tim:**
1. Dafa Teger Alrasya — XI MK 1.
2. Alif Mulyana — XI MK 1.
3. Zaskia Aulia Putri Sheprida — XI ELIN 2.

**Pembimbing:** Andi Suhandi, S.Kom., MT.

## 1. Masalah

### 1.1 Latar belakang

PERWIRA (Pekan Berwirausaha) merupakan program kokurikuler untuk siswa kelas XI SMKN 8 Tangerang. Program ini memberi pengalaman menjalankan unit usaha mikro secara berkelompok. Sesuai Grand Design PERWIRA, **kelompok merupakan unit usaha**, sedangkan **kelas merupakan tim kompetisi**: total omzet suatu kelas berasal dari penjumlahan omzet tiga kelompoknya.

PERWIRA diikuti tujuh kelas: XI MK 1, XI MK 2, XI ELIN 1, XI ELIN 2, XI TITL 1, XI TITL 2, dan XI TP. Setiap kelas memiliki tiga kelompok, sehingga terdapat **21 kelompok usaha**. Anggota setiap kelompok sekitar 11 siswa, dengan sekitar dua sampai tiga siswa menjalankan tugas penjualan secara bergilir.

Produk usaha tidak hanya makanan dan minuman, tetapi dapat berupa barang hasil kompetensi kejuruan maupun jasa reparasi. Empat bidang keahlian yang menjadi latar kegiatan adalah Teknik Mekatronika, Elektronika Industri, Teknik Instalasi Tenaga Listrik, serta Teknik Pendinginan Tata Udara dan Pemanasan. Jenis produk, harga, dan biaya produksi setiap kelompok berbeda.

### 1.2 Masalah nyata di lapangan

Wawancara langsung pada kegiatan PERWIRA menemukan beberapa masalah:

1. Penjualan dicatat menggunakan buku, catatan HP, Excel di HP, atau Google Spreadsheet; cara ini berbeda antar kelompok.
2. Kantin sangat ramai pada istirahat pertama pukul **09.15–09.30 WIB** dan istirahat kedua pukul **11.45–12.30 WIB**, sehingga petugas kewalahan melayani pembeli sekaligus mencatat transaksi.
3. Terdapat kesulitan menghitung pembayaran dan ketidaksesuaian antara uang yang diterima dengan catatan penjualan.
4. Sebagian kelompok sudah menghitung harga dan HPP, tetapi pencatatan keuangan dan stok belum konsisten.
5. Petugas membutuhkan rekap uang masuk, uang keluar, keuntungan, serta informasi stok.
6. Alat utama yang dapat digunakan siswa untuk bertugas ialah **HP**; siswa tidak diperbolehkan membawa laptop ke lapak.
7. Beberapa kelompok mengurangi antrean dengan pre-order (PO), tetapi penjualan spontan di kantin tetap banyak terjadi.

### 1.3 Rumusan masalah dan tujuan

Bagaimana menghadirkan kasir berbasis web yang mudah digunakan dari HP saat jam istirahat, menghitung transaksi tunai/QRIS secara akurat, memisahkan catatan antar kelompok, serta membantu siswa dan pembimbing mengevaluasi usaha?

Tujuan prototipe adalah mempercepat alur pencatatan, meminimalkan kesalahan hitung, menjaga jejak transaksi, serta menyediakan rekap omzet dan keuangan berdasarkan kelas/kelompok. Efektivitas dan percepatan nyata masih harus diuji; dokumen ini bukan klaim bahwa aplikasi telah terbukti mengurangi antrean.

## 2. Pengguna

### 2.1 Siswa kelas XI — petugas usaha

Siswa menggunakan HP untuk masuk dengan **PIN kelas**, memilih salah satu dari tiga kelompok dalam kelas tersebut, mengelola produk dan stok, mencatat modal dan pengeluaran, melakukan transaksi, memeriksa struk dan riwayat, serta melihat rekap ketiga kelompok dan total omzet **kelas sendiri**. Siswa tidak diberi tampilan laporan atau omzet kelas lain.

### 2.2 Guru PKK dan koordinator kokurikuler — pengelola laporan

Keduanya memakai **satu PIN pengelola bersama** untuk melihat laporan semua tujuh kelas dan 21 kelompok, termasuk Business Leaderboard dan rincian keuangan. Akses pengelola bersifat **hanya-baca**: tidak dapat menambah, mengubah, membatalkan transaksi, atau mengubah katalog.

### 2.3 Pengunjung umum

Pengunjung dapat membuka **landing page publik** berisi penjelasan program PERWIRA, tujuan kewirausahaan, lima fase kegiatan (BUILD, TEST, GROW, COMPETE, REFLECT), dan pintu masuk siswa/pengelola. Pengunjung tidak langsung masuk ke kasir atau melihat laporan keuangan.

### 2.4 Batasan akses pada prototipe

PIN dibuat statis sebagai **PIN contoh** untuk demonstrasi; masing-masing kelas memiliki PIN berbeda dan ada satu PIN pengelola. Nilai PIN contoh serta petunjuk penggunaannya nanti dicantumkan dalam README untuk juri. Karena kode berjalan di browser, PIN klien **bukan mekanisme autentikasi yang aman**. Pembatasan tampilan berdasarkan peran hanya simulasi, tidak menjamin kerahasiaan terhadap orang yang memeriksa kode/browser.

Data `localStorage` tidak otomatis tersinkron antardevice. Oleh karena itu, laporan gabungan 21 kelompok hanya dapat menunjukkan data yang tersedia pada **browser/profil yang sama**, termasuk data simulasi yang dimuat di sana. Sistem ini belum layak digunakan sebagai sumber pembukuan resmi lintas HP.

## 3. Hasil wawancara calon pengguna

**Pelaksanaan:** Jumat, **9 Oktober 2026**, secara **langsung di lapangan** ketika kegiatan PERWIRA berlangsung.  
**Narasumber:** Siswa yang sedang bertugas berjualan, tanpa mencantumkan nama atau kontak pribadi. Pada pekan tersebut yang bertugas antara lain XI ELIN 1 Kelompok 2, XI ELIN 2 Kelompok 2, serta XI TITL 2 Kelompok 1. Beberapa kelompok menyampaikan masalah serupa.

| Pertanyaan wawancara | Jawaban siswa (dirapikan tanpa mengubah makna) | Kebutuhan aplikasi |
|---|---|---|
| Bagaimana transaksi dicatat saat ini? | Buku, catatan di HP, Excel di HP, atau Google Spreadsheet. | Pencatatan transaksi terpusat dalam alur kasir. |
| Apa kendala saat melayani dan menghitung uang? | Kewalahan ketika pembeli datang bersamaan pada jam istirahat; uang dan catatan kadang tidak cocok. | Alur kasir cepat, perhitungan otomatis, riwayat yang dapat diperiksa. |
| Apakah harga, modal, biaya, dan stok telah dicatat terpisah? | Sebagian kelompok sudah mencatat harga jual dan HPP; selebihnya belum konsisten. | Katalog dengan harga/HPP dan pencatatan modal serta biaya. |
| Laporan apa yang diperlukan? | Uang masuk, uang keluar, keuntungan, dan stok bahan mentah sebelum menjadi barang jadi. | Rekap transaksi, keuangan sederhana, dan stok produk jadi; bahan baku dikembangkan nanti. |
| Aplikasi dipakai lewat HP atau laptop? | HP, karena siswa tidak boleh membawa laptop; tampilan harus responsif. | Antarmuka mobile-first dengan tombol mudah disentuh. |

**Temuan tambahan:** Sejumlah kelompok menerapkan pre-order: pesanan dicatat lebih awal dan barang diambil sesuai waktu kesepakatan. Namun, **PO tidak menjadi fitur prototipe challenge**; fokus saat ini adalah penjualan langsung.

## 4. Fitur wajib dan alur inti

Semua fitur berikut merupakan ruang lingkup yang disepakati untuk **produk challenge**. Pengembangan dilakukan bertahap; versi minimum alur inti harus berjalan sebelum commit Checkpoint 2. Fitur pencarian, filter, dan ekspor CSV sengaja dipisahkan sebagai **Change Request setelah Checkpoint 2**.

### F01 — Landing page publik dan navigasi

Beranda menjelaskan PERWIRA, tujuan kegiatan dan lima fase, dengan navigasi jelas menuju **Masuk Siswa** dan **Masuk Pengelola**. Tampilan berfungsi di HP maupun desktop.

### F02 — PIN kelas dan pengelola

Terdapat tujuh pilihan kelas dengan PIN statis masing-masing. PIN benar membawa siswa ke ruang kelas terkait; PIN salah memunculkan pesan. Setelah berhasil masuk, siswa memilih Kelompok 1, 2, atau 3 sebagai kelompok aktif. Siswa dapat beralih antar kelompok **dalam kelas sendiri**, tetapi tidak mengakses data kelas lain melalui antarmuka normal. PIN pengelola membuka dashboard baca-saja untuk semua kelas.

### F03 — Katalog mandiri per kelompok

Setiap kelompok dapat menambah dan mengubah produk/jasa beserta nama, jenis (barang atau jasa), kategori, harga jual standar, HPP per unit, dan status aktif. Kategori mendukung makanan, minuman, produk teknik, jasa, dan lainnya. Katalog tiap kelompok terpisah; produk yang dinonaktifkan tidak bisa ditambahkan ke transaksi baru. Perubahan harga katalog tidak mengubah riwayat transaksi lampau.

### F04 — Stok barang jadi

Produk fisik memiliki stok bilangan bulat mulai dari nol. Siswa dapat mengisi serta menambah stok. Stok barang berkurang **hanya setelah transaksi berhasil** dan dikembalikan saat transaksi dibatalkan. Sistem menolak transaksi melebihi stok. Jasa tidak membutuhkan stok barang. Stok bahan mentah, resep, dan pengurangan bahan berdasarkan produksi ditunda.

### F05 — Kasir dan keranjang belanja

Petugas memilih produk/jasa dari kelompok aktif, mengatur jumlah, melihat subtotal dan total otomatis, serta dapat membuang item dari keranjang. Item sejenis yang ditambahkan lagi digabung jumlahnya. Harga barang mengikuti katalog; **harga jasa memiliki harga standar yang dapat disesuaikan khusus untuk satu transaksi** tanpa mengubah harga katalog. Keranjang tidak boleh kosong saat diproses.

### F06 — Pembayaran tunai dan QRIS manual

- **Tunai:** petugas memasukkan uang diterima; bila kurang dari total transaksi, pembayaran ditolak. Bila cukup, aplikasi menampilkan kembalian.
- **QRIS:** aplikasi menampilkan total dan meminta petugas memastikan pembayaran diterima; tidak terhubung ke bank, QRIS API, atau payment gateway. Transaksi QRIS **baru dianggap berhasil setelah petugas menekan konfirmasi**.
- Transaksi belum berhasil tidak boleh menambah omzet dan tidak mengurangi stok.

### F07 — Struk digital dan riwayat

Transaksi berhasil mendapat nomor unik, waktu, kelas, kelompok, rincian item, kuantitas, harga pada saat transaksi, subtotal/total, metode pembayaran, dan kembalian untuk tunai. Struk dapat dibuka saat transaksi selesai dan dari riwayat. Harga serta HPP saat penjualan disimpan sebagai **snapshot** agar angka historis tidak berubah ketika katalog diedit.

### F08 — Pembatalan dan pengembalian uang manual

Siswa dapat membatalkan transaksi **kelas sendiri** dengan alasan wajib. Transaksi diberi status **Dibatalkan**, bukan dihapus. Omzet terkait tidak lagi dihitung, stok barang dikembalikan **sekali**, dan catatan pembatalan tetap tersimpan. Pembatalan kedua atas transaksi yang sama ditolak.

Untuk transaksi yang telah dibayar, aplikasi menyimpan status pengembalian uang **Belum Dikembalikan** atau **Sudah Dikembalikan**. Pengembalian dilakukan manual di luar aplikasi, baik untuk pembayaran tunai maupun QRIS; tidak ada refund otomatis. Kewajiban pengembalian yang tertunda dilaporkan terpisah dari omzet. Struk yang dibuka kembali menunjukkan status pembatalan.

### F09 — Modal awal dan pencatatan biaya

Setiap kelompok mencatat modal awal dalam rentang **Rp0–Rp250.000**. Modal bukan omzet dan bukan laba. Siswa memasukkan HPP produk/jasa per unit dan mencatat **biaya operasional** kelompok (tanggal, keterangan, nominal). Biaya operasional dipisahkan dari HPP; pencatatan pengeluaran tidak boleh menyebabkan HPP dikurangkan dua kali. Perputaran modal rinci dan buku persediaan bahan baku belum diotomatisasi.

### F10 — Rekap kelompok/kelas dan laporan guru

Siswa dapat melihat rekap transaksi berhasil, omzet, HPP terjual, biaya operasional, laba, serta ringkasan pemasukan tunai/QRIS bagi **kelas sendiri** dan tiga kelompoknya. Laporan memiliki pilihan **hari tertentu** dan **total kumulatif**. Pengelola bisa melihat semua kelas/kelompok, totalnya, dan Business Leaderboard yang mengurutkan tujuh kelas berdasarkan total omzet ketiga kelompok; omzet sama memiliki peringkat sama. Omzet bukan ukuran tunggal keberhasilan pembelajaran.

**Catatan urutan challenge:** penyimpanan tanggal transaksi dilakukan sejak awal. **Filter interaktif rentang tanggal, pencarian, dan unduh CSV baru ditambahkan dalam Change Request setelah Checkpoint 2**. Hasil akhir aplikasi harus menyediakan laporan harian, rentang tanggal, serta kumulatif sebagaimana disepakati.

### F11 — Data demonstrasi

Aplikasi menyediakan tujuh kelas dan 21 kelompok, serta **data simulasi** produk dengan kategori/harga bervariasi dan transaksi contoh yang **dapat dimuat secara sengaja** untuk demonstrasi juri. Data diberi label jelas sebagai simulasi; tidak mengandung informasi pribadi atau transaksi nyata. Pemuatan ulang tidak boleh tanpa sengaja menggandakan contoh transaksi. Data demo tidak otomatis menghapus data yang sudah dicatat.

### F12 — Responsif dan mudah dipakai saat jam padat

Rancangan mobile-first: tombol produk mudah disentuh, alur pembayaran ringkas, angka jelas, kesalahan ditampilkan dekat input, dan tidak ada gulir horizontal yang menghalangi fungsi utama pada lebar layar HP umum. Website tetap bisa dipakai melalui desktop untuk keperluan pengujian.

### Satu alur inti yang diuji dari awal sampai akhir

1. Pengguna membuka beranda dan memilih **Masuk Siswa**.
2. Pengguna memilih kelas dan memasukkan PIN, lalu memilih **kelompok aktif**.
3. Pengguna memilih barang/jasa dan memasukkan jumlah; total dihitung otomatis.
4. Pengguna menyelesaikan pembayaran tunai atau mengonfirmasi QRIS.
5. Sistem menyimpan transaksi, menampilkan struk digital, dan menampilkan lagi transaksi di riwayat/rekap setelah halaman dimuat ulang.

## 5. Di luar cakupan prototipe challenge

- Pre-order (PO), antrean pesanan, dan pengambilan sesuai jadwal.
- Stok **bahan mentah**, resep produksi, dan pengurangan bahan secara otomatis.
- Diskon/promosi otomatis serta perhitungan pajak otomatis.
- Integrasi QRIS/payment gateway, konfirmasi bank otomatis, dan refund transfer otomatis.
- Autentikasi aman berbasis server, akun individu, serta sinkronisasi data antarpengguna/HP secara real-time.
- Sistem akuntansi penuh: laporan posisi kas lintas perangkat, audit multi-pengguna, pembelian persediaan terintegrasi, pengembalian modal otomatis, kontribusi laba ke kas kelas, dan pembukuan yang menggantikan dokumen resmi sekolah.
- Penilaian kokurikuler per individu, K3/5R digital, customer feedback, dan seluruh proses lima fase sebagai modul lengkap.
- Integrasi alat IoT atau perangkat keras kasir dan pencetakan struk menggunakan printer khusus.

## 6. Aturan bisnis dan perhitungan

| ID | Aturan |
|---|---|
| B01 | Ada **7 kelas**, masing-masing memiliki **3 kelompok**. Setiap data produk, transaksi, modal, dan pengeluaran selalu terkait kelas serta kelompok pemilik. |
| B02 | Akses siswa hanya untuk kelas dari PIN yang benar; guru/koordinator baca-saja untuk semua kelas. PIN browser hanya simulasi hak akses, bukan jaminan keamanan. |
| B03 | Nama produk wajib diisi; harga jual standar adalah bilangan bulat rupiah **lebih dari 0**; HPP adalah bilangan bulat rupiah **minimal 0**. |
| B04 | Harga jasa bisa disesuaikan per transaksi menjadi bilangan bulat rupiah **lebih dari 0**; harga barang memakai katalog. Harga/HPP transaksi lama tidak berubah setelah katalog diedit. |
| B05 | Jumlah pembelian per produk/jasa adalah bilangan bulat **1–99**, termasuk setelah menambahkan produk yang sama berulang kali. Untuk barang, jumlah tidak boleh melampaui stok. |
| B06 | Subtotal item = `harga jual saat transaksi × jumlah`; **total transaksi = jumlah seluruh subtotal item**. Tidak ada diskon/pajak otomatis. |
| B07 | Tunai: `uang_diterima >= total`; `kembalian = uang_diterima − total`. Uang kurang, kosong, negatif, pecahan rupiah, atau bukan angka valid ditolak. |
| B08 | QRIS: transaksi hanya berhasil setelah konfirmasi manual oleh petugas. Metode pembayaran dan waktu dicatat. |
| B09 | Transaksi berhasil ditulis sekali saja (tidak ganda karena ketuk tombol berulang); mengurangi stok barang satu kali dan menambah omzet sesuai total. |
| B10 | Pembatalan membutuhkan alasan; transaksi disimpan dengan status Dibatalkan, stok dikembalikan satu kali, omzet dikurangi melalui pengecualian transaksi batal, dan pembatalan berulang ditolak. |
| B11 | Refund manual mempunyai status Belum Dikembalikan/Sudah Dikembalikan; status tidak memulihkan omzet transaksi yang dibatalkan. Refund tertunda dilaporkan terpisah. |
| B12 | Modal awal setiap kelompok bilangan bulat **Rp0–Rp250.000**, dicatat terpisah dan tidak ikut penjumlahan omzet. |
| B13 | **Omzet kelompok = jumlah total transaksi berstatus berhasil**, tidak termasuk transaksi batal; **omzet kelas = penjumlahan omzet tiga kelompok kelas tersebut**. |
| B14 | **HPP terjual = jumlah (HPP saat transaksi × jumlah)** dari item pada transaksi berhasil. |
| B15 | **Laba kotor = omzet − HPP terjual**; **laba bersih = laba kotor − biaya operasional**. Biaya operasional disimpan menurut kelompok dan tanggal, dengan nilai bilangan bulat rupiah lebih dari 0. Pembelian bahan yang sudah masuk HPP tidak otomatis dihitung lagi sebagai biaya operasional. |
| B16 | Rekap pemasukan tunai dan QRIS dihitung terpisah dari transaksi berhasil; nilainya tidak mencakup transaksi yang dibatalkan. Rekap pemasukan bukan saldo kas fisik atau bukti dana QRIS benar-benar masuk. |
| B17 | Leaderboard guru berdasarkan omzet kumulatif kelas tertinggi ke terendah; omzet sama mendapat peringkat sama. Peringkat bukan nilai rapor siswa. |
| B18 | Semua data proyek dipertahankan setelah refresh pada browser/profil yang sama melalui `localStorage`, selama penyimpanan browser belum dibersihkan. |
| B19 | PIN demonstrasi dan data demo tidak boleh berupa kredensial, data pribadi, atau transaksi riil sekolah. |

**Batas perhitungan:** seluruh nominal transaksi disimpan sebagai bilangan bulat rupiah dan diperiksa sebagai angka aman. Nilai uang dan kuantitas yang tidak valid harus menghasilkan pesan kesalahan, bukan `NaN`, nilai negatif tak sengaja, atau transaksi tersimpan.

## 7. Data yang disimpan

| Data | Contoh bentuk isi | Penyimpanan |
|---|---|---|
| Identitas kelas | XI ELIN 1 | `localStorage` (daftar awal aplikasi) |
| Identitas kelompok | XI ELIN 1 — Kelompok 2 | `localStorage` |
| Katalog | Produk makanan/jasa, jenis, harga, HPP, status | `localStorage` |
| Stok barang jadi | Kuantitas tersedia per produk | `localStorage` |
| Modal awal | Nominal modal per kelompok | `localStorage` |
| Pengeluaran operasional | Tanggal, kelompok, keterangan, nominal | `localStorage` |
| Transaksi | ID, tanggal/jam, kelas, kelompok, metode, status, item dan snapshot harga/HPP | `localStorage` |
| Pembayaran tunai | Total, uang diterima, kembalian | `localStorage` |
| Pembayaran QRIS | Total, metode, konfirmasi manual | `localStorage` |
| Pembatalan/refund | Alasan, waktu pembatalan, status refund | `localStorage` |
| Status data simulasi | Penanda dan identitas contoh agar tidak dimuat ganda | `localStorage` |

Data kelas dan produk contoh bersifat fiktif. Aplikasi tidak meminta nomor HP pembeli, alamat pelanggan, rekening bank, atau data pribadi siswa untuk melakukan transaksi.

## 8. Kriteria "selesai" (dapat diuji Ya/Tidak)

Kriteria berikut adalah target penerimaan; **bukan pernyataan bahwa aplikasi sudah dibangun atau lolos tes**.

1. Landing page tampil sebelum login dan menjelaskan program PERWIRA.
2. Terdapat akses siswa dengan PIN kelas dan akses pengelola dengan PIN khusus; PIN salah ditolak.
3. Siswa yang login hanya dapat melihat data/omzet kelasnya, dan dapat memilih serta mengelola tiga kelompok di kelas itu.
4. Pengelola dapat melihat seluruh tujuh kelas, tetapi tidak memiliki kontrol ubah/tambah/batal transaksi.
5. Tiap kelompok dapat menambah/mengubah katalog barang atau jasa dan produknya tidak bercampur dengan kelompok lain.
6. Input produk dengan nama kosong, harga tidak valid, atau HPP negatif ditolak dengan pesan jelas.
7. Stok barang jadi bertambah ketika dicatat dan berkurang setelah transaksi berhasil, bukan sebelum konfirmasi.
8. Penjualan barang lebih besar dari stok ditolak; jasa tetap bisa ditransaksikan tanpa stok barang.
9. Jumlah nol, pecahan, negatif, atau di atas 99 ditolak; jumlah berulang tetap dibatasi 99.
10. Harga jasa dapat disesuaikan dalam transaksi tanpa mengubah harga katalog dan riwayat lama.
11. Keranjang menampilkan total per item serta total akhir yang benar, tanpa diskon/pajak otomatis.
12. Pembayaran tunai kurang dari total ditolak; pembayaran cukup menghitung kembalian dengan benar.
13. QRIS yang belum dikonfirmasi tidak tersimpan sebagai transaksi berhasil.
14. Transaksi berhasil menghasilkan struk dengan rincian, nomor unik, metode pembayaran, serta informasi kelas/kelompok.
15. Struk dan riwayat transaksi lama tetap dapat dibuka setelah refresh browser yang sama.
16. Transaksi batal mensyaratkan alasan; status tetap tersimpan dan stok/omzet terkoreksi satu kali.
17. Status pengembalian uang Belum/Sudah Dikembalikan dapat dicatat dan riwayatnya tetap ada.
18. Modal awal lebih dari Rp250.000 ditolak; modal tidak termasuk omzet atau laba.
19. HPP terjual, biaya operasional, laba kotor, dan laba bersih dihitung dengan rumus yang ditetapkan.
20. Omzet dan pemasukan tunai/QRIS dapat direkap per kelompok serta total kelas sesuai hak akses.
21. Guru dapat melihat leaderboard tujuh kelas berdasarkan akumulasi omzet dan peringkat yang benar.
22. Data demo produk dan transaksi dapat dimuat secara sengaja, berlabel simulasi, tanpa menggandakan transaksi contoh.
23. Alur inti berjalan di layar HP dan desktop tanpa kendala gulir horizontal yang menghalangi transaksi.
24. Seluruh kriteria numerik telah memiliki kasus uji dengan **hasil yang diharapkan dihitung serta diverifikasi sendiri oleh anggota tim** sebelum coding, termasuk input salah dan nilai batas.
25. Website dapat dijalankan pada komputer bersih dengan mengikuti langkah README dan bukti pengujian disimpan di repositori.

### Kriteria tambahan Tugas 3 — Change Request (dikerjakan setelah Checkpoint 2)

1. Halaman rekap mempunyai pencarian langsung yang tidak membedakan huruf besar/kecil.
2. Ada filter status/kategori atau rentang tanggal; pencarian dan filter dapat digunakan bersamaan.
3. Pencarian atau filter tanpa hasil menampilkan pesan persis **"Data tidak ditemukan"**.
4. Tersedia tombol **Unduh CSV** yang mengunduh hanya data yang sedang ditampilkan menurut pencarian dan filter.
5. CSV memiliki header kolom; angka menggunakan nilai mentah tanpa `Rp` dan tanpa pemisah ribuan, serta dapat dibuka di Excel.
6. Laporan harian, rentang tanggal, dan kumulatif berfungsi pada hasil akhir sesuai hak akses pengguna.
7. Semua kasus uji sebelum Change Request tetap lulus sesudah perubahan kode.

Analisis dampak di `docs/analisis-change-request.md` harus dibuat dan **di-commit sebelum perubahan kode**, sesuai aturan challenge.

## 9. Strategi teknis dan batasan kejujuran produk

- Teknologi yang direncanakan: HTML, CSS, dan JavaScript; penyimpanan `localStorage`; pengujian otomatis JavaScript dengan Node.js. Website tidak memerlukan hosting online.
- Fokus desain **mobile-first** sesuai wawancara lapangan. Uji dilakukan juga pada lebar layar HP, input salah, dan nilai batas.
- Buat fungsi perhitungan dan validasi terpisah dari antarmuka agar dapat diuji tanpa mengandalkan tampilan.
- Pengerjaan bertahap per langkah/prompt; hasil diperiksa oleh tim. Catat log prompt, pengujian, kesalahan AI, review, serta commit sesuai ketentuan.
- Riwayat transaksi adalah catatan prototipe pada satu browser, bukan sistem akuntansi atau bukti pembayaran QRIS yang terverifikasi bank.
- Data demo boleh dilihat juri; jangan menaruh PIN asli, password, token, API key, data pribadi pelanggan, atau transaksi nyata pada repositori GitHub publik.
- **Checkpoint 1** dilakukan setelah spesifikasi, kasus uji beserta hasil yang diharapkan dari perhitungan tim, dan rencana kerja selesai; belum boleh ada kode website sebelum Checkpoint 1. **Checkpoint 2** menandai versi pertama alur inti yang berjalan. Fitur pencarian/filter/CSV baru diimplementasikan setelah Checkpoint 2.

## 10. Sumber kebutuhan

1. Wawancara langsung dengan siswa petugas PERWIRA, Jumat 9 Oktober 2026, saat operasional lapak sekolah; jawaban dirangkum pada Bagian 3.
2. **Grand Design Program Kokurikuler PERWIRA (Pekan Berwirausaha), Kelas XI SMKN 8 Tangerang, Tahun Pelajaran 2026/2027** — pengelompokan usaha, keuangan, fase program, serta Business Leaderboard.
3. **Lembar Challenge Peserta: Vibe Engineering — Sayembara STEAMpreneur, Direktorat SMK** — spesifikasi minimum, urutan checkpoint, kewajiban pengujian, dokumentasi, dan Change Request.
4. Keputusan rancangan Tim SOLARIS dalam pembahasan kebutuhan bersama pembimbing: prototipe lokal, PIN kelas dan pengelola, kasir barang/jasa, QRIS manual, stok produk jadi, pembatalan/refund manual, modal/HPP/biaya/laba, struk, dan data simulasi.

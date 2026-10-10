# 02 — Rencana Kerja PERWIRA Digital

**Tim:** SOLARIS — *One Ecosystem, Endless Possibilities*  
**Produk:** PERWIRA Digital — Sistem Kasir dan Pencatatan Usaha Siswa  
**Sekolah:** SMKN 8 Tangerang  
**Anggota:** Dafa Teger Alrasya (XI MK 1), Alif Mulyana (XI MK 1), Zaskia Aulia Putri Sheprida (XI ELIN 2)  
**Pembimbing:** Andi Suhandi, S.Kom., MT.  
**Repositori:** https://github.com/dafategaralrasya/steampreneur-solaris  
**Batas akhir resmi:** Kamis, 15 Oktober 2026 pukul 23.59 WIB  
**Acuan:** `docs/01-spesifikasi.md` yang telah disetujui tim; Grand Design PERWIRA; Lembar Challenge Peserta Vibe Engineering.

## 1. Tujuan dan strategi pelaksanaan

Membangun prototipe web PERWIRA Digital yang **mobile-first**, dapat dijalankan melalui browser, dan menyimpan data simulasi dalam `localStorage` pada satu browser/profil. Prototipe mendukung tujuh kelas XI (masing-masing tiga kelompok), katalog produk dan jasa, kasir, pembayaran tunai dan QRIS yang dikonfirmasi manual, struk serta riwayat transaksi, stok produk jadi, pencatatan modal/HPP/pengeluaran, pembatalan dan refund manual, laporan, serta leaderboard sesuai hak akses. Fitur pencarian, filter, dan unduh CSV **hanya dikembangkan setelah Checkpoint 2**.

Prinsip pengerjaan: **satu langkah kecil per prompt AI**, pahami perubahan, jalankan pemeriksaan, catat proses saat berlangsung, lalu commit dan push. Prioritaskan satu alur inti berfungsi penuh sebelum fitur pendukung. Setiap perubahan penting diperiksa oleh siswa, bukan diterima mentah-mentah dari AI.

Tiga siswa masih pemula dalam pemrograman; Zaskia baru mempelajari HTML dasar. Pembimbing mendampingi dan menjelaskan konsep dari awal hingga akhir, sedangkan siswa sendiri yang menjalankan perintah, menguji aplikasi, mencatat temuan, dan melakukan commit. Panduan diberikan secara bertahap agar peserta memahami hasilnya.

## 2. Pembagian peran

| Anggota | Fokus utama | Bukti kontribusi yang ditargetkan |
|---|---|---|
| **Dafa** | Navigator AI dan pelaksana pengembangan: merancang prompt bertahap, menjalankan kode, mengintegrasikan modul | Commit kode dan catatan prompt; dua penjelasan kode unik dengan bahasa sendiri |
| **Alif** | Penguji: menyusun kasus uji, menghitung sendiri nilai harapan, menguji batas dan kesalahan, membuat test otomatis, Bug Hunt | `04-kasus-uji.md`, bukti hasil uji, commit tes/perbaikan; dua penjelasan kode unik |
| **Zaskia** | Dokumentator dan pendamping antarmuka: mengisi log prompt saat bekerja, memeriksa HTML/CSS mobile, README, screenshot | Commit dokumen/antarmuka; dua penjelasan kode unik |
| **Andi Suhandi, S.Kom., MT.** | Pembimbing: pengarah kebutuhan, alur kerja, dan pemeriksa pemahaman siswa | Mendampingi dan memberi umpan balik; tidak menggantikan eksekusi maupun penjelasan siswa |

Peran utama tidak bersifat eksklusif. Ketiga siswa bergantian menavigasi AI, melakukan pengujian, membaca kode, serta berkontribusi di GitHub. Seluruh anggota wajib memahami perubahan yang mereka terima.

## 3. Waktu tersedia dan target harian

Sesi bersama berlangsung di laboratorium sekolah. Ketiga siswa hadir dan masing-masing memakai laptop; pembimbing mendampingi semua sesi.

| Hari/tanggal | Sesi tersedia | Target hasil utama |
|---|---|---|
| **Sabtu, 10 Oktober** | 12.00–20.00 | Persiapan awal: akun GitHub, instalasi awal, repositori publik, README awal dan `.gitignore`, undangan kolaborator. Kegiatan ini telah dilaporkan dilakukan; durasi aktual masing-masing kegiatan tidak dicatat dalam dokumen ini. |
| **Minggu, 11 Oktober** | 12.00–20.00 (8 jam) | Selesaikan spesifikasi/rencana/kasus uji dan **Checkpoint 1**, lalu bangun landasan website dan alur kasir paling sederhana. |
| **Senin, 12 Oktober** | 15.30–19.00 (3 jam 30 menit) | Tuntaskan transaksi → pembayaran → struk → riwayat, cek ulang lima syarat minimum, lalu **Checkpoint 2**; lanjutkan modul finansial prioritas bila waktu cukup. |
| **Selasa, 13 Oktober** | 15.30–19.00 (3 jam 30 menit) | Lengkapi fitur bisnis yang tersisa dengan pengujian; commit analisis Change Request sebelum modifikasi kode; mulai pencarian/filter/CSV. |
| **Rabu, 14 Oktober** | 15.30–19.00 (3 jam 30 menit) | Selesaikan Change Request dan regresi; jalankan **Bug Hunt 60 menit** saat siap; finalisasi review, penjelasan kode, README, bukti, dan push. |
| **Kamis, 15 Oktober** | Cadangan/pengumpulan; belum ada jam kerja tambahan yang dijanjikan | Verifikasi akhir branch `main`, pemeriksaan dari browser/clone lain, penyelesaian kanal pengumpulan; semua push wajib sebelum pukul 23.59 WIB. |

**Sisa sesi bersama terjadwal setelah Sabtu:** 18 jam 30 menit (Minggu–Rabu). Jam tersebut merupakan **waktu kalender tim**, bukan akumulasi jam kerja per anggota. Tugas independen dapat dijalankan secara paralel; tugas yang bergantung pada checkpoint tetap berurutan. Jadwal ketat dan berisiko karena fitur cukup banyak untuk siswa pemula: setiap sesi harus menggunakan target prioritas dan menyisakan waktu pengujian/dokumentasi.

## 4. Langkah kecil, estimasi, dan pemeriksaan selesai

Estimasi berikut adalah **perkiraan durasi setiap aktivitas**, bukan waktu nyata yang sudah dihabiskan. Status menunjukkan kondisi yang telah dilaporkan tim pada saat rencana disusun. **Waktu aktual dicatat setelah langkah dikerjakan**; jangan mengisi durasi/hasil secara perkiraan seolah sudah terjadi. Tugas yang mandiri dapat dikerjakan bersamaan oleh anggota berbeda. Usahakan satu langkah selesai dalam 30–60 menit; pecah lagi bila ternyata terlalu besar.

### A. Persiapan, spesifikasi, dan Checkpoint 1

| No. | Kegiatan | PIC | Cara memeriksa selesai | Estimasi | Status saat perencanaan |
|---:|---|---|---|---:|---|
| 01 | Persiapkan akun GitHub tiga siswa dan repositori publik; siapkan README awal serta `.gitignore`; undang kolaborator | Dafa, Zaskia | Repositori `steampreneur-solaris` dapat dibuka tanpa login, berkas tersedia, undangan telah diterima | 60 menit | **Sudah dilaporkan dilakukan**; histori awal perlu tetap dicatat apa adanya |
| 02 | Siapkan VS Code, Git, dan Node.js; verifikasi seluruh laptop yang akan dipakai | Dafa, Alif | `git --version`, `node -v`, `npm -v` berjalan, VS Code terbuka; laptop pertama telah diverifikasi | 45 menit | **Sebagian selesai**; laptop lain masih perlu dicek |
| 03 | Periksa dan commit spesifikasi final berdasarkan wawancara nyata dan Grand Design | Zaskia, pembimbing | `docs/01-spesifikasi.md` sesuai keputusan tim, tidak mengandung data pribadi narasumber | 30 menit | **Spesifikasi disetujui**, belum dikonfirmasi di-push |
| 04 | Verifikasi rencana kerja akhir dan pembagian tugas | Semua siswa | `docs/02-rencana.md` memuat estimasi, bukti penyelesaian, pembagian kerja, dan jadwal | 30 menit | Disusun untuk pengesahan tim |
| 05 | Siapkan kasus uji **sebelum coding**, mencakup nilai batas, input salah, dan hasil angka yang tim hitung sendiri | Alif, semua siswa | `docs/04-kasus-uji.md` lengkap; jawaban numerik diperiksa dengan kalkulator oleh siswa, bukan dibuat AI | 60 menit | Belum disahkan |
| 06 | Commit dokumen dan buat **Checkpoint 1** dengan pesan persis: `checkpoint: spesifikasi, kasus uji, dan rencana selesai` | Dafa | Semua dokumen berada di GitHub, commit checkpoint terlihat, **belum ada kode website sebelum checkpoint** | 30 menit | Belum dilakukan |

### B. Pembangunan alur inti sampai Checkpoint 2

| No. | Kegiatan | PIC | Cara memeriksa selesai | Estimasi | Status |
|---:|---|---|---|---:|---|
| 07 | Buat struktur proyek dan landing page PERWIRA yang nyaman di HP | Dafa, Zaskia | Beranda menjelaskan program dan memiliki tombol masuk ke ruang siswa/pengelola | 60 menit | Belum dimulai |
| 08 | Buat data awal tujuh kelas × tiga kelompok serta penyimpanan `localStorage` | Dafa, Alif | Ke-21 kelompok dapat dikenali; data tetap setelah refresh di browser yang sama | 45 menit | Belum dimulai |
| 09 | Bangun simulasi PIN per kelas dan pengelola; pilih kelompok aktif | Dafa | PIN salah ditolak; siswa hanya melihat kelasnya; pengelola membuka dashboard baca-saja | 60 menit | Belum dimulai |
| 10 | Buat katalog produk/jasa milik tiap kelompok beserta nama, kategori, harga, HPP, dan validasi | Dafa, Zaskia | Produk antar kelompok tidak bercampur; harga tidak valid/nama kosong ditolak | 60 menit | Belum dimulai |
| 11 | Bangun keranjang, jumlah 1–99, perhitungan subtotal/total, dan opsi harga jasa per transaksi | Dafa, Alif | Hasil sama dengan kasus uji yang dihitung tim; stok/jumlah tidak valid ditolak | 60 menit | Belum dimulai |
| 12 | Implementasikan pembayaran tunai dan QRIS konfirmasi manual | Dafa, Alif | Uang kurang ditolak; kembalian tepat; QRIS tanpa konfirmasi belum sukses | 60 menit | Belum dimulai |
| 13 | Simpan transaksi, tampilkan struk digital dan riwayat di `localStorage` | Dafa, Zaskia | Nomor unik, rincian transaksi, metode bayar, dan struk muncul kembali setelah refresh | 60 menit | Belum dimulai |
| 14 | Bangun daftar/rekap **dasar** transaksi kelompok dan omzet kelas sendiri, tanpa fitur pencarian/filter/CSV | Dafa | Rekap bersumber dari data tersimpan, terpisah per kelas dan kelompok | 45 menit | Belum dimulai |
| 15 | Jalankan kasus uji inti, tes tampilan HP, perbaiki error, buat dan push **Checkpoint 2** dengan pesan persis: `checkpoint: versi pertama alur inti berjalan` | Alif, semua siswa | Semua lima syarat minimum terpenuhi; kode berjalan mengikuti README awal; commit checkpoint ada | 60 menit | Belum dimulai |

### C. Fitur bisnis sesuai spesifikasi

| No. | Kegiatan | PIC | Cara memeriksa selesai | Estimasi | Status |
|---:|---|---|---|---:|---|
| 16 | Kelola stok barang jadi dan perubahan stok setelah transaksi berhasil; jasa tidak berstok | Dafa, Alif | Tidak bisa jual melampaui stok; stok tidak berkurang untuk transaksi gagal | 45 menit | Belum dimulai |
| 17 | Pencatatan modal awal Rp0–Rp250.000, HPP, dan pengeluaran operasional | Dafa, Zaskia | Input salah ditolak; modal tetap berbeda dari uang masuk/omzet | 60 menit | Belum dimulai |
| 18 | Hitung omzet, HPP terjual, laba kotor, laba bersih, tunai, dan QRIS terpisah | Alif, Dafa | Unit test sesuai hasil angka acuan tim; tidak menghitung modal sebagai laba | 60 menit | Belum dimulai |
| 19 | Pembatalan transaksi dengan alasan, koreksi stok/omzet sekali, status refund manual | Dafa, Alif | Transaksi tidak dihapus; alasan wajib; pembatalan ganda ditolak; refund tertunda ditandai | 60 menit | Belum dimulai |
| 20 | Rekap tiga kelompok sekelas; dashboard guru untuk 21 kelompok; leaderboard kelas, baca-saja | Dafa, Zaskia | Siswa tidak melihat kelas lain; guru melihat 7 kelas; omzet sama menghasilkan peringkat setara | 60 menit | Belum dimulai |
| 21 | Muat data simulasi berlabel dan aman dari duplikasi; uji ulang fitur keuangan, pembatalan, dan akses | Alif, semua siswa | Data contoh dapat dimuat; klik ulang tidak menggandakan; semua tes lama lulus | 60 menit | Belum dimulai |

### D. Change Request — **hanya setelah Checkpoint 2**

| No. | Kegiatan | PIC | Cara memeriksa selesai | Estimasi | Status |
|---:|---|---|---|---:|---|
| 22 | Analisis dampak fitur pencarian, filter, unduh CSV di `docs/analisis-change-request.md`, lalu **commit analisis dahulu** | Zaskia, Dafa | Commit analisis mendahului perubahan kode Change Request | 45 menit | Belum dimulai |
| 23 | Tambah kasus uji Change Request dengan hasil yang diharapkan | Alif | Uji mencakup pencarian tanpa beda huruf besar/kecil, kombinasi filter, kosong, CSV, regresi | 30 menit | Belum dimulai |
| 24 | Implementasikan pencarian dan filter (kategori/status/rentang tanggal) yang bisa digabung | Dafa | Hasil langsung berubah dan jika kosong muncul persis `Data tidak ditemukan`; akses data tetap benar | 60 menit | Belum dimulai |
| 25 | Implementasikan unduh CSV sesuai baris yang tampil dan perbaiki laporan per tanggal | Dafa, Zaskia | CSV memiliki header dan angka mentah tanpa `Rp`/pemisah ribuan; terbuka di Excel | 60 menit | Belum dimulai |
| 26 | Jalankan regresi semua kasus lama dan baru; revisi README, spesifikasi, bukti, lalu commit bertahap | Alif, semua siswa | Semua tes lulus dan screenshot/hasil tercatat | 60 menit | Belum dimulai |

### E. Bug Hunt, pemahaman kode, dokumentasi, dan final

| No. | Kegiatan | PIC | Cara memeriksa selesai | Estimasi | Status |
|---:|---|---|---|---:|---|
| 27 | Persiapkan lingkungan Bug Hunt dan mulai **hanya saat tim benar-benar siap** dengan commit `bughunt: kode asli`; temukan, tes, perbaiki dan catat tiap bug | Semua siswa | `bughunt-kasir/` berisi kode, commit terpisah per bug, test dan `catatan-bug.md`, semuanya dalam 60 menit sejak commit awal | **60 menit tetap** | **Belum dimulai; ZIP Bug Hunt jangan dibuka lebih awal** |
| 28 | Review kode dengan AI, nilai saran dan alasan diterima/ditolak, refactor terbatas dan tes ulang | Dafa, Alif | `docs/06-catatan-review.md` berisi keputusan nyata dan semua tes masih lulus | 45 menit | Belum dimulai |
| 29 | Tuliskan dua penjelasan bagian kode **berbeda untuk setiap siswa**, plus lima pertanyaan tim | Ketiga siswa | `docs/08-penjelasan-kode.md`: sedikitnya enam penjelasan spesifik, berbahasa siswa sendiri, lima jawaban bersama | 60 menit sesi khusus + pengisian bertahap | Belum dimulai |
| 30 | Lengkapi log prompt, kesalahan AI, bukti layar, refleksi, lisensi, dan README | Zaskia, semua siswa | `docs/03`, `05`, `07`, README, screenshot tersimpan; pencatatan dilakukan selama pengerjaan | 60 menit sesi final + selama pengerjaan | Belum dimulai |
| 31 | Uji dari clone/folder bersih dan audit repositori sebelum pengumpulan | Alif, Dafa | README benar-benar dapat diikuti, `node --test` berjalan bila digunakan, tanpa rahasia atau data asli | 45 menit | Belum dimulai |
| 32 | Push semua berkas ke `main`, pastikan kanal pengumpulan telah menerima URL repositori | Dafa, semua siswa | Semua berkas dan histori terlihat publik sebelum **15 Oktober 2026 23.59 WIB** | 30 menit | URL pengumpulan sedang diproses |

**Catatan estimasi:** Angka setiap langkah merupakan estimasi beban aktivitas dan dapat tumpang tindih antar siswa, bukan jumlah jam yang wajib dikerjakan secara berurutan. Jadwal harian pada Bagian 3 merupakan batas kapasitas sesi tim. Ketika aktivitas melewati alokasi, tim mendokumentasikan waktu nyata dan memprioritaskan kewajiban penilaian: Checkpoint 1/2, alur inti lengkap, pengujian, Change Request, Bug Hunt, dan penjelasan tiap anggota. Mengurangi fitur yang telah disepakati pada spesifikasi harus menjadi keputusan tim yang jelas dan direkam sebagai perubahan ruang lingkup; jangan diam-diam mengklaim fitur selesai.

## 5. Aturan pengujian dan dokumentasi selama bekerja

1. **Sebelum coding:** isi kasus uji, termasuk sedikitnya satu input salah dan satu nilai batas. Semua hasil angka yang diharapkan dihitung **sendiri oleh siswa**, boleh menggunakan kalkulator, dan diperiksa rekan. AI hanya membantu menyiapkan format/implementasi tes.
2. **Setiap langkah pengembangan:** batasi prompt ke satu tujuan, jalankan kode, bandingkan hasil dengan kasus uji, pahami kesalahan, lalu commit kecil berawalan `fitur:`, `tes:`, `perbaikan:`, `refactor:`, atau `dokumen:`.
3. **Catat saat kejadian:** rekam prompt penting di `03-log-prompt.md`, pengujian aktual di `04-kasus-uji.md`, kesalahan AI di `05-kesalahan-ai.md`, review di `06-catatan-review.md`, dan refleksi di `07-refleksi.md`. Dokumentasi bukan cerita yang dibuat ulang di akhir.
4. **Hak akses/PIN:** PIN demonstrasi di browser **tidak benar-benar melindungi rahasia**. Tidak ada password sungguhan, token, API key, data pelanggan, atau transaksi nyata dalam kode/repo publik.
5. **Tugas 4:** tiap siswa menjelaskan dua fungsi/file yang berbeda, contoh input-output, dan cara menangani input salah/kosong menggunakan bahasa sendiri. Jawab lima pertanyaan tim mengacu kode yang benar-benar dibuat.
6. **Bug Hunt:** jendela 60 menit dihitung dari commit `bughunt: kode asli`, bukan sejak membuka aplikasi. Commit awal Bug Hunt harus dibuat paling lambat 60 menit sebelum batas akhir pengumpulan. Jangan membuka ZIP/kode sebelum siap; commit setiap perbaikan bug secara terpisah.
7. **Jangan mengubah riwayat commit** untuk membuat kesalahan awal tampak tidak terjadi. Riwayat GitHub merupakan bukti proses yang dinilai.

## 6. Risiko, tindakan pengendalian, dan bukti akhir

| Risiko | Tindakan |
|---|---|
| Waktu Minggu–Rabu tinggal 18,5 jam bersama sedangkan aplikasi cukup luas | Kerjakan paralel sesuai peran, selesaikan Checkpoint 1/2 lebih dulu, ukur waktu nyata, dan evaluasi cakupan setiap akhir sesi |
| Tiga siswa belum berpengalaman dalam kode | Pembimbing memberikan penjelasan singkat sebelum dan sesudah prompt; siswa mencoba sendiri; pilih HTML/CSS/JavaScript tanpa framework berat |
| Lupa menguji atau mencatat proses karena mengejar tampilan | Alif memegang daftar kasus uji dan Zaskia memperbarui log sejak awal; jangan meloloskan fitur tanpa bukti |
| Kesalahan angka kasir dan akuntansi | Tes hasil perhitungan tim, termasuk uang kurang, stok habis, harga jasa berubah, refund, batas modal, dan transaksi dibatalkan |
| Data antarkelas tercampur atau PIN disangka aman | Semua data diberi `classId`/`groupId`, antarmuka membatasi tampilan; tulis terang-terangan bahwa ini hanya simulasi lokal |
| Bug Hunt menghabiskan waktu tanpa hasil | Sediakan 60 menit tanpa gangguan, siapkan Node.js/Git dan pembagian tugas sebelum commit awal; perbaiki bug satu per satu |
| Repositori tidak bisa dijalankan juri | Pastikan README cara clone-jalankan-tes dan lakukan percobaan clone bersih |
| Siswa tidak dapat menjelaskan kode | Mulai menulis penjelasan sesudah modul dipahami, jangan menunggu hari akhir |

**Bukti akhir yang harus tersedia di repositori:** README lengkap; `.gitignore`; `docs/01-spesifikasi.md`, `02-rencana.md`, `03-log-prompt.md`, `04-kasus-uji.md`, `05-kesalahan-ai.md`, `06-catatan-review.md`, `07-refleksi.md`, `08-penjelasan-kode.md`, `analisis-change-request.md`, folder `docs/bukti/`, source website dan unit test, serta `bughunt-kasir/` berikut test dan `catatan-bug.md`. Hasil akhir ada di `main` dan sudah di-push sebelum tenggat.


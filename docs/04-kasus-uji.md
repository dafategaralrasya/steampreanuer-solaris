# 04 — Kasus Uji SOLARIS Smart Irrigation Simulator

**Tim:** SOLARIS — *One Ecosystem. Endless Possibilities.*  
**Sekolah:** SMKN 8 Tangerang  
**Produk:** Website pengenalan SOLARIS dan simulator Smart Irrigation berbasis browser  
**Dasar pengujian:** `docs/01-spesifikasi.md`, proposal SOLARIS STEAMpreneur 2026, dan Lembar Challenge Vibe Engineering  
**Tanggal penetapan hasil harapan:** 11 Oktober 2026  
**Perangkat virtual:** Device 01 — Kebun Depan; Device 02 — Kebun Belakang  
**Status dokumen:** Kasus uji dan hasil yang diharapkan telah disusun sebelum implementasi website versi SOLARIS; hasil aktual aplikasi belum diuji.

## 1. Tujuan dan cakupan

Pengujian bertujuan memastikan satu alur inti SOLARIS benar-benar berjalan, mulai dari pengenalan produk, pemilihan perangkat, pengisian parameter, perhitungan hasil, penyimpanan otomatis, hingga tampilan riwayat. Pengujian juga memeriksa dua perangkat yang terpisah, batas validasi, pengendalian otomatis dengan *hysteresis*, mode Manual, penyimpanan `localStorage`, dan pesan kegagalan yang dapat dipahami.

Kasus uji ditetapkan berdasarkan spesifikasi yang disepakati tim. Hasil yang diharapkan untuk KT-01 sampai KT-10 dihitung dan disampaikan anggota tim sebelum implementasi; seluruhnya telah diperiksa terhadap aturan yang berlaku. Nilai hasil pengujian aktual hanya dapat dicatat setelah kode dijalankan. Status *belum diuji* **bukan** berarti lulus.

Website challenge menggunakan data **simulasi**. Tidak ada pembacaan sensor, kendali ESP32, pompa fisik, atau sinkronisasi lintas perangkat.

## 2. Aturan bisnis acuan

| Kode | Aturan yang diuji |
|---|---|
| B01 | Dua perangkat virtual mempunyai pengaturan, mode, status, kelembaban terakhir, dan riwayat masing-masing. |
| B02 | Pengunjung masuk dari Landing Page melalui **Coba Simulasi** tanpa login. |
| B03 | Nilai awal setiap perangkat: threshold bawah 30%, threshold atas 70%, Mode Otomatis, pompa OFF; belum ada pembacaan yang tersimpan. |
| B04 | Kelembaban dan kedua threshold berupa bilangan bulat; kelembaban 0–100, batas bawah 0–99, batas atas 1–100, dan batas bawah harus lebih kecil dari batas atas. |
| B05 | Input tidak valid ditolak dengan pesan jelas, tanpa mengubah data atau menambah riwayat. |
| B06 | Mode Otomatis: kelembaban < batas bawah → ON; kelembaban >= batas atas → OFF; selebihnya mempertahankan status otomatis sebelumnya. |
| B07 | Mode Manual mengizinkan ON atau OFF pada pompa virtual tanpa mengikuti threshold. |
| B08 | Kembali dari Manual ke Otomatis: mulai evaluasi dari OFF lalu nilai pembacaan valid terakhir, jika ada. |
| B09 | Selisih menuju batas atas = `max(0, threshold_atas - kelembaban)`, dalam **poin persentase**. |
| B10 | Satu pembacaan valid yang dijalankan menghasilkan tepat satu entri pembacaan yang otomatis tersimpan. |
| B11 | Pergantian mode atau kendali Manual yang benar-benar dilakukan dicatat sebagai jenis peristiwa berbeda dari pembacaan. |
| B12 | Data tetap ada setelah halaman diperbarui pada browser, profil, dan asal situs yang sama; refresh tidak menambah entri. |
| B13 | Saat `localStorage` gagal, antarmuka menampilkan kegagalan dan tidak menyatakan data berhasil disimpan. |
| B14 | Halaman Riwayat menampilkan kembali data kedua perangkat serta membedakan jenis peristiwa. |
| B15 | Semua keluaran berlabel simulasi; tidak diklaim berasal dari sensor atau pompa nyata. |
| B16 | Pencarian, filter, dan unduhan CSV **belum** diterapkan sebelum Checkpoint 2 dan commit analisis Change Request. |

**Aturan batas:** nilai tepat pada threshold **bawah** masuk daerah mempertahankan status; nilai tepat pada threshold **atas** mematikan pompa. Contoh: dengan batas 30%/70%, angka 30% tidak otomatis mengaktifkan pompa yang sebelumnya OFF.

## 3. Kasus uji perhitungan inti — KT-01 sampai KT-10

Semua nilai pada kolom hasil harapan berikut telah dihitung oleh siswa dan dikonfirmasi sebelum implementasi. Setiap rangkaian yang disebut *lanjutan* memakai kondisi hasil kasus sebelumnya, bukan mereset status pompa.

| ID | Kondisi dan urutan pengujian | Hasil yang diharapkan dari perhitungan siswa | Hasil aktual | Status |
|---|---|---|---|---|
| **KT-01** | Kebun Depan; awal OFF, Otomatis; kelembaban 25%; batas 30%/70%. | **ON; selisih 45 poin**. | Belum diuji | Belum diuji |
| **KT-02** | Lanjutan KT-01, kelembaban 30%, batas 30%/70%. | **ON; selisih 40 poin**. Status ON dipertahankan saat tepat batas bawah. | Belum diuji | Belum diuji |
| **KT-03** | Lanjutan KT-02, kelembaban 50%, batas 30%/70%. | **ON; selisih 20 poin**. Status ON dipertahankan di zona tengah. | Belum diuji | Belum diuji |
| **KT-04** | Lanjutan KT-03, kelembaban 70%, batas 30%/70%. | **OFF; selisih 0 poin**. | Belum diuji | Belum diuji |
| **KT-05** | Lanjutan KT-04, kelembaban 50%, batas 30%/70%. | **OFF; selisih 20 poin**. Status OFF dipertahankan di zona tengah. | Belum diuji | Belum diuji |
| **KT-06** | Lanjutan KT-05, kelembaban 100%, batas 30%/70%. | **OFF; selisih 0 poin**. | Belum diuji | Belum diuji |
| **KT-07** | Kondisi awal OFF, Otomatis; kelembaban 0%; batas 0%/100%. | **OFF; selisih 100 poin**. Kelembaban sama dengan batas bawah, tidak kurang darinya. | Belum diuji | Belum diuji |
| **KT-08** | Kondisi awal OFF, Otomatis; kelembaban 0%; batas 1%/100%. | **ON; selisih 100 poin**. | Belum diuji | Belum diuji |
| **KT-09** | Kebun Belakang; kondisi awal OFF, Otomatis; kelembaban 15%; batas 20%/60%. | **ON; selisih 45 poin**. | Belum diuji | Belum diuji |
| **KT-10** | Kebun Depan memiliki pembacaan valid terakhir 50% dan batas 30%/70%; Mode Manual ON, kemudian beralih ke Otomatis. | **OFF; selisih 20 poin**. Dasar evaluasi Otomatis direset ke OFF. | Belum diuji | Belum diuji |

**Catatan pengujian berurutan:** KT-01–KT-06 adalah satu rangkaian kondisi hysteresis. KT-07, KT-08, dan KT-09 menggunakan kondisi awal tersendiri. KT-10 memerlukan persiapan keadaan Manual ON dan pembacaan valid terakhir 50%. Saat menjalankan masing-masing rangkaian, penguji memakai data awal yang sesuai agar hasil tidak dipengaruhi percobaan sebelumnya.

### Penjelasan dua kasus batas penting

**KT-07:** batas bawah 0%; pembacaan 0% **bukan** kurang dari 0%. Karena pompa awal OFF dan pembacaan masih di zona tengah (`0 <= kelembaban < 100`), status tetap OFF. Selisih `100 − 0 = 100` poin.

**KT-10:** saat kembali dari Manual ke Otomatis, status awal evaluasi OFF. Dengan pembacaan valid terakhir 50% di antara threshold 30% dan 70%, status tetap OFF. Selisih `70 − 50 = 20` poin.

## 4. Kasus uji validasi formulir

**Prasyarat bersama:** pilih Kebun Depan pada Mode Otomatis dengan threshold 30%/70%, dan catat kondisi/riwayat sebelum pengujian. Untuk input yang ditolak, kondisi serta jumlah entri setelah pengujian harus **identik** dengan sebelum pengujian. Jika kasus valid memakai nilai baru, pengujian berikutnya dimulai dengan kondisi yang telah ditetapkan kembali.

| ID | Input atau tindakan | Hasil yang diharapkan | Hasil aktual | Status |
|---|---|---|---|---|
| **VL-01** | Kelembaban dikosongkan; batas 30%/70%. | Ditolak; muncul pesan kelembaban wajib diisi; tidak ada simulasi atau entri baru. | Belum diuji | Belum diuji |
| **VL-02** | Kelembaban berisi spasi saja. | Ditolak sebagai input kosong; tidak ada perubahan data. | Belum diuji | Belum diuji |
| **VL-03** | Kelembaban `abc`. | Ditolak; pesan angka tidak valid; tidak ada perubahan data. | Belum diuji | Belum diuji |
| **VL-04** | Kelembaban `-1`. | Ditolak; nilai di luar rentang 0–100. | Belum diuji | Belum diuji |
| **VL-05** | Kelembaban `1.5`. | Ditolak; kelembaban wajib bilangan bulat. | Belum diuji | Belum diuji |
| **VL-06** | Kelembaban `101`. | Ditolak; nilai di atas batas maksimum. | Belum diuji | Belum diuji |
| **VL-07** | Kelembaban `0`, batas 30%/70%, awal OFF. | Diterima; pompa ON; selisih 70 poin; satu entri pembacaan baru. | Belum diuji | Belum diuji |
| **VL-08** | Kelembaban `100`, batas 30%/70%, awal OFF. | Diterima; pompa OFF; selisih 0 poin; satu entri pembacaan baru. | Belum diuji | Belum diuji |
| **VL-09** | Threshold bawah kosong; kelembaban 25, batas atas 70. | Ditolak; pesan batas bawah wajib diisi; konfigurasi lama tidak tertimpa. | Belum diuji | Belum diuji |
| **VL-10** | Threshold atas kosong; kelembaban 25, batas bawah 30. | Ditolak; pesan batas atas wajib diisi; konfigurasi lama tidak tertimpa. | Belum diuji | Belum diuji |
| **VL-11** | Threshold bawah `100` dan atas `100`. | Ditolak; batas bawah maksimum 99 dan tidak lebih kecil dari batas atas. | Belum diuji | Belum diuji |
| **VL-12** | Threshold bawah `70` dan atas `30`. | Ditolak; batas bawah harus lebih kecil dari batas atas. | Belum diuji | Belum diuji |
| **VL-13** | Threshold bawah `30` dan atas `30`. | Ditolak; threshold tidak boleh sama. | Belum diuji | Belum diuji |
| **VL-14** | Threshold bawah `0`, atas `1`, kelembaban `0`, awal OFF. | Diterima; pompa OFF karena tepat batas bawah; selisih 1 poin; satu entri. | Belum diuji | Belum diuji |
| **VL-15** | Threshold bawah `99`, atas `100`, kelembaban `98`, awal OFF. | Diterima; pompa ON; selisih 2 poin; satu entri. | Belum diuji | Belum diuji |
| **VL-16** | Threshold bawah `30.5`, atas `70`, kelembaban `25`. | Ditolak; threshold wajib bilangan bulat. | Belum diuji | Belum diuji |
| **VL-17** | Threshold bawah `30`, atas `101`, kelembaban `25`. | Ditolak; batas atas tidak boleh lebih dari 100. | Belum diuji | Belum diuji |
| **VL-18** | Threshold bawah `-1`, atas `70`, kelembaban `25`. | Ditolak; batas bawah tidak boleh negatif. | Belum diuji | Belum diuji |

## 5. Kasus uji Mode Otomatis, Manual, dan peralihan

**Prasyarat:** gunakan satu perangkat yang kondisinya diketahui; pemeriksaan jenis entri riwayat dilakukan bersamaan dengan perubahan status.

| ID | Langkah dan kondisi | Hasil yang diharapkan | Hasil aktual | Status |
|---|---|---|---|---|
| **KM-01** | Kebun Depan Mode Otomatis, kelembaban 20%, batas 30%/70%, awal OFF; jalankan simulasi. | Pompa ON; selisih 50 poin; satu entri jenis pembacaan. | Belum diuji | Belum diuji |
| **KM-02** | Setelah KM-01, ubah ke Mode Manual dan pilih OFF. | Mode Manual; status virtual OFF meski pembacaan terakhir 20%; perubahan kontrol tercatat, tanpa menciptakan pembacaan sensor baru. | Belum diuji | Belum diuji |
| **KM-03** | Dalam Mode Manual, pengguna mengubah status menjadi ON. | Status virtual ON; riwayat mencatat peristiwa kendali Manual. | Belum diuji | Belum diuji |
| **KM-04** | Dalam Mode Manual ON, masukkan kelembaban valid 85% dengan batas 30%/70%, jalankan simulasi. | Status pompa tetap ON mengikuti pilihan Manual; selisih 0 poin; pembacaan 85% tercatat. | Belum diuji | Belum diuji |
| **KM-05** | Setelah KM-04, beralih kembali ke Mode Otomatis. | Status berubah menjadi OFF, karena pembacaan valid terakhir 85% >= batas atas; peristiwa perpindahan mode tercatat. | Belum diuji | Belum diuji |
| **KM-06** | Mode Manual ON dengan pembacaan valid terakhir 25% dan batas 30%/70%; beralih ke Otomatis. | Pompa ON setelah evaluasi ulang karena 25% < 30%; selisih pembacaan terakhir 45 poin. | Belum diuji | Belum diuji |
| **KM-07** | Mode Manual ON, belum ada pembacaan kelembaban valid; beralih ke Otomatis. | Pompa OFF; tidak ada pembacaan yang direkayasa atau selisih numerik fiktif; perpindahan mode tercatat. | Belum diuji | Belum diuji |
| **KM-08** | Saat diminta memilih status Manual, pengguna membatalkan/tidak memberikan pilihan ON atau OFF. | Tidak terjadi perubahan mode, status, atau riwayat. | Belum diuji | Belum diuji |
| **KM-09** | Dalam Mode Otomatis, pembacaan 25% → 50% → 70% → 50% dengan batas 30%/70%. | Urutan status ON → ON → OFF → OFF; selisih 45 → 20 → 0 → 20 poin. | Belum diuji | Belum diuji |

## 6. Kasus uji dua perangkat, penyimpanan, dan riwayat

| ID | Langkah dan kondisi | Hasil yang diharapkan | Hasil aktual | Status |
|---|---|---|---|---|
| **DP-01** | Jalankan Kebun Depan pada 25%, batas 30%/70%; kemudian pilih Kebun Belakang yang belum digunakan. | Kebun Depan ON, selisih 45; Kebun Belakang masih awal OFF, batas 30%/70%, tanpa pembacaan/riwayat baru. | Belum diuji | Belum diuji |
| **DP-02** | Ubah Kebun Belakang menjadi batas 20%/60%, jalankan kelembaban 15%. | Kebun Belakang ON, selisih 45; pengaturan Kebun Depan tetap 30%/70%. | Belum diuji | Belum diuji |
| **DP-03** | Atur Kebun Depan ke Manual OFF, sementara Kebun Belakang Otomatis ON. | Mode dan status kedua perangkat tetap berbeda; perubahan Kebun Depan tidak memengaruhi Kebun Belakang. | Belum diuji | Belum diuji |
| **DP-04** | Tampilkan riwayat setelah satu pembacaan masing-masing perangkat. | Ada dua entri pembacaan dengan identitas perangkat masing-masing; tidak tertukar atau berlipat. | Belum diuji | Belum diuji |
| **PS-01** | Pada perangkat awal tanpa riwayat, jalankan satu simulasi valid satu kali. | Jumlah entri pembacaan bertambah tepat satu; hasil dan waktu dicatat. | Belum diuji | Belum diuji |
| **PS-02** | Setelah PS-01, buka Riwayat lalu refresh halaman. | Jumlah entri tetap sama; tidak ada duplikasi akibat refresh. | Belum diuji | Belum diuji |
| **PS-03** | Tutup dan buka kembali halaman pada browser/profil serta asal situs yang sama. | Dua perangkat, threshold, mode, status pompa, pembacaan terakhir, dan riwayat sama dengan data terakhir yang tersimpan. | Belum diuji | Belum diuji |
| **PS-04** | Buka entri pembacaan pada Riwayat. | Nama perangkat, tanggal-waktu, nilai kelembaban, dua threshold, mode, status pompa, dan selisih yang tersimpan dapat dibaca. | Belum diuji | Belum diuji |
| **PS-05** | Jalankan input salah setelah ada satu entri yang valid. | Muncul pesan kesalahan; jumlah riwayat, pengaturan, status, dan pembacaan terakhir tidak berubah. | Belum diuji | Belum diuji |
| **PS-06** | Masuk ke halaman Riwayat saat belum ada peristiwa tersimpan. | Ada pesan keadaan kosong yang jelas; tidak menampilkan riwayat contoh seolah-olah nyata. | Belum diuji | Belum diuji |
| **PS-07** | Periksa riwayat setelah pembacaan, pergantian mode, dan perintah Manual yang berhasil. | Jenis peristiwa dapat dibedakan; perintah kontrol tidak menambah entri pembacaan kelembaban palsu. | Belum diuji | Belum diuji |
| **PS-08** | Simulasikan kondisi akses/tulis `localStorage` ditolak pada lingkungan pengujian, kemudian lakukan tindakan penyimpanan. | Pesan kegagalan penyimpanan terlihat; aplikasi tidak mengklaim berhasil menyimpan dan tidak menampilkan hasil gagal sebagai data tersimpan. | Belum diuji | Belum diuji |
| **PS-09** | Gunakan browser atau profil yang berbeda dari tempat simulasi awal dilakukan. | Data tidak otomatis tersinkron; batasan ini dijelaskan secara jujur. | Belum diuji | Belum diuji |

## 7. Pengujian alur utama, tampilan, dan keamanan

| ID | Langkah dan kondisi | Hasil yang diharapkan | Hasil aktual | Status |
|---|---|---|---|---|
| **UI-01** | Buka halaman awal website. | Nama, slogan, logo SOLARIS, pengenalan platform ekosistem IoT, dan Smart Irrigation sebagai implementasi awal tersedia. | Belum diuji | Belum diuji |
| **UI-02** | Klik tombol **Coba Simulasi**. | Dashboard muncul tanpa registrasi atau login. | Belum diuji | Belum diuji |
| **UI-03** | Jalankan alur Landing Page → pilih perangkat → isi data → hitung hasil → lihat Riwayat. | Pengunjung dapat menyelesaikan rangkaian yang berfungsi; hasil bukan hanya tampilan statis. | Belum diuji | Belum diuji |
| **UI-04** | Ulangi alur pada ukuran layar HP dan desktop. | Form dapat dibaca dan digunakan, kontrol dapat diakses, serta tidak ada konten utama yang terpotong atau menghambat navigasi. | Belum diuji | Belum diuji |
| **UI-05** | Periksa tampilan Mode Otomatis/Manual, ON/OFF, dan peringatan. | Makna status dibedakan melalui teks, bukan bergantung pada warna saja. | Belum diuji | Belum diuji |
| **UI-06** | Periksa label dan keterangan data pada Landing Page, Dashboard, dan Riwayat. | Data dan pompa dinyatakan sebagai simulasi; tidak ada klaim pembacaan sensor real-time sungguhan. | Belum diuji | Belum diuji |
| **UI-07** | Periksa berkas dalam repositori publik dan petunjuk README. | Tidak ada password, API key, token asli, `.env`, kontak narasumber, atau rekaman wawancara. | Belum diuji | Belum diuji |
| **UI-08** | Ikuti panduan README setelah *clone* repositori ke folder baru. | Website dapat dijalankan dan pengujian dapat dilakukan sesuai langkah tertulis; versi alat dan sumber/lisensi dicantumkan. | Belum diuji | Belum diuji |

## 8. Rekap persiapan pengujian

| Aspek | Jumlah kasus | Status |
|---|---:|---|
| Perhitungan inti dan hysteresis (`KT`) | 10 | Hasil harapan dihitung siswa dan telah diperiksa; belum diuji pada website |
| Validasi formulir (`VL`) | 18 | Skenario dan hasil harapan ditetapkan; belum diuji pada website |
| Otomatis, Manual, perpindahan mode (`KM`) | 9 | Skenario dan hasil harapan ditetapkan; belum diuji pada website |
| Pemisahan dua perangkat (`DP`) | 4 | Skenario dan hasil harapan ditetapkan; belum diuji pada website |
| Penyimpanan dan riwayat (`PS`) | 9 | Skenario dan hasil harapan ditetapkan; belum diuji pada website |
| Alur, tampilan, keamanan (`UI`) | 8 | Skenario dan hasil harapan ditetapkan; belum diuji pada website |
| **Total** | **58** | **Belum ada klaim kelulusan pengujian aplikasi** |

### Rencana pengujian otomatis

Logika berikut diprioritaskan untuk unit test menggunakan **Node.js `node --test`** setelah implementasi:

- Validasi kelembaban, threshold, dan hubungan kedua threshold.
- Rumus selisih menuju threshold atas.
- Keputusan ON/OFF pada batas bawah, zona tengah, dan batas atas.
- Rangkaian hysteresis dengan status otomatis sebelumnya ON dan OFF.
- Perpindahan Manual ke Otomatis, termasuk pembacaan terakhir yang kosong.
- Pemisahan state dua perangkat dan pembuatan entri riwayat.

**Hasil unit test:** belum tersedia karena kode dan tes otomatis belum dijalankan. Jumlah lulus/gagal tidak dinyatakan sebelum ada keluaran pengujian yang nyata.

### Bukti pengujian

Bukti berupa tangkapan layar alur, hasil formulir valid/tidak valid, dashboard dua perangkat, riwayat setelah *refresh*, dan keluaran pengujian otomatis disimpan di `docs/bukti/` **setelah** diuji. Nama berkas bukti dan hasil aktual dicatat saat pemeriksaan berlangsung, sesuai keadaan yang benar-benar ditemui.

## 9. Batas tahap dan tindak lanjut

Dokumen ini merupakan dasar pengujian **sebelum pembangunan website versi SOLARIS**. Pencarian langsung, filter, dan unduh CSV **tidak termasuk** kasus implementasi sebelum Checkpoint 2. Sesudah Checkpoint 2, tim mencatat analisis dampak pada `docs/analisis-change-request.md` dan melakukan commit **sebelum** perubahan kode. Kasus uji baru untuk pencarian, filter gabungan, pesan **“Data tidak ditemukan”**, CSV sesuai data yang tampil, dan pengujian regresi ditambahkan pada tahap tersebut.

Bug Hunt atas `bughunt-kasir.zip` memiliki aturan dan batas waktu terpisah, sehingga pengujiannya tidak dicampur dengan hasil simulasi SOLARIS.

**Penetapan hasil harapan:** perhitungan KT-01–KT-10 dinyatakan oleh siswa sebagai `ON 45`, `ON 40`, `ON 20`, `OFF 0`, `OFF 20`, `OFF 0`, `OFF 100`, `ON 100`, `ON 45`, dan `OFF 20` secara berurutan. Hasil ini digunakan apa adanya setelah dicocokkan dengan spesifikasi hysteresis dan rumus selisih.

**Status akhir dokumen sebelum pengujian:** 58 skenario telah dirumuskan; implementasi, hasil aktual, bukti layar, dan hasil tes otomatis **belum dicatat sebagai lulus**.

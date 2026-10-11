# Spesifikasi Produk — SOLARIS Smart Irrigation Simulator

**Tim:** SOLARIS  
**Slogan:** *One Ecosystem. Endless Possibilities.*  
**Sekolah:** SMKN 8 Tangerang  
**Produk dalam proposal:** SOLARIS — platform ekosistem Internet of Things (IoT) berbasis web dan Progressive Web App (PWA)  
**Produk untuk Challenge Vibe Engineering:** website pengenalan SOLARIS dan prototipe simulasi Smart Irrigation  
**Bentuk:** website responsif, dapat dibuka melalui browser komputer maupun HP  
**Penyimpanan prototipe:** `localStorage` pada browser dan profil yang sama  
**Repositori:** `steampreneur-solaris`

**Tim pengembang:** Dafa Teger Alrasya (XI MK 1), Alif Mulyana (XI MK 1), dan Zaskia Aulia Putri Sheprida (XI ELIN 2).

## 1. Latar belakang dan permasalahan

### 1.1 Identitas dan arah produk

SOLARIS dirancang sebagai platform ekosistem IoT terpusat dengan konsep *One Ecosystem. Endless Possibilities.* Dalam proposal STEAMpreneur 2026, SOLARIS memusatkan pengelolaan identitas dan kepemilikan perangkat, komunikasi data, pemantauan, riwayat, dan kontrol perangkat. Smart Irrigation menjadi implementasi awal untuk membuktikan konsep tersebut. Produk utama bukan hanya alat penyiram tanaman, melainkan platform yang dapat berkembang untuk beragam ekosistem IoT.

Produk SOLARIS yang diajukan dalam proposal mencakup integrasi perangkat fisik, ESP32, API, database, dan web/PWA. Khusus untuk Challenge Vibe Engineering, tim mengembangkan **website terpisah berupa pengenalan produk dan simulator berbasis browser**, bukan mengganti atau menghubungkan sistem SOLARIS asli. Simulasi ini memperagakan dua perangkat virtual, validasi pembacaan kelembaban, pengendalian pompa secara otomatis maupun manual, dan penyimpanan riwayat. Seluruh hasil simulasi merupakan data contoh, bukan pembacaan sensor nyata atau perintah ke pompa fisik.

### 1.2 Masalah yang ditemukan

Proses penyiraman tanaman secara manual bergantung pada waktu luang, ingatan, dan penilaian visual pengguna. Penyiraman terlambat atau terlalu banyak dapat menimbulkan masalah bagi tanaman. Ketika pemilik bepergian, kondisi media tanam sulit dipantau secara langsung. Selain itu, kebutuhan air tidak selalu sama untuk setiap jenis dan ukuran tanaman. Pengguna membutuhkan penjelasan yang mudah dipahami mengenai kapan penyiraman perlu dimulai atau dihentikan, sedangkan calon pengembang perangkat harus memperhatikan keterbatasan sensor dan sistem pengamanannya.

Temuan tersebut menjadi alasan memilih simulasi Smart Irrigation: pengunjung dapat mempelajari pengaruh pembacaan kelembaban, ambang batas, dan mode kontrol terhadap keputusan penyiraman tanpa memerlukan perangkat IoT fisik.

### 1.3 Tujuan produk challenge

1. Memperkenalkan visi, nilai guna, dan konsep platform IoT SOLARIS sesuai proposal pendaftaran.
2. Memperagakan pengelolaan dua perangkat Smart Irrigation secara terpisah.
3. Memvalidasi input kelembaban tanah dan pengaturan dua ambang batas.
4. Menampilkan keputusan pompa otomatis berdasarkan *hysteresis*, serta simulasi kendali manual.
5. Menghasilkan nilai numerik yang dapat dihitung dan diuji secara objektif.
6. Menyimpan hasil simulasi dan menampilkannya kembali dalam riwayat setelah halaman dimuat ulang.
7. Menyediakan dasar halaman rekap yang dapat dikembangkan melalui Change Request sesuai urutan challenge.

Website ini dimaksudkan sebagai prototipe edukasi dan demonstrasi konsep, **bukan sistem pengendali penyiraman riil yang telah tervalidasi untuk penggunaan tanpa pengawasan**.

## 2. Pengguna dan kebutuhan

### 2.1 Pengunjung umum atau calon pengguna SOLARIS

Pengunjung membuka halaman pengenalan untuk memahami SOLARIS sebagai platform ekosistem IoT dan melihat Smart Irrigation sebagai contoh implementasi awal. Pengunjung dapat menekan tombol **Coba Simulasi** untuk masuk ke dashboard tanpa login.

### 2.2 Pemilik tanaman dan pengguna pemula

Pengguna yang memiliki pengalaman merawat tanaman dapat memasukkan data kelembaban contoh, mengatur batas penyiraman, memahami keputusan ON/OFF, dan melihat kembali riwayat percobaan. Antarmuka perlu menjelaskan arti parameter secara singkat dan tidak mengasumsikan pengetahuan pemrograman atau elektronika.

### 2.3 Pelajar, penguji, dan pembimbing

Pelajar dan penguji menggunakan simulator untuk memeriksa aturan bisnis, batas input, perpindahan mode, pemisahan data perangkat, hasil numerik, dan ketahanan riwayat setelah *refresh*. Mereka dapat mengikuti alur inti tanpa akun, perangkat keras, ataupun layanan eksternal.

## 3. Validasi masalah melalui wawancara dan observasi

Wawancara telah dilakukan terhadap empat narasumber yang bersedia diwawancarai dan direkam. Identitas mereka disamarkan dalam dokumentasi publik. Tiga wawancara berlangsung pada **2 Oktober 2026**, sedangkan wawancara keempat pada **3 Oktober 2026**. Ringkasan berikut berasal dari transkrip wawancara, bukan dari pengukuran kinerja aplikasi.

| Narasumber | Latar belakang | Pengalaman, jawaban, dan masukan yang relevan |
|---|---|---|
| NS-1 — 2 Oktober 2026 | Guru teknik; gemar berkebun/merawat tanaman | Melakukan penyiraman rutin, pernah lupa sehingga tanaman layu, serta pernah mengalami penyiraman berlebihan. Menilai pengaturan penyiraman berdasarkan kelembaban membantu mengatasi masalah waktu. Mengharapkan akses aplikasi yang praktis dan tetap tersedianya pilihan kontrol manual. |
| NS-2 — 2 Oktober 2026 | Guru Bahasa Inggris; berpengalaman berkebun bersama anak | Merawat tanaman dalam pot, pernah meninggalkan tanaman saat bepergian, dan mempertanyakan cara pemantauan dari jauh, kepraktisan pengguna awam, serta keamanan dan konsumsi sumber listrik. Menganggap penyiraman otomatis berbasis ambang kelembaban relevan untuk dicoba. |
| NS-3 — 2 Oktober 2026 | Guru teknik; gemar berkebun/merawat tanaman | Menjelaskan bahwa kebutuhan air dipengaruhi ukuran, jenis tanaman, dan kondisi media. Pernah mengalami penyiraman berlebih dan menggunakan irigasi tetes manual ketika bepergian. Menyarankan kontrol manual, perhatian pada ketersediaan air, dan pengembangan sensor lain sebagai langkah lanjutan. |
| NS-4 — 3 Oktober 2026 | Guru teknik; tidak berkebun | Memberikan perspektif teknis tentang keterbatasan satu sensor untuk jenis tanaman atau ukuran pot yang berbeda, posisi sensor, distribusi air, keandalan komponen, serta perawatan alat. Dalam observasi lapangan, menyarankan skenario awal tanaman yang relatif homogen untuk mengurangi kompleksitas interpretasi pembacaan sensor. |

**Pertanyaan pokok yang dieksplorasi:** kebiasaan penyiraman, cara mengenali tanah perlu air, pengalaman keterlambatan atau kelebihan penyiraman, kesulitan ketika bepergian, relevansi fitur monitoring dan otomatisasi SOLARIS, serta kebutuhan dan risiko teknis yang perlu diperhatikan.

**Kesimpulan validasi:** kebutuhan yang paling jelas adalah pengendalian waktu penyiraman berdasarkan kondisi kelembaban, keterbacaan informasi, pilihan kontrol manual, dan kesadaran terhadap keterbatasan sensor. Karena belum ada validasi atas akurasi perangkat fisik dalam challenge ini, simulator tidak mengklaim hasil penyiraman yang benar untuk semua jenis tanaman. Setiap perangkat virtual dianggap mewakili satu zona tanaman dengan karakteristik relatif seragam.

## 4. Ruang lingkup dan fitur wajib

### F01 — Landing Page SOLARIS

Halaman pertama memperlihatkan logo resmi tim, nama dan slogan SOLARIS, uraian platform ekosistem IoT, posisi Smart Irrigation sebagai implementasi awal, manfaat monitoring terpusat, gambaran peluang pengembangan multi-device, dan pengenalan tim. Tombol **Coba Simulasi** mengarahkan pengunjung ke dashboard tanpa registrasi atau login.

Konten landing page membedakan **konsep platform SOLARIS dalam proposal** dari **fitur yang benar-benar tersedia dalam simulator challenge**. Identitas, perangkat keras, API, autentikasi, telemetry langsung, dan PWA tidak dinyatakan sudah terimplementasi pada prototipe ini apabila belum tersedia.

### F02 — Dashboard dan pemilihan perangkat

Simulator menyediakan tepat dua perangkat virtual dengan identitas berbeda:

- **Device 01 — Kebun Depan**.
- **Device 02 — Kebun Belakang**.

Dashboard menampilkan dua perangkat tersebut beserta kelembaban terakhir yang valid (jika sudah ada), mode kontrol, status pompa, threshold, dan akses menuju riwayat. Perangkat dapat dipilih secara bergantian. Perubahan terhadap satu perangkat tidak boleh mengubah data perangkat lain.

### F03 — Input kelembaban dan threshold

Pengguna dapat memasukkan persentase kelembaban tanah simulasi dan mengatur **threshold bawah** serta **threshold atas** secara terpisah untuk setiap perangkat.

| Parameter | Aturan validasi |
|---|---|
| Kelembaban tanah | Bilangan bulat 0 sampai 100, termasuk kedua batas |
| Threshold bawah | Bilangan bulat 0 sampai 99 |
| Threshold atas | Bilangan bulat 1 sampai 100 |
| Hubungan threshold | Threshold bawah wajib lebih kecil dari threshold atas |
| Input kosong, bukan angka, negatif, pecahan, atau di luar rentang | Ditolak dengan pesan kesalahan yang jelas |

Nilai tidak valid tidak boleh mengubah pengaturan tersimpan, status pompa, pembacaan terakhir, atau jumlah riwayat. Pengaturan awal masing-masing perangkat adalah **threshold bawah 30% dan threshold atas 70%**.

### F04 — Simulasi pengendalian otomatis dengan hysteresis

Pada **Mode Otomatis**, keputusan pompa menggunakan pembacaan dan status otomatis sebelumnya milik perangkat yang dipilih:

1. Kelembaban **kurang dari** threshold bawah: pompa **ON**.
2. Kelembaban **lebih besar atau sama dengan** threshold atas: pompa **OFF**.
3. Kelembaban **mulai dari threshold bawah hingga kurang dari threshold atas**: status otomatis sebelumnya **dipertahankan**.

Status awal pompa setiap perangkat adalah **OFF**. Ketika belum ada pembacaan valid, tidak ada keputusan pembacaan yang dibuat dan status aman tetap OFF. Pembacaan pada angka yang tepat sama dengan threshold bawah berada di zona mempertahankan status; pembacaan tepat sama dengan threshold atas menghasilkan OFF.

Hysteresis bertujuan mengurangi perubahan status yang terlalu sering di sekitar satu titik ambang. Karena ini simulasi, keluaran ON/OFF hanya mengubah representasi status pada browser.

### F05 — Mode Manual dan perpindahan mode

Perangkat mempunyai dua mode: **Otomatis** dan **Manual**.

- Dalam Mode Manual, pengguna menentukan status pompa virtual **ON** atau **OFF** tanpa mengikuti threshold.
- Saat berpindah ke Manual, antarmuka meminta pilihan ON/OFF yang jelas. Status dan mode yang valid disimpan sebagai satu perubahan; perubahan mode dan status dicatat sebagai peristiwa.
- Saat kembali ke Otomatis, status awal evaluasi otomatis diatur ke **OFF** sebelum menilai kelembaban valid terakhir. Jika kelembaban di bawah threshold bawah, hasilnya ON; jika sudah mencapai threshold atas atau berada di zona antara kedua ambang, hasilnya OFF.
- Bila belum ada kelembaban valid terakhir, Mode Otomatis tetap OFF sampai ada simulasi pembacaan yang valid.
- Pengoperasian kontrol manual di website **tidak sama dengan sakelar manual fisik yang dapat bekerja tanpa internet**. Tidak ada pompa sungguhan yang dikendalikan.

### F06 — Hasil numerik selisih kelembaban

Setiap pembacaan simulasi yang valid menghasilkan nilai **selisih kelembaban menuju threshold atas** dalam satuan **poin persentase**:

`selisih = maksimum(0, threshold_atas - kelembaban)`

Hasil tidak pernah bernilai negatif. Nilai ini hanya selisih dua persentase, **bukan prediksi lama pompa menyala, jumlah air, atau waktu sampai tanah mencapai ambang**. Nilai yang dipakai dalam perhitungan adalah threshold atas yang berlaku untuk perangkat tersebut pada saat simulasi.

### F07 — Penyimpanan otomatis dan pemisahan data

Semua data disimpan pada `localStorage` browser yang sama. Setiap perangkat memiliki data tersendiri: ID, nama, threshold bawah dan atas, mode, status pompa, kelembaban valid terakhir, dan daftar riwayat.

- Tombol **Jalankan Simulasi** memvalidasi seluruh input, menghitung keputusan otomatis (jika Mode Otomatis) atau mempertahankan keputusan Manual, menghasilkan nilai numerik, lalu menyimpan pembacaan dan hasilnya **secara otomatis**.
- Pembacaan yang valid menambah tepat **satu** entri riwayat; *refresh* atau berpindah halaman tidak boleh menduplikasi entri.
- Peristiwa perubahan mode dan kontrol Manual dicatat dengan jenis peristiwa yang jelas, terpisah dari pembacaan kelembaban. Perubahan yang tidak benar-benar dilakukan pengguna tidak boleh menghasilkan entri palsu.
- Data yang sudah tersimpan tetap ada ketika halaman diperbarui dan browser dibuka kembali menggunakan profil serta asal situs yang sama, selama data situs tidak dihapus.
- Jika penyimpanan browser gagal atau tidak tersedia, aplikasi memberi pesan kesalahan dan **tidak menyatakan tindakan berhasil disimpan**. Tindakan tidak valid tidak boleh menulis data.
- Tidak ada sinkronisasi otomatis antarperangkat fisik, akun browser berbeda, atau komputer lain.

### F08 — Halaman Riwayat dan Rekap

Halaman Riwayat memperlihatkan data tersimpan pada kedua perangkat. Untuk pembacaan, satu baris minimal berisi tanggal dan waktu, nama perangkat, kelembaban, threshold bawah, threshold atas, mode, status pompa setelah simulasi, serta selisih menuju threshold atas. Peristiwa kontrol manual dan pergantian mode diberi label jenis peristiwa agar tidak disamakan dengan pembacaan sensor.

Riwayat dapat dilihat kembali setelah *refresh* dan tetap memisahkan identitas perangkat dengan benar. Ketika belum ada data, halaman menampilkan pesan keadaan kosong yang jelas.

Halaman Riwayat sengaja disiapkan untuk menerima **Change Request**. Fitur pencarian langsung, filter, keadaan tanpa hasil dengan pesan **“Data tidak ditemukan”**, dan unduhan CSV dari data yang sedang tampil **baru dikerjakan setelah Checkpoint 2 dan setelah analisis perubahan di-commit**, bukan pada versi pertama.

### F09 — Tampilan dan pengalaman pengguna

Tampilan menggunakan identitas visual SOLARIS, tata letak responsif, dan navigasi yang mudah ditemukan. Form dan tombol kontrol dapat digunakan pada perangkat layar sentuh. Perbedaan Mode Otomatis dan Manual serta status ON/OFF harus jelas melalui teks, tidak hanya warna. Data simulasi ditandai dengan keterangan yang tidak menyesatkan.

## 5. Satu alur inti dari awal sampai akhir

1. Pengunjung membuka **Landing Page SOLARIS**, membaca pengenalan produk, kemudian menekan **Coba Simulasi**.
2. Pengunjung masuk ke dashboard dan memilih **Kebun Depan** atau **Kebun Belakang**.
3. Pengunjung memasukkan kelembaban, threshold bawah, dan threshold atas; sistem memvalidasi nilainya.
4. Pengunjung menjalankan simulasi. Sistem menghitung status pompa sesuai mode dan hysteresis serta menampilkan nilai selisih menuju threshold atas.
5. Sistem otomatis menyimpan hasil simulasi; pengguna membuka **Riwayat** untuk melihat kembali data yang tersimpan.
6. Pengguna memuat ulang halaman dan memastikan data perangkat, pengaturan, serta riwayat tetap tersedia.

Alur ini mencakup formulir dengan validasi, aturan numerik yang bisa diuji, penyimpanan data, dan rekap yang dapat ditinjau kembali.

## 6. Aturan bisnis dan teknis yang dapat diuji

| ID | Aturan |
|---|---|
| B01 | Prototipe memiliki tepat dua perangkat virtual: Kebun Depan dan Kebun Belakang. Keduanya mempunyai state dan riwayat tersendiri. |
| B02 | Akses simulator dibuka melalui tombol Coba Simulasi pada landing page tanpa login. |
| B03 | Setiap perangkat memulai simulasi dengan threshold 30%/70%, mode Otomatis, dan status pompa OFF. |
| B04 | Kelembaban hanya bilangan bulat 0–100%; threshold bawah 0–99%; threshold atas 1–100%; wajib bawah < atas. |
| B05 | Input tidak valid ditolak tanpa mengubah data maupun menambah riwayat. |
| B06 | Dalam Otomatis, kelembaban < batas bawah menghasilkan ON; kelembaban >= batas atas menghasilkan OFF; zona di antaranya mempertahankan status otomatis sebelumnya. |
| B07 | Dalam Manual, pilihan ON/OFF pengguna mengendalikan **status virtual**, bukan pompa fisik. |
| B08 | Perpindahan Manual ke Otomatis mereset dasar evaluasi ke OFF kemudian menilai pembacaan valid terakhir; jika belum ada pembacaan valid, tetap OFF. |
| B09 | Selisih numerik = `max(0, batas_atas - kelembaban)` dalam poin persentase. |
| B10 | Pembacaan berhasil menambah satu entri riwayat, menyimpan identitas perangkat, waktu, input, status, dan hasil perhitungan. |
| B11 | Peristiwa Manual dan perubahan mode disimpan sebagai jenis riwayat terpisah dan tidak menghasilkan pembacaan kelembaban palsu. |
| B12 | Refresh tidak menghapus atau menggandakan riwayat; data tetap ada pada browser/profil dan asal situs yang sama. |
| B13 | Jika `localStorage` gagal, tampil pesan yang jelas; aplikasi tidak mengklaim penyimpanan berhasil. |
| B14 | Riwayat menampilkan kembali data tersimpan dan membedakan peristiwa pembacaan dengan kontrol manual. |
| B15 | Data simulator tidak boleh diklaim berasal dari ESP32, sensor nyata, API, atau pompa fisik. |
| B16 | Pencarian, filter, dan ekspor CSV baru diterapkan setelah Checkpoint 2 serta commit analisis Change Request. |

## 7. Hal yang tidak termasuk versi prototipe challenge

- Koneksi langsung ke ESP32, perangkat keras pompa, relay, panel surya, atau sensor fisik.
- Pemantauan tegangan panel surya, konsumsi energi, dan telemetri listrik.
- Autentikasi akun sungguhan, Device ID rahasia, API key, device ownership berbasis server, serta database cloud.
- Sinkronisasi data antar-HP atau antar-komputer dan monitoring jarak jauh terhadap kebun sungguhan.
- Kendali manual fisik ketika tidak ada internet, sensor ketinggian air, debit air, pengukuran waktu/volume penyiraman, dan keselamatan perangkat riil.
- Optimasi ilmiah dosis air per tanaman heterogen, kalibrasi sensor, pengukuran akurasi pertumbuhan tanaman, dan rekomendasi agronomi otomatis.
- Modul PWA yang dapat diinstal, integrasi REST API, dan ekosistem IoT lain dari platform SOLARIS penuh.
- Penghapusan massal riwayat atau manajemen pengguna berlapis pada versi pertama.
- Pencarian, filter, dan CSV sebelum tahapan Change Request yang diwajibkan panitia.

Fitur-fitur platform SOLARIS yang lebih luas tetap dapat diperkenalkan sebagai **visi atau rencana produk asli**, bukan sebagai klaim keberhasilan simulator challenge.

## 8. Kriteria selesai dan penerimaan

Suatu kriteria dinyatakan terpenuhi apabila dapat diverifikasi melalui aplikasi yang berjalan dan bukti pengujian.

| Kode | Kriteria penerimaan yang dapat diperiksa |
|---|---|
| S01 | Landing Page mengidentifikasi SOLARIS sesuai proposal, menampilkan logo, menjelaskan Smart Irrigation dan memberikan tautan Coba Simulasi. |
| S02 | Dashboard dapat berpindah di antara dua perangkat tanpa data perangkat tercampur. |
| S03 | Pengaturan awal 30%/70% tersedia dan dapat diubah secara valid per perangkat. |
| S04 | Form menolak nilai kosong, huruf, pecahan, negatif, lebih dari 100, dan pasangan threshold tidak berurutan. |
| S05 | Kasus batas kelembaban 0%, tepat batas bawah, tepat batas atas, dan 100% diproses sesuai aturan. |
| S06 | Hysteresis mempertahankan status otomatis sebelumnya di antara dua ambang; tidak sekadar selalu mengembalikan OFF. |
| S07 | Mode Manual dapat memilih ON atau OFF, dan perpindahan kembali ke Otomatis mengikuti aturan reset aman. |
| S08 | Hasil selisih numerik mengikuti rumus, termasuk saat kelembaban melampaui batas atas. |
| S09 | Setiap tindakan berhasil menambah jumlah entri yang benar; input salah tidak menambah riwayat. |
| S10 | Pembacaan, threshold, mode, status pompa, dan riwayat bertahan setelah *refresh* pada browser/profil yang sama. |
| S11 | Kegagalan penyimpanan ditangani dengan pesan kesalahan; keberhasilan tidak diklaim tanpa penyimpanan. |
| S12 | Riwayat menampilkan data setiap perangkat, waktu, hasil perhitungan, serta membedakan kontrol manual dari pembacaan. |
| S13 | Semua halaman utama dapat digunakan di layar HP maupun desktop tanpa hambatan navigasi mendasar. |
| S14 | README menyediakan langkah menjalankan website dan tes yang dapat diikuti dari hasil *clone* repositori. |
| S15 | Kasus uji manual serta unit test menghasilkan bukti yang sesuai dengan perilaku yang sebenarnya, bukan hasil yang diasumsikan. |

Kasus pengujian beserta nilai harapan yang dihitung dan diperiksa anggota tim dicatat pada `docs/04-kasus-uji.md`. Hasil aktual dan bukti tangkapan layar ditambahkan setelah implementasi dijalankan. Persyaratan dokumentasi dan commit mengikuti lembar Challenge Vibe Engineering.

## 9. Nilai STEAM, bisnis, dan keterbatasan

| Unsur | Penerapan pada website challenge |
|---|---|
| **Science** | Menggunakan kelembaban tanah sebagai parameter simulasi keputusan penyiraman, sambil mengakui pengaruh jenis tanaman, kondisi media, dan keterbatasan pengukuran. |
| **Technology** | Website HTML/CSS/JavaScript, penyimpanan `localStorage`, dan penyajian data perangkat virtual secara terpusat. |
| **Engineering** | Penyusunan aturan kontrol otomatis dengan hysteresis, kontrol manual, validasi state, isolasi perangkat, serta penanganan kondisi input salah. |
| **Arts** | Identitas visual SOLARIS, landing page informatif, antarmuka yang jelas, dan pengalaman mobile-first. |
| **Mathematics** | Persentase kelembaban, perbandingan dua ambang, dan penghitungan selisih ke batas atas dalam poin persentase. |

Secara bisnis, website membantu calon pengguna dan calon pembeli memahami manfaat dasar ekosistem SOLARIS sebelum memakai atau membeli perangkat sesungguhnya. Konsep model perangkat siap pakai dan langganan platform berasal dari proposal SOLARIS. Simulator challenge **belum** mengimplementasikan transaksi komersial, perhitungan laba, layanan berlangganan, atau pengukuran peningkatan hasil pertanian.

## 10. Keamanan, privasi, dan kejujuran data

1. Semua perangkat, angka, serta peristiwa pada aplikasi challenge diberi label **simulasi**.
2. Tidak ada token, password, kredensial API, atau `.env` milik platform SOLARIS asli dalam repositori publik.
3. Nama dan kontak pribadi narasumber tidak dicantumkan; hasil wawancara dilaporkan berdasarkan kode NS-1 sampai NS-4.
4. Transkrip mentah dan rekaman wawancara tidak diperlukan dalam repositori publik. Ringkasan temuan digunakan sesuai konteks validasi yang telah diizinkan.
5. `localStorage` bukan mekanisme sinkronisasi atau penyimpanan aman untuk data rahasia. Data dapat hilang apabila pengguna menghapus data situs atau memakai browser/profil lain.
6. Tidak ada klaim bahwa website simulator menjamin keselamatan, kesehatan tanaman, atau kinerja pompa sungguhan.
7. Bukti uji, tangkapan layar, hasil unit test, dan status fitur dilaporkan berdasarkan pelaksanaan nyata. Perbaikan serta kesalahan selama pengembangan dicatat dalam dokumen dan riwayat commit.

## 11. Sumber kebutuhan dan dokumen acuan

1. **Proposal STEAMPreneur SMK Tingkat Nasional Tahun 2026 — SOLARIS (One Ecosystem. Endless Possibilities.)**, dokumen proposal produk tim.
2. **Transkrip wawancara Narasumber 1–4**, wawancara tanggal 2 dan 3 Oktober 2026, disimpan oleh tim sebagai bahan validasi internal.
3. **Lembar Challenge Peserta: Vibe Engineering — Sayembara STEAMpreneur**, ketentuan alur inti, dokumen, pengujian, GitHub, Checkpoint, dan Change Request.
4. **Kesepakatan ruang lingkup Tim SOLARIS, 11 Oktober 2026**, mengenai dua perangkat virtual, validasi angka, dua threshold, kontrol otomatis/manual, perhitungan numerik, dashboard, dan penyimpanan otomatis.

---

**Status dokumen:** Spesifikasi yang ditetapkan sebagai dasar perancangan prototipe challenge. Pelaksanaan fitur, hasil pengujian, dan perubahan berikutnya dibuktikan melalui berkas kode, kasus uji, log proses, dan riwayat commit repositori.

# Penjelasan Kode

**Tim:** SOLARIS — *One Ecosystem. Endless Possibilities.*  
**Sekolah:** SMKN 8 Tangerang  
**Anggota:** Dafa Teger Alrasya, Alif Mulyana, Zaskia Aulia Putri Sheprida  
**Proyek:** Website SOLARIS dan simulator Smart Irrigation — Challenge Vibe Engineering STEAMpreneur 2026

Tidak ada sesi presentasi, jadi dokumen ini adalah bukti utama bahwa tim memahami kode yang dihasilkan AI.

**Keterangan kepengarangan:** Penjelasan lengkap berikut **disiapkan dengan bantuan ChatGPT** dari kode proyek yang diunggah serta pembagian tugas yang disetujui pembimbing. Nama siswa menunjukkan **penanggung jawab bagian yang perlu dipelajari dan dijelaskan**, bukan klaim bahwa setiap kalimat di bawah ditulis sendiri oleh siswa. Sesuai aturan panitia, setiap siswa perlu memeriksa kode langsung dan dapat menyampaikan kembali penjelasannya dengan **bahasa sendiri**, bukan hanya menyalin teks AI.

Aturan:
- Setiap anggota menjelaskan **minimal dua bagian kode yang berbeda**. Bagian yang dijelaskan tidak boleh sama dengan anggota lain.
- Tulis dengan bahasa sendiri. Boleh bertanya ke AI untuk memahami, tetapi jangan menyalin jawabannya.
- Sebut nama file dan fungsi yang nyata, serta contoh nilai yang nyata.
- Jika memungkinkan, setiap anggota meng-commit bagiannya sendiri dari akun GitHub masing-masing. Pengelolaan satu file dokumentasi oleh Zaskia tidak berarti ia menulis penjelasan atau kode seluruh anggota.

---

## Bagian A: Penjelasan per anggota

### Dafa — Penjelasan 1: Memeriksa input sebelum perhitungan

- **Ditulis oleh / penanggung jawab penjelasan:** **Dafa Teger Alrasya** (narasi awal dibantu AI).
- **File dan fungsi:** `src/js/logic.mjs` — `validasiBacaan()` dan fungsi pembantu `angkaBulat()`.
- **Apa yang dilakukan:** `angkaBulat()` mengubah input menjadi teks, memeriksa apakah kosong, bukan angka bulat, pecahan, atau berada di luar batas, kemudian mengembalikan angka valid. `validasiBacaan()` memeriksa ketiga isian: kelembaban 0–100, threshold bawah 0–99, threshold atas 1–100. Setelah itu diperiksa juga bahwa threshold bawah **harus lebih kecil** daripada threshold atas.
- **Kenapa dibuat seperti ini:** Kesalahan data harus diketahui **sebelum** pompa virtual dihitung atau riwayat ditambahkan. Pesan khusus membuat pengguna mengerti apa yang perlu diperbaiki.
- **Contoh:**

  ```javascript
  validasiBacaan({ kelembaban: '25', bawah: '30', atas: '70' });
  // Hasil: { kelembaban: 25, bawah: 30, atas: 70 }
  ```

  Jika `bawah: '70'` dan `atas: '30'`, fungsi melempar error `Threshold bawah harus lebih kecil daripada threshold atas.`
- **Jika input salah atau kosong:** Input kelembaban kosong menghasilkan `Kelembaban wajib diisi.`; `1.5` menghasilkan pesan bahwa input harus bilangan bulat; `101` ditolak karena di luar rentang. Fungsi mengeluarkan error sehingga `jalankanBacaan()` tidak menghasilkan keadaan baru yang tersimpan. Pesan ditampilkan di browser oleh `app.mjs`; `validasiBacaan()` sendiri tidak mengubah halaman HTML maupun penyimpanan.

**Inti yang perlu dapat dijelaskan Dafa:** “Data diperiksa sebelum diproses, supaya input salah tidak membuat hasil atau riwayat palsu.”

### Dafa — Penjelasan 2: Menentukan status pompa otomatis

- **Ditulis oleh / penanggung jawab penjelasan:** **Dafa Teger Alrasya** (narasi awal dibantu AI).
- **File dan fungsi:** `src/js/logic.mjs` — `statusOtomatis(kelembaban, bawah, atas, pompaSebelumnya)`.
- **Apa yang dilakukan:** Fungsi mengembalikan `'ON'` jika kelembaban **kurang dari** threshold bawah; mengembalikan `'OFF'` jika kelembaban **mencapai atau melebihi** threshold atas; dan mengembalikan status pompa sebelumnya jika berada di tengah.
- **Kenapa dibuat seperti ini:** Aturan *hysteresis* mencegah status pompa berubah-ubah ketika kelembaban bergerak di antara dua batas. Keputusan di zona tengah bergantung pada status sebelumnya, bukan hanya pada angka kelembaban saat itu.
- **Contoh:**

  ```javascript
  statusOtomatis(25, 30, 70, 'OFF'); // 'ON'
  statusOtomatis(50, 30, 70, 'ON');  // 'ON' (mempertahankan)
  statusOtomatis(50, 30, 70, 'OFF'); // 'OFF' (mempertahankan)
  statusOtomatis(70, 30, 70, 'ON');  // 'OFF'
  ```

  Pada 25% dengan batas 30%/70%, selisih ke batas atas adalah `70 - 25 = 45` poin, dihitung oleh fungsi lain yaitu `selisihKeAtas()`.
- **Jika input salah atau kosong:** `statusOtomatis()` **tidak memvalidasi** input sendiri; dalam alur normal nilai lebih dulu diperiksa oleh `validasiBacaan()` pada `jalankanBacaan()`. Jika pengguna tidak mengisi angka valid, aplikasi tidak meneruskan pembacaan untuk mengubah pompa.

**Inti yang perlu dapat dijelaskan Dafa:** “Di antara dua threshold, pompa mempertahankan status sebelumnya; ini bukan kesalahan.”

### Alif — Penjelasan 1: Mengambil kembali keadaan dari penyimpanan browser

- **Ditulis oleh / penanggung jawab penjelasan:** **Alif Mulyana** (narasi awal dibantu AI).
- **File dan fungsi:** `src/js/storage.mjs` — `ambilKeadaan(media, pembuatAwal)`; kunci penyimpanan `KUNCI`.
- **Apa yang dilakukan:** Fungsi meminta teks JSON melalui `media.getItem(KUNCI)`. Jika belum pernah disimpan (`null`), fungsi memanggil `pembuatAwal()` untuk membuat keadaan awal dua kebun. Jika data tersedia, fungsi mengubah teks JSON menjadi objek, lalu memeriksa strukturnya: versi data, dua perangkat, mode, status pompa, dan daftar riwayat.
- **Kenapa dibuat seperti ini:** Riwayat dan pengaturan kedua kebun bisa muncul kembali setelah halaman di-*refresh*. Data yang rusak atau formatnya tidak dikenal **tidak langsung dianggap data baru** sehingga penyimpanan lama tidak diam-diam ditimpa.
- **Contoh:**

  ```javascript
  // Jika media.getItem(KUNCI) menghasilkan null:
  ambilKeadaan(media, keadaanAwal);
  // Hasil: keadaan baru berisi 'depan' dan 'belakang',
  // masing-masing batas 30/70, mode otomatis, pompa OFF, riwayat kosong.
  ```

  Jika media berisi JSON keadaan yang valid, fungsi mengembalikan keadaan tersimpan tersebut.
- **Jika input salah atau kosong:** `null` berarti belum ada data dan merupakan keadaan normal. Namun, JSON rusak seperti `'{rusak'` menghasilkan error `Data tersimpan tidak dapat dibaca. Data lama tidak dihapus.` Jika browser menolak akses baca, muncul error `Penyimpanan browser tidak dapat dibaca.` Fungsi ini tidak memeriksa nilai formulir langsung; validasi input dilakukan di `logic.mjs`.

**Inti yang perlu dapat dijelaskan Alif:** “`localStorage` menyimpan keadaan sebagai teks; fungsi ini membacanya dan memeriksa apakah datanya masuk akal sebelum digunakan.”

### Alif — Penjelasan 2: Tes ketika penyimpanan sengaja dibuat gagal

- **Ditulis oleh / penanggung jawab penjelasan:** **Alif Mulyana** (narasi awal dibantu AI).
- **File dan bagian pengujian:** `tes/storage.test.mjs` — `test('Jika simpan gagal muncul error; sumber data tidak diubah', ...)`; fungsi yang diuji adalah `simpanKeadaan()` dari `src/js/storage.mjs`.
- **Apa yang dilakukan:** Tes membuat objek penyimpanan tiruan yang metode `setItem()`-nya sengaja menghasilkan error `QuotaExceededError`. Tes kemudian memeriksa bahwa `simpanKeadaan()` meneruskan masalah tersebut sebagai pesan kesalahan yang jelas dan bahwa data keadaan awal tidak diubah.
- **Kenapa dibuat seperti ini:** Aplikasi harus jujur ketika penyimpanan browser gagal, bukan menampilkan pesan sukses. Tes ini mengisolasi masalah penyimpanan tanpa harus menghapus atau merusak data `localStorage` sungguhan.
- **Contoh dari file tes:**

  ```javascript
  const s = keadaanAwal();
  const media = { setItem() { throw Error('QuotaExceededError'); } };
  assert.throws(() => simpanKeadaan(media, s), /Gagal menyimpan/);
  assert.equal(s.perangkat.depan.riwayat.length, 0);
  ```

  Hasil yang benar: `simpanKeadaan()` mengeluarkan error `Gagal menyimpan. Perubahan dibatalkan; periksa penyimpanan browser.` dan data sumber belum mempunyai riwayat baru.
- **Jika input salah atau kosong:** Dalam tes ini masalahnya bukan angka kelembaban yang salah, melainkan kegagalan media menyimpan. Tes **gagal** apabila `simpanKeadaan()` tidak melempar error yang cocok dengan `/Gagal menyimpan/`, atau data sumber berubah. Tes fungsi tersebut berbeda dari tes manual PS-08 di browser, meskipun keduanya menguji penanganan kegagalan penyimpanan.

**Inti yang perlu dapat dijelaskan Alif:** “Kami sengaja membuat `setItem()` gagal untuk membuktikan aplikasi tidak berpura-pura berhasil menyimpan.”

### Zaskia — Penjelasan 1: Navigasi dari Landing Page ke simulator

- **Ditulis oleh / penanggung jawab penjelasan:** **Zaskia Aulia Putri Sheprida** (narasi awal dibantu AI).
- **File dan bagian kode:** `src/index.html` — elemen tautan `<a href="./simulator.html">` pada navigasi, tombol utama **Coba Simulasi**, dan ajakan demonstrasi di Beranda. Bagian ini merupakan **elemen HTML, bukan fungsi JavaScript**.
- **Apa yang dilakukan:** Menyediakan tombol yang mengarahkan pengunjung dari halaman pengenalan SOLARIS ke `simulator.html` tanpa akun atau login.
- **Kenapa dibuat seperti ini:** Website challenge harus menjelaskan produk lebih dulu lalu menyediakan cara mudah bagi pengunjung untuk mencoba demonstrasi Smart Irrigation.
- **Contoh:**

  ```html
  <a class="btn btn-primary" href="./simulator.html">Coba Simulasi</a>
  ```

  Saat tautan diklik dari Beranda, browser membuka halaman simulator; pengguna dapat memilih Kebun Depan atau Kebun Belakang.
- **Jika input salah atau kosong:** Elemen tautan tidak mempunyai input angka. Jika `href` salah atau kosong, tombol tidak mengarah ke halaman yang diharapkan. Karena itu Zaskia menguji navigasi Beranda → Coba Simulasi, termasuk pemeriksaan pada layar HP dan desktop.

**Inti yang perlu dapat dijelaskan Zaskia:** “Tautan `href` menghubungkan halaman pengenalan dengan halaman simulasi; tugas HTML di sini adalah navigasi.”

### Zaskia — Penjelasan 2: Formulir input simulator

- **Ditulis oleh / penanggung jawab penjelasan:** **Zaskia Aulia Putri Sheprida** (narasi awal dibantu AI).
- **File dan bagian kode:** `src/simulator.html` — `<form id="form-simulasi" novalidate>`, `<select id="pilih-perangkat">`, serta tiga input dengan `id="kelembaban"`, `id="bawah"`, dan `id="atas"`. Bagian ini adalah **elemen HTML**, bukan fungsi JavaScript.
- **Apa yang dilakukan:** Memberi pengguna pilihan Kebun Depan atau Kebun Belakang, tempat memasukkan nilai kelembaban dan dua threshold, serta tombol untuk menjalankan simulasi. Elemen hasil dan `#pesan` disiapkan agar pengguna dapat melihat keluaran atau kesalahan.
- **Kenapa dibuat seperti ini:** Setiap isian memiliki label dan `id` yang jelas. Kode `src/js/app.mjs` memakai `document.querySelector()` untuk menemukan elemen yang sama. Atribut `novalidate` membuat validasi ketika *submit* dikelola JavaScript sehingga aplikasi dapat menampilkan pesan sesuai aturan bisnis.
- **Contoh:**

  ```html
  <form id="form-simulasi" novalidate>
    <input type="number" id="kelembaban" min="0" max="100" step="1" required>
    <!-- Input threshold bawah dan atas berada di dalam formulir yang sama. -->
  </form>
  ```

  Contoh penggunaan nyata: pilih Kebun Depan, isi kelembaban `25`, threshold bawah `30`, atas `70`, lalu tekan **Jalankan Simulasi**. Melalui `app.mjs` dan `logic.mjs`, status pompa otomatis menjadi **ON** dan selisih **45 poin**. HTML **tidak melakukan perhitungan tersebut sendiri**.
- **Jika input salah atau kosong:** Input `required`, `min`, `max`, dan `step` membantu memberi batasan dasar. Pemeriksaan yang menentukan valid/tidaknya data dan pesan spesifik dikerjakan oleh event pada `app.mjs` serta fungsi `angkaBulat()` / `validasiBacaan()` di `logic.mjs`. Input salah ditolak tanpa menyimpan pembacaan baru.

**Inti yang perlu dapat dijelaskan Zaskia:** “HTML menyediakan formulir, sedangkan JavaScript membaca input, memvalidasi, menghitung, menyimpan, dan menampilkan hasil.”

---

## Bagian B: Pertanyaan yang dijawab bersama

### 1. Jika aturan bisnis utama di spesifikasi berubah (tuliskan contoh perubahannya), file dan fungsi mana yang harus diubah? Jelaskan alasannya.

**Contoh perubahan:** threshold **awal** tiap perangkat diubah dari 30%/70% menjadi 20%/60%, sedangkan aturan ON di bawah batas bawah, OFF pada/di atas batas atas, dan *hysteresis* di zona tengah **tetap sama**.

Yang perlu diubah terutama `perangkatBaru()` di `src/js/logic.mjs`, karena di sanalah nilai `bawah: 30` dan `atas: 70` disiapkan bagi perangkat baru. Isi contoh bawaan di halaman atau dokumentasi, spesifikasi, dan kasus uji yang bergantung pada nilai awal juga perlu disesuaikan. Tes otomatis harus dijalankan ulang untuk memastikan tidak ada asumsi lama yang tertinggal.

Fungsi `statusOtomatis()` **tidak perlu diubah** untuk contoh ini karena fungsi tersebut menerima `bawah` dan `atas` sebagai parameter. Tetapi apabila **aturan pembandingnya** berubah, misalnya pompa harus menyala juga ketika kelembaban **tepat sama** dengan batas bawah, maka kondisi `kelembaban < bawah` pada `statusOtomatis()` harus diperiksa dan diubah menjadi `kelembaban <= bawah`, lalu kasus batas dan tes regresinya diperbarui. Dengan demikian, kami membedakan perubahan **nilai default** dan perubahan **aturan keputusan**.

### 2. Bagaimana data mengalir dari saat pengguna mengisi form sampai hasilnya tampil di layar? Sebutkan file dan fungsi yang dilewati secara berurutan.

1. **`src/simulator.html`** menyediakan elemen `#pilih-perangkat`, `#form-simulasi`, `#kelembaban`, `#bawah`, `#atas`, serta lokasi hasil dan pesan.
2. **`src/js/app.mjs`** memakai `document.querySelector()` untuk menemukan elemen HTML. Saat pengguna menekan tombol simulasi, *event listener* `submit` membaca nilai form, mencegah pengiriman halaman biasa dengan `event.preventDefault()`, lalu memanggil `terapkan()` dengan perhitungan `jalankanBacaan()`.
3. **`src/js/logic.mjs`** menjalankan `jalankanBacaan()` → `validasiBacaan()` → `angkaBulat()` untuk input; menyalin perangkat yang dipilih; memakai `statusOtomatis()` jika mode otomatis; lalu `catat()` memasukkan satu peristiwa pembacaan dan fungsi mengembalikan keadaan baru. Nilai selisih dihitung memakai `selisihKeAtas()` ketika membuat riwayat dan dihitung dengan rumus yang sama ketika dirender.
4. **`src/js/storage.mjs`** menerima keadaan baru melalui `simpanKeadaan(window.localStorage, berikutnya)` dari `terapkan()`; data diubah menjadi JSON dan disimpan dengan `setItem()`.
5. **`src/js/app.mjs`** baru mengganti variabel `keadaan` setelah penyimpanan berhasil, memanggil `render(true)` untuk memperbarui status/angka yang tampak, dan `tampilkanPesan()` untuk memberi pesan berhasil. Jika validasi atau penyimpanan melempar error, `terapkan()` menampilkan pesan gagal dan tidak menampilkan keberhasilan palsu.
6. Saat halaman **Riwayat** dibuka, **`src/js/riwayat.mjs`** memanggil `ambilKeadaan()` dan `semuaRiwayat()` dari `storage.mjs`, lalu membuat baris tabel melalui fungsi `cell()`.

**Urutan ringkas:** `simulator.html` → `app.mjs` (submit, `terapkan`) → `logic.mjs` (`jalankanBacaan`, validasi, kontrol, catat) → `storage.mjs` (`simpanKeadaan`) → `app.mjs` (`render`, `tampilkanPesan`) → tampilan; untuk riwayat: `riwayat.mjs` → `ambilKeadaan` → `semuaRiwayat` → tabel.

### 3. Pilih satu unit test. Apa yang diuji, dan dalam kondisi apa test itu akan gagal?

Kami memilih tes pada **`tes/storage.test.mjs`**, berjudul **`Jika simpan gagal muncul error; sumber data tidak diubah`**. Tes ini membuat keadaan awal dengan `keadaanAwal()`, lalu membuat media tiruan yang `setItem()`-nya sengaja melempar error. Tes mengharapkan `simpanKeadaan()` mengeluarkan pesan yang cocok dengan `/Gagal menyimpan/` dan memastikan `s.perangkat.depan.riwayat.length` masih `0`.

Tes akan **gagal** jika fungsi diam-diam mengabaikan kegagalan `setItem()`, mengeluarkan pesan yang tidak sesuai, atau secara tak sengaja mengubah data sumber. Tes ini merupakan uji fungsi penyimpanan; pemeriksaan pesan di layar browser dilaksanakan terpisah melalui skenario manual PS-08.

### 4. Pilih satu saran AI yang kalian tolak. Apa sarannya dan kenapa kalian menolaknya?

Saran/arah awal dari bantuan AI yang **tidak dilanjutkan** adalah membuat website **PERWIRA Digital** untuk challenge. Setelah tim mempelajari kembali ketentuan panitia, tim menyadari bahwa website yang dikerjakan harus terkait dengan **produk yang didaftarkan dalam proposal, yaitu SOLARIS**. Melanjutkan website PERWIRA Digital sebagai produk utama akan membuat hasil challenge tidak sesuai identitas dan tujuan pengajuan tim.

Karena itu, tim **menolak melanjutkan arah tersebut** dan menggantinya dengan website pengenalan SOLARIS serta simulator Smart Irrigation sebagai demonstrasi awal. Bagian yang salah arah tidak disembunyikan dengan menghapus riwayat Git; perubahan keputusan dijelaskan dalam log prompt dan dokumentasi. Penolakan ini bukan berarti konsep PERWIRA selalu buruk, melainkan **tidak tepat untuk tugas SOLARIS yang sedang dinilai**.

**Dasar jawaban:** Kejadian ini telah dikonfirmasi guru pembimbing. Kalimat di atas adalah ringkasan keputusan, **bukan kutipan verbatim prompt atau jawaban AI** yang tidak tersedia kata demi kata.

### 5. Bagian kode mana yang paling sulit dipahami, dan bagaimana kalian akhirnya memahaminya?

Dari catatan pembimbing, kesulitan terbesar tim adalah memahami **pesan error panjang dan hubungan antarbagian kode**, bukan sekadar mengetik satu baris sintaks. Ketika masalah muncul di VS Code atau saat pengujian, siswa belum langsung tahu apakah sumbernya ada pada HTML, JavaScript, penyimpanan browser, atau perintah Git.

Untuk mempelajarinya, tim dibimbing mengikuti alur nyata: mulai dari form `simulator.html`, melihat bagaimana `app.mjs` membaca nilai, mempelajari pemeriksaan `validasiBacaan()` pada `logic.mjs`, kemudian memahami bahwa `simpanKeadaan()` dalam `storage.mjs` harus berhasil sebelum layar menyatakan penyimpanan sukses. AI membantu menjelaskan pesan error dan contoh kode, sedangkan siswa menerapkan perbaikan, menjalankan browser/tes, lalu melihat hasilnya.

Pada sisi pemahaman individu, Dafa berfokus pada **validasi dan hysteresis**; Alif pada **penyimpanan dan cara kerja pengujian tiruan**; Zaskia pada **hubungan form HTML dengan interaksi JavaScript**. Tim semakin dapat mengikuti alur tersebut, tetapi **belum menyatakan menguasai semua sintaks secara mandiri**. Pendampingan dan latihan membaca kode masih diperlukan. Jawaban ini didasarkan pada pengamatan guru pembimbing; jika siswa menyebut bagian yang berbeda saat ditanya langsung, jawaban lisan mereka yang harus diutamakan.

---

## Peta enam bagian kode yang tidak saling berulang

| Anggota | Bagian 1 | Bagian 2 |
|---|---|---|
| **Dafa** | `src/js/logic.mjs` — `validasiBacaan()` | `src/js/logic.mjs` — `statusOtomatis()` |
| **Alif** | `src/js/storage.mjs` — `ambilKeadaan()` | `tes/storage.test.mjs` — tes kegagalan penyimpanan |
| **Zaskia** | `src/index.html` — tautan ke simulator | `src/simulator.html` — formulir `#form-simulasi` |

**Pemeriksaan rujukan:** Nama file, fungsi, elemen HTML, dan contoh hasil diperiksa terhadap kode dalam arsip `steampreneur-solaris.zip` yang diberikan tim. Jika `main` berubah setelah arsip tersebut dibuat, rujukan perlu dicocokkan lagi. Penjelasan ini disusun dengan bantuan AI dan tidak boleh dianggap bukti bahwa siswa sudah dapat menjelaskan kodenya secara mandiri tanpa kesempatan belajar dan mempraktikkannya.

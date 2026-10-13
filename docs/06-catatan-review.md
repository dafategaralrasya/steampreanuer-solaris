# Catatan Code Review

**Tim:** SOLARIS — *One Ecosystem. Endless Possibilities.*  
**Metode review yang dikonfirmasi:** pemeriksaan kode dan hasil program dilakukan **terutama bersama guru pendamping**, kemudian Dafa, Alif, dan Zaskia menjalankan perbaikan atau uji sesuai tanggung jawab. Tidak ada klaim bahwa setiap Pull Request sudah mendapat persetujuan mandiri dari semua siswa.

**Prompt review yang dipakai (ringkasan, bukan kutipan verbatim):** “Periksa apakah masukan yang salah ditolak dengan pesan yang dapat dipahami, apakah penyimpanan dan riwayat tidak berubah saat gagal, serta apakah hasil 40% pada threshold 30%/70% sesuai riwayat hysteresis. Tunjukkan perubahan yang perlu dilakukan dan bagaimana mengujinya kembali.”

| No | Saran dari AI | Diterima / ditolak | Alasan | Bagian kode yang berubah |
|---|---|---|---|---|
| 1 | Tambahkan pesan khusus untuk kelembaban kosong dan validasi angka/rentang agar alasan penolakan jelas. | **Diterima**; diuji ulang dan dikonfirmasi lulus | Penolakan awal tidak cukup menjelaskan syarat kolom kepada pengguna. | `src/js/logic.mjs`: `angkaBulat()`, `validasiBacaan()` |
| 2 | Berikan umpan balik ketika karakter huruf/tanda ditolak oleh kolom angka di browser. | **Diterima**; diuji ulang dan dikonfirmasi lulus | Input salah harus mempunyai pesan yang mudah dipahami, tidak sekadar dicegah diam-diam. | `src/js/app.mjs`: penanganan `keydown`, `paste`, `input` dan `tampilkanPesan()` |
| 3 | Periksa keadaan dan riwayat otomatis sebelum mengubah logika status pompa pada 40%. | **Diterima** sebagai arahan pemeriksaan | 40% berada di zona mempertahankan status; urutan sebelumnya menentukan ON/OFF. | **Tidak ada perubahan kode** hysteresis setelah pemeriksaan; aturan pada `statusOtomatis()` dipertahankan. |
| 4 | Jalankan kembali tes setelah perbaikan dan bandingkan hasil aktual dengan kasus uji yang ditetapkan. | **Diterima** | Perbaikan pesan tidak boleh merusak status pompa, perhitungan, atau data dua perangkat. | `tes/` serta pengujian manual VL dan PS; kode aplikasi hanya sesuai kebutuhan perbaikan |


## Temuan review dan tindak lanjut berdasarkan konfirmasi pembimbing

| Penanggung jawab | Temuan atau pemeriksaan | Tindak lanjut dan hasil |
|---|---|---|
| **Dafa** | Pesan validasi input simulator belum jelas | Memperbaiki kode dengan bantuan ChatGPT; hasil regresi dikonfirmasi lulus |
| **Alif** | Pengujian input tidak valid, perlindungan data/riwayat, serta pengujian regresi | Menjalankan kasus uji dan tes ulang perbaikan Dafa; dilaporkan lulus |
| **Zaskia** | Navigasi, tampilan HP/desktop, dan pengelolaan screenshot | Memeriksa UI-01–UI-08 serta melengkapi folder dokumentasi; seluruh UI dilaporkan lulus |
| **Guru pendamping** | Konsistensi kebutuhan, kode, hasil pengujian, dan langkah GitHub | Mendampingi proses review; ketiga siswa menjalankan langkah dan perubahan yang diperiksa bersama |
| **Tim bersama** | Status berbeda saat kelembaban 40% | Menelusuri riwayat; menyimpulkan hasil benar menurut hysteresis dan tidak mengubah logika |

**Sesi terkonfirmasi:** 12 Oktober 2026 pukul 16.00–22.30 WIB; pekerjaan dokumentasi berikutnya dilakukan 13 Oktober 2026 pukul 05.00–08.00 WIB memakai laptop Zaskia dengan pendampingan anggota lain. Jam setiap review individual tidak direkayasa.

**Pengujian:** perbaikan validasi dan regresi pada `main` telah dikonfirmasi lulus oleh guru pendamping. Pada salinan ZIP yang diperiksa secara terpisah, `node --test` menghasilkan 38 lulus dan 0 gagal. Hasil pengujian manual dirinci pada `04-kasus-uji.md`.


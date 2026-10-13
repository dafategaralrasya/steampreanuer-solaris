# Kesalahan AI yang Kami Temukan

**Tim:** SOLARIS — SMKN 8 Tangerang  
**Tanggal pembaruan:** 13 Oktober 2026  
**Sumber pemeriksaan:** pengujian Alif, perbaikan Dafa, review bersama guru pembimbing, dan hasil regresi yang dikonfirmasi selesai.

Hasil AI bukan langsung dinyatakan benar. Tim memeriksa fungsi dan pesan yang terlihat bagi pengguna, kemudian memperbaiki bagian yang tidak memenuhi kebutuhan. Sumber kesalahan validasi **dikonfirmasi berasal dari kode awal bantuan ChatGPT**.

| No | Apa yang diminta | Kesalahan AI | Bagaimana kami mengetahuinya | Perbaikan yang kami lakukan |
|---|---|---|---|---|
| 1 | Form simulator menolak karakter yang bukan bilangan bulat **dan memberi penjelasan yang jelas**. | Kode awal bantuan ChatGPT memakai kolom angka yang menolak ketikan huruf tetapi tidak memberi umpan balik saat pengguna mencoba memasukkan huruf. | Alif mencoba input huruf saat pengujian VL-03 dan melaporkan huruf tidak dapat masuk, namun alasan penolakan belum dijelaskan di layar. | Dafa menerapkan revisi bantuan ChatGPT pada `src/js/app.mjs`: penanganan `keydown`, `paste`, dan `input` menampilkan pesan karakter/rentang yang diizinkan. Alif menjalankan regresi; pembimbing mengonfirmasi hasilnya lulus dan kode sudah digabung ke `main`. |
| 2 | Form menjelaskan kondisi ketika kelembaban wajib diisi dan angka berada di luar ketentuan. | Pada implementasi awal berbantuan ChatGPT, umpan balik beberapa input tidak valid masih terlalu umum; untuk kelembaban kosong belum menjelaskan bahwa kolom wajib diisi. | Pengujian kasus VL-01 dan kasus validasi lain oleh Alif memperlihatkan perlunya pesan yang lebih tepat, terpisah dari sekadar penolakan input. | Dafa memperbaiki `src/js/logic.mjs`, terutama `angkaBulat()` dan `validasiBacaan()`, sehingga terdapat pesan untuk isian kosong, pecahan, dan rentang. Alif menguji ulang setelah perubahan; hasil dilaporkan lulus. |

## Koreksi arah produk yang tidak otomatis dianggap kesalahan AI

Pada awal pengerjaan, dokumen sempat mengarah kepada **PERWIRA Digital**. Sesudah memahami penjelasan panitia dan membandingkan dengan proposal pendaftaran, tim mengembalikan website challenge ke identitas **SOLARIS**. Perubahan ini merupakan koreksi pemahaman tugas/proses, **bukan tanpa bukti dilabeli sebagai kesalahan AI**. Riwayat Git lama dibiarkan sebagai bukti proses pengembangan.

## Temuan yang ternyata bukan bug

Pembacaan kelembaban **40%** dengan batas bawah **30%** dan batas atas **70%** dapat memperlihatkan pompa ON atau OFF menurut **status otomatis sebelumnya**. Jika pembacaan awal 25% sudah membuat pompa ON, nilai 40% mempertahankan ON. Tim memeriksa urutan riwayat bersama guru pembimbing dan **tidak mengubah algoritma hysteresis**.

## Hasil pemeriksaan setelah perbaikan

Guru pembimbing mengonfirmasi pada 13 Oktober 2026 bahwa perbaikan validasi Dafa dan pengujian regresi Alif telah selesai, masuk `main`, dan lulus. Sebagai pemeriksaan terpisah terhadap isi ZIP yang diunggah, perintah `node --test` menghasilkan **38 lulus, 0 gagal** menggunakan Node.js v22.16.0. Angka tersebut adalah hasil **salinan ZIP**, bukan klaim jumlah tes terbaru pada `main` GitHub.

# Catatan Bug Hunt — Kasir Kantin STEAM

**Tim:** SOLARIS
**Proyek:** STEAMpreneur 2026
**Tanggal:** 15 Oktober 2026
**Branch:** `bughunt/kasir-kantin`

## Informasi pelaksanaan

- Commit kode asli: `598ffa4`
- Waktu mulai: 17.12.33 WIB
- Batas waktu 60 menit: 18.12.33 WIB
- Jumlah kelompok perbaikan: 4
- Hasil pengujian akhir: 14 lulus, 0 gagal

## Bug 1 — Validasi dan penjumlahan jumlah pesanan

**Gejala:** Ketika produk yang sama ditambahkan dua kali, jumlah pesanan dapat berubah menjadi penggabungan teks. Contohnya, Es Teh sebanyak 2 kemudian ditambahkan 3 menghasilkan `"23"`, bukan 5. Jumlah kosong, nol, negatif, pecahan, serta jumlah lebih dari 99 juga belum ditolak.

**Cara reproduksi:** Tambahkan produk K04 dengan jumlah `"2"`, kemudian tambahkan kembali produk K04 dengan jumlah `"3"`. Periksa nilai `qty` dalam keranjang. Coba juga jumlah `0`, `-1`, `1.5`, dan penambahan yang membuat jumlah melebihi 99.

**Aturan yang dilanggar:** Aturan bisnis nomor 1 dan 2, yaitu jumlah harus bilangan bulat 1–99, dan penambahan produk yang sama harus menjumlahkan kuantitas secara numerik dengan batas maksimum 99.

**Akar masalah:** Nilai jumlah dari formulir berupa teks, sedangkan `itemLama.qty += qty` tidak mengubahnya menjadi bilangan. Fungsi juga tidak memiliki validasi jumlah.

**Perbaikan:** Memvalidasi jumlah, mengubahnya menjadi angka, menjumlahkan kuantitas secara numerik, dan menolak jumlah yang melewati batas.

**Bukti pengujian:** BH-01, BH-02, dan BH-03 gagal pada kode awal dan lulus setelah perbaikan.

**Commit:** `e110d46` — `perbaikan: validasi dan penjumlahan jumlah pesanan`

## Bug 2 — Aturan diskon tidak sesuai

**Gejala:** Pelanggan member dengan subtotal Rp200.000 dapat memperoleh gabungan diskon 5% dan 10%, padahal seharusnya hanya 10%. Pelanggan non-member dengan subtotal tepat Rp100.000 juga tidak memperoleh diskon 5%.

**Cara reproduksi:** Jalankan `hitungDiskon(200000, true)` dan `hitungDiskon(100000, false)` pada kode asli.

**Aturan yang dilanggar:** Aturan bisnis nomor 4. Diskon tidak boleh digabung. Member mendapat 10%, sedangkan non-member dengan subtotal minimal Rp100.000 mendapat 5%.

**Akar masalah:** Dua kondisi `if` dapat berjalan bersamaan dan memakai operator `>` untuk batas Rp100.000.

**Perbaikan:** Mendahulukan kondisi member dan mengembalikan satu nilai diskon saja. Mengubah batas non-member menjadi `>= 100000`.

**Bukti pengujian:** BH-04 dan BH-05 menguji dua kesalahan utama. BH-06 dan BH-07 memeriksa kondisi tanpa diskon dan pembulatan diskon. Seluruh tes diskon lulus setelah perbaikan.

**Commit:** `668258d` — `perbaikan: diskon eksklusif dan batas minimum belanja`

## Bug 3 — Pembulatan PPN salah

**Gejala:** Nilai PPN dengan pecahan 0,5 atau lebih dibulatkan ke bawah, bukan ke rupiah terdekat.

**Cara reproduksi:** Jalankan `hitungPPN(150)`. PPN 11% menghasilkan Rp16,50 sehingga seharusnya dibulatkan menjadi Rp17, bukan Rp16.

**Aturan yang dilanggar:** Aturan bisnis nomor 5 dan 6. PPN harus dihitung dari subtotal setelah diskon, dibulatkan ke rupiah terdekat, dan digunakan dalam total.

**Akar masalah:** Fungsi memakai `Math.floor()` yang selalu membulatkan ke bawah.

**Perbaikan:** Mengganti `Math.floor()` dengan `Math.round()`.

**Bukti pengujian:** BH-08 sampai BH-10 menguji pembulatan naik, pembulatan turun, dan pengaruh PPN terhadap total. Ketiganya lulus setelah perbaikan.

**Commit:** `e60ad37` — `perbaikan: pembulatan PPN ke rupiah terdekat`

## Bug 4 — Pembayaran kurang tidak ditolak

**Gejala:** Pembayaran yang lebih kecil dari total transaksi menghasilkan kembalian negatif, bukan pesan penolakan.

**Cara reproduksi:** Jalankan `hitungKembalian(20000, 15000)`. Pada kode asli fungsi mengembalikan `-5000`.

**Aturan yang dilanggar:** Aturan bisnis nomor 7. Pembayaran kurang harus ditolak dengan pesan persis `"Uang pembayaran kurang"`.

**Akar masalah:** Fungsi langsung menghitung `bayar - total` tanpa memeriksa kecukupan pembayaran.

**Perbaikan:** Menambahkan pemeriksaan `bayar < total` dan melempar kesalahan dengan pesan yang diwajibkan.

**Bukti pengujian:** BH-11 gagal sebelum perbaikan dan lulus setelah perbaikan. BH-12 dan BH-13 memastikan pembayaran tepat dan pembayaran lebih tetap menghasilkan kembalian yang benar.

**Commit:** `71ebc0e` — `perbaikan: tolak pembayaran yang kurang`

## Ringkasan pengujian

Pengujian dilakukan menggunakan Node.js dengan perintah:

```powershell
node --test
```

Hasil pengujian akhir:

- Jumlah tes: 14
- Lulus: 14
- Gagal: 0

Pengujian mencakup contoh tes bawaan, validasi jumlah, penjumlahan produk, diskon, PPN, total, dan pembayaran.

## Kesimpulan

Tim SOLARIS menemukan dan memperbaiki empat kelompok kesalahan pada logika Kasir Kantin STEAM. Setiap kelompok perbaikan disimpan dalam commit terpisah dengan awalan `perbaikan:` dan dilengkapi pengujian otomatis.

Seluruh 14 pengujian yang dijalankan setelah perbaikan berhasil lulus.

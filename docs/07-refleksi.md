# Refleksi Tim

**Tim:** SOLARIS — *One Ecosystem. Endless Possibilities.*  
**Sekolah:** SMKN 8 Tangerang  
**Anggota:** Dafa Teger Alrasya, Alif Mulyana, Zaskia Aulia Putri Sheprida  
**Proyek:** Website pengenalan SOLARIS dan simulator Smart Irrigation — Challenge Vibe Engineering STEAMpreneur 2026  
**Dasar penyusunan:** Catatan guru pembimbing, pengalaman kerja yang telah dikonfirmasi, log pengembangan, hasil pengujian, dan kode proyek. **Naskah ini disusun dengan bantuan AI sebagai bahan refleksi tim, bukan transkrip atau kutipan jawaban pribadi ketiga siswa.** Sesuai aturan panitia, ketiganya perlu memahami dan menyampaikan isi refleksi dengan bahasa mereka sendiri.

## 1. Apa yang berjalan baik dalam cara kami bekerja dengan AI?

Yang berjalan baik adalah penggunaan AI sebagai alat bantu **belajar dan memecahkan masalah secara bertahap**, bukan sebagai pengganti pengujian. Dafa, Alif, dan Zaskia tidak berasal dari latar belakang pembelajaran IT, sehingga VS Code, terminal, Git, GitHub, serta sintaks HTML dan JavaScript merupakan hal yang relatif baru. Guru pembimbing berulang kali mengarahkan langkah kerja, lalu siswa menjalankannya sendiri pada laptop masing-masing atau dalam sesi kerja bersama.

Saat muncul error, tim mencoba memahami pesan tersebut, menjelaskan konteksnya kepada AI, mengikuti petunjuk yang masuk akal, dan melihat apakah hasilnya benar-benar berjalan. Pembagian tugas juga membantu: Dafa menangani logika dan perbaikan validasi, Alif memeriksa penyimpanan dan pengujian regresi, sedangkan Zaskia menangani tampilan, navigasi, dan dokumentasi. Branch, commit, Pull Request, serta pengujian di browser membantu tim melihat bahwa hasil AI masih harus diperiksa sebelum diterima.

Kemajuan yang dapat diamati adalah ketiganya semakin terbiasa membuka proyek, menggunakan VS Code dan GitHub, menjalankan langkah yang diperintahkan, serta menelusuri kesalahan. Namun, ketiganya masih memerlukan pendampingan guru maupun bantuan AI, terutama ketika menghadapi persoalan baru.

## 2. Kapan AI paling membantu? Kapan AI justru menyulitkan?

AI paling membantu ketika terminal VS Code menampilkan pesan kesalahan panjang yang belum dapat langsung dipahami siswa. AI membantu menguraikan pesan tersebut menjadi langkah pemeriksaan yang lebih kecil, misalnya melihat file yang disebut, memeriksa perintah Git, menjalankan ulang tes, dan membandingkan hasil dengan spesifikasi. AI juga membantu menyiapkan kerangka kode, contoh pengujian, serta penjelasan awal mengenai logika *hysteresis* dan penyimpanan browser.

AI justru menyulitkan apabila jawabannya **terlihat meyakinkan tetapi belum sesuai kebutuhan pengguna atau belum lengkap secara fungsi**. Pada awal proses, tim sempat mengikuti arah pembuatan website PERWIRA Digital. Setelah ketentuan panitia dipahami dengan lebih tepat, arah itu tidak dilanjutkan karena website challenge harus sesuai produk yang didaftarkan, yaitu SOLARIS. Tim mempertahankan riwayat pengembangan, tetapi mengoreksi tujuan dan isi proyek.

Contoh lain adalah implementasi validasi formulir dari bantuan AI. Input yang salah memang ditolak, tetapi beberapa kondisi, terutama saat pengguna mengetik huruf ke kolom angka, semula tidak memberikan penjelasan yang cukup. Hal ini baru terlihat setelah diuji dari sisi pengguna. Pengalaman tersebut menunjukkan bahwa jawaban AI tidak dapat diterima hanya karena kodenya bisa dijalankan.

## 3. Kesalahan terbesar yang hampir lolos, dan bagaimana kami menemukannya?

Kekurangan yang hampir lolos adalah **pesan validasi input simulator yang belum informatif**. Pada pengujian awal, kolom angka dapat menolak karakter yang salah, tetapi pengguna tidak selalu memperoleh keterangan yang menjelaskan mengapa input ditolak. Jika tim hanya memeriksa bahwa data salah tidak tersimpan, masalah pengalaman pengguna ini mungkin dianggap sudah selesai.

Alif menemukan kekurangan tersebut saat menjalankan skenario validasi. Temuan dibahas bersama pembimbing, kemudian Dafa memperbaiki alur pemberitahuan dengan bantuan AI. Alif menjalankan pengujian regresi setelah perbaikan. Berdasarkan konfirmasi tim, perbaikan telah digabung ke `main` dan pengujian ulang lulus.

Tim juga sempat menaruh perhatian pada perubahan status pompa ketika nilai kelembaban berada di zona tengah, misalnya 40%. Setelah urutan pembacaan dan status sebelumnya diperiksa, hasil itu diketahui **sesuai aturan hysteresis**: status pompa dipertahankan di antara batas bawah dan atas. Karena bukan bug, logika tersebut tidak diubah. Peristiwa ini mengajarkan tim agar memeriksa konteks dan spesifikasi sebelum menyimpulkan suatu hasil sebagai kesalahan.

## 4. Apa yang akan kami lakukan berbeda jika mengulang challenge ini?

Jika mengulang challenge, kami akan **memastikan pemahaman instruksi panitia dan kesesuaian produk sejak awal**, sebelum meminta AI membuat banyak kode atau dokumen. Hal itu akan mengurangi pekerjaan koreksi arah seperti perubahan dari konsep website PERWIRA Digital menjadi website SOLARIS.

Kami juga akan lebih cepat membuat alur kerja kecil: satu perubahan kode, satu pemeriksaan, satu pengujian, lalu commit yang sesuai. Pesan error akan dicatat bersama langkah yang memunculkannya agar pertanyaan kepada AI lebih jelas. Setiap saran AI akan dibandingkan dengan spesifikasi dan kasus uji, bukan langsung disalin. Hasil pengujian, termasuk screenshot dan nama file buktinya, akan dicatat segera setelah tes dilakukan sehingga tidak perlu dicocokkan ulang di akhir.

Dalam pembagian belajar, setiap anggota akan diberi waktu khusus untuk memahami dua bagian kode yang menjadi tanggung jawabnya. Tujuannya bukan sekadar website berjalan, tetapi siswa juga mampu menjelaskan mengapa kode dibuat demikian dan apa yang terjadi ketika input salah.

## 5. Bagaimana kami mengatur waktu? Langkah mana yang jauh lebih lama dari estimasi, dan kenapa?

Tim membagi pekerjaan menurut tanggung jawab Dafa, Alif, dan Zaskia, lalu melaksanakan langkah-langkah kecil dengan pendampingan guru. Rentang kegiatan yang telah dikonfirmasi adalah:

| Tanggal | Waktu (WIB) | Keterangan |
|---|---|---|
| **11 Oktober 2026** | **10.00–20.00** | Kegiatan pengembangan dan persiapan yang telah dicatat dalam log tim. |
| **12 Oktober 2026** | **16.00–22.30** | Sesi kerja dan pengujian bersama. |
| **13 Oktober 2026** | **05.00–08.00** | Kegiatan berpusat pada laptop Zaskia dengan pendampingan Dafa dan Alif; bukan tiga sesi kerja terpisah yang diasumsikan berlangsung bersamaan. |

Menurut pengamatan pembimbing, **adaptasi menggunakan VS Code/GitHub dan penanganan error** membutuhkan waktu lebih banyak dari yang diharapkan. Pesan terminal yang panjang, perintah Git, serta kebutuhan mengulang langkah setelah terjadi kesalahan membuat proses tidak selalu langsung selesai pada percobaan pertama. Tim berulang kali mencari penyebab bersama dan meminta penjelasan AI sampai dapat melanjutkan pekerjaan.

Kami **tidak mempunyai pencatatan menit per tugas**, sehingga tidak mengklaim durasi pasti untuk satu error, satu commit, atau satu kasus uji. Waktu di atas merupakan rentang kegiatan, bukan pembagian waktu hasil perkiraan. Pelajaran untuk kesempatan berikutnya adalah menyediakan cadangan waktu khusus untuk debugging, sinkronisasi Git, serta pemeriksaan dokumentasi.

## 6. Bagian mana dari kode yang masih belum kami pahami sepenuhnya? (Jawab dengan jujur.)

Kami **belum memahami seluruh sintaks dan alur program secara mandiri**. Ketiga anggota berasal dari pembelajaran non-IT dan baru mulai mengenali hubungan antara HTML, JavaScript, penyimpanan, serta pengujian otomatis. Dengan pendampingan, kami telah mampu menjalankan dan memeriksa kode tertentu, tetapi belum berarti semua bagian proyek dapat kami tulis ulang sendiri tanpa bantuan.

- **Dafa:** perlu terus memperdalam hubungan antara validasi angka pada `src/js/logic.mjs`, pemeriksaan saat mengetik pada `src/js/app.mjs`, dan alasan mengapa kondisi awal pompa berpengaruh pada *hysteresis*. Dafa telah menangani perbaikan validasi, tetapi pemahaman seluruh alur browser sampai penyimpanan masih perlu diasah.
- **Alif:** perlu memperdalam cara kerja penyimpanan `localStorage`, struktur JSON keadaan dua perangkat, serta cara *unit test* meniru kegagalan `setItem()` tanpa memakai browser sungguhan. Alif sudah melaksanakan pengujian, tetapi memahami seluruh detail pengujian otomatis merupakan proses belajar berikutnya.
- **Zaskia:** perlu memperdalam hubungan antara elemen HTML, atribut `id`, pemanggilan `document.querySelector()`, dan *event listener* pada JavaScript. Zaskia sudah menangani tampilan dan navigasi, tetapi belum semua sintaks penghubung formulir dan logika otomatis dapat dipahami tanpa penjelasan.

Poin-poin di atas merupakan **area belajar berdasarkan pembagian tugas dan pengamatan pembimbing**, bukan pengakuan pribadi yang direkam kata demi kata dari masing-masing siswa. Untuk menjelaskan pemahaman aktual saat penilaian, setiap anggota harus mempelajari kode terkait dan menjawab dengan bahasanya sendiri.

---

## Ringkasan perkembangan tiap anggota

| Anggota | Kegiatan yang benar-benar menjadi tanggung jawabnya | Perkembangan yang dapat diamati |
|---|---|---|
| **Dafa** | Logika simulator, kontrol otomatis, perbaikan pesan validasi | Mulai menghubungkan kesalahan input dengan perubahan kode dan pengujian ulang. |
| **Alif** | Pengujian kasus batas, penyimpanan, riwayat, dan regresi | Mulai menilai kode dari hasil aktual, termasuk membedakan dugaan bug dan perilaku yang benar. |
| **Zaskia** | Landing Page, formulir, navigasi HP/desktop, screenshot, dokumentasi | Mulai terbiasa memeriksa tampilan serta mengelola perubahan dokumentasi melalui VS Code/GitHub. |

**Transparansi penggunaan AI:** Naskah refleksi ini dirumuskan dengan bantuan ChatGPT berdasarkan keterangan guru pembimbing dan pekerjaan tim yang dilaporkan. Isinya bukan pengganti tanggapan pribadi siswa; tim tetap berkewajiban memahami, menguji kesesuaiannya dengan pengalaman nyata, dan menjelaskannya dengan bahasa sendiri sebagaimana diminta panitia.

/** Uji struktur tampilan Tim SOLARIS. Jalankan: node --test tes/tampilan.test.mjs */
import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync, statSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const akar = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const lokasi = (p) => resolve(akar, p);
const baca = (p) => readFileSync(lokasi(p), 'utf8');

const beranda = 'src/index.html';
const simulator = 'src/simulator.html';
const riwayat = 'src/riwayat.html';
const gaya = 'src/css/style.css';
const gayaSimulator = 'src/css/simulator.css';
const logo = 'src/assets/logo-solaris.jpg';

// Tes ini mengecek STRUKTUR kode, bukan keberhasilan interaksi browser.
test('Z1: berkas beranda, CSS, dan logo ada', () => {
  for (const file of [beranda, gaya, logo]) {
    assert.ok(existsSync(lokasi(file)), `File belum ada: ${file}`);
  }
  assert.ok(statSync(lokasi(logo)).size > 0, 'File logo kosong');
});

test('Z1: beranda memuat identitas dan konsep SOLARIS', () => {
  const html = baca(beranda);
  for (const istilah of ['SOLARIS', 'One Ecosystem', 'Smart Irrigation', 'Kebun Depan', 'Kebun Belakang']) {
    assert.ok(html.includes(istilah), `Teks belum ditemukan: ${istilah}`);
  }
});

test('Z1: beranda menggunakan stylesheet dan logo lokal', () => {
  const html = baca(beranda);
  assert.match(html, /href="\.\/css\/style\.css"/);
  assert.match(html, /src="\.\/assets\/logo-solaris\.jpg"/);
});

test('Z1: tombol beranda mengarah ke simulator', () => {
  const html = baca(beranda);
  assert.match(html, /href="\.\/simulator\.html"[^>]*>[^<]*Coba Simulasi/i);
});

test('Z1: target menu bagian beranda benar-benar tersedia', () => {
  const html = baca(beranda);
  const tujuan = [...html.matchAll(/href="#([^"]+)"/g)].map((x) => x[1]);
  assert.ok(tujuan.length > 0, 'Tidak ditemukan tautan bagian di beranda');
  for (const id of tujuan) {
    assert.ok(html.includes(`id="${id}"`), `Tujuan tautan #${id} tidak ditemukan`);
  }
});

test('Z1: CSS beranda memiliki aturan layar kecil', () => {
  assert.match(baca(gaya), /@media\s*\(\s*max-width\s*:/);
});

test('Z2: halaman simulator dan CSS-nya tersedia', () => {
  for (const file of [simulator, gayaSimulator]) {
    assert.ok(existsSync(lokasi(file)), `File belum ada: ${file}`);
  }
});

test('Z2: semua ID yang dibutuhkan controller tersedia dan unik', () => {
  const html = baca(simulator);
  const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map((x) => x[1]);
  assert.equal(ids.length, new Set(ids).size, 'Ada ID ganda di simulator');
  for (const id of ['pilih-perangkat', 'form-simulasi', 'kelembaban', 'bawah', 'atas',
    'status-pompa', 'hasil-selisih', 'manual-on', 'manual-off', 'mode-otomatis', 'pesan']) {
    assert.ok(ids.includes(id), `ID diperlukan tetapi tidak ada: ${id}`);
  }
});

test('Z2: form memiliki label untuk tiap masukan penting', () => {
  const html = baca(simulator);
  for (const id of ['pilih-perangkat', 'kelembaban', 'bawah', 'atas']) {
    assert.ok(html.includes(`for="${id}"`), `Label untuk ${id} tidak ditemukan`);
  }
  assert.match(html, /<script\s+type="module"\s+src="\.\/js\/app\.mjs"/);
});

test('Z2: semua masukan angka memakai step 1', () => {
  const html = baca(simulator);
  for (const id of ['kelembaban', 'bawah', 'atas']) {
    const regex = new RegExp(`<input[^>]*id="${id}"[^>]*step="1"`);
    assert.match(html, regex, `Input ${id} belum step 1`);
  }
});

test('Z3: halaman riwayat dan tabel disiapkan', () => {
  assert.ok(existsSync(lokasi(riwayat)), 'src/riwayat.html belum ada');

  const html = baca(riwayat);

  assert.match(html, /id="baris-riwayat"/);

  for (const header of [
    'Waktu',
    'Perangkat',
    'Jenis',
    'Kelembaban',
    'Mode',
    'Pompa',
    'Selisih'
  ]) {
    assert.ok(
      html.includes(`<th>${header}</th>`),
      `Kolom tidak ada: ${header}`
    );
  }

  assert.match(html, /src="\.\/js\/riwayat\.mjs"/);
});

test('Z3: halaman riwayat menyediakan pencarian, filter, dan CSV', () => {
  const html = baca(riwayat);

  assert.match(
    html,
    /<input\b[^>]*\btype="search"[^>]*\bid="cari-riwayat"/i
  );

  assert.match(html, /<select[^>]*id="filter-perangkat"/i);
  assert.match(html, /<select[^>]*id="filter-pompa"/i);

  assert.match(html, /<button[^>]*id="unduh-csv"/i);
  assert.match(html, /Unduh CSV/i);

  assert.match(html, /id="data-tidak-ditemukan"/i);
  assert.match(html, /Data tidak ditemukan/);
});

test('Z2-Z3: desain simulator memiliki aturan responsif', () => {
  assert.match(baca(gayaSimulator), /@media\s*\(\s*max-width\s*:/);
});

import test from 'node:test';
import assert from 'node:assert/strict';
import { KUNCI, ambilKeadaan, simpanKeadaan, semuaRiwayat } from '../src/js/storage.mjs';

function mediaPalsu() {
  const isi = new Map();
  return {
    getItem(k) { return isi.has(k) ? isi.get(k) : null; },
    setItem(k, v) { isi.set(k, v); },
  };
}
function keadaanContoh() {
  return {
    versi: 1,
    perangkat: {
      depan: { id: 'depan', nama: 'Kebun Depan', bawah: 30, atas: 70,
        mode: 'otomatis', pompa: 'OFF', kelembabanTerakhir: 50, riwayat: [] },
      belakang: { id: 'belakang', nama: 'Kebun Belakang', bawah: 20, atas: 60,
        mode: 'manual', pompa: 'ON', kelembabanTerakhir: 40, riwayat: [] },
    },
  };
}

test('A1: simpan dan ambil ulang mempertahankan keadaan dua kebun', () => {
  const media = mediaPalsu();
  const awal = keadaanContoh();
  simpanKeadaan(media, awal);
  assert.deepEqual(ambilKeadaan(media, keadaanContoh), awal);
});

test('A2: belum ada data menghasilkan keadaan awal yang valid', () => {
  const media = mediaPalsu();
  assert.deepEqual(ambilKeadaan(media, keadaanContoh), keadaanContoh());
});

test('A3: storage rusak ditolak tanpa menghapus data sebelumnya', () => {
  const media = { getItem(k) { assert.equal(k, KUNCI); return '{rusak'; } };
  assert.throws(() => ambilKeadaan(media, keadaanContoh), /tidak dapat dibaca/);
});

test('A4: kegagalan penyimpanan memunculkan pesan', () => {
  const media = { setItem() { throw Error('QuotaExceededError'); } };
  assert.throws(() => simpanKeadaan(media, keadaanContoh()), /Gagal menyimpan/);
});

test('A5: riwayat digabung dari dua kebun dan yang terbaru di atas', () => {
  const s = keadaanContoh();
  s.perangkat.depan.riwayat.push({ id:'depan-1', waktu:'2026-10-11T10:00:00Z' });
  s.perangkat.belakang.riwayat.push({ id:'belakang-1', waktu:'2026-10-11T11:00:00Z' });
  assert.deepEqual(semuaRiwayat(s).map(r => r.id), ['belakang-1', 'depan-1']);
});

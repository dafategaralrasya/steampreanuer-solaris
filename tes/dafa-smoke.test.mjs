import test from 'node:test';
import assert from 'node:assert/strict';
import { keadaanAwal, jalankanBacaan, ubahKontrol, selisihKeAtas } from '../src/js/logic.mjs';

const bacaan = (keadaan, id, kelembaban, bawah = 30, atas = 70) =>
  jalankanBacaan(keadaan, id, { kelembaban, bawah, atas }, '2026-10-11T10:00:00.000Z');

test('D1: di bawah ambang bawah pompa ON; selisih angka benar', () => {
  const s = bacaan(keadaanAwal(), 'depan', 25);
  assert.equal(s.perangkat.depan.pompa, 'ON');
  assert.equal(selisihKeAtas(25, 70), 45);
});

test('D2: tepat ambang bawah mempertahankan ON; ambang atas OFF', () => {
  let s = bacaan(keadaanAwal(), 'depan', 25);
  s = bacaan(s, 'depan', 30);
  assert.equal(s.perangkat.depan.pompa, 'ON');
  s = bacaan(s, 'depan', 70);
  assert.equal(s.perangkat.depan.pompa, 'OFF');
});

test('D3: input invalid ditolak tanpa mengubah keadaan awal', () => {
  const awal = keadaanAwal();
  assert.throws(() => bacaan(awal, 'depan', '1.5'), /bilangan bulat/);
  assert.throws(() => bacaan(awal, 'depan', 50, 70, 30), /lebih kecil/);
  assert.equal(awal.perangkat.depan.riwayat.length, 0);
});

test('D4: mode manual ON dan kembali otomatis pada 50 persen menjadi OFF', () => {
  let s = bacaan(keadaanAwal(), 'depan', 50);
  s = ubahKontrol(s, 'depan', 'manual', 'ON');
  assert.equal(s.perangkat.depan.pompa, 'ON');
  s = ubahKontrol(s, 'depan', 'otomatis');
  assert.equal(s.perangkat.depan.pompa, 'OFF');
});

test('D5: perangkat belakang tidak berubah jika depan dijalankan', () => {
  const awal = keadaanAwal();
  const s = bacaan(awal, 'depan', 25);
  assert.deepEqual(s.perangkat.belakang, awal.perangkat.belakang);
});

/** Regresi validasi SOLARIS. Alif menjalankan setelah perbaikan Dafa digabung. */
import test from 'node:test';
import assert from 'node:assert/strict';
import { angkaBulat, validasiBacaan, keadaanAwal, jalankanBacaan, selisihKeAtas } from '../src/js/logic.mjs';

const form = (kelembaban, bawah = '30', atas = '70') => ({ kelembaban, bawah, atas });

// Pengujian pesan tidak bergantung pada kata yang dipilih browser.
test('V01: nilai kosong mendapatkan pesan wajib diisi', () => {
  assert.throws(() => validasiBacaan(form('')), /Kelembaban wajib diisi/);
});
test('V02: spasi dianggap kosong', () => {
  assert.throws(() => validasiBacaan(form('   ')), /wajib diisi/);
});
test('V03: huruf ditolak dengan alasan hanya angka bulat', () => {
  assert.throws(() => validasiBacaan(form('abc')), /hanya boleh berisi angka bulat/);
});
test('V04: nilai negatif dilaporkan di luar rentang', () => {
  assert.throws(() => validasiBacaan(form('-1')), /di luar rentang 0–100/);
});
test('V05: pecahan ditolak dengan alasan tanpa pecahan', () => {
  assert.throws(() => validasiBacaan(form('1.5')), /bilangan bulat, tanpa pecahan/);
});
test('V06: nilai 101 ditolak dengan pesan batas', () => {
  assert.throws(() => validasiBacaan(form('101')), /di luar rentang 0–100/);
});
test('V07: ambang terbalik ditolak dengan alasan perbandingan', () => {
  assert.throws(() => validasiBacaan(form('25', '70', '30')), /lebih kecil daripada threshold atas/);
});
test('V08: ambang sama ditolak dengan alasan perbandingan', () => {
  assert.throws(() => validasiBacaan(form('25', '30', '30')), /lebih kecil daripada threshold atas/);
});
test('V09: ambang pecahan ditolak', () => {
  assert.throws(() => validasiBacaan(form('25', '30.5', '70')), /bilangan bulat/);
});
test('V10: ambang atas lebih dari 100 ditolak', () => {
  assert.throws(() => validasiBacaan(form('25', '30', '101')), /di luar rentang 1–100/);
});
test('V11: input tidak valid tidak mengubah state atau riwayat', () => {
  const sebelumnya = keadaanAwal();
  const salinan = JSON.stringify(sebelumnya);
  for (const masukan of [form(''), form('abc'), form('-1'), form('1.5'), form('101'), form('25','70','30')]) {
    assert.throws(() => jalankanBacaan(sebelumnya, 'depan', masukan));
    assert.equal(JSON.stringify(sebelumnya), salinan);
  }
});
test('V12: bacaan valid tetap menghasilkan angka dan status yang sama', () => {
  const sesudah = jalankanBacaan(keadaanAwal(), 'depan', form('25'));
  assert.equal(sesudah.perangkat.depan.pompa, 'ON');
  assert.equal(selisihKeAtas(25, 70), 45);
  assert.equal(sesudah.perangkat.depan.riwayat.length, 1);
});
test('V13: rentang batas 0 dan 100 tetap diterima', () => {
  assert.deepEqual(validasiBacaan(form('0','0','100')), {kelembaban: 0, bawah:0, atas:100});
  assert.equal(angkaBulat('100', 'Kelembaban',0,100),100);
});

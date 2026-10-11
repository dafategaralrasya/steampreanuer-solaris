import test from 'node:test';
import assert from 'node:assert/strict';
import { keadaanAwal, jalankanBacaan, ubahKontrol, validasiBacaan,
  statusOtomatis, selisihKeAtas } from '../src/js/logic.mjs';

function baca(state, k, m, low=30, high=70) {
  return jalankanBacaan(state, k, {kelembaban:m, bawah:low, atas:high}, '2026-10-11T08:00:00.000Z');
}
function cek(state,k,pump,gap) {
  const p=state.perangkat[k];
  assert.equal(p.pompa,pump);
  assert.equal(selisihKeAtas(p.kelembabanTerakhir,p.atas),gap);
}

test('KT-01 sampai KT-06: rangkaian hysteresis termasuk kedua batas', () => {
  let s=keadaanAwal();
  for (const [m,p,g] of [[25,'ON',45],[30,'ON',40],[50,'ON',20],
    [70,'OFF',0],[50,'OFF',20],[100,'OFF',0]]) {
    s=baca(s,'depan',m); cek(s,'depan',p,g);
  }
  assert.equal(s.perangkat.depan.riwayat.length,6);
});
test('KT-07: 0 sama dengan batas bawah 0, pompa OFF dan selisih 100', () => {
  cek(baca(keadaanAwal(),'depan',0,0,100),'depan','OFF',100);
});
test('KT-08: 0 kurang dari batas bawah 1, pompa ON dan selisih 100', () => {
  cek(baca(keadaanAwal(),'depan',0,1,100),'depan','ON',100);
});
test('KT-09: konfigurasi Kebun Belakang 20/60 dan kelembaban 15', () => {
  cek(baca(keadaanAwal(),'belakang',15,20,60),'belakang','ON',45);
});
test('KT-10: Manual ON lalu kembali Otomatis pada kelembaban 50 => OFF', () => {
  let s=baca(keadaanAwal(),'depan',50);
  s=ubahKontrol(s,'depan','manual','ON');
  assert.equal(s.perangkat.depan.pompa,'ON');
  s=ubahKontrol(s,'depan','otomatis');
  cek(s,'depan','OFF',20);
});
test('Input salah ditolak; data awal tidak berubah', () => {
  const awal=keadaanAwal();
  const salinan=JSON.stringify(awal);
  for (const nilai of ['', '-1', '1.5','101','abc', ' ']) {
    assert.throws(()=>baca(awal,'depan',nilai));
  }
  assert.throws(()=>baca(awal,'depan',50,70,30));
  assert.throws(()=>baca(awal,'depan',50,30,30));
  assert.equal(JSON.stringify(awal),salinan);
});
test('Pemisahan perangkat: mengubah depan tidak mengubah belakang', () => {
  const awal=keadaanAwal();
  const s=baca(awal,'depan',25);
  assert.deepEqual(s.perangkat.belakang,awal.perangkat.belakang);
  assert.equal(s.perangkat.depan.riwayat.length,1);
  assert.equal(s.perangkat.belakang.riwayat.length,0);
});
test('Manual ON/OFF tidak mengikuti pembacaan; ada event kontrol terpisah', () => {
  let s=ubahKontrol(keadaanAwal(),'depan','manual','ON');
  s=baca(s,'depan',90);
  assert.equal(s.perangkat.depan.pompa,'ON');
  assert.deepEqual(s.perangkat.depan.riwayat.map(r=>r.jenis),['kontrol','pembacaan']);
  s=ubahKontrol(s,'depan','manual','OFF');
  assert.equal(s.perangkat.depan.pompa,'OFF');
  assert.equal(s.perangkat.depan.riwayat.length,3);
});
test('Kembali otomatis tanpa pembacaan => OFF, bukan nilai sensor rekaan', () => {
  let s=ubahKontrol(keadaanAwal(),'depan','manual','ON');
  s=ubahKontrol(s,'depan','otomatis');
  assert.equal(s.perangkat.depan.pompa,'OFF');
  assert.equal(s.perangkat.depan.kelembabanTerakhir,null);
  assert.equal(s.perangkat.depan.riwayat.length,2);
  assert.equal(s.perangkat.depan.riwayat[1].kelembaban,null);
});
test('Kontrol dengan status yang sama tidak menambah entri riwayat', () => {
  const s=keadaanAwal();
  assert.equal(ubahKontrol(s,'depan','otomatis'),s);
});
test('Validasi tepat batas dan perubahan threshold', () => {
  assert.deepEqual(validasiBacaan({kelembaban:'100',bawah:'0',atas:'100'}), {kelembaban:100,bawah:0,atas:100});
  assert.equal(statusOtomatis(30,30,70,'ON'),'ON');
  assert.equal(statusOtomatis(70,30,70,'ON'),'OFF');
  assert.equal(selisihKeAtas(100,70),0);
});

import test from 'node:test';
import assert from 'node:assert/strict';
import { keadaanAwal, jalankanBacaan } from '../src/js/logic.mjs';
import { KUNCI, ambilKeadaan, simpanKeadaan, semuaRiwayat } from '../src/js/storage.mjs';
function mediaPalsu() {
  const data=new Map();
  return { getItem(k){return data.has(k)?data.get(k):null;}, setItem(k,v){data.set(k,v);} };
}
test('Penyimpanan dan buka ulang mempertahankan data kedua perangkat',()=>{
  const media=mediaPalsu();
  let s=ambilKeadaan(media,keadaanAwal);
  s=jalankanBacaan(s,'depan',{kelembaban:25,bawah:30,atas:70});
  s=jalankanBacaan(s,'belakang',{kelembaban:90,bawah:20,atas:60});
  simpanKeadaan(media,s);
  const kembali=ambilKeadaan(media,keadaanAwal);
  assert.deepEqual(kembali,s);
  assert.equal(semuaRiwayat(kembali).length,2);
});
test('Riwayat tidak otomatis berganda akibat membuka ulang',()=>{
  const media=mediaPalsu();
  const s=jalankanBacaan(keadaanAwal(),'depan',{kelembaban:50,bawah:30,atas:70});
  simpanKeadaan(media,s);
  ambilKeadaan(media,keadaanAwal);
  assert.equal(semuaRiwayat(ambilKeadaan(media,keadaanAwal)).length,1);
});
test('Jika simpan gagal muncul error; sumber data tidak diubah',()=>{
  const s=keadaanAwal();
  const media={setItem(){throw Error('QuotaExceededError');}};
  assert.throws(()=>simpanKeadaan(media,s),/Gagal menyimpan/);
  assert.equal(s.perangkat.depan.riwayat.length,0);
});
test('Data rusak tidak ditimpa atau dianggap keadaan baru',()=>{
  const media={getItem(k){assert.equal(k,KUNCI);return '{rusak';}};
  assert.throws(()=>ambilKeadaan(media,keadaanAwal),/tidak dapat dibaca/);
});

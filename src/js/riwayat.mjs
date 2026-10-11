import { keadaanAwal } from './logic.mjs';
import { ambilKeadaan, semuaRiwayat } from './storage.mjs';

const badan = document.querySelector('#baris-riwayat');
const kosong = document.querySelector('#riwayat-kosong');
const info = document.querySelector('#jumlah-riwayat');
const error = document.querySelector('#riwayat-error');

function cell(baris, isi) {
  const td = document.createElement('td');
  td.textContent = String(isi);
  baris.append(td);
}
try {
  const keadaan = ambilKeadaan(window.localStorage, keadaanAwal);
  const catatan = semuaRiwayat(keadaan);
  info.textContent = `${catatan.length} peristiwa tersimpan pada browser ini.`;
  kosong.hidden = catatan.length > 0;
  for (const item of catatan) {
    const tr = document.createElement('tr');
    const tgl = new Date(item.waktu);
    cell(tr, Number.isNaN(tgl.getTime()) ? item.waktu : tgl.toLocaleString('id-ID'));
    cell(tr, item.perangkatNama);
    cell(tr, item.jenis === 'pembacaan' ? 'Pembacaan' : 'Kontrol');
    cell(tr, item.kelembaban === null ? '—' : `${item.kelembaban}%`);
    cell(tr, `${item.bawah}% / ${item.atas}%`);
    cell(tr, item.mode === 'otomatis' ? 'Otomatis' : 'Manual');
    cell(tr, item.pompa);
    cell(tr, item.selisih === null ? '—' : `${item.selisih}`);
    cell(tr, item.ringkasan);
    badan.append(tr);
  }
} catch (err) {
  kosong.hidden = true;
  error.hidden = false;
  error.textContent = err.message;
}

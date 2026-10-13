
import { keadaanAwal } from './logic.mjs';
import { ambilKeadaan, semuaRiwayat } from './storage.mjs';

const badan = document.querySelector('#baris-riwayat');
const kosong = document.querySelector('#riwayat-kosong');
const info = document.querySelector('#jumlah-riwayat');
const error = document.querySelector('#riwayat-error');

const pencarian = document.querySelector('#cari-riwayat');
const filterPerangkat = document.querySelector('#filter-perangkat');
const filterPompa = document.querySelector('#filter-pompa');
const dataTidakDitemukan = document.querySelector('#data-tidak-ditemukan');
const tombolCsv = document.querySelector('#unduh-csv');

function cell(baris, isi) {
  const td = document.createElement('td');
  td.textContent = String(isi);
  baris.append(td);
}

function teksKecil(nilai) {
  return String(nilai ?? '').toLocaleLowerCase('id-ID');
}

function cocokPencarian(item, kataKunci) {
  if (!kataKunci) return true;

  const jenis = item.jenis === 'pembacaan' ? 'Pembacaan' : 'Kontrol';
  const mode = item.mode === 'otomatis' ? 'Otomatis' : 'Manual';

  const teks = [
    item.perangkatNama,
    jenis,
    mode,
    item.pompa,
    item.ringkasan
  ].map(teksKecil).join(' ');

  return teks.includes(kataKunci);
}

function saringRiwayat(catatan) {
  const kataKunci = teksKecil(pencarian.value.trim());
  const perangkat = filterPerangkat.value;
  const statusPompa = filterPompa.value;

  return catatan.filter((item) => {
    const cocokKata = cocokPencarian(item, kataKunci);

    const cocokPerangkat =
      !perangkat ||
      teksKecil(item.perangkatNama).includes(perangkat);

    const cocokPompa =
      !statusPompa ||
      String(item.pompa).toUpperCase() === statusPompa;

    return cocokKata && cocokPerangkat && cocokPompa;
  });
}
function nilaiCsv(nilai) {
  if (nilai === null || nilai === undefined) return '';

  const teks = String(nilai);

  // Angka tetap berupa angka tanpa simbol atau format tambahan.
  if (typeof nilai === 'number') return teks;

  // Mencegah teks tertentu dijalankan sebagai rumus spreadsheet.
  const aman = /^[=+\-@\t\r]/.test(teks) ? `'${teks}` : teks;

  if (/[",\r\n]/.test(aman)) {
    return `"${aman.replaceAll('"', '""')}"`;
  }

  return aman;
}

function unduhRiwayatCsv(hasil) {
  const kolom = [
    'Waktu',
    'Perangkat',
    'Jenis',
    'Kelembaban',
    'Batas Bawah',
    'Batas Atas',
    'Mode',
    'Pompa',
    'Selisih',
    'Ringkasan'
  ];

  const baris = [
    kolom,
    ...hasil.map((item) => [
      item.waktu,
      item.perangkatNama,
      item.jenis === 'pembacaan' ? 'Pembacaan' : 'Kontrol',
      item.kelembaban,
      item.bawah,
      item.atas,
      item.mode === 'otomatis' ? 'Otomatis' : 'Manual',
      item.pompa,
      item.selisih,
      item.ringkasan
    ])
  ];

  const isiCsv = baris
    .map((barisData) => barisData.map(nilaiCsv).join(','))
    .join('\r\n');

  // BOM membantu Excel mengenali karakter UTF-8.
  const blob = new Blob(['\uFEFF', isiCsv], {
    type: 'text/csv;charset=utf-8'
  });

  const alamat = URL.createObjectURL(blob);
  const tautan = document.createElement('a');

  tautan.href = alamat;
  tautan.download = 'riwayat-solaris.csv';

  document.body.append(tautan);
  tautan.click();
  tautan.remove();

  setTimeout(() => URL.revokeObjectURL(alamat), 1000);
}

function tampilkanBaris(item) {
  const tr = document.createElement('tr');
  const tgl = new Date(item.waktu);

  cell(tr, Number.isNaN(tgl.getTime())
    ? item.waktu
    : tgl.toLocaleString('id-ID'));

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

try {
  const keadaan = ambilKeadaan(window.localStorage, keadaanAwal);
  const catatan = semuaRiwayat(keadaan);

  function perbaruiTampilan() {
    const hasil = saringRiwayat(catatan);

    badan.replaceChildren();

    for (const item of hasil) {
      tampilkanBaris(item);
    }

    info.textContent =
      `${catatan.length} peristiwa tersimpan pada browser ini. ` +
      `Menampilkan ${hasil.length} peristiwa.`;

    kosong.hidden = catatan.length > 0;

    dataTidakDitemukan.hidden =
      catatan.length === 0 || hasil.length > 0;
  }

  pencarian.addEventListener('input', perbaruiTampilan);
  filterPerangkat.addEventListener('change', perbaruiTampilan);
  filterPompa.addEventListener('change', perbaruiTampilan);
  tombolCsv.addEventListener('click', () => {
  const hasil = saringRiwayat(catatan);
  unduhRiwayatCsv(hasil);
    });
  perbaruiTampilan();

} catch (err) {
  kosong.hidden = true;
  dataTidakDitemukan.hidden = true;
  error.hidden = false;
  error.textContent = err.message;
}

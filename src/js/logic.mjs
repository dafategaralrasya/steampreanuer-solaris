/** Aturan bisnis Smart Irrigation; tanpa DOM, jaringan, atau penyimpanan. */
export const DAFTAR_PERANGKAT = Object.freeze([
  { id: 'depan', nama: 'Kebun Depan' },
  { id: 'belakang', nama: 'Kebun Belakang' },
]);

export function perangkatBaru(id, nama) {
  return { id, nama, bawah: 30, atas: 70, mode: 'otomatis', pompa: 'OFF',
    kelembabanTerakhir: null, riwayat: [] };
}

export function keadaanAwal() {
  return { versi: 1, perangkat: Object.fromEntries(
    DAFTAR_PERANGKAT.map(item => [item.id, perangkatBaru(item.id, item.nama)])) };
}

export function angkaBulat(nilai, nama, minimum, maksimum) {
  const teks = String(nilai ?? '').trim();
  if (!/^\d+$/.test(teks)) throw new Error(`${nama} harus bilangan bulat ${minimum}–${maksimum}.`);
  const angka = Number(teks);
  if (!Number.isSafeInteger(angka) || angka < minimum || angka > maksimum) {
    throw new Error(`${nama} harus bilangan bulat ${minimum}–${maksimum}.`);
  }
  return angka;
}

export function validasiBacaan({ kelembaban, bawah, atas }) {
  const hasil = {
    kelembaban: angkaBulat(kelembaban, 'Kelembaban', 0, 100),
    bawah: angkaBulat(bawah, 'Threshold bawah', 0, 99),
    atas: angkaBulat(atas, 'Threshold atas', 1, 100),
  };
  if (hasil.bawah >= hasil.atas) throw new Error('Threshold bawah harus lebih kecil daripada threshold atas.');
  return hasil;
}

export function statusOtomatis(kelembaban, bawah, atas, pompaSebelumnya) {
  if (kelembaban < bawah) return 'ON';
  if (kelembaban >= atas) return 'OFF';
  return pompaSebelumnya;
}

export function selisihKeAtas(kelembaban, atas) {
  return Math.max(0, atas - kelembaban);
}

function salinPerangkat(keadaan, id) {
  if (!Object.hasOwn(keadaan.perangkat, id)) throw new Error('Perangkat tidak dikenal.');
  return { ...keadaan.perangkat[id], riwayat: [...keadaan.perangkat[id].riwayat] };
}

function catat(perangkat, jenis, waktu, ringkasan, tambahan = {}) {
  perangkat.riwayat.push({
    id: `${perangkat.id}-${perangkat.riwayat.length + 1}`,
    perangkatId: perangkat.id,
    perangkatNama: perangkat.nama,
    jenis, waktu, ringkasan,
    kelembaban: perangkat.kelembabanTerakhir,
    bawah: perangkat.bawah, atas: perangkat.atas,
    mode: perangkat.mode, pompa: perangkat.pompa,
    selisih: perangkat.kelembabanTerakhir === null ? null :
      selisihKeAtas(perangkat.kelembabanTerakhir, perangkat.atas),
    ...tambahan,
  });
}

function denganPerangkat(keadaan, perangkat) {
  return { ...keadaan, perangkat: { ...keadaan.perangkat, [perangkat.id]: perangkat } };
}

export function jalankanBacaan(keadaan, id, masukan, waktu = new Date().toISOString()) {
  const nilai = validasiBacaan(masukan);
  const perangkat = salinPerangkat(keadaan, id);
  perangkat.bawah = nilai.bawah;
  perangkat.atas = nilai.atas;
  perangkat.kelembabanTerakhir = nilai.kelembaban;
  if (perangkat.mode === 'otomatis') {
    perangkat.pompa = statusOtomatis(nilai.kelembaban, nilai.bawah, nilai.atas, perangkat.pompa);
  }
  catat(perangkat, 'pembacaan', waktu, 'Pembacaan simulasi');
  return denganPerangkat(keadaan, perangkat);
}

export function ubahKontrol(keadaan, id, mode, statusManual = null, waktu = new Date().toISOString()) {
  const perangkat = salinPerangkat(keadaan, id);
  if (!['manual', 'otomatis'].includes(mode)) throw new Error('Mode tidak dikenal.');
  if (mode === 'manual' && !['ON', 'OFF'].includes(statusManual)) {
    throw new Error('Pilih status pompa Manual ON atau OFF.');
  }
  const statusBaru = mode === 'manual' ? statusManual :
    perangkat.kelembabanTerakhir === null ? 'OFF' :
    statusOtomatis(perangkat.kelembabanTerakhir, perangkat.bawah, perangkat.atas, 'OFF');
  if (perangkat.mode === mode && perangkat.pompa === statusBaru) return keadaan;
  perangkat.mode = mode;
  perangkat.pompa = statusBaru;
  catat(perangkat, 'kontrol', waktu, mode === 'manual' ?
    `Kontrol Manual: pompa ${statusBaru}` : `Kembali ke Otomatis: pompa ${statusBaru}`);
  return denganPerangkat(keadaan, perangkat);
}

/** Penyimpanan per asal browser. Tidak terhubung ke SOLARIS produksi. */
export const KUNCI = 'solaris-challenge-simulator-v1';

function periksaStruktur(data) {
  return data && data.versi === 1 && data.perangkat &&
    ['depan', 'belakang'].every(id => {
      const p = data.perangkat[id];
      return p && p.id === id && Array.isArray(p.riwayat) &&
        ['ON', 'OFF'].includes(p.pompa) && ['manual', 'otomatis'].includes(p.mode) &&
        Number.isInteger(p.bawah) && Number.isInteger(p.atas);
    });
}

export function ambilKeadaan(media, pembuatAwal) {
  let teks;
  try { teks = media.getItem(KUNCI); }
  catch { throw new Error('Penyimpanan browser tidak dapat dibaca.'); }
  if (teks === null) return pembuatAwal();
  let data;
  try { data = JSON.parse(teks); }
  catch { throw new Error('Data tersimpan tidak dapat dibaca. Data lama tidak dihapus.'); }
  if (!periksaStruktur(data)) throw new Error('Format data tersimpan tidak sesuai. Data lama tidak dihapus.');
  return data;
}

export function simpanKeadaan(media, data) {
  try { media.setItem(KUNCI, JSON.stringify(data)); }
  catch { throw new Error('Gagal menyimpan. Perubahan dibatalkan; periksa penyimpanan browser.'); }
}

export function semuaRiwayat(keadaan) {
  return Object.values(keadaan.perangkat)
    .flatMap(p => p.riwayat)
    .sort((a, b) => b.waktu.localeCompare(a.waktu) || a.id.localeCompare(b.id));
}

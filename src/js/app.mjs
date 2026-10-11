import { keadaanAwal, jalankanBacaan, ubahKontrol } from './logic.mjs';
import { ambilKeadaan, simpanKeadaan } from './storage.mjs';

const elemen = {
  pilih: document.querySelector('#pilih-perangkat'),
  form: document.querySelector('#form-simulasi'),
  kelembaban: document.querySelector('#kelembaban'),
  bawah: document.querySelector('#bawah'),
  atas: document.querySelector('#atas'),
  nama: document.querySelector('#nama-perangkat'),
  mode: document.querySelector('#status-mode'),
  pompa: document.querySelector('#status-pompa'),
  nilai: document.querySelector('#hasil-kelembaban'),
  selisih: document.querySelector('#hasil-selisih'),
  pesan: document.querySelector('#pesan'),
  manualOn: document.querySelector('#manual-on'),
  manualOff: document.querySelector('#manual-off'),
  otomatis: document.querySelector('#mode-otomatis'),
};

let keadaan;
try { keadaan = ambilKeadaan(window.localStorage, keadaanAwal); }
catch (err) {
  elemen.pesan.textContent = err.message + ' Simulator dikunci agar data tidak tertimpa.';
  elemen.form.querySelector('button[type="submit"]').disabled = true;
  elemen.manualOn.disabled = true;
  elemen.manualOff.disabled = true;
  elemen.otomatis.disabled = true;
}

function perangkatAktif() { return keadaan?.perangkat[elemen.pilih.value]; }
function tampilkanPesan(teks, salah = false) {
  elemen.pesan.textContent = teks;
  elemen.pesan.dataset.status = salah ? 'salah' : 'berhasil';
}
function render(isiForm = false) {
  const p = perangkatAktif();
  if (!p) return;
  elemen.nama.textContent = p.nama;
  elemen.mode.textContent = p.mode === 'otomatis' ? 'Otomatis' : 'Manual';
  elemen.pompa.textContent = p.pompa;
  elemen.nilai.textContent = p.kelembabanTerakhir === null ? 'Belum ada' : `${p.kelembabanTerakhir}%`;
  elemen.selisih.textContent = p.kelembabanTerakhir === null ? '—' : `${Math.max(0,p.atas - p.kelembabanTerakhir)} poin`;
  elemen.otomatis.disabled = p.mode === 'otomatis';
  if (isiForm) {
    elemen.kelembaban.value = p.kelembabanTerakhir === null ? '' : String(p.kelembabanTerakhir);
    elemen.bawah.value = String(p.bawah);
    elemen.atas.value = String(p.atas);
  }
}
function terapkan(perhitungan, sukses) {
  if (!keadaan) return;
  try {
    const berikutnya = perhitungan(keadaan);
    if (berikutnya === keadaan) { tampilkanPesan('Tidak ada perubahan status.'); return; }
    simpanKeadaan(window.localStorage, berikutnya); // sukses dulu, baru state UI diganti
    keadaan = berikutnya;
    render(true);
    tampilkanPesan(sukses);
  } catch (err) { tampilkanPesan(err.message, true); }
}

elemen.pilih.addEventListener('change', () => {
  render(true);
  tampilkanPesan('Perangkat aktif diganti. Pengaturan kedua kebun tetap terpisah.');
});
elemen.form.addEventListener('submit', event => {
  event.preventDefault();
  const id = elemen.pilih.value;
  terapkan(s => jalankanBacaan(s, id, {
    kelembaban: elemen.kelembaban.value,
    bawah: elemen.bawah.value,
    atas: elemen.atas.value,
  }), 'Simulasi berhasil dan tersimpan otomatis. Buka Riwayat untuk melihatnya.');
});
function kontrol(mode, status = null) {
  const id = elemen.pilih.value;
  terapkan(s => ubahKontrol(s, id, mode, status), 'Kontrol virtual berhasil disimpan ke riwayat.');
}
elemen.manualOn.addEventListener('click', () => kontrol('manual', 'ON'));
elemen.manualOff.addEventListener('click', () => kontrol('manual', 'OFF'));
elemen.otomatis.addEventListener('click', () => kontrol('otomatis'));
render(true);

import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { runInNewContext } from 'node:vm';

// Jalankan kode aplikasi asli dengan DOM dan localStorage simulasi.
// Data uji sengaja dibuat tetap agar hasilnya dapat dihitung dan diperiksa.
const sumber = readFileSync(new URL('../src/js/riwayat.mjs', import.meta.url), 'utf8');
const kode = sumber.replace(/^import\s+.*?\s+from\s+['"].*?['"];?\s*$/gm, '');

const dataUji = [
  {
    waktu: '2026-10-13T08:00:00.000Z', perangkatNama: 'Kebun Depan',
    jenis: 'pembacaan', kelembaban: 20, bawah: 30, atas: 70,
    mode: 'otomatis', pompa: 'ON', selisih: 50, ringkasan: 'Pompa menyala'
  },
  {
    waktu: '2026-10-13T08:05:00.000Z', perangkatNama: 'Kebun Belakang',
    jenis: 'pembacaan', kelembaban: 75, bawah: 30, atas: 70,
    mode: 'otomatis', pompa: 'OFF', selisih: 0, ringkasan: 'Pompa berhenti'
  },
  {
    waktu: '2026-10-13T08:10:00.000Z', perangkatNama: 'Kebun Depan',
    jenis: 'kontrol', kelembaban: null, bawah: 30, atas: 70,
    mode: 'manual', pompa: 'OFF', selisih: null, ringkasan: 'Kontrol manual'
  },
  {
    waktu: '2026-10-13T08:15:00.000Z', perangkatNama: 'Kebun Belakang',
    jenis: 'kontrol', kelembaban: null, bawah: 30, atas: 70,
    mode: 'manual', pompa: 'ON', selisih: null, ringkasan: 'Kontrol dinyalakan'
  }
];

function elemen(tag = 'div') {
  return {
    tag,
    children: [],
    hidden: true,
    value: '',
    textContent: '',
    listeners: new Map(),
    append(...anak) { this.children.push(...anak); },
    replaceChildren(...anak) { this.children = anak; },
    addEventListener(nama, fungsi) { this.listeners.set(nama, fungsi); },
    picu(nama) {
      const fungsi = this.listeners.get(nama);
      assert.ok(fungsi, `Event ${nama} tidak terpasang pada elemen ${this.tag}`);
      fungsi();
    },
    click() { this.diklik = true; },
    remove() { this.dihapus = true; }
  };
}

function buatHalaman(catatan = dataUji) {
  const ids = [
    'baris-riwayat', 'riwayat-kosong', 'jumlah-riwayat', 'riwayat-error',
    'cari-riwayat', 'filter-perangkat', 'filter-pompa',
    'data-tidak-ditemukan', 'unduh-csv'
  ];
  const dom = Object.fromEntries(ids.map((id) => [id, elemen(id)]));
  const unduhan = [];
  const tautan = [];

  class BlobUji {
    constructor(bagian, opsi) {
      this.isi = bagian.join('');
      this.type = opsi.type;
    }
  }

  const document = {
    querySelector(selector) { return dom[selector.slice(1)]; },
    createElement(tag) {
      const hasil = elemen(tag);
      if (tag === 'a') tautan.push(hasil);
      return hasil;
    },
    body: { append() {} }
  };

  const konteks = {
    document,
    window: { localStorage: {} },
    keadaanAwal: () => ({}),
    ambilKeadaan: () => ({}),
    semuaRiwayat: () => catatan,
    Blob: BlobUji,
    URL: {
      createObjectURL(blob) {
        unduhan.push(blob);
        return 'blob:riwayat-uji';
      },
      revokeObjectURL() {}
    },
    setTimeout() {}
  };

  runInNewContext(kode, konteks, { filename: 'src/js/riwayat.mjs' });

  const baris = () => dom['baris-riwayat'].children;
  const perangkatTampil = () => baris().map((tr) => tr.children[1].textContent);
  const pompaTampil = () => baris().map((tr) => tr.children[6].textContent);
  const unduh = () => {
    dom['unduh-csv'].picu('click');
    const blob = unduhan.at(-1);
    assert.ok(blob, 'Berkas CSV tidak terbentuk');
    assert.equal(tautan.at(-1).download, 'riwayat-solaris.csv');
    assert.equal(tautan.at(-1).diklik, true);
    return blob.isi;
  };
  return { dom, baris, perangkatTampil, pompaTampil, unduh };
}

test('CR-01: semua catatan tampil jika pencarian dan filter kosong', () => {
  const halaman = buatHalaman();
  assert.equal(halaman.baris().length, 4);
  assert.match(halaman.dom['jumlah-riwayat'].textContent, /Menampilkan 4 peristiwa/);
});

test('CR-02: pencarian langsung dan tidak membedakan huruf besar/kecil', () => {
  const halaman = buatHalaman();
  halaman.dom['cari-riwayat'].value = 'kEbUn dEpAn';
  halaman.dom['cari-riwayat'].picu('input');
  assert.deepEqual(halaman.perangkatTampil(), ['Kebun Depan', 'Kebun Depan']);
});

test('CR-03: filter Kebun Belakang tidak menampilkan Kebun Depan', () => {
  const halaman = buatHalaman();
  halaman.dom['filter-perangkat'].value = 'belakang';
  halaman.dom['filter-perangkat'].picu('change');
  assert.deepEqual(halaman.perangkatTampil(), ['Kebun Belakang', 'Kebun Belakang']);
});

test('CR-04: filter pompa ON hanya menampilkan status ON', () => {
  const halaman = buatHalaman();
  halaman.dom['filter-pompa'].value = 'ON';
  halaman.dom['filter-pompa'].picu('change');
  assert.deepEqual(halaman.pompaTampil(), ['ON', 'ON']);
});

test('CR-05: pencarian dan kedua filter bekerja bersamaan', () => {
  const halaman = buatHalaman();
  halaman.dom['cari-riwayat'].value = 'PEMBACAAN';
  halaman.dom['cari-riwayat'].picu('input');
  halaman.dom['filter-perangkat'].value = 'depan';
  halaman.dom['filter-perangkat'].picu('change');
  halaman.dom['filter-pompa'].value = 'ON';
  halaman.dom['filter-pompa'].picu('change');
  assert.equal(halaman.baris().length, 1);
  assert.deepEqual(halaman.perangkatTampil(), ['Kebun Depan']);
  assert.deepEqual(halaman.pompaTampil(), ['ON']);
});

test('CR-06: pencarian tanpa kecocokan menampilkan pesan tepat', () => {
  const halaman = buatHalaman();
  halaman.dom['cari-riwayat'].value = 'tidak-ada-hasil';
  halaman.dom['cari-riwayat'].picu('input');
  assert.equal(halaman.baris().length, 0);
  assert.equal(halaman.dom['data-tidak-ditemukan'].hidden, false);
  assert.equal(halaman.dom['riwayat-kosong'].hidden, true);
});

test('CR-07: jika riwayat awal kosong, gunakan pesan riwayat kosong', () => {
  const halaman = buatHalaman([]);
  assert.equal(halaman.baris().length, 0);
  assert.equal(halaman.dom['riwayat-kosong'].hidden, false);
  assert.equal(halaman.dom['data-tidak-ditemukan'].hidden, true);
});

test('CR-08: CSV memuat header dan hanya hasil filter gabungan', () => {
  const halaman = buatHalaman();
  halaman.dom['cari-riwayat'].value = 'pembacaan';
  halaman.dom['cari-riwayat'].picu('input');
  halaman.dom['filter-perangkat'].value = 'depan';
  halaman.dom['filter-perangkat'].picu('change');
  halaman.dom['filter-pompa'].value = 'ON';
  halaman.dom['filter-pompa'].picu('change');

  const isi = halaman.unduh();
  const baris = isi.replace(/^\uFEFF/, '').split('\r\n');
  assert.equal(baris.length, 2, 'CSV harus berisi satu header dan satu data hasil filter');
  assert.equal(baris[0], 'Waktu,Perangkat,Jenis,Kelembaban,Batas Bawah,Batas Atas,Mode,Pompa,Selisih,Ringkasan');
  assert.equal(baris[1], '2026-10-13T08:00:00.000Z,Kebun Depan,Pembacaan,20,30,70,Otomatis,ON,50,Pompa menyala');
  assert.equal(isi.includes('%'), false, 'Kolom angka CSV tidak boleh memakai simbol persen');
});

test('CR-09: CSV hasil kosong tetap memiliki header tanpa baris data', () => {
  const halaman = buatHalaman();
  halaman.dom['cari-riwayat'].value = 'tidak-ada-hasil';
  halaman.dom['cari-riwayat'].picu('input');
  const isi = halaman.unduh().replace(/^\uFEFF/, '');
  assert.equal(isi.split('\r\n').length, 1);
  assert.ok(isi.startsWith('Waktu,Perangkat,Jenis,'));
});

test('CR-10: nilai angka dan sel kosong dalam CSV tidak diberi format tampilan', () => {
  const halaman = buatHalaman();
  const isi = halaman.unduh().replace(/^\uFEFF/, '');
  const baris = isi.split('\r\n');
  assert.equal(baris.length, 5);
  assert.ok(baris[1].includes(',20,30,70,'));
  assert.ok(baris[3].includes('Kontrol,,30,70,Manual,OFF,,'));
  assert.equal(isi.includes('%'), false);
});

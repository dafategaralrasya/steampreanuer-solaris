
const test = require("node:test");
const assert = require("node:assert/strict");
const { hitungPPN, hitungRingkasan } = require("../kasir.js");

test("BH-08: PPN dengan pecahan 0,5 dibulatkan naik", () => {
  assert.equal(hitungPPN(150), 17);
});

test("BH-09: PPN dengan pecahan kurang dari 0,5 dibulatkan turun", () => {
  assert.equal(hitungPPN(149), 16);
});

test("BH-10: total menggunakan PPN yang sudah dibulatkan", () => {
  const keranjang = [
    { kode: "UJI", nama: "Produk Uji", harga: 150, qty: 1 }
  ];

  assert.deepEqual(hitungRingkasan(keranjang, false), {
    subtotal: 150,
    diskon: 0,
    ppn: 17,
    total: 167
  });
});

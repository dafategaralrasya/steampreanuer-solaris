
const test = require("node:test");
const assert = require("node:assert/strict");
const { tambahItem } = require("../kasir.js");

test("BH-01: produk sama dijumlahkan menjadi 5, bukan 23", () => {
  const keranjang = [];

  tambahItem(keranjang, "K04", "2");
  tambahItem(keranjang, "K04", "3");

  assert.equal(keranjang.length, 1);
  assert.equal(keranjang[0].qty, 5);
});

test("BH-02: jumlah kosong, nol, negatif, dan pecahan ditolak", () => {
  for (const qty of ["", "0", "-1", "1.5", "abc"]) {
    const keranjang = [];

    assert.throws(
      () => tambahItem(keranjang, "K04", qty),
      /jumlah|qty|bilangan|1 sampai 99/i
    );

    assert.equal(keranjang.length, 0);
  }
});

test("BH-03: jumlah maksimum per produk adalah 99", () => {
  const keranjang = [];

  tambahItem(keranjang, "K04", "98");
  tambahItem(keranjang, "K04", "1");

  assert.equal(keranjang[0].qty, 99);

  assert.throws(
    () => tambahItem(keranjang, "K04", "1"),
    /99|jumlah|batas/i
  );

  assert.equal(keranjang[0].qty, 99);
});

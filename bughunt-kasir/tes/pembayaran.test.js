
const test = require("node:test");
const assert = require("node:assert/strict");
const { hitungKembalian } = require("../kasir.js");

test("BH-11: pembayaran kurang harus ditolak", () => {
  assert.throws(
    () => hitungKembalian(20000, 15000),
    (err) => err.message === "Uang pembayaran kurang"
  );
});

test("BH-12: pembayaran tepat menghasilkan kembalian nol", () => {
  assert.equal(hitungKembalian(20000, 20000), 0);
});

test("BH-13: pembayaran lebih menghasilkan kembalian yang benar", () => {
  assert.equal(hitungKembalian(20000, 50000), 30000);
});


const test = require("node:test");
const assert = require("node:assert/strict");
const { hitungDiskon } = require("../kasir.js");

test("BH-04: member hanya mendapat diskon 10 persen", () => {
  assert.equal(hitungDiskon(200000, true), 20000);
});

test("BH-05: non-member mendapat diskon 5 persen tepat di 100000", () => {
  assert.equal(hitungDiskon(100000, false), 5000);
});

test("BH-06: non-member di bawah 100000 tidak mendapat diskon", () => {
  assert.equal(hitungDiskon(99999, false), 0);
});

test("BH-07: diskon dibulatkan ke rupiah terdekat", () => {
  assert.equal(hitungDiskon(100010, false), 5001);
  assert.equal(hitungDiskon(15, true), 2);
});

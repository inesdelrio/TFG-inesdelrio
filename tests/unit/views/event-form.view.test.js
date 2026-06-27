const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

function readView(relativePath) {
  return fs.readFileSync(path.join(__dirname, "../../../src/views", relativePath), "utf8");
}

function assertEventAddressFormIsSimplified(template) {
  assert.ok(template.includes("Dirección del evento en Madrid"));
  assert.ok(template.includes("includeAddressHidden: true"));
  assert.ok(template.includes('name="city" type="hidden" value="Madrid"'));
  assert.ok(!template.includes('label for="city"'));
  assert.ok(!template.includes('label for="address"'));
  assert.ok(template.includes("address-search"));
}

function testEventCreateViewUsesSingleAddressSearchBlock() {
  assertEventAddressFormIsSimplified(readView("pages/events/create.ejs"));
}

function testEventEditViewUsesSingleAddressSearchBlock() {
  assertEventAddressFormIsSimplified(readView("pages/events/edit.ejs"));
}

function testAddressSearchPartialSupportsHiddenAddressInput() {
  const template = readView("partials/address-search.ejs");

  assert.ok(template.includes("includeAddressHidden"));
  assert.ok(template.includes('name="address" type="hidden"'));
  assert.ok(template.includes("data-address-latitude"));
  assert.ok(template.includes("data-address-longitude"));
  assert.ok(template.includes("data-address-normalized"));
}

module.exports = {
  testAddressSearchPartialSupportsHiddenAddressInput,
  testEventCreateViewUsesSingleAddressSearchBlock,
  testEventEditViewUsesSingleAddressSearchBlock,
};

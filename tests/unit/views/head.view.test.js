const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

function testHeadPartialIncludesBfcacheRefreshScript() {
  const template = fs.readFileSync(
    path.join(__dirname, "../../../src/views/partials/head.ejs"),
    "utf8",
  );

  assert.ok(template.includes("window.addEventListener(\"pageshow\""));
  assert.ok(template.includes("event.persisted"));
  assert.ok(template.includes("window.location.reload()"));
}

module.exports = {
  testHeadPartialIncludesBfcacheRefreshScript,
};

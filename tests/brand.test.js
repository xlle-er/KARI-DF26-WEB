import test from "node:test";
import assert from "node:assert/strict";
import {readFile} from "node:fs/promises";
import {findWakePhrase, extractWakeCommandText} from "../frontend/js/audio/wakePhraseDetector.js";

test("KARI wake phrases and commands use the selected identity", () => {
  assert.ok(findWakePhrase("Hey KARI, turn left"));
  assert.ok(findWakePhrase("你好卡里 向左转"));
  assert.equal(extractWakeCommandText("Hey KARI turn left"), "turn left");
  assert.equal(extractWakeCommandText("你好卡里 向左转"), "向左转");
  for (const phrase of ["hey " + String.fromCharCode(108,111,117,105,101), "你好" + String.fromCharCode(36335,26131)]) {
    assert.equal(findWakePhrase(phrase), null);
    assert.equal(extractWakeCommandText(phrase), "");
  }
});
test("KARI release and local model manifests are self-consistent", async () => {
  const {createHash} = await import("node:crypto");
  const {resources} = JSON.parse(await readFile(new URL("../backend/local-resources/manifest.json", import.meta.url)));
  for (const group of Object.values(resources)) {
    for (const item of group) {
      const data = await readFile(new URL("../backend/local-resources/" + item.path, import.meta.url));
      assert.equal(createHash("sha256").update(data).digest("hex"), item.sha256, item.path);
    }
  }
});

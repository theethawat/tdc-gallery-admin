import { test } from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { transform } from "esbuild";

const source = await readFile(new URL("../src/lib/translations.ts", import.meta.url), "utf8");
const { code } = await transform(source, { loader: "ts", format: "esm" });
const { translatedValue } = await import(`data:text/javascript,${encodeURIComponent(code)}`);

test("uses the current interface language and falls back without losing legacy data", () => {
  const record = {
    name: "Legacy",
    translation: { en: { name: "English" }, th: { name: "Thai" } },
  };
  assert.equal(translatedValue(record, "name", "th-TH"), "Thai");
  assert.equal(translatedValue(record, "name", "en"), "English");
  assert.equal(translatedValue({ ...record, translation: {} }, "name", "th"), "Legacy");
  assert.equal(translatedValue({ translation: record.translation }, "name", "fr"), "English");
  assert.equal(translatedValue({ translation: { th: { name: "Thai" } } }, "name", "en"), "Thai");
  assert.equal(translatedValue({ translation: { ja: { name: "Japanese" } } }, "name", "en"), "Japanese");
  assert.equal(translatedValue(undefined, "name", "en"), "");
});

test("chooses translated descriptions and person names independently", () => {
  const record = {
    description: "Legacy description",
    translation: { en: { description: "English description" }, th: { calledName: "Thai called name" } },
  };
  assert.equal(translatedValue(record, "description", "th"), "Legacy description");
  assert.equal(translatedValue(record, "calledName", "th"), "Thai called name");
});

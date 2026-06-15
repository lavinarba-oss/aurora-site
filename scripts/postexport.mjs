// Post-export step for the static build.
// With i18n the site lives under /ru and /en, so the bare "/" has no page.
// We generate out/index.html that bounces visitors to the default locale.
// Relative path ("ru/") keeps it working even from a subfolder on the host.

import { writeFile, access } from "node:fs/promises";
import { join } from "node:path";

const OUT = join(process.cwd(), "out");
const DEFAULT_LOCALE = "ru";

const html = `<!doctype html>
<html lang="${DEFAULT_LOCALE}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta http-equiv="refresh" content="0; url=./${DEFAULT_LOCALE}/">
<link rel="canonical" href="./${DEFAULT_LOCALE}/">
<title>AURORA</title>
<script>location.replace("./${DEFAULT_LOCALE}/" + location.search + location.hash);</script>
</head>
<body style="background:#050816"></body>
</html>
`;

try {
  await access(OUT);
} catch {
  console.error("[postexport] out/ not found — run `next build` first.");
  process.exit(1);
}

await writeFile(join(OUT, "index.html"), html, "utf8");
console.log(`[postexport] wrote out/index.html → redirect to /${DEFAULT_LOCALE}/`);

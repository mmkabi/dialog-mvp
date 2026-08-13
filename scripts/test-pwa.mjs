import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import process from "node:process";

const root = process.cwd();

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

function readJson(path) {
  return JSON.parse(readFileSync(join(root, path), "utf8"));
}

function pngSize(path) {
  const buffer = readFileSync(join(root, path));
  assert(buffer.toString("ascii", 1, 4) === "PNG", `${path} is not a PNG`);
  return {
    width: buffer.readUInt32BE(16),
    height: buffer.readUInt32BE(20),
  };
}

const manifest = readJson("public/manifest.webmanifest");

assert(manifest.name === "دیالوگ / Dialog", "manifest name is incorrect");
assert(manifest.start_url === "/fa/", "manifest start_url must be /fa/");
assert(manifest.scope === "/", "manifest scope must be /");
assert(manifest.display === "standalone", "manifest display must be standalone");
assert(manifest.lang === "fa", "manifest lang must be fa");
assert(manifest.dir === "rtl", "manifest dir must be rtl");
assert(Array.isArray(manifest.icons) && manifest.icons.length >= 4, "manifest needs regular and maskable icons");

const requiredIcons = [
  ["public/icons/icon-192.png", 192],
  ["public/icons/icon-512.png", 512],
  ["public/icons/maskable-192.png", 192],
  ["public/icons/maskable-512.png", 512],
  ["public/apple-touch-icon.png", 180],
];

for (const [path, size] of requiredIcons) {
  assert(existsSync(join(root, path)), `${path} is missing`);
  const actual = pngSize(path);
  assert(actual.width === size && actual.height === size, `${path} should be ${size}x${size}`);
}

const serviceWorker = readFileSync(join(root, "public/sw.js"), "utf8");
assert(serviceWorker.includes("offline.html"), "service worker must reference offline fallback");
assert(serviceWorker.includes("request.mode === \"navigate\""), "service worker must handle navigations");
assert(serviceWorker.includes("/api/"), "service worker must avoid private API caching");
assert(existsSync(join(root, "public/offline.html")), "offline.html is missing");

console.log("PWA manifest, icons, offline page, and service worker checks passed.");

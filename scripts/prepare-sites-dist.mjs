import { cp, mkdir, rm, writeFile } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const outDir = path.join(root, "out");
const distDir = path.join(root, "dist");
const clientDir = path.join(distDir, "client");
const serverDir = path.join(distDir, "server");

const worker = `
const DEFAULT_LOCALE = "fa";
const LOCALES = new Set(["fa", "en"]);

function cloneRequestForPath(request, pathname) {
  const url = new URL(request.url);
  url.pathname = pathname;
  return new Request(url, request);
}

async function fetchAsset(env, request, pathname) {
  const assetPaths = pathname.startsWith("/client/") ? [pathname] : [pathname, "/client" + pathname];

  for (const assetPath of assetPaths) {
    const response = await env.ASSETS.fetch(cloneRequestForPath(request, assetPath));
    if (response.status !== 404) return response;
  }

  return null;
}

function withSecurityHeaders(response) {
  const headers = new Headers(response.headers);
  headers.set("x-content-type-options", "nosniff");
  headers.set("referrer-policy", "strict-origin-when-cross-origin");
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const pathname = decodeURI(url.pathname);
    const firstSegment = pathname.split("/")[1];

    if (pathname === "/_sites-debug-assets") {
      const probes = [
        "/fa/index.html",
        "/client/fa/index.html",
        "/dist/fa/index.html",
        "/dist/client/fa/index.html",
        "/assets/fa/index.html",
        "/public/fa/index.html",
      ];
      const results = [];

      for (const probe of probes) {
        const response = await env.ASSETS.fetch(cloneRequestForPath(request, probe));
        results.push({ path: probe, status: response.status });
      }

      return Response.json(results);
    }

    if (pathname === "/") {
      return Response.redirect(new URL("/" + DEFAULT_LOCALE + "/", url), 302);
    }

    if (!LOCALES.has(firstSegment) && !pathname.startsWith("/_next/") && !pathname.startsWith("/images/") && !pathname.includes(".")) {
      const localized = "/" + DEFAULT_LOCALE + (pathname.endsWith("/") ? pathname.slice(0, -1) : pathname) + "/";
      return Response.redirect(new URL(localized, url), 302);
    }

    const candidates = pathname.endsWith("/")
      ? [pathname + "index.html"]
      : [pathname, pathname + "/index.html", pathname + ".html"];

    for (const candidate of candidates) {
      const asset = await fetchAsset(env, request, candidate);
      if (asset) return withSecurityHeaders(asset);
    }

    const notFound = await fetchAsset(env, request, "/404.html");
    if (notFound) {
      return new Response(notFound.body, { status: 404, headers: notFound.headers });
    }

    return new Response("Not found", { status: 404 });
  },
};
`.trimStart();

await rm(distDir, { recursive: true, force: true });
await mkdir(clientDir, { recursive: true });
await cp(outDir, clientDir, { recursive: true });
await mkdir(serverDir, { recursive: true });
await writeFile(path.join(serverDir, "index.js"), worker);

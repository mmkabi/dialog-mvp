import { cp, mkdir, rm, writeFile } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const outDir = path.join(root, "out");
const distDir = path.join(root, "dist");
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
  const response = await env.ASSETS.fetch(cloneRequestForPath(request, pathname));
  return response.status === 404 ? null : response;
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
await cp(outDir, distDir, { recursive: true });
await mkdir(serverDir, { recursive: true });
await writeFile(path.join(serverDir, "index.js"), worker);

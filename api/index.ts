// Vercel serverless entry point for TanStack Start
import handler from "../dist/server/server.js";

export default async function(req: Request) {
  const url = new URL(req.url);
  const pathname = url.pathname;
  
  if (pathname === "/") {
    return (handler as any).fetch(req);
  }
  
  // Try static file
  const { readFile, stat } = await import("node:fs/promises");
  const { join, extname, dirname } = await import("node:path");
  const clientDir = join(dirname(new URL(import.meta.url).pathname), "../dist/client");
  
  try {
    const filePath = join(clientDir, pathname);
    const st = await stat(filePath);
    if (st.isFile()) {
      const content = await readFile(filePath);
      const mime: Record<string, string> = {
        ".js": "application/javascript", ".css": "text/css",
        ".html": "text/html", ".json": "application/json",
        ".png": "image/png", ".jpg": "image/jpeg",
        ".svg": "image/svg+xml", ".ico": "image/x-icon",
      };
      return new Response(content, {
        headers: { "Content-Type": mime[extname(filePath)] || "application/octet-stream" },
      });
    }
  } catch {}
  
  return (handler as any).fetch(req);
}
